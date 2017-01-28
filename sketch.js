var canvas
var movers = []

function setup() {
  canvas = createCanvas(windowWidth,windowHeight)
  canvas.position(0, 0)
  canvas.style('z-index', -1)
  angleMode(DEGREES)

  var arms = 5
  for (var i = 0; i < arms; i++) {
    movers.push(new Mover(i, arms, width, height))
  }
}


function draw() {
  background(242, 2, 106)

  for (var i = 0; i < movers.length; i++) {
    movers[i].render()
  }
}


function Mover(index, n, widht, height) {
  this.radius = height / 3
  this.angle = 360 / n * index

  this.x = cos(this.angle) * this.radius + width / 2
  this.y = sin(this.angle) * this.radius + height / 2

  this.diameter = 25

  this.render = function() {
    noStroke()
    fill(255)
    ellipse(this.x,this.y,this.diameter,this.diameter)
  }

}
