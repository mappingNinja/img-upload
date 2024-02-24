const error = (req, res) => {
  try {
    return res.status(401).send({ success: false, message: "URL not found!" })
  }
  catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || error.error || "URL not found!"
    })
  }
}

module.exports = error
