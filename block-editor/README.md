This is a custom field for [Editorjs](https://editorjs.io/) to be used in [Agility CMS](https://agilitycms.com). This is using Next.js so that we can support some server-side features (via API routes) such as uploading images to your Assets in [Agility CMS](https://agilitycms.com).

## Installation Script
In order to use this field, you'll need to register it in your custom scripts file that is connected to your Agility CMS instance (via UI Extensions). You do not need to host your own version of this, but if you'd like to customize how it works, consider cloning this and deploying your own version to [Vercel](https://vercel.com).

In your `js` file, add the following code snippet - you may already have other fields defined, so you would append this to the file:
```javascript
var BlockEditorCustomField = function() {
    var self = this;
    self.Label = "Block Editor JSON (Experimental)";
    self.ReferenceName = "BlockEditorJSON";
    self.Render = function (options) {
        /// <summary>Function called whenever the form container this Custom Field Type is rendered or refreshed.</summary>
        /// <param name="options" type="Object">
        ///     <field name="$elem" type="jQueryElem">The .field-row jQuery Dom Element.</field>
        ///     <field name="contentItem" type="ContentItem Object">The entire Content Item object including Values and their KO Observable properties of all other fields on the form.</field>
        ///     <field name="fieldBinding" type="KO Observable">The value binding of thie Custom Field Type. Get and set this field's value using this property.</field>
        ///     <field name="fieldSetting" type="Object">Object representing the field's settings such as 'Hidden', 'Label', and 'Description'</field>
        ///     <field name="readonly" type="boolean">Represents if this field should be readonly or not.</field>
        /// </param>

		var $pnl = $(".rt-field", options.$elem);

		if ($pnl.size() == 0) {

			var row = $(options.$elem).parents(".row")
			$(".tab-CONTENT-tab", row).css("padding", 0)
			
			//uncomment below to hide sidebar and take the full width screen
			// $(".col-lg-8", row).addClass("col-lg-12").removeClass("col-lg-8")
			// $(".col-lg-4", row).addClass("hidden")
			$(".tab-CONTENT-tab", row).css("padding", 0)

			//var url = 'http://localhost:3000'; //for testing locally
            var url = 'https://agilitycms-block-editor-custom-field.vercel.app/'; //uses a hosted, multi-tenanted endpoint for any customer, replace with your own deployed URL if you have your own version
			var iframe = document.createElement('iframe');
			iframe.className = "rt-field";
			iframe.width = '100%';
			iframe.height = '500px';
			iframe.src = url;
			iframe.onload = function() {
				console.log('Block Editor *CMS* => Iframe Loaded')
			}
			options.$elem.html(iframe);

			var referenceName = ContentManager.ViewModels.Navigation.TopStackItem().item().ContentView().ReferenceName();

			window.addEventListener("message", function (e) {

				var messageType = e.data.type

				switch (messageType) {
					case 'fieldIsReady':
						var config = ContentManager.ViewModels.Navigation.globalConfig();
						console.log('Block Editor *CMS* => Sending Auth and fieldValue message');
						iframe.contentWindow.postMessage({
							message: {
								auth: {
									guid: config.Guid,
									websiteName: config.WebsiteName,
									securityKey: config.SecurityKey,
									languageCode: ContentManager.ViewModels.Navigation.currentLanguageCode(),
									location: 'USA', //or CANADA
								},
								fieldValue: ko.unwrap(options.fieldBinding),
								custom: {
									assetFolder: '/block-editor/' + referenceName.toLowerCase()
								}
							},
							type: 'setInitialProps'
						}, url)

						break
					case 'setNewValueFromCustomField':
						options.fieldBinding(e.data.message);
						break;
					case 'setHeightCustomField':
						iframe.height = e.data.message + "px"
						break;

					default:
						//do nothing...
						console.log("not handled", e.data)
				}


			}, false);

		}

    }
}

ContentManager.Global.CustomInputFormFields.push(new BlockEditorCustomField());
```



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
