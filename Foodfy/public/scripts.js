const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .headerAdmin div:nth-child(2) a.homebuttomAdmin')

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}
