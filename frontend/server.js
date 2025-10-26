const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', async (req, res) => {
  try {
    const formData = req.body;
    const backendUrl = process.env.BACKEND_URL || 'http://backend:5000/submit';
    const resp = await axios.post(backendUrl, formData, { timeout: 5000 });
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error('Error forwarding to backend:', err.message || err);
    res.status(500).json({ error: 'Failed to submit to backend', details: err.message });
  }
});

app.listen(PORT, () => console.log(`Frontend listening on http://0.0.0.0:${PORT}`));
