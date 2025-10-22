# Agility CMS Apps SDK v2 - Example Application

This is a comprehensive example application that demonstrates all the capabilities of the Agility Apps SDK v2. It showcases how to build custom applications that integrate with Agility CMS across multiple surfaces including fields, sidebars, modals, and dashboards.

## Overview

This example app is built with Next.js and TypeScript, demonstrating best practices for building Agility CMS applications using the v2 SDK (`@agility/app-sdk`).

## Features Demonstrated

### 1. Custom Fields ([pages/fields.tsx](pages/fields.tsx))

The custom field implementation shows how to:

-   Initialize a custom field using `useAgilityAppSDK()`
-   Access field and content item data
-   Auto-resize the field height using `useResizeHeight()`
-   Listen to field value changes with `addFieldListener()` and `removeFieldListener()`
-   Update field values programmatically
-   Open asset selection dialogs
-   Open modals from within fields
-   Get the current content item data

**Key Features:**

```typescript
- useAgilityAppSDK() - Access field, contentItem, locale, and initialization state
- useResizeHeight() - Automatically adjust field height
- contentItemMethods.addFieldListener() - Listen to changes in other fields
- contentItemMethods.removeFieldListener() - Remove field listeners
- contentItemMethods.getContentItem() - Retrieve current content item
- contentItemMethods.saveContentItem() - Save the content item
- assetsMethods.selectAssets() - Open asset selector
- openModal() - Open a modal dialog
```

### 2. Content Item Sidebar ([pages/content-item-sidebar.tsx](pages/content-item-sidebar.tsx))

Demonstrates sidebar functionality for content items:

-   Access the current content item
-   Add/remove field value listeners
-   Save content items
-   Select assets
-   Open modals with callbacks

**Key Methods:**

```typescript
;-contentItemMethods.saveContentItem() -
	contentItemMethods.addFieldListener({ fieldName, onChange }) -
	contentItemMethods.removeFieldListener({ fieldName }) -
	contentItemMethods.getContentItem() -
	assetsMethods.selectAssets({ title, singleSelectOnly, callback })
```

### 3. Content List Sidebar ([pages/content-list-sidebar.tsx](pages/content-list-sidebar.tsx))

Shows how to work with content lists:

-   Monitor selected items in the list
-   Refresh the content list
-   Add/remove selection change listeners
-   Select assets from the sidebar

**Key Methods:**

```typescript
- refresh() - Refresh the content list
- contentItemMethods.addSelectedItemsListener({ onChange })
- contentItemMethods.removeSelectedItemsListener()
```

### 4. Page Sidebar ([pages/page-sidebar.tsx](pages/page-sidebar.tsx))

Demonstrates page-level operations:

-   Get current page item data
-   Access page properties
-   Select assets
-   Open modals

**Key Methods:**

```typescript
- pageMethods.getPageItem() - Get the current page data
```

### 5. Dashboards

#### Home Dashboard ([pages/home-dashboard.tsx](pages/home-dashboard.tsx))

#### Pages Dashboard ([pages/pages-dashboard.tsx](pages/pages-dashboard.tsx))

Shows common dashboard functionality:

-   Access app configuration
-   Display locale and initialization state
-   Select assets
-   Open modals with callbacks

**Key Features:**

```typescript
- useAgilityAppSDK() - Access locale, appInstallContext
- configMethods.getConfigValue() - Get configuration values
- assetsMethods.selectAssets()
- openModal({ title, name, props, callback })
```

### 6. Modals ([pages/modals/example-modal.tsx](pages/modals/example-modal.tsx))

Demonstrates modal functionality:

-   Access modal props passed from the caller
-   Close modal with return values
-   Handle OK/Cancel actions

**Key Methods:**

```typescript
- useAgilityAppSDK() - Access modalProps
- closeModal(result) - Close modal and return data to caller
```

### 7. Flyout ([pages/flyout.tsx](pages/flyout.tsx))

Shows flyout implementation:

-   Access app install context
-   Instance information
-   Asset selection within flyouts

