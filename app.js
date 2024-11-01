import express from 'express';
import bodyParser from 'body-parser';
import sql from 'mssql';
import dotenv from 'dotenv';
import cors from 'cors';

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

  // Validate input fields
  try {
    if (!name || !email || !phone_number || !message) {
      return res.status(400).send('All fields are required.');
    }
  } catch (err) {
    console.error('Error in input validation:', err);
    return res.status(400).send('Error validating input.');
  }

  // Basic validation for email format
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send('Invalid email format.');
    }
  } catch (err) {
    console.error('Error validating email format:', err);
    return res.status(400).send('Error validating email.');
  }

  // Log the received data for debugging purposes
  try {
    console.log(`Received - Name: ${name}, Email: ${email}, Phone: ${phone_number}, Message: ${message}`);
  } catch (err) {
    console.error('Error logging received data:', err);
  }
  
  try {
    await sql.connect(config);
  } catch (err) {
    console.error('Database connection error:', err);
    return res.status(500).send('Error connecting to the database.');
  }

  const request = new sql.Request();
  const sqlQuery = `INSERT INTO Contacts (Name, Email, PhoneNumber, Message) VALUES (@name, @Email, @PhoneNumber, @Message)`;

  try {
    await request
      .input('name', sql.NVarChar, name)
      .input('Email', sql.NVarChar, email)
      .input('PhoneNumber', sql.NVarChar, phone_number)
      .input('Message', sql.NVarChar, message)
      .query(sqlQuery);
  } catch (err) {
    console.error('Database query error:', err);
    return res.status(500).send('Error saving data to the database. Please try again later.');
  }

  try {
    res.send('Form submitted successfully!');
  } catch (err) {
    console.error('Error sending response:', err);
    return res.status(500).send('Error sending response.');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).send('An unexpected error occurred. Please try again later.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
