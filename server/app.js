import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import userRouter from './modules/userModules/user.routes.js';
import testRouter from './modules/testModules/test.routes.js';
import companyRouter from './modules/companyModules/company.routes.js';
import statisticsRouter from './modules/statisticsModule/statistics.routes.js';
import questionRouter from './modules/questionModules/question.routes.js';
import answerSetRouter from './modules/answerSetModules/answerSet.routes.js';
import answerRouter from './modules/answerModules/answer.routes.js';
import sectorRouter from './modules/sectorModules/sector.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/test', testRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/question', questionRouter);
app.use('/api/answerSet', answerSetRouter);
app.use('/api/answer', answerRouter);
app.use('/api/sector', sectorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});

export default app;