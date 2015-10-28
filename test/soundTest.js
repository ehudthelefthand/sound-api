describe("SoundTest", function() {

  var context = null, source = null;

  beforeEach(function() {
    source = {
      connect: function(destination) {
        console.log("Connect source to " + destination);
      },
      start: function(time) {
        console.log("Start audio at time " + time);
      },
      stop: function(time) {
        console.log("Stop audio at time " + time);
      }
    };

    context = {
      destination: "target destination",
      createBufferSource: function() {
        return source;
      }
    };
  });

  it("should call to the Web Audio API when play() has been called", function() {
    spyOn(context, "createBufferSource").and.callThrough();
    spyOn(source, "connect");
    spyOn(source, "start");
    var buffer = {};
    var sound = new Sound(context, buffer);
    sound.play();
    expect(context.createBufferSource).toHaveBeenCalled();
    expect(source.connect).toHaveBeenCalled();
    expect(source.start).toHaveBeenCalled();
  });

  it("should call to the Web Audio API when pause() has been called", function() {
    spyOn(source, "stop");
    var buffer = {};
    var sound = new Sound(context, buffer);
    sound.play();
    sound.pause();
    expect(source.stop).toHaveBeenCalled();
  });

  it("should throw Error when pause() has been called before play()", function() {
    spyOn(source, "stop");
    var buffer = {};
    var sound = new Sound(context, buffer);
    expect(sound.pause).toThrowError("Can not call 'pause' without call 'play'");
  });

  it("should play or pause when call toggle()", function() {
    var buffer = {};
    var sound = new Sound(context, buffer);
    spyOn(sound, "play").and.callThrough();
    spyOn(sound, "pause").and.callThrough();
    sound.toggle();
    sound.toggle();
    expect(sound.play).toHaveBeenCalled();
    expect(sound.pause).toHaveBeenCalled();
  });

  it("should set default playing state to false when initialized", function() {
    var buffer = {};
    var sound = new Sound(context, buffer);
    expect(sound.playing).toBe(false);
  });

  it("should change playing state to true when call play()", function() {
    var buffer = {};
    var sound = new Sound(context, buffer);
    sound.play();
    expect(sound.playing).toBe(true);
  });

  it("should change playing state to false when call pause()", function() {
    var buffer = {};
    var sound = new Sound(context, buffer);
    sound.play();
    sound.pause();
    expect(sound.playing).toBe(false);
  });
});
