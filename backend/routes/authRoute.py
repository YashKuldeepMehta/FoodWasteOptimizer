from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db
from utils.auth import create_token

from models.admins import ADMIN_COLLECTION
from models.customers import CUSTOMER_COLLECTION
from models.shopkeepers import SHOPKEEPER_COLLECTION
from models.restaurants import RESTAURANT_COLLECTION
from models.ngos import NGO_COLLECTION

router = APIRouter()

ROLE_COLLECTIONS = {
    "admin": ADMIN_COLLECTION,
    "customer": CUSTOMER_COLLECTION,
    "shopkeeper": SHOPKEEPER_COLLECTION,
    "restaurant": RESTAURANT_COLLECTION,
    "ngo": NGO_COLLECTION
}


class LoginModel(BaseModel):
    email: str
    password: str
    role: str


class RegisterModel(BaseModel):
    role: str
    name: str | None = None
    shopName: str | None = None
    phone: str | None = None
    restaurantName: str | None = None
    ngoName :  str | None = None
    email: str
    password: str


@router.post("/register")
async def register(data: RegisterModel):
    role = data.role.lower()

    if role not in ROLE_COLLECTIONS:
        raise HTTPException(400, "Invalid role")

    collection = db[ROLE_COLLECTIONS[role]]
    existing = await collection.find_one({"email": data.email})
    if existing:
        raise HTTPException(400, "Email already registered")

    doc = {
        "email": data.email,
        "password": data.password
    }

    if role == "customer":
        doc["name"] = data.name
        doc["phone"] = data.phone

    elif role == "shopkeeper":
        doc["name"] = data.name
        doc["shopName"] = data.shopName

    elif role == "restaurant":
        doc["name"] = data.name
        doc["restaurantName"] = data.restaurantName
    
    elif role == "restaurant":
        doc["ngoName"] = data.ngoName
    
    elif role == "admin":
        pass

    await collection.insert_one(doc)
    return {"message": f"{role} registered successfully"}


@router.post("/login")
async def login(data: LoginModel):
    role = data.role.lower()

    if role not in ROLE_COLLECTIONS:
        raise HTTPException(400, "Invalid role")

    collection = db[ROLE_COLLECTIONS[role]]

    user = await collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(400, "Invalid email or password")

    if data.password != user["password"]:
        raise HTTPException(400, "Invalid email or password")

    token = create_token({
        "id": str(user["_id"]),
        "email": user["email"],
        "role": role
    })

    user_response = {"_id": str(user["_id"]),"email": user["email"], "role": role}

    if user.get("name"):
        user_response["name"] = user["name"]

    if user.get("phone"):
        user_response["phone"] = user["phone"]

    if user.get("shopName"):
        user_response["shopName"] = user["shopName"]
    
    if user.get("restaurantName"):
        user_response["restaurantName"] = user["restaurantName"]

    if user.get("ngoName"):
        user_response["ngoName"] = user["ngoName"]


    return {"token": token, "user": user_response}
