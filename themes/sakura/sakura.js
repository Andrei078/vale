const canvas = document.getElementById("background")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

/* -------------------------
TEXT PLUTITOR
------------------------- */

const message =
"❤SPOR LA\nSIMULARE❤"

const lines = message.split("\n")

let textY = canvas.height/2

/* -------------------------
PETALS
------------------------- */

let petals = []

for(let i=0;i<40;i++){

petals.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

speed:1+Math.random()*2,

size:4+Math.random()*4,

sway:Math.random()*0.02

})

}

/* -------------------------
DRAW
------------------------- */

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

/* PETALS */

ctx.fillStyle="#ffc0cb"

for(let p of petals){

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()

p.y+=p.speed
p.x+=Math.sin(p.y*p.sway)

if(p.y>canvas.height){

p.y=0
p.x=Math.random()*canvas.width

}

}

/* TEXT */

ctx.textAlign="center"

ctx.fillStyle="#ff6fa5"

ctx.shadowColor="#ff6fa5"
ctx.shadowBlur=15

ctx.font="60px serif"

let startY = textY - (lines.length*60)/2

for(let i=0;i<lines.length;i++){

ctx.fillText(lines[i],canvas.width/2,startY+i*70)

}

/* plutire text */

textY += Math.sin(Date.now()*0.001)*0.2

requestAnimationFrame(draw)

}

draw()