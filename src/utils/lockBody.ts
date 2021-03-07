const bodyScrollLock = require('body-scroll-lock');

export const lockBody = () => {
  const body = document && document.querySelector('body');
  if (body) {
    body.classList.add('_hidden');
  }
};

export const unlockBody = () => {
  const body = document && document.querySelector('body');
  if (body) {
    body.classList.remove('_hidden');
  }
};

export const disableBodyScroll = (targetElement: any) => {
  bodyScrollLock.disableBodyScroll(targetElement);
};
export const enableBodyScroll = () => {
  bodyScrollLock.clearAllBodyScrollLocks();
};
