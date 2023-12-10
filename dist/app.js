"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/users', user_route_1.userRoute);
// Respond to the request with 'Server is running'
app.get('/', (req, res) => {
    res.send('Wow! The Application is running successfully');
});
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Page not found',
        error: {
            code: 404,
            description: 'Page not found',
        },
    });
});
exports.default = app;
