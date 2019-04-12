var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var mouse = { // small object to store X, Y coordinates
  x: undefined,
  y: undefined
}

var colors = [
  '#2C3E50',
  '#E74C3C',
  '#ECF0F1',
  '#3498DB',
  '#2980B9'
]

window.addEventListener("resize", function() { // on resize event
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

// addEventListener("event", function)
window.addEventListener("mousemove", function(event){ // we can use listeners to perform actions when an event occurs
  mouse.x = event.x;
  mouse.y = event.y;
});


function Circle(x, y, dx, dy, radius){ // Create an Object,  OOP
  // Assign local variables, we should use this.var inside objects!!!
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.originalRadius = radius;
  this.radius = radius;
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.draw = function() { // this function draw the circle on the screen
    // draw a cirlce
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill(); // fills the circle
  }

  this.update = function() { // this function updates the status of the circle
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) { // Make the circle bounce back the edges on X-Axis
      this.dx = -this.dx; // rever the direction by making it negative
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) { // make the circle bounce back the edges on Y-Axis
      this.dy = -this.dy; // revert the direction by making it negative
    }

    this.x += this.dx;  // increment the X position by the velocity
    this.y += this.dy;  // increment the Y position by the velocity


    // Interactivity (using listeners to do something cool)
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
      if (this.radius < this.originalRadius + 40){
        this.radius += 2;
      }
    }else if (this.radius > this.originalRadius) {
      this.radius -= 2;
    }

    this.draw(); // render after each update
  }
}

var circleArray = []; // make array

function init() { // we call this when we resize the browser (try resizing in previous tutorials)
  circleArray = []; // remove all previous circles

  for (var i = 0; i < 600; i++){
    var x = Math.random() * (innerWidth - radius * 2) + radius ; // x position
    var y = Math.random() * (innerHeight - radius * 2) + radius; // y position
    var max_velocity = 10, min_velocity = 2;
    var dx = ((Math.random() - 0.7) * (max_velocity - min_velocity)) + min_velocity; // a way to get random number between two values
    var dy = ((Math.random() - 0.7) * (max_velocity - min_velocity)) + min_velocity; // a way to get random number between two values
    var radius = Math.floor(Math.random() * 20);

    circleArray.push(new Circle(x, y, dx, dy, radius)); // add value to array

  }
}

// Loop using endless recurssion
function animate() {
  requestAnimationFrame(animate); // calling the function it self within the requestAnimationFrame function
  ctx.clearRect(0, 0, innerWidth, innerHeight); // clear the screen every time it loops (try removing it)

  circleArray.forEach(function(circle){ // iterate through all elements
    circle.update(); // grab evey element and call update()
  })
}

init();
animate(); // Start animation
