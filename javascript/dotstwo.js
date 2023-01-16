const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

//Blinking effect
const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");
const textArray = ["Tutor", "Learner","Computer Scientist", "Software Engineer", "Programmer", "Developer","Copy & Paste Guru"];

let textArrayIndex = 0;
let charIndex = 0;


const particlesArray = [];
var hex_color_array = ["#ffa69e","#4c956c","#9c89b8", "#01497c"]

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    x: undefined,
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);

    if (mouse.x > canvas.width -49 || mouse.x < 49 || mouse.y > canvas.height - 49 || mouse.y < 49){
        console.log('Tried creating bubble outside of bounds.')
    }
    else{
        particlesArray.push(new Particle(mouse.x,mouse.y, 30, dx, dy));
    }
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

})

class Particle{
    constructor(x = (Math.random() * (+0.80 - +0.2) + +0.2)* canvas.width, y = ((Math.random() * (+0.80 - +0.2) + +0.2)) * canvas.height ,radius = 25, speedX ,speedY){

        this.x = x;
        this.y = y;

        this.radius = radius;

        this.speedX = speedX 
        this.speedY = speedY

        this.color = hex_color_array[Math.floor(Math.random() * hex_color_array.length)];
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0,Math.PI * 2);
        ctx.fill();
    }
}

function init(){
    for (let i = 0; i < 500; i++){
        
        var radius = Math.random() * 3 + 1;
        var X = Math.random() * (innerWidth - radius * 2) + radius; 
        var Y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        particlesArray.push(new Particle(X, Y, radius, dx, dy));
    }
}

init();

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i ++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);

    handleParticles();

    for (let i = 0; i < particlesArray.length; i ++){
        if (particlesArray[i].x + particlesArray[i].radius > innerWidth || particlesArray[i].x - particlesArray[i].radius < 0) {
            particlesArray[i].speedX = particlesArray[i].speedX * -1;
        }
        if (particlesArray[i].y + particlesArray[i].radius > innerHeight || particlesArray[i].y - particlesArray[i].radius < 0) {
                console.log(innerHeight)
            particlesArray[i].speedY = particlesArray[i].speedY * -1;
    }
}
    requestAnimationFrame(animate);
}

const erase = () => {
    if (charIndex > 0) {
      cursor.classList.remove('blink');
      typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 80);
    } else {
      cursor.classList.add('blink');
      textArrayIndex++;
      if (textArrayIndex > textArray.length - 1) {
        textArrayIndex = 0;
      }
      setTimeout(type, 1000);
    }
  }
  
  const type = () => {
    if (charIndex <= textArray[textArrayIndex].length - 1) {
      cursor.classList.remove('blink');
      typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 120);
    } else {
      cursor.classList.add('blink');
      setTimeout(erase, 2000);
    }
  }
  
document.addEventListener("DOMContentLoaded", () => {
    type();
  })


animate();


