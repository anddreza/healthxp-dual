require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT
})

const deleteAndCreateStudent = (req, res) => {

	const student = req.body

	const queryDelete = `
	DELETE FROM students WHERE email = $1;
	`

	const queryInsert = `
	  INSERT INTO students(name, email, age, weight, feet_tall) 
	  VALUES ($1, $2, $3, $4, $5)
	  RETURNING id as student_id;
	`
	const values = [
		student.name, student.email, student.age, student.weight, student.feet_tall
	]

	pool.query(queryDelete, [student.email], function (error, result) {
		if (error) {
			return res.status(500).json(error)
		}

		pool.query(queryInsert, values, function (error, result) {
			if (error) {
				return res.status(500).json(error)
			}
			res.status(201).json({ student_id: result.rows[0].student_id })
		})
	})
}

const deleteStudentByEmail = (req, res) => {

	const studentEmail = req.params.email

	const query = 'DELETE FROM students WHERE email = $1;'
	pool.query(query, [studentEmail], function (error, result) {
		if (error) {
			return res.status(500).json(error)
		}
		res.status(204).end()
	})

}

const insertEnrollByEmail = (req, res) => {

	const { email, plan_id, price } = req.body

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

	pool.query(query, values, function (error, result) {
		if (error) {
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