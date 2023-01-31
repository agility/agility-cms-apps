# Agility CMS Typeform App

This is the reference implementation of Typeform form selection within Agility CMS.

This uses the @agility/apps-sdk - see here for docs to facilitate communication with Agility CMS.

## Using this App

In order to use an App in Agility CMS, you must register this app within your Organization in Agility CMS. Then, you can install this app within any Instance in your Organization.

### Getting your Typeform access token

1. Go to your Typeform dashboard
2. Click on settings (cog icon) next to your profile
3. Find and collapse the `Integrations` menu on the left panel
4. Click on `Private apps`and then `Create a private app`
5. Fill out the necessary fields then hit create
6. You should now see your access token on the page you are on

[Getting your Typeform access token](https://agilitycms.com/docs/developers/typeform)

## Running this app

### Remote

1. Clone the repository
2. Deploy to a static host such as Netlify or Vercel
3. Register the App within Agility CMS in your Organization - you must be an Organization Admin
4. Install the App in your instance(s)

### Local

This is a app is running on [Next.js](https://nextjs.org/)

1. Clone the repository
2. CD to the `typeform` folder and run `npm install`
3. Run the app with `npm run dev` OR `yarn dev`
4. Your app should now be running on `localhost:3000`
5. Install the App in your instance(s)

Alternatively, you can install this app from this link:  [Register this App in Agility](https://manager.agilitycms.com/org/apps/create-app?name=Typeform&url=https://agilitycms-typeform-app.vercel.app/&description=Use%20forms%20from%20your%20Typeform%20account%20in%20Agility%20CMS.&icon=https%3A%2F%2Fcdn.agilitycms.com%2Fcontent-manager%2Fpublic-app-icons%2Ftypeform.png)

## Embedding the Typeform app response

Once you've installed and applied the app as custom field to your page, you can then use the script below to run a dynamic embedded form from the data sent by your app.

We are using NextJS.

```
import React from "react";
import Script from 'next/script'

const TypeformForm = ({ module }) => {

  const { fields: { TypeformForm = undefined} } = module;

  if(!TypeformForm) return null;

  const { name, portalId, formId } = JSON.parse(TypeformForm);
  const divID = `form_${formId}`;

  return (
    <div>
      <Script src="//js.hsforms.net/forms/v2.js"
        strategy="lazyOnload"
        onLoad={() => {
          hbspt.forms.create({
            portalId,
            formId,
            target: `#${divID}`
          });
        }}

      />
      <div id={divID}></div>
    </div>
  );
};

export default TypeformForm;
```
