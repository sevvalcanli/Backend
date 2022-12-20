const Pool = require('pg').Pool
const pool = new Pool({
    host:'psql-mock-database-cloud.postgres.database.azure.com',
    port:5432,
    user:'nyeyxmevfunlxxjepruhlwkw@psql-mock-database-cloud',
    password:'uinfkybkvwvqucrkbtbifdhk',
    database:'booking1671352922926pwhfujnavmcuwzyu',
})


const getUsers = (request, response) => {
    /*DATEADD(day,(SELECT booked_for FROM bookings WHERE ),  (SELECT starts_at FROM bookings)) */
    pool.query('SELECT U.email,U.first_name,U.last_name,U.phone,A.name,A.address,A.zip_code,A.city,A.country,B.starts_at, B.booked_at, B.confirmed FROM users U, appartments A, bookings B WHERE B.user_id = U.id AND B.apartment_id = A.id  ORDER BY B.id', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT U.first_name,U.last_name,B.starts_at,B.confirmed,A.name FROM users U, appartments A, bookings B WHERE B.user_id = U.id AND B.apartment_id = A.id AND B.id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const {id,user_id, starts_at,booked_at,booked_for,apartment_id,confirmed } = request.body
  /*pool.query('SELECT * FROM bookings ORDER BY id DESC', [id], (error, results) => {
    const id=id+1
  })*/

  pool.query('INSERT INTO bookings (id,user_id, starts_at,booked_at,booked_for,apartment_id,confirmed) VALUES ($1, $2,$3,$4,$5,$6,$7)', [id,user_id, starts_at,booked_at,booked_for,apartment_id,confirmed], (error, results) => {
    if (error) {
      throw error
    }

    response.status(201).send(`User added with ID: ${results.insertId}`)
   
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { user_id, starts_at,booked_at,booked_for,apartment_id,confirmed } = request.body

  pool.query(
    'UPDATE bookings SET user_id = $1, starts_at = $2, booked_at = $3, booked_for = $4,apartment_id=$5,confirmed=$6 WHERE id = $7',
    [ user_id, starts_at,booked_at,booked_for,apartment_id,confirmed, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM bookings WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Book deleted with ID: ${id}`)
  })
}
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }