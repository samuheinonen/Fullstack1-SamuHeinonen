import { useState, CSSProperties } from "react"
import { Layout, Navigation, HomeButton, Points } from "../components/common"

interface BallProps {
    maxCount: number
    x: number
    y: number
  }
  
  function Ball({maxCount, x, y}: BallProps) {
  
    const [clicked, setClicked] = useState(0)
  
    //const maxCount = 10
  
    const style: CSSProperties = {
      background: "red",
      width: 50 + "px",
      height: 50 + "px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      position: "absolute",
      userSelect: "none",
      cursor: "pointer",
      transform: `translate(${x}px,${y}px)`
    }
  
    if(clicked >= maxCount){
      return <div>X</div>
    }
  
    return <>
  
      <div style={style} onClick={()=> setClicked(clicked + 1)}> {clicked} / {maxCount} </div>
  
    </>
  }
  
  
  // Tehdään työkalu-funktio: randomInteger()
  // Saa parametrina min ja max arvot
  // Palauttaa satunnaisen kokonaisluvun min-max väliltä
  function randomInteger(min: number, max: number) {
  
    const random = Math.floor((Math.random() * (max - min)) + min)
  
    return random
  }
  
  
  
 export function Game() {
  
    // Array(20) luo tyhjän arrayn minkä pituus on 20
    // .fill täyttää annetulla arvolla kaikki 20 indeksiä
    // .map käy arrayn jokaisen indeksin läpi ja luo uuden arrayn paluuarvojen perusteella
    const allBalls = Array(20).fill(null).map((_, i) => {
  
      return <Ball
        key={i}
        maxCount={randomInteger(1, 6)}
        x={randomInteger(1, window.innerWidth)}
        y={randomInteger(1, window.innerHeight)}>
  
      </Ball>
  
    })
  
    return (
      <>
        <Layout>
          <Navigation>
            <HomeButton>Koti</HomeButton>
            <Points></Points>
          </Navigation>
  
          {allBalls}
  
        </Layout>
      </>
    )
  }