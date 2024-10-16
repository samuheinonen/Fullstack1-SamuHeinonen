import { populateVoiceList } from './speech_api'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const layout = document.createElement("DIV") as HTMLDivElement

populateVoiceList()

layout.innerText = "Hello TS!"
layout.style.backgroundColor = "red"
layout.addEventListener('click', ()=>{

  const speech = new SpeechSynthesisUtterance("This is just a test")
  speechSynthesis.speak(speech)
  layout.innerText = layout.innerText + " Muutettu"

})

app.append(layout)