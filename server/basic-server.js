const http = require('http');

const PORT = 5000;

const ip = 'localhost';

const server = http.createServer((request, response) => {
  let headers = defaultCorsHeader;
  request.setEncoding('utf-8')
  let data = '';
  request.on('data', chunk => {
    data += chunk;
  });
  if (request.method === 'POST') {
    if (request.url === '/lower') {
      request.on('end', () => {
        response.writeHead(201, headers);
        response.end(JSON.stringify(data.toLowerCase()));
      });
    } else if (request.url === '/upper') {
      request.on('end', () => {
        response.writeHead(201, headers);
        response.end(JSON.stringify(data.toUpperCase()));
      });
    } else {
      response.writeHead(404, headers);
      response.end();
    }
  }
  if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    response.end();
  }
  console.log(
    `http request method is ${request.method}, url is ${request.url}`
  );
});
  /*
  let headers = defaultCorsHeader;
  // let { headers, request.method, request.url } = request;
  // let message = [];
  request.setEncoding('utf-8')
  let message = "";
  //on 메서드는 지정된 이벤트를 통합 처리한다. 첫번째 인자에 이벤트 이름을, 두번째 인자에 통합 처리(함수)를 각각 지정한다.
  //아래의 on 메소드는 data라는 이름을 가진 이벤트가 요청온 메시지를 처리하게되고, 이 이벤트는 message라는 가상의 저장소에 데이터들을 저장하는 것이다.
  request.on('data', (chunk) => {
    message += chunk;
  })
  
  request.on('end', () => {
    if (request.method === "OPTIONS") {
      response.writeHead(200, headers)
      response.end();
    } else if (request.method === "POST") {
      if (request.url === '/upper') {
        
        만약에 응답메세지의 헤더부분을 작성안해주면, 서버는 문제없이 받아들이지만 클라이언트 쪽에서 아래와 같은 에러가 뜬다
        'http://localhost:5000/upper' from origin 'null' has been blocked by CORS policy: 
        No 'Access-Control-Allow-Origin' header is present on the requested resource
        
        response.writeHead(200, headers)
        response.end(JSON.stringify(message.toUpperCase()));
      }
      if (request.url === '/lower') {
        response.writeHead(200, headers)
        response.end(JSON.stringify(message.toLowerCase()));
      }
    } else if (request.method === "GET") {
      response.end(JSON.stringify(message));
    } else {
      response.writeHead(404, defaultCorsHeader);
      response.end("잘못된 요청입니다.");
      //reponse.end()메소드는 서버에 처리된 결과 데이터가 보내졌다고 신호를 보내는 것이다. 
      //즉 서버에서 요청을 처리하고 나온 응답들에 마무리를 지어주는 메소드로 생각하면 된다.,
      //응답이 마무리될때 항상 사용되어야 하는 메소드이다. 
    }
  */
  
server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10
};
