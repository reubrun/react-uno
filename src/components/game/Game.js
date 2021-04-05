import {useState, useEffect, useCallback} from 'react';
import Hand from './Hand.js';
import Deck from './Deck.js';
import Messages from './Messages.js';

const Game = ({userId, startUserId, room, socket, userColours}) => {
  const [cards, ] = useState([
    {id:'B0', alt: 'Blue 0', img: './assets/Blue_0.png'}, 
    {id:'B1-1', alt: 'Blue 1', img: './assets/Blue_1.png'}, 
    {id:'B2-1', alt: 'Blue 2', img: './assets/Blue_2.png'}, 
    {id:'B3-1', alt: 'Blue 3', img: './assets/Blue_3.png'}, 
    {id:'B4-1', alt: 'Blue 4', img: './assets/Blue_4.png'}, 
    {id:'B5-1', alt: 'Blue 5', img: './assets/Blue_5.png'}, 
    {id:'B6-1', alt: 'Blue 6', img: './assets/Blue_6.png'}, 
    {id:'B7-1', alt: 'Blue 7', img: './assets/Blue_7.png'}, 
    {id:'B8-1', alt: 'Blue 8', img: './assets/Blue_8.png'}, 
    {id:'B9-1', alt: 'Blue 9', img: './assets/Blue_9.png'},
    {id:'BD-1', alt: 'Blue Draw', img: './assets/Blue_Draw.png'}, 
    {id:'BR-1', alt: 'Blue Reverse', img: './assets/Blue_Reverse.png'}, 
    {id:'BS-1', alt: 'Blue Skip', img: './assets/Blue_Skip.png'},
    {id:'B1-2', alt: 'Blue 1', img: './assets/Blue_1.png'}, 
    {id:'B2-2', alt: 'Blue 2', img: './assets/Blue_2.png'}, 
    {id:'B3-2', alt: 'Blue 3', img: './assets/Blue_3.png'}, 
    {id:'B4-2', alt: 'Blue 4', img: './assets/Blue_4.png'}, 
    {id:'B5-2', alt: 'Blue 5', img: './assets/Blue_5.png'}, 
    {id:'B6-2', alt: 'Blue 6', img: './assets/Blue_6.png'}, 
    {id:'B7-2', alt: 'Blue 7', img: './assets/Blue_7.png'}, 
    {id:'B8-2', alt: 'Blue 8', img: './assets/Blue_8.png'}, 
    {id:'B9-2', alt: 'Blue 9', img: './assets/Blue_9.png'},
    {id:'BD-2', alt: 'Blue Draw', img: './assets/Blue_Draw.png'}, 
    {id:'BR-2', alt: 'Blue Reverse', img: './assets/Blue_Reverse.png'}, 
    {id:'BS-2', alt: 'Blue Skip', img: './assets/Blue_Skip.png'},
    {id:'R0', alt: 'Red 0', img: './assets/Red_0.png'}, 
    {id:'R1-1', alt: 'Red 1', img: './assets/Red_1.png'}, 
    {id:'R2-1', alt: 'Red 2', img: './assets/Red_2.png'}, 
    {id:'R3-1', alt: 'Red 3', img: './assets/Red_3.png'}, 
    {id:'R4-1', alt: 'Red 4', img: './assets/Red_4.png'}, 
    {id:'R5-1', alt: 'Red 5', img: './assets/Red_5.png'}, 
    {id:'R6-1', alt: 'Red 6', img: './assets/Red_6.png'}, 
    {id:'R7-1', alt: 'Red 7', img: './assets/Red_7.png'}, 
    {id:'R8-1', alt: 'Red 8', img: './assets/Red_8.png'}, 
    {id:'R9-1', alt: 'Red 9', img: './assets/Red_9.png'}, 
    {id:'RD-1', alt: 'Red Draw', img: './assets/Red_Draw.png'}, 
    {id:'RR-1', alt: 'Red Reverse', img: './assets/Red_Reverse.png'}, 
    {id:'RS-1', alt: 'Red Skip', img: './assets/Red_Skip.png'},
    {id:'R1-2', alt: 'Red 1', img: './assets/Red_1.png'}, 
    {id:'R2-2', alt: 'Red 2', img: './assets/Red_2.png'}, 
    {id:'R3-2', alt: 'Red 3', img: './assets/Red_3.png'}, 
    {id:'R4-2', alt: 'Red 4', img: './assets/Red_4.png'}, 
    {id:'R5-2', alt: 'Red 5', img: './assets/Red_5.png'}, 
    {id:'R6-2', alt: 'Red 6', img: './assets/Red_6.png'}, 
    {id:'R7-2', alt: 'Red 7', img: './assets/Red_7.png'}, 
    {id:'R8-2', alt: 'Red 8', img: './assets/Red_8.png'}, 
    {id:'R9-2', alt: 'Red 9', img: './assets/Red_9.png'}, 
    {id:'RD-2', alt: 'Red Draw', img: './assets/Red_Draw.png'}, 
    {id:'RR-2', alt: 'Red Reverse', img: './assets/Red_Reverse.png'}, 
    {id:'RS-2', alt: 'Red Skip', img: './assets/Red_Skip.png'},
    {id:'Y0', alt: 'Yellow 0', img: './assets/Yellow_0.png'}, 
    {id:'Y1-1', alt: 'Yellow 1', img: './assets/Yellow_1.png'}, 
    {id:'Y2-1', alt: 'Yellow 2', img: './assets/Yellow_2.png'}, 
    {id:'Y3-1', alt: 'Yellow 3', img: './assets/Yellow_3.png'}, 
    {id:'Y4-1', alt: 'Yellow 4', img: './assets/Yellow_4.png'}, 
    {id:'Y5-1', alt: 'Yellow 5', img: './assets/Yellow_5.png'}, 
    {id:'Y6-1', alt: 'Yellow 6', img: './assets/Yellow_6.png'}, 
    {id:'Y7-1', alt: 'Yellow 7', img: './assets/Yellow_7.png'}, 
    {id:'Y8-1', alt: 'Yellow 8', img: './assets/Yellow_8.png'}, 
    {id:'Y9-1', alt: 'Yellow 9', img: './assets/Yellow_9.png'}, 
    {id:'YD-1', alt: 'Yellow Draw', img: './assets/Yellow_Draw.png'}, 
    {id:'YR-1', alt: 'Yellow Reverse', img: './assets/Yellow_Reverse.png'}, 
    {id:'YS-1', alt: 'Yellow Skip', img: './assets/Yellow_Skip.png'},
    {id:'Y1-2', alt: 'Yellow 1', img: './assets/Yellow_1.png'}, 
    {id:'Y2-2', alt: 'Yellow 2', img: './assets/Yellow_2.png'}, 
    {id:'Y3-2', alt: 'Yellow 3', img: './assets/Yellow_3.png'}, 
    {id:'Y4-2', alt: 'Yellow 4', img: './assets/Yellow_4.png'}, 
    {id:'Y5-2', alt: 'Yellow 5', img: './assets/Yellow_5.png'}, 
    {id:'Y6-2', alt: 'Yellow 6', img: './assets/Yellow_6.png'}, 
    {id:'Y7-2', alt: 'Yellow 7', img: './assets/Yellow_7.png'}, 
    {id:'Y8-2', alt: 'Yellow 8', img: './assets/Yellow_8.png'}, 
    {id:'Y9-2', alt: 'Yellow 9', img: './assets/Yellow_9.png'}, 
    {id:'YD-2', alt: 'Yellow Draw', img: './assets/Yellow_Draw.png'}, 
    {id:'YR-2', alt: 'Yellow Reverse', img: './assets/Yellow_Reverse.png'}, 
    {id:'YS-2', alt: 'Yellow Skip', img: './assets/Yellow_Skip.png'},
    {id:'G0', alt: 'Green 0', img: './assets/Green_0.png'}, 
    {id:'G1-1', alt: 'Green 1', img: './assets/Green_1.png'}, 
    {id:'G2-1', alt: 'Green 2', img: './assets/Green_2.png'}, 
    {id:'G3-1', alt: 'Green 3', img: './assets/Green_3.png'}, 
    {id:'G4-1', alt: 'Green 4', img: './assets/Green_4.png'}, 
    {id:'G5-1', alt: 'Green 5', img: './assets/Green_5.png'}, 
    {id:'G6-1', alt: 'Green 6', img: './assets/Green_6.png'}, 
    {id:'G7-1', alt: 'Green 7', img: './assets/Green_7.png'}, 
    {id:'G8-1', alt: 'Green 8', img: './assets/Green_8.png'}, 
    {id:'G9-1', alt: 'Green 9', img: './assets/Green_9.png'}, 
    {id:'GD-1', alt: 'Green Draw', img: './assets/Green_Draw.png'}, 
    {id:'GR-1', alt: 'Green Reverse', img: './assets/Green_Reverse.png'}, 
    {id:'GS-1', alt: 'Green Skip', img: './assets/Green_Skip.png'},
    {id:'G1-2', alt: 'Green 1', img: './assets/Green_1.png'}, 
    {id:'G2-2', alt: 'Green 2', img: './assets/Green_2.png'}, 
    {id:'G3-2', alt: 'Green 3', img: './assets/Green_3.png'}, 
    {id:'G4-2', alt: 'Green 4', img: './assets/Green_4.png'}, 
    {id:'G5-2', alt: 'Green 5', img: './assets/Green_5.png'}, 
    {id:'G6-2', alt: 'Green 6', img: './assets/Green_6.png'}, 
    {id:'G7-2', alt: 'Green 7', img: './assets/Green_7.png'}, 
    {id:'G8-2', alt: 'Green 8', img: './assets/Green_8.png'}, 
    {id:'G9-2', alt: 'Green 9', img: './assets/Green_9.png'}, 
    {id:'GD-2', alt: 'Green Draw', img: './assets/Green_Draw.png'}, 
    {id:'GR-2', alt: 'Green Reverse', img: './assets/Green_Reverse.png'}, 
    {id:'GS-2', alt: 'Green Skip', img: './assets/Green_Skip.png'},
    {id:'W-1',  alt: 'Wild', img: './assets/Wild.png'},
    {id:'W-2',  alt: 'Wild', img: './assets/Wild.png'},
    {id:'W-3',  alt: 'Wild', img: './assets/Wild.png'},
    {id:'W-4',  alt: 'Wild', img: './assets/Wild.png'},
    {id:'WD-1', alt: 'Wild Draw', img: './assets/Wild_Draw.png'},
    {id:'WD-2', alt: 'Wild Draw', img: './assets/Wild_Draw.png'},
    {id:'WD-3', alt: 'Wild Draw', img: './assets/Wild_Draw.png'},  
    {id:'WD-4', alt: 'Wild Draw', img: './assets/Wild_Draw.png'},
  ]);

  const findUser = useCallback(userId => room.find( user => user.userId === userId),
    [room]
  );

  const [yourTurn, setYourTurn] = useState(false);

  const drawCards = useCallback(n => {
    if (cards.length >= n) {
      let returnCards = [];
      for (let i=0; i<n; i++) {
        const indexDrawn = Math.floor(Math.random() * cards.length);
        const cardDrawn  = cards[indexDrawn];
        cards.splice(indexDrawn, 1);
        returnCards.push({index: indexDrawn, card: cardDrawn});
      }
      return returnCards;
    }
  }, [cards]);

  const [yourHand, setYourHand] = useState();
    
  /**
   * Setup game
   */
  const drawStartHand = useCallback((start, userNum, indiciesToRemove) => {
    if (indiciesToRemove) {
      indiciesToRemove.forEach(index => {
        cards.splice(index, 1)
      });
    }

    const startUserNum = findUser(startUserId).userNum;
    const currentUserNum = findUser(userId).userNum;
    if (start || userNum === currentUserNum) {
      const startHand = drawCards(7);
      const cardIndicies = [];
      const yourHand = [];
      startHand.forEach(card => {
        cardIndicies.push(card.index);
        card.card.playable = true;
        yourHand.push(card.card);
      });
      setYourHand(yourHand);
      socket.emit("start-hand-drawn", {
        cardIndicies, 
        startUserNum,
        currentUserNum
      });
    }
  }, [setYourHand, socket, drawCards, findUser, userId, startUserId, cards]);

  useEffect(() => {
    if (userId === startUserId) {
      drawStartHand(true, null, null);
    } else {
      socket.on("start-hand-drawn", drawStartHand);
      return () => socket.off("start-hand-drawn");
    }
  }, [drawStartHand, startUserId, socket, userId]);


  /**
   * Game started
   */
  const [matchCard, setMatchCard] = useState(null);
  const [reverse, setReverse] = useState(false);
  const [gameWon, setGameWon] = useState(null);

  useEffect(() => {
    socket.on("game-won", setGameWon);
    return () => socket.off("game-won");
  }, [socket, setGameWon]);

  const allHandsDrawn = useCallback(cardIndicies => {
    cardIndicies.forEach(index => {
      cards.splice(index, 1)
    });
    if (userId === startUserId) {
      const firstMatchCard = (() => {
        let newCard;
        while (true) {
          newCard = drawCards(1)[0];
          if (newCard.card.id[0] !== "W") break;
          else cards.splice(newCard.index, 0, newCard.card);
        }
        return newCard;
      })();
      setMatchCard(firstMatchCard.card);
      socket.emit("set-match-card", firstMatchCard);
      const isReverse = (firstMatchCard.card.id[1] === 'R') ? true : false;
      setReverse(isReverse);
      socket.emit("start-round", {
        change:false, 
        matchCard: firstMatchCard.card, 
        ignoreMatch:true, 
        reverse:isReverse,
        wildColour: false
      });
    }
  }, [userId, socket, cards, drawCards, startUserId]);

  useEffect(() => {
    socket.on("all-hands-drawn", allHandsDrawn);
    return () => socket.off("all-hands-drawn");
  }, [socket, allHandsDrawn]);

  /**
   * Messaging
   */
  const [messages, setMessages] = useState([])  
  const receiveMessage = useCallback(({username, userNum, message}) => {
    setMessages([
      ...messages, 
      {
        messageId: username + Date.now(), 
        fromId: userNum, 
        fromUser: username, 
        content: message
      }
    ]);
  }, [messages]);
  useEffect(() => {
    socket.on("receive-message", receiveMessage);
    return () => socket.off("receive-message");
  }, [socket, receiveMessage]);

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [wildColour, setWildColour] = useState(false);
  const [unoShouts, setUnoShouts] = useState([]);
  const newRound = useCallback(({currentUser, newMatchCard, ignoreMatch, reverse, wildColour}) => {
    setReverse(reverse);
    setWildColour(wildColour);
    setUnoShouts([]);
    if (wildColour) {
      const colours = {
        'R' : "red",
        'G' : "green",
        'Y' : "yellow",
        'B' : "blue"
      }
      setMessages([
        ...messages,
        {
          messageId: "GameBot" + Date.now(),
          fromId: -1,
          fromUser: "GameBot",
          content: "The next colour is " + colours[wildColour]
        }
      ]);
    }
    if (currentUser.userId === userId) {
      //Draw two/four card
      if (!ignoreMatch && newMatchCard.id[1] === "D") {
        let numCardsToDraw = (newMatchCard.id[0] === "W") ? 4 : 2;
        const newCards = drawCards(numCardsToDraw);
        if (newCards) {
          const newCardIndices = [];
          const newCardValues  = [];
          newCards.forEach(card => {
            newCardIndices.push(card.index);
            card.card.playable = true;
            newCardValues.push(card.card);
          });
          socket.emit("remove-from-deck", newCardIndices);
          setYourHand([
            ...yourHand,
            ...newCardValues
          ]);
        }
        socket.emit("start-round", {
          change: true, 
          matchCard: newMatchCard, 
          ignoreMatch: true, 
          reverse: reverse,
          wildColour: (newMatchCard.id[0] === "W") ? wildColour : false
        });
        return;
      }
      //Skip card
      if (!ignoreMatch && newMatchCard.id[1] === "S") {
        socket.emit("start-round", {
          change:true, 
          matchCard: newMatchCard, 
          ignoreMatch: true, 
          reverse: reverse,
          wildColour: false
        });
        return;
      }
      setYourTurn(true);
      socket.emit("set-players-cards", yourHand.length);
    } else {
      setYourTurn(false);
    }
    setCurrentPlayer({
      name: currentUser.userId === userId ? "Your Turn" : currentUser.username,
      num: currentUser.userNum
    });
  }, [messages, userId, socket, yourHand, drawCards]);
  useEffect(() => {
    socket.on("new-round", newRound);
    return () => socket.off("new-round");
  }, [socket, newRound]);

  /**
   * Update match card
   */
  const updateMatchCard = useCallback(matchCard => {
    if (!currentPlayer) cards.splice(matchCard.index, 1);
    setMatchCard(currentPlayer ? matchCard : matchCard.card);
  }, [cards, currentPlayer]);
  useEffect(() => {
    socket.on("set-match-card", updateMatchCard);
    return () => socket.off("set-match-card");
  }, [socket, updateMatchCard]);

  /**
   * Update opponets cards
   */
  const [opponentsHand, setOpponentsHand] = useState(7);
  useEffect(() => {
    socket.on("set-players-cards", setOpponentsHand);
    return () => socket.off("set-players-cards");
  }, [socket, setOpponentsHand]);

  /**
   * Game logic
   */
  const removeFromDeck = useCallback(indices => {
    indices.forEach(index => {
      cards.splice(index, 1);
    });
  }, [cards]);
  useEffect(() => {
    socket.on("remove-from-deck", removeFromDeck);
    return () => socket.off("remove-from-deck");
  }, [socket, removeFromDeck]);

  const [hasDrawnCard, setHasDrawnCard] = useState(false);
  const drawNewCard = () => {
    if (!yourTurn) return;

    if (!hasDrawnCard) {
      yourHand.forEach(card => {
        card.playable = false;
      });
      setHasDrawnCard(true);
    }
    const drawnCard = drawCards(1);
    const newCard = drawnCard ? drawnCard[0] : null;
    if (newCard) {
      socket.emit("remove-from-deck", [newCard.index]);
      newCard.card.playable = true;
      socket.emit("set-players-cards", yourHand.length + 1);
      setYourHand([
        ...yourHand,
        newCard.card
      ]);
    } else {
      yourHand.forEach(card => {card.playable = true});
      setMessages([
        ...messages,
        {
          messageId: "GameBot" + Date.now(),
          fromId: -1, 
          fromUser: "GameBot", 
          content: "There are no more cards in the deck, changing turns..."
        }
      ]);
      socket.emit("start-round", {
        change:true, 
        matchCard: matchCard, 
        ignoreMatch:false, 
        reverse:reverse,
        wildColour: false
      });
    }
  };

  const shoutUno = () => {
    const numCardsLeft = yourTurn ? yourHand.length : opponentsHand
    if (numCardsLeft !== 1) {
      setMessages([
        ...messages,
        {
          messageId: "GameBot" + Date.now(),
          fromId: -1, 
          fromUser: "GameBot", 
          content: yourTurn ? "You are not on your last card" : 
            currentPlayer.name + " is not on their last card"
        }
      ]);
      return;
    }

    const timeShouted = Date.now();
    setUnoShouts([
      ...unoShouts,
      {
        username: findUser(userId).username,
        userId: userId,
        timeShouted: timeShouted
      }
    ]);
    socket.emit("shout-uno", timeShouted);
  }

  const unoShouted = useCallback(({timeShouted, userId}) => {
    setUnoShouts([
      ...unoShouts,
      {
        username: findUser(userId).username,
        userId: userId,
        timeShouted: timeShouted
      }
    ]);
  }, [unoShouts, findUser]);
  useEffect(() => {
    socket.on("uno-shouted", unoShouted);
    return () => socket.off("uno-shouted");
  }, [socket, unoShouted]);

  const [playedWild, setPlayedWild] = useState(false);

  const playCard = card => {
    if (card.id.startsWith("WD")) {
      if (yourHand.find(card => card.id[0] !== "W" && card.id[0] === matchCard.id[0])) {
        setMessages([
          ...messages,
          {
            messageId: "GameBot" + Date.now(),
            fromId: -1,
            fromUser: "GameBot",
            content: yourTurn ?
              "You can only play a wild draw 4 card when you do not have any other cards that match the colour of the previously played card" :
              "It is not your turn"
          }
        ]);
        return false;
      }
    }

    const cardIsAllowed = wildColour ?
        card.id[0] === wildColour :
        (
          card.id[0] === matchCard.id[0] ||  //Matching colour
          card.id[1] === matchCard.id[1]     //Matching number
        );
    if (
      (
       cardIsAllowed      ||
       card.id[0] === 'W'    //Wildcard
      ) &&
      card.playable && yourTurn
    ) {
      //Win condition
      if (yourHand.length === 1) {
        const shoutedUno = unoShouts.find(shout => shout.userId === userId);
        let canWin = true;
        if (!shoutedUno) {
          const botMessage = {
            messageId: "GameBot" + Date.now(),
            fromId: -1, 
            fromUser: "GameBot", 
            content: findUser(userId).username + " forgot to say uno!"
          }
          setMessages([
            ...messages,
            botMessage
          ]);
          socket.emit("send-message", botMessage.content, true);
          canWin = false;
        }
        let earliestShout = null;
        unoShouts.forEach(shout => {
          if (!earliestShout) {
            earliestShout = shout;
            return;
          }
          if (shout.timeShouted < earliestShout.timeShouted) {
            earliestShout = shout;
          }
        });
        if (earliestShout && earliestShout.userId !== userId) {
          const botMessage = {
            messageId: "GameBot" + Date.now(),
            fromId: -1, 
            fromUser: "GameBot", 
            content: earliestShout.username + " said uno first!"
          }
          setMessages([
            ...messages,
            botMessage
          ]);
          socket.emit("send-message", botMessage.content, true);
          canWin = false;
        }
        if (canWin) {
          const winner = findUser(userId).username;
          setGameWon(winner);
          socket.emit("game-won", winner);
          return;
        } else {
          const newCards = drawCards(2);
          if (newCards) {
            const newCardIndices = [];
            const newCardValues  = [];
            newCards.forEach(card => {
              newCardIndices.push(card.index);
              card.card.playable = true;
              newCardValues.push(card.card);
            });
            socket.emit("remove-from-deck", newCardIndices);
            setYourHand([
              ...yourHand,
              ...newCardValues
            ]);
          }
          socket.emit("start-round", {
            change: true, 
            matchCard: matchCard, 
            ignoreMatch: false, 
            reverse: reverse,
            wildColour: false
          });
        }
      }
      yourHand.splice(yourHand.indexOf(card), 1);
      //Update the no. of cards in your hand for other players
      socket.emit("set-players-cards", yourHand.length);
      //Update the match card
      setMatchCard(card);
      socket.emit("set-match-card", card);
      //Reset all your cards to playable
      yourHand.forEach(card => {
        card.playable = true;
      });
      setHasDrawnCard(false);
      //Check if you played a wild card
      let switchReverse = reverse;
      if (card.id[0] === 'W') {
        setPlayedWild(true);
        return true;
      }
      //Check if you played a reverse card
      if (card.id[1] === 'R') {
        switchReverse = !reverse;
        setReverse(switchReverse);
      }
      socket.emit("start-round", {
        change:true, 
        matchCard:card, 
        ignoreMatch:false, 
        reverse:switchReverse,
        wildColour: false
      });
      return true;
    } else {
      setMessages([
        ...messages,
        {
          messageId: "GameBot" + Date.now(),
          fromId: -1, 
          fromUser: "GameBot", 
          content: yourTurn ? "You cannot play this card" : "It is not your turn"
        }
      ]);
      return false;
    }
  }

  const pickColour = colourChoice => {
    socket.emit("start-round", {
      change: true,
      matchCard: matchCard,
      ignoreMatch: false,
      reverse: reverse,
      wildColour: colourChoice
    });
    setPlayedWild(false);
  };

  const [disconnected, setDisconnected] = useState(false);
  useEffect(() => {
    socket.on("room-delete", () => {
      setDisconnected(true);
    });
    return () => socket.off("disconnected");
  }, [socket]);
  useEffect(() => {
    socket.on("room-update", () => {
      setDisconnected(true);
      socket.emit("delete-room");
    });
    return () => socket.off("disconnected");
  }, [socket]);

  const sendMessage = () => {
    const newMessage = document.getElementById("inp-message").value;
    if (newMessage !== "") {
      const username = findUser(userId).username;
      const usernum  = findUser(userId).userNum;
      setMessages([
        ...messages,
        {
          messageId: username + Date.now(),
          fromId: usernum, 
          fromUser: username, 
          content: newMessage
        }
      ]);
      socket.emit("send-message", newMessage);
      document.getElementById("inp-message").value = "";
    }
  }

  return (
    <div className="row h-100 mx-0">
        <div className="col p-0 d-flex flex-column h-100 align-items-center justify-content-between">
            <div className="row d-flex flex-column" style={{height: "33%"}}>
            {
              currentPlayer && !yourTurn ? <> <h1
                  className="text-center"
                  style={{
                    color: userColours[currentPlayer ? currentPlayer.num : 0][0]
                  }}
              >{currentPlayer.name}</h1>
              <Hand numCards={opponentsHand} opponent={true}/> </> :
              yourTurn ? <h1 
                style={{
                  color: userColours[currentPlayer ? currentPlayer.num : 0][0]
                }}>Your Turn</h1> : ""
            }
            </div>
            <div className="row d-flex align-items-center" style={{height: "33%"}}>
                <Deck 
                    card={matchCard} 
                    drawNewCard={drawNewCard} 
                    shoutUno={shoutUno}
                    unoShouts={unoShouts}
                    userId={userId}
                />
            </div>
            <div className="row d-flex align-items-end" style={{height: "33%"}}>
                <Hand cards={yourHand} opponent={false} playCard={playCard}/>
            </div>
        </div>
        <div className="h-100 p-0 col-2 bg-light d-flex flex-column">
            <div className="h-15">
                <h1 className="text-center mt-3">Chat</h1>
                <hr/>
            </div>
            <div className="h-70">
                <div 
                    className="h-100 d-flex flex-column justify-content-end"
                    style={{overflow: "hidden"}}
                >
                    <Messages messages={messages}/>
                </div>
            </div>
            <div className="h-15">
                <hr/>
                <div className="row d-flex justify-content-center">
                    <textarea 
                        className="form-control col-6" 
                        id="inp-message"
                        onKeyDown={e => {
                          if (e.keyCode === 13) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                    ></textarea>
                    <button 
                        type="button" 
                        className="btn btn-lg btn-success col-4 ml-2"
                        onClick={() => {
                          sendMessage();
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
        <div className={"modal fade " + (gameWon || disconnected ? "d-block show" : "")} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <h1 className="text-center mb-4">
                            {gameWon ? gameWon + " won!!!" : "Someone disconnected"}
                        </h1>
                        <button 
                            type="button" 
                            className="btn btn-secondary d-block mx-auto"
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Back to menu
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className={"modal fade " + (playedWild ? "d-block show" : "")} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <h1 className="text-center mb-4">
                            Pick a colour:
                        </h1>
                        <div className="d-flex">
                            <button 
                                type="button" 
                                className="btn btn-danger d-block mx-auto"
                                onClick={() => pickColour('R')}
                            >
                                Red
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-success d-block mx-auto"
                                onClick={() => pickColour('G')}
                            >
                                Green
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-warning d-block mx-auto"
                                onClick={() => pickColour('Y')}
                            >
                                Yellow
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary d-block mx-auto"
                                onClick={() => pickColour('B')}
                            >
                                Blue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Game;