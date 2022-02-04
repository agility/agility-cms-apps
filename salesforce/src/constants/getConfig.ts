interface FieldType {
  APP_LOCATION_CUSTOM_FIELD: string, 
  APP_LOCATION_FLYOUT: string
}

export default function getConfig(types: FieldType ) {
  return {
    name: "Salesforce",
    version: "1.0.0",
    documentationLink: "https://agilitycms.com/docs/developers/salesforce",
    configValues: [
      { name: "leadOID", label: "Salesforce Lead OID", type: "string" },
    ],
    appComponents: [
      {
        location: types.APP_LOCATION_CUSTOM_FIELD,
        label: `Salesforce Form`,
        name: `SalesforceForm`,
        componentToRender: `SalesforceForm`,
      },
    ],
    configPage: 'AppConfig',
  } as const
};