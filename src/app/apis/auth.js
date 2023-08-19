// Update your APIs file (apis.js) to use the backend's URLs
const backendBaseUrl = 'http://localhost:5000'; // Replace with your backend's URL

export default {
  GENERATE_QR: {
    url: `${backendBaseUrl}/generate-qr`,
    method: 'GET',
  },
  VERIFY_TOKEN: {
    url: `${backendBaseUrl}/verify-token`,
    method: 'POST',
  },
  AUTHORIZE_PUSHER: {
    url: `${backendBaseUrl}/verify-token`,
    method: 'GET',
  },
  // ...other API endpoints
};
