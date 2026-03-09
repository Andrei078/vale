const canvas = document.getElementById("matrix")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

/* -------------------------
SETARE TEXT FINAL
------------------------- */

const finalWord = "❤ PRIMĂVARĂ\nFRUMOASĂ❤"  // Text pe mai multe rânduri

/* -------------------------
CONFIG MATRIX
------------------------- */

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコ"

const matrixFontSize = 18      // litere fundal
const finalFontSize = 90       // litere finale mari

const columns = Math.floor(canvas.width / matrixFontSize)

const drops = []

for(let i=0;i<columns;i++)
    drops[i]=Math.random()*canvas.height

/* -------------------------
LITERE CAPTURATE
------------------------- */

const cleanText = finalWord.replace(/\n/g,"")  // text fără linii noi
let captured=[]
let phase=1

/* -------------------------
DESEN MATRIX FUNDAL
------------------------- */

function drawMatrix(){

    ctx.fillStyle="rgba(0,0,0,0.08)"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    ctx.font = matrixFontSize+"px monospace"

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
CAPTUREAZA LITERA ALEATOR
------------------------- */

function captureLetter(){

    if(captured.length >= cleanText.length){
        phase=2
        prepareTargets()
        return
    }

    captured.push({
        char: cleanText[captured.length],
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: matrixFontSize,
        targetX:0,
        targetY:0
    })

    setTimeout(captureLetter, 1000)  // 1 secunda intre litere
}

/* -------------------------
CALCUL POZITII TEXT FINAL
------------------------- */

function prepareTargets(){

    const lines = finalWord.split("\n")
    let startY = canvas.height/2 - ((lines.length-1) * finalFontSize * 1.2)/2
    let index = 0

    for(let row=0; row<lines.length; row++){
        let line = lines[row]
        let lineWidth = line.length * finalFontSize * 0.6
        let centerX = canvas.width/2
        let startX = centerX - lineWidth / 2

        for(let col=0; col<line.length; col++){
            if(!captured[index]) continue
            captured[index].targetX = startX + col * (finalFontSize * 0.6)
            captured[index].targetY = startY + row * (finalFontSize * 1.2)
            index++
        }
    }
}

/* -------------------------
DESEN LITERE CAPTURATE
------------------------- */

function drawCaptured(){

    for(let l of captured){

        if(phase===2){
            // deplasare spre centru
            l.x += (l.targetX - l.x)*0.06
            l.y += (l.targetY - l.y)*0.06

            // marime crescatoare
            l.size += (finalFontSize - l.size)*0.05
        }

        ctx.font = l.size+"px monospace"
        ctx.fillStyle="#00ff00"
        ctx.fillText(l.char, l.x, l.y)
    }
}

/* -------------------------
Efect Snake (tremurat)
------------------------- */

let wave=0
function snakeEffect(){
    if(phase!==2) return
    wave+=0.2
    ctx.translate(Math.sin(wave)*2, Math.cos(wave)*2)
}

/* -------------------------
ANIMATIE PRINCIPALA
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

