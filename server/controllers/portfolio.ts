import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { fetchRepositories } from '../APIs/github';

const prisma = new PrismaClient();

async function repoFilter (req: Request, res: Response) {
  try {
    const username = req.params.username;
    let repos = await fetchRepositories(username);
    repos = repos.filter((el) => el.stargazers_count > 0);
    res.status(200).send(repos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while fetching the repositories from GitHub' });
  }
}

async function postRepo (req: Request, res: Response) {
  try {
    const repos = req.body.selectedRepos;
    repos.map(async (el) => {
      await prisma.repository.create({
        data: {
          name: el.name,
          description: el.description,
          updatedAt: el.updated_at,
          createdAt: el.created_at,
          language: el.language,
          profileId: 1
        }
      });
    });
    res.status(201).send({ key: 'REPO CREATED' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while posting the repositories' });
  }
}

async function getPortfolio (req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const portfolio = await prisma.repository.findMany({
      where: {
        profileId: id
      }
    });
    res.status(200).send(portfolio);
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .send({ error: 'No repositories were found for the given ID' });
  }
}

async function deleteRepo (req: Request, res: Response) {
  try {
    const { id } = req.body;
    await prisma.repository.delete({
      where: {
        id
      }
    });
    res.status(200).send({ key: 'REPO DELETED' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while deleting the repositories' });
  }
}

export { repoFilter, postRepo, getPortfolio, deleteRepo };
