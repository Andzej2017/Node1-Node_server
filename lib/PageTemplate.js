class PageTemplate {
    constructor(){
        
    }

    headHTML(){
        return `<head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Node js</title>
                    <link rel="stylesheet" href="css/pages/home.css">
                </head>`;
    }
    headerHTML(){
        return `<header>
                    <img src="img/logo.png" alt="Logo">
                    <nav>
                        <a href="/">Home</a>
                        <a href="/blog">Blog</a>
                        <a href="/register">Register</a>
                        <a href="/login">Login</a>
                        <i class="icofont-globe"></i>
                    </nav>
                </header>`;
    }

    footerHTML(){
        return `<footer>
                    Copyright &copy; 2023
                </footer>`;
    }
    
    scriptHTML(){
        return `<script src="js/pages/home.js" type="module" defer></script>`
    }

    mainHTML(){
        return 'Page content';
    }

    render(){
        return `<!DOCTYPE html>
                <html lang="en">
                    ${this.headHTML()}
                    <body>
                    ${this.headerHTML()}
                    <main>
                        ${this.mainHTML()}
                    </main>
                    ${this.footerHTML()}
                    ${this.scriptHTML()}  
                    </body>
                </html>`;
    }
}
export { PageTemplate }