import { io } from 'socket.io-client';
import { api } from './enums';

const socket = io(api.baseUrl);
socket.on('connect', () => console.log('sockets connected'))

export default socket;