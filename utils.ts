import { ICard } from "./types";

export function getHandValue(cards: ICard[]): number {
    let value = 0;
    let aces = 0;

    for (const card of cards){
        if(card.value === 1){
            aces++
            continue
        }
        value += Math.min(card.value, 10);
    }    

    if (aces === 0)
        return value;
    if (value >= 11)
        return value + aces;
    return value + 11 + (aces - 1);
}

export function shuffleArray<T>(array: T[]){
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getStrHand(hand: ICard[], hideSecondCard: boolean = false): string{
    let str = " ";

    for (const[idx, card] of hand.entries()){
        if (idx !== 0) str += ", "
        if (idx === 1 && hideSecondCard){
            str += "[Hidden Card]"
            break
        }
        str += `${card.getName()}${card.suit}`
    }
    return str;
}