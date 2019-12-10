if (!window.__browsermasker) {
    const $script = document.createElement('script');
    $script.src = 'https://www.frebsite.nl/browser-masker/browser-masker.js';
    $script.onload = () => {
        window.__browsermasker = new BrowserMasker(window.__browsermasks);

        /*  Focus on the window. */
        window.focus();

        /*  Mask the page on blur. */
        window.addEventListener('blur', () => {
            window.__browsermasker.mask();
        });

        /*  Unmask of focus. */
        window.addEventListener('focus', () => {
            window.__browsermasker.unmask();
        });
    };

    document.body.appendChild($script);
}
