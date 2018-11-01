const commonModule = require('./common');

for (let propName in commonModule.questions) {
  console.log(`${propName} : ${commonModule.questions[propName]}`);
}

const url = require('url');
const http = require('http');
const app = http.createServer((request, response) => {
  var query, responseData;
  query = url.parse(request.url, true).query;
  if (query.data) {
    responseData = commonModule.questions[query.data];
  }
  
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(`<h1>Response: ${responseData}.</h1>`);
  response.end();
});

app.listen(3000);