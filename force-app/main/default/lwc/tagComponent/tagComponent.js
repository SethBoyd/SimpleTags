import { LightningElement, api, track } from 'lwc';

import getTags from '@salesforce/apex/TagController.getExistingTags';
import searchTags from '@salesforce/apex/TagController.searchTags';
import addTags from '@salesforce/apex/TagController.addtagtorecord';
import removeTagLink from '@salesforce/apex/TagController.removeTagLink';
import TagRemoveError from '@salesforce/label/c.TagRemoveError';
import TagRemoveSuccess from '@salesforce/label/c.TagRemoveSuccess';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TagComponent extends LightningElement {

    label = {
        TagRemoveError,
        TagRemoveSuccess,
    };

    // setup api elements
    @api recordId;
    @api objectApiName;

    // setup tracking
    @track tags;
    @track errors;
    @track searchKey;
    @track searchTags;
    @track selectedValue;

    // get our tags to display
    handleGetTags() {
        getTags({
            recordId: this.recordId,
            objectName: this.objectApiName
        })
        .then((results) => {
            this.tags = results;
            this.errors = undefined;  
        })
        .catch((error) => {
            this.errors = JSON.stringify(error);
            this.tags = undefined;
        });
    }

    // handle remove
    handleRemove() {}

    // intial call back get out data
    connectedCallback() {
        this.handleGetTags();        
    }

    // handle errors no output for it back handling anyway
    errorCallback(error) {
        this.errors = error;
    }

    // handle search process
    handleChange(event){
        
        this.searchKey = event.target.value;
        
        searchTags({
            recordId: this.recordId,
            objectName: this.objectApiName,
            searchTerm: this.searchKey
        })
        .then((results) => {
            this.searchTags = results;
            this.errors = undefined;  
        })
        .catch((error) => {
            this.errors = JSON.stringify(error);
            this.searchTags = undefined;
        });
    }

    // handle the removal of a tag
    handleRemove(event){
        removeTagLink({
            tagName: event.target.label,
            objectName: this.objectApiName,
            recordId: this.recordId
        })
        .then((results) => {
            this.errors = undefined;  
            this.handleGetTags();
            if(results == TagRemoveSuccess){
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: results,
                        variant: 'success'
                    })
                );
            } else {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: results,
                        variant: 'error'
                    })
                );
            }
        })
        .catch((error) => {
            this.errors = JSON.stringify(error);
            this.handleGetTags();
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error,
                    variant: 'error'
                })
            );
        });
    }


    // handle the selection of a value from the search options
    setSelectedValue(event) {
        this.selectedValue = event.target.dataset.itemid;
        this.searchTags = null;
        this.searchKey = null;

        addTags({
            tagId: this.selectedValue,
            recordId: this.recordId,
            objectName: this.objectApiName
        })
        .then((results) => {
            this.errors = undefined;  
            this.handleGetTags();
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: results,
                    variant: 'success'
                })
            );
        })
        .catch((error) => {
            this.errors = JSON.stringify(error);
            this.handleGetTags();
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error,
                    variant: 'error'
                })
            );
        });
    }
}