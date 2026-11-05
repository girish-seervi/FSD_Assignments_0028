const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (fileName) => {
  const name = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
  return path.join(DATA_DIR, name);
};

/**
 * Read data from a JSON file safely.
 * Returns an array or empty array if file does not exist or has invalid JSON.
 */
const readData = (fileName) => {
  const filePath = getFilePath(fileName);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    if (!raw.trim()) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error.message);
    return [];
  }
};

/**
 * Write data to a JSON file safely using atomic write.
 */
const writeData = (fileName, data) => {
  const filePath = getFilePath(fileName);
  const tempPath = `${filePath}.tmp`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (error) {
    console.error(`Error writing to ${fileName}:`, error.message);
    try {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch (_) {}
    throw error;
  }
};

module.exports = {
  readData,
  writeData,
  DATA_DIR
};
