import doctorModel from "../Models/DoctorModel.js";
import chatModel from "../Models/ChatModel.js";
import appointmentModel from "../Models/AppointmentModel.js";
import { getAiModel } from "../Config/GeminiConfig.js";
import crypto from "crypto";

// const getAiResponse = async (req, res) => {
//     try {
//         const { message } = req.body;
//         let { conversationId } = req.body;
        
//         // userId comes directly from your middleware!
//         const userId = req.userId;

//         // 1. Validation
//         if (!message) {
//             return res.status(400).json({ success: false, message: "Message is required" });
//         }

//         // 2. Auto-generate conversationId if it's new/null
//         // This prevents the "conversationId is required" Mongoose error
//         if (!conversationId || conversationId === "null") {
//             conversationId = `chat_${crypto.randomBytes(3).toString('hex')}_${Date.now()}`;
//         }

//         // 3. Fetch Context (Live Doctor Data)
//         const doctors = await doctorModel.find({ available: true });
//         const doctorContext = doctors.map(doc => 
//             `Dr. ${doc.name} (${doc.speciality}), Fees: ${doc.fees}, Exp: ${doc.experience}, Address: ${doc.address.line1} ${doc.address.line2}, About: ${doc.about},Available: ${doc.available}`
//         ).join(" | ");

//         // 4. Fetch History
//         const dbHistory = await chatModel.find({ conversationId }).sort({ createdAt: 1 });
//         const formattedHistory = dbHistory.map(chat => ({
//             role: chat.role,
//             parts: [{ text: chat.parts[0].text }]
//         }));

//         // 5. AI Logic
//         const model = getAiModel(doctorContext);
//         const chatSession = model.startChat({ history: formattedHistory });
//         const result = await chatSession.sendMessage(message);
//         const replyText = result.response.text();

//         // 6. Save to DB (Guaranteed to have userId and conversationId now)
//         console.log("Saving to DB:", { userId, conversationId, messageLength: message.length });

//             await chatModel.create([
//                 { userId, conversationId, role: 'user', parts: [{ text: message }] },
//                 { userId, conversationId, role: 'model', parts: [{ text: replyText }] }
//             ]);

//         console.log("Save Successful!");

//         res.json({ 
//             success: true, 
//             reply: replyText, 
//             conversationId // Send back to frontend to keep the thread alive
//         });

//     } catch (error) {
//           console.error("AI Controller Error:", error);

//     // If Google says "Too Many Requests"
//     if (error.status === 429) {
//         return res.status(429).json({ 
//             success: false, 
//             message: "AI is a bit busy right now. Please wait a few seconds before asking again!" 
//         });
//     }        res.status(500).json({ success: false, message: "Server error" });
//     }
// };

// const getAiResponse = async (req, res) => {
//   try {
//     const { message } = req.body;
//     let { conversationId } = req.body;
//     const userId = req.userId;

//     // 1️⃣ Validate message
//     if (!message) {
//       return res.status(400).json({ success: false, message: "Message is required" });
//     }

//     // 2️⃣ Auto-generate conversationId if missing
//     if (!conversationId || conversationId === "null") {
//       conversationId = `chat_${crypto.randomBytes(3).toString("hex")}_${Date.now()}`;
//     }

//     // 3️⃣ Fetch available doctors for context
//     const doctors = await doctorModel.find({ available: true });
//     const doctorContext = doctors
//       .map(
//         (doc) =>
//           `Dr. ${doc.name} (${doc.speciality}), Fees: ${doc.fees}, Exp: ${doc.experience}, Address: ${doc.address.line1} ${doc.address.line2}, About: ${doc.about}, Available: ${doc.available}`
//       )
//       .join(" | ");

//     // 4️⃣ Fetch previous chat history
//     // const dbHistory = await chatModel.find({ conversationId }).sort({ createdAt: 1 });

//     // // Map DB roles to AI SDK roles
//     // const formattedHistory = dbHistory.map((chat) => ({
//     //   role: chat.role === "model" ? "assistant" : "user",
//     //   content: chat.parts[0].text
//     // }));

// //     

// // Fetch previous chat history
// const dbHistory = await chatModel.find({ conversationId }).sort({ createdAt: 1 });

// // 2️⃣ Sanitize and map to Google SDK format
// const formattedHistory = dbHistory
//   .filter(chat => 
//       chat.role &&                 // role exists
//       (chat.role === 'user' || chat.role === 'model') && // only valid roles
//       Array.isArray(chat.parts) && chat.parts.length > 0 // parts exist
//   )
//   .map(chat => ({
//       role: chat.role,           // keep 'user' or 'model'
//       parts: [{ text: chat.parts[0].text }]
//   }));

