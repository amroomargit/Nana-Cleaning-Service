const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const sql = require('mssql');

//SQL Database configuration
const sqlConfig = {
    user: 'aomar58@uwo.ca',
    password: 'MoZfOt213!',
    database: 'NanaCleaningServicesLTD_db',
    server: 'nanacleaningservicesltd.database.windows.net',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: false,
    }
};

// Connect to the SQL database
sql.connect(sqlConfig)
    .then(pool => {
        console.log('Connected to SQL Database');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed: ',err);
    });

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route for resume uploads
app.post('/upload', (req, res) => {
    const recaptchaResponse = req.body['g-recaptcha-response'];
    const secretKey = '6Le4JVQqAAAAALbl_BT7AmGjGcH61f03T126zBmI';
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    fetch(verifyUrl, {
        method: 'POST'
    })
    .then(res => res.json())
    .then(body => {
        if(body.success !== undefined && !body.success){
            return res.status(400).json({message: 'Failed reCAPTCHA verification'});
        }
        res.status(200).json({message: 'Resume submitted successfully'});
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'server error'});
    });
});

// Route for form submission
app.post('/submit-form', async (req, res) => {
    const { name, email, phone_number, message } = req.body;

    try{
        const pool = await sql.connect(sqlConfig);
        await pool.request()
        .input('Name', sql.VarChar, name)
        .input('Email',sql.VarChar, email)
        .input('PhoneNumber',sql.VarChar,phone_number)
        .input('Message',sql.VarChar,message)
        .query('INSERT INTO Submissions (Name, Email, PhoneNumber, Message) VALUES (@Name, @Email,@PhoneNumber,@Message');
    
    res.status(200).json({message: 'Form submitted and saved to the database successfully!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Database error'});
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


