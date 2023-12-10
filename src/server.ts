import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

const PORT = config.port;

async function server() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); // eslint-disable-line
    });
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
}

server().catch((err) => console.log(err)); // eslint-disable-line
