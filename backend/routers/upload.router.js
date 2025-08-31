import express from "express";
import { uploadFile } from "../controllers/uploadController.js";

const uploadRouter=express.Router();

uploadRouter.post('/', uploadFile)

export default uploadRouter;