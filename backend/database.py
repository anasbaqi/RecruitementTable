from model import Candidate

#mongodb driver
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')

database = client.Recruitment

collection = database.candidates

async def fetch_one_candidate(name):
    document = await collection.find_one({"name": name})
    return document

async def fetch_all_candidates():
    candidates = []
    cursor = collection.find({})
    async for document in cursor:
        candidates.append(Candidate(**document))
    
    return candidates

async def create_candidate(candidate):
    document = candidate
    result = await collection.insert_one(document)
    return document

async def update_candidate(name, status):
    await collection.update_one({"name":name}, {"$set":{"status":status}})
    document  = await collection.find_one({"name":name})
    return document

async def remove_candidate(name):
    await collection.delete_one({"name":name})
    return True

