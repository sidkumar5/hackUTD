/* istanbul ignore file */
import express from 'express';
import cors from 'cors';
import { env } from './env';
import { logger } from './logger';
import { flights } from './api/flights';
import { airportRouter } from './api/airports';
import fetch from "node-fetch";
import { json } from 'stream/consumers';

const port = env.port || '4000';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/flights?date=2020-01-01', (req, res) => {  
  
});


// fetch('http://localhost:4000/flights?date=2020-01-01')
//   .then(res => {
//     if (res.status >= 400) {
//       throw new Error("Bad response from server");
//     }
//     return res.json();
//   })
//   .then(user => {
//     console.log(user);
//   })
//   .catch(err => {
//     console.error(err);
//   });


// async function funcName(){
//   const response = await fetch('http://localhost:4000/flights?date=2020-01-01');
//   var data = await response.json();
// }

// funcName()

app.use('/flights', flights);

app.use('/airports', airportRouter);


app.listen(port, () => {
  logger.notice(`🚀 Listening at http://localhost:${port}`);
});
