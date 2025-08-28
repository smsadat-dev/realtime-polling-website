function loadPopup(interfaceName)
{
    const interface = document.getElementById(interfaceName);
    interface.style.display = 'block';
    manageInterface('none', 'none', 'none');

    const okBtn = document.querySelector('#'+interfaceName+ ' button');

    okBtn.addEventListener('click', (e) => {
        /* SHOW POLL RESULT AFTER SUBMISSION */
        manageInterface('none', 'block', 'block');

        interface.style.display = 'none';
    });

}