require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mailRoutes = require('./routes/mail');

const app = express();
const PORT = process.env.PORT || 9090;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/mail', mailRoutes);

// Base route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
