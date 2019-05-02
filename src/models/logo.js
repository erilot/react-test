
export class Logo {

    constructor(i) {
        this.id = i.id;
        this.fileMime = i.attributes.filemime;
        this.fileName = i.attributes.filename;
        this.url = 'https:releases.teradici.com' + i.attributes.uri.url;
    }
}