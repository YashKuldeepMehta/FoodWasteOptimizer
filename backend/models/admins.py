from pydantic import BaseModel

ADMIN_COLLECTION = "admins"

class Admin(BaseModel):
    email: str
    password: str
