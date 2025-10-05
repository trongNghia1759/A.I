let isTransitioning = false;

function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    const createSingleHeart = () => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    };

    for (let i = 0; i < 10; i++) {
        createSingleHeart();
    }
    setInterval(createSingleHeart, 2000);
}

function applyWordTypingAnimation() {
    const paragraphs = document.querySelectorAll('.letter p:not(.signature)');
    let totalDelay = 2;
    let totalWords = 0;

    paragraphs.forEach((p) => {
        const text = p.textContent.trim();
        const words = text.match(/[\p{L}\p{M}']+|[.,!?]/gu) || [];
        p.innerHTML = words
            .map((word, index) => `<span class="word" style="animation-delay: ${totalDelay + index * 0.3}s">${word}</span>`)
            .join(' ');
        totalDelay += words.length * 0.3;
        totalWords += words.length;
    });

    setTimeout(() => {
        document.getElementById('signature').classList.add('show');
        document.getElementById('nextButton').classList.add('show');
    }, totalWords * 300 + 3000);
}

const envelope = document.getElementById('envelope');
envelope.addEventListener('click', function (event) {
    if (isTransitioning) return;
    isTransitioning = true;
    envelope.classList.toggle('closed');
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
    event.stopPropagation();
});

document.getElementById('nextButton').addEventListener('click', function () {
    window.location.href = 'banh.html';
});

window.onload = function () {
    createHearts();
    applyWordTypingAnimation();
    setTimeout(() => {
        envelope.classList.remove('closed');
    }, 1000);
};