require('dotenv').config();

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Optional: use for cross-origin issues

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable if using frontend on a different port
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas URI (replace with your actual URI)
const uri = process.env.MONGO_URI;


// Connect to MongoDB Atlas
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ Connection error:', err));

// Define schema and model
const flamesSchema = new mongoose.Schema({
    yourName: String,
    crushName: String,
    result: String
});

const FlamesEntry = mongoose.model('FlamesEntry', flamesSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
    const { yourName, crushName, result } = req.body;

    try {
        const entry = new FlamesEntry({ yourName, crushName, result });
        await entry.save();
        res.status(200).json({ message: '✅ Saved to database!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '❌ Failed to save.' });
    }
});

app.get('/', (req, res) => {
    res.send('🔥 FLAMES App is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
