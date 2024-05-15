import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import CookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import ApiError from './errors/apiError';
import router from './app/routes';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCUGnlIXYN1Ui-kZzXPS7S3ti4XKg7pJ_s");




const app: Application = express();


app.post('api/v1/ask', async (req: Request, res: Response) => {
    try {

      const { inputText } = req.body;
  

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  

      const result = await model.generateContent(inputText);
      const response = await result.response;
      const text = response.text();
  

      res.json({ responseText:  text });
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ error: "An error occurred while generating content" });
    }
  });

app.use(cors());
app.use(CookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




app.use('/api/v1', router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ sucess: false, message: err.message })
    } else {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Something Went Wrong'+ err,
        });
    }
    next();
})

export default app;