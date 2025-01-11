import { Server as socketIo } from 'socket.io';
import userModel from './models/user.model.js';
import captainModel from './models/captain.model.js';

let io;

export async function initializeSocket(server) {
    io = new socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            console.log('Join event data:', data); // Debugging: Log the incoming data

            const { userId, userType } = data || {}; // Safeguard for undefined `data`
            console.log(`User ${userId} joined as ${userType}`)

            if (!userId || !userType) {
                console.error('Invalid join event payload:', data);
                return;
            }

            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`User ${userId} joined with socket ${socket.id}`);
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`Captain ${userId} joined with socket ${socket.id}`);
                } else {
                    console.log('Invalid user type in join event:', userType);
                }
            } catch (error) {
                console.error('Error updating socketId:', error);
            }
        });
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });





        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export const sendMessageToSocketId = (socketId, messageObject) => {
    if (!messageObject || !messageObject.event) {
        console.error('Invalid messageObject format. Ensure it contains "event" and "data".');
        return;
    }

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        // console.log(`Message sent to ${socketId}:`, "messageObject",messageObject,"messagedata",messageObject.event);
    } else {
        console.log('Socket.io not initialized.');
    }
};
