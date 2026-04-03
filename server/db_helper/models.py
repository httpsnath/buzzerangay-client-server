
import uuid
from pydantic import BaseModel, Field
from datetime import datetime


class Account(BaseModel):
    _id: Field(alias="_id")
    creation: float = Field(default_factory=lambda: datetime.timestamp(datetime.now()))
    name: str
    phone: str
    password: str

class AccountStorage(BaseModel):
    _id: Field(alias="_id")
    notification: list = Field(default_factory=list)
    family_contacts: list = Field(default_factory=list)


class SignupRequest(BaseModel):
    name: str
    phone: str
    password: str
    role: str
    



class LoginRequest(BaseModel):
    phone: str
    password: str

class Uid(BaseModel):
    uid: str

class Location(BaseModel):
    lat: float
    lon: float
    time: str

class PostNotification(BaseModel):
    uid: str
    name: str
    critical: bool
    location: Location

class AddContact(BaseModel):
    uid: str
    add_user: str