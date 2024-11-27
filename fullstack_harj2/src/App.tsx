import styled from "styled-components";
import { CSSProperties, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

/*tunnilla tehtyyn tehtävään kolme uutta ominaisuutta: pisteiden laskeminen, ajastin sekä popup
// Pisteitä saa aina kun rikkoo pallon. Ajastimessa on 30 sek aikaa, jonka loputtua aukeaa
// popup-ikkuna, jossa pelaaja näkee saamansa pisteet. Popupista voi myös aloittaa pelin alusta.

// Pisteiden laskeminen on helposti toteutettavissa yksinkertaisilla muuttujilla/funktioilla,
// joten se on positiivinen kehittäjäkokemus.

Pisteiden laskenta ja ajastin parantavat käyttäjäkokemusta, koska pelaajalle tulee
halu saavuttaa pelissä jotain tässä tapauksessa lisää pisteitä, mahdollisimman nopeasti.
Lopun popup-ikkuna taas antaa käyttäjälle selkeän palautteen pelistä, ja mahdollisuuden koittaa uudestaan.*/


const Layout = styled.div`
  background: green;
  width: 100vw;
  height: 100dvh;
  position: relative;
`;

const Navigation = styled.div`
  width: 100%;
  height: 80px;
  background-color: lightgrey;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomeButton = styled.button`
  width: 50px;
  height: 30px;
  margin-left: 15px;
  border-radius: 10px;
  border: none;
  cursor:pointer;
`;

const Points = styled.div`
  width: 50px;
  height: 50px;
  background-color:lightgreen;
  margin-right: 15px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

const ReloadButton = styled.button` // Popup-ikkunassa olevan buttonin tyylittely
  margin-top: 20px;
  padding: 10px 20px;
  background-color: lightgreen;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Popup = styled.div` // Popup-ikkunan tyylittely
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
`;

const PopupContainer = styled(animated.div)` // Animoitu kontti
  position: absolute;
  top: 50%; // Asetetaan yläreuna keskelle
  left: 50%; // Asetetaan vasen reuna keskelle
  transform: translate(-50%, -50%); // Keskitetään popup
  z-index: 100; // Asetetaan suuremmaksi kuin pallojen z-index
`;

const Timer = styled.div` // Ajastimen tyylittely
  width: 70px;
  height: 40px;
  background-color: gray;
  margin-right: 15px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: solid;
`

type BallProps = {
  x: number;
  y: number;
  onBallDisappear: () => void; // Prop pallojen katoamisesta ilmoittamiseen
};

function Ball({ x, y, onBallDisappear }: BallProps) {
  const [maxPoints, setMaxPoints] = useState(1);
  const [points, setPoints] = useState(0);
  const [isAlive, setIsAlive] = useState(true);

  const style: CSSProperties = {
    background: "lightblue",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    position: "absolute",
    border: "solid, black",
    userSelect: "none",
    cursor: "pointer",
    color: "black",
    transform: `translate(${x}px,${y}px)`,
    zIndex: maxPoints,
  };

  useEffect(() => {
    const max = randomInteger(1, 10);
    setMaxPoints(max);
  }, []);

  useEffect(() => {
    if (points >= maxPoints) {
      setIsAlive(false);
      onBallDisappear(); // Tässä ilmoitetaan app-komponentille, että pallo katosi
    }
  }, [points]);

  if (!isAlive) {
    return (
      <div
        style={{
          transform: `translate(${x}px, ${y}px)`,
          width: "50px",
          height: "50px",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>+1</div>
      </div>
    );
  }

  return (
    <div onClick={() => setPoints(points + 1)} style={style}>
      {points} / {maxPoints}
    </div>
  );
}

function useResize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return { width, height };
}

function randomInteger(min: number, max: number) {
  const random = Math.random() * (max - min) + min;
  return Math.floor(random);
}

export default function App() {
  const { width, height } = useResize();
  const [balls, setBalls] = useState<{ x: number; y: number }[]>([]);
  
  const [totalPoints, setTotalPoints] = useState(0); // Tila pistemäärälle
  const [timer, setTimer] = useState(30); // Tila ajastimelle
  const [showPopup, setShowPopup] = useState(false); // Tila popupille

  // Popup-ikkunan animaatio
  // Tässä on käytetty React Spring kirjastoa luomaan animaatio!
  // https://www.react-spring.dev/
  const popupStyle = useSpring({
    opacity: showPopup ? 1 : 0,
    transform: showPopup ? 'translateY(0)' : 'translateY(-50px)', // Liikuttaa popup-ikkunaa ylhäältä alaspäin kun se ilmestyy
    config: { tension: 100, friction: 30 }, // Tällä voi säätää animaatiota
  });

  // Tämä luo pallot niin, ettei pallojen sijainti päivity aina kun pistemäärä päivittyy.
  useEffect(() => {
    const initialBalls = Array.from({ length: 50 }, () => ({
      x: randomInteger(50, width - 100),
      y: randomInteger(50, height - 170),
    }));
    setBalls(initialBalls);
  }, [width, height]);

  // Tämä hallitsee ajastinta
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setShowPopup(true); // Kun ajastin on nollassa, popup ilmestyy
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Tässä päivitetään pistemäärä
  const handleBallDisappear = () => {
    setTotalPoints((prevPoints) => prevPoints + 1);
  };

  // Tämä päivittää sivun, tätä käytetään popup-ikkunan Play again?-napissa
  const handleReload = () => {
    window.location.reload();
  };

  const allBalls = balls.map((ball, i) => (
    <Ball
      x={ball.x}
      y={ball.y}
      key={i}
      onBallDisappear={handleBallDisappear}
    />
  ));

  return (

    <Layout>
      <Navigation>
        <HomeButton>Home</HomeButton>
        <Timer>{timer}</Timer>
        <Points>{totalPoints}</Points>
      </Navigation>
      {allBalls}
      {showPopup && (
        <PopupContainer style={popupStyle}>
          <Popup>
            <h2>Game Over!</h2>
            <p>Your Score: {totalPoints}</p>
            <ReloadButton onClick={handleReload}>Play again?</ReloadButton>
          </Popup>
        </PopupContainer>
      )}
    </Layout>

  );
}
