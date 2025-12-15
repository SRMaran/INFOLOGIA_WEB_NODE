
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const fs = require('fs');
const path = require('path');
//router
const router = express.Router();
const db = require("../config/dbconnection");
const CF = require("../middlewares/commonfunction");
const winston = require("../middlewares/logger");
const blog_creation = db.blog_creation;
const blog_description = db.blog_description;
const { storage } = require('../middlewares/storage');

//insert
var upload = multer({ storage: storage }).single('file');

//insert
// router.post("/Post", async (req, res) => {
//   const jsondata = req.body;
//   const uploadedFile = req.files;
//   const date = new Date();
//     const formattedDate = date
//       .toISOString()
//       .slice(0, 19)
//       .replace(/[-T:]/g, "");

//     const logo_file = uploadedFile.fileupload
//       ? `logo_${formattedDate}_${uploadedFile.fileupload.name}`
//       : null;

//     const logo_smallfile = uploadedFile.smallimage
//       ? `logo_${formattedDate}_${uploadedFile.smallimage.name}`
//       : null;
//   try {
  
// const newData = {
//   blogtitle: jsondata.title,
//   blogcreatername: jsondata.creater,
//   Publisheddate: jsondata.date,
//   description: jsondata.Description,
//   status: 0,
//   ispublished: 0,
//   flag: jsondata.flag,
//   keywords: jsondata.keywords,
//   Keydescription: jsondata.Keydescription,
//   Headertitle: jsondata.Headertitle
// };

// if (logo_file) {
//   newData.fileupload = logo_file;
// }

// if (logo_smallfile) {
//   updateData.smallimage = logo_smallfile;
// }
// const newCompany = await blog_creation.create(newData);

  
//     // if (uploadedFile && uploadedFile.fileupload) {
//     //   const file = uploadedFile.fileupload;
//     //  const destination = `C:/inetpub/wwwroot/Infologia/browser/assets/Blog/${logo_file}`;
//     //   fs.mkdirSync(path.dirname(destination), { recursive: true });
//     //   file.mv(destination, (err) => {
//     //     if (err) {
//     //       console.error("❌ File move failed:", err);
//     //       return res.status(500).send(CF.getStandardResponse(500, "File upload failed."));
//     //     }
//     //     console.log(`✅ File saved successfully: ${destination}`);
//     //   });
//     // }
//     //  if (uploadedFile && uploadedFile.smallimage) {
//     //   const file = uploadedFile.smallimage;
//     //   //  const destination = `./public/blog/${logo_file}`;
//     //   const destination = `C:/inetpub/wwwroot/Infologia/browser/assets/Blog/${logo_smallfile}`;
//     //   fs.mkdirSync(path.dirname(destination), { recursive: true });
//     //   file.mv(destination, (err) => {
//     //     if (err) {
//     //       console.error("❌ File move failed:", err);
//     //       return res.status(500).send(CF.getStandardResponse(500, "File upload failed."));
//     //     }
//     //     console.log(`✅ File saved successfully: ${destination}`);
//     //   });
//     // }

//      const basePath = "C:/inetpub/wwwroot/Infologia/assets/Blog/";

//     fs.mkdirSync(basePath, { recursive: true }); // ensure folder exists

//     // Save Main Image
//     if (uploadedFile.fileupload) {
//       const file = uploadedFile.fileupload;
//       const dest = path.join(basePath, logo_file);

//       file.mv(dest, (err) => {
//         if (err) {
//           console.error("❌ Main Image Upload Error:", err);
//         } else {
//           console.log("✅ Main Image Saved:", dest);
//         }
//       });
//     }

//     // Save Small Image
//     if (uploadedFile.smallimage) {
//       const file = uploadedFile.smallimage;
//       const dest = path.join(basePath, logo_smallfile);

//       file.mv(dest, (err) => {
//         if (err) {
//           console.error("❌ Small Image Upload Error:", err);
//         } else {
//           console.log("✅ Small Image Saved:", dest);
//         }
//       });
//     }
      
