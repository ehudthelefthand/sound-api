var getAudioContext = function() {
  var context = null;
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    return context;
  }
  catch (e) {
    throw new WebAudioAPIException();
  }
}

var WebAudioAPIException = function() {
  this.message = "Web Audio API is not supported in this browser";
  this.name = "WebAudioAPIException";
  this.toString = function() {
    return this.message;
  };
};

WebAudioAPIException.prototype = Error.prototype;


var initialize = function(context, callback) {
  try {
    var xhr = XHRGetBuffer;
    var bufferLoader = new BufferLoader(context, xhr);
    bufferLoader.load('sound/how-great-thou-art.mp3', function(url) {
      var buffer = bufferLoader.caches[url];
      var sound = new Sound(context, buffer);
      callback(sound);
    });
  }
  catch (e) {
    throw e;
  }
};

window.addEventListener("load", function() {

  function setButtonText(button, playing) {
    button.innerHTML = playing ? "Pause" : "Play";
  }

  try {
    var context = getAudioContext();
    var btnSound = document.getElementById("btnSound");
    initialize(context, function(sound) {
      setButtonText(btnSound, sound.playing);
      btnSound.onclick = function() {
        sound.toggle();
        setButtonText(btnSound, sound.playing);
      };
    });
  } catch (e) {
    console.log(e.message);
  }
}, false);
