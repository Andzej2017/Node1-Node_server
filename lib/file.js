import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const file = {};
/**
 * 
 * @param {*} dir 
 * @param {*} fileName 
 * @returns 
 */
file.fullPath = (dir, fileName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname,'../.data', dir, fileName);
}

/**
 * 
 * @param {*} filePath 
 * @returns 
 */
file.fullPublicPath = (filePath) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname,'../public', filePath);
}

/**
 * Async function that creates file in specific folder ant writes initial content.
 * @param {string} dir Folder name, where file will be saved.
 * @param {string} fileName Name of the file with extension.
 * @param {*} content Content of the file
 * @returns {Promise<[boolean, string|object]>} Status(true/false), whether the file was successfully created
 */
file.create = async (dir, fileName, content) => {
    let fileDescriptor = null;
    try {
        const filePath = file.fullPath(dir,fileName);
        fileDescriptor = await fs.open(filePath, 'wx');
        await fs.writeFile(fileDescriptor, JSON.stringify(content));
        return [false, 'Success'];
    } catch (error) {
        return [true, error];   
    } finally {
        if(fileDescriptor) {
            await fileDescriptor.close();
        }  
    }
}
/**
 * Function reads file and returns file content
 * @param {string} dir Folder of file destination.
 * @param {string} fileName Name of the file with extension.
 * @returns {Promise<[boolean, string|object]>} Status(true/false), whether the file was read successfully;
 *  Result: file content or error object.
 */
file.read = async (dir, fileName) => {
    const filePath = file.fullPath(dir, fileName);
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return [false, fileContent];
    } catch (error) {
        return [true, error];
    }  
}

/**
 * Function reads file inside "public" folder and returns file content.
 * @param {string} filePath Path of the file that will be read.
 * @returns {Promise<[boolean, string|object]>} Status(true/false), whether the file was read successfully;
 *  Result: file content or error object.
 */
file.readPublic = async (filePath) => {
    const fullFilePath = file.fullPublicPath(filePath);
    try {
        const fileContent = await fs.readFile(fullFilePath, 'utf-8');
        return [false, fileContent];
    } catch (error) {
        return [true, error];
    }  
}

/**
 * Function reads **binary** file inside "public" folder and returns file content.
 * @param {string} filePath Path of the file that will be read.
 * @returns {Promise<[boolean, string|object]>} Status(true/false), whether the file was read successfully;
 *  Result: file content or error object.
 */
file.readBinaryPublic = async (filePath) => {
    const fullFilePath = file.fullPublicPath(filePath);
    try {
        const fileContent = await fs.readFile(fullFilePath);
        return [false, fileContent];
    } catch (error) {
        return [true, error];
    }  
}


/**
 * Async function that updates file in specific folder ant writes new content.
 * @param {string} dir Folder name, where file will be saved.
 * @param {string} fileName Name of the file with extension.
 * @param {*} content Content of the file
 * @returns {Promise<[boolean, string|object]>} Status(true/false), whether the file was successfully updated
 */
file.update = async (dir, fileName, content) => {
    let fileDescriptor = null;
    try {
        const filePath = file.fullPath(dir,fileName);
        fileDescriptor = await fs.open(filePath, 'r+');
        await fileDescriptor.truncate();
        await fs.writeFile(fileDescriptor, JSON.stringify(content));
        return [false, 'Success'];
    } catch (error) {
        return [true, error];   
    } finally {
        if(fileDescriptor) {
            await fileDescriptor.close();
        }  
    }
}
/**
 * Async function that delete file in specific folder.
 * @param {string} dir Folder name, which contains file to be deleted.
 * @param {string} fileName Name of the file with extension.
 * @returns {Promise<[boolean, string|object]>} Status(true/false), whether the file was successfully deleted
 */
file.delete = async (dir, fileName) => {
    const filePath = file.fullPath(dir, fileName);
    try {
        await fs.unlink(filePath);
        return [false, 'Success'];
    } catch (error) {
        return [true, error];
    }
}

/**
 * Async function that return list of file names inside folder.
 * @param {string} dir Folder name that will be searched for a files.
 * @returns {Promise<[boolean, string[]|object]>} Status(true/false), whether the files were successfully read. Return list of files.
 */
file.list = async (dir) => {
    const folderPath = file.fullPath(dir);
    try {
        const files = await fs.readdir(folderPath);
        return [false, files];
    } catch (error) {
        return [true, error];
    }
}

export { file }