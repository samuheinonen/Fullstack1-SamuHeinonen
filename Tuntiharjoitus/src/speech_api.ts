const synth = window.speechSynthesis;

const inputForm = document.querySelector("form")!;
const inputTxt = document.querySelector<HTMLInputElement>(".txt")!;
const voiceSelect = document.querySelector("select")!;
const pitch = document.querySelector<HTMLInputElement>("#pitch")!;
// const pitchValue = document.querySelector(".pitch-value")!;
const rate = document.querySelector<HTMLInputElement>("#rate")!;
// const rateValue = document.querySelector(".rate-value")!;

let voices: SpeechSynthesisVoice[] = [];

export function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.onsubmit = (event) => {
  event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  utterThis.pitch = Number(pitch.value);
  utterThis.rate = Number(rate.value);
  synth.speak(utterThis);

  inputTxt.blur();
};