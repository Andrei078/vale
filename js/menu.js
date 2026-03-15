const menuBtn = document.getElementById("menuBtn")
const menu = document.getElementById("menu")
const overlay = document.getElementById("overlay")

menuBtn.onclick = ()=>{

menu.classList.toggle("open")
menuBtn.classList.toggle("open")
overlay.classList.toggle("show")

}

overlay.onclick = ()=>{

menu.classList.remove("open")
menuBtn.classList.remove("open")
overlay.classList.remove("show")

}