const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const blog_creation = sequelize.define(
    "blog_creation",
    {
      bd_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      blogtitle: DataTypes.STRING,
      blogcreatername: DataTypes.STRING,
      Publisheddate: DataTypes.STRING,
      fileupload: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.INTEGER,
      ispublished: DataTypes.INTEGER,
      flag: DataTypes.INTEGER,
  keywords: DataTypes.STRING,
  Keydescription: DataTypes.STRING,
  smallimage: DataTypes.STRING,
  Headertitle: DataTypes.STRING,

      modifiedon: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "blog_creation",
      timestamps: false,
    },
  );
  return blog_creation;
};
