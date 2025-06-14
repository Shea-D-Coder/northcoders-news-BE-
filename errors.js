const handlePostgresErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err)
  }
};

const handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg});
  } else {
    next(err)
  }
};

module.exports = {handlePostgresErrors,
                  handleCustomErrors
                };