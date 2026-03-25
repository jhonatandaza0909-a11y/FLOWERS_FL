const audio = document.getElementById('song');
const lyricsText = document.getElementById('lyrics-text');
const heart = document.getElementById('heart-portal');
const starsContainer = document.getElementById('stars-container');

// Tiempos exactos sincronizados
const lyricsData = [
    { time: 38.19, text: "Baby, I'm gonna do better for you because" },
    { time: 49.62, text: "I love you with my heart" },
    { time: 57.27, text: "Sunshine ☀️" },
    { time: 59.75, text: "Moonlight 🌙" },
    { time: 61.34, text: "My angel, darling, would you take my hand and my love?" },
    { time: 76.50, text: "I want to wake up next to you" },
    { time: 86.17, text: "Hold you in my arms forever too" },
    { time: 95.17, text: "ah ahhhhhhhh, ah ahhhhh... ✨" }, 
    { time: 114.98, text: "Baby, I'm gonna do better for you because" },
    { time: 126.30, text: "I love you with my heart" },
    { time: 134.14, text: "Sunshine ☀️" },
    { time: 136.51, text: "Moonlight 🌙" },
    { time: 138.13, text: "My angel, darling, would you take my hand and my love?" },
    { time: 153.14, text: "Cariño, yo a ti te quiero" },
    { time: 160.58, text: "Oh, mi amor, no lo dudes por favor" },
    { time: 172.58, text: "Baby, I'm gonna do better for you because" },
    { time: 184.09, text: "I love you with my heart" },
    { time: 191.66, text: "Sunshine ☀️" },
    { time: 193.89, text: "Moonlight 🌙" },
    { time: 195.62, text: "My angel, darling, would you take my hand and my love? ❤️" },
    { time: 210.03, text: "" }
];

// Movimiento del corazón
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let velX = 1.5; 
let velY = 1.3; 

function moveHeart() {
    posX += velX;
    posY += velY;
    if (posX + heart.clientWidth >= window.innerWidth || posX <= 0) velX *= -1;
    if (posY + heart.clientHeight >= window.innerHeight || posY <= 0) velY *= -1;
    heart.style.left = posX + 'px';
    heart.style.top = posY + 'px';
    requestAnimationFrame(moveHeart);
}

// Control de letras
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const currentLine = lyricsData.find((line, index) => {
        const nextLine = lyricsData[index + 1];
        return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });

    if (currentLine && lyricsText.innerText !== currentLine.text) {
        lyricsText.style.opacity = 0;
        setTimeout(() => {
            lyricsText.innerText = currentLine.text;
            lyricsText.style.opacity = 1;
        }, 200);
    }
});

function createFlower() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.innerHTML = '🌸';
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDuration = Math.random() * 5 + 5 + 's';
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 10000);
}

function createTeAmo() {
    const words = ["Te amo", "Florecita", "mi gorda", "BESHOOO", "✨", "💕", "👻"];
    const colors = ["#ff69b4", "#00d2ff", "#2ecc71", "#f1c40f", "#e056fd"];
    const msg = document.createElement('div');
    msg.className = 'te-amo';
    msg.innerText = words[Math.floor(Math.random() * words.length)];
    msg.style.color = colors[Math.floor(Math.random() * colors.length)];
    msg.style.left = Math.random() * 100 + 'vw';
    msg.style.animationDuration = Math.random() * 4 + 4 + 's';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 8000);
}

function createStars() {
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 'px';
        star.style.width = size; star.style.height = size;
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        starsContainer.appendChild(star);
    }
}

heart.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        moveHeart();
        createStars();
        setInterval(createFlower, 800);
        setInterval(createTeAmo, 1200);
        heart.style.filter = "drop-shadow(0 0 40px #ff0000)";
    }
}, { once: true });