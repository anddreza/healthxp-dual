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
	  RETURNING id
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

	const studentEmail = req.params.email

	const query = 'DELETE FROM students WHERE email = $1;'
	pool.query(query, [studentEmail], function(error, result){
	  if(error){
		return res.status(500).json(error)
	  }
	  res.status(204).end()
	})

}

const insertEnrollByEmail = (req, res) => {

	const {email, plan_id, price} = req.body

	const query = `
	INSERT INTO enrollments(enrollment_code, student_id, plan_id, credit_card, status, price)
	SELECT 
		'XPT0123' as enrollment_code,
		id as student_id, 
		$2 as plan_id,
		'4242' as credit_card,
		true as status,
		$3 as price
	FROM students 
	WHERE email = $1;
	`

	const values = [email, plan_id, price]

	pool.query(query, values, function(error, result){
	  if(error){
		return res.status(500).json(error)
	  }
	  res.status(204).end()
	})	
}

/* const selectStudent = (req, res) => {
	const studentEmail = req.params.email
	
	const query = 'SELECT id FROM students WHERE email = $1;'
	pool.query(query, [studentEmail], function(error, result){
	  if(error){
		return res.status(500).json(error)
	  }
	  res.status(200).json(result.rows[0])
	})
} */

module.exports = {
	deleteAndCreateStudent,
	deleteStudentByEmail,
	insertEnrollByEmail
}