import http from 'http';
import {utils} from './utils.js';

const server = {};

server.httpServer = http.createServer((req, res)=>{
    const baseUrl  = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseUrl);

    const httpMethod = req.method.toLowerCase();
    const parsedPathName = parsedUrl.pathname;

    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g,'');
    const header = req.headers;

    req.on('data', ()=>{
        console.log('Data sent');
    });

    req.on('end', ()=>{
        const fileExtension = utils.fileExtension(trimmedPath);
        const textsFileExtensons = ['css','js','svg'];

        const binFileExtensions = ['png','jpg','ico','eot','ttf','woff','woff2','otf'];
        
        const isTextFile = textsFileExtensons.includes(fileExtension);
        const isBinFile = binFileExtensions.includes(fileExtension);
        const isAPI = trimmedPath.split('/')[0] === 'api';
        const isPage = !isTextFile && !isBinFile && !isAPI;
        
        let responseContent = '';

        if(isTextFile){
            responseContent = 'text file';   
        }

        if(isBinFile){
            responseContent = 'bin file';   
        }

        if(isAPI){
            responseContent = 'api call';   
        }

        if(isPage){
            responseContent = 'html content';   
        }
        
        res.end(responseContent);
    });

    

    

    
    //console.log(baseUrl);
});

server.routes = {
    '': 'home html',
    '404': '404 html',
    'register': 'register html',
    'login': 'login html',
    'blog': 'blog home html',
    'blog/1': 'blog post 1 html',
    'blog/2': 'blog post 2 html',
    'services': 'services home html',
    'services/1': 'services post 1 html',
    'services/2': 'services post 2 html',
}


server.init = () => {
    console.log('Testing server....');
    const PORT = 3000;
    server.httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export { server }