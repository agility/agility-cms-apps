import { useState, useEffect, MutableRefObject } from "react"
import agilityAppSDK from "@agility/app-sdk";

interface ConfigValues {
  accessToken: string
}

interface FieldSDKProps {
  value: string,
  label: string,
  required: boolean,
  description: string,
  readonly: boolean,
}

/**
 * There are other fields defined, but for the purposes of this useEffect, 
 * I defined the ones in use
 */
interface SDKProps {
  field: FieldSDKProps,
  configValues: ConfigValues,
  updateFieldValue: (data: { fieldValue: string }) => void
}

/**
 * useSDK
 *  Hook that calls the agilityAppSDK and fetches the field values
 *  for the initialized app
 * @param containerRef 
 * @returns a set of readonly values
 */
const useSDK = (containerRef : MutableRefObject<HTMLElement>): readonly [ 
  value: string,
  fieldConfig: FieldSDKProps,
  configValues: ConfigValues,
  sdk: SDKProps,
  setValue: (value: string) => void
] => {
  const [value, setValue] = useState("");
  const [fieldConfig, setFieldConfig] = useState<FieldSDKProps>(null);
  const [configValues, setConfigValues] = useState<ConfigValues>(null);
  const [sdk, setSDK] = useState<SDKProps>(null);

  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
      console.log(fieldSDK)
      setSDK(fieldSDK);
      setValue(fieldSDK.field.value);
      setConfigValues(fieldSDK.configValues);
      setFieldConfig(fieldSDK.field);
    });
  }, []);

  return [ 
    value, 
    fieldConfig, 
    configValues, 
    sdk, 
    setValue
  ] as const // freezes value - these will now be immutable objects.
}

export default useSDK