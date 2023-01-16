import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res)=>{
    //console.log(req);
    //console.log('Call to the server...');
    const baseUrl  = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseUrl);

    const httpMethod = req.method.toLowerCase();
    const parsedPathName = parsedUrl.pathname;

    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g,'');
    const header = req.headers;

    console.log('Trying to open:', trimmedPath);

    req.on('data', ()=>{
        console.log('Client sent some data');
    });

    req.on('end', ()=>{
        console.log('Request received');
    });

    const HTML = `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Response sent</h1>
    </body>
    </html>`;

    res.end(HTML);

    
    //console.log(baseUrl);
});


server.init = () => {
    console.log('Testing server....');
    const PORT = 3000;
    server.httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export { server }