const express = require("express");
const router = express.Router();
const db = require('../config/dbconnection');

router.post("/", function (req, res) {
  const jsondata = req.body;
  const Email = jsondata.emailName;
  const Password = jsondata.Password;

  const query = "SELECT * FROM ILT_Users WHERE ILT_Email = :email AND ILT_Password = :password";

  db.sequelize.query(query, {
    replacements: { email: Email, password: Password },
    type: db.Sequelize.QueryTypes.SELECT
  })
    .then(data => {
      if (data.length > 0) {
        res.status(200).send({
          response_code: 200,
          response_message: "Login success",
          id: data[0].ILT_UserId
        });
      
      } else {
        res.status(401).send({
          response_code: 401,
          response_message: "Invalid email or password"
        });
      }
    })
    .catch(error => {
      console.error("Error fetching Login:", error);
      res.status(500).send({
        response_code: 500,
        response_message: "Internal Server Error"
      });
    });
});
module.exports = router;