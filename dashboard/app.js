const socket = io();

socket.on('alert', (message) => {
    const alertsDiv = document.getElementById('alerts');
    const alertElement = document.createElement('div');
    alertElement.textContent = message;
    alertsDiv.appendChild(alertElement);
});
