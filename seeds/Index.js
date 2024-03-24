const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
require('dotenv').config();

const seedAll = async () => {
    await sequelize.sync({force:true});
    await seedBlog();
}

seedAll();