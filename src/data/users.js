const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'JoinQuit',
    email: 'JoinQuit@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jhon Quit',
    email: 'Jhon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: ' User',
    email: 'User@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
module.exports = users
