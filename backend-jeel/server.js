const express = require('express');
const bodyParser = require('body-parser');
const resumeRoutes = require('./routes/resumeroutes');

const app = express();
const PORT = process.env.PORT || 5000;

//middleware-important for express(main things)
app.use(bodyParser.json()); // Parse JSON bodies





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
