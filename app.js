require('dotenv').config()
const express =  require('express')

const mongoose = require('mongoose')

const app = express()


app.use(express.json({ extended: true }))
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    
   if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, PUT, PATCH, POST, DELETE')
        return res.status(200).json({})
   }
   next()
})

app.use('/api/notes', require('./routes/notes.routes'))
app.use('/api/categories', require('./routes/categories.routes'))


const PORT = process.env.PORT 
console.log(PORT)
async function start() {
    try {
      await mongoose.connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
      console.log(e)
      process.exit(1)
    }
  }
  
  start()
  