// // 3️⃣ Start AI chat session
// const chatSession = model.startChat({
//     history: [
//         { role: "user", parts: [{ text: message }] }, // MUST be first
//         ...formattedHistory
//     ]
// });
// // Start AI chat session, prepend current user message first
// // const model = getAiModel(doctorContext);
// // const chatSession = model.startChat({
// //   history: [
// //     { role: "user", parts: [{ text: message }] }, // MUST be first
// //     ...formattedHistory
// //   ]
// // });

// // Send message
// const result = await chatSession.sendMessage(message);
// const replyText = result.response.text();


//     // 6️⃣ Save user + AI messages to DB
//     await chatModel.create([
//       { userId, conversationId, role: "user", parts: [{ text: message }] },
//       { userId, conversationId, role: "model", parts: [{ text: replyText }] }
//     ]);

//     console.log("Save Successful!");

//     // 7️⃣ Respond to frontend
//     res.json({
//       success: true,
//       reply: replyText,
//       conversationId // return to keep thread alive
//     });
//   } catch (error) {
//     console.error("AI Controller Error:", error);

//     if (error.status === 429) {
//       return res.status(429).json({
//         success: false,
//         message: "AI is busy. Please wait a few seconds before asking again!"
//       });
//     }

//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };




const getAiResponse = async (req, res) => {
  try {
    const { message } = req.body;
    let { conversationId } = req.body;
    const userId = req.userId;

    // 1️⃣ Basic Validation
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    if (!conversationId || conversationId === "null") {
      conversationId = `chat_${crypto.randomBytes(3).toString("hex")}_${Date.now()}`;
    }

    // 2️⃣ Fetch General Doctor List (for availability)
    const doctors = await doctorModel.find({ available: true });
    const doctorList = doctors
      .map(doc => `Dr. ${doc.name} (${doc.speciality}), Fees: ${doc.fees},About: ${doc.about}, Available: ${doc.available}`)
      .join(" | ");

    // 3️⃣ Fetch User's Specific Appointments (The "I see you have..." feature)
    // We look for appointments for this specific user that aren't cancelled
    const appointments = await appointmentModel.find({ userId, cancelled: false });
    const appointmentContext = appointments.length > 0 
      ? appointments.map(app => 
          `Appointment with ${app.docData.name} on ${app.slotDate} at ${app.slotTime}. Status: ${app.isCompleted ? 'Completed' : 'Upcoming'}`
        ).join(" | ")
      : "No current appointments booked.";

    // 4️⃣ Combine Context for the AI
    const systemContext = `
      You are WakCare AI, a helpful medical assistant. 
      Available Doctors: ${doctorList}.
      Current User Appointments: ${appointmentContext}.
      Instructions: Use the appointment info to greet the user if they ask about their schedule.
    `;

    // 5️⃣ Fetch and Sanitize History (Fixes the "First content must be user" error)
    const dbHistory = await chatModel.find({ conversationId }).sort({ createdAt: 1 });
    
    let formattedHistory = dbHistory
      .filter(chat => chat.role && (chat.role === 'user' || chat.role === 'model'))
      .map(chat => ({
        role: chat.role,
        parts: [{ text: chat.parts[0].text }]
      }));

    // CRITICAL FIX: Ensure history starts with 'user'
    const firstUserIndex = formattedHistory.findIndex(msg => msg.role === 'user');
    if (firstUserIndex !== -1) {
      formattedHistory = formattedHistory.slice(firstUserIndex);
    } else {
      formattedHistory = []; // Clear it if no user message found to avoid SDK crash
    }

    // 6️⃣ Initialize Model & Session
    // Pass the systemContext to your helper function
    const model = getAiModel(systemContext); 
    
    const chatSession = model.startChat({
      history: formattedHistory
    });

    // 7️⃣ Generate AI Response
    const result = await chatSession.sendMessage(message);
    const replyText = result.response.text();

    // 8️⃣ Save to Atlas
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

// 2. FOR REFRESH/LOADING: Gets the actual messages
// Inside chatController.js
 const getChatMessages = async (req, res) => {
    try {
        // This MUST match the name in your route (:conversationId)
        const { conversationId } = req.params; 
        const userId = req.userId;

    
        const messages = await chatModel.find({ conversationId, userId }).sort({ createdAt: 1 });
        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error loading messages" });
    }
};

export { getAiResponse,getChatList, getChatMessages  };