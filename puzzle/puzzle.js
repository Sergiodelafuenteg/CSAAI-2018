var canvas;
var ctx;
var Img = new Image();
var Piezas = [];
var level = 3;
var piezah;
var piezaw;
var clock = {
  sec: 0,
  min: 0
}

function Refreshclock() {
  var s, m;
  s = clock.sec;
  m = clock.min;
  if (m >= 10) {
    if (s >= 10) {
        document.getElementById("clock").innerHTML = m + ":" + s;
    }else {
        document.getElementById("clock").innerHTML = m + ":0" + s;
    }
  }else {
    if (s >= 10) {
        document.getElementById("clock").innerHTML = "0" + m + ":" + s;
    }else {
        document.getElementById("clock").innerHTML = "0" + m + ":0" + s;
    }
  }

}
function Clock() {
  clock.sec += 1;
  if (clock.sec%60 == 0) {
    clock.sec = 0;
    clock.min += 1;
  }
  Refreshclock()
}

function Pieza(id, sx, sy, sw, sh, x, y, w, h) {
  this.id = id;
  this.sx = sx;
  this.sy = sy;
  this.sw = sw;
  this.sh = sh;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

function getPieza(id) {
  for(x in Piezas) {
    if(Piezas[x].id === id)
      return Piezas[x];
  }
}


function Update() {
  for (let i in Piezas) {
    Piezas[i].update();
  }
}

function render() {
  // Update();
  drawPiezas();
}

function Coord_Clip(level) {
  for (var i = 0; i < level; i++) {
    for (var j = 0; j < level; j++) {
      Piezas.push(new Pieza(((j*level)+i), i*piezaw, j*piezah,
      piezaw,piezah, i*piezaw, j*piezah, piezaw,piezah));
    }
  }
  let obj = getPieza(Piezas.length-1);
  obj.sw = 0;
  obj.sh = 0;
}

function Calc_coord(pos) {
  var Pos = function(x, y) {
  	this.x = x
  	this.y = y
  }
  let coord = []
  for (var i = 0; i < level; i++) {
    for (var j = 0; j < level; j++) {
      coord.push(new Pos(j*piezaw, i*piezah));
    }
  }
  return coord[pos];
}

function Calc_pos(x,y) {
  this.x = x
  this.y = y
  // console.log(x,y);


  let i = Math.floor(this.x/piezaw);
  let j = Math.floor(this.y/piezah);
  // console.log(i,j);
  return (j*level)+i;
}


function Draw_puzzle(img) {
  console.log(Piezas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < Piezas.length; i++) {
      ctx.drawImage(img, Piezas[i].sx, Piezas[i].sy, Piezas[i].sw, Piezas[i].sh,
         Calc_coord(i).x, Calc_coord(i).y, Piezas[i].w, Piezas[i].h);
      ctx.strokeRect(Piezas[i].x, Piezas[i].y, Piezas[i].w, Piezas[i].h);
  }
}

function Pieza_pos(id) {
  for (var i = 0; i < Piezas.length; i++) {
    if (Piezas[i].id == id) {
      return i;
    }
  }
}

function Click_valid(x, y) {
  let pos_white = Pieza_pos(Piezas.length-1)
  console.log(pos_white);
  return ((Calc_pos((x + piezaw),y) == pos_white) || (Calc_pos(x,(y + piezah)) == pos_white)
         || (Calc_pos((x - piezaw),y) == pos_white) || (Calc_pos(x,(y - piezah)) == pos_white)) ?
         true : false
}

function Same_coord(x1, y1, x2, y2, same) {
  if (same === 'same') {
    return ((x1 === x2) && (y1 === y2)) ? true : false;
  } else {
    return ((x1+same > x2) && (x1-same < x2) && (y1+same > y2)
            && (y1-same < y2)) ? true : false;
  }
}

function Swap_piezas(x,y) {
  if (Click_valid(x,y)) {
    Piezas.Swap(Calc_pos(x,y), Pieza_pos(Piezas.length-1))
  }
}

function MouseCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    var coords = {
      x: x,
      y: y
    };
    console.log(Calc_pos(coords.x,coords.y));
    console.log(Click_valid(coords.x,coords.y));
    Swap_piezas(coords.x,coords.y);
    Draw_puzzle(Img);
    if (Check_win()) {
      Draw_win();
    };
}

function Check_win() {
  let win;
  for (var i = 0; i < Piezas.length; i++) {
    if (Piezas[i].id == i) {
      win = true;
    }else {
    return false;
    }
  }
  return win;
}

function Draw_win() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(Img,0,0);
  console.log('yeaaaa');
}

Array.prototype.Suffle = function () {
  return this.sort(function() {return Math.random() - 0.5});
};
Array.prototype.Swap = function (i, j) {
  var aux = this[i];
  console.log(aux);
  this[i] = this[j];
  console.log(this[i]);
  this[j] = aux;
  console.log(this[j]);
};


function Main() {
  Clock();
  setInterval(Clock,1000)
  canvas = document.getElementById('canvas');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }
  ctx = canvas.getContext('2d');
  canvas.style.border = "1px solid black";
  piezah = canvas.height/level;
  piezaw = canvas.width/level;
  Img.src = "nube.png";
  Coord_Clip(level)
  Piezas.Suffle();
  Img.addEventListener('load', function() {
    Draw_puzzle(Img)
  }, false);
  canvas.addEventListener('click', MouseCoords)


}
