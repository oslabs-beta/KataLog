import Log from '../models/logModel';

// non-pod log types
const sourceTypes = ['apiserver', 'etcd', 'controller-manager', 'proxy', 'scheduler', 'coredns', 'storage-provisioner'];

const logController : any = { sourceTypes: sourceTypes };

logController.getLogs = async (req, res, next) => {

  const logs = await Log.find({project_id: req.params.selectedProject});

  res.locals.logs = logs;

  return next();
};


export default logController;
