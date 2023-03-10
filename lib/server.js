import http from 'http';
import {utils} from './utils.js';
import { file } from './file.js'

import { PageHome } from '../pages/PageHome.js';
import { Page404 } from '../pages/Page404.js';
import { PageRegister } from '../pages/PageRegister.js';
import { PageLogin } from '../pages/PageLogin.js';


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

    req.on('end', async ()=>{
        const fileExtension = utils.fileExtension(trimmedPath);
        const textsFileExtensons = ['css','js','svg'];

        const binFileExtensions = ['png','jpg','ico','eot','ttf','woff','woff2','otf'];
        
        const isTextFile = textsFileExtensons.includes(fileExtension);
        const isBinFile = binFileExtensions.includes(fileExtension);
        const isAPI = trimmedPath.split('/')[0] === 'api';
        const isPage = !isTextFile && !isBinFile && !isAPI;

        const MIMES = {
            html: 'text/html',
            css: 'text/css',
            js: 'text/javascript',
            svg: 'image/svg+xml',
            woff2: 'font/woff2',
            woff: 'font/woff',
            ttf: 'font/ttf',
            eot: 'application/vnd.ms-fontobject',
            oft: 'font/otf',
            png: 'image/png',
            jpg: 'image/jpeg',
            ico: 'image/x-icon'
        };
        
        let responseContent = '';

        if(isTextFile){
            const [err, content] = await file.readPublic(trimmedPath);
            if(err) {
                responseContent = 'Error while trying to access/read the file';
                res.writeHead(404);
            } else {
                responseContent = content; 
                res.writeHead(200,{
                    'Content-Type': MIMES[fileExtension],
                });
            }
        }

        if(isBinFile){
            const [err, content] = await file.readBinaryPublic(trimmedPath);
            if(err) {
                responseContent = 'Error while trying to access/read the file';
                res.writeHead(404);
            } else {
                responseContent = content; 
                res.writeHead(200,{
                    'Content-Type': MIMES[fileExtension],
                });
            }
        }

        if(isAPI){
            responseContent = 'api call';
            res.writeHead(200);   
        }

        if(isPage){
            let pageClass = server.routes['404'];
            if(server.routes[trimmedPath]){
                pageClass = server.routes[trimmedPath];
            }
            const newPageObject = new pageClass();
            responseContent = newPageObject.render(); 
            res.writeHead(200,{
                'Content-Type': MIMES.html,
            });
        }  
        res.end(responseContent);
    });
});

server.routes = {
    '': PageHome,
    '404': Page404,
    'register': PageRegister,
    'login': PageLogin,
    //'blog': PageBlog,
}


server.init = () => {
    console.log('Testing server....');
    const PORT = 3000;
    server.httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export { server }