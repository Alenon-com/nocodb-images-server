const express = require('express');
const path = require('path');
require('dotenv').config();

const packageJson = require('./package.json');

const app = express();
const port = process.env.PORT;

const baseDirectory = process.env.BASE_DIRECTORY;

// {host}/image?path=pmr/m1g0/cmri/image-x.png
app.get('/image', (req, res) => {
  const imagePath = req.query.path;
  if (!imagePath) {
    return res.status(400).send('Parameter "path" is required');
  }

  const fullPath = path.join(baseDirectory, imagePath);

  res.sendFile(fullPath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Image not found');
    }
  });
});

app.get('/', (req, res) => {
  res.send(`Server version: ${packageJson.version} - ${Date()}`);
});

app.listen(port, () => {
  console.log(`Server (v${packageJson.version}) running on port ${port}`);
});
