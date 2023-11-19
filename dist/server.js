"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes/routes"));
const path_1 = __importDefault(require("path"));
const ws_1 = require("ws");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
const mongoURI = process.env.MONGO_URI;
mongoose_1.default.connect(mongoURI);
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to Database');
});
app.use('/api', routes_1.default);
app.get('*', (req, res) => {
    return res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj);
    return res.status(errorObj.status).send(errorObj.message);
});
const server = app.listen(3000, () => {
    console.log('Server running on port 3000');
});
const wss = new ws_1.Server({ server });
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    // Send a JSON stringified message
    const data = { message: 'something' };
    ws.send(JSON.stringify(data));
});
exports.default = app;
