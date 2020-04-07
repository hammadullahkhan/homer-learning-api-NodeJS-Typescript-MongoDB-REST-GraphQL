import * as express from "express";
import * as storiesController from "../../controllers/storiesController";
import * as internalMiddleWare from '../../middleware/middleware';

const router: express.Router = express.Router();

// THE ONE ASKED
router.route('/public/likes/:numLikes')
.get(storiesController.getAllPublicStoriesForTwentyLikesMin);


router.route('/')
  .get(storiesController.getAllStories)
  .post(internalMiddleWare.sanitizeStories,storiesController.createStory);


router.route('/privacy/:privacy')
  .get(storiesController.getAllStoriesByPrivacy);


export const storiesRouter = router;
