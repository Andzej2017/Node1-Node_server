import { PageTemplate } from "../lib/PageTemplate.js"

class Page404 extends PageTemplate {
    mainHTML(){
        return 'Page not found!';
    } 
}

export { Page404 }