### 8. OAuth Integration ([pages/oauth/agility-api-offline.tsx](pages/oauth/agility-api-offline.tsx))

Demonstrates OAuth flow for Agility API offline access:

-   Handle OAuth authorization
-   Exchange authorization code for access token
-   Redirect handling

### 9. Installation Flow ([pages/install.tsx](pages/install.tsx))

Shows pre-installation handling:

-   Use `useAgilityPreInstall()` hook
-   Set extra configuration values
-   Complete installation process

**Key Methods:**

```typescript
- useAgilityPreInstall() - Access install context
- setExtraConfigValues() - Set additional config during install
```

## Common Hooks and Utilities

### `useAgilityAppSDK()`

The primary hook for accessing SDK functionality:

-   `initializing` - Boolean indicating SDK initialization state
-   `locale` - Current locale
-   `field` - Field information (for custom fields)
-   `contentItem` - Current content item data
-   `pageItem` - Current page data
-   `modalProps` - Props passed to modals
-   `appInstallContext` - App installation context

### `useResizeHeight()`

Automatically adjusts the iframe height to fit content:

```typescript
const ref = useResizeHeight()
return <div ref={ref}>Content</div>
```

### Asset Selection

```typescript
assetsMethods.selectAssets({
	title: "Select Assets",
	singleSelectOnly: false,
	callback: (selectedAssets) => {
		// Handle selected assets
	}
})
```

### Modal Management

```typescript
openModal({
	title: "Modal Title",
	name: "modal-name",
	props: {
		/* data to pass */
	},
	callback: (result) => {
		// Handle modal result
	}
})

// In modal:
closeModal({
	/* return data */
})
```

### Content Item Methods

```typescript
// Get current content item
const item = await contentItemMethods.getContentItem()

// Save content item
await contentItemMethods.saveContentItem()

// Listen to field changes
await contentItemMethods.addFieldListener({
	fieldName: "Title",
	onChange: (value) => console.log(value)
})

// Remove listener
await contentItemMethods.removeFieldListener({ fieldName: "Title" })
```

## Running This App Locally

1. Clone the repository
2. Navigate to the `example-sdk-v2` folder
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the development server:
    ```bash
    npm run dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## App Definition

The app definition is available at `/.well-known/agility-app.json` which defines:

-   App metadata (name, version, description)
-   Configuration values
-   Available surfaces (fields, sidebars, dashboards, modals)
-   OAuth configuration

## Deploying This App

1. Deploy to a static host such as **Vercel** or **Netlify**
2. Register the app within Agility CMS in your Organization (you must be an Organization Admin)
3. Install the app in your instance(s)

## Learn More

-   [Agility CMS Apps Documentation](https://agilitycms.com/docs/apps)
-   [Agility Apps SDK v2 Documentation](https://github.com/agility/agility-cms-app-sdk)
-   [Next.js Documentation](https://nextjs.org/docs)

## File Structure

```
pages/
  ├── fields.tsx                    # Custom field example
  ├── content-item-sidebar.tsx      # Content item sidebar
  ├── content-list-sidebar.tsx      # Content list sidebar
  ├── page-sidebar.tsx              # Page sidebar
  ├── home-dashboard.tsx            # Home dashboard
  ├── pages-dashboard.tsx           # Pages dashboard
  ├── flyout.tsx                    # Flyout example
  ├── install.tsx                   # Pre-installation screen
  ├── modals/
  │   └── example-modal.tsx         # Modal example
  └── oauth/
      └── agility-api-offline.tsx   # OAuth flow
components/
  └── CommonDashboard.tsx            # Shared dashboard component

```

## Key Takeaways

This example demonstrates:

-   ✅ All SDK surfaces (fields, sidebars, dashboards, modals, flyouts)
-   ✅ All major hooks (`useAgilityAppSDK`, `useResizeHeight`, `useAgilityPreInstall`)
-   ✅ Content item manipulation
-   ✅ Field value listeners
-   ✅ Asset selection
-   ✅ Modal workflows
-   ✅ OAuth integration
-   ✅ Configuration management
-   ✅ TypeScript best practices
