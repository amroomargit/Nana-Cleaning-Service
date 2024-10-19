import express from 'express';
import bodyParser from 'body-parser';
import sql from 'mssql';
import dotenv from 'dotenv';
import cors from 'cors';


import appInsights from 'applicationinsights';

appInsights
  .setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
  .setAutoCollectConsole(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectPerformance(true)
  .start();


dotenv.config();

app.use(cors());
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

app.post('/submit-form', async (req, res) => {
  const { name, email, phone_number, message } = req.body;
  
  try{
    await sql.connect(config);
    const request = new sql.Request();
    await request.query(`INSERT INTO Contacts (Name, Email, PhoneNumber, Message) VALUES ('${name}', '${email}', '${phone_number}', '${message}')`);
    res.send('Form submitted successfully!');
  }
  catch(err){
    console.error(err);
    res.status(500).send('Error saving data to the database.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});