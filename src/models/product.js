
export class Product {

    constructor(i, includes) {
        this.id = i.id;
        this.title = i.attributes.name;
        this.description = i.attributes.description ? i.attributes.description.value : '';
        this.isEol = i.attributes.field_is_eol;
        this.urlAliases = i.attributes.field_url_aliases;
        this.subscriptions = i.relationships.field_subscriptions.data.map(s=>{return s.id});
        this.notices = i.relationships.field_related_notices.data.map(n=>{return n.id});
        this.diskImages = i.relationships.field_disk_images.data.map(di=>{return di.id})
        this.weight = i.attributes.weight;
    }
}