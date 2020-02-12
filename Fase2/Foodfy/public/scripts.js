const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll(".card")
const modal = document.querySelector(".modal-content")


for(let card of cards){
    card.addEventListener("click", function(){
        const receitaId = card.getAttribute("id")

      

        modalOverlay.classList.add('active')
        modal.classList.add('active')
        
        
        modal.querySelector("img").src = `images/${receitaId}.png`;
        
       
    })
}

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove('active')
    modal.classList.remove('active')
    modal.querySelector("img").src = ""
})
