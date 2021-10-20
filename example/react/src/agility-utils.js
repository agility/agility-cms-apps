const APP_LOCATION_CUSTOM_FIELD = 'CustomField';
const APP_LOCATION_UNKNOWN = 'Unknown';
const APP_LOCATION_APP_CONFIG = 'AppConfig';

const setAppConfig = ({ }) => {

}

const initializeField = ({ containerRef, onReady }) => {
    
    const fieldID = getUrlParameter('fieldID');
    const fieldName = getUrlParameter('fieldName');

    autoSyncFieldHeight({ containerRef, fieldName, fieldID });

    //get the field ready to wait for messages from the parent
    console.log(`${fieldName}_${fieldID} => Waiting for message from Agility CMS`)

    //open a channel to listen to messages from the CMS
    window.addEventListener("message", function (e) {
        
        //only care about these messages
        if(e.data.type === `setInitialProps_for_${fieldName}_${fieldID}`) {
            console.log(`${fieldName}_${fieldID} => auth, fieldValue received from Agility CMS, setting up field...`)
            onReady(e.data.message);
        } else {
            //show us the unhandled message...
            console.log(`${fieldName}_${fieldID} => IGNORING MESSAGE FROM PARENT: `, e.data)
        }
    }, false);

    //let the CMS know we are NOW ready to receive messages
    if (window.parent) {
        console.log(`${fieldName}_${fieldID} => 😀 Notifying Agility CMS this field is ready to receive messages...`)
        window.parent.postMessage({
            message: "ready",
            type: `fieldReady_for_${fieldName}_${fieldID}`
        }, "*")
    } else {
        console.log(`${fieldName}_${fieldID} => 😞 Parent window not found. You must load this within Agility CMS as an iFrame.`)
    }
}

const updateFieldValue = ({ value, fieldName, fieldID }) => {
    if (window.parent) {
        window.parent.postMessage({
            message: value,
            type: `setNewValue_for_${fieldName}_${fieldID}`
        }, "*")
      } else {
        console.log(`${fieldName}_${fieldID} => 😞 Can't post message to parent.`)
      }
}

const updateFieldHeight = ({ height, fieldName, fieldID }) => {
    if (window.parent) {
        window.parent.postMessage({
            message: height,
            type: `setHeight_for_${fieldName}_${fieldID}`
        }, "*")
    }
}

const autoSyncFieldHeight = ({ containerRef, fieldName, fieldID }) => {
    setInterval(function() {
        updateFieldHeight({
            height: containerRef.current.offsetHeight,
            fieldName,
            fieldID
         });
    }, 100)
}

const openFlyout = ({flyoutTitle, flyoutSize, iFrameUrl, iFrameWidth, iFrameHeight }) => {
    //todo: implement function to open a flyout in the CMS and load another iframe
}

const closeFlyout = ({ flyoutID }) => {
    //todo: implement function to close a flyout in the CMS
}

const getAppLocation = () => {
    const location = getUrlParameter('location');
    if(location === APP_LOCATION_CUSTOM_FIELD) {
        const fieldTypeName = getUrlParameter('fieldTypeName');
        return {
            location,
            name: fieldTypeName
        }
    }
    return {
        location: APP_LOCATION_UNKNOWN,
        name: null
    };
}

const getUrlParameter = (name) => {
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
    APP_LOCATION_CUSTOM_FIELD,
    APP_LOCATION_UNKNOWN,
    APP_LOCATION_APP_CONFIG
}