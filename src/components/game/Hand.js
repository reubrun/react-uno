import React, {useState} from 'react';

const Hand = ({cards, opponent, playCard, numCards}) => {
    const cardBack = {
      id: "back",
      alt: "Back of card",
      img: "./assets/Deck.png",
    }

    const [startIndex, setStartIndex] = useState(0);
    const range = n => [...Array(n).keys()]

    if (numCards) {
      cards = range(numCards);
    }

    return (
        <div className="d-flex">
            { !opponent && cards ? 
                <div 
                    className="d-flex justify-content-center" 
                    style={{height: "176px", width: "50px"}}
                >
                {
                  (cards && cards.length > 11 && startIndex > 0) ? 
                    <button 
                        type="button" 
                        className="btn btn-success my-auto mr-1"
                        onClick={()=>{
                            if (startIndex > 0) setStartIndex(startIndex - 1);
                        }}>←</button> : ""
                }
                </div> : opponent && cards && cards.length > 10 ?
                    <img
                        src={cardBack.img}
                        alt={cardBack.alt}
                        width="121"
                        height="176"
                        style={{position: "relative", left: "60px"}}
                    ></img> : "" }
            {
                cards ? cards.map((card, index) => 
                    <React.Fragment key={opponent ? index  : card.id}>
                        {(index >= startIndex && index < startIndex + 11) ? 
                            <img
                                data-index={index}
                                src={opponent ? cardBack.img : card.img} 
                                alt={opponent ? cardBack.alt : card.alt}
                                className={(opponent ? "" : 
                                  ((card.playable ? "unocard" : "unplayable")) +
                                  " mb-3")
                                }
                                style={{zIndex: 5}}
                                width="121" 
                                height="176"
                                onClick={() => {
                                  if (!opponent) {
                                    if (playCard(card) && startIndex > 0) 
                                      setStartIndex(startIndex - 1);
                                  }
                                }}
                            ></img> : ""
                        }
                        
                    </React.Fragment>
                ) : ""
            }
            { !opponent && cards ? 
                <div 
                    className="d-flex justify-content" 
                    style={{width: "50px", height: "176px"}}
                >
                {
                  (cards && cards.length > 11 && startIndex + 11 < cards.length) ? 
                    <button 
                        type="button" 
                        className="btn btn-success my-auto ml-1"
                        onClick={() => {
                          if (startIndex + 11 < cards.length) setStartIndex(startIndex + 1);
                        }}
                    >→</button>: ""
                }
                </div> : opponent && cards && cards.length > 10 ?
                    <img
                        src={cardBack.img}
                        alt={cardBack.alt}
                        width="121"
                        height="176"
                        style={{position: "relative", right: "60px"}}
                    ></img> : ""}
        </div>
    );
}

export default Hand;