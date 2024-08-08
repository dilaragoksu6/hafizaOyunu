const numbers = [1, 2, 3, 4, 5, 6, 7, 8]; //kart simgeleri
let shuffledNumbers = [];
let openedCards = [];
let matchedCards = [];

function startGame() { //oyun başlatılır
    resetGame();
    shuffledNumbers = shuffle(numbers.concat(numbers));
    renderGame();
}

function resetGame() { //oyun sıfırlanır ve oyun tahtası temizlenir
    shuffledNumbers = [];
    openedCards = [];
    matchedCards = [];
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    document.getElementById('message').textContent = '';
}

function shuffle(array) { //kartların karışık dizilmesi burda olur
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function renderGame() { //oyun tahtasının oluşturulması
    const gameBoard = document.getElementById('game-board');
    shuffledNumbers.forEach((number, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.dataset.number = number;
        cardElement.textContent = 'X'; // Kapalı kartlar için X gösterimi
        cardElement.addEventListener('click', () => handleCardClick(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

function handleCardClick(cardElement) { //karta tıklanması ve güncelleme 
    if (openedCards.length === 2 || matchedCards.includes(cardElement.dataset.index)) {
        return;
    }
    cardElement.textContent = cardElement.dataset.number; // Kartın numarasını göster
    cardElement.classList.add('flipped');
    openedCards.push(cardElement);
    if (openedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() { //açılan kartın eşleşmesinşn kontrol edilmesi
    const [firstCard, secondCard] = openedCards;
    const firstIndex = parseInt(firstCard.dataset.index);
    const secondIndex = parseInt(secondCard.dataset.index);
    if (firstCard.dataset.number === secondCard.dataset.number) {
        matchedCards.push(firstIndex, secondIndex);
        if (matchedCards.length === shuffledNumbers.length) {
            document.getElementById('message').textContent = 'Tebrikler, kazandınız!';
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = 'X'; // Kartı tekrar kapat
            secondCard.textContent = 'X';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }
    openedCards = [];
}
