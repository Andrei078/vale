const canvas = document.getElementById("background")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight


/* IMAGINI PETALE */

const petalImages = []

const img1 = new Image()
img1.src = "assets/images/sakura/sakura1.png"

const img2 = new Image()
img2.src = "assets/images/sakura/sakura2.png"

petalImages.push(img1,img2)


/* TEXT */

const message =
"❤SPOR LA\nSIMULARE❤"

const lines = message.split("\n")

let textY = canvas.height/2


/* PETALS */

let petals=[]

for(let i=0;i<40;i++){

petals.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

speed:0.5+Math.random()*1,

size:20+Math.random()*20,

rotation:Math.random()*360,

rotSpeed:(Math.random()-0.5)*0.02,

drift:(Math.random()-0.5)*0.5,

img:petalImages[Math.floor(Math.random()*petalImages.length)]

})

}


/* DRAW */

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)


/* PETALS */

petals.forEach(p=>{

ctx.save()

ctx.translate(p.x,p.y)

ctx.rotate(p.rotation)

ctx.drawImage(p.img,-p.size/2,-p.size/2,p.size,p.size)

ctx.restore()

p.y+=p.speed
p.x+=p.drift
p.rotation+=p.rotSpeed


if(p.y>canvas.height+20){

p.y=-20
p.x=Math.random()*canvas.width

}

})


/* TEXT */

ctx.textAlign="center"

ctx.fillStyle="#ff6fa5"

ctx.shadowColor="#ff6fa5"
ctx.shadowBlur=15

ctx.font="70px serif"

let startY = textY - (lines.length*70)/2

for(let i=0;i<lines.length;i++){

ctx.fillText(lines[i],canvas.width/2,startY+i*80)

}

textY += Math.sin(Date.now()*0.001)*0.2


requestAnimationFrame(draw)

}
window.addEventListener("resize",()=>{

canvas.width = window.innerWidth
canvas.height = window.innerHeight

})

draw()
