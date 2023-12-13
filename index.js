const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to read data from a file
app.get('/readFile/:fileName', async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const data = await fs.readFile(fileName, 'utf-8');
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Error reading file' });
  }
});

// Endpoint to write data to a file
app.post('/writeFile/:fileName', async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const jsonData = req.body.data;

    if (!jsonData) {
      return res.status(400).json({ error: 'No data provided in the request body' });
    }

    await fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), 'utf-8');
    res.json({ message: 'File written successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error writing to file' });
  }
});

// Endpoint to update data in a file
app.put('/updateFile/:fileName', async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const jsonData = req.body.data;

    if (!jsonData) {
      return res.status(400).json({ error: 'No data provided in the request body' });
    }

    // Read existing data
    const existingData = await fs.readFile(fileName, 'utf-8');

    // Append new data to existing data
    const updatedData = existingData + '\n' + JSON.stringify(jsonData, null, 2);

    // Write updated data to the file
    await fs.writeFile(fileName, updatedData, 'utf-8');
    
    res.json({ message: 'File updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating file' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
