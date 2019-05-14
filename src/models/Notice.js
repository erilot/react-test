

export class Notice {

    constructor(i, inc) {
        // console.log('notice i:',i,inc);
        this.id = i.id;
        this.title = i.attributes.title;
        this.body = i.attributes.body.value || null;
        this.type = i.attributes.field_notice_type || 'note';
    }
}