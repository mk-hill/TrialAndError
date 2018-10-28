window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

// Ensure results do not wait for speech to stop
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
  // Get one joined string of speech from e.results blob
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
  p.textContent = transcript;
  // Set p variable to new <p> elem when user stops speaking
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
  // Do things based on what the user said
  if (transcript.includes('aliens')) {
    const body = document.querySelector('body');
    if (body.style.background !== '#00ff00') {
      body.style.background = '#00ff00';
    }
  }
});

// Start recognition again when user stops speaking so as to keep it coninuous
recognition.addEventListener('end', recognition.start);

recognition.start();
