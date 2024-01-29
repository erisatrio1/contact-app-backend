import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import HomeRoute from './routes/HomeRoute.js'
import db from './config/Database.js';
dotenv.config()

const app = express();

db

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

// flash configuration
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());


app.use(HomeRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});