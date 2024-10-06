const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/submit-form',(req, res) => {
    const { name, email, phone_number, message } = req.body;

    console.log(`Name: ${name}, Email: ${email}, Phone Number: ${phone_number}, Message: ${message}`);

    res.status(200).json({message: 'Form submitted successfully!'});
});
app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});


