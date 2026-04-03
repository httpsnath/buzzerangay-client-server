
import uuid
from pydantic import BaseModel, Field
from datetime import datetime


class SignupRequest(BaseModel):
    name: str
    phone: str
    password: str
    role: str

# This is what your Database uses
class Account(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    creation: float = Field(default_factory=lambda: datetime.timestamp(datetime.now()))
    name: str
    phone: str
    password: str


class LoginRequest(BaseModel):
    phone: str
    password: str