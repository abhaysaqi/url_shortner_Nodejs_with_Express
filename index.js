import express from "express";
import { router } from "./routes/url.js";
import { ConnectMongoDB } from "./connection/index.js";
import { URL } from "./models/url.js";

const app = express();
const port = 3333;

// CONNECTION
ConnectMongoDB("mongodb://127.0.0.1:27017/Url_Shortner").then(() =>
  console.log("MongoDB connected")
);

// Set EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// MIDDLEWARE
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/url", router);

app.get("/test", (req, res) => {
  const urls= URL.find();
  res.render("home",{
    urls:urls,
  });
});
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});
app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}! you can access it at http://localhost:${port}`
  )
);
