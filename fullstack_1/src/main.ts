import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const layout = document.createElement('DIV') as HTMLDivElement

layout.innerText = "Testi"
layout.style.backgroundColor = "red"
layout.addEventListener('click', (event: MouseEvent)=>{

  layout.innerText = "Muutettu"
  

})

app.append(layout)