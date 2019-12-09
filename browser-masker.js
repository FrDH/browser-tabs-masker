/**
 * POC
 * Quickly mask your opened window when leaving the page.
 * Really handy when your boss or (girl)friend suddenly walks into the room
 * and you are doing something he or she shouldn't see
 * (you know, like when you're buying them a gift).
 */

class BrowserMasker {
    /**
     * Create the tabs masker
     * @param {array} [masks] The preferred masks.
     */
    constructor(masks = Object.keys(BrowserMasker.masks)) {
        /** The selected mask */
        this.masker =
            BrowserMasker.masks[
                masks[Math.floor(Math.random() * masks.length)]
            ];

        /** HTMLElement for the <head> */
        this.$head = document.querySelector('head');

        /** Object with mask/unmask function for the <title> */
        this.title = this._title();

        /** Object with mask/unmask function for the favicon <link> */
        this.favicon = this._favicon();

        /** Object with mask/unmask function for HTML in the <body> */
        this.html = this._html();
    }

    /** Mask the page */
    mask() {
        this.title.mask();
        this.favicon.mask();
        this.html.mask();

        //  Mute all audio and video(?)
        Array.prototype.slice
            .call(document.querySelectorAll('audio, video'))
            .forEach(audio => {
                audio.muted = true;
            });
    }

    /** Unmask the page */
    unmask() {
        this.title.unmask();
        this.favicon.unmask();
        this.html.unmask();
    }

    /** Factory for masking and unmasking the <title> */
    _title() {
        /** HTMLElement for the <title> */
        const $title = this.$head.querySelector('title');

        /** Original contents of the <title> */
        const _title = $title.innerHTML;

        /** Contents of the <title> when tab is masked */
        const _maskTitle = this.masker.title;

        return {
            mask: () => {
                $title.innerHTML = _maskTitle;
            },
            unmask: () => {
                $title.innerHTML = _title;
            }
        };
    }

    /** Factory for masking and unmasking the favicon <link> */
    _favicon() {
        /** HTMLElement for the favicon <link> */
        let $icon = this.$head.querySelector('link[rel*="shortcut"]');
        if (!$icon) {
            $icon = document.createElement('link');
            $icon.setAttribute('rel', 'shortcut icon');
            $icon.setAttribute('type', 'images/ico');
            $icon.setAttribute('href', '/favicon.ico');
        }

        /** Original URL for the favicon <link> */
        const _icon = $icon.getAttribute('href');

        /** URL for the favicon <link> when tab is masked */
        const _maskIcon = this.masker.favicon;

        return {
            mask: () => {
                $icon.setAttribute('href', _maskIcon);
                this.$head.appendChild($icon);
            },
            unmask: () => {
                $icon.setAttribute('href', _icon);
                this.$head.appendChild($icon);
            }
        };
    }

    /** Factory for masking and unmasking HTML in the <body> */
    _html() {
        /** Classname to hide all HTML */
        const classname = 'browser-masked';

        /** HTMLElement for <style> */
        const $style = document.createElement('style');

        $style.innerHTML = `
            body.${classname} {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
            }`;

        this.$head.appendChild($style);

        return {
            mask: () => {
                document.body.classList.add(classname);
            },
            unmask: () => {
                document.body.classList.remove(classname);
            }
        };
    }
}

/** Array of available masks */
BrowserMasker.masks = {
    //  Misc
    google: {
        title: 'Google',
        favicon: 'https://www.google.com/favicon.ico'
    },
    yahoo: {
        title: 'Yahoo',
        favicon: 'https://s.yimg.com/rz/l/favicon.ico'
    },
    apple: {
        title: 'Apple',
        favicon: 'https://www.apple.com/favicon.ico'
    },

    //  Social
    linkedin: {
        title: 'LinkedIn',
        favicon: 'https://www.linkedin.com/favicon.ico'
    },
    facebook: {
        title: 'Facebook',
        favicon: 'https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico'
    },
    twitter: {
        title: 'Twitter',
        favicon: 'https://abs.twimg.com/favicons/favicon.ico'
    },
    instagram: {
        title: 'Instagram',
        favicon: 'https://www.instagram.com/favicon.ico'
    },

    //  News
    cnn: {
        title: 'CNN International - Breaking News',
        favicon: 'https://edition.cnn.com/favicon.ico'
    },
    bbc: {
        title: 'BBC - Homepage',
        favicon: 'https://www.bbc.com/favicon.ico'
    },
    foxnews: {
        title: 'Fox News - Breaking News',
        favicon:
            'https://static.foxnews.com/static/orion/styles/img/fox-news/favicons/favicon.ico'
    },
    googlenews: {
        title: 'Google News',
        favicon: 'https://ssl.gstatic.com/gnews/logo/google_news_192.png'
    },

    //  Development
    github: {
        title: 'GitHub',
        favicon: 'https://github.com/favicon.ico'
    },
    bitbucket: {
        title: 'Bitbucket | The Git solution for professional teams',
        favicon: 'https://bitbucket.org/favicon.ico'
    },
    mdn: {
        title: 'MDN Web Docs',
        favicon: 'https://developer.mozilla.org/favicon.ico'
    },
    stackoverflow: {
        title: 'Stack Overflow',
        favicon: 'https://stackoverflow.com/favicon.ico'
    }
};
