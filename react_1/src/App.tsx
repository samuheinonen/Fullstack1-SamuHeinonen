import { CSSProperties, useState } from "react"
import styled from "styled-components"
import { addPointsToDb} from "./services/supabase_client"
import { Layout, Navigation, HomeButton } from "./components/common"


export default function App(){

  const [nickname, setNickname] = useState("")

  return <Layout>
    <Navigation>
      <HomeButton>Koti</HomeButton>
    </Navigation>

    <input value={nickname}onChange={(e)=> setNickname(e.target.value)}></input>
    <button onClick={() => addPointsToDb(nickname, 0)}>testaa supabase yht</button>

    Nimimerkki: {nickname}
  </Layout>
}
