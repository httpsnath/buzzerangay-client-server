from fastapi import FastAPI, APIRouter, HTTPException, status
from configurations import accounts_collection, storage_collection, requests_collection, announcements_collection, messages_collection
from db_helper.models import LoginRequest, SignupRequest, Account, Uid, PostNotification, AddContact, AccountStorage, PostBackupRequest, PostAnnouncementRequest, SendMessageRequest, GetMessagesRequest
from auth import verify_password, hash_password
import uuid
from datetime import datetime, timezone
import random
import string
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


app = FastAPI()
router = APIRouter()
app.include_router(router)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print(f"OMG Error: {exc.errors()}") # This prints to your terminal/console
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": exc.body},
    )
def generate_unique_uid():
    while True:
        uid = "USR-" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        if not accounts_collection.find_one({"_id": uid}):
            return uid

@app.post("/login")
async def login(request: LoginRequest):
    user = accounts_collection.find_one({"phone": request.phone})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )

    is_valid = verify_password(request.password, user["password"])
    
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid phone number or password"
        )

    return {
        "message": "success", 
        "user_info": {
            "user_id": user["_id"], 
            "name": user['name'], 
            "phone": user['phone'], 
            "role": user['role']
            }
        }


@app.post("/signup")
async def signup(request: SignupRequest):

    existing_user = accounts_collection.find_one({"phone": request.phone})
    _uid = generate_unique_uid()
    if existing_user:
        raise HTTPException(
            status_code=400, 
            detail="Phone number already registered"
        )

    new_user_obj = Account(
        _id=_uid,
        role=request.role,
        name=request.name,
        phone=request.phone,
        password=hash_password(request.password)
    )
   
    
    new_user = new_user_obj.model_dump()
    new_user['_id'] = _uid

    new_account_storage_obj = AccountStorage(
        _id=_uid,

    )

    new_account_storage = new_account_storage_obj.model_dump()
    new_account_storage['_id'] = _uid
    try:
        accounts_collection.insert_one(new_user)
        storage_collection.insert_one(new_account_storage)
        return {"message": "User created successfully", "user_id": _uid}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Database insertion failed")




@app.get("/notifications/{uid}")
async def get_notifications(uid: str):

    storage = storage_collection.find_one({"_id": uid})

    if not storage:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "notifications": storage.get("notification", [])[::-1]
    }












@app.post("/addContact")
async def add_contact(request: AddContact):

    if request.uid == request.add_user:
        raise HTTPException(status_code=400, detail="Cannot add yourself")

    user = accounts_collection.find_one({"_id": request.uid})
    target = accounts_collection.find_one({"_id": request.add_user})

    if not user or not target:
        raise HTTPException(status_code=404, detail="User not found")

    user_contact = {
        "uid": target["_id"],
        "name": target["name"],
        "phone": target["phone"]
    }

    target_contact = {
        "uid": user["_id"],
        "name": user["name"],
        "phone": user["phone"]
    }

    try:
        storage_collection.update_one(
            {"_id": request.uid},
            {
                "$addToSet": {
                    "family_contacts": user_contact
                }
            }
        )

        storage_collection.update_one(
            {"_id": request.add_user},
            {
                "$addToSet": {
                    "family_contacts": target_contact
                }
            }
        )

        return {"message": "Contact added mutually"}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to add contact")




@app.get("/contacts/{uid}")
async def get_contacts(uid: str):
    storage = storage_collection.find_one({"_id": uid})

    if not storage:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "contacts": storage.get("family_contacts", [])
    }

