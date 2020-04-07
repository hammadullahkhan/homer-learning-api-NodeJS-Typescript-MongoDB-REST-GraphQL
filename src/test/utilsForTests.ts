import {db} from '../models';

export const utils = {
  stories: {
    title: 'Test title',
    privacy: 'public',
    likes: 10,
    launch_date: new Date(),
  },

  async dropAllCollections () {
    await db.Stories.remove({});
  },
};
