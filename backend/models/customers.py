from pydantic import BaseModel

CUSTOMER_COLLECTION = "customers"

class Customer(BaseModel):
    name: str
    email: str
    password: str
    phone: str