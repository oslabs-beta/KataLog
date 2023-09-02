import { STSExtensionConfiguration } from "./extensionConfiguration";
export interface RuntimeExtension {
  configure(clientConfiguration: STSExtensionConfiguration): void;
}
export interface RuntimeExtensionsConfig {
  extensions: RuntimeExtension[];
}
export declare const resolveRuntimeExtensions: (
  runtimeConfig: any,
  extensions: RuntimeExtension[]
) => any;
