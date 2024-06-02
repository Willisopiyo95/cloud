const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');


const app = express();
const upload = multer({ dest: 'uploads/' });

const GITHUB_TOKEN = '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';
const REPO_OWNER = 'willisopiyo95';
const REPO_NAME = 'cloud';

app.use(express.static('public'));

app.post('/upload', upload.array('images'), async(req, res) => {
    try {
        for (const file of req.files) {
            const filePath = path.join(__dirname, file.path);
            const content = fs.readFileSync(filePath, { encoding: 'base64' });
            const fileName = file.originalname;
            const response = await axios.HttpStatusCode(`https://api.github.com/repos/${willisopiyo95}/${cloud}/contents/images/${fileName}`, {
                message: `Upload ${fileName}`,
                content: content
            }, { headers: { Authorization: `token ${hp_ELiJWgvmOyQ7XBYTEIt0WoeGlNE4PB0WhLgR}` } });
            fs.unlinkSync(filePath);
        }
        res.json({ success: true });
    } catch (error) {
        console.log('Server is running on https://localhost:3000');
    }

})