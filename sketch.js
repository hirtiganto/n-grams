var canvas
var arms = []
var pSlider, slider, previousValue

function setup() {
  canvas = createCanvas(windowWidth,windowHeight)
  canvas.position(0, 0)
  canvas.style('z-index', -1)
  angleMode(DEGREES)

  pSlider = createElement('p', 'Change the amount of arms')
  pSlider.style('color', 'white')
  slider = createSlider(3, 50, 5)
  previousValue = slider.value()

  for (var i = 0; i < slider.value(); i++) {
    arms.push(new Arm(i, slider.value(), width, height))
  }
}


function changeArms() {
  var a = []
  for (var i = 0; i < slider.value(); i++) {
    a.push(new Arm(i, slider.value(), width, height))
  }
  return a
}


function draw() {
  background(242, 2, 106)

  if (slider.value() != previousValue) {
    arms = changeArms()
  }

  for (var i = 0; i < arms.length; i++) {
    arms[i].render()
    arms[i].drawLine(arms)
  }
}


function Arm(index, n, widht, height) {
  this.radius = height / 3
  this.angle = 360 / n * index

  this.x = cos(this.angle) * this.radius + width / 2
  this.y = sin(this.angle) * this.radius + height / 2

  this.diameter = 15
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
    var i = this.skips + index
    if (i >= others.length) {
      i -= others.length
    }

    line(this.x,this.y,others[i].x, others[i].y)
  }

}
