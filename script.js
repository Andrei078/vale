const canvas = document.getElementById("matrix")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight


/* -------------------------
SETARE CUVANT FINAL
------------------------- */

const finalWord = "❤ PRIMĂVARĂ FRUMOASĂ❤"


/* -------------------------
CONFIG
------------------------- */

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコ"

const matrixFontSize = 18
const finalFontSize = 90

const columns = Math.floor(canvas.width / matrixFontSize)

const drops = []

for(let i=0;i<columns;i++)
drops[i]=Math.random()*canvas.height


/* -------------------------
LITERE CAPTURATE
------------------------- */

let captured=[]
let phase=1


/* -------------------------
MATRIX BACKGROUND
------------------------- */

function drawMatrix(){

ctx.fillStyle="rgba(0,0,0,0.08)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.font=matrixFontSize+"px monospace"

for(let i=0;i<drops.length;i++){

let char=letters[Math.floor(Math.random()*letters.length)]

let x=i*matrixFontSize
let y=drops[i]

ctx.fillStyle="#00ff99"
ctx.shadowColor="#00ff99"
ctx.shadowBlur=8

ctx.fillText(char,x,y)

drops[i]+=matrixFontSize

if(drops[i]>canvas.height && Math.random()>0.975)
drops[i]=0

}

ctx.shadowBlur=0

}


/* -------------------------
CAPTURE LETTER
------------------------- */

function captureLetter(){

if(captured.length>=finalWord.length){

phase=2
prepareTargets()
return

}

captured.push({

char:finalWord[captured.length],

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

targetX:0,
targetY:0,

size:matrixFontSize   // porneste mic

})

setTimeout(captureLetter,1000)

}


/* -------------------------
CALCUL POZITIE FINAL
------------------------- */

function prepareTargets(){

let totalWidth = finalWord.length*finalFontSize*0.6

let startX = canvas.width/2-totalWidth/2
let y = canvas.height/2

for(let i=0;i<captured.length;i++){

captured[i].targetX=startX+i*(finalFontSize*0.6)
captured[i].targetY=y

}

}


/* -------------------------
DESEN LITERE
------------------------- */

function drawCaptured(){

for(let l of captured){

if(phase===2){

l.x += (l.targetX - l.x)*0.06
l.y += (l.targetY - l.y)*0.06

/* creste marimea */

l.size += (finalFontSize - l.size)*0.05

}

ctx.font=l.size+"px monospace"
ctx.fillStyle="#00ff99"

ctx.fillText(l.char,l.x,l.y)

}

}


/* -------------------------
SNAKE EFFECT
------------------------- */

let wave=0

function snakeEffect(){

if(phase!==2) return

wave+=0.2

ctx.translate(
Math.sin(wave)*2,
Math.cos(wave)*2
)

}


/* -------------------------
ANIMATION LOOP
------------------------- */

function animate(){

ctx.setTransform(1,0,0,1,0,0)

drawMatrix()

snakeEffect()

drawCaptured()

requestAnimationFrame(animate)

}

animate()

setTimeout(captureLetter,1000)

/* -------------------------
FULLSCREEN BUTTON
------------------------- */

const btn = document.getElementById("fullscreenBtn")

btn.addEventListener("click",()=>{

if(!document.fullscreenElement){

document.documentElement.requestFullscreen()

/* rotate mobile */

if(screen.orientation && screen.orientation.lock){

screen.orientation.lock("landscape").catch(()=>{})

}

btn.innerText="EXIT"

}else{

document.exitFullscreen()

if(screen.orientation && screen.orientation.unlock){

screen.orientation.unlock()

}

btn.innerText="FULL"

}

})


/* detect exit fullscreen */

document.addEventListener("fullscreenchange",()=>{

if(!document.fullscreenElement){

btn.innerText="FULL"

}

})