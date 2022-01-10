from typing import Optional, List
# from pymongo import MongoClient
import motor.motor_asyncio
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response, StreamingResponse
from bson.objectid import ObjectId
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
# from works import ALL_WORK
from PyObjectId import PyObjectId
import requests
import urllib
import io
from PIL import Image
from typing import Dict

origins = [
    # "http://localhost.tiangolo.com",
    # "https://localhost.tiangolo.com",
    # "http://localhost",
    "http://localhost:4200",
]


CONNECTION_STRING="mongodb+srv://marshall62:t0mand3rs@dm-art-cluster.6xsvm.mongodb.net/test?authSource=admin&replicaSet=atlas-10ss2z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
client = motor.motor_asyncio.AsyncIOMotorClient(CONNECTION_STRING)
# client = MongoClient(CONNECTION_STRING)
# db = client['artworks']
db = client.artworks
ARTWORK = db.get_collection("works")
CONFIG = db.get_collection("config")

thumbnail_cache: Dict[str, io.BytesIO] = {}


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

class Config(BaseModel):
  imageRootURI: str
  artist: str
  recentWorkYears: Optional[int] = 1
  backgroundColor: Optional[str] = "#FFF8DC"
  navbarTextColor: Optional[str] = "#164D7A"
  navbarHoverTextColor: Optional[str] = "#F97924"

  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}


class Work(BaseModel):
  # id: Optional[str] = None
  id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
  title: Optional[str] = None
  price: Optional[str] = None
  date: Optional[str] = None
  dimensions: Optional[str] = None
  tags: Optional[List[str]] = None
  exemplarTitle: Optional[str] = None
  media: Optional[str] = None
  url: Optional[str] = None

  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}


@app.get("/")
def read_root():
  return {"Hello": "World"}

@app.get("/config", response_description="config object", response_model=Config)
async def get_config ():
  conf = await CONFIG.find_one()
  return conf


@app.get("/works",response_description="List all works", response_model=List[Work])
async def get_all_works():
  num = await ARTWORK.count_documents({})
  print("There are ", num, "artworks")

  x = await ARTWORK.find().to_list(1000)
  return x

@app.get("/works/tag/{tag}",response_description="List all works with matching tag",
 response_model=List[Work])
async def get_works_by_tag(tag: str):
  results = [w for w in await ARTWORK.find().to_list(1000) if tag in w['tags']]
  count = len(results)
  print(f"Tag match found {count} records ")
  return results

@app.get("/works/{id}",response_description="Get a single work", response_model=Work)
async def get_work_by_id(id: str):
  try:
    if (work := await ARTWORK.find_one({"_id": ObjectId(id)})) is not None:
      return work
  except Exception:
    raise HTTPException(status_code=404, detail=f"Work {id} not found")

@app.get("/works/search/{term}",response_description="Search works",
  response_model=List[Work])
async def search_works(term: str):
  results = [w for w in await ARTWORK.find().to_list(1000) if work_matches(w,term)]
  count = len(results)
  print(f"Search match found {count} records ")
  return results

@app.get("/images/tn/{fn}")
async def xyz (fn:str):
  return {"image": fn}

@app.get('/images/thumbnail/{filename}',
  response_description="Returns a thumbnail image",
  response_class="StreamingResponse",
  responses= {200: {"description": "an image", "content": {"image/jpeg": {}}}})
async def thumbnail_image (filename: str):
  # will check for image in cache and fetch it from github and will both cache it and return it.
  imgio = thumbnail_cache.get(filename)
  if not imgio:
    config = await CONFIG.find_one()
    filename = urllib.parse.unquote(filename)
    url = config['imageRootURI'] + "/" + filename
    print("fetching from " + url)
    # get the high-res image from github
    source_img = requests.get(url, stream=True)
    if not source_img.ok:
      raise HTTPException(status_code=404, detail="Could not find github image: " + url)
    image = Image.open(source_img.raw)
    # create a thumbnail image
    image.thumbnail((100, 100))
    imgio = io.BytesIO()
    image.save(imgio, 'JPEG')
    # cache the thumbnail
    thumbnail_cache[filename] = imgio
  imgio.seek(0)
  return StreamingResponse(content=imgio, media_type="image/jpeg")


def work_matches (work, term):
  term = term.lower()
  for key in ['title', 'price', 'date', 'dimensions', 'media', 'tags']:
    if term in str(work.get(key,'')).lower():
      return True
  return False


# @app.put("/items/{item_id}")
# def update_item(item_id: int, item: Item):
#     return {"item_name": item.name, "item_id": item_id}
