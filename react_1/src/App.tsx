import styled from "styled-components"


const Layout = styled.div`
  background: rgb(32, 222, 101);
  widows: 100vw;
  height: 100dvh;
`

const Navigation = styled.div`
  width: 100%;
  height: 80px;
  background-color: #22f1e3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const HomeButton = styled.button`
  margin-left: 10px;
  border-radius: 3px;
`
const Points = styled.div`
  width: 50px;
  height: 50px;
  background-color: #d13d9d;
  margin-right: 10px;
  border-radius: 50%;
`

export default function App() {

  return (
    <>
      <Layout>
        <Navigation>
          <HomeButton>KOTI</HomeButton>
          <Points></Points>
        </Navigation>
      </Layout>
    </>
  )
}


