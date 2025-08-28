function manageInterface(pollInterfaceVisibility, pollResultVisibility, pollCreateVisibility)
{
    const pollInterface = document.getElementById('pollInterface');
    const pollResult = document.getElementById('pollResults');
    const createPoll = document.getElementById('create_poll_btn');

    pollInterface.style.display = pollInterfaceVisibility;
    pollResult.style.display = pollResultVisibility;
    createPoll.style.display = pollCreateVisibility;
}