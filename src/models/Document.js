import * as _ from 'lodash';

export class Document{

    constructor(i, inc) {
        this.id = i.id;
        this.title = i.attributes.title;
        this.docType = _.find(inc.docTypes, ['id', i.relationships.field_doctype.data.id]);
        this.externalLink = i.attributes.field_teradici_document_link.uri;
        this.localFile = i.relationships.field_local_file_public.data;
    }
}