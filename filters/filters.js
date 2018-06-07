
var video = document.createElement("VIDEO");
var image = new Image();
var c1 = document.createElement("canvas");

var Chroma = false;
var  c1,c2,ctx1,ctx2;

function LoadVideo() {

  video.setAttribute("id", "originalvid");
  video.setAttribute("type", "video/mp4");
  video.setAttribute("src", "touch.mp4");
  video.setAttribute("width", "80%");
  video.setAttribute("height", "80%");
  video.setAttribute("controls", "controls");

}
function LoadCanvas() {

  c1.setAttribute("width", "360");
  c1.setAttribute("height", "316");
  c1.setAttribute("id", "c1");
  ctx1 = c1.getContext("2d");
  c2 = document.getElementById("c2");
  ctx2 = c2.getContext("2d");
  image.src = "picasso.jpg"
  console.log(image);
}

function Load() {

  LoadVideo();
  LoadCanvas();
  video.play();
  video.addEventListener('play', Replacechroma);

}

function Replacechroma() {
  ctx1.drawImage(video, 0, 0, c1.width, c1.height);

  var frame = ctx1.getImageData(0, 0, c1.width, c1.height);
	var l = frame.data.length / 4;
  if (Chroma) {
    for (var i = 0; i < l; i++) {
      var r = frame.data[i * 4 + 0];
      var g = frame.data[i * 4 + 1];
      var b = frame.data[i * 4 + 2];
      if (g > 135 && r < 198 && b < 153)
        frame.data[i * 4 + 3] = 0;
    }
  }
  ctx2.putImageData(frame, 0, 0);
  setTimeout(Replacechroma,1)
  //return;
}

function ChooseImg(x) {
  switch (x) {
    case 1:

      c2.style.background = "url('Miro.jpg')";

      Select(1);
      break;
    case 2:
      Select(2);
      c2.style.background = "url('picasso.jpg')";
      c2.style.backgroundSize="360px 316px" ;
      break;
    case 3:
      Select(3);
      c2.style.background = "url('gogh.jpg')";
      c2.style.backgroundSize="360px 316px" ;
      break;
    case 4:
      Select(4);
      c2.style.background = "url('vulcan.jpg')";
      c2.style.backgroundSize="360px 316px" ;
      break;
    default:
      Select(1);
  }
  function Select(y) {
    Chroma = true;
    video.play();
    for (var i = 1; i <= 4; i++) {
      if (i == y) {
          document.getElementById("aux" + i).style.border = "thick solid #0000FF";
      }else {
        document.getElementById("aux" + i).style.border = "none";

      }
    }
  }
}
