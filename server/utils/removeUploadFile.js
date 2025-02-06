const fs = require('fs').promises;

/**
 * Menghapus file lokal berdasarkan path yang diberikan.
 * @param {string} filePath - Path file yang akan dihapus.
 * @returns {Promise<void>}
 */
async function removeUploadFile(filePath) {
  try {
    // menunggu process delete
    await fs.unlink(filePath);
  } catch (error) {
    // mengembalikan error jika gagal delete
    throw new Error('Failed to delete local file');
  }
}

module.exports = { removeUploadFile };
