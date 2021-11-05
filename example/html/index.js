
//standard app config
var appConfig = {
    name: 'Basic App',
    version: '1',
    params: [
        { name: 'apiKey', label: 'API Key', type: 'string'}
    ],
    appComponents: [
      {
        location: agilityAppSDK.locations.APP_LOCATION_CUSTOM_FIELD,
        label: 'Basic Custom Field',
        name: 'BasicCustomField',
        componentToRender: 'BasicCustomField',
        params: [
          { name: 'maxlength', label: 'Max Length', type: 'number'}
        ]
      },
      {
        location: agilityAppSDK.locations.APP_LOCATION_CUSTOM_FIELD,
        label: 'Other Custom Field',
        name: 'OtherCustomField',
        componentToRender: 'BasicCustomField',
        params: [
          { name: 'maxlength', label: 'Max Length', type: 'number'}
        ]
      },
      {
        location: agilityAppSDK.locations.APP_LOCATION_APP_CONFIG,
        name: 'AppConfig',
        componentToRender: 'AppConfig'
      },
      {
        location: agilityAppSDK.locations.APP_LOCATION_FLYOUT,
        componentToRender: 'Flyout'
      }
    ]
  };

var componentToRender = agilityAppSDK.resolveAppComponent(appConfig)

//Determine what logic to run depending on the loaded component
if(componentToRender === 'AppConfig') {
    //AppConfig
    agilityAppSDK.initializeAppConfig(appConfig);
} else if(componentToRender === 'BasicCustomField') {
    //BasicCustomField
    var fieldContainer = document.getElementById('BasicCustomField');
    //show the HTML for this UI component
    fieldContainer.style.display = 'block';

    agilityAppSDK.initializeField({ containerRef : fieldContainer }).then(function(sdk) {
      //when communication is established with the CMS
      var inputElem = document.getElementById('FieldInput');
      var labelElem = document.getElementById('FieldLabel');
      var openFlyoutBtnElem = document.getElementById('FlyoutOpenBtn');
      var configValuesElem = document.getElementById('ConfigValues');

      //output the config values we have
      configValuesElem.innerText = JSON.stringify(sdk.configValues);
      
      //set the current value
      inputElem.value = sdk.fieldValue;
      
      //update CMS value when the input changes
      inputElem.addEventListener('change', function(e) {
          sdk.updateFieldValue({ fieldValue: e.target.value })
      });

      //set the fieldLabel to show
      labelElem.innerText = sdk.fieldLabel;

      //add the click handler to open a flyout
      openFlyoutBtnElem.addEventListener('click', function(e) {
        sdk.openFlyout({
              title: 'Flyout Title',
              size: null,
              name: 'Flyout1',
              onClose: (params) => {
                //passes the parameters back from the app component that closed the flyout
                console.log(params);
              },
              params: {
                key: 'value'
              }
            })
      });
    })

            
} else if(componentToRender === 'Flyout') {
    //Flyout (for Basic Custom Field)
    var flyoutContainer = document.getElementById('Flyout');
    flyoutContainer.style.display = 'block';

    agilityAppSDK.initializeField({ containerRef: flyoutContainer }).then(function(sdk) {
      //when communication is established with the CMS
      var fieldLabelElem = document.getElementById('FlyoutFieldLabel');
      var fieldNameElem = document.getElementById('FlyoutFieldName');
      var fieldValueElem = document.getElementById('FlyoutFieldValue');
      var closeFlyoutBtnElem = document.getElementById('FlyoutCloseBtn');

      //set some values to show based on the field that executed this flyout
      fieldLabelElem.innerText = sdk.fieldLabel;
      fieldNameElem.innerText = sdk.fieldName;
      fieldValueElem.innerText = sdk.fieldValue;

      //when ready to close the flyout, close the flyout and pass-back some values to the field UI component that opened it
      closeFlyoutBtnElem.addEventListener('click', function(e) {
        sdk.closeFlyout({
            params: {
                'somevalue': 'was set'
            }
        })
      });
    })

}