import { useState } from 'react';
import { useEffect } from 'react';
import sportsItem from "./sports.json"
import './App.css';


function Card({ sport, flipped, chooseCard }){

  const cardClickHandle = () => {
    chooseCard(sport)
  };




  return <div className={`card ${flipped ? 'matched' : ''}`} onClick={cardClickHandle}>

    <img style={{transform: 'rotateY(180deg)'}} src={sport.src} />
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"></path>
      <line x1="12" y1="19" x2="12" y2="19.01"></line>
    </svg>
  </div>
}


function App() {

  const [sports, setSports] = useState([])
  const [sportOne, setSportsOne] = useState(null)
  const [sportTwo, setSportsTwo] = useState(null)

  const initGame = () => {
    const allSports = [...sportsItem, ...sportsItem]
    .sort(() => Math.random() - .5)
    .map(item => ({ ...item, id: Math.random() }))

    setSports(allSports)
  }

  const resetGame = () =>{
    setSports(prevSport => {
      return prevSport.map(item => {
        if (item.matched){
          return {...item, matched:false}
        }
        return item
      })
    })

    setSportsOne(null)
    setSportsTwo(null)

    setTimeout(() => {
      initGame()
    }, 500)

  }

  const chooseCard = (sport) => {
    sportOne ? setSportsTwo(sport) : setSportsOne(sport)
  }

  useEffect(() => {
    if (sportOne && sportTwo){
        if (sportOne.src === sportTwo.src){
          setSports(prevSport => {
            return prevSport.map(item => {
              if (item.src === sportOne.src){
                return {...item, matched: true}
              }else{
                return item
              }
            })
          })
        }

        setTimeout(() => {
          setSportsOne(null)
          setSportsTwo(null)
        }, 500)
    }
  }, [sportOne, sportTwo])

  return (<>
      <h1>Memory Game</h1>
      {
        sports.length ? <>
        <button onClick={resetGame} className='reset'>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rotate-clockwise-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5"></path>
            <line x1="5.63" y1="7.16" x2="5.63" y2="7.17"></line>
            <line x1="4.06" y1="11" x2="4.06" y2="11.01"></line>
            <line x1="4.63" y1="15.1" x2="4.63" y2="15.11"></line>
            <line x1="7.16" y1="18.37" x2="7.16" y2="18.38"></line>
            <line x1="11" y1="19.94" x2="11" y2="19.95"></line>
          </svg>
        </button>

        <div className='game-block'>
          {
            sports.map((sport, key) => {
              return <Card 
                key={key}
              sport={sport}
                chooseCard={chooseCard}
                flipped={sport === sportOne || sport === sportTwo || sport.matched}
              />
            })
          }
        </div>

        </> : 
        <button onClick={initGame} className='start-game'>
          Iniciar Juego
        </button>
      }
      </>
  );
}

export default App;
