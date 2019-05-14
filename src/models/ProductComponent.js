
export default class ProductComponent {

    constructor(i, inc) {
        // console.log('c:',i);
        this.id = i.id;
        this.type = i.attributes.field_component_type;
        this.isEol = i.attributes.field_is_eol;
        this.excludeFromUi = i.attributes.field_exclude_from_ui;
        this.title = i.attributes.name;
        this.description = i.attributes.description ? i.attributes.description.value : null;
        this.saasComponent = i.attributes.field_saas_component;
        this.urlAliases = i.attributes.field_url_aliases;
        this.useIntegratedReleaseNotes = i.attributes.field_uses_integrated_rn;
        

    }
}