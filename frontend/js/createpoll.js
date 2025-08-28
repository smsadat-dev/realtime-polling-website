const createPoll = document.getElementById('create_poll_btn');

createPoll.addEventListener('click', () => {


    /* LOAD POLL CREATION PAGE */
    
    manageInterface('none', 'none', 'none');
    pollCreationInterface.style.display = 'block';

    const pollForm = document.getElementById('pollForm');
    const optionInput = document.getElementById('id_optionForPoll');
    const optionsList = document.getElementById('pollOptionsList');

    let optCount = 0;
    const MAXOPT = 10;

    pollForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const value = optionInput.value.trim();

        if(!value)
        {
            return alert('Enter valid input');
        }
        
        if (optCount > MAXOPT)
        {
            return alert('Max 10 options allowed');
        }
        optCount++;

        // Add options to list
        const li  = document.createElement('li');
        li.textContent = value;
        optionsList.appendChild(li);

        optionInput.value = '';     // clear input
    })    
});