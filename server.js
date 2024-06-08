const express = require('express');
const cors = require('cors');
const chatRouter = require('./routes/chat');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


app.use('/chat', chatRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
