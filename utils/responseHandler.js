
const json2xmlparser = require('js2xmlparser');
const json2html = require('json-to-html');
const json2plainText = require('json-to-plain-text');

const sendHTMLResponse = ( req, res, statusCode, data, message, status) => {
    res.setHeader('content-type', 'text/html');
    const htmlData = json2html({
        status,
        message,
        data
    });
    return res.status(statusCode).send(htmlData);
}

const sendXMLResponse = ( req, res, statusCode, data, message, status) => {
    console.log("came");
    res.setHeader('content-type', 'application/xml');
    const xmlData = json2xmlparser.parse('data',{
        status,
        message,
        data
    });
    return res.status(statusCode).send(xmlData);
}

const sendTextResponse = ( req, res, statusCode, data, message, status) => {
    res.setHeader('content-type', 'text/xml');
    const jsonData = JSON.parse(
        JSON.stringify({
          status,
          message,
          data,
        })
      );
      const plainTextData = json2plainText.toPlainText(jsonData);
      return res.status(statusCode).send(plainTextData);
}

const sendJsonResponse = (req, res, statusCode, data, message, status) => {
  console.log(message,status);
  return res.status(statusCode).json({
      status,
      message,
      data,
  })
}
module.exports = ( req, res, statusCode, data, message, status) =>{
  
  if( !status ) status = 'success';
  if ( req.headers.accept === 'application/xml' )
     sendXMLResponse( req, res, statusCode, data, message, status);
  else if ( req.headers.accept === 'text/html' )
     sendHTMLResponse( req, res, statusCode, data, message, status);
  else if ( req.headers.accept === 'text/plain' )
     sendTextResponse( req, res, statusCode, data, message, status);
  else sendJsonResponse( req, res, statusCode, data, message, status);

};