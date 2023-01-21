import http from 'http';
import {utils} from './utils.js';

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
            const pageClass = server.routes[trimmedPath] ? server.routes[trimmedPath] : server.routes['404'];
            const newClassObject = new pageClass();
            responseContent = newClassObject.render();   
        }
        
        res.end(responseContent);
    });
});

server.routes = {
    '': PageHome,
    '404': Page404,
    'register': PageRegister,
    'login': PageLogin,
}


server.init = () => {
    console.log('Testing server....');
    const PORT = 3000;
    server.httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export { server }