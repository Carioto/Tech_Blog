const sequelize = require("../config/connection");
const seedBlog = require("./blogData");
const seedUser = require("./userData");
require("dotenv").config();

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUser();
  await seedBlog();
};

seedAll();
