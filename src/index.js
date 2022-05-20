// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

const uri = 'mongodb+srv://RadiumRocketTrackgenix:RadiumRocket2022@trackegnix-cluster.zj7zt.mongodb.net/BaSP_database?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected…');
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
