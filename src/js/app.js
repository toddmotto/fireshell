'use strict';

global.Site = {
    basePath: document.body.getAttribute('data-base-url'),
    userAgent: navigator.userAgent,
    platform: navigator.platform
};
