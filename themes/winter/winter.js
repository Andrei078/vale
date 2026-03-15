const canvas = document.getElementById("background")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight


/* -------------------------
TEXT
------------------------- */

const message =
"❤SPOR LA\nSIMULARE❤"

const lines = message.split("\n")

let textY = canvas.height/2

/* -------------------------
SNOW
------------------------- */

let snowflakes = []

for(let i=0;i<120;i++){

snowflakes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

size:1+Math.random()*4,

speed:0.5+Math.random()*2,

wind:Math.random()*0.5

})

}

/* -------------------------
DRAW
------------------------- */

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

/* SNOW */

ctx.fillStyle="white"

for(let s of snowflakes){

ctx.beginPath()

ctx.arc(s.x,s.y,s.size,0,Math.PI*2)

ctx.fill()

s.y += s.speed
s.x += Math.sin(s.y*0.01)*s.wind

if(s.y>canvas.height){

s.y=0
s.x=Math.random()*canvas.width

}

}

/* TEXT */

ctx.textAlign="center"

ctx.fillStyle="#e6f7ff"

ctx.shadowColor="#ffffff"
ctx.shadowBlur=20

ctx.font="70px serif"

let startY = textY - (lines.length*70)/2

for(let i=0;i<lines.length;i++){

ctx.fillText(lines[i],canvas.width/2,startY+i*80)

}

/* plutire text */

textY += Math.sin(Date.now()*0.001)*0.2

requestAnimationFrame(draw)

}
window.addEventListener("resize",()=>{

canvas.width = window.innerWidth
canvas.height = window.innerHeight

})

draw()