const db = require('../models/models')

const controller = {}

// Get data from the database:
controller.getData = (req, res, next) => {
  const { category } = req.params;

  // SQL query string to return all hacks in database:
  const allHackQuery = `SELECT h.content, h.likes, h.dislikes, u.displayname, c.name AS category 
  FROM hacks h INNER JOIN users u 
  ON u._id = h.user_id
  INNER JOIN categories c
  ON c._id = h.category_id;`

  // SQL query string to return all categories in database:
  const categoryQuery = `SELECT h._id, h.content, h.likes, h.dislikes, u.displayname, c.name AS category 
  FROM hacks h INNER JOIN users u 
  ON u._id = h.user_id
  INNER JOIN categories c
  ON c._id = h.category_id
  WHERE c.name = '${category}';`

  db.query(categoryQuery)
    .then(data => {
      const { rows } = data
      console.log('apiController: getData: From Database: ', rows)
      res.locals.data = rows
      return next()
    })
}

// Post a new hack to the database:

controller.makeHack = (req, res, next) => {
  const { category, content, displayname } = req.body;

  const postHack = 
    `INSERT INTO hacks (content, likes, dislikes, user_id, category_id) 
     VALUES ('${content}', 0,0, (SELECT _id FROM users WHERE displayname = '${displayname}'), 
     (SELECT _id FROM categories WHERE name = '${category}'));`

  db.query(postHack)
    .then(data => {
      const { rows } = data;
      // console.log('HACK From Database: ', rows);
      res.locals.data = rows;
      return next();
    })
}

// Post a new user to the database:
controller.makeUser = (req, res, next) => {
  const { username, password } = req.body;

  // A SELECT query is required after the INSERT query to actually return the new user
  const postUser = `INSERT INTO users (username, password, displayname) VALUES ('${username}', '${password}', '${username}');
  SELECT * FROM users WHERE username = '${username}';`
  db.query(postUser)
    .then(data => {
      // console.log('apiController: makeUser: data in makeUser', data);
      const { rows } = data[1];
      // console.log('apiController: makeUser: rows From Database: ', rows);
      res.locals.data = rows;
      return next();
    })
    .catch(err => next({
      log: 'apiController: makeUser: Express error handler caught error in makeUser controller middleware',
      status: 400,
      message: { 'Failed to sign up with given credentials': err }
    }));
}

controller.getUser = (req, res, next) => {
  const { username, password } = req.body;
  
  const getUserQuery =  `SELECT username, password, displayname FROM users WHERE username = '${username}' AND password = '${password}';`;
  db.query(getUserQuery)
    .then(data => {
      // console.log('apiController -> getUser -> Data: ', data)
      const { rows } = data;
      // console.log('apiController -> getUser -> rows:', rows);
      res.locals.data = rows;
      return next();
    })
    .catch(err => next({
      log: 'apiController: getUser: Express error handler caught error in getUser controller middleware',
      status: 400,
      message: { 'Failed to log in with given credentials': err }
    }));
   
}


// controller.changeDisplayName = (req, res, next) => {
//   const {newUsername} = req.body;
//   const {id} = req.body;
//   // console.log('reqbody', req.body)
//   // A SELECT query is required after the INSERT query to actually return the new user
//   const postUser = `UPDATE users SET displayname = '${newUsername}' WHERE _id = ${id};
//   SELECT * FROM users WHERE _id = ${id};`
//   db.query(postUser)
//     .then(data => {
//       // console.log('data in makeUser', data)
//       const { rows } = data[1]
//       // console.log('From Database: ', rows)
//       res.locals.data = rows
//       return next()
//     })

  
// }

// ===== WORK IN PROGRESS ========== WORK IN PROGRESS ========== WORK IN PROGRESS ========== WORK IN PROGRESS =====
controller.updateLikes = (req, res, next) => {

  const { likes, _id } = req.body;
  console.log('THIS IS REQ.BODY!!!', req.body);

  const updateLikesQuery = `UPDATE hacks SET likes = ${likes} + 1 WHERE _id = ${_id};
  SELECT likes FROM hacks WHERE _id = ${_id}`;
  
  db.query(updateLikesQuery)
  .then(data => {
    res.locals.data = data;
    console.log('apiController -> updateLikes -> db query: ', data);
    return next();
  })
  .catch(err => next({
    log: 'apiController: Express error handler caught error in updateLikes controller middleware',
    status: 400,
    message: { 'Failed to update like button': err }
  }));

};
// ===== WORK IN PROGRESS ========== WORK IN PROGRESS ========== WORK IN PROGRESS ========== WORK IN PROGRESS =====

controller.updateDislikes = (req, res, next) => {

  const { dislikes, _id } = req.body;
  console.log('THIS IS REQ.BODY!!!', req.body);

  const updateDislikesQuery = `UPDATE hacks SET dislikes = ${dislikes} + 1 WHERE _id = ${_id};
  SELECT dislikes FROM hacks WHERE _id = ${_id}`;
  
  db.query(updateDislikesQuery)
  .then(data => {
    res.locals.data = data;
    console.log('apiController -> updateDislikes -> db query: ', data);
    return next();
  })
  .catch(err => next({
    log: 'apiController: Express error handler caught error in updateDislikes controller middleware',
    status: 400,
    message: { 'Failed to update dislike button': err }
  }));

};


module.exports = controller

