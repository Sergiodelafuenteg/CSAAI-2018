
var canvas, ctx, video;
var seekbar,volumbar;
var cameras = [];

function main() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  Initcontrols();
  console.log(video);
  /*canvas.width = video.width;
  canvas.height = video.height;
  */
  console.log(video.width, video.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  video.addEventListener('play', render);
  seekbar.addEventListener('change', Seekbar);
  volumbar.addEventListener('change', VolumeControl);

}

function Initcontrols() {
  seekbar = document.getElementById("seek-bar");
  seekbar.value = 0;
  volumbar = document.getElementById("volume-bar");
  volumbar.value = 1;
  Cameras();
  ChooseCam(1);
}

function render() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  Refreshbar();
  Refreshclock();
  requestAnimationFrame(render);
}

function Cameras() {
  var c1 = document.getElementById("aux1");
  var c2 = document.getElementById("aux2");
  var c3 = document.getElementById("aux3");
  var c4 = document.getElementById("aux4");

  cameras.push(c1,c2,c3,c4);
}

function Play() {
  if (video.paused || video.ended) {
    document.getElementById("play-pause").innerHTML = "u";
    for (var i = 0; i < cameras.length; i++) {
      cameras[i].play();
    }
  }else {
    document.getElementById("play-pause").innerHTML = "P";
    for (var i = 0; i < cameras.length; i++) {
      cameras[i].pause();
    }
  }console.log(video.currentTime);
}

function Seekbar() {
  var time = seekbar.value * (video.duration/seekbar.max)
  for (var i = 0; i < cameras.length; i++) {
    cameras[i].currentTime = time;
  }
}
function Refreshbar() {
  var value = video.currentTime * (seekbar.max/video.duration)
  seekbar.value = value;
}
function VolumeControl() {
  video.volume = volumbar.value;
}
function Mute() {
  if (video.muted) {
    video.muted = false;
    document.getElementById("mute").innerHTML = "Q"
  }else {
    video.muted = true;
    document.getElementById("mute").innerHTML = "g";
  }
}

function Refreshclock() {
  var s;
  s = Math.round(video.currentTime);
  if (s >= 10) {
      document.getElementById("Clock").innerHTML = "00:" + s;
  }else {
      document.getElementById("Clock").innerHTML = "00:0" + s;
  }

}

//-------------------------REALIZADOR----------------------------//


function ChooseCam(x) {
  switch (x) {
    case 1:
      Select(1);
      break;
    case 2:
      Select(2);
      break;
    case 3:
      Select(3);
      break;
    case 4:
      Select(4);
      break;
    default:
      Select(1);
  }
  function Select(y) {
    if (video != undefined){video.muted = true;}

    video = document.getElementById("aux" + y);
    video.muted = false;
    for (var i = 1; i <= 4; i++) {
      if (i == y) {
          document.getElementById("aux" + i).style.border = "thick solid #0000FF";
      }else {
        document.getElementById("aux" + i).style.border = "none";

      }
    }
  }
}
