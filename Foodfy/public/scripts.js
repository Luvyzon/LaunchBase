const cards = document.querySelectorAll('.card')
const hideshow1 = document.querySelector('.recipeshow1')
const hideshow2 = document.querySelector('.recipeshow2')
const hideshow3 = document.querySelector('.recipeshow3')
const content1 = document.querySelector('.recipelist1')
const content2 = document.querySelector('.recipelist2')
const content3 = document.querySelector('.recipelist3')

for (let card of cards) {
  card.addEventListener('click', function () {
    const receitaId = card.getAttribute('id')
    window.location.href = `/recepts?id=${receitaId}`
  })
}
/*
for (let recipe of recipes) {
  recipe.addEventListener('click', function () {
    const recipeIndex= recipe.getAttribute('id')
    window.location.href = `/recepts/${recipeIndex}`
  })
}
*/

hideshow1.addEventListener('click', function () {
  if (hideshow1.textContent == 'MOSTRAR') {
    content1.classList.remove('recipelist1')
    content1.classList.add('recipelist1show')
    hideshow1.innerHTML = 'ESCONDER'
  } else if (hideshow1.textContent == 'ESCONDER') {
    content1.classList.remove('recipelist1show')
    content1.classList.add('recipelist1')
    hideshow1.innerHTML = 'MOSTRAR'
  }
})

hideshow2.addEventListener('click', function() {
  if (hideshow2.textContent == 'MOSTRAR') {
    content2.classList.remove('recipelist2')
    content2.classList.add('recipelist2show')
    hideshow2.innerHTML = 'ESCONDER'
  } else if (hideshow2.textContent == 'ESCONDER') {
    content2.classList.remove('recipelist2show')
    content2.classList.add('recipelist2')
    hideshow2.innerHTML = 'MOSTRAR'
  }
})

hideshow3.addEventListener('click', function() {
  if(hideshow3.textContent == 'MOSTRAR'){
  content3.classList.remove('recipelist3')
  content3.classList.add('recipelist3show')
  hideshow3.innerHTML = 'ESCONDER'
  }
  else if(hideshow3.textContent == 'ESCONDER'){
    
      content3.classList.remove('recipelist3show')
      content3.classList.add('recipelist3')
      hideshow3.innerHTML = 'MOSTRAR'
    }
    
})
