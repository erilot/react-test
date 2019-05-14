import * as _ from 'lodash';
import { PublicFile } from './PublicFile';

export class Eula {

    constructor(i, inc) {
        // console.log('i:',i,inc);
        this.id = i.id;
        this.title = i.attributes.title;
        this.body = i.attributes.body.value;
        this.file = i.relationships.field_local_file_public_.data ?
            new PublicFile(_.find(inc.files, ['id', i.relationships.field_local_file_public_.data.id]))
            : null;

    }
}