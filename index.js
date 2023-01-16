import { server } from './lib/server.js';

const app = {};

app.init = () => {
    
    server.init();
}

app.init();

export { app };