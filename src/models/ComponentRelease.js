import * as _ from 'lodash';
import { Document } from './Document';
import { DocType } from './Doctype';
import { Download } from './Download';
import { Eula } from './Eula';
import { Tag } from './Tag';

export default class ComponentRelease {

    constructor(cr, args) {

        this.id = cr.id;
        this.title = cr.attributes.title;
        this.number = cr.attributes.field_release_number;
        this.isEol = cr.attributes.field_is_eol;
        this.isRetired = cr.attributes.field_retired;
        this.gaDate = cr.attributes.field_ga_date;

        this.component = _.map(cr.relationships.field_teradici_product.data, c=>{return c.id})[0];

        const eulas = _.map(args.included.eulas, e => { return new Eula(e, {files: args.included.files})});


        this.eula = cr.relationships.field_eula.data ? _.find(eulas, ['id', cr.relationships.field_eula.data.id]) : null;
        this.supportState = _.find(args.store.supportStates, ['id', cr.relationships.field_support_state.data.id]) || cr.relationships.field_support_state.data.id;

        // console.log('included docs:',args.included);
        const docs = _.intersectionWith(_.filter(args.included, ['type','node--teradici_document']), cr.relationships.field_teradici_document.data, (a,b)=>{return a.id === b.id});
        const dls = _.intersectionWith(_.filter(args.included, ['type','node--teradici_download']), cr.relationships.field_teradici_download.data, (a,b)=>{return a.id === b.id});

        const doctypes = _.map(_.filter(args.included, ['type', 'taxonomy_term--document_types']), dt=>{return new DocType(dt)});
        const platforms = _.map(_.filter(args.included, ['type', 'taxonomy_term--platforms']), p=>{return new Tag(p)});
        this.documents = _.map(docs, d => { return new Document(d, { docTypes: doctypes }) });
        this.downloads = _.map(dls, d => { return new Download(d, { variants: platforms, eulas: eulas }) });

        // console.log('CR=>',this);
    }
}