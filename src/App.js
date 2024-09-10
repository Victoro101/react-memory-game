import './App.css'
import { useEffect, useState } from 'react'
import Singlecard from './components/Singlecard'

const cardImages =[
  {"src": "/img/helmet-1.png", matched:false},
  {"src": "/img/potion-1.png", matched:false},
  {"src": "/img/ring-1.png", matched:false},
  {"src": "/img/scroll-1.png", matched:false},
  {"src": "/img/shield-1.png", matched:false},
  {"src": "/img/sword-1.png", matched:false}
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] =useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setDisabeld] =  useState(false)

  //shuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))


    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)



  }

    // console.log(cards,turns);

    //handle a choice
    const handleChoice = (card)=>{
     choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

    }
      //compare 2 selected cards
      useEffect(()=>{

        if(choiceOne && choiceTwo){
          setDisabeld(true)
          if(choiceOne.src === choiceTwo.src){
                setCards(prevCards =>{
                    return prevCards.map(card =>{
                        if(card.src === choiceOne.src){
                          return {...card, matched: true}
                        }else {
                          return card
                        }

                    })
                })
            resetTurns();
          } else{
            console.log("those card do not match");

            setTimeout(() => resetTurns(), 1000 ); 
          }


        }
      },[choiceOne,choiceTwo])

      console.log(cards);

      //reset turns and increase turns
      const resetTurns=()=>{
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabeld(false)
      }
    // start game automatically
    useEffect(()=>{
      shuffleCards()
    },[])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card =>(
        <Singlecard card={card} 
        key={card.id} 
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />
        ))}


      </div>

          <p>Turns : {turns}</p>



    </div>

    
)}

export default App