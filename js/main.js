var initialize = function(context, callback) {
  try {
    var xhr = XHRGetBuffer;
    var bufferLoader = new BufferLoader(context, xhr);
    bufferLoader.load('sound/amazing-grace.mp3', function(url) {
    // bufferLoader.load('sound/how-great-thou-art.mp3', function(url) {
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
