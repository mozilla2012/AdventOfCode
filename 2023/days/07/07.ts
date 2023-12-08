// https://adventofcode.com/2023/day/7

enum HandType {
    FIVE = 6,
    FOUR = 5,
    FULL = 4,
    THREE = 3,
    TWOP = 2,
    ONEP = 1,
    HIGH = 0,
  }

function determineHandType(cards: string): HandType {
    // console.log(cards);
    const handMap = new Map<string, number>();
    cards.split('').forEach((card: string) => {
        if(!handMap.has(card)) {
            handMap.set(card, 1);
        } else {
            handMap.set(card, handMap.get(card)! + 1);
        }
    });
    const counts: number[] = Array.from(handMap.values()).sort().reverse();
    // console.log(counts);
    return (counts[0] === 5) ? HandType.FIVE :
           (counts[0] === 4) ? HandType.FOUR : 
           (counts[0] === 3 && counts[1] === 2) ? HandType.FULL : 
           (counts[0] === 3) ? HandType.THREE : 
           (counts[0] === 2 && counts[1] === 2) ? HandType.TWOP : 
           (counts[0] === 2) ? HandType.ONEP : 
           HandType.HIGH;
}

class Hand {
    cards: string;
    bid: number;
    type: HandType;

    constructor(cards: string, bid: number) {
        this.cards = cards;
        this.bid = bid;
        this.type = determineHandType(cards);
      }
}

function compareCards(a: string, b: string): number {
    const cardOrder = 'AKQJT987654321';
    return cardOrder.indexOf(b) - cardOrder.indexOf(a);
}

export function adventMain(input: string): any {
    const lines = input.split('\n');
    
    // First, parse the hands.
    const hands: Hand[] = [];
    for(let line of lines) {
        const tokens = line.split(' ');
        hands.push(new Hand(tokens[0]!, parseInt(tokens[1]!)));
    }

    // Second, sort the hands.
    hands.sort((a: Hand, b: Hand) => {
        if (a.type === b.type) {
            // compare character by character
            let retVal = 0;
            a.cards.split('').some((_, i: number) => {
                const cardA: string = a.cards[i]!;
                const cardB: string = b.cards[i]!;
                if(cardA !== cardB) {
                    retVal = compareCards(cardA, cardB);
                    return true;
                }
                return false;
            })
            return retVal;
        } 
        return a.type - b.type; // If B is better, return a positive number.
    });

    // Then, return the total.
    return hands.reduce((runningTotal: number, hand: Hand, index) => {
        return ((index + 1) * hand.bid) + runningTotal;
    }, 0);
}
