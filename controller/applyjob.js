const express = require("express");
const router = express.Router();
const db = require("../config/dbconnection");
const path = require("path");
const fs = require("fs");
const CF = require("../middlewares/commonfunction");
const winston = require("../middlewares/logger");
const applicants = db.applicants;

router.post("/Post", async (req, res) => {
  try {
    const uploadedFile = req.files;
    console.log(uploadedFile);
    const jsondata = req.body;
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19).replace(/[-T:]/g, "");
    const file = uploadedFile.resume;
    const otherfiles =
      uploadedFile && uploadedFile.resume
        ? `${formattedDate}_${uploadedFile.resume.name}`
        : null;
    console.log(otherfiles);
    const newFileName = `${formattedDate}_${uploadedFile.resume.name}`;
    const destination = `./public/applicant/${newFileName}`;

    await new Promise((resolve, reject) => {
      file.mv(destination, (err) => {
        if (err) {
          console.error("File move error:", err);
          return reject(
            res
              .status(500)
              .send(CF.getStandardResponse(500, "Failed to save file."))
          );
        }
        console.log(`File ${newFileName} saved successfully.`);
        resolve();
      });
    });

    try {
      jsondata.resume = otherfiles;
      const inserted = await applicants.create(jsondata);
      return res.status(201).send({
        status: 201,
        message: "Intern details created successfully",
        data: inserted,
        resume: otherfiles, 
      });
    } catch (dbError) {
      winston.error("Intern DB Error: " + dbError);
      return res
        .status(500)
        .send(CF.getStandardResponse(500, "DB insert failed"));
    }
  } catch (error) {
    winston.error("Intern Upload Error: " + error);
    return res
      .status(500)
      .send(CF.getStandardResponse(500, "Something went wrong"));
  }
});
router.get('/existsemails/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const sql = `

SELECT 
    CASE 
        WHEN A.LastApplied IS NULL THEN 1
        WHEN DATEDIFF(DAY, A.LastApplied, GETDATE()) >= 30 THEN 1
        ELSE 0
    END AS Status,
     FLOOR(DATEDIFF(SECOND, LastApplied, GETDATE()) / 86400.0) AS DaysCompleted
FROM 
    (SELECT TOP 1 createdon AS LastApplied
     FROM applicants
     WHERE email =:email
     ORDER BY createdon DESC) A
RIGHT JOIN (SELECT 1 AS Dummy) X ON 1=1;
        `;

        const result = await db.sequelize.query(sql, {
            replacements: { email },
            type: db.sequelize.QueryTypes.SELECT
        });

        res.json({
            success: true,
            data: result.length > 0 ? result[0] : null
        });

    } catch (err) {
        console.error('Error checking email:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

router.get('/existsphoneno/:phoneno', async (req, res) => {
    const phoneno = req.params.phoneno;

    try {
        const sql = `
           


SELECT 
    CASE 
        WHEN A.LastApplied IS NULL THEN 1
        WHEN DATEDIFF(DAY, A.LastApplied, GETDATE()) >= 30 THEN 1
        ELSE 0
    END AS Status,
     FLOOR(DATEDIFF(SECOND, LastApplied, GETDATE()) / 86400.0) AS DaysCompleted
FROM 
    (SELECT TOP 1 createdon AS LastApplied
     FROM applicants
     WHERE phoneno =:phoneno
     ORDER BY createdon DESC) A
RIGHT JOIN (SELECT 1 AS Dummy) X ON 1=1;
        `;

        const result = await db.sequelize.query(sql, {
            replacements: { phoneno },
            type: db.sequelize.QueryTypes.SELECT
        });

        res.json({
            success: true,
            data: result.length > 0 ? result[0] : null
        });

    } catch (err) {
        console.error('Error checking phoneno:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

module.exports = router;
