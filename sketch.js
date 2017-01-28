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
    movers[i].drawLine(movers)
  }
}


function Mover(index, n, widht, height) {
  this.radius = height / 3
  this.angle = 360 / n * index

  this.x = cos(this.angle) * this.radius + width / 2
  this.y = sin(this.angle) * this.radius + height / 2

  this.diameter = 25

  this.skips = 0

  // so this is my fancy way of determining on how many arms do i have to skip
  // for odd number: skips = (n - 1) / 2
  // for even numbers skips = (n - 2) / 2
  if (n % 2 == 0) {
    this.skips = (n - 2) / 2
  } else {
    this.skips = (n - 1) / 2
  }

  this.render = function() {
    noStroke()
    fill(255)
    ellipse(this.x,this.y,this.diameter,this.diameter)
  }

  this.drawLine = function(others) {
    stroke(255)
    //line(this.x,this.y,others[this.getIndex(others)].x,others[this.getIndex(others)].y)
    var i = this.skips + index
    if (i >= others.length) {
      i -= others.length
    }

    line(this.x,this.y,others[i].x, others[i].y)
  }

}
