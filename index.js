import express from 'express';
import bodyParser from 'body-parser';
import QRCode from 'qrcode';
import path from 'path';
import ejs from "ejs";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to render the index.ejs page
app.get('/', (req, res) => {
  res.render('index', {
    title: "Qr Gen",
    qrCodeUrl: null
  });
});

// Route to handle form submission and QR code generation
app.post('/generate', (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  QRCode.toDataURL(url, (err, src) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error generating QR code');
    }

    // Render the index.ejs page and pass the generated QR code URL
    res.render('index', { title: 'QR Code Generated', qrCodeUrl: src });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
