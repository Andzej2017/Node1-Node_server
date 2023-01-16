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

    const homeHTML = `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    <header>
        <nav>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
        </nav>
    </header>
    <main>
        
    </main>
    <footer>
    Copyright &copy; 2023
    </footer>
        
    </body>
    </html>`;

    res.end(homeHTML);

    
    //console.log(baseUrl);
});

server.routes = {
    '': 'home html',
    '404': '404 html',
    'register': 'register html',
    'login': 'login html',
    'blog': 'blog html',
    'blog/test1': 'blog post "test1" html',
    'blog/test2': 'blog post "test2" html',
}


server.init = () => {
    console.log('Testing server....');
    const PORT = 3000;
    server.httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export { server }