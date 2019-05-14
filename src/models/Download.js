import _ from 'lodash';

export class Download {

    constructor(i, inc) {
        // console.log('i:',i, inc);
        this.id = i.id;
        this.title = i.attributes.title;
        this.description = i.attributes.field_description ? i.attributes.field_description.value : '';
        this.overrideTitle = i.attributes.field_override_title;
        this.resourceType = i.attributes.field_resource_type;
        this.sha256 = i.attributes.field_sha256_exists;
        this.externalUrl = i.attributes.field_teradici_download_link.uri || null;
        this.variants = _.intersectionWith(inc.variants, i.relationships.field_resource_variant.data, (a,b)=>{return a.id === b.id});

        // console.log('DL:',this);
    }
}