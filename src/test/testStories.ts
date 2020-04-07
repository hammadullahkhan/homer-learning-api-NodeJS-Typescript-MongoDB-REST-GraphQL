//Require the dev-dependencies
import { expect } from 'chai';
import * as request from 'supertest';
import { } from 'mocha';
import { db } from '../models';

import { utils } from './utilsForTests';
import { expressServer } from './init';;


//Our parent block
describe('Stories', () => {

  beforeEach(async () => {
    // Before each test we empty the database
    await utils.dropAllCollections();
  });

  after(async () => {
    await utils.dropAllCollections();
  });

  describe('GET api/stories', () => {

    // THE ONE ASKED
    it('it should GET stories with public likes for number of likes passed', async () => {
        const numLikes = 20;
        const getRes = await request(expressServer).get(`/api/stories/public/likes/${numLikes}`);
        expect(getRes.status).to.equal(200);
    });

    it('it should GET all stories', async () => {
        const getRes = await request(expressServer).get(`/api/stories`);
        expect(getRes.status).to.equal(200);
    });

    it('it should GET all stories for privacy=private', async () => {
        const privacy = 'private';
        const getRes = await request(expressServer).get(`/api/stories/privacy/${privacy}`);
        expect(getRes.status).to.equal(200);
    });

    it('it should GET all stories for privacy=public', async () => {
        const privacy = 'public';
        const getRes = await request(expressServer).get(`/api/stories/privacy/${privacy}`);
        expect(getRes.status).to.equal(200);
    });
    
  });

  describe('POST /api/stories', async () => {

    it('should return created story response', async () => {
      
        const postRes = await request(expressServer)
            .post('/api/stories')
            .send(utils.stories);

        expect(postRes.status).to.equal(200);
        expect(postRes.body).to.have.property('title', postRes.body.title.toString());
        expect(postRes.body).to.have.property('privacy', postRes.body.privacy.toString());
        expect(postRes.body).to.have.property('launch_date', postRes.body.launch_date.toString());
    });

  });

});