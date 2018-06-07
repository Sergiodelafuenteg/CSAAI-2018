var shapes = [];
var canvas;
var ctx;
var points=0;
var vidas = 3;
var End = false;
var play;
var clock = {
  msec: 0%999,
  sec: 0%9,
  min: 0%59
}

var Pos = function(x, y) {
	this.x = x
	this.y = y
}
var Scene = function(sizei, sizej) {
	var i, j;
  this.map = [
    //12x16
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 0, 3, 3, 3, 3, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

	// this.start = new Pos(Math.round(sizei/2), Math.round(sizej/2));
	// this.pos = new Pos(this.start.x, this.start.y);
	this.tile = new Array(sizei);
	for(i = 0; i < sizei; i++){
		this.tile[i] = new Array(sizej)
		for(j = 0; j < sizej; j++){
			this.tile[i][j] = this.map[(sizej*i)+j];
		}
	}
  /*this.coord = {
    for (var i = 0; i < this.tile.length; i++) {
      for (var j = 0; j < this.tile[i].length; j++) {

        if (pac.tile[i][j] === 1) {
            shapes.push(new Rectangle("r1", j*50, i*50, 50, 50, 'rgba(0, 0, 255, 1.0)'));
        }else if (pac.tile[i][j] === 2) {
            shapes.push(new Pacman("pacman", (j*50)+25, (i*50)+26, 25, 'rgba(255, 0, 0, 0.5)'));
        }
      }
    }
  }*/
}

var Collision_engine = function (id1, id2) {
  var obj1 = getShape(id1);
  for (var shape in shapes) {
    if ((shape.id ==! id1) && (obj.x == shape.x) && (obj.x == shape.x)){

      console.log('jjiji');
    }
  }
}

function Clock() {
  clock.msec = (clock.msec%1000) + 20;
  if (clock.msec == 1000){
    clock.sec = (clock.sec) + 1;
    clock.sec = clock.sec%60;
    if (clock.sec == 0) {
      clock.min = clock.min + 1;
    }
  }
}
// 'same' para comparacion perfecta, para intervalo introducir numero
function Same_coord(x1, y1, x2, y2, same) {
  if (same === 'same') {
    return ((x1 === x2) && (y1 === y2)) ? true : false;
  } else {
    return ((x1+same > x2) && (x1-same < x2) && (y1+same > y2)
            && (y1-same < y2)) ? true : false;
  }
}

function Pacman(id, x, y, radious, color, map_array) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.radious = radious;
  this.color = color;
  this.despx = 0;
  this.despy = 0;
  this.move_buffer = '';
  this.power = false;
  this.map_array = map_array;
  this.direction = function (dir, arc) {
    switch (dir) {
      case 'up':
        return (arc == 'start') ? [1.5, 1.75] : [3.45, 3.25];
        break;
      case 'down':
        return (arc == 'start') ? [0.5, 0.75] : [2.45, 2.25];
        break;
      case 'left':
        return (arc == 'start') ? [1, 1.25] : [2.95, 2.75];
        break;
      case 'right':
        return (arc == 'start') ? [0, 0.25] : [1.95, 1.75];
        break;
      default:
        return (arc == 'start') ? [0, 0.25] : [1.95, 1.75];
    }
  }
  this.boca = {
    dir : "",
    position : 0
  }

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radious, //0.5*Math.PI,2.45*Math.PI, false);
       this.direction(this.boca.dir,'start')[this.boca.position]*Math.PI,
       this.direction(this.boca.dir,'end')[this.boca.position]*Math.PI, false);
    ctx.lineTo(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  this.movex = function(desp) {

    this.x = this.x + desp;

    if((this.x - this.radious)<0)
      this.x = this.radious;
    if((this.x + this.radious)>=canvas.width)
      this.x = canvas.width - this.radious;
  }
  this.movey = function(desp) {

    this.y = this.y + desp;

    if((this.y - this.radious)<0)
      this.y = this.radious;
    if((this.y + this.radious)>=canvas.height)
      this.y = canvas.height - this.radious;
  }
  this.moveboca = function () {
    if (clock.msec%200 == 0) {
      this.boca.position += 1;
      this.boca.position %= 2;
    }
  }
  this.move = function () {

    if (this.check_rail(this.x,this.y,this.boca.dir)) {
      switch(this.move_buffer) {
        case "left":
          this.boca.dir = 'left';
          this.despx = -5;
          this.despy = 0;
          break;
        case "right":
          this.boca.dir = 'right';
          this.despx = 5;
          this.despy = 0;
          break;
        case "up":
          this.boca.dir = 'up';
          this.despy = -5;
          this.despx = 0;
          break;
        case "down":
          this.boca.dir = 'down';
          this.despy = 5;
          this.despx = 0;
          break;
        default:
          break;
      };
      for (let i = 0; i < shapes.length; i++) {
        if ((shapes[i].id == 'p') && Same_coord(this.x, this.y, shapes[i].x, shapes[i].y,'same')) {
          shapes.splice(i,1);
          points += 100;
        }else if ((shapes[i].id == 'ghost') && Same_coord(this.x, this.y, shapes[i].x, shapes[i].y,50)) {
          if (this.power) {
            console.log('poweeer');
          }else {
            console.log('muerte');
            vidas -=1;
            if (vidas == 0) {
              End_game();
            }
            this.x = (8*50)+25;
            this.y = (8*50)+25;
          }
        }else if ((shapes[i].id == 'fresa') && Same_coord(this.x, this.y, shapes[i].x, shapes[i].y,50)) {
          shapes.splice(i,1);
          points += 1000;
        }else if ((shapes[i].id == 'p2') && Same_coord(this.x, this.y, shapes[i].x, shapes[i].y,'same')) {
          this.power = true;
          shapes.splice(i,1);
          setTimeout(function () {
            this.power = false;
            console.log('no power');
            console.log(this.power);
          }, 1000)
          this.power = false;
        }
      }
    }else {

    }
    let localpos = {
      // 0.1 factor correccion
      x: this.x+(5.1*this.despx),
      y: this.y+(5.1*this.despy)
    }
    if (!this.check_wall(localpos.x, localpos.y, this.map_array)) {
      this.movex(this.despx);
      this.movey(this.despy);
    }
    this.moveboca();
  }
  this.check_wall = function (x, y, map_array) {
    x = x-25;
    y = y-25;
    return (map_array[Math.round((y)/50)][Math.round((x)/50)] == 1) ? true : false;

  }
  this.check_rail = function (x, y, dir) {
    switch (dir) {
      case 'up':
        return (y % 50 === 25) ? true : false;
        break;
      case 'down':
        return (y % 50 === 25) ? true : false;
        break;

      case 'left':
        return (x % 50 === 25) ? true : false;
        break;
      case 'right':
        return (x % 50 === 25) ? true : false;
        break;

      default:
        return true;
    }
  }
  this.update = function () {
    this.move();
    console.log(this.power);
    //console.log(this.check_wall(this.x+this.despx, this.y+this.despy, this.map_array));
  }
}

