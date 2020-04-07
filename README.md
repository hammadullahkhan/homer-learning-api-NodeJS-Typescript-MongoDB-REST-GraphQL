# Homer-Learning

# Description

A boilerplate for [Node.js](https://nodejs.org/en) App.

* This boilerplate is built using [Express.js](https://expressjs.com/) web framework, and have used [Typescript Lang](https://www.typescriptlang.org/) for writing the app's logic. 
* For storing configuration into the `process.env`, [DOTENV](https://github.com/motdotla/dotenv) for Node.js is used.
* For Database, this repo contains the use of [Mongoose](https://mongoosejs.com/) (ie. [MongoDB](https://www.mongodb.com/) object modeling for [Node.js](https://nodejs.org/en/)).
* For Routing, this repo contains the use of [express-router](https://expressjs.com/en/guide/routing.html) & have distributed Routes into API Routes.

# Contents

* [Global Requisites](#global-requisites)
* [Install, Configure & Run](#install-configure--run)
* [List of Routes](#list-of-routes)

# Global Requisites

* node (>= 10.5.0)
* tsc (>= 3.0.1)
* typescript (>= 3.0.1)
* mongoose (>= 3.6.2)


# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

> Note: It is preassumed here that you have mongoose running in background & you have created the database.


# Goto the project folder.
cd homerlearning

# Install NPM dependencies.
# Note: You can review the list of dependencies from the below link.
npm install


# Import Script
# Set MongoDB URL in /scripts/import-data.js
node .\scripts\import-data.js

# You should be getting the following response after running the import script from the `scripts` folder:
# Import Data Utility Script:
# Data File: ./scripts/../data/stories.csv
# Database URL: mongodb://localhost/homerlearningdb
# Connected to mongo server.
# Total Records Inserted: 356


# Set MongoDB URL in src/app.ts
# defaults to: mongodb://localhost/homerlearningdb

# Run the app
npm run start


# Run Unit Test
# Note: unit test will empty the DB - should have differnt db for test
npm run test


# API Routes:
+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  GET    | /api/stories/public/likes/:likes
  GET    | /api/stories
  GET    | /api/stories/privacy/:privacy
  POST   | /api/stories
  GRAPHQL| /api/graphql
+--------+-------------------------+
```

# Some Screen-shots in the directory:
cd ./docs/screen-shots/

