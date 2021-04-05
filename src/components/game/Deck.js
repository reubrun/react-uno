const Deck = ({card, drawNewCard, shoutUno, unoShouts, userId}) => {
    const cardBack = {
      alt: "Back of card",
      img: "./assets/Deck.png",
    }

    return (
        <div>
            <img
                src={cardBack.img}
                alt={cardBack.alt}
                width="121"
                height="176"
                onClick={() => {
                  drawNewCard();
                }}
            ></img>
            <button 
                type="button"
                className={
                    "btn btn-lg mx-3 " + 
                    (unoShouts.find(shout => shout.userId === userId) ? 
                        "btn-success" : "btn-primary")
                }
                disabled={unoShouts.find(shout => shout.userId === userId) ? true : false}
                onClick={() => {shoutUno();}}
            >
                UNO!
            </button>
            {card ? <img 
                src={card.img} 
                alt={card.alt}
                width="121" 
                height="176"
            ></img> : ""}
        </div>
    );
}

export default Deck;