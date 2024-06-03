import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


import "./chat.css";
import { FaPaperPlane } from "react-icons/fa";

const baseURL = "https://medicalapp-3.onrender.com/api/v1/ask";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);





  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };




  const sendMessage = async () => {
    // Update the local state before sending the message to the backend
    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]); // Add user message to the messages array
    setIsAssistantTyping(true);
  
    try {
      const response = await axios.post(`${baseURL}/`, {
        message: inputMessage,
      }, {
        headers: {
          'Content-Type': 'application/json', // Adjust content type as needed
        },
      });
  
      // Update the messages state with the response
      const assistantMessage = { role: 'assistant', content: response.data['data'] };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsAssistantTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prevMessages => [...prevMessages, { content: "⚠️ An error occurred while sending the message.", role: 'assistant' }]);
      setIsAssistantTyping(false);
    }
  };
  



  function formatMessageContent(content) {
    const sections = content.split(/(```[\s\S]*?```|`[\s\S]*?`)/g);
    return sections
      .map((section) => {
        if (section.startsWith("```") && section.endsWith("```")) {
          section = section.split("\n").slice(1).join("\n");
          const code = section.substring(0, section.length - 3);
          return `<pre><code class="code-block">${code}</code></pre>`;
        } else if (section.startsWith("`") && section.endsWith("`")) {
          const code = section.substring(1, section.length - 1);
          return `<code class="inline-code">${code}</code>`;
        } else {
          return section.replace(/\n/g, "<br>");
        }
      })
      .join("");
  }

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-history-container bg-info">
     
        </div>
        <div className="chat-ui">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
          className={`message ${
            message.role === "user" ? "user" : "assistant"
          }`}
          dangerouslySetInnerHTML={{
            __html: formatMessageContent(message.content),
          }}
        />
        ))}
        {isAssistantTyping && (
          <div className="message assistant">
            <div className="typing-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="chat-input">
      <textarea
        placeholder="Type a message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (inputMessage) {
              sendMessage();
            }
          }          
        }}
      />

      <button onClick={sendMessage} disabled={!inputMessage}>
        <FaPaperPlane/>
      </button>
    </div>
    </div>
      </div>
    </div>
  );
}

export default Chat;