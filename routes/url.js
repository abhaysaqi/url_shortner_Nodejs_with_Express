import { Router } from "express";
const router = Router();

import { GenerateNewShortUrl, getAnalytics } from "../controllers/url.js";

router.post("/", GenerateNewShortUrl);
router.get("/analytics/:shortId",getAnalytics)
export  {
    router
};
