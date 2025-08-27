const pollSocket = new WebSocket("ws://127.0.0.1:8000/ws/poll/");

document.addEventListener('DOMContentLoaded', () => {

    /* STATE (hide poll result) */
    manageInterface('block', 'none');

    const pollForm = document.querySelector('#pollInterface form');

    pollForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const selected = document.querySelector("input[name='theme']:checked")
        if(!selected) return alert('Select an option')

        const choice_id = parseInt(selected.id, 10);

        // Send JSON to backend (fetch post like)
        pollSocket.send(JSON.stringify({'choice_id': choice_id}));

        // Recieve server response (fetch response like)
        pollSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log('Server message: ', data);
        }
        
        loadPopup('thanksInterface');
    });

});