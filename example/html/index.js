
//standard app config
var appConfig = {
    name: 'Basic App',
    version: '1',
    configValues: [
        { name: 'apiKey', label: 'API Key', type: 'string'}
    ],
    appComponents: [
      {
        location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
        label: 'Basic Custom Field',
        name: 'BasicCustomField',
        componentToRender: 'BasicCustomField'
      },
      {
        location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
        label: 'Other Custom Field',
        name: 'OtherCustomField',
        componentToRender: 'BasicCustomField'
      },
      {
        location: agilityAppSDK.types.APP_LOCATION_FLYOUT,
        componentToRender: 'Flyout',
        name: 'Flyout1'
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

    agilityAppSDK.initializeField({ containerRef : fieldContainer }).then(function(sdk) {
      //when communication is established with the CMS
      var inputElem = document.getElementById('FieldInput');
      var labelElem = document.getElementById('FieldLabel');
      var openFlyoutBtnElem = document.getElementById('FlyoutOpenBtn');
      var configValuesElem = document.getElementById('ConfigValues');

      //output the config values we have
      configValuesElem.innerText = JSON.stringify(sdk.configValues);
      
      //set the current value
      inputElem.value = sdk.field.value;
      
      //update CMS value when the input changes
      inputElem.addEventListener('change', function(e) {
          sdk.updateFieldValue({ fieldValue: e.target.value })
      });

      //set the fieldLabel to show
      labelElem.innerText = sdk.field.label;

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
    
    agilityAppSDK.initializeFlyout({ containerRef: flyoutContainer }).then(function(sdk) {
      //when communication is established with the CMS
      var flyoutTitleElem = document.getElementById('FlyoutTitle');
      var flyoutInitiatorElem = document.getElementById('FlyoutInitiator');

      flyoutTitleElem.innerText = sdk.flyout.title;
      flyoutInitiatorElem.innerText = sdk.initiator.name;
      
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