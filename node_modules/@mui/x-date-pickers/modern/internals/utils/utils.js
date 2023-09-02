/* Use it instead of .includes method for IE support */
export function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(item => array.indexOf(item) !== -1);
  }

  return array.indexOf(itemOrItems) !== -1;
}
export const onSpaceOrEnter = (innerFn, onFocus) => event => {
  if (event.key === 'Enter' || event.key === ' ') {
    innerFn(event); // prevent any side effects

    event.preventDefault();
    event.stopPropagation();
  }

  if (onFocus) {
    onFocus(event);
  }
};
export const executeInTheNextEventLoopTick = fn => {
  setTimeout(fn, 0);
};
export const doNothing = () => {}; // https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/

export const getActiveElement = (root = document) => {
  const activeEl = root.activeElement;

  if (!activeEl) {
    return null;
  }

  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }

  return activeEl;
};