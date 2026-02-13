import express from 'express';
import { getAiResponse, getChatList, getChatMessages } from '../Controllers/chatController.js';
import userAuth from '../MiddleWare/userAuth.js'; 

const chatRouter = express.Router();

chatRouter.post('/ask', userAuth, getAiResponse);

chatRouter.get('/history-list', userAuth, getChatList);


chatRouter.get('/history/:conversationId', userAuth, getChatMessages);

export default chatRouter;


