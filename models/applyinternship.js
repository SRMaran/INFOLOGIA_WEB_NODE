const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const intern = sequelize.define(
    "interns_details",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      phno: DataTypes.STRING,
      resume: DataTypes.STRING,
      educationstatus: DataTypes.STRING,
      university_college: DataTypes.STRING,
      currentlocation: DataTypes.STRING,
      highestqualification: DataTypes.STRING,
      passedout: DataTypes.STRING,
      description: DataTypes.STRING,
      modifiedon: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "interns_details",
      timestamps: false,
    },
  );
  return intern;
};
