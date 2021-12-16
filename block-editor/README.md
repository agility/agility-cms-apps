# Agility CMS Block Editor App

This is an App built using the [App SDK](https://github.com/agility/agility-cms-app-sdk) that enables [Editorjs](https://editorjs.io/) to be used as a `Custom Field` in [Agility CMS](https://agilitycms.com). 

This is using Next.js so that we can support some server-side features (via API routes) such as uploading images to your Assets in [Agility CMS](https://agilitycms.com).

## Using this App
In order to use an App in Agility CMS, you must register this app witin your Organization in Agility CMS. Then, you can install this app within any Instance in your Organization.

### [Register this App in Agility](https://manager.agilitycms.com/org/apps/create-app?name=Block%20Editor&url=https%3A%2F%2Fagility-cms-apps-basic-example-html.vercel.app%2F&description=This%20is%20an%20example%20app%20built%20using%20HTML%20and%20JavaScript.%20It's%20a%20good%20starting%20point%20for%20learning%20how%20to%20build%20custom%20apps.&icon=https%3A%2F%2Fstatic.agilitycms.com%2Fjs.png)

> **Note**: this uses a deployed version of this app that is publicly available.

Alternatively, you can `git clone` this repository and deploy this to your own website hosting provider.

1. Clone the repository
2. Deploy to a static host such as **Netlify** or **Vercel**
3. Register the App within Agility CMS in your Organization - you must be an Organization Admin
4. Install the App in your instance(s)



## Running this Locally
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
