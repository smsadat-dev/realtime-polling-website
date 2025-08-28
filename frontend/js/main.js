const pollSocket = new WebSocket("ws://127.0.0.1:8000/ws/poll/");
const pollCreationInterface = document.getElementById('pollCreationInterface');

document.addEventListener('DOMContentLoaded', () => {

    /* STATE (hide poll result) */
    manageInterface('block', 'none', 'block');

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
            
            // update poll result
            const total_votes = data.payload.total_votes;

            data.payload.choices.forEach(choice => {
                const result = document.getElementById('result' + choice.id);
                if(result)
                {
                    result.value = (choice.votes / total_votes) * 100;  // vote amount in percantage
                }
            });
        }
        
        loadPopup('thanksInterface');
    });

});