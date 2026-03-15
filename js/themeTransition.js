document.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",function(e){

const url = this.href

if(url){

e.preventDefault()

document.body.classList.add("fade-out")

setTimeout(()=>{

window.location = url

},600)

}

})

})