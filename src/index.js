// use "import" to import libraries
import mongoose from 'mongoose';
import router from './routes';
import app from './app';
import 'dotenv/config';

// use "require" to import JSON files

app.use(router);

const port = process.env.PORT || 3000;
const { URL } = process.env;
mongoose.connect(
  URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('🔴 Database error: ', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('✅ Database connected');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