function Rectangle(id, x, y, sx, sy, color) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.sx = sx;
  this.sy = sy;
  this.color = color;

  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.sx, this.sy);
  }
  this.update = function () {
    return;
  }
}

function Ghost(id, x, y, radious, color, map_array) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.radious = radious;
  this.color = color;
  this.despx = 0;
  this.despy = 0;
  this.move_buffer = 'left'
  this.dir = 'left'
  this.map_array = map_array;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radious, 3.14, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.beginPath();
    ctx.fillRect(this.x-this.radious, this.y, this.radious*2, this.radious-1);
    // ctx.save();
    ctx.beginPath();
    ctx.arc(this.x+this.radious/2, this.y, this.radious/5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    ctx.fill();
    // ctx.save();
    ctx.beginPath();
    ctx.arc(this.x-this.radious/2, this.y, this.radious/5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    ctx.fill();
  }

  this.movex = function(desp) {

    this.x = this.x + desp;

    if((this.x - this.radious)<0)
      this.x = this.radious;
    if((this.x + this.radious)>=canvas.width)
      this.x = canvas.width - this.radious;
  }
  this.movey = function(desp) {

    this.y = this.y + desp;

    if((this.y - this.radious)<0)
      this.y = this.radious;
    if((this.y + this.radious)>=canvas.height)
      this.y = canvas.height - this.radious;
  }
  this.move = function () {

    if (this.check_rail(this.x,this.y,this.dir)) {
      switch(this.move_buffer) {
        case "left":
          this.dir = 'left';
          this.despx = -5;
          this.despy = 0;
          break;
        case "right":
          this.dir = 'right';
          this.despx = 5;
          this.despy = 0;
          break;
        case "up":
          this.dir = 'up';
          this.despy = -5;
          this.despx = 0;
          break;
        case "down":
          this.dir = 'down';
          this.despy = 5;
          this.despx = 0;
          break;
        default:
          break;
      };
    }else {
      let obj;
      obj = getShape("pacman");
      if(obj === undefined)
        return;
      this.move_buffer = obj.move_buffer;
    }
    let localpos = {
      // 0.1 factor correccion
      x: this.x+(5.1*this.despx),
      y: this.y+(5.1*this.despy)
    }
    if (!this.check_wall(localpos.x, localpos.y, this.map_array)) {
      this.movex(this.despx);
      this.movey(this.despy);
    }else {
      let m = ['up', 'left', 'down', 'right'];
      this.move_buffer = m[Math.floor((Math.random() * 4))];
    }
  }
  this.check_wall = function (x, y, map_array) {
    x = x-25;
    y = y-25;
    return (map_array[Math.round((y)/50)][Math.round((x)/50)] == 1) ? true : false;

  }
  this.check_rail = function (x, y, dir) {
    switch (dir) {
      case 'up':
        return (y % 50 === 25) ? true : false;
        break;
      case 'down':
        return (y % 50 === 25) ? true : false;
        break;

      case 'left':
        return (x % 50 === 25) ? true : false;
        break;
      case 'right':
        return (x % 50 === 25) ? true : false;
        break;

      default:
        return true;
    }
  }
  this.update = function () {
    this.move();
  }
}

