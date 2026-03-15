const canvas = document.getElementById("background")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

/* -------------------------
TEXT
------------------------- */

const message =
"Welcome\nTo Space"

const lines = message.split("\n")

let textY = canvas.height/2


/* -------------------------
STARS
------------------------- */

let stars = []

for(let i=0;i<200;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
blink:Math.random()

})

}


/* -------------------------
COMETS
------------------------- */

let comets=[]

function spawnComet(){

comets.push({

x:-100,
y:Math.random()*canvas.height/2,

speed:6+Math.random()*4

})

setTimeout(spawnComet,4000)

}

spawnComet()


/* -------------------------
SOLAR SYSTEM
------------------------- */

const sun = {

x:canvas.width/2,
y:canvas.height/3,
size:30

}

const planets=[

{distance:60,size:5,speed:0.02,color:"#aaa"},
{distance:90,size:7,speed:0.015,color:"#ff9933"},
{distance:120,size:8,speed:0.01,color:"#3399ff"},
{distance:150,size:6,speed:0.008,color:"#ff4444"}

]

let angle=0


/* -------------------------
DRAW
------------------------- */

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)


/* STARS */

for(let s of stars){

ctx.fillStyle="white"

let brightness=Math.sin(Date.now()*0.002+s.blink)*0.5+0.5

ctx.globalAlpha=brightness

ctx.fillRect(s.x,s.y,s.size,s.size)

}

ctx.globalAlpha=1


/* COMETS */

ctx.strokeStyle="white"

for(let i=comets.length-1;i>=0;i--){

let c=comets[i]

ctx.beginPath()
ctx.moveTo(c.x,c.y)
ctx.lineTo(c.x-40,c.y+10)
ctx.stroke()

c.x+=c.speed
c.y+=1

if(c.x>canvas.width+100)
comets.splice(i,1)

}


/* SUN */

ctx.fillStyle="yellow"

ctx.beginPath()
ctx.arc(sun.x,sun.y,sun.size,0,Math.PI*2)
ctx.fill()


/* PLANETS */

angle+=0.01

for(let p of planets){

let px = sun.x + Math.cos(angle*p.speed*50)*p.distance
let py = sun.y + Math.sin(angle*p.speed*50)*p.distance

ctx.fillStyle=p.color

ctx.beginPath()
ctx.arc(px,py,p.size,0,Math.PI*2)
ctx.fill()

}


/* TEXT */

ctx.textAlign="center"

ctx.fillStyle="#88ccff"

ctx.shadowColor="#88ccff"
ctx.shadowBlur=20

ctx.font="70px monospace"

let startY=textY-(lines.length*70)/2

for(let i=0;i<lines.length;i++){

ctx.fillText(lines[i],canvas.width/2,startY+i*80)

}

textY+=Math.sin(Date.now()*0.001)*0.2


requestAnimationFrame(draw)

}

draw()