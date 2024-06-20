
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getGptUrl } from "../../helpers/config/envConfig";

import "./chat.css";
import { FaPaperPlane } from "react-icons/fa";

const baseURL = getGptUrl()
console.log(baseURL)

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
    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]); // Add user message to the messages array
    setInputMessage(''); // Clear input field after sending the message
    setIsAssistantTyping(true);
  
    try {
      const response = await axios.post(`${baseURL}/`, {
        input: inputMessage,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const assistantMessage = { role: 'assistant', content: '' };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);

      // Display response word by word
      const reply = response.data['reply'];
      displayAssistantResponseWordByWord(reply, assistantMessage);
      setIsAssistantTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prevMessages => [...prevMessages, { content: "⚠️ An error occurred while sending the message.", role: 'assistant' }]);
      setIsAssistantTyping(false);
    }
  };

  const displayAssistantResponseWordByWord = (reply, assistantMessage) => {
    const words = reply.split(' ');
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < words.length) {
        assistantMessage.content += (index === 0 ? '' : ' ') + words[index];
        setMessages(prevMessages => [...prevMessages.slice(0, -1), { ...assistantMessage }]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Adjust the interval time as needed
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
                key={index} // Add a key for each message
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
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;