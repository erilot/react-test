import * as _ from 'lodash';

export default class ComponentRelease {

    constructor(i, args) {
        console.log('i:', i);

        // const newComponentReleases = _.map(i.relationships.field_component_releases.data, cr => {
        //     return cr.id;
        // });
        // const unchangedComponentReleases = _.map(i.relationships.field_cont_component_releases.data, cr => {
        //     return cr.id;
        // });

        // this.id = i.id;
        // this.title = i.attributes.title;
        // this.number = i.attributes.field_release_number;
        // this.componentReleases = {
        //     new: newComponentReleases,
        //     unchanged: unchangedComponentReleases,
        //     all: newComponentReleases.concat(unchangedComponentReleases),
        // };

        // this.documents = _.map(i.relationships.field_teradici_document.data, d=>{return d.id});
        // this.downloads = _.map(i.relationships.field_teradici_download.data, d=>{return d.id});
        // this.supportState = _.find(args.store.supportStates, ['id', i.relationships.field_support_state.data.id]) || i.relationships.field_support_state.data.id;
        // // console.log('====>',this);
    }   
}