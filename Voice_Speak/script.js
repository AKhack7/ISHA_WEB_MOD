// Speech to Text
function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    alert("Browser support nahi karta");
    return;
  }
  
  const recognition = new SpeechRecognition();
  recognition.lang = "hi-IN";
  recognition.start();
  
  recognition.onresult = (event) => {
    document.getElementById("text").value =
      event.results[0][0].transcript;
  };
}

// Text to Speech
function speakText() {
  let msg = new SpeechSynthesisUtterance(
    document.getElementById("text").value
  );
  msg.lang = "hi-IN";
  speechSynthesis.speak(msg);
}
