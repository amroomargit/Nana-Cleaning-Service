import dotenv from 'dotenv';
dotenv.config();

// Import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import sql from 'mssql';

// Initialize Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database config
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

// Route
app.post('/submit-form', async (req, res) => {
  const { name, email, phone_number, message } = req.body;

  try {
    // Connect to the database
    await sql.connect(dbConfig);

    // Create a request to interact with the database
    const request = new sql.Request();

    // Call the stored procedure, passing form data as parameters
    await request
      .input('name', sql.NChar(100), name)
      .input('email', sql.NChar(100), email)
      .input('phone_number', sql.NChar(11), phone_number)
      .input('message', sql.NChar(500), message)
      .execute('InsertContactFormData');  // Call the stored procedure

    // Send a success response
    res.send('Form submitted successfully!');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Error inserting data');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
