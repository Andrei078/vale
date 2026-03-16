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
NEBULA
------------------------- */

let nebula = []

for(let i=0;i<5;i++){

nebula.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:300+Math.random()*300,
color:`hsla(${Math.random()*360},70%,60%,0.08)`

})

}


/* -------------------------
STARS
------------------------- */

let stars=[]

for(let i=0;i<300;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
blink:Math.random()*1000

})

}


/* -------------------------
COMETS
------------------------- */

let comets=[]

function spawnComet(){

comets.push({

x:-150,
y:Math.random()*canvas.height/3,
speed:5+Math.random()*5

})

}

setInterval(spawnComet,4000)


/* -------------------------
SOLAR SYSTEM
------------------------- */

let sun={

x:canvas.width/2,
y:canvas.height/3,
size:35

}

const planets=[

{ name:"Mercury", distance:60,size:3,speed:0.04,color:"#bbb", moons:[] },

{ name:"Venus", distance:90,size:5,speed:0.03,color:"#e6c27a", moons:[] },

{ name:"Earth", distance:120,size:6,speed:0.025,color:"#3399ff",
moons:[{distance:12,size:2,speed:0.08,color:"#ccc"}]
},

{ name:"Mars", distance:150,size:5,speed:0.02,color:"#ff5533",
moons:[
{distance:10,size:1.5,speed:0.1,color:"#bbb"},
{distance:14,size:1.2,speed:0.08,color:"#aaa"}
]
},

{ name:"Jupiter", distance:200,size:12,speed:0.015,color:"#d2b48c",
moons:[
{distance:18,size:2,speed:0.09,color:"#eee"},
{distance:22,size:2,speed:0.08,color:"#ddd"},
{distance:26,size:2,speed:0.07,color:"#ccc"},
{distance:30,size:2,speed:0.06,color:"#bbb"}
]
},

{ name:"Saturn", distance:250,size:10,speed:0.012,color:"#f5deb3",
moons:[
{distance:18,size:2,speed:0.07,color:"#ccc"}
]
},

{ name:"Uranus", distance:300,size:8,speed:0.009,color:"#66ffff",
moons:[
{distance:14,size:1.5,speed:0.06,color:"#bbb"}
]
},

{ name:"Neptune", distance:340,size:8,speed:0.008,color:"#3366ff",
moons:[
{distance:14,size:1.5,speed:0.06,color:"#bbb"}
]
}

]

let angle=0


/* -------------------------
DRAW
------------------------- */

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)


/* NEBULA */

for(let n of nebula){

let g=ctx.createRadialGradient(
n.x,n.y,0,
n.x,n.y,n.size
)

g.addColorStop(0,n.color)
g.addColorStop(1,"transparent")

ctx.fillStyle=g

ctx.beginPath()
ctx.arc(n.x,n.y,n.size,0,Math.PI*2)
ctx.fill()

}


/* STARS */

for(let s of stars){

let brightness=Math.sin(Date.now()*0.002+s.blink)*0.5+0.5

ctx.globalAlpha=brightness

ctx.fillStyle="white"
ctx.fillRect(s.x,s.y,s.size,s.size)

}

ctx.globalAlpha=1


/* COMETS */

for(let i=comets.length-1;i>=0;i--){

let c=comets[i]

/* tail */

let gradient = ctx.createLinearGradient(
c.x, c.y,
c.x-120, c.y+40
)

gradient.addColorStop(0,"rgba(255,255,255,1)")
gradient.addColorStop(0.3,"rgba(150,200,255,0.6)")
gradient.addColorStop(1,"rgba(0,0,0,0)")

ctx.strokeStyle = gradient
ctx.lineWidth = 3

ctx.beginPath()
ctx.moveTo(c.x,c.y)
ctx.lineTo(c.x-120,c.y+40)
ctx.stroke()


/* comet core */

ctx.fillStyle="white"

ctx.beginPath()
ctx.arc(c.x,c.y,3,0,Math.PI*2)
ctx.fill()


/* dust particles */

for(let p=0;p<3;p++){

ctx.globalAlpha=Math.random()

ctx.fillStyle="white"

ctx.fillRect(
c.x-20-Math.random()*80,
c.y+Math.random()*20,
1,
1
)

}

ctx.globalAlpha=1


/* movement */

c.x+=c.speed
c.y+=0.8

if(c.x>canvas.width+200){

comets.splice(i,1)

}

}/* COMETS */

for(let i=comets.length-1;i>=0;i--){

let c=comets[i]

/* tail */

let gradient = ctx.createLinearGradient(
c.x, c.y,
c.x-120, c.y+40
)

gradient.addColorStop(0,"rgba(255,255,255,1)")
gradient.addColorStop(0.3,"rgba(150,200,255,0.6)")
gradient.addColorStop(1,"rgba(0,0,0,0)")

ctx.strokeStyle = gradient
ctx.lineWidth = 3

ctx.beginPath()
ctx.moveTo(c.x,c.y)
ctx.lineTo(c.x-120,c.y+40)
ctx.stroke()


/* comet core */

ctx.fillStyle="white"

ctx.beginPath()
ctx.arc(c.x,c.y,3,0,Math.PI*2)
ctx.fill()


/* dust particles */

for(let p=0;p<3;p++){

ctx.globalAlpha=Math.random()

ctx.fillStyle="white"

ctx.fillRect(
c.x-20-Math.random()*80,
c.y+Math.random()*20,
1,
1
)

}

ctx.globalAlpha=1


/* movement */

c.x+=c.speed
c.y+=0.8

if(c.x>canvas.width+200){

comets.splice(i,1)

}

}


/* SUN */

ctx.fillStyle="yellow"

ctx.beginPath()
ctx.arc(sun.x,sun.y,sun.size,0,Math.PI*2)
ctx.fill()


/* PLANETS */

angle+=0.01

for(let p of planets){

let px=sun.x+Math.cos(angle*p.speed*50)*p.distance
let py=sun.y+Math.sin(angle*p.speed*50)*p.distance

ctx.fillStyle=p.color

ctx.beginPath()
ctx.arc(px,py,p.size,0,Math.PI*2)
ctx.fill()


/* MOONS */

for(let m of p.moons){

let mx=px+Math.cos(angle*m.speed*100)*m.distance
let my=py+Math.sin(angle*m.speed*100)*m.distance

ctx.fillStyle=m.color

ctx.beginPath()
ctx.arc(mx,my,m.size,0,Math.PI*2)
ctx.fill()

}

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


/* -------------------------
RESIZE
------------------------- */

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth
canvas.height=window.innerHeight

sun.x=canvas.width/2
sun.y=canvas.height/3

})


draw()