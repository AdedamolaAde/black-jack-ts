import Deck from "./deck";
import { ICard, Suit } from "./types";
import { getHandValue } from "./utils";

// DOM Elements
const balanceDisplay = document.getElementById("balance-display")!;
const betDisplay = document.getElementById("bet-display")!;
const gameMessage = document.getElementById("game-message")!;
const dealerCardsContainer = document.getElementById("dealer-cards")!;
const playerCardsContainer = document.getElementById("player-cards")!;
const dealerScoreDisplay = document.getElementById("dealer-score")!;
const playerScoreDisplay = document.getElementById("player-score")!;
const betInput = document.getElementById("bet-input") as HTMLInputElement;

// Control Panels
const bettingControls = document.getElementById("betting-controls")!;
const actionControls = document.getElementById("action-controls")!;

// Buttons
const dealBtn = document.getElementById("deal-btn")!;
const hitBtn = document.getElementById("hit-btn")!;
const standBtn = document.getElementById("stand-btn")!;

// Game State
let deck = new Deck();
let dealerHand: ICard[] = [];
let playerHand: ICard[] = [];
let balance = 100;
let currentBet = 0;
let isGameActive = false;

function updateUI(hideDealerCard: boolean = true) {
    balanceDisplay.textContent = `$${balance}`;
    betDisplay.textContent = `$${currentBet}`;

    // Render Player Cards
    playerCardsContainer.innerHTML = playerHand.map(card => createCardHTML(card)).join("");
    playerScoreDisplay.textContent = `(${getHandValue(playerHand)})`;

    // Render Dealer Cards
    if (hideDealerCard && dealerHand.length > 0) {
        let cardsHTML = createCardHTML(dealerHand[0]);
        cardsHTML += `<div class="card hidden-card"></div>`;
        dealerCardsContainer.innerHTML = cardsHTML;
        dealerScoreDisplay.textContent = "";
    } else {
        dealerCardsContainer.innerHTML = dealerHand.map(card => createCardHTML(card)).join("");
        dealerScoreDisplay.textContent = `(${getHandValue(dealerHand)})`;
    }
}

function createCardHTML(card: ICard): string {
    const isRed = card.suit === Suit.Hearts || card.suit === Suit.Diamonds;
    return `
        <div class="card ${isRed ? 'red' : ''}">
            <div>${card.getName()}</div>
            <div style="align-self: flex-end;">${card.suit}</div>
        </div>
    `;
}

function startRound() {
    const betAmount = Number(betInput.value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        gameMessage.textContent = "Please enter a valid bet amount.";
        return;
    }

    currentBet = betAmount;
    balance -= currentBet;
    isGameActive = true;

    deck.reset();
    playerHand = deck.deal(2);
    dealerHand = deck.deal(2);

    gameMessage.textContent = "Hit or Stand?";
    
    // Toggle control panels
    bettingControls.classList.add("hidden");
    actionControls.classList.remove("hidden");

    const playerValue = getHandValue(playerHand);
    if (playerValue === 21) {
        endRound("blackjack");
    } else {
        updateUI(true);
    }
}

function hit() {
    if (!isGameActive) return;

    playerHand.push(deck.deal(1)[0]);
    const playerValue = getHandValue(playerHand);
    
    if (playerValue > 21) {
        endRound("bust");
    } else {
        updateUI(true);
    }
}

function stand() {
    if (!isGameActive) return;

    let dealerValue = getHandValue(dealerHand);

    // Dealer hits until 17 or higher
    while (dealerValue < 17) {
        dealerHand.push(deck.deal(1)[0]);
        dealerValue = getHandValue(dealerHand);
    }

    const playerValue = getHandValue(playerHand);

    if (dealerValue > 21) {
        endRound("dealer-bust");
    } else if (playerValue > dealerValue) {
        endRound("win");
    } else if (playerValue < dealerValue) {
        endRound("lose");
    } else {
        endRound("push");
    }
}

function endRound(outcome: "blackjack" | "bust" | "dealer-bust" | "win" | "lose" | "push") {
    isGameActive = false;
    updateUI(false); // Reveal dealer's face-down card

    switch (outcome) {
        case "blackjack":
            balance += currentBet * 2.5;
            gameMessage.textContent = `Blackjack! You won $${currentBet * 2.5}!`;
            break;
        case "bust":
            gameMessage.textContent = "You busted. You lost!";
            break;
        case "dealer-bust":
            balance += currentBet * 2;
            gameMessage.textContent = `Dealer busted! You won $${currentBet * 2}!`;
            break;
        case "win":
            balance += currentBet * 2;
            gameMessage.textContent = `You beat the dealer! Won $${currentBet * 2}!`;
            break;
        case "lose":
            gameMessage.textContent = "Dealer wins. You lost!";
            break;
        case "push":
            balance += currentBet;
            gameMessage.textContent = "Push. It's a tie game!";
            break;
    }

    currentBet = 0;
    betInput.max = balance.toString();

    if (balance <= 0) {
        gameMessage.textContent = "Game Over! You ran out of money. Refresh to play again.";
        bettingControls.classList.add("hidden");
    } else {
        // Toggle control panels back
        bettingControls.classList.remove("hidden");
        actionControls.classList.add("hidden");
    }
    
    balanceDisplay.textContent = `$${balance}`;
    betDisplay.textContent = `$0`;
}

// Event Listeners
dealBtn.addEventListener("click", startRound);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);

// Initial Setup
balanceDisplay.textContent = `$${balance}`;