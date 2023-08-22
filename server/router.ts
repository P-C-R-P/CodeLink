
import express, { Router } from 'express';
import { postUser } from './controllers/user';
import { postSkill, deleteSkill } from './controllers/skill';
import { updateProfile, getProfile } from './controllers/profile';
import { fetchNews } from './APIs/news';
import { PrismaClient } from '@prisma/client';
import checkJwt from './auth/authMiddleware';
import { AuthRequest } from './auth/authTypes';
import { repoFilter, postRepo, getPortfolio } from './controllers/portfolio';


import {
  getProjects,
  postProject,
  getProjectComments,
  postProjectComment,
  postProjectVote,
} from './controllers/discussionboard';

const router: Router = express.Router();

const prisma = new PrismaClient();

router.get('/home', );
router.get('/news', fetchNews);
router.get('/repos/:username', repoFilter);
router.post('/create-repos', postRepo);
router.get('/portfolio/:id', getPortfolio);
router.post('/register', );
router.post('/login', );
router.post('/create-profile', postUser);
router.post('/create-skill', postSkill);
router.delete('/delete-skill', deleteSkill);
router.get('/profile/:id', ); // WHEN AUTH STUFF IS CLEAR
router.get('/profile/:id', getProfile);
router.put('/update-profile/:id', updateProfile); // MAYBE ALSO ADD ID
router.get('/home/username',);

router.get('http://localhost:3000/profile', checkJwt, async (req: AuthRequest, res) => {
    console.log(req.headers.authorization);
    const userId = req.user?.sub;
    console.log('User ID from JWT:', userId);
    const userProfile = await prisma.user.findUnique({ where: { auth0Id: userId }, include: { profile: true } });

    if (userProfile) {
        res.json(userProfile);
    } else {
        res.status(404).send('Profile not found');
    }
}); // Maybe userId
router.get('/home/:username', checkJwt, async (req, res) => {
  const username = req.params.username;
  const user = await prisma.user.findUnique({ where: { username } });

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
  //prima logic
});

router.get('/project', getProjects);
router.post('/project', postProject);
router.get('/project/:id/comment', getProjectComments);
router.post('/project/:id/comment', postProjectComment);
router.post('/project/:id/vote', postProjectVote);

export { router };
