;(function(window, document, undefined){

    'use strict';

    /**
     * Name-spacing
     */
    window.Site = {
        basePath: document.body.getAttribute('data-base-url'),
        userAgent: navigator.userAgent,
        platform: navigator.platform
    };

}(window, document));
