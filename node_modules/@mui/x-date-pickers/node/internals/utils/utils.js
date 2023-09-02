"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayIncludes = arrayIncludes;
exports.onSpaceOrEnter = exports.getActiveElement = exports.executeInTheNextEventLoopTick = exports.doNothing = void 0;

/* Use it instead of .includes method for IE support */
function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(item => array.indexOf(item) !== -1);
  }

  return array.indexOf(itemOrItems) !== -1;
}

const onSpaceOrEnter = (innerFn, onFocus) => event => {
  if (event.key === 'Enter' || event.key === ' ') {
    innerFn(event); // prevent any side effects

    event.preventDefault();
    event.stopPropagation();
  }

  if (onFocus) {
    onFocus(event);
  }
};

exports.onSpaceOrEnter = onSpaceOrEnter;

const executeInTheNextEventLoopTick = fn => {
  setTimeout(fn, 0);
};

exports.executeInTheNextEventLoopTick = executeInTheNextEventLoopTick;

const doNothing = () => {}; // https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/


exports.doNothing = doNothing;

const getActiveElement = (root = document) => {
  const activeEl = root.activeElement;

  if (!activeEl) {
    return null;
  }

  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }

  return activeEl;
};

exports.getActiveElement = getActiveElement;