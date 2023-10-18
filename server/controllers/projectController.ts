import Project from '../models/projectModel';

const projectController : any = {};

projectController.addProject = async (req, res, next) => {
  const { projectName, user_id } = req.body;
  try {
    const project = await Project.create({ projectName, user_id });
    res.locals.project = project;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default projectController;