/* カードをシャッフル */
const shuffleCards = (cards, num) => {
    let cardA, cardB, temp;

    for (let i = 0; i < num; i++) {
        cardA = Math.floor(Math.random() * cards.length);
        cardB = Math.floor(Math.random() * cards.length);
        
        temp = cards[cardA];
        cards[cardA] = cards[cardB];
        cards[cardB] = temp;
    }
}