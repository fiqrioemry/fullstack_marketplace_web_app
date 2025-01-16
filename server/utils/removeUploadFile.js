const fs = require("fs").promises;

/**
 * Menghapus file lokal berdasarkan path yang diberikan.
 * @param {string} filePath - Path file yang akan dihapus.
 * @returns {Promise<void>}
 */
async function removeUploadFile(filePath) {
  try {
    // await delete process
    await fs.unlink(filePath);
  } catch (error) {
    // return error if failed
    throw new Error("Failed to delete local file");
  }
}

module.exports = { removeUploadFile };
