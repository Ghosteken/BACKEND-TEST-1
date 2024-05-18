const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); 
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();
require('./db');

const app = express();
const swaggerDocument = YAML.load('./Swagger.yaml'); 
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 8100;

app.use(bodyParser.json());
app.use('/routes/userRoutes.js', userRoutes(io)); // Pass io to userRoutes
app.use('/routes/taskRoutes.js', taskRoutes(io)); // Pass io to taskRoutes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