//     const response = CF.getStandardResponse(201, "Blog created successfully");
//     res.status(201).send(response);

//   } catch (err) {
//     winston.error('postblogcreation: ' + err);
//     const response = CF.getStandardResponse(500, "Something went wrong");
//     res.status(500).send(response);
//   }
// });



router.post("/Post", async (req, res) => {
  try {
    const jsondata = req.body;
    const uploadedFile = req.files || {};  // prevent null crash
    
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19).replace(/[-T:]/g, "");

    const logo_file = uploadedFile.fileupload
      ? `Big_${formattedDate}_${uploadedFile.fileupload.name}`
      : null;

    const logo_smallfile = uploadedFile.smallimage
      ? `small_${formattedDate}_${uploadedFile.smallimage.name}`
      : null;

    const newData = {
      blogtitle: jsondata.title,
      blogcreatername: jsondata.creater,
      Publisheddate: jsondata.date,
      description: jsondata.Description,
      status: 0,
      ispublished: 0,
      flag: jsondata.flag,
      keywords: jsondata.keywords,
      Keydescription: jsondata.Keydescription,
      Headertitle: jsondata.Headertitle
    };

    if (logo_file) newData.fileupload = logo_file;
    if (logo_smallfile) newData.smallimage = logo_smallfile;

    const newCompany = await blog_creation.create(newData);

    const basePath = "C:/inetpub/wwwroot/Infologia/browser/assets/Blog/";
    fs.mkdirSync(basePath, { recursive: true });

    // Save Main Image
    if (uploadedFile.fileupload) {
      const file = uploadedFile.fileupload;
      const dest = path.join(basePath, logo_file);

      file.mv(dest, (err) => {
        if (err) console.error("❌ Main Image Upload Error:", err);
        else console.log("✅ Main Image Saved:", dest);
      });
    }

    // Save Small Image
    if (uploadedFile.smallimage) {
      const file = uploadedFile.smallimage;
      const dest = path.join(basePath, logo_smallfile);

      file.mv(dest, (err) => {
        if (err) console.error("❌ Small Image Upload Error:", err);
        else console.log("✅ Small Image Saved:", dest);
      });
    }

    res.status(201).send(CF.getStandardResponse(201, "Blog created successfully"));

  } catch (err) {
    winston.error('postblogcreation: ' + err);
    res.status(500).send(CF.getStandardResponse(500, "Something went wrong"));
  }
});



