import { createClient } from '@supabase/supabase-js'
import { Database } from "./supabase"

const supabaseUrl = 'https://ibexpeclokbvhlzrqwdx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZXhwZWNsb2tidmhsenJxd2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1NTEwOTIsImV4cCI6MjA0MjEyNzA5Mn0.J7yb5QcpKdqpP-KqZkKPcr10uE3xDQAdRHTaGXD2rEE"
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function addPointsToDb(nickname: string, points: number)  {

    if(!nickname){
      alert("käyttäjänimi tarvitaan")
      return
    }

    const {data, error} = await supabase.from('ranking').insert([
      {
        nickname: nickname,
        points: points
      }
    ]).select()

    if(error){
      alert("tapahtui virhe: " + error.message)
      return
    }

    console.log(data)
    return data.at(0)
  }