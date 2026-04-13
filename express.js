import "dotenv/config";
import express from "express";
import gistCard from "./api/gist.js";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";

const app = express();
const router = express.Router();

// Middleware for parsing JSON
app.use(express.json({ limit: "1kb" }));

// Root route with quick API usage info.
app.get("/", (_req, res) => {
  res.status(200).json({
    name: "github-readme-stats",
    endpoints: [
      "/api",
      "/api/pin",
      "/api/top-langs",
      "/api/wakatime",
      "/api/gist",
    ],
  });
});

// API card routes
router.get("/", statsCard);
router.get("/pin", repoCard);
router.get("/top-langs", langCard);
router.get("/wakatime", wakatimeCard);
router.get("/gist", gistCard);

app.use("/api", router);

const port = process.env.PORT || process.env.port || 9000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
