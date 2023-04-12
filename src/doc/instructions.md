## Python Fastapi back-end

### More instructions on Fast API backend in /api/docs/instructions.MD ###

- source venv/bin/activate
- cd api
- uvicorn main:app --reload

Note: The Atlas db can go down and after restart it takes a few minutes before the app can connect to it.

OR: To run inside PyCharm must have a run config that points to uvicorn inside the venv
and uses the parameters:  main:app --reload

This runs the API on [localhost:8000]()
http://localhost:8000  should return hello world JSON
http://localhost:8000/works should return all the artworks JSONs

There are swagger docs located at:  [localhost:8000/docs]()

There are potential problems when connecting to the mongo db within atlas.

If encounter problems,  try uvicorn min_api:app --reload to see that the / URL returns hello world JSON.  


## Angular Front-end app

- be in the root dir of project
- ng serve
- App will be running on [localhost:4200]()


## Dev vs Production settings

package.json npm build will create production build that is placed in the /dist folder.
The npm start command is set to run 
node server.js which tests out this build as production even on my dev machines.

To run it for dev use nodemon server.js

This sets the angular front-end running on localhost:8080
Because it is a production build (uses environments/environment.prod.ts) it will expect the backend to be 
https://dmart-api.herokuapp.com/  .  So this is a good way to test a locally running front-end with a production back-end running on heroku.

To run it in true dev mode (port 4200) use `npm run dev-start`



## Deployment to run in the cloud

### MongoDb
Using Mongo Atlas at
https://cloud.mongodb.com/v2/615490640c90e4261e121d89#clusters

Login is thru my google account.

The main.py file gets a connection URI to the db on mongo atlas (found within my serve.sh script inside the dmart-api or within the mongo cloud 
website)



Note:  This is a free hobby account with a limit of 500 MB of data.  Upgrade will move to the tier of $5 /month

After a long pause, the db for dmart was shut down.  I had to go to https://cloud.mongodb.com/v2/615490640c90e4261e121d89#clusters and restart it.

### Static assets (images) in Github

`https://github.com/marshall62/dmart/tree/main/images`

This repo will have both front and back end code and also the images that my website uses.   

The database entries in mongo currently point to the files in github and a config object in the db tells where the
root of the image dir is.   


## Heroku

Hosts both the Angular and FastAPI elements.   Releases are mediated through github.



Useful articles:
[https://www.tutlinks.com/create-and-deploy-fastapi-app-to-heroku/]()

[https://betterprogramming.pub/how-to-deploy-your-angular-9-app-to-heroku-in-minutes-51d171c2f0d]()

https://www.mongodb.com/languages/python

https://www.analyticsvidhya.com/blog/2020/08/query-a-mongodb-database-using-pymongo/

Article available on how to use Mongo Atlas with heroku

https://www.mongodb.com/developer/how-to/use-atlas-on-heroku/

How to use auth0 with Angular along with Mongo to allow a logged in user.  [https://www.freecodecamp.org/news/serverless-rest-api-with-angular-persistence-and-security-ff274f04e3d0/]()

Code that goes along with this article:
[https://github.com/auth0/node-jsonwebtoken]
