const { countTotalRecipes } = require("../src/app/models/chef")

const currentPage = location.pathname
const menuItems = document.querySelectorAll('.headerAdmin a')

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}
