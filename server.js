const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const next = require('next');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();
require('./db');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 8100;

app.use(bodyParser.json());
app.use('/users', userRoutes(io)); // Pass io to userRoutes
app.use('/tasks', taskRoutes(io)); // Pass io to taskRoutes

// Next.js pages
nextApp.prepare().then(() => {
    app.get('/my-nextjs-app/pages/index.tsx', (req, res) => {
        return handle(req, res);
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});
