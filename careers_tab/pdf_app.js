const express = require('express');
const multer = require('multer');
const mssql = require('mssql'); 

const app = express();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const creds = JSON.parse(process.env.AZURE_CREDENTIALS);

async function connectToDatabase() {
    try {
        const pool = await mssql.connect({
            user: creds.user,
            password: creds.password,
            server: creds.server,
            database: creds.database,
            options: {
                encrypt: true, 
                trustServerCertificate: true 
            }
        });

        console.log('Connected to Azure SQL Database');
        return pool; 
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

app.post('/upload', upload.single('pdf_File'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const pool = await connectToDatabase();

        const pdfBuffer = req.file.buffer; 
        const pdfBase64 = pdfBuffer.toString('base64'); 

        console.log(`PDF size: ${pdfBuffer.length} bytes`);

        const result = await pool.request()
            .input('pdfBase64', mssql.VarBinary, Buffer.from(pdfBase64, 'base64'))
            .query('INSERT INTO PdfSubmissions2 (pdfFile) VALUES (@pdfBase64)');

        console.log('Insert result:', result);

        res.json({ message: 'File uploaded successfully', result });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


