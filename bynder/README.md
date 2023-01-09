# Agility CMS + Bynder

This is the reference implementation of Bynder asset selection within Agility CMS.

This uses the [@agility/apps-sdk - see here for docs](https://github.com/agility/agility-cms-app-sdk) to facilitate communication with Agility CMS.

## Using this App

In order to use an App in Agility CMS, you must register this app witin your Organization in Agility CMS. Then, you can install this app within any Instance in your Organization.

### [Register this App in Agility](https://manager.agilitycms.com/org/apps/create-app?name=Bynder&url=https%3A%2F%2Fagility-cms-bynder-app.vercel.app%2F&description=Use%20images%20and%20videos%20from%20your%20Bynder%20media%20library%20in%20Agility%20CMS.&icon=https%3A%2F%2Fcdn.aglty.io%2Fcontent-manager%2Fpublic-app-icons%20bynder.svg)

> **Note**: this uses a deployed version of this app that is publicly available.

Alternatively, you can `git clone` this repository and deploy this to your own website hosting provider.

1. Clone the repository
2. Deploy to a static host such as **Netlify** or **Vercel**
3. Register the App within Agility CMS in your Organization - you must be an Organization Admin
4. Install the App in your instance(s)
