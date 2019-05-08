import * as _ from 'lodash';
import { Document } from './Document';
import { DocType } from './Doctype';
import { Download } from './Download';
import { Eula } from './Eula';

export default class ComponentRelease {

    constructor(i, args) {
        // console.log('i:', i, args);

        this.id = i.id;
        this.title = i.attributes.title;
        this.number = i.attributes.field_release_number;
        this.isEol = i.attributes.field_is_eol;
        this.isRetired = i.attributes.field_retired;
        this.gaDate = i.attributes.field_ga_date;

        const files = _.filter(args.included, ['type', 'file--file']);

        const eulas = _.map(
            _.filter(args.included, ['type', 'node--teradici_eula']), e => {
                return new Eula(e, { files: files })
            });

        this.eula = i.relationships.field_eula.data ? _.find(eulas, ['id', i.relationships.field_eula.data.id]) : null;
        this.supportState = _.find(args.store.supportStates, ['id', i.relationships.field_support_state.data.id]) || i.relationships.field_support_state.data.id;

        const docs = _.filter(args.included, ['type', 'node--teradici_document']);
        const dls = _.filter(args.included, ['type', 'node--teradici_download']);
        const doctypes = _.filter(args.included, ['type', 'taxonomy_term--document_types']);

        this.documents = _.map(docs, d => { return new Document(d, { docTypes: _.map(doctypes, dt => { return new DocType(dt) }) }) });
        this.downloads = _.map(dls, d => { return new Download(d, { eulas: eulas }) });
    }
}