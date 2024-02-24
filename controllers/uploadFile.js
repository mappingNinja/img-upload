const throwError = require("../errors/throwError");

const { FOLDER_PATH, IMAGE_PATH, DOMAIN } = process.env
const uploadFile = (req, res) => {
  try {
    const { file } = req?.files || {};
    if (!file) {
      throw throwError("Provide valid file!", 404)
    }

    const fileSize = file.size * 1e-6
    if (fileSize > 5) {
      throw throwError("File is not bigger than 5MB!", 404)
    }

    const fileName = file.name.replace(' ', '');
    const path = FOLDER_PATH + IMAGE_PATH + fileName;
    file.mv(path);
    const url = DOMAIN + IMAGE_PATH + fileName;
    return res.status(200).send({ success: true, message: 'Image uploaded', url })
  } catch (error) {
    return res.status(error?.code || 500).send({
      success: false,
      error: error.message || error.error
    })
  }
}

module.exports = uploadFile;