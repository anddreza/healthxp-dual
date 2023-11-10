//o codigo que vai fazer o require no express
const express = require('express')
//instancia do express
const app = express()

app.use(express.json())

const db = require('./db')

app.get('/', function (req, res) {
  res.json({ message: 'Hello API Helper'})
})

app.post('/students', db.deleteAndCreateStudent)
app.delete('/students/:email', db.deleteStudentByEmail)
/* app.get('/students/:email', db.selectStudent) */
app.post('/enrolls', db.insertEnrollByEmail)

app.listen(5000)	

//app.post('/students', function(req, res){
	//const student = req.body //corpo da requisição que está sendo enviada
	//console.log(req.body) //API retornando como undefined, por causa disso foi criada o const app = express()
	//res.json('./students', db.deleteAndCreateStudent)
//})