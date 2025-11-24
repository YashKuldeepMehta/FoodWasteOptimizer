from pydantic import BaseModel

NGO_COLLECTION = "ngos"

class NGO(BaseModel):
    ngoName: str
    email: str
    password: str