router.put("/Update/:id", async (req, res) => {
  const blogId = req.params.id;
  const uploadedFile = req.files || {};  // prevent null crash
  const jsondata = req.body;

  console.log(jsondata);
   const date = new Date();
        const formattedDate = date.toISOString().slice(0, 19).replace(/[-T:]/g, '');
        const logo_file = uploadedFile && uploadedFile.fileupload ? `Big_${formattedDate}_${uploadedFile.fileupload.name}` : null;
        const logo_smallfile = uploadedFile && uploadedFile.smallimage ? `small_${formattedDate}_${uploadedFile.smallimage.name}` : null;
 
  let fileNameToSave = null;
  try {
    
const updateData = {
  blogtitle: jsondata.title,
  blogcreatername: jsondata.creater,
  Publisheddate: jsondata.date,
  description: jsondata.Description,
  flag: jsondata.flag,
  keywords: jsondata.keywords,
  Keydescription: jsondata.Keydescription,
    Headertitle: jsondata.Headertitle
};

if (logo_file) {
  updateData.fileupload = logo_file;
}

if (logo_smallfile) {
  updateData.smallimage = logo_smallfile;
}
    const [updated] = await blog_creation.update(updateData, {
      where: { bd_id: blogId }
    });


     if (!updated) {
      return res.status(404).send(CF.getStandardResponse(404, "Blog not found"));
    }

     const basePath = "C:/inetpub/wwwroot/Infologia/browser/assets/Blog/";

    fs.mkdirSync(basePath, { recursive: true }); // ensure folder exists

    // Save Main Image
    if (uploadedFile.fileupload) {
      const file = uploadedFile.fileupload;
      const dest = path.join(basePath, logo_file);

      file.mv(dest, (err) => {
        if (err) {
          console.error("❌ Main Image Upload Error:", err);
        } else {
          console.log("✅ Main Image Saved:", dest);
        }
      });
    }

    // Save Small Image
    if (uploadedFile.smallimage) {
      const file = uploadedFile.smallimage;
      const dest = path.join(basePath, logo_smallfile);

      file.mv(dest, (err) => {
        if (err) {
          console.error("❌ Small Image Upload Error:", err);
        } else {
          console.log("✅ Small Image Saved:", dest);
        }
      });
    }

    const response = CF.getStandardResponse(200, "Blog updated successfully");
    res.status(200).send(response);
  } catch (err) {
    winston.error('putBlogUpdate: ' + err);
    const response = CF.getStandardResponse(500, "Something went wrong");
    res.status(500).send(response);
  }
});
//grid
router.get("/", async (req, res) => {
  db.sequelize.query(
    "select *,dbo.fn_Slug(blogtitle) AS Header from blog_creation",
    { replacements: ["active"], type: db.Sequelize.QueryTypes.SELECT }
  )
    .then((data) => {
      res.status(200).send({
        response_code: "200",
        response_message: "success",
        data,
      });
      winston.info(" Blog fetched successfully");
    })
    .catch((error) => {
      console.error("Error fetching Blog details:", error);
      res.status(500).send({
        response_code: "500",
        response_message: "Internal Server Error",
      });
    });
});
router.get('/data/:id', async (req, res) => {
    const blogId = req.params.id;

    try {
        const sql = 'UPDATE blog_creation SET status = 1 WHERE bd_id = :id';
        const [result] = await db.sequelize.query(sql, {
            replacements: { id: blogId },
            type: db.sequelize.QueryTypes.UPDATE
        });
        res.json({ message: 'Blog approved successfully' });
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ message: 'Database error' });
    }
});
router.get('/publisheddata/:id', async (req, res) => {
    const blogId = req.params.id;

    const today = new Date().toISOString().split('T')[0];
    console.log("Current Date:", today);

    try {
        const sql = `
            UPDATE blog_creation 
            SET status = 1,
                ispublished = 1,
                Publisheddate = :today 
            WHERE bd_id = :id
        `;

        await db.sequelize.query(sql, {
            replacements: { 
                today: today,
                id: blogId 
            },
            type: db.sequelize.QueryTypes.UPDATE
        });

        res.json({ message: 'Blog approved successfully' });
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ message: 'Database error' });
    }
});
//getdata


router.get('/getdata/:id', async (req, res) => {
  const id = req.params.id;

  db.sequelize.query(
    "select * from blog_creation where bd_id='"+id+"'",
    { replacements: ["active"], type: db.Sequelize.QueryTypes.SELECT }
  )
    .then((data) => {
      res.status(200).send({
        response_code: "200",
        response_message: "success",
        data,
      });
      winston.info(" Blog fetched successfully");
    })
    .catch((error) => {
      console.error("Error fetching Blog details:", error);
      res.status(500).send({
        response_code: "500",
        response_message: "Internal Server Error",
      });
    });
});


