//o codigo que vai fazer o require no express
const express = require('express')

const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({passError: true})

//instancia do express
const app = express()
app.use(express.json())
const db = require('./db')

app.get('/', function (req, res) {
  res.json({ message: 'Hello API Helper'})
})


//modelar o cadastro de alunos 
const studentSchema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		age: Joi.number().required(),
		weight: Joi.number().required(),
		feet_tall: Joi.number().required()
})

app.post('/students', validator.body(studentSchema), db.deleteAndCreateStudent)
app.delete('/students/:email', db.deleteStudentByEmail)
/* app.get('/students/:email', db.selectStudent) */
app.post('/enrolls', db.insertEnrollByEmail)

//https://www.npmjs.com/package/express-joi-validation
app.use((err, req, res, next) => {
	if (err && err.error && err.error.isJoi) {
	  // we had a joi error, let's return a custom 400 json response
	  res.status(400).json({
		type: err.type, // will be "query" here, but could be "headers", "body", or "params"
		message: err.error.toString()
	  });
	} else {
	  // pass on to another error handler
	  next(err);
	}
  });

app.listen(5000)	

//app.post('/students', function(req, res){
	//const student = req.body //corpo da requisição que está sendo enviada
	//console.log(req.body) //API retornando como undefined, por causa disso foi criada o const app = express()
	//res.json('./students', db.deleteAndCreateStudent)
//})