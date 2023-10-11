"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDeprecatedPropsWarning = void 0;

const buildDeprecatedPropsWarning = message => {
  let alreadyWarned = false;

  if (process.env.NODE_ENV === 'production') {
    return () => {};
  }

  const cleanMessage = Array.isArray(message) ? message.join('\n') : message;
  return deprecatedProps => {
    const deprecatedKeys = Object.entries(deprecatedProps).filter(([, value]) => value !== undefined).map(([key]) => `- ${key}`);

    if (!alreadyWarned && deprecatedKeys.length > 0) {
      alreadyWarned = true;
      console.warn([cleanMessage, 'deprecated props observed:', ...deprecatedKeys].join('\n'));
    }
  };
};

exports.buildDeprecatedPropsWarning = buildDeprecatedPropsWarning;