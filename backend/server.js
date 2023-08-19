const express = require('express');
const bodyParser = require('body-parser');
const pusher = require('pusher');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Use CORS middleware to handle cross-origin requests
app.use(bodyParser.json());

// Initialize Pusher
const pusherConfig = {
  appId: '1654927',
  key: '968e6f33b863f2a28156',
  secret: 'afcd0a99ad47a6ec35b4',
  cluster: 'ap1',
  useTLS: true
};
const pusherInstance = new pusher(pusherConfig);

// Generate QR Code
app.get('/generate-qr', (req, res) => {
  // Implement your QR code generation logic here
  const qrData = {
    channel: 'Povo.ai', // Generate a channel name
    // Other data related to the QR code generation
  };
  res.status(200).json({ success: true, data: qrData });
});

// Verify Token
app.post('/verify-token', (req, res) => {
    try {
        let resp =  pusher.trigger(channel, "login-event", {
            token,
            user_id
        });
        return res.status(200).json({
            success: true,
            msg: "",
            data: resp
        })
    } catch (e) {
        console.log(e)
    }
    return res.status(200).json({
        success: true,
        msg: "Token Triggered",
        data: {}
    })
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
