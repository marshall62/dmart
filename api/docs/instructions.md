## Running
Be in dmart root and source .venv/bin/activate
cd api
uvicorn main:app --reload

## Debugging the python API with VSCode

Needed to create a .venv python virtual environment at the project dir root

I then created a Fast API run/debug config .vscode/launch.json 

I wasn't successful at getting VSCode to use my venv that lived in /api/venv.
So its best to create the venv at the project root with 
python -m venv .venv  
and then vscode automatically detects it and offers to set it as the default for the project.

## Image strategy

I'm using an endpoint /images/thumbnail/{filename} to fetch images based on the simple filename we store in the db record.
The endpoint fetches the high-res image from github and returns a thumbnail that works within an HTML <img>.  The endpoint caches these thumbnails in memory so that it will be faster after the first time.  

N.B. There is currently a bug with this endpoint in that I can't pass a filename like path/to/myfile.jpg.  I've submitted a bug to fastAPI people.  In the meantime, I just put all images in one directory so I never need paths.

I created a utility that standardizes the naming of all my image files.  Images live in the directory /images .  The utility is /api/rename_images.py .  Running it will take all the files in the images directory and standardize their names to be 
david_marshall_XXX.jpg where XXX is an incremented number.   The utility preserves files that have been previously renamed and will only tamper with newly added images.  

## Website Update strategy

My goal for updating the website has this most common work flow:

Use: Add some new paintings:

  1. Add the high-res images to the /images folder
  1. run the rename_images utility  (and note what the files are renamed to)
  1. push the images to github 
  1. [TODO] add records to mongo db in MongoAtlas that point to these files in github.
  1. that's it.

I see that MongoAtlas has a read/write data API that allows me to modify the database from a locally running client (using curl for example).  This will make it relatively easy to create a utility that I can use to put new records into mongo from my machine.  See [https://docs.atlas.mongodb.com/api/data-api/]



