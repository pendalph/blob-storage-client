export const readBinaryFile = (file: Blob) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const loadedFile = reader.result;
            if (loadedFile) {
                resolve(loadedFile as string);
            } else {
                reject();
            }
        };
        reader.readAsDataURL(file);
    });
};
