const { User } = require('../models');

const userData = [
  {
    id: '1',
    username: 'PieInTheFace',
    email: 'pieintheface@outlook.com',
    password: 'chickensoup',
  },
];
const seedUser = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUser;
