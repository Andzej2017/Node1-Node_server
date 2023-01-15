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
    
    console.log(header);
    console.log(trimmedPath);
    console.log(parsedPathName);
    console.log(httpMethod);
    console.log(parsedUrl);

    console.log('Trying to open:', trimmedPath);
    
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