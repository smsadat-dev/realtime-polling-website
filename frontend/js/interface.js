function manageInterface(pollInterfaceVisibility, pollResultVisibility)
{
    const pollInterface = document.getElementById('pollInterface');
    const pollResult = document.getElementById('pollResults');

    pollInterface.style.display = pollInterfaceVisibility;
    pollResult.style.display = pollResultVisibility;
}