import doctorModel from "../Models/DoctorModel.js";
import chatModel from "../Models/ChatModel.js";
import appointmentModel from "../Models/AppointmentModel.js";
import { getAiModel } from "../Config/GeminiConfig.js";
import crypto from "crypto";





const getAiResponse = async (req, res) => {
  try {
    const { message } = req.body;
    let { conversationId } = req.body;
    const userId = req.userId;

    // 1️Basic Validation
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    if (!conversationId || conversationId === "null") {
      conversationId = `chat_${crypto.randomBytes(3).toString("hex")}_${Date.now()}`;
    }

    // 2️ Fetch General Doctor List (for availability)
    const doctors = await doctorModel.find({ available: true });
    const doctorList = doctors
      .map(doc => `Dr. ${doc.name} (${doc.speciality}), Fees: ${doc.fees},About: ${doc.about}, Available: ${doc.available}`)
      .join(" | ");

    // We look for appointments for this specific user that aren't cancelled
    const appointments = await appointmentModel.find({ userId, cancelled: false });
    const appointmentContext = appointments.length > 0 
      ? appointments.map(app => 
          `Appointment with ${app.docData.name} on ${app.slotDate} at ${app.slotTime}. Status: ${app.isCompleted ? 'Completed' : 'Upcoming'}`
        ).join(" | ")
      : "No current appointments booked.";

    // 4 Combine Context for the AI
    const systemContext = `
      You are WakCare AI, a helpful medical assistant. 
      Available Doctors: ${doctorList}.
      Current User Appointments: ${appointmentContext}.
      Instructions: Use the appointment info to greet the user if they ask about their schedule.
    `;

    // 5 Fetch and Sanitize History (Fixes the "First content must be user" error)
    const dbHistory = await chatModel.find({ conversationId }).sort({ createdAt: 1 });
    
    let formattedHistory = dbHistory
      .filter(chat => chat.role && (chat.role === 'user' || chat.role === 'model'))
      .map(chat => ({
        role: chat.role,
        parts: [{ text: chat.parts[0].text }]
      }));





    const firstUserIndex = formattedHistory.findIndex(msg => msg.role === 'user');
    if (firstUserIndex !== -1) {
      formattedHistory = formattedHistory.slice(firstUserIndex);
    } else {
      formattedHistory = []; // Clear it if no user message found to avoid SDK crash
    }

   
    // Pass the systemContext to your helper function
    const model = getAiModel(systemContext); 
    
    const chatSession = model.startChat({
      history: formattedHistory
    });

    // Generate AI Response
    const result = await chatSession.sendMessage(message);
    const replyText = result.response.text();

    //  Save to Atlas
    await chatModel.create([
      { userId, conversationId, role: "user", parts: [{ text: message }] },
      { userId, conversationId, role: "model", parts: [{ text: replyText }] }
    ]);

    res.json({
      success: true,
      reply: replyText,
      conversationId
    });

  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong with the AI." });
  }
};

// 1. FOR THE SIDEBAR: Just gets the IDs
 const getChatList = async (req, res) => {
    try {
        const userId = req.userId;
        const conversations = await chatModel.find({ userId }).distinct("conversationId");
        res.json({ success: true, conversations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error" });
    }
};



 const getChatMessages = async (req, res) => {
    try {
        const { conversationId } = req.params; 
        const userId = req.userId;

    
        const messages = await chatModel.find({ conversationId, userId }).sort({ createdAt: 1 });
        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error loading messages" });
    }
};

export { getAiResponse,getChatList, getChatMessages  };