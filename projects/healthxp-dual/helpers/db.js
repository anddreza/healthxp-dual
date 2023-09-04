const { Pool } = require('pg')

const pool = new Pool({
	host: 'babar.db.elephantsql.com',
	user: 'sqlgdrtq',
	password: 'CPA61raaDqbG4pAJuVtrvvXdKJ9w55fG',
	database: 'sqlgdrtq',
	port: 5432
})

const deleteAndCreateStudent = (req, res) => {
	const student = req.body 
	const query = `
	WITH add AS(
	  INSERT INTO students(name, email, age, weight, feet_tall) VALUES ($1, $2, $3, $4, $5)
	)
	DELETE FROM students WHERE email = $2;
	`

	const values = [
		student.name, student.email, student.age, student.weight, student.feet_tall
	]
	pool.query(query, values, function (error, result) {
		if (error) {
			return res.status(500).json(error)
		}
		res.status(201).json(result)
	})
}

const deleteStudentByEmail = (req, res) => {

	const email = req.params.email

	const query = 'DELETE FROM students WHERE email = $1;'
	pool.query(query, [studentEmail], function(error, result){
	  if(error){
		return res.status(500).json(error)
	  }
	  res.status(204).end()
	})

}

module.exports = {
	deleteAndCreateStudent,
	deleteStudentByEmail
}