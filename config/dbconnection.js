const Sequelize = require("sequelize");
const sequelize = new Sequelize("Infologia", "sa", "Data@2023$", {
  dialect: "mssql",
  host: "103.197.121.228",
  dialectOptions: {
    options: {
      encrypt: false,
    },
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.intern = require("../models/applyinternship")(sequelize, Sequelize);
db.applicants = require("../models/applyjob")(sequelize, Sequelize);
db.blog_creation =require("../models/blogcreation")(sequelize, Sequelize);
db.blog_description =require("../models/blogdescription")(sequelize, Sequelize);

module.exports = db;