router.post('/getpost', async function (req, res, next) {
  try {
    const { description } = req.body;
    const Header = description;
    console.log("Header value:", Header);

    const rows = await db.sequelize.query(
      `SELECT * FROM BlogdetailsInformation WHERE Header = :Header`,
      {
        replacements: { Header },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    const data = rows.map(row => ({
      Id: row.Id
    }));

    res.status(200).send({
      response_code: "200",
      response_message: "success",
      data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

//blog page



router.get("/get", async (req, res) => {
  try {
    const rows = await db.sequelize.query(
      `
     SELECT 
        dbo.fn_Slug(bc.blogtitle) AS Header,
        bc.bd_id AS Id,
        bc.blogtitle AS Title,
        bc.blogcreatername AS Name,
        bc.Publisheddate AS PublishDate,
        bc.description AS Content,
        bc.smallimage AS ImagePath
      FROM blog_creation bc
      WHERE bc.status = 1 and flag=1 and ispublished = 1
      ORDER BY bc.Publisheddate DESC
      `,
      { type: db.Sequelize.QueryTypes.SELECT }
    );

    const data = rows.map(row => ({
      Id: row.Id,
      Title: row.Title,
      Name: row.Name,
      PublishDate: row.PublishDate,
      Content: row.Content,
      Images: row.ImagePath,
      Header: row.Header
    }));

    res.status(200).send({
      response_code: "200",
      response_message: "success",
      data,
    });

  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({
      response_code: "500",
      response_message: "Internal Server Error",
    });
  }
});
router.get("/getflyer", async (req, res) => {
  try {
    const rows = await db.sequelize.query(
      `
     SELECT 
        dbo.fn_Slug(bc.blogtitle) AS Header,
        bc.bd_id AS Id,
        bc.blogtitle AS Title,
        bc.blogcreatername AS Name,
        bc.Publisheddate AS PublishDate,
        bc.description AS Content,
        bc.smallimage AS ImagePath
      FROM blog_creation bc
      WHERE bc.status = 1 and flag=2 and ispublished = 1
      ORDER BY bc.Publisheddate DESC
      `,
      { type: db.Sequelize.QueryTypes.SELECT }
    );

    const data = rows.map(row => ({
      Id: row.Id,
      Title: row.Title,
      Name: row.Name,
      PublishDate: row.PublishDate,
      Content: row.Content,
      Images: row.ImagePath,
      Header: row.Header
    }));

    res.status(200).send({
      response_code: "200",
      response_message: "success",
      data,
    });

  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({
      response_code: "500",
      response_message: "Internal Server Error",
    });
  }
});
router.get("/getcase", async (req, res) => {
  try {
    const rows = await db.sequelize.query(
      `
     SELECT 
        dbo.fn_Slug(bc.blogtitle) AS Header,
        bc.bd_id AS Id,
        bc.blogtitle AS Title,
        bc.blogcreatername AS Name,
        bc.Publisheddate AS PublishDate,
        bc.description AS Content,
        bc.smallimage AS ImagePath
      FROM blog_creation bc
      WHERE bc.status = 1 and flag=3 and ispublished = 1
      ORDER BY bc.Publisheddate DESC
      `,
      { type: db.Sequelize.QueryTypes.SELECT }
    );

    const data = rows.map(row => ({
      Id: row.Id,
      Title: row.Title,
      Name: row.Name,
      PublishDate: row.PublishDate,
      Content: row.Content,
      Images: row.ImagePath,
      Header: row.Header
    }));

    res.status(200).send({
      response_code: "200",
      response_message: "success",
      data,
    });

  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({
      response_code: "500",
      response_message: "Internal Server Error",
    });
  }
});


router.get('/getdeatils/:id', async (req, res) => {
  const id = req.params.id;
if (!/^\d+$/.test(id)) {
  // Not a number, skip query
  return res.status(400).json({ message: 'Invalid blog id' });
}
  try {

    const blogDetail = await db.sequelize.query(
      `
      SELECT 
       bc.keywords as keywords,
	     bc.Keydescription as description,
        bc.bd_id AS Id,bc.Headertitle as Headertitle,
        bc.blogtitle AS Title,
        bc.blogcreatername AS Name,
        bc.Publisheddate AS PublishDate,
        bc.fileupload AS ImagePath
      FROM blog_creation bc
      WHERE bc.bd_id = :id
      `,
      {
        replacements: { id },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

   
 const popularPosts = await db.sequelize.query(
  `
  SELECT TOP 3
   dbo.fn_Slug(bc.blogtitle) AS Header,
    bc.bd_id AS Id,
    bc.blogtitle AS Title,
    bc.Publisheddate AS PublishDate,
    bc.fileupload AS ImagePath
  FROM blog_creation bc
  WHERE bc.bd_id != :id and ispublished=1
  ORDER BY bc.Publisheddate DESC
  `,
  { 
    replacements: { id }, 
    type: db.sequelize.QueryTypes.SELECT 
  }
);

 const descriptionPosts = await db.sequelize.query(
  `
  SELECT  description AS Content FROM blog_creation WHERE bd_id =:id
  `,
  { 
    replacements: { id }, 
    type: db.sequelize.QueryTypes.SELECT 
  }
);

console.log(descriptionPosts);
    res.json({
      blogDetail: blogDetail.length > 0 ? blogDetail[0] : null,
      popularPosts,
      descriptionPosts
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});


router.get('/getdeatilsinside/:id', async (req, res) => {
  const id = req.params.id;
if (!/^\d+$/.test(id)) {
  // Not a number, skip query
  return res.status(400).json({ message: 'Invalid blog id' });
}
  try {

    const blogDetail = await db.sequelize.query(
      `
      SELECT 
       bc.keywords as keywords,
	     bc.Keydescription as description,
        bc.bd_id AS Id,bc.Headertitle as Headertitle,
        bc.blogtitle AS Title,
        bc.blogcreatername AS Name,
        bc.Publisheddate AS PublishDate,
        bc.fileupload AS ImagePath
      FROM blog_creation bc
      WHERE bc.bd_id = :id
      `,
      {
        replacements: { id },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

   
 const popularPosts = await db.sequelize.query(
  `
  SELECT TOP 3
    bc.bd_id AS Id,
    bc.blogtitle AS Title,
    bc.Publisheddate AS PublishDate,
    bc.fileupload AS ImagePath
  FROM blog_creation bc
  WHERE bc.bd_id != :id and ispublished=1
  ORDER BY bc.Publisheddate DESC
  `,
  { 
    replacements: { id }, 
    type: db.sequelize.QueryTypes.SELECT 
  }
);

 const descriptionPosts = await db.sequelize.query(
  `
  SELECT  description AS Content FROM blog_creation WHERE bd_id =:id
  `,
  { 
    replacements: { id }, 
    type: db.sequelize.QueryTypes.SELECT 
  }
);

console.log(descriptionPosts);
    res.json({
      blogDetail: blogDetail.length > 0 ? blogDetail[0] : null,
      popularPosts,
      descriptionPosts
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/next-blog/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const nextBlog = await db.sequelize.query(
      `
      SELECT bd_id AS Id, blogtitle AS Title 
      FROM blog_creation 
      WHERE Publisheddate > (SELECT Publisheddate FROM blog_creation WHERE bd_id = :id )
      ORDER BY Publisheddate ASC
      LIMIT 1
      `,
      { replacements: { id }, type: db.sequelize.QueryTypes.SELECT }
    );

    const prevBlog = await db.sequelize.query(
      `
      SELECT bd_id AS Id, blogtitle AS Title 
      FROM blog_creation 
      WHERE Publisheddate < (SELECT Publisheddate FROM blog_creation WHERE bd_id = :id)
      ORDER BY Publisheddate DESC
      LIMIT 1
      `,
      { replacements: { id }, type: db.sequelize.QueryTypes.SELECT}
    );

    res.json({
      nextBlog: nextBlog.length > 0 ? nextBlog[0] : null,
      prevBlog: prevBlog.length > 0 ? prevBlog[0] : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});


router.get('/search', async (req, res) => {
  const searchText = req.query.q || '';

  try {
    const result = await db.sequelize.query(
      `
      SELECT 
        bc.bd_id AS Id,
        bc.blogtitle AS Title,
        bc.Publisheddate AS PublishDate,
        bc.fileupload AS ImagePath
      FROM blog_creation bc
      WHERE bc.blogtitle LIKE :search and ispublished=1
      ORDER BY bc.Publisheddate DESC
      `,
      {
        replacements: { search: `%${searchText}%` },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    res.json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});


module.exports = router;