import express from "express";
import { uploadFile } from "../controllers/uploadController.js";

const uploadRouter=express.Router();

uploadRouter.post('/upload', uploadFile)

export default uploadRouter;