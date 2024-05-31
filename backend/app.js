require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = 8888;

app.use(cors());
app.use(express.json());

// Import routes
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Use routes
app.use('/', loginRoutes);
app.use('/', userRoutes);
app.use('/', chatRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