function Circle(id, x, y, radious, color) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.radious = radious;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radious, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  this.update = function () {
      return;
  }
}

function Fruta(id, x, y) {
  var Img = new Image("1px", "1px");
  Img.src = "lib/frs.png";
  this.id = id;
  this.x = x;
  this.y = y;
  this.draw = function() {
    ctx.save();
    // ctx.translate(0, 0);
    ctx.drawImage(Img, this.x, this.y, 50, 50);
    ctx.restore();
  }
  this.update = function () {
    return;
  }
}

function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(x in shapes) {
      shapes[x].draw();
    }
}

function getShape(id) {
  for(x in shapes) {
    if(shapes[x].id === id)
      return shapes[x];
  }
}

function Update() {
  for (let i in shapes) {
    shapes[i].update();
  }
  Control_fresa();
}

function Control_fresa() {
  if ((clock.sec%5 == 0) && (clock.msec%1000 == 0)) {
    let obj;
    obj = getShape("fresa");
    if (obj === undefined) {
      let f = [[7,1],[7,10],[1,6],[14,6]];
      let fresa_pos = f[Math.floor((Math.random() * 4))]
      console.log(fresa_pos);
      shapes.push(new Fruta('fresa',fresa_pos[0]*50, fresa_pos[1]*50));
    }else {
      shapes.splice(shape_pos(obj.id),1)
    }
  }
}

function shape_pos(id) {
  for (var i = 0; i < shapes.length; i++) {
    if (shapes[i].id == id) {
      return i;
    }
  }
}

function End_game() {
  clearInterval(play)
  document.getElementById("canvas").style.display = 'none';
  document.getElementById("lifes").style.display = 'none';
  document.getElementById("score").style.fontSize = '300px';

}

function keyHandler(event) {
  let obj;
  obj = getShape("pacman");
  if(obj === undefined)
    return;

  switch(event.key) {
    case "ArrowLeft":
      obj.move_buffer = 'left';
      break;
    case "ArrowRight":
      obj.move_buffer = 'right';
      break;
    case "ArrowUp":
      obj.move_buffer = 'up';
      break;
    case "ArrowDown":
      obj.move_buffer = 'down';
      break;
    default:
      console.log("Key not handled");
  }
}

function render() {
  Clock();
  Update();
  document.getElementById("score").innerHTML = "score: " + points;
  document.getElementById("lifes").innerHTML = "lifes: " + vidas;
  drawShapes();
}

function Scene_init() {
  var pac = new Scene(12,16);
  for (var i = 0; i < pac.tile.length; i++) {
    for (var j = 0; j < pac.tile[i].length; j++) {
      if (pac.tile[i][j] === 0) {
        shapes.push(new Circle("p", (j*50)+25, (i*50)+25, 5, 'rgba(200, 230, 20, 1)'));
      }else if (pac.tile[i][j] === 1) {
        shapes.push(new Rectangle("r1", j*50, i*50, 50, 50, 'rgba(0, 0, 255, 1.0)'));
      }else if (pac.tile[i][j] === 2) {
        shapes.push(new Pacman("pacman", (j*50)+25, (i*50)+25, 25, 'rgba(20, 230, 0, 1)', pac.tile));
      }else if (pac.tile[i][j] === 3) {
        shapes.push(new Ghost("ghost", (j*50)+25, (i*50)+25, 25, 'rgba(250, 0, 0, 1)', pac.tile));
      // }else if (pac.tile[i][j] === 4) {
      //   shapes.push(new Circle("p2", (j*50)+25, (i*50)+25, 10, 'rgba(200, 230, 20, 1)'));
      }
    }
  }
  console.log(pac.tile);
}

function main() {
  canvas = document.getElementById('canvas');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx = canvas.getContext('2d');

  document.addEventListener('keydown', keyHandler, false);
  Scene_init();
  //shapes.push(new Rectangle("r1", 0, 0, 50, 50, 'rgba(0, 0, 255, 1.0)'));
  //shapes.push(new Rectangle("r1", 0, 100, 50, 50, 'rgba(0, 0, 255, 1.0)'));
  if (!End) {
    play = setInterval(render, 20);
  }else{
    clearInterval(play);
  }
}
