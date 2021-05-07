const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  { port: process.env.PGPORT, host: process.env.PGHOST, dialect: "postgres" }
);

const Product = require("./product")(sequelize, DataTypes);
const Review = require("./reviews")(sequelize, DataTypes);

// Module.hasMany(Class);
// Class.belongsTo(Module);

// Class.hasMany(Tutors);
// Tutors.belongsTo(Class);

// Student.hasOne(Address);
// Address.belongsTo(Student);
// Class.belongsToMany(Student, { through: "StudentClass", timestamps: false });
// Student.belongsToMany(Class, { through: "StudentClass", timestamps: false });

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log(e));

module.exports = { sequelize, Product, Review };
