function stop() {
  navigator.webkitGetUserMedia({
      audio: false,
      video: true
    },
    function (stream) {
      var video = document.getElementById("local_video");
      video.src = window.webkitURL.createObjectURL(null);
    },
    function (error) {
      console.log('getUserMedia() error', error);
    });
}
