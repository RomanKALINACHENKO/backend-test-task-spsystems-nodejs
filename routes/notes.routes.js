const {Router} = require('express')
const Note = require('../models/Models.Note')
const Category = require('../models/Models.Category')
const router = Router()

router.get('/:categories', async (req, res) => {
    try {
      const  routeCategory = req.params.categories
      console.log(`routeCategory in /:categories = `)
      console.log(routeCategory)
      if(routeCategory === 'all'){
        const notes = await Note.find()
      const categories =await Category.find()
      const sortedNotes = notes.sort((a,b) =>{
        const A = new Date(a.relevance).getTime()
        const B = new Date(b.relevance).getTime()
        return A - B
      })

        res.header({'Content-Type':'application/json'}).status(200).json({'notes':sortedNotes,'categories':categories})
     
      }else{
        const notes = await Note.find({'category':routeCategory})
        const categories =await Category.find()
        const sortedNotes = notes.sort((a,b) =>{
          const A = new Date(a.relevance).getTime()
          const B = new Date(b.relevance).getTime()
          
          return A - B
        })
          res.header({'Content-Type':'application/json'}).status(200).json({'notes':sortedNotes,'categories':categories})
       
      }
      
      
    
    } catch (e) {
        res.status(500).json(
          { message: 'Что-то пошло не так, попробуйте снова'}
      )
    }
  })


  router.post('/createnote', async (req, res) => {
    try {
      const {body} = req
      console.log(`body in /createnote`)
      console.log(body)
      const note = new Note({ name: body.name,
                              description: body.description,
                              relevance: body.relevance,
                              category: body.category })
    await note.save()
      
    res.header({'Content-Type':'application/json'}).status(201).json(note)
    
    } catch (e) {
        res.status(500).json(  
          { message: 'Что-то пошло не так, попробуйте снова'}
      )
    }
  })

  router.put('/updatenote', async (req, res) => {
    try {
      const {body} = req
      const validateData= {
        '_id': body._id,
        'name': body.name,
        'description': body.description,
        'relevance': body.relevance
         }
         const note =await Note.findById(validateData._id,(err)=>{
          if(err){res.header({'Content-Type':'application/json'}).json({message:'Юзер не найден'})}
        })

        for (let key in validateData){
          note[key] = validateData[key]
        }

    await note.save()

    res.header({'Content-Type':'application/json'}).status(201).json(note)
    
    } catch (e) {
        res.status(500).json(  
          // e.message 
          { message: 'Что-то пошло не так, попробуйте снова'}
      )
    }
  })

  router.delete('/deletenote', async (req, res) => {
    try {
      const {body} = req


      const  check = await Note.findById(body._id)
    if(!check){
      res.header({'Content-Type':'application/json'}).status(201).json({message:'Не найдено!'})
    }
         
    const note =await Note.findByIdAndDelete(body._id)

    res.header({'Content-Type':'application/json'}).status(201).json({message:'Удалено'})
    
    } catch (e) {
        res.status(500).json(  
          // e.message 
          { message: 'Что-то пошло не так, попробуйте снова'}
      )
    }
  })
 
  
  
  module.exports = router
  