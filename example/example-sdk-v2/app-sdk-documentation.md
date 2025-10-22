# Agility Apps SDK v2 - Complete Reference

The Agility Apps SDK v2 (`@agility/app-sdk`) enables developers to build powerful custom applications that extend and integrate with Agility CMS. This SDK provides a comprehensive set of tools for creating custom fields, sidebars, dashboards, modals, and other interactive components within the Agility CMS interface.

**Important**: Your app doesn't need to implement all surfaces. You can create an app that provides just a single custom field, or only a sidebar, or any combination of surfaces that meets your needs. The SDK is designed to be flexible—implement only what you need.

## Table of Contents

-   [App Definition File](#app-definition-file)
-   [SDK Surfaces](#sdk-surfaces)
    -   [Custom Fields](#custom-fields)
    -   [Sidebars](#sidebars)
    -   [Dashboards](#dashboards)
    -   [Modals](#modals)
    -   [Custom Sections](#custom-sections)
    -   [Custom Items](#custom-items)
    -   [Flyouts](#flyouts)
-   [Core Hooks](#core-hooks)
-   [SDK Methods](#sdk-methods)
-   [Installation & Configuration](#installation--configuration)
-   [OAuth Integration](#oauth-integration)

---

## App Definition File

Every Agility App must include an app definition file located at `/.well-known/agility-app.json`. This JSON file defines the metadata, capabilities, configuration values, and surfaces that your app provides.

**You only need to define the surfaces your app actually implements.** If you're building a simple custom field, you only need to include the `fields` capability. If you're building a dashboard, you only need the relevant dashboard capability. The example below shows all possible capabilities, but your app can include just one or a subset of these.

### Structure

```json
{
	"name": "Example App - SDK v2",
	"documentationLink": "https://github.com/agility/agility-cms-apps",
	"description": "An Example App to show what the Agility App SDK V2 is capable of.",
	"version": "1.0.0",
	"__sdkVersion": "2.0.0",
	"configValues": [
		{
			"label": "Config Value 1",
			"name": "configValue1",
			"type": "string"
		}
	],
	"connections": [
		{
			"name": "Agility API Offline Access",
			"icon": "https://cdn.aglty.io/content-manager/images/logo-triangle-only-yellow.svg",
			"url": "/oauth/agility-api-offline"
		}
	],
	"capabilities": {
		"fields": [
			{
				"name": "example-field",
				"label": "Example Field",
				"description": "An example field that shows a custom UI."
			}
		],
		"modals": [
			{
				"name": "example-modal",
				"label": "Example Modal Dialog",
				"description": "An example modal dialog."
			}
		],
		"contentListSidebar": {
			"description": "Shows example data or ui that could be useful on a content list."
		},
		"contentItemSidebar": {
			"description": "Shows example data or ui that could be useful on a content item."
		},
		"pageSidebar": {
			"description": "Shows example data or ui that could be useful on a page."
		},
		"homeDashboard": {
			"description": "Shows data and analytics relevant to the entire site."
		},
		"contentDashboard": {
			"description": "Shows data and analytics relevant to the Content section."
		},
		"pagesDashboard": {
			"description": "Shows data and analytics relevant to the Pages section."
		},
		"sections": [
			{
				"name": "customsection",
				"label": "Custom Section 1",
				"description": "A custom section."
			}
		],
		"items": [
			{
				"name": "customitem",
				"label": "Custom Item 1",
				"description": "A custom item."
			}
		],
		"installScreen": true,
		"uninstallHook": "/api/app-uninstall"
	}
}
```

### Key Properties

-   **name**: The display name of your app
-   **version**: Your app's version number
-   **\_\_sdkVersion**: The SDK version your app is built with (should be "2.0.0")
-   **configValues**: Configuration values that can be set during app installation
-   **connections**: OAuth or external service connections
-   **capabilities**: Defines all the surfaces your app provides (include only what you need)
-   **installScreen**: Whether to show a custom installation screen
-   **uninstallHook**: API endpoint called when the app is uninstalled

### Simple App Examples

You don't need to include all capabilities. Here are some minimal examples:

**Just a Custom Field**:

```json
{
	"name": "My Custom Field",
	"version": "1.0.0",
	"__sdkVersion": "2.0.0",
	"capabilities": {
		"fields": [
			{
				"name": "my-field",
				"label": "My Custom Field",
				"description": "A custom field for editing content."
			}
		]
	}
}
```

**Just a Content Item Sidebar**:

```json
{
	"name": "Content Helper",
	"version": "1.0.0",
	"__sdkVersion": "2.0.0",
	"capabilities": {
		"contentItemSidebar": {
			"description": "Provides helpful information when editing content."
		}
	}
}
```

**Just a Dashboard**:

```json
{
	"name": "Analytics Dashboard",
	"version": "1.0.0",
	"__sdkVersion": "2.0.0",
	"capabilities": {
		"homeDashboard": {
			"description": "Shows analytics for your site."
		}
	}
}
```

---

## SDK Surfaces

The following sections describe all available surfaces. **Remember: you only need to implement the surfaces that make sense for your app.**

### Custom Fields

Custom fields allow you to create entirely custom UI components for content editing. Fields can be configured on any content definition and provide a custom editing experience.

**Location**: `/app/fields/{field-name}/page.tsx`

**Example**:

```typescript
"use client"

import { useAgilityAppSDK, contentItemMethods, useResizeHeight } from "@agility/app-sdk"

export default function ExampleField() {
	const { initializing, appInstallContext, fieldValue } = useAgilityAppSDK()
	const containerRef = useResizeHeight(10)

	if (initializing) return null

	return (
		<div>
			<div ref={containerRef}>
				<textarea
					className="w-full rounded border border-gray-300 p-4"
					value={fieldValue as string}
					onChange={(e) => contentItemMethods.setFieldValue({ value: e.target.value })}
				/>
			</div>
		</div>
	)
}
```

**Key Capabilities**:

-   Access current field value via `fieldValue`
-   Update field value with `contentItemMethods.setFieldValue()`
-   Auto-resize field height using `useResizeHeight()`
-   Access parent content item with `contentItem`
-   Listen to other field changes with `contentItemMethods.addFieldListener()`
-   Open asset selector with `assetsMethods.selectAssets()`
-   Open modals with `openModal()`

**App Definition**:

```json
"fields": [
  {
    "name": "example-field",
    "label": "Example Field",
    "description": "An example field that shows a custom UI."
  }
]
```

---

### Sidebars

Sidebars provide contextual information and actions alongside different areas of the Agility CMS interface.

#### Content Item Sidebar

Appears when editing a specific content item.

**Location**: `/app/content-item-sidebar/page.tsx`

**Example**:

```typescript
"use client"

import { contentItemMethods, openModal, useAgilityAppSDK, assetsMethods } from "@agility/app-sdk"
import { useEffect, useState } from "react"

export default function ContentItemSidebar() {
	const { initializing, locale, contentItem } = useAgilityAppSDK()
	const [heading, setHeading] = useState()

	useEffect(() => {
		setHeading(contentItem?.values.Heading)
	}, [contentItem, contentItem?.values.Heading])

	return (
		<div>
			<p>Heading: {heading}</p>
			<button
				onClick={async () => {
					await contentItemMethods.saveContentItem()
				}}
			>
				Save
			</button>
			<button
				onClick={async () => {
					await contentItemMethods.addFieldListener({
						fieldName: "Heading",
						onChange: (value) => setHeading(value)
					})
				}}
			>
				Add Field Listener
			</button>
		</div>
	)
}
```

**Key Capabilities**:

-   Access current content item via `contentItem`
-   Get full content item data with `contentItemMethods.getContentItem()`
-   Save content item with `contentItemMethods.saveContentItem()`
-   Monitor field changes with `contentItemMethods.addFieldListener()`
-   Select assets with `assetsMethods.selectAssets()`
-   Open modals with `openModal()`

**App Definition**:

```json
"contentItemSidebar": {
  "description": "Shows example data or ui that could be useful on a content item."
}
```

#### Content List Sidebar

Appears when viewing a list of content items.

**Location**: `/app/content-list-sidebar/page.tsx`

**Example**:

```typescript
"use client"

import { openModal, useAgilityAppSDK, contentItemMethods, refresh } from "@agility/app-sdk"
import { useState } from "react"

export default function ContentListSidebar() {
	const { initializing, locale } = useAgilityAppSDK()
	const [selected, setSelectedItems] = useState<any>([])

	return (
		<div>
			<div>Selected: {JSON.stringify(selected)}</div>
			<button onClick={() => refresh()}>Refresh List</button>
			<button
				onClick={async () => {
					contentItemMethods.addSelectedItemListener({
						onChange: (items) => setSelectedItems(items)
					})
				}}
			>
				Add Selection Listener
			</button>
		</div>
	)
}
```

**Key Capabilities**:

-   Monitor selected items with `contentItemMethods.addSelectedItemListener()`
-   Get selected items with `contentItemMethods.getSelectedItems()`
-   Refresh the content list with `refresh()`
-   Remove selection listener with `contentItemMethods.removeSelectedItemListener()`

**App Definition**:

```json
"contentListSidebar": {
  "description": "Shows example data or ui that could be useful on a content list."
}
```

#### Page Sidebar

Appears when editing a page in the Pages section.

**Location**: `/app/page-sidebar/page.tsx`

**Example**:

```typescript
"use client"

import { useAgilityAppSDK, pageMethods, assetsMethods } from "@agility/app-sdk"
import { useState } from "react"

export default function PagesSidebar() {
	const { initializing, locale, pageItem } = useAgilityAppSDK()
	const [page, setPage] = useState<IPageItem | null>()

	return (
		<div>
			<button
				onClick={async () => {
					const pageData = await pageMethods.getPageItem()
					setPage(pageData)
				}}
			>
				Get Page Item
			</button>
			<div>Page: {JSON.stringify(page)}</div>
		</div>
	)
}
```

**Key Capabilities**:

-   Access current page via `pageItem` from the hook
-   Get full page data with `pageMethods.getPageItem()`
-   Select assets with `assetsMethods.selectAssets()`
-   Open modals with `openModal()`

**App Definition**:

```json
"pageSidebar": {
  "description": "Shows example data or ui that could be useful on a page."
}
```

---

### Dashboards

Dashboards provide high-level analytics and actions for different sections of Agility CMS.

#### Home Dashboard

Main dashboard visible on the home screen.

**Location**: `/app/home-dashboard/page.tsx`

#### Content Dashboard

Dashboard visible in the Content section.

**Location**: `/app/content-dashboard/page.tsx`

#### Pages Dashboard

Dashboard visible in the Pages section.

**Location**: `/app/pages-dashboard/page.tsx`

**Common Example**:

```typescript
"use client"

import { useAgilityAppSDK, useResizeHeight, assetsMethods, openModal } from "@agility/app-sdk"

export default function Dashboard() {
	const { initializing, locale, appInstallContext } = useAgilityAppSDK()
	const ref = useResizeHeight()

	return (
		<div ref={ref}>
			<h1>Dashboard</h1>
			<div>Locale: {locale}</div>
			<div>Config: {JSON.stringify(appInstallContext?.configuration)}</div>
			<button
				onClick={() => {
					assetsMethods.selectAssets({
						title: "Select Assets",
						singleSelectOnly: false,
						callback: (assets) => console.log(assets)
					})
				}}
			>
				Select Assets
			</button>
		</div>
	)
}
```

**Key Capabilities**:

-   Access app configuration via `appInstallContext.configuration`
-   Get configuration values with `configMethods.getConfigValue()`
-   Auto-resize dashboard with `useResizeHeight()`
-   Select assets with `assetsMethods.selectAssets()`
-   Open modals with `openModal()`

**App Definition**:

```json
"homeDashboard": {
  "description": "Shows data and analytics relevant to the entire site."
},
"contentDashboard": {
  "description": "Shows data and analytics relevant to the Content section."
},
"pagesDashboard": {
  "description": "Shows data and analytics relevant to the Pages section."
}
```

---

### Modals

Modals are dialog windows that can be opened from any other surface in your app.

**Location**: `/app/modals/{modal-name}/page.tsx`

**Example**:

```typescript
"use client"

import { closeModal, useAgilityAppSDK } from "@agility/app-sdk"

export default function ExampleModal() {
	const { initializing, modalProps } = useAgilityAppSDK()

	if (initializing) return <div>Initializing...</div>

	return (
		<div className="flex h-full flex-col">
			<h2>Example Modal</h2>
			<div className="flex-1">
				<div>Modal Props: {JSON.stringify(modalProps)}</div>
			</div>
			<div className="flex gap-2">
				<button onClick={() => closeModal({ btn: "ok" })}>OK</button>
				<button onClick={() => closeModal({ btn: "cancel" })}>Cancel</button>
			</div>
		</div>
	)
}
```

**Opening a Modal**:

```typescript
openModal({
	title: "Example Modal",
	name: "example-modal",
	props: {
		customData: "value",
		timestamp: new Date()
	},
	callback: (result) => {
		console.log("Modal returned:", result)
	}
})
```

**Key Capabilities**:

-   Access props passed from caller via `modalProps`
-   Close modal and return data with `closeModal(result)`
-   Receive callback when modal closes

**App Definition**:

```json
"modals": [
  {
    "name": "example-modal",
    "label": "Example Modal Dialog",
    "description": "An example modal dialog."
  }
]
```

---

### Custom Sections

Custom sections allow you to create entirely custom page modules that editors can add to pages.

**Location**: `/app/sections/{section-name}/page.tsx`

**Example**:

```typescript
export default function CustomSection() {
	return <div>Custom Section</div>
}
```

**App Definition**:

```json
"sections": [
  {
    "name": "customsection",
    "label": "Custom Section 1",
    "description": "A custom section."
  }
]
```

---

### Custom Items

Custom items provide a completely custom UI for managing content items.

**Location**: `/app/items/{item-name}/page.tsx`

**Example**:

```typescript
export default function CustomItem() {
	return <div>Custom Item</div>
}
```

**App Definition**:

```json
"items": [
  {
    "name": "customitem",
    "label": "Custom Item 1",
    "description": "A custom item."
  }
]
```

---

### Flyouts

Flyouts are small popup interfaces that can be triggered from various locations in Agility CMS.

**Location**: `/app/flyout/page.tsx`

**Example**:

```typescript
"use client"

import { useAgilityAppSDK, assetsMethods } from "@agility/app-sdk"

export default function Flyout() {
	const { initializing, appInstallContext, instance, locale } = useAgilityAppSDK()

	return (
		<div>
			<h1>Flyout</h1>
			<div>Locale: {locale}</div>
			<div>Instance: {JSON.stringify(instance)}</div>
		</div>
	)
}
```

---

## Core Hooks

### `useAgilityAppSDK()`

The primary hook for accessing SDK functionality. Returns different properties depending on the surface.

**Common Properties**:

```typescript
const {
	initializing, // Boolean: SDK initialization state
	locale, // String: Current locale (e.g., "en-us")
	appInstallContext, // Object: App installation context
	instance // Object: Current instance information
} = useAgilityAppSDK()
```

**Field-Specific Properties**:

```typescript
const {
	field, // Object: Field definition
	fieldValue, // Any: Current field value
	contentItem // Object: Parent content item
} = useAgilityAppSDK()
```

**Content Item Sidebar Properties**:

```typescript
const {
	contentItem // Object: Current content item
} = useAgilityAppSDK()
```

**Page Sidebar Properties**:

```typescript
const {
	pageItem // Object: Current page item
} = useAgilityAppSDK()
```

**Modal Properties**:

```typescript
const {
	modalProps // Object: Props passed when opening the modal
} = useAgilityAppSDK()
```

---

### `useResizeHeight()`

Automatically adjusts the iframe height to fit content. Essential for fields and dashboards.

**Usage**:

```typescript
const containerRef = useResizeHeight(10) // 10px padding

return <div ref={containerRef}>Content</div>
```

**Parameters**:

-   `padding` (optional): Additional padding in pixels

---

### `useAgilityPreInstall()`

Used on the installation screen to handle app setup.

**Usage**:

```typescript
import { setExtraConfigValues, useAgilityPreInstall } from "@agility/app-sdk"

export default function Install() {
	const { initializing, appInstallContext, instance, locale } = useAgilityPreInstall()

	return (
		<div>
			<h1>Install Screen</h1>
			<button
				onClick={() => {
					setExtraConfigValues([{ name: "apiKey", value: "xyz123" }])
				}}
			>
				Complete Install
			</button>
		</div>
	)
}
```

**Key Methods**:

-   `setExtraConfigValues(values)`: Set additional configuration values during installation

---

## SDK Methods

### Content Item Methods

```typescript
import { contentItemMethods } from "@agility/app-sdk"

// Get current content item
const item = await contentItemMethods.getContentItem()

// Save content item
await contentItemMethods.saveContentItem()

// Set field value (in custom fields)
contentItemMethods.setFieldValue({ value: "new value" })

// Listen to field changes
await contentItemMethods.addFieldListener({
	fieldName: "Title",
	onChange: (value) => console.log("Title changed:", value)
})

// Remove field listener
await contentItemMethods.removeFieldListener({
	fieldName: "Title"
})

// Get selected items (in content list sidebar)
const selected = await contentItemMethods.getSelectedItems()

// Listen to selection changes (in content list sidebar)
contentItemMethods.addSelectedItemListener({
	onChange: (items) => console.log("Selection changed:", items)
})

// Remove selection listener
contentItemMethods.removeSelectedItemListener()
```

---

### Page Methods

```typescript
import { pageMethods } from "@agility/app-sdk"

// Get current page item
const page = await pageMethods.getPageItem()
```

---

### Assets Methods

```typescript
import { assetsMethods } from "@agility/app-sdk"

// Select assets
assetsMethods.selectAssets({
	title: "Select Images",
	singleSelectOnly: false, // Allow multiple selection
	callback: (selectedAssets) => {
		console.log("Selected:", selectedAssets)
		// selectedAssets is an array of asset objects
	}
})
```

**Asset Object Structure**:

```typescript
{
  mediaID: number,
  url: string,
  label: string,
  fileSize: number,
  // ... other properties
}
```

---

### Modal Methods

```typescript
import { openModal, closeModal } from "@agility/app-sdk"

// Open a modal
openModal({
	title: "My Modal",
	name: "example-modal", // Must match modal name in app definition
	props: {
		// Custom data to pass to modal
		userId: 123,
		action: "edit"
	},
	callback: (result) => {
		// Called when modal closes
		console.log("Modal result:", result)
	}
})

// Close modal (from within the modal)
closeModal({
	success: true,
	data: "some return value"
})
```

---

### Config Methods

```typescript
import { configMethods } from "@agility/app-sdk"

// Get a configuration value
const apiKey = configMethods.getConfigValue("apiKey")
```

---

### Other Methods

```typescript
import { refresh } from "@agility/app-sdk"

// Refresh the current list (in content list sidebar)
refresh()
```

---

## Installation & Configuration

### Pre-Installation Screen

If your app requires setup before installation, enable the installation screen.

**Location**: `/app/install/page.tsx`

**App Definition**:

```json
"installScreen": true
```

**Example**:

```typescript
import { setExtraConfigValues, useAgilityPreInstall } from "@agility/app-sdk"

export default function Install() {
	const { initializing, appInstallContext } = useAgilityPreInstall()

	return (
		<div>
			<h1>Setup Instructions</h1>
			<p>Configure your app settings...</p>
			<button
				onClick={() => {
					setExtraConfigValues([
						{ name: "setting1", value: "value1" },
						{ name: "setting2", value: "value2" }
					])
				}}
			>
				Complete Installation
			</button>
		</div>
	)
}
```

---

### Configuration Values

Define configuration values in your app definition that can be set during installation.

```json
"configValues": [
  {
    "label": "API Key",
    "name": "apiKey",
    "type": "string"
  },
  {
    "label": "Enable Feature",
    "name": "enableFeature",
    "type": "boolean"
  }
]
```

**Accessing Configuration**:

```typescript
const { appInstallContext } = useAgilityAppSDK()
const apiKey = appInstallContext?.configuration?.apiKey
```

---

### Uninstall Hook

Handle app uninstallation cleanup.

**App Definition**:

```json
"uninstallHook": "/api/app-uninstall"
```

**API Route** (`/app/api/app-uninstall/route.ts`):

```typescript
export async function POST(request: Request) {
	const body = await request.json()

	// Clean up resources
	// Delete stored data
	// Revoke tokens

	return new Response("OK", { status: 200 })
}
```

---

## OAuth Integration

### Setting Up OAuth

Apps can integrate with external services using OAuth.

**App Definition**:

```json
"connections": [
  {
    "name": "Agility API Offline Access",
    "icon": "https://cdn.aglty.io/logo.svg",
    "url": "/oauth/agility-api-offline"
  }
]
```

**OAuth Flow** (`/app/oauth/agility-api-offline/page.tsx`):

```typescript
"use client"

import { useEffect } from "react"

export default function AgilityAPI() {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const code = params.get("code")
		const redirect_uri = params.get("redirect_uri")

		if (code) {
			// Exchange code for token
			const formData = new FormData()
			formData.append("code", code)

			fetch("https://mgmt.aglty.io/oauth/token", {
				method: "POST",
				body: formData
			})
				.then((res) => res.text())
				.then((token) => {
					// Redirect back with token
					window.location.href = `${redirect_uri}#${encodeURIComponent(token)}`
				})
		} else {
			// Start OAuth flow
			const authUrl = `https://mgmt.aglty.io/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
				window.location.href
			)}&scope=offline_access`
			window.location.href = authUrl
		}
	}, [])

	return <div>Authenticating...</div>
}
```

---

## TypeScript Types

The SDK provides comprehensive TypeScript types:

```typescript
import type { IContentItem, IPageItem, IAppConfigValue, IAppInstallContext, IField, IAsset } from "@agility/app-sdk"
```

---

## Best Practices

1. **Always check `initializing`**: Wait for SDK initialization before rendering

```typescript
if (initializing) return <div>Loading...</div>
```

2. **Use `useResizeHeight()` for fields and dashboards**: Ensure proper iframe sizing

```typescript
const ref = useResizeHeight()
return <div ref={ref}>...</div>
```

3. **Clean up listeners**: Remove field and selection listeners when component unmounts

```typescript
useEffect(() => {
	return () => {
		contentItemMethods.removeFieldListener({ fieldName: "Title" })
	}
}, [])
```

4. **Handle errors gracefully**: SDK methods may fail, always handle errors

```typescript
try {
	await contentItemMethods.saveContentItem()
} catch (error) {
	console.error("Failed to save:", error)
}
```

5. **Type your components**: Use TypeScript for better development experience

```typescript
const [item, setItem] = useState<IContentItem | null>(null)
```

---

## Complete Example

Here's a complete custom field example demonstrating multiple SDK features:

```typescript
"use client"

import { useAgilityAppSDK, contentItemMethods, useResizeHeight, assetsMethods, openModal } from "@agility/app-sdk"
import { useEffect, useState } from "react"

export default function AdvancedField() {
	const { initializing, fieldValue, contentItem } = useAgilityAppSDK()
	const containerRef = useResizeHeight(10)
	const [relatedTitle, setRelatedTitle] = useState("")

	// Listen to another field
	useEffect(() => {
		contentItemMethods.addFieldListener({
			fieldName: "Title",
			onChange: (value) => setRelatedTitle(value as string)
		})

		return () => {
			contentItemMethods.removeFieldListener({ fieldName: "Title" })
		}
	}, [])

	if (initializing) return null

	const handleSelectAsset = () => {
		assetsMethods.selectAssets({
			title: "Select Image",
			singleSelectOnly: true,
			callback: (assets) => {
				if (assets.length > 0) {
					contentItemMethods.setFieldValue({ value: assets[0].url })
				}
			}
		})
	}

	const handleOpenModal = () => {
		openModal({
			title: "Configure Field",
			name: "field-config-modal",
			props: { currentValue: fieldValue },
			callback: (result) => {
				if (result?.value) {
					contentItemMethods.setFieldValue({ value: result.value })
				}
			}
		})
	}

	return (
		<div ref={containerRef} className="p-4">
			<div className="mb-2">
				<label>Current Value:</label>
				<input
					value={(fieldValue as string) || ""}
					onChange={(e) => contentItemMethods.setFieldValue({ value: e.target.value })}
					className="w-full rounded border p-2"
				/>
			</div>

			<div className="mb-2">
				<p>Related Title: {relatedTitle}</p>
			</div>

			<div className="flex gap-2">
				<button onClick={handleSelectAsset} className="btn">
					Select Asset
				</button>
				<button onClick={handleOpenModal} className="btn">
					Open Modal
				</button>
			</div>
		</div>
	)
}
```

---

## Resources

-   [Agility CMS Apps Documentation](https://agilitycms.com/docs/apps)
-   [Example App Repository](https://github.com/agility/agility-cms-apps/tree/main/example/example-sdk-v2)
-   [Agility Apps SDK on npm](https://www.npmjs.com/package/@agility/app-sdk)

---

## Summary

The Agility Apps SDK v2 provides a comprehensive framework for building custom applications that deeply integrate with Agility CMS. Key capabilities include:

-   ✅ **Custom Fields** - Create custom editing experiences
-   ✅ **Sidebars** - Add contextual information and actions
-   ✅ **Dashboards** - Display analytics and insights
-   ✅ **Modals** - Create reusable dialog components
-   ✅ **Asset Selection** - Integrate with Agility's media library
-   ✅ **Field Listeners** - React to content changes in real-time
-   ✅ **OAuth Integration** - Connect to external services
-   ✅ **TypeScript Support** - Full type safety
-   ✅ **Auto-resizing** - Seamless iframe integration

**Remember**: Your app can be as simple or as complex as you need it to be. You can build:

-   A single custom field for a specific content type
-   A sidebar that provides helpful context for editors
-   A dashboard that displays analytics
-   A comprehensive app with multiple surfaces working together

The SDK is flexible—implement only the surfaces that provide value for your use case. With these tools, you can build powerful extensions that enhance the Agility CMS experience for your editors and content teams.
