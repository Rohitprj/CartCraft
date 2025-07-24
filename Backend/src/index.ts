import express from 'express';
import dotenv from 'dotenv';
import user from './routes/user';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Routes
app.use("/user",user);


app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
