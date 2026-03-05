document.addEventListener('DOMContentLoaded', () => {
    fetch('player.json')
        .then(response => response.json())
        .then(data => {
            // Populate Tournament 1
            populateRound('t1', '.round-1', data.tournament1);
            populateRound('t1', '.round-2', data.tournament3.slice(0, 4));
            populateRound('t1', '.round-3', data.tournament4.slice(0, 2));
            populateRound('t1', '.round-winner', data.tournament4.slice(2, 3));

            // Populate Tournament 2
            populateRound('t2', '.round-1', data.tournament2);
            populateRound('t2', '.round-2', data.tournament3.slice(4, 8));
            populateRound('t2', '.round-3', data.tournament4.slice(3, 5));
            populateRound('t2', '.round-winner', data.tournament4.slice(5, 6));

            // Populate Grand Final (Ultimate Showdown)
            populateGrandFinal(data.tournament4);

            setupModal();
        })
        .catch(error => console.error('Error loading player data:', error));
});

function setupModal() {
    const modal = document.getElementById('card-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal || !modalImg || !closeBtn) return;

    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function openCardModal(name, deckPath) {
    const modal = document.getElementById('card-modal');
    const modalImg = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');
    if (modal && modalImg && modalName) {
        modalName.textContent = name;
        modalImg.src = deckPath || 'sample-card.png'; // Use deck path or fallback
        modal.style.display = "flex";
    }
}

function populateGrandFinal(tournament4) {
    const gfSection = document.querySelector('.grand-final-section');
    if (!gfSection) return;

    const containers = gfSection.querySelectorAll('.participant');
    if (containers.length < 3) return;

    // Tournament 1 Winner (test3 at index 2)
    if (tournament4[2]) {
        fillParticipant(containers[0], tournament4[2]);
    }
    // Tournament 2 Winner (test6 at index 5)
    if (tournament4[5]) {
        fillParticipant(containers[1], tournament4[5]);
    }
    // Ultimate Champion (test7 at index 6)
    if (tournament4[6]) {
        fillParticipant(containers[2], tournament4[6]);
    }
}

function fillParticipant(container, player) {
    if (!container || !player) return;

    container.innerHTML = '';
    container.classList.remove('tbd');

    const nameSpan = document.createElement('span');
    nameSpan.className = 'player-name';
    nameSpan.textContent = player.name;
    container.appendChild(nameSpan);

    const linksDiv = document.createElement('div');
    linksDiv.className = 'player-links';

    // Card Icon
    if (player.deck && player.deck !== null) {
        const cardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/></svg>`;
        const cardLink = document.createElement('a');
        cardLink.className = 'card-link';
        cardLink.innerHTML = cardIcon;
        cardLink.onclick = (e) => {
            e.preventDefault();
            openCardModal(player.name, player.deck);
        };
        linksDiv.appendChild(cardLink);
    }

    // X Icon
    if (player.xUrl && player.xUrl !== "#") {
        const xIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M12.685 2H14.735L10.205 7.18L15.5 14H11.37L8.135 9.76L4.435 14H2.384L7.225 8.465L2.125 2H6.36L9.275 6.12L12.685 2ZM11.965 12.77H13.102L5.732 3.16H4.512L11.965 12.77Z"/></svg>`;
        const xLink = document.createElement('a');
        xLink.href = player.xUrl;
        xLink.target = '_blank';
        xLink.innerHTML = xIcon;
        linksDiv.appendChild(xLink);
    }

    // YouTube Icon
    if (player.youtubeUrl && player.youtubeUrl !== "#") {
        const ytIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.053-.075 1.966l-.008.104-.022.26-.01.104c-.048.519-.119 1.023-.22 1.402a2.007 2.007 0 0 1-1.415 1.42c-1.123.313-5.288.342-6.11.345h-.089c-.822-.003-4.987-.033-6.11-.335a2.01 2.01 0 0 1-1.415-1.42c-.101-.38-.172-.883-.22-1.402l-.01-.104-.022.26-.008-.104c-.065-.914-.073-1.77-.074-1.957v-.075c.001-.194.01-1.053.075-1.966l.008-.104.022.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c1.123-.313 5.288-.342 6.11-.345zM6.5 5.5v5l4.5-2.5-4.5-2.5z"/></svg>`;
        const ytLink = document.createElement('a');
        ytLink.href = player.youtubeUrl;
        ytLink.target = '_blank';
        ytLink.innerHTML = ytIcon;
        linksDiv.appendChild(ytLink);
    }

    container.appendChild(linksDiv);
}

function populateRound(tournamentId, roundClass, players) {
    const section = document.getElementById(tournamentId);
    if (!section) return;

    const round = section.querySelector(roundClass);
    if (!round) return;

    const containers = round.querySelectorAll('.participant');

    players.forEach((player, index) => {
        if (containers[index]) {
            fillParticipant(containers[index], player);
        }
    });
}
