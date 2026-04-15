
import uuid
from pydantic import BaseModel, Field
from datetime import datetime


class Account(BaseModel):
    _id: Field(alias="_id")
    creation: float = Field(default_factory=lambda: datetime.timestamp(datetime.now()))
    name: str
    phone: str
    password: str
    role: str

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

class PostBackupRequest(BaseModel):
    uid: str
    name: str
    need: str
    extra: str
    location: Location

class PostAnnouncementRequest(BaseModel):
    from_user: str
    uid: str
    title: str
    message: str
    time: str

class SendMessageRequest(BaseModel):
    from_uid: str
    to_uid: str
    message: str

class GetMessagesRequest(BaseModel):
    uid1: str
    uid2: str