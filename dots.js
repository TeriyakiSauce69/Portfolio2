const canvas = document.getElementById('canvas1');

const ctx = canvas.getContext('2d');

const particlesArray = [];

var color_array = ['AliceBlue','AntiqueWhite','Yellow','Gold', 'Purple', 'Green', 'Orange', 'Violet','Tomato', 'SteelBlue','OliveDab', 'Navy'];
var hex_color_array = ["#FF0000", "#FFC000", "#FFFC00", "#FF0000", "#00FFFF", "#FF0000", "#41FDFE", "#FF028D", "#FE0002", "#21FC0D"]

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


console.log(ctx);

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

    if (mouse.x > canvas.width -49 || mouse.x < 49 || mouse.y > canvas.height - 49 || mouse.y < 49){
        console.log('Tried creating bubble outside of bounds.')
    }
    else{
        particlesArray.push(new Particle(mouse.x,mouse.y));
    }
    //particlesArray.push(new Particle(mouse.x,mouse.y));
    //drawCircle();

})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
    // drawCircle();

})

// function drawCircle(){
//     ctx.fillStyle = 'blue';
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 50,0,Math.PI * 2);
//     ctx.fill();
// }

class Particle{
    constructor(x = (Math.random() * (+0.80 - +0.2) + +0.2)* canvas.width, y = ((Math.random() * (+0.80 - +0.2) + +0.2)) * canvas.height){
        // this.x = mouse.x;
        // this.y = mouse.y;

        this.x = x;
        this.y = y;

        // this.size = Math.random() * 5 + 1;
        this.size = 50;

        this.speedX = Math.random() * 3 - 1.5; 
        this.speedY = Math.random() * 3 - 1.5;

        this.color = hex_color_array[Math.floor(Math.random() * hex_color_array.length)];
        //this.color = color_array[Math.floor(Math.random() * color_array.length)]

    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size,0,Math.PI * 2);
        ctx.fill();


    }

}

function init(){
    for (let i = 0; i < 30; i++){
        particlesArray.push(new Particle());
    }
}

init();


function handleParticles(){
    for (let i = 0; i < particlesArray.length; i ++){
        particlesArray[i].update();
        particlesArray[i].draw();

        // if (particlesArray[i].x > canvas.width || particlesArray[i].x < 0 ) {
    

        //     if (particlesArray[i].x > 1){
        //         particlesArray[i].x = -Math.abs(particlesArray[i].x);
        //         particlesArray[i].color = 'pink';
        //     }

        //     if (particlesArray[i].x < 1) {
        //         particlesArray[i].x = Math.abs(particlesArray[i].x);
        //         particlesArray[i].color = 'green';
        //     }
        // }


        // if (particlesArray[i].y > canvas.height - 50 || particlesArray[i].y < 50) {
        //     particlesArray[i].color = 'red'
        //     particlesArray[i].y = -particlesArray[i].y;

        // }
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    handleParticles();



    for (let i = 0; i < particlesArray.length; i ++){


        if (particlesArray[i].x > canvas.width - 49 || particlesArray[i].x < 49 ){
            particlesArray.splice(i, 1);
            continue;

        }

        if (particlesArray[i].y > canvas.height - 49 || particlesArray[i].y < 48 ){
            particlesArray.splice(i, 1);
            continue;

        }
        

        if (particlesArray[i].x > canvas.width - 50 || particlesArray[i].x < 50) {

            particlesArray[i].color = color_array[Math.floor(Math.random() * color_array.length)]

            particlesArray[i].speedX = particlesArray[i].speedX * -1;
    
        }
    


        if (particlesArray[i].y > canvas.height - 50 || particlesArray[i].y < 50) {

            particlesArray[i].color = color_array[Math.floor(Math.random() * color_array.length)]

            particlesArray[i].speedY = particlesArray[i].speedY * -1;
    }

}

    requestAnimationFrame(animate);
}
animate();

