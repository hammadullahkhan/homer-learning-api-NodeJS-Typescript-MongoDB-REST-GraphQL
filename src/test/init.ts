// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import Application from '../app';
import { } from 'mocha';

import { db } from '../models';
import { utils } from './utilsForTests';

const application = new Application();

application.initExpressConnection();

before(async () => {
  await db.Stories.create({ title: 'My Title', privacy: 'private', likes: 100, launch_date: new Date() })
})

after(async () => {
  await utils.dropAllCollections();
})

export const expressServer = application.getExpressServer();
