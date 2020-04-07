// Third party dependencies
require('dotenv').config();
// const graphqlHTTP = require('express-graphql');
import * as  graphqlHTTP  from 'express-graphql';
// import schema = require('./src/graphql/schema.js');
import { StorySchema as schema } from './graphql/schema';

import * as process from 'process';
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from 'express';
import * as morgan from "morgan";
import * as mongoose from "mongoose";

import { appRouter } from './routes';


class Application {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.initApp();
    }

    private initApp(): void {
        this.initDB();
        this.initMiddleware();
        this.initRoutes();
    }

    getExpressServer(): express.Application {
        return this.app;
    }

    // Connect to mongoose DB
    private initDB(): void {

        let mongoDBUrl: string | undefined;

        if (process.env.MONGODB_URI) { // Path to production mongoDB
            mongoDBUrl = process.env.MONGODB_URI;
        } else { 
            // For now we just have one DB URL
            mongoDBUrl = (process.env.NODE_ENV === 'test') ? 'mongodb://localhost/homerlearningdb' : 'mongodb://localhost/homerlearningdb';
        } 


        if (!mongoDBUrl) {
            throw new Error('MongoDB URI is undefined');
        }
        
        mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
            .then(() => "You are now connected to Mongo!")
            .catch(err => console.error("Something went wrong!", err));
    }

    private initMiddleware(): void {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(morgan("tiny"));
        this.app.use(express.json());
        
        this.app.use('/api/graphql', graphqlHTTP({
            schema: schema,
            graphiql: true
        }));
    }

    private initRoutes(): void {
        this.app.use(appRouter);
    }

    initExpressConnection(): void {
        const port: string | number = process.env.PORT || (process.env.NODE_ENV === 'test' ? 4001 : 4000);
        this.app.listen(port, () => console.log(`Listening on port ${port}...`));
    }
}


// const mongodbUrl = process.env.MONGODB_URI || (process.env.NODE_ENV === 'test' ? 'mongodb://localhost/homerlearningdb' : 'mongodb://localhost/homerlearningdb');


export default Application;
