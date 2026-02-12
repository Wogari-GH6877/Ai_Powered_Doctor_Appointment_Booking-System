import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
const AiAssistant = () => {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [convId, setConvId] = useState(localStorage.getItem('chatId') || null);
    const [errorType, setErrorType] = useState(null); // 'quota' or 'generic'
    const [isListening, setIsListening] = useState(false);
    const chatEndRef = useRef(null);
    const token = localStorage.getItem('token'); 


    const handleVoiceInput = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("Your browser does not support voice input.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript); // Put the spoken words into the input field
        setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
};
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // --- NEW: LOAD HISTORY ON REFRESH ---
    useEffect(() => {
        const loadPersistedChat = async () => {
    if (convId && token) {
        try {
            setIsTyping(true);
            const { data } = await axios.get(`http://localhost:4000/api/chat/history/${convId}`, {
                headers: { token: token }
            });
            
            // Ensure data.messages is actually an array before setting it
            if (data.success && Array.isArray(data.messages)) {
                setMessages(data.messages);
            } else {
                setMessages([]); // Fallback to empty array if no messages found
            }
        } catch (error) {
            console.error("Error loading persisted history:", error);
            setMessages([]); // Fallback on error
        } finally {
            setIsTyping(false);
        }
    }
};
        loadPersistedChat();
    }, []); // Runs once when component mounts
    // -------------------------------------

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const startNewChat = () => {
    setConvId(null);
    setMessages([]);
    localStorage.removeItem('chatId');
};


    const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    setErrorType(null); // Clear previous errors
    const userMsg = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    const lastInput = input; // Keep a backup of the text
    setInput("");
    setIsTyping(true);

    try {
        const { data } = await axios.post('http://localhost:4000/api/chat/ask', 
            { message: lastInput, conversationId: convId },
            { headers: { token: token } }
        );

        if (data.success) {
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.reply }] }]);
            if (data.conversationId) {
                setConvId(data.conversationId);
                localStorage.setItem('chatId', data.conversationId);
            }
        }
    } catch (error) {
        console.error("AI Error:", error);
        
        if (error.response?.status === 429) {
            setErrorType('quota');
            setMessages(prev => [...prev, { 
                role: 'model', 
                parts: [{ text: "System is busy (Quota Limit). Please wait 10 seconds and try again." }] 
            }]);
            setInput(lastInput); // Put the text back so they don't have to re-type
        } else {
            setErrorType('generic');
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Something went wrong." }] }]);
        }
    } finally {
        setIsTyping(false);
    }
};

