
export class PublicFile{
    
    constructor(i, inc) {
        this.id = i.id;
        this.fileMime = i.attributes.filemime;
        this.fileName = i.attributes.filename;
        this.fileSize = i.attributes.filesize;
        this.url = i.attributes.uri.url;

    }
}