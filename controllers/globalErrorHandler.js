
const productionError = ( err, res) => {
  if(err.isOperational){
    res.status(err.statusCode).send({
        status : err.status,
        message : err.message
    })
  }
  else{
    res.status(500).send({
        status : 'error',
        message : 'Unknown error'
    })
  }
}

const developmentError = ( err, res) =>{
    res.status(err.statusCode).send({
        status : err.status,
        message : err.message,
        error : err,
        stack: err.stack
    })
}

module.exports = ( err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(true/*process.env.NODE_ENV === 'production'*/)productionError(err,res);
    else if(true/*process.env.NODE_ENV === 'dev'*/)developmentError(err,res);
}