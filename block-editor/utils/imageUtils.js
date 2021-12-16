const getNewFileName = (originalFilename) => {
    const filenameWithoutExt = originalFilename.split('.').slice(0, -1).join('.');
    const ext = originalFilename.split('.').pop();
    return `${filenameWithoutExt}-${getTimestamp()}.${ext}`;
}

const getTimestamp = () => {
    var dt = new Date();

    return `${
        (dt.getMonth()+1).toString().padStart(2, '0')}${
        dt.getDate().toString().padStart(2, '0')}${
        dt.getFullYear().toString().padStart(4, '0')}${
        dt.getHours().toString().padStart(2, '0')}${
        dt.getMinutes().toString().padStart(2, '0')}${
        dt.getSeconds().toString().padStart(2, '0')}`
}

export {
    getNewFileName, getTimestamp
}