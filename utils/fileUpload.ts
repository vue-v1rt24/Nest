import * as path from 'path';
import * as fs from 'fs';

export enum FileType {
    IMAGES = 'images'
}

export const FileLoad = (type: FileType, file) => {
    try {
        const extensionFile = file.originalname.slice(file.originalname.lastIndexOf('.'));

        const fileName = Date.now().toString() + extensionFile;

        const pathFile = path.resolve(__dirname, '..', 'static', type);

        if (!fs.existsSync(pathFile)) {
            fs.mkdirSync(pathFile, {recursive: true});
        }

        fs.writeFileSync(path.resolve(pathFile, fileName), file.buffer);

        return `${type}/${fileName}`;
    } catch (error) {
        throw error;
    }
};
