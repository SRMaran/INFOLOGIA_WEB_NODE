const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const applicants = sequelize.define(
    "applicants",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneno: DataTypes.STRING,
      dateofbirth: DataTypes.STRING,
      gender: DataTypes.STRING,
      currentlocation: DataTypes.STRING,
      preferredlocation: DataTypes.STRING,
      highestqualification: DataTypes.STRING,
      university_college: DataTypes.STRING,
      fieldofstudy: DataTypes.STRING,
      graduationyear: DataTypes.STRING,
      educationstatus: DataTypes.STRING,
      totalyearofexperience: DataTypes.INTEGER,
      current_last_company: DataTypes.STRING,
      jobtitle: DataTypes.STRING,
      employmenttype: DataTypes.STRING,
      startdate: DataTypes.STRING,
      enddate: DataTypes.STRING,
      reasonforleaving: DataTypes.STRING,
      keyskills: DataTypes.STRING,
      certifications: DataTypes.STRING,
      resume: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      portfolio_github: DataTypes.STRING,
      is_declaration_accepted: DataTypes.INTEGER,
      serving_notice_period: DataTypes.INTEGER,
      notice_period: DataTypes.STRING,
      description: DataTypes.STRING,
      modifiedon: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "applicants",
      timestamps: false,
    },
  );
  return applicants;
};
