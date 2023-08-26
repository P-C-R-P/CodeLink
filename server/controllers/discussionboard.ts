import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

// Get all projects
async function getProjects(req: Request, res: Response) {
  const projects = await prisma.project.findMany({
    include: {
      comments: true,
    },
  });
  res.status(200).send(projects);
}

// Post a new project
async function postProject(req: Request, res: Response) {
  const { title, description, stack, timeline } = req.body;
  const newProject = await prisma.project.create({
    data: {
      title,
      description,
      stack,
      timeline
    },
  });
  res.status(200).send(newProject);
}

// Get comments for a specific project
async function getProjectComments(req: Request, res: Response) {
  const id = req.params.id;
  const comments = await prisma.comment.findMany({
    where: {
      projectId: id
    },
  });
  res.status(200).send(comments);
}

// Post a comment for a specific project
async function postProjectComment(req: Request, res: Response) {
  const id = req.params.id;
  const { text } = req.body;
  const newComment = await prisma.comment.create({
    data: {
      text,
      projectId: id,
    },
  });
  res.status(200).send(newComment);
}

// Post a vote for a specific project
async function postProjectVote(req: Request, res: Response) {
  const id = req.params.id;
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    res.status(404).send({ error: 'Project not found' });
    return;
  }

  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data: {
      votes: project.votes + 1,
    },
  });

  res.status(200).send(updatedProject);
}

export { getProjects, postProject, getProjectComments, postProjectComment, postProjectVote };
