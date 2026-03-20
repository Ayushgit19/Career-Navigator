import express from "express";
import {
  careerChat,
  resumeAnalysis,
  interviewPrep,
  skillGap,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/career-chat", careerChat);
router.post("/resume-analysis", resumeAnalysis);
router.post("/interview-prep", interviewPrep);
router.post("/skill-gap", skillGap);

export default router;