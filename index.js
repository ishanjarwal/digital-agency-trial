require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const formvalidate = require('./validator');
const cors = require('cors');
const { validationResult } = require('express-validator');
const { Resend } = require('resend');

app.use(express.static(path.resolve(__dirname, "dist"), {
    setHeaders: function (res, path, stat) {
        res.setHeader("Cache-Control", "no-cache");
    }
}))
app.use(express.json()) // for reading body data
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/api/email', formvalidate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() })
    } else {
        const resend = new Resend(process.env.MAIL_API_KEY);
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'message.webify@gmail.com',
            subject: 'Client Message',
            html:
                `<table border="1">
            <tr>
                <td>Client Name</td>
                <td>${req.body.fullname}</td>
            </tr>
            <tr>
                <td>Type of Website</td>
                <td>${req.body.interest}</td>
            </tr>
            <tr>
                <td>Client Contact</td>
                <td>${req.body.contact}</td>
            </tr>
            <tr>
                <td>Project Brief</td>
                <td>${req.body.projectBrief}</td>
            </tr>
            <tr>
                <td>Budget in INR</td>
                <td>${req.body.budget}</td>
            </tr>
        </table>`
        })
            .then(val => res.json({ sent: true }))
            .catch(err => res.json({ err: err, sent: false }))
    }
})

app.listen(8080, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Server Started")
    }
})