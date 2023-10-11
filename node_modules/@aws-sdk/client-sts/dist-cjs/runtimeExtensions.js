"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveRuntimeExtensions = void 0;
const smithy_client_1 = require("@smithy/smithy-client");
const asPartial = (t) => t;
const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = {
        ...asPartial((0, smithy_client_1.getDefaultExtensionConfiguration)(runtimeConfig)),
    };
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return {
        ...runtimeConfig,
        ...(0, smithy_client_1.resolveDefaultRuntimeConfig)(extensionConfiguration),
    };
};
exports.resolveRuntimeExtensions = resolveRuntimeExtensions;
