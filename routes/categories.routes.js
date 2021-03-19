const {Router} = require('express')
const Category = require('../models/Models.Category')

const router = Router()

router.post('/createcategory', async (req, res) => {
  try {
    const {body} = req
    const category = new Category({ name: body.name})
  await category.save()

  res.status(201).json(category)
  
  } catch (e) {
      res.status(500).json(  
        // e.message 
        { message: 'Что-то пошло не так, попробуйте снова'}
    )
  }
})
  
  
  module.exports = router
  