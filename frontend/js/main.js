document.addEventListener('DOMContentLoaded', () => {

    /* STATE (hide poll result) */
    manageInterface('block', 'none');

    const pollForm = document.querySelector('#pollInterface form');

    pollForm.addEventListener('submit', (e) => {

        e.preventDefault();

        loadPopup('thanksInterface');
    });

});