@app.post("/postNotification")
async def postNotification(request: PostNotification):
    sender_storage = storage_collection.find_one({"_id": request.uid})

    if not sender_storage:
        raise HTTPException(status_code=404, detail="User not found")

    contacts = sender_storage.get("family_contacts", [])

    notification_obj = {
        "from": {"uid": request.uid, "name": request.name},
        "critical": request.critical,
        "location": request.location.model_dump(),
    }

    # ✅ Get contact UIDs
    uids = [c["uid"] for c in contacts]

    # 🔥 If critical → include officials
    if request.critical:
        officials = accounts_collection.find({"role": "official"})
        official_uids = [o["_id"] for o in officials]

        # Merge + remove duplicates
        uids = list(set(uids + official_uids))

    # ✅ Send notification
    storage_collection.update_many(
        {"_id": {"$in": uids}},
        {"$push": {"notification": notification_obj}}
    )

    return {"message": "Notification sent"}

@app.post("/postBackup")
async def post_backup(request: PostBackupRequest):
    user = accounts_collection.find_one({"_id": request.uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    backup_obj = {
        "uid": request.uid,
        "name": request.name,
        "need": request.need,
        "extra": request.extra,
        "location": request.location.model_dump(),
    }


    try:
        result = requests_collection.insert_one(backup_obj)

        return {
            "message": "Backup request stored successfully",
            "request_id": str(result.inserted_id)
        }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to store backup request")





@app.get("/getBackup")
async def get_backup():
    try:
        requests = list(requests_collection.find())

        requests.sort(
            key=lambda x: x.get("location", {}).get("time", "")
        )

        formatted = []

        for r in requests:
            formatted.append({
                "id": str(r.get("_id")),
                "uid": r.get("uid"),
                "name": r.get("name"),
                "need": r.get("need"),
                "extra": r.get("extra"),
                "location": r.get("location"),
            })

        return {"requests": formatted}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to fetch backups")



@app.post("/postAnnouncements")
async def post_announcement(request: PostAnnouncementRequest):
    try:
        announcement_obj = {
            "from": request.from_user,
            "uid": request.uid,
            "title": request.title,
            "message": request.message,
            "time": request.time,
            "created_at": datetime.utcnow(),
        }

        result = announcements_collection.insert_one(announcement_obj)

        return {
            "message": "Announcement posted successfully",
            "id": str(result.inserted_id)
        }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to post announcement")


@app.get("/getAnnouncements")
async def get_announcements():
    try:
        announcements = list(
            announcements_collection
            .find()
            .sort("created_at", -1)
        )

        formatted = []

        for a in announcements:
            formatted.append({
                "id": str(a.get("_id")),
                "from": a.get("from"),
                "uid": a.get("uid"),
                "title": a.get("title"),
                "message": a.get("message"),
                "time": a.get("time"),
                "created_at": a.get("created_at"),
            })

        return {"announcements": formatted}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to fetch announcements")




@app.post("/sendMessage")
async def send_message(request: SendMessageRequest):
    try:
        message_obj = {
            "from": request.from_uid,
            "to": request.to_uid,
            "message": request.message,
            # Use timezone-aware UTC to avoid deprecation warnings
            "created_at": datetime.now(timezone.utc)
        }

        result = messages_collection.insert_one(message_obj)

        return {
            "status": "success",
            "message_id": str(result.inserted_id)
        }

    except Exception as e:
        # In production, use a proper logger instead of print
        print(f"Error saving message: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.post("/getMessages")
async def get_messages(request: GetMessagesRequest):
    try:
        # Querying for the conversation between two specific users
        query = {
            "$or": [
                {"from": request.uid1, "to": request.uid2},
                {"from": request.uid2, "to": request.uid1}
            ]
        }

        # Sort by created_at ascending (1) to keep the chat in order
        cursor = messages_collection.find(query).sort("created_at", 1)
        
        messages = []
        for m in cursor:
            messages.append({
                "id": str(m["_id"]),
                "from": m["from"],
                "to": m["to"],
                "message": m["message"],
                "time": m["created_at"].isoformat() if m.get("created_at") else None
            })

        return {"messages": messages}

    except Exception as e:
        print(f"Error fetching messages: {e}")
        raise HTTPException(status_code=500, detail="Could not retrieve chat history")