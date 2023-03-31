const ErrorNotFound = (message) => {
    const err = new Error(message);
    err.name = 'NotFoundError';
    throw err;
  };

module.exports = {
    ErrorNotFound,
  };