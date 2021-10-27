//standard app config
var appConfig = {
    name: 'Basic App',
    version: '1',
    params: [
        { name: 'apiKey', label: 'API Key', type: 'string'}
    ],
    appComponents: [
      {
        location: agilityAppSDK.APP_LOCATION_CUSTOM_FIELD,
        label: 'Basic Custom Field',
        name: 'BasicCustomField',
        componentToRender: 'BasicCustomField',
        params: [
          { name: 'maxlength', label: 'Max Length', type: 'number'}
        ]
      },
      {
        location: agilityAppSDK.APP_LOCATION_CUSTOM_FIELD,
        label: 'Other Custom Field',
        name: 'OtherCustomField',
        componentToRender: 'BasicCustomField',
        params: [
          { name: 'maxlength', label: 'Max Length', type: 'number'}
        ]
      },
      {
        location: agilityAppSDK.APP_LOCATION_APP_CONFIG,
        name: 'AppConfig',
        componentToRender: 'AppConfig'
      },
      {
        location: agilityAppSDK.APP_LOCATION_FLYOUT,
        componentToRender: 'Flyout'
      }
    ]
  };

var componentToRender = agilityAppSDK.resolveAppComponent(appConfig)

//Determine what logic to run depending on the loaded component
if(componentToRender === 'AppConfig') {
    //AppConfig
    agilityAppSDK.setAppConfig(appConfig);
} else if(componentToRender === 'BasicCustomField') {
    //BasicCustomField
    var fieldContainer = document.getElementById('BasicCustomField');
    //show the HTML for this UI component
    fieldContainer.style.display = 'block';

    agilityAppSDK.initializeField({
        location: agilityAppSDK.APP_LOCATION_CUSTOM_FIELD,
        containerRef : fieldContainer,
        onReady: function(params) {
            //when communication is established with the CMS
            var inputElem = document.getElementById('FieldInput');
            var labelElem = document.getElementById('FieldLabel');
            var openFlyoutBtnElem = document.getElementById('FlyoutOpenBtn');
            var configValuesElem = document.getElementById('ConfigValues');

            //output the config values we have
            configValuesElem.innerText = JSON.stringify(params.configValues);
            
            //set the current value
            inputElem.value = params.fieldValue;
            
            //update CMS value when the input changes
            inputElem.addEventListener('change', function() {
                agilityAppSDK.updateFieldValue({
                location: agilityAppSDK.APP_LOCATION_CUSTOM_FIELD,
                fieldName: params.fieldName,
                fieldID: params.fieldID,
                value: e.target.value
                })
            });

            //set the fieldLabel to show
            labelElem.innerText = params.fieldLabel;

            //add the click handler to open a flyout
            openFlyoutBtnElem.addEventListener('click', function(e) {
                agilityAppSDK.openFlyout({
                    title: 'Flyout Title',
                    size: null,
                    appLocationName: 'ShowFlyout',
                    onClose: (params) => {
                      //passes the parameters back from the app component that closed the flyout
                      console.log(params);
                    },
                    fieldID: params.fieldID,
                    fieldName: params.fieldName,
                    params: {
                      key: 'value'
                    }
                  })
            });
        }
    })
} else if(componentToRender === 'Flyout') {
    //Flyout (for Basic Custom Field)
    var flyoutContainer = document.getElementById('Flyout');
    flyoutContainer.style.display = 'block';

    agilityAppSDK.initializeField({
        location: agilityAppSDK.APP_LOCATION_FLYOUT,
        containerRef: flyoutContainer,
        onReady: function(params) {
            //when communication is established with the CMS
            var fieldLabelElem = document.getElementById('FlyoutFieldLabel');
            var fieldNameElem = document.getElementById('FlyoutFieldName');
            var fieldValueElem = document.getElementById('FlyoutFieldValue');
            var closeFlyoutBtnElem = document.getElementById('FlyoutCloseBtn');

            //set some values to show based on the field that executed this flyout
            fieldLabelElem.innerText = params.fieldLabel;
            fieldNameElem.innerText = params.fieldName;
            fieldValueElem.innerText = params.fieldValue;

            //when ready to close the flyout, close the flyout and pass-back some values to the field UI component that opened it
            closeFlyoutBtnElem.addEventListener('click', function() {
                agilityAppSDK.closeFlyout({
                    fieldName: params.fieldName,
                    fieldID: params.fieldID,
                    params: {
                        'somevalue': 'was set'
                    }
                })
            });
            
        }
    })
}