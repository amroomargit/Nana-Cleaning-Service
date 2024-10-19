import express from 'express';
import bodyParser from 'body-parser';
import sql from 'mssql';
import dotenv from 'dotenv';
import cors from 'cors';

/*
import appInsights from 'applicationinsights';

appInsights
  .setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
  .setAutoCollectConsole(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectPerformance(true)
  .start();

*/
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
      encrypt: true, 
      trustServerCertificate: true, 
  },
};

app.post('/contact_tab/submit-form', async (req, res) => {
  const { name, email, phone_number, message } = req.body;

  //appInsights.defaultClient.trackEvent({ name: "ContactFormSubmitted", properties: { name, email, phone_number } });
  console.log(`Name: ${name}, Email: ${email}, Phone: ${phone_number}, Message: ${message}`);
  
  try{
    await sql.connect(config);
    const request = new sql.Request();

    const sqlQuery = `INSERT INTO Contacts (Name, Email, PhoneNumber, Message) VALUES (@name, @Email, @PhoneNumber, @Message)`;

    await request
            .input('name', sql.NVarChar, name)
            .input('Email', sql.NVarChar, email)
            .input('PhoneNumber', sql.NVarChar, phone_number)
            .input('Message', sql.NVarChar, message)
            .query(sqlQuery);

    res.send('Form submitted successfully!');
  }
  catch(err){
    //appInsights.defaultClient.trackException({ exception: error });
    console.error(err);
    res.status(500).send('Error saving data to the database.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});