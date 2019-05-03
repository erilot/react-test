
export class SupportState {

    constructor(i) {
        // console.log('i:',i);
        this.id = i.id;
        this.title = i.attributes.name;

        this.grants = {
            acceptSupportRequests: i.attributes.field_accept_support_requests,
            receiveExistingUpdates: i.attributes.field_existing_updates,
            accessKnowledgeBase: i.attributes.field_knowledge_base_access,
            receiveNewUpdates: i.attributes.field_new_updates,
            accessSelfHelpSupport: i.attributes.field_self_help_support,
            receiveWorkarounds: i.attributes.field_workarounds_provided,
        }

        this.displayInLists = i.attributes.field_display_in_lists;
        this.isArchived = i.attributes.field_is_archived;
        this.isPreRelease = i.attributes.field_is_pre_release;
        this.isSupported = i.attributes.field_is_supported;

        this.description = i.attributes.description.value;
        this.shortDescription = i.attributes.field_short_description;

        // console.log('<=', this);
    }
}