const buttons = document.querySelectorAll(".themeBtn")

buttons.forEach(btn=>{

const canvas = btn.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = btn.offsetWidth
canvas.height = btn.offsetHeight

let particles=[]
let animationId=null

function startAnimation(){

particles=[]

for(let i=0;i<15;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

speed:0.3+Math.random()*0.5,

size:2+Math.random()*2,

drift:(Math.random()-0.5)*0.5

})

}

animate()

}

function stopAnimation(){

cancelAnimationFrame(animationId)

ctx.clearRect(0,0,canvas.width,canvas.height)

}

btn.addEventListener("mouseenter",startAnimation)
btn.addEventListener("mouseleave",stopAnimation)

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

/* SAKURA */

if(btn.classList.contains("sakura")){

ctx.fillStyle="rgba(255,180,200,0.9)"

particles.forEach(p=>{

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()

p.y+=p.speed
p.x+=p.drift

if(p.y>canvas.height){

p.y=-5
p.x=Math.random()*canvas.width

}

})

}

/* WINTER */

if(btn.classList.contains("winter")){

ctx.fillStyle="white"

particles.forEach(p=>{

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()

p.y+=p.speed*0.7
p.x+=Math.sin(p.y*0.02)*0.2

if(p.y>canvas.height){

p.y=-5
p.x=Math.random()*canvas.width

}

})

}

/* MATRIX */

if(btn.classList.contains("matrix")){

ctx.fillStyle="#00ff88"

particles.forEach(p=>{

ctx.fillRect(p.x,p.y,2,8)

p.y+=p.speed*2

if(p.y>canvas.height){

p.y=-10
p.x=Math.random()*canvas.width

}

})

}

/* SPACE */

if(btn.classList.contains("space")){

ctx.fillStyle="white"

particles.forEach(p=>{

ctx.fillRect(p.x,p.y,2,2)

})

/* soare */

ctx.fillStyle="yellow"

ctx.beginPath()
ctx.arc(canvas.width-12,12,5,0,Math.PI*2)
ctx.fill()

}

animationId=requestAnimationFrame(animate)

}

})