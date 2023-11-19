"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectModel_1 = __importDefault(require("../models/projectModel"));
const projectController = {};
// getProjects middleware - view all projects a user can view logs for
projectController.getProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // grab existing user projects, searching using user id from jwt token
    const projects = yield projectModel_1.default.find({ user_id: req.user.id });
    // return status of 200 and user projects
    return res.status(200).json(projects);
});
// createProject middleware - create a new project to view logs for
projectController.createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // deconstuct request body
    console.log('user_id', req.user.id);
    const { projectName } = req.body;
    // if projectName not provided
    if (!projectName) {
        // invoke global error handler
        return next({
            log: 'projectController.addProject',
            // ask user to provide project name
            message: { err: 'Please provide project name' },
        });
    }
    // create project in database, using user id from jwt token as user_id field
    // !! authToken not currently being sent !!
    const newProject = yield projectModel_1.default.create({ projectName, user_id: req.user.id });
    // return status of 200 and new project
    return res.status(200).json(newProject);
});
// deleteProject middleware - delete a project
projectController.deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // delete project in database - search using req.params (to match project id) and req.user (to match user id)
    const deletedProject = yield projectModel_1.default.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    // if project to delete is not in database or doesn't match user info(i.e. deletedProject is null)
    if (!deletedProject) {
        // invoke global error handler
        return next({
            log: 'projectController.deleteProject',
            // project unable to be deleted
            message: { err: 'Project unable to be deleted' },
        });
    }
    // return status of 200 and deleted project
    return res.status(200).json(deletedProject);
});
exports.default = projectController;
