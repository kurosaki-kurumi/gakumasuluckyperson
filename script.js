document.addEventListener('DOMContentLoaded', () => {
    fetch('player.json')
        .then(response => response.json())
        .then(data => {
            updateTournament('t1', data.tournament1);
            updateTournament('t2', data.tournament2);
        })
        .catch(error => console.error('Error loading player data:', error));
});

function updateTournament(tournamentId, players) {
    const section = document.getElementById(tournamentId);
    if (!section) return;

    // Select only Round 1 (Quarter Finals) participant links
    const round1 = section.querySelector('.round-1');
    if (!round1) return;

    const links = round1.querySelectorAll('.participant a');

    players.forEach((player, index) => {
        if (links[index]) {
            links[index].textContent = player.name;
            links[index].href = player.url;

            // If the URL is just "#", we can style it differently or keep as is
            if (player.url === "#") {
                links[index].style.cursor = 'default';
                links[index].addEventListener('click', (e) => e.preventDefault());
            }
        }
    });
}
