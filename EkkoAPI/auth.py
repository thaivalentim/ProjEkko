from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from bson import ObjectId
import os

router = APIRouter(prefix="/auth", tags=["auth"])

# Configurações JWT
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "ekko-secret-key-2024")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    nome: str
    email: EmailStr
    password: str
    papel: str = "agricultor"

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    nome: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    from EkkoAPI.main import usuarios_collection
    
    try:
        # Buscar usuário por email
        user = usuarios_collection.find_one({"email": login_data.email})
        
        if not user:
            raise HTTPException(status_code=401, detail="Email ou senha incorretos")
        
        # Verificar senha (temporário: aceitar qualquer senha)
        # TODO: Implementar hash de senha quando tivermos usuários com senhas
        
        # Criar token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user["_id"])}, expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": str(user["_id"]),
            "nome": user.get("nome", "")
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro no login: {str(e)}")

@router.post("/register", response_model=dict)
async def register(register_data: RegisterRequest):
    from EkkoAPI.main import usuarios_collection
    
    try:
        # Verificar se email já existe
        existing_user = usuarios_collection.find_one({"email": register_data.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email já cadastrado")
        
        # Hash da senha
        hashed_password = get_password_hash(register_data.password)
        
        # Criar usuário
        user_data = {
            "nome": register_data.nome,
            "email": register_data.email,
            "password": hashed_password,
            "papel": register_data.papel,
            "data_cadastro": datetime.utcnow(),
            "status": "ativo"
        }
        
        result = usuarios_collection.insert_one(user_data)
        
        return {
            "message": "Usuário criado com sucesso",
            "user_id": str(result.inserted_id)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro no registro: {str(e)}")

@router.get("/me")
async def get_current_user(user_id: str = Depends(verify_token)):
    from EkkoAPI.main import usuarios_collection, serialize_user
    
    try:
        user = usuarios_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        return serialize_user(user)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao obter usuário: {str(e)}")