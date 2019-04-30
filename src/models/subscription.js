import * as _ from 'lodash';
import { Logo } from './logo';

export class Subscription {

    constructor(i, includes) {
        this.id = i.id;
        this.title = i.attributes.name;
        this.description = i.attributes.description.value;
        
        let logos = _.filter(includes, ['type', 'file--file']);
        this.logo = new Logo(_.find(logos, l=>{ return l.id === i.relationships.field_logo.data.id }));
    }
}