const APP_LOCATION_CUSTOM_FIELD = 'CustomField';
const APP_LOCATION_UNKNOWN = 'Unknown';
const APP_LOCATION_APP_CONFIG = 'AppConfig';
const APP_LOCATION_FLYOUT = 'Flyout';


const setAppConfig = (appConfig) => {
    if (window.parent) {
        window.parent.postMessage({
            message: appConfig,
            type: `setAppConfig_for_${appConfig.name}`
        }, "*")
    }
}

const initializeField = ({ location, containerRef, onReady }) => {
    
    const fieldID = getUrlParameter('fieldID');
    const fieldName = getUrlParameter('fieldName');
    var messageID = getMessageID({location, fieldName, fieldID});

    autoSyncFieldHeight({ containerRef, messageID });

    //get the field ready to wait for messages from the parent
    console.log(`${messageID} => Waiting for message from Agility CMS`)

    //open a channel to listen to messages from the CMS
    window.addEventListener("message", function (e) {
     
        //only care about these messages
        if(e.data.type === `setInitialProps_for_${messageID}`) {
            console.log(`${messageID} => auth, fieldValue received from Agility CMS, setting up field...`)
            onReady(e.data.message);
        } else {
            //show us the unhandled message...
            console.log(`${messageID} => IGNORING MESSAGE FROM PARENT: `, e.data)
        }
    }, false);

    //let the CMS know we are NOW ready to receive messages
    if (window.parent) {
        console.log(`${messageID} => 😀 Notifying Agility CMS this field is ready to receive messages...`)
        window.parent.postMessage({
            message: "ready",
            type: `ready_for_${messageID}`
        }, "*")
    } else {
        console.log(`${messageID} => 😞 Parent window not found. You must load this within Agility CMS as an iFrame.`)
    }
}

const getMessageID = ({ location, fieldName, fieldID }) => {
    return location + '_' + fieldName + '_' + fieldID;
}

const updateFieldValue = ({ value, location, fieldName, fieldID }) => {
    var messageID = getMessageID({location, fieldName, fieldID});
    if (window.parent) {
        window.parent.postMessage({
            message: value,
            type: `setNewValue_for_${messageID}`
        }, "*")
      } else {
        console.log(`${messageID} => 😞 Can't post message to parent.`)
      }
}

const updateFieldHeight = ({ height, messageID }) => {
    
    if (window.parent) {
        window.parent.postMessage({
            message: height,
            type: `setHeight_for_${messageID}`
        }, "*")
    }
}

const autoSyncFieldHeight = ({ containerRef, messageID }) => {
    setInterval(function() {
        
        updateFieldHeight({
            height: containerRef.current.offsetHeight,
            messageID
         });
    }, 500)
}

const openFlyout = ({title, size, appLocationName, fieldName, fieldID, onClose, params }) => {
    const messageID = getMessageID({location:APP_LOCATION_CUSTOM_FIELD, fieldID, fieldName });
    if (window.parent) {
        window.parent.postMessage({
            message: {
                title,
                size,
                appLocation: APP_LOCATION_FLYOUT,
                appLocationName,
                params
            },
            type: `openFlyout_for_${messageID}`
        }, "*")

        var listener = function(e) {
            if(e.data.type === `closeFlyoutCallback_for_${messageID}`) {
                onClose(e.data.message);
            }
            window.removeEventListener("message", listener, false);
        };

        window.addEventListener("message", listener, false)
    }
}

const closeFlyout = ({ fieldName, fieldID, params }) => {

    const location = APP_LOCATION_CUSTOM_FIELD;
    const messageID = getMessageID({ location, fieldID, fieldName})
    if (window.parent) {
        window.parent.postMessage({
            message: {
                location,
                fieldName,
                fieldID,
                params
            },
            type: `closeFlyout_for_${messageID}`
        }, "*")
    }
}

const getAppLocation = () => {
    const location = getUrlParameter('location');
    if(location === APP_LOCATION_CUSTOM_FIELD) {
        const fieldTypeName = getUrlParameter('fieldTypeName');
        return {
            location,
            name: fieldTypeName
        }
    } else if(location === APP_LOCATION_APP_CONFIG) {
        return {
            location
        }
    } else if(location === APP_LOCATION_FLYOUT) {
        return {
            location
        }
    } else {
        return {
            location: APP_LOCATION_UNKNOWN,
            name: null
        };
    }
}

const resolveAppComponent = (appConfig) => {
    
    const appLocation = getAppLocation();
    const currentAppComponent = appConfig.appComponents.find((appComponent) => {
        return appComponent.location === appLocation.location && (!appLocation.name || appComponent.name === appLocation.name);
    });

    if(currentAppComponent) {
        return currentAppComponent.componentToRender;
    } else {
        console.error("Could not render the '" + appConfig.name + "' component for '" + appLocation.location + "' with the name of '" + appLocation.name + "'");
    }
}

const getUrlParameter = (name) => {
    //eslint-disable-next-line
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


export {
    setAppConfig,
    initializeField,
    updateFieldValue,
    updateFieldHeight,
    getAppLocation,
    resolveAppComponent,
    openFlyout,
    closeFlyout,
    APP_LOCATION_CUSTOM_FIELD,
    APP_LOCATION_UNKNOWN,
    APP_LOCATION_APP_CONFIG,
    APP_LOCATION_FLYOUT
}