from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

URI = "mongodb://localhost:27017/"
client = MongoClient(URI, server_api=ServerApi("1"))



db = client.Buzzerangay
accounts_collection = db['accounts']