return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
        {/* Floating Toggle Button with Pulse Effect */}
        <button 
            onClick={() => setShowChat(!showChat)}
            className={`group relative p-4 rounded-full shadow-2xl transition-all duration-500 ease-out hover:scale-110 active:scale-95 ${
                showChat ? 'bg-gray-100 rotate-90' : 'bg-[#7375F5]'
            }`}
        >
            {!showChat && (
                <span className="absolute inset-0 rounded-full bg-[#7375F5] animate-ping opacity-20"></span>
            )}
            {showChat ? (
                <span className="text-[#7375F5] text-2xl font-light">✕</span>
            ) : (
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white transform group-hover:rotate-12 transition-transform">
                    <path d="M12 2C6.477 2 2 6.133 2 11.235c0 2.64 1.204 5.013 3.143 6.643l-.707 2.357a.5.5 0 00.68.61l2.96-1.57c1.233.43 2.56.665 3.924.665 5.523 0 10-4.133 10-9.235S17.523 2 12 2z" />
                </svg>
            )}
        </button>

        {/* Chat Window */}
        {showChat && (
            <div className="absolute bottom-20 right-0 w-[380px] h-[600px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
                
                {/* Premium Header */}
                <div className="bg-[#7375F5] p-5 text-white flex justify-between items-center shadow-lg relative overflow-hidden">
                    {/* Decorative Background Glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                            <span className="text-xl">🩺</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-base tracking-tight">Wakcare AI</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <p className="text-[10px] font-medium opacity-90 uppercase tracking-wider">Online Assistant</p>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={startNewChat}
                        className="relative z-10 bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all backdrop-blur-sm border border-white/10 flex items-center gap-1"
                    >
                        <span>+</span> New Chat
                    </button>
                </div>

                {/* Messages Area with Custom Scrollbar */}
                <div className="flex-1 p-5 overflow-y-auto bg-[#F9FAFF] space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
                    {messages?.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full opacity-40 text-center px-10">
                            <div className="text-4xl mb-4">👋</div>
                            <p className="text-sm font-medium text-slate-600">
                                Hello! I can help you find doctors, check fees, or book specialties.
                            </p>
                        </div>
                    )}

                    {messages?.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-${m.role === 'user' ? 'right' : 'left'}-4 duration-300`}>
                            <div className={`max-w-[85%] px-4 py-3 shadow-sm ${
                                m.role === 'user' 
                                ? 'bg-[#7375F5] text-white rounded-2xl rounded-tr-none' 
                                : 'bg-white text-slate-700 rounded-2xl rounded-tl-none border border-slate-100'
                            }`}>
                                <p className="text-[13.5px] leading-relaxed">
                                    <ReactMarkdown>{m.parts?.[0]?.text}</ReactMarkdown>
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex justify-start animate-pulse">
                            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#7375F5] rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-[#7375F5] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-[#7375F5] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Footer / Input Area */}
                <div className="p-4 bg-white">
                    {errorType === 'quota' && (
                        <div className="mb-3 flex items-center justify-between bg-red-50 p-2 rounded-xl border border-red-100">
                            <span className="text-[10px] text-red-600 font-medium ml-2">⚠️ API Limit reached</span>
                            <button 
                                onClick={handleSend}
                                className="text-[10px] bg-red-600 text-white px-3 py-1 rounded-lg font-bold hover:bg-red-700 transition-colors"
                            >
                                RETRY
                            </button>
                        </div>
                    )}


                    <form onSubmit={handleSend} className="relative flex items-center bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-[#7375F5] transition-all p-1.5 gap-1">
    
                            {/* Voice Input Button */}
                            <button
                                type="button"
                                onClick={handleVoiceInput}
                                className={`p-2 rounded-xl transition-all ${
                                    isListening 
                                    ? 'bg-red-500 text-white animate-pulse' 
                                    : 'text-slate-400 hover:text-[#7375F5] hover:bg-white'
                                }`}
                            >
                                {isListening ? (
                                    <span className="text-xs font-bold px-1">Listening...</span>
                                ) : (
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                                    </svg>
                                )}
                            </button>

                            <input 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isListening ? "Speak now..." : "Ask Wakcare AI..."}
                                className="flex-1 bg-transparent border-none outline-none px-2 py-2 text-sm text-slate-700 placeholder:text-slate-400"
                            />

                            <button 
                                type="submit" 
                                disabled={!input.trim() || isTyping}
                                className="bg-[#7375F5] text-white p-2.5 rounded-xl disabled:opacity-40 transition-all hover:bg-[#5e60d8]"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </form>
                    
                    {/* <form onSubmit={handleSend} className="relative flex items-center bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-[#7375F5] focus-within:ring-4 focus-within:ring-[#7375F5]/5 transition-all p-1.5">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Wakcare AI..."
                            className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400"
                        />
                        <button 
                            type="submit" 
                            disabled={!input.trim() || isTyping}
                            className="bg-[#7375F5] text-white p-2.5 rounded-xl disabled:opacity-40 disabled:grayscale transition-all hover:bg-[#5e60d8] active:scale-90"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </form> */}
                    <p className="text-[9px] text-center text-slate-400 mt-2 tracking-tight">
                        AI may provide general info. Please consult a doctor for emergencies.
                    </p>
                </div>
            </div>
        )}
    </div>
);
    // return (
    //     <div className="fixed bottom-8 right-8 z-50 font-sans">
    //         {/* Floating Toggle Button */}
    //         <button 
    //             onClick={() => setShowChat(!showChat)}
    //             className="bg-[#7375F5] p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
    //         >
    //             {showChat ? (
    //                 <span className="text-white text-2xl font-bold">×</span>
    //             ) : (
    //                 <span className="text-white">💬</span> /* Or use a Chat Icon SVG */
    //             )}
    //         </button>

    //         {/* Chat Window */}
    //         {showChat && (
    //             <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white border border-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    
    //                 {/* Header */}
                    
    //                 <div className="bg-[#7375F5] p-4 text-white flex justify-between items-center">
    //                     <div>
    //                         <h3 className="font-semibold text-lg">Wakcare Assistant</h3>
    //                         <p className="text-xs opacity-80">Always active</p>
    //                     </div>

    //                     <button 
    //                         onClick={startNewChat}
    //                         className="bg-white/20 hover:bg-white/30 p-2 rounded-lg text-xs transition-colors"
    //                         title="Start New Chat">
    //                         + New Chat
    //                     </button>
    //                 </div>

                       

    //                 {/* Messages Area */}
    //                 <div className="flex-1 p-4 overflow-y-auto bg-[#F8F9FF] space-y-4">
    //                     {(messages?.length === 0) && (
    //                             <p className="text-center text-gray-400 text-sm mt-10">
    //                                 Ask me anything about our doctors or specialties!
    //                             </p>
    //                         )}

    //             {/* Change messages.map to this */}
    //             {messages?.map((m, i) => (
    //                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    //                     <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
    //                         m.role === 'user' 
    //                         ? 'bg-[#7375F5] text-white rounded-tr-none' 
    //                         : 'bg-white text-black shadow-sm border border-gray-100 rounded-tl-none'
    //                     }`}>
    //                         {/* Safe access to nested text */}
    //                         {m.parts?.[0]?.text}
    //                     </div>
    //                 </div>
    //             ))}
                        
    //                     {/* Typing Animation */}
    //                     {isTyping && (
    //                         <div className="flex justify-start">
    //                             <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
    //                                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
    //                                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
    //                                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
    //                             </div>
    //                         </div>
    //                     )}
    //                     <div ref={chatEndRef} />
    //                 </div>

    //                 {/* Input Area */}
    //                 {errorType === 'quota' && (
    //                         <div className="px-4 pb-2">
    //                             <button 
    //                                 onClick={handleSend}
    //                                 className="text-xs bg-[#7375F5] text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
    //                             >
    //                                 🔄 Retry now
    //                             </button>
    //                         </div>
    //                     )}
    //                 <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
    //                     <input 
    //                         value={input}
    //                         onChange={(e) => setInput(e.target.value)}
    //                         placeholder="Type your message..."
    //                         className="flex-1 bg-gray-50 border-none outline-none p-2 rounded-lg text-sm text-black"
    //                     />
    //                     <button 
    //                         type="submit" 
    //                         disabled={!input.trim()}
    //                         className="text-[#7375F5] font-semibold disabled:opacity-50"
    //                     >
    //                         Send
    //                     </button>
    //                 </form>
    //             </div>
    //         )}
    //     </div>
    // );
};

export default AiAssistant;