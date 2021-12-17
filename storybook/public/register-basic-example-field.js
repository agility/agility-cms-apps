var BasicCustomField = function() {

    var self = this;
    self.Label = "Basic Custom Field";
    self.ReferenceName = "BasicCustomField";
    self.Render = function (options) {
        /// <summary>Function called whenever the form container this Custom Field Type is rendered or refreshed.</summary>
        /// <param name="options" type="Object">
        ///     <field name="$elem" type="jQueryElem">The .field-row jQuery Dom Element.</field>
        ///     <field name="contentItem" type="ContentItem Object">The entire Content Item object including Values and their KO Observable properties of all other fields on the form.</field>
        ///     <field name="fieldBinding" type="KO Observable">The value binding of thie Custom Field Type. Get and set this field's value using this property.</field>
        ///     <field name="fieldSetting" type="Object">Object representing the field's settings such as 'Hidden', 'Label', and 'Description'</field>
        ///     <field name="readonly" type="boolean">Represents if this field should be readonly or not.</field>
        /// </param>
        setupIframe({
            fieldLabel: self.Label,
            fieldReferenceName: self.ReferenceName,
            fieldOptions: options,
            iFrameUrl: 'http://localhost:3000/',
        })
    }
}

ContentManager.Global.CustomInputFormFields.push(new BasicCustomField());

var setupIframe = function(params) {
    var iFrameClassName = params.fieldReferenceName;
    var $pnl = $("." + iFrameClassName, params.fieldOptions.$elem);

    if ($pnl.size() > 0) return; //already rendered...

    var iFrameOrigin = function() {
        var pathArray = params.iFrameUrl.split('/');
        var protocol = pathArray[0];
        var host = pathArray[2];
        var origin = protocol + '//' + host;
        return origin
    }();
    
    var config = ContentManager.ViewModels.Navigation.globalConfig();
    var languageCode = ContentManager.ViewModels.Navigation.currentLanguageCode();
    var fieldName = params.fieldOptions.fieldSetting.FieldName;
    var fieldTypeName = params.fieldOptions.fieldSetting.Settings.CustomFieldType;
    var fieldID = params.fieldOptions.fieldSetting.FieldID;

    //set up the child iframe to render the field
    var iframe = document.createElement('iframe');
    iframe.className = iFrameClassName;
    iframe.width = '100%';
    iframe.height = 'auto';
    iframe.src = params.iFrameUrl + '?location=CustomField&fieldTypeName=' + fieldTypeName + '&fieldName=' + fieldName + '&fieldID=' + fieldID;
    iframe.onload = function() {
        
    }

    //render the iframe
    params.fieldOptions.$elem.html(iframe);

    //listen for all iframe messages
    window.addEventListener("message", function (e) {
        
        //only process messages from the child iframe
        if(e.origin !== iFrameOrigin) return;

        switch (e.data.type) {
            case 'fieldReady_for_' + fieldName + '_' + fieldID:
                //console.log(fieldName + '['+ params.fieldOptions.fieldSetting.Settings.CustomFieldType + '] (from CMS) => Sending auth and fieldValue message');
                //send a message to the child iframe with the details of this field
                iframe.contentWindow.postMessage({
                    message: {
                        auth: {
                            guid: config.Guid,
                            websiteName: config.WebsiteName,
                            securityKey: config.SecurityKey,
                            languageCode: languageCode,
                            location: 'USA', //or 'CANADA'
                        },
                        fieldValue: ko.unwrap(params.fieldOptions.fieldBinding),
                        fieldLabel: params.fieldOptions.fieldSetting.Label,
                        fieldName: fieldName,
                        fieldID: fieldID,
                        fieldReferenceName: params.fieldOptions.fieldSetting.Settings.CustomFieldType,
                        //fieldOptions: params.fieldOptions,
                        origin: window.location.href

                    },
                    type: 'setInitialProps_for_' + fieldName + '_' + fieldID
                }, "*")

                break
            case 'setNewValue_for_' + fieldName + '_' + fieldID:
                params.fieldOptions.fieldBinding(e.data.message);
                break;
            case 'setHeight_for_' + fieldName + '_' + fieldID:
                iframe.height = e.data.message + "px"
                break;

            default:
                //do nothing...
                break;
        }

    }, false);
    
}