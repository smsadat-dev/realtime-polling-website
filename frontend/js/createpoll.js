createPoll.addEventListener('click', () => {

    const pollForm = document.getElementById('pollForm');
    const optionInput = document.getElementById('id_optionForPoll');
    const optionsList = document.getElementById('pollOptionsList');

    let optCount = 0;
    const MAXOPT = 10;

    /* LOAD POLL CREATION PAGE */
    
    manageInterface('none', 'none', 'none');
    pollCreationInterface.style.display = 'block';

    pollForm.addEventListener('submit', (e) => {
        e.preventDefault();

        
    })

    

    
});