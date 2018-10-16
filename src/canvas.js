import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');
const gravity = 1;
const friction = 0.99;

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

addEventListener('click',function(){
    init();
});
// Objects
function Object(x, y,dx,dy, radius, color) {
    this.x = x
    this.y = y;
    this.dx = dx;
    this.dy=dy;
    this.radius = radius
    this.color = color
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill();
    c.stroke();
    c.closePath()
}

Object.prototype.update = function() {
    if(this.y+this.radius + this.dy> canvas.height){
        this.dy = -this.dy*friction;
    }else{
        this.dy += gravity;
    }

    if(this.x + this.radius + this.dx > canvas.width
     || this.x-this.radius <= 0 ){
        this.dx = -this.dx;
    }
    this.y+=this.dy;
    this.x+=this.dx;
    this.draw()
}

// Implementation
let objects;
let ball;
let ballArray = [];
function init() {
    objects = [];
    ballArray = [];
    // ball = new Object(canvas.width/2,canvas.height/2,2,30,"red");
    const radius = 30;
    for (let i = 0; i < 400; i++) {
        let x = utils.randomIntFromRange(radius,canvas.width-radius);
        let y = utils.randomIntFromRange(0,canvas.height-radius);
        let dx = utils.randomIntFromRange(-2,+2);
        let dy = utils.randomIntFromRange(-2,+2);
        let radius = utils.randomIntFromRange(10, 20);
        ball = new Object(x,y,dx,dy,radius,utils.randomColor(colors));
        ballArray.push(ball);
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    ballArray.forEach(object => {
     object.update();
    });
    // ball.update();

}

init()
animate()
