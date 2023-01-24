const utils = {};

utils.fileExtension = (url) => {
    const parts = url.split('?')[0].split('.');
    if(parts.length < 2){
        return '';
    }

    //parts = url.split('?')[0].split('.');

    return parts[parts.length-1];
    
}

export {utils}