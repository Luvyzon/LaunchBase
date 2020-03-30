const cards = document.querySelectorAll('.card')
console.log('luvison lindao')
for (let card of cards) {
    card.addEventListener('click', function (){
        const receitaId = card.getAttribute('id')

        res.render('recepts', { receitaId })
    })
}
document.onclick( () => console.log('luvison boiolã0'))