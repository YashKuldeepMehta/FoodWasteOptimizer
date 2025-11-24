from passlib.context import CryptContext
from jose import jwt
import time
from config import JWT_SECRET, JWT_EXPIRY_DAYS

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = time.time() + (JWT_EXPIRY_DAYS * 24 * 3600)
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")
