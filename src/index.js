// use "import" to import libraries
import mongoose from 'mongoose';
import router from './routes';
import app from './app';

// use "require" to import JSON files

app.use(router);

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log('Connected to Mongo!');
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to Mongo', err);
  });
