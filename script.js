// On récupère tous les éléments HTML
const loadingScreen = document.getElementById('loading-screen');
const confessionScreen = document.getElementById('confession-screen');
const messageScreen = document.getElementById('message-screen');
const successScreen = document.getElementById('success-screen');
const loadingText = document.getElementById('loading-text');

const btnNext = document.getElementById('btn-next');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

// TEXTES DRÔLES POUR LE CHARGEMENT
const phrases = [
    "Démarrage du protocole de pardon...",
    "Analyse du niveau de débilité en cours...",
    "Niveau de débilité : EXTRÊME.",
    "Recherche d'arguments valables... (Échec)",
    "Ouverture du dossier d'aveux..."
];

// Gestion de l'écran de chargement
let phraseIndex = 0;
const interval = setInterval(() => {
    phraseIndex++;
    if (phraseIndex < phrases.length) {
        loadingText.innerText = phrases[phraseIndex];
    } else {
        clearInterval(interval);
        // On passe à la page "Rapport d'incident"
        loadingScreen.classList.add('hidden');
        confessionScreen.classList.remove('hidden');
    }
}, 2000); // Change de phrase toutes les 2 secondes

// PASSAGE DU RAPPORT D'INCIDENT AU MESSAGE DE PARDON
btnNext.addEventListener('click', () => {
    confessionScreen.classList.add('hidden');
    messageScreen.classList.remove('hidden');
});

// LE BOUTON QUI S'ENFUIT (Souris + Tactile)
['mouseover', 'touchstart'].forEach(eventType => {
    btnNo.addEventListener(eventType, (e) => {
        // Empêche le clic direct sur téléphone
        if (eventType === 'touchstart') e.preventDefault(); 
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // On réduit un peu les marges pour que le bouton ne sorte pas de l'écran du tel
        const randomX = Math.random() * (windowWidth - 150);
        const randomY = Math.random() * (windowHeight - 80);

        btnNo.style.position = 'fixed';
        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
    }, { passive: false });
});

// QUAND ELLE CLIQUE SUR OUI
btnYes.addEventListener('click', () => {
    messageScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
    
    // Déclenche les confettis (grâce au script externe ajouté dans le HTML)
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });
});

// Petite blague si elle réussit à cliquer sur "Non" (très difficile sur ordi)
btnNo.addEventListener('click', () => {
    alert("Tricheur ! Tu m'as eu. Mais sérieusement, je suis désolé.");
});