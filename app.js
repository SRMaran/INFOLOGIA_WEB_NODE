const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const logger = require("./middlewares/logger");
const compression = require("compression");   // FIXED

const app = express();

// Enable gzip compression
app.use(compression());

// File upload config
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "C:/temp/",   // Create folder & give permission
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://demo.infologia.in",
      "https://infologia.in"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-access-token"]
  })
);

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});


app.use(
  "/blogImages",
  express.static(path.join(__dirname, "public/blog"))
);

// Other static folders
app.use(
  "/blogcreations",
  express.static(path.join(__dirname, "public/blog"))
);
app.use(
  "/bloglist",
  express.static(path.join(__dirname, "public/bloglist"),)
);
// Controllers
app.use("/Email", require("./controller/email"));
app.use("/intern", require("./controller/applyinternship"));
app.use("/internmail", require("./controller/internmail"));
app.use("/applicants", require("./controller/applyjob"));
app.use("/jobmail", require("./controller/jobmail"));
app.use("/Login", require("./controller/Login"));
app.use("/blogcreation", require("./controller/blogcreation"));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome Infologia tool");
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 4020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
