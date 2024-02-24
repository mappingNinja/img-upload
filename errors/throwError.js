const throwError = (message = '', code= 500) => {
  const error = new Error(message)
  error.code = code
  return error
}

module.exports = throwError