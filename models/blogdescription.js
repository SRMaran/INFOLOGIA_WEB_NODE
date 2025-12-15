const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const blog_description = sequelize.define(
    "blogDescription",
    {
      BD: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bd_id:DataTypes.INTEGER,
      title: DataTypes.STRING,
      blogDescription: DataTypes.STRING,
      imagesfileupload: DataTypes.STRING
    },
    {
      tableName: "blogDescription",
      timestamps: false,
    },
  );
  return blog_description;
};
