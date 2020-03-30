const cards = document.querySelectorAll('.card')

for (let card of cards) {
  card.addEventListener('click', function () {
    const receitaId = card.getAttribute('id')
    window.location.href = `/recepts?id=${receitaId}`
  })
}
