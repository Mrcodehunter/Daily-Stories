const json2xmlparser = require('js2xmlparser');
const json2html = require('json-to-html');
const json2plainText = require('json-to-plain-text');

const sendHTMLResponse = (req, res, statusCode, data, message, status) => {
  // console.log('html data');
  res.setHeader('content-type', 'text/html');
  const htmlData = json2html({
    status,
    message,
    data,
  });
  return res.status(statusCode).send(htmlData);
};

const sendXMLResponse = (req, res, statusCode, data, message, status) => {
  //console.log('xml data');
  res.setHeader('content-type', 'application/xml');
  const xmlData = json2xmlparser.parse('data', {
    status,
    message,
    data,
  });
  return res.status(statusCode).send(xmlData);
};

const sendTextResponse = (req, res, statusCode, data, message, status) => {
  //console.log('text data');
  res.setHeader('content-type', 'text/plain');
  const jsonData = JSON.parse(
    JSON.stringify({
      status,
      message,
      data,
    })
  );
  const plainTextData = json2plainText.toPlainText(jsonData);
  return res.status(statusCode).send(plainTextData);
};

const sendJsonResponse = (req, res, statusCode, data, message, status) => {
  //console.log('json data');
  res.setHeader('content-type', 'application/json');
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};
module.exports = (req, res, statusCode, data, message, status) => {
  const successStatus = status || 'success';
  //console.log('came here too');
  if (req.headers.accept === 'application/xml') {
    return sendXMLResponse(req, res, statusCode, data, message, successStatus);
  } else if (req.headers.accept === 'text/html') {
    return sendHTMLResponse(req, res, statusCode, data, message, successStatus);
  } else if (req.headers.accept === 'text/plain') {
    return sendTextResponse(req, res, statusCode, data, message, successStatus);
  } else
    return sendJsonResponse(req, res, statusCode, data, message, successStatus);
};
