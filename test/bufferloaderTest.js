describe("BufferLoaderTest", function() {
  var xhr = null, context = null;

  beforeEach(function() {
    xhr = function(url, callback) {
      var fakeResponse = {};
      callback(fakeResponse);
    };

    context = {
      decodeSuccess: true,
      decodeAudioData: function(response, successCallback, failCallback) {
        var fakeBuffer = {};
        this.decodeSuccess ? successCallback(fakeBuffer) : failCallback();
      }
    };
  });

  it("should load audio file decode and cache in array", function(done) {
    spyOn(context, "decodeAudioData").and.callThrough();
    var bufferLoader = new BufferLoader(context, xhr);
    var path = "/path/to/file/mp3";
    expect(bufferLoader.caches[path]).toBe(undefined);
    bufferLoader.load(path, function(url) {
      expect(context.decodeAudioData).toHaveBeenCalled();
      expect(bufferLoader.caches[url]).not.toBe(undefined);
      done();
    });
  });

  it("should not load the existing buffer twice", function(done) {
    var bufferLoader = new BufferLoader(context, xhr);
    var path = "/path/to/file/mp3";
    bufferLoader.load(path, function(url) {
      expect(bufferLoader.count).toBe(1);
    });
    bufferLoader.load("/path/to/file/mp3", function(url) {
      expect(bufferLoader.count).toBe(1);
      done();
    });
  });

  it("should throw the BufferDecodeException when decoding fail", function() {
    context.decodeSuccess = false;
    var bufferLoader = new BufferLoader(context, xhr);
    var path = "/path/to/file/mp3";
    expect(function() {
      bufferLoader.load(path, function(url) {});
    }).toThrowError(BufferDecodeException);
  });
});
