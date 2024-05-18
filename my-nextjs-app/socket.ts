import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8100');

export default socket;
