const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(sender, message) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = `<span class="${sender}">${sender === "user" ? "You" : "Bot"}:</span> ${message}`;
    chatLog.appendChild(msgDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

sendBtn.onclick = async function() {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage('user', text);
    userInput.value = "";
    appendMessage('bot', 'Thinking...');
    // Call backend
    const response = await fetch('https://chatbot-backend-2m2s.onrender.com/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt: text})
    });
    const data = await response.json();
    // Remove "Thinking..."
    chatLog.removeChild(chatLog.lastChild);
    appendMessage('bot', data.response);
};

// Optional: Send on Enter
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendBtn.click();
});


