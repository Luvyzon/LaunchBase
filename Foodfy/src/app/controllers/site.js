const Recipe = require('../models/recipe.js')
const Chef = require('../models/chef')
const Site = require('../models/initial.js')
const File = require('../models/file')

module.exports = {
  index (req, res) {
    return res.render('site/index.njk')
  },
  about (req, res) {
    return res.render('site/about.njk')
  },
  async recipes (req, res) {
    let { filter } = req.query
    if (filter) {
      try {
        const results = await Site.allRecipes(filter)
        const recipes = results.rows
        /* eslint-disable */
        async function getImage(recipeId) {
          let results = await Recipe.files(recipeId)
          let file = results.rows[0]
          return `${req.protocol}://${req.headers.host}/${file.path}`
        }
        /* eslint-enable */
        const recipesPromise = recipes.map(async recipe => {
          recipe.image = await getImage(recipe.id)
          return recipe
        })
        const allRecipes = await Promise.all(recipesPromise)

        return res.render('site/recipes', { recipes: allRecipes })

      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const results = await Recipe.all()
        const recipes = results.rows

        /* eslint-disable */
        async function getImage(recipeId) {
          let results = await Recipe.files(recipeId)
          let file = results.rows[0]
          return `${req.protocol}://${req.headers.host}/${file.path}`
        }
        /* eslint-enable */
        const recipesPromise = recipes.map(async recipe => {
          recipe.image = await getImage(recipe.id)
          return recipe
        })
        const allRecipes = await Promise.all(recipesPromise)

        return res.render('site/recipes', { recipes: allRecipes })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async chefs (req, res) {
    let results = await Site.allChefs()
    const chefs = results.rows
    
    /* eslint-disable */
    async function getImage(chefId) {
      let results = await Chef.files(chefId)
      let file = results.rows[0]
      return `${req.protocol}://${req.headers.host}/${file.path}`
    }
    /* eslint-enable */
    const chefsPromise = chefs.map(async chef => {
      chef.image = await getImage(chef.id)
      return chef
    })
    const allChefs = await Promise.all(chefsPromise)

    return res.render('site/chefs.njk', { chefs, file: allChefs })
  },
  async RecipeShow (req, res) {
    let results = await Recipe.findByID(req.params.id)
    const recipe = results.rows[0]
    recipe.ingredients.pop()
    recipe.preparation.pop()

    results = await Recipe.findChefRecipe(req.params.id)
    const chef = results.rows[0]

    results = await Recipe.files(recipe.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}/${file.path}`
    }))
    console.log(files)
    return res.render('site/show', { recipe, chef, files })
  }
}
