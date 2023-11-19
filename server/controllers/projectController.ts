import Project from '../models/projectModel';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

// const crypto = require('crypto');

function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

const projectController : any = {};

// getProjects middleware - view all projects a user can view logs for
projectController.getProjects = async (req, res, next) => {
  // grab existing user projects, searching using user id from jwt token
  const projects = await Project.find({ user_id: req.user.id });
  // return status of 200 and user projects
  return res.status(200).json(projects);
}

// createProject middleware - create a new project to view logs for
projectController.createProject = async (req, res, next) => {
  // deconstuct request body
  console.log('user_id', req.user.id);
  const { projectName } = req.body;
  // if projectName not provided
  if (!projectName){
    // invoke global error handler
    return next({
      log: 'projectController.addProject',
      // ask user to provide project name
      message: { err: 'Please provide project name' }, 
    });
  }

  const token = generateToken();
  const SALT_WORK_FACTOR: number = 10;
  const hashedToken = await bcrypt.hash(token, SALT_WORK_FACTOR);

  // create project in database, using user id from jwt token as user_id field
  // !! authToken not currently being sent !!
  const newProject = await Project.create({ projectName, user_id: req.user.id });
  // return status of 200 and new project
  return res.status(200).json(newProject);
};

// deleteProject middleware - delete a project
projectController.deleteProject = async (req, res, next) => {
  // delete project in database - search using req.params (to match project id) and req.user (to match user id)
  const deletedProject = await Project.findOneAndDelete({_id: req.params.id, user_id: req.user.id });
  // if project to delete is not in database or doesn't match user info(i.e. deletedProject is null)
  if (!deletedProject){
    // invoke global error handler
    return next({
      log: 'projectController.deleteProject',
      // project unable to be deleted
      message: { err: 'Project unable to be deleted' }, 
    });
  }
  // return status of 200 and deleted project
  return res.status(200).json(deletedProject);
};

export default projectController;