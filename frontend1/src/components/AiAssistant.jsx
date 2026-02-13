import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const AiAssistant = () => {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [convId, setConvId] = useState(localStorage.getItem('chatId') || null);
    const [isListening, setIsListening] = useState(false);
    const chatEndRef = useRef(null);
    const token = localStorage.getItem('token');

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // restored VOICE INPUT
    const handleVoiceInput = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support voice input.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            setInput(event.results[0][0].transcript);
            setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    useEffect(() => {
        const loadPersistedChat = async () => {
            if (convId && token) {
                try {
                    setIsTyping(true);
                    const { data } = await axios.get(`http://localhost:4000/api/chat/history/${convId}`, {
                        headers: { token: token }
                    });
                    if (data.success && Array.isArray(data.messages)) setMessages(data.messages);
                } catch (error) { console.error(error); } finally { setIsTyping(false); }
            }
        };
        loadPersistedChat();
    }, [convId, token]);

    useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim() || isTyping) return;
        const lastInput = input;
        setMessages(prev => [...prev, { role: 'user', parts: [{ text: lastInput }] }]);
        setInput("");
        setIsTyping(true);
        try {
            const { data } = await axios.post('http://localhost:4000/api/chat/ask', 
                { message: lastInput, conversationId: convId },
                { headers: { token: token } }
            );
            if (data.success) {
                setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.reply }] }]);
                setConvId(data.conversationId);
                localStorage.setItem('chatId', data.conversationId);
            }
        } catch (error) { setIsTyping(false); } finally { setIsTyping(false); }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 font-sans">
            {/* 1️⃣ FLOATING TEXT BUBBLE (Returned) */}
            {!showChat && (
                <div className="bg-white px-3 py-1.5 rounded-xl shadow-lg border border-gray-100 animate-bounce mb-3 relative mr-2">
                    <p className="text-[11px] font-bold text-primary whitespace-nowrap">
                        Wakcare AI Assistance ✨
                    </p>
                    {/* Triangle pointer */}
                    <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white border-r border-b border-gray-100 rotate-45"></div>
                </div>
            )}
            {/* Pulsing Toggle Button */}
            {!showChat && (
                <button 
                    onClick={() => setShowChat(true)}
                    className="group relative bg-primary p-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-transform hover:scale-110 active:scale-95 text-white"
                >
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10">
                        <path d="M12 2C6.477 2 2 6.133 2 11.235c0 2.64 1.204 5.013 3.143 6.643l-.707 2.357a.5.5 0 00.68.61l2.96-1.57c1.233.43 2.56.665 3.924.665 5.523 0 10-4.133 10-9.235S17.523 2 12 2z" />
                    </svg>
                </button>
            )}

            {/* Premium Responsive Chat Window */}
            {showChat && (
                <div className="fixed inset-0 sm:inset-auto sm:bottom-0 sm:right-0 w-full h-full sm:w-[380px] sm:h-[620px] bg-white sm:rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500 border border-gray-100">
                    
                    {/* Header with Decorative Background */}
                    <div className="bg-primary p-6 text-white relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-xl">🩺</div>
                                <div>
                                    <h3 className="font-bold text-base tracking-tight">Wakcare AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        <p className="text-[10px] font-medium opacity-90 uppercase tracking-widest">Online</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => { setMessages([]); setConvId(null); localStorage.removeItem('chatId'); }} className="text-[11px] bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-all font-semibold backdrop-blur-sm border border-white/10">New</button>
                                <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors text-2xl">✕</button>
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-5 overflow-y-auto bg-[#F8F9FD] space-y-6">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center opacity-40 text-center px-6">
                                <div className="text-4xl mb-3">✨</div>
                                <p className="text-sm font-medium text-slate-600">I can help you find doctors or check your appointments!</p>
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                                <div className={`max-w-[85%] p-4 shadow-sm text-[13.5px] leading-relaxed ${
                                    m.role === 'user' 
                                    ? 'bg-primary text-white rounded-2xl rounded-tr-none' 
                                    : 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-none'
                                }`}>
                                    <ReactMarkdown>{m.parts[0].text}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start gap-1 p-2">
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Footer / Input Area */}
                    <div className="p-4 bg-white border-t border-slate-50">
                        <form onSubmit={handleSend} className="flex items-center bg-slate-100/80 rounded-2xl p-1.5 gap-1 focus-within:bg-white focus-within:ring-2 ring-primary/10 transition-all border border-transparent focus-within:border-primary/20">
                            {/* Restored Voice Button */}
                            <button 
                                type="button" 
                                onClick={handleVoiceInput}
                                className={`p-2.5 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-primary hover:bg-white shadow-sm'}`}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>
                            </button>

                            <input 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isListening ? "Listening..." : "How can I help?"}
                                className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-slate-700 placeholder:text-slate-400 font-medium"
                            />

                            <button type="submit" disabled={!input.trim()} className="bg-primary text-white p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-md shadow-primary/20">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                            </button>
                        </form>
                        <p className="text-[9px] text-center text-slate-400 mt-3 font-medium tracking-tight">Wakcare AI can make mistakes. Verify medical info.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiAssistant;