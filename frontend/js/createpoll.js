let optCount = 0;
const MAXOPT = 10;

function addPollOptions(optionsContainer)
{
    if(optCount > MAXOPT)
    {
        console.log("Maximum 10 options allowed");
        return;
    }

    const p = document.createElement('p');

    // Create input
    optCount++;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'optionForPoll';
    input.id = `id_optionForPoll${optCount}`;
    input.placeholder = 'Enter poll option: ';

    p.appendChild(input);

    optionsContainer.appendChild(p);
}

document.addEventListener('DOMContentLoaded', () => {
    
    const createPoll = document.getElementById('create_poll_btn');

    /* LOAD POLL CREATION PAGE */
    
    createPoll.addEventListener('click', () => {
        
        manageInterface('none', 'none', 'none');
        pollCreationInterface.style.display = 'block';

        const pollForm = document.querySelector('#pollInterface form');
        const optionsContainer = document.getElementById('optionsContainer');
        const addpoll = document.getElementById('id_addNew');

        addpoll.addEventListener('click', (e) => {
            e.preventDefault();
            addPollOptions(optionsContainer);
        });

        pollForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const question = document.getElementById('id_pollQuestion').value.trim; 
            const details = document.getElementById('id_pollDetail').value.trim; 
            const options = Array.from(optionsList.children).map(li => li.textContent); 
            const interval = document.getElementById('id_intervalForPoll').value.trim; 

            // Send JSON to backend 
            fetch('http://127.0.0.1:8000/api/', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    'poll_question': question,
                    'poll_details': details,
                    'poll_options': options,
                    'poll_interval': interval,
                }),
            });       

            console.log({question, details, options, interval});
        });

    });

});