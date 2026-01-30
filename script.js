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

    // Select only Round 1 (Quarter Finals) participant containers
    const round1 = section.querySelector('.round-1');
    if (!round1) return;

    const containers = round1.querySelectorAll('.participant');

    const xIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M12.685 2H14.735L10.205 7.18L15.5 14H11.37L8.135 9.76L4.435 14H2.384L7.225 8.465L2.125 2H6.36L9.275 6.12L12.685 2ZM11.965 12.77H13.102L5.732 3.16H4.512L11.965 12.77Z"/></svg>`;
    const ytIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.053-.075 1.966l-.008.104-.022.26-.01.104c-.048.519-.119 1.023-.22 1.402a2.007 2.007 0 0 1-1.415 1.42c-1.123.313-5.288.342-6.11.345h-.089c-.822-.003-4.987-.033-6.11-.335a2.01 2.01 0 0 1-1.415-1.42c-.101-.38-.172-.883-.22-1.402l-.01-.104-.022-.26-.008-.104c-.065-.914-.073-1.77-.074-1.957v-.075c.001-.194.01-1.053.075-1.966l.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c1.123-.313 5.288-.342 6.11-.345zM6.5 5.5v5l4.5-2.5-4.5-2.5z"/></svg>`;

    players.forEach((player, index) => {
        if (containers[index]) {
            containers[index].innerHTML = ''; // Clear existing content

            const nameSpan = document.createElement('span');
            nameSpan.className = 'player-name';
            nameSpan.textContent = player.name;
            containers[index].appendChild(nameSpan);

            const linksDiv = document.createElement('div');
            linksDiv.className = 'player-links';

            if (player.xUrl && player.xUrl !== "#") {
                const xLink = document.createElement('a');
                xLink.href = player.xUrl;
                xLink.target = '_blank';
                xLink.innerHTML = xIcon;
                xLink.title = 'X (Twitter)';
                linksDiv.appendChild(xLink);
            }

            if (player.youtubeUrl && player.youtubeUrl !== "#") {
                const ytLink = document.createElement('a');
                ytLink.href = player.youtubeUrl;
                ytLink.target = '_blank';
                ytLink.innerHTML = ytIcon;
                ytLink.title = 'YouTube';
                linksDiv.appendChild(ytLink);
            }

            containers[index].appendChild(linksDiv);
        }
    });
}
