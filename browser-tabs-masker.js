/**
 * Quickly mask your opened tabs when leaving the page.
 * Really handy when your boss (girl)friend suddenly walks into the room
 * and you are doing something he or she shouldn't see (you know, when you're buying them a gift).
 */

/** HTMLElement for the <head> */
const $head = document.querySelector('head');

/** Array of available masks */
const masks = {
    //  Misc
    google: {
        title: 'Google',
        favicon: '//www.google.com/favicon.ico'
    },
    yahoo: {
        title: 'Yahoo',
        favicon: '//s.yimg.com/rz/l/favicon.ico'
    },
    apple: {
        title: 'Apple',
        favicon: '//www.apple.com/favicon.ico'
    },

    //  Social
    linkedin: {
        title: 'LinkedIn',
        favicon: '//www.linkedin.com/favicon.ico'
    },
    facebook: {
        title: 'Facebook',
        favicon: '//static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico'
    },
    twitter: {
        title: 'Twitter',
        favicon: '//abs.twimg.com/favicons/favicon.ico'
    },
    instagram: {
        title: 'Instagram',
        favicon: '//www.instagram.com/favicon.ico'
    },

    //  News
    cnn: {
        title: 'CNN International - Breaking News',
        favicon: '//edition.cnn.com/favicon.ico'
    },
    bbc: {
        title: 'BBC - Homepage',
        favicon: '//www.bbc.com/favicon.ico'
    },
    foxnews: {
        title: 'Fox News - Breaking News',
        favicon:
            '//static.foxnews.com/static/orion/styles/img/fox-news/favicons/favicon.ico'
    },
    googlenews: {
        title: 'Google News',
        favicon: '//ssl.gstatic.com/gnews/logo/google_news_192.png'
    },

    //  Development
    github: {
        title: 'GitHub',
        favicon: '//github.com/favicon.ico'
    },
    bitbucket: {
        title: 'Bitbucket | The Git solution for professional teams',
        favicon: '//bitbucket.org/favicon.ico'
    },
    mdn: {
        title: 'MDN Web Docs',
        favicon: '//developer.mozilla.org/favicon.ico'
    },
    stackoverflow: {
        title: 'Stack Overflow',
        favicon: '//stackoverflow.com/favicon.ico'
    }
};

/** The selected mask */
const mask = 'google';

/** Factory for masking and unmasking the <title> */
const title = (() => {
    /** HTMLElement for the <title> */
    const $title = $head.querySelector('title');

    /** Original contents of the <title> */
    const _title = $title.innerHTML;

    /** Contents of the <title> when tab is masked */
    const _maskTitle = masks[mask].title;

    return {
        mask: () => {
            $title.innerHTML = _maskTitle;
        },
        unmask: () => {
            $title.innerHTML = _title;
        }
    };
})();

/** Factory for masking and unmasking the favicon <link> */
const favicon = (() => {
    /** HTMLElement for the favicon <link> */
    let $icon = $head.querySelector('link[rel*="shortcut"]');
    if (!$icon) {
        $icon = document.createElement('link');
        $icon.setAttribute('rel', 'shortcut icon');
        $icon.setAttribute('type', 'images/ico');
        $icon.setAttribute('href', '/favicon.ico');
    }

    /** Original URL for the favicon <link> */
    const _icon = $icon.getAttribute('href');

    /** URL for the favicon <link> when tab is masked */
    const _maskIcon = masks[mask].favicon;

    return {
        mask: () => {
            $icon.setAttribute('href', _maskIcon);
            $head.appendChild($icon);
        },
        unmask: () => {
            $icon.setAttribute('href', _icon);
            $head.appendChild($icon);
        }
    };
})();

/** Factory for masking and unmasking HTML in the <body> */
const html = (() => {
    /** Classname to hide all HTML */
    const classname = 'tabs-masked';

    /** HTMLElement for <style> */
    const $style = document.createElement('style');

    $style.innerHTML = `
body.${classname} {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
}`;

    $head.appendChild($style);

    return {
        mask: () => {
            document.body.classList.add(classname);
        },
        unmask: () => {
            document.body.classList.remove(classname);
        }
    };
})();

//  On blur: Replace original title and icon[href] with masked ones.
window.addEventListener('blur', () => {
    title.mask();
    favicon.mask();
    html.mask();

    //  TODO: eerst checken welke niet gemute zijn en die onFocus weer unmuten?
    Array.prototype.slice
        .call(document.querySelectorAll('audio, video'))
        .forEach(audio => {
            audio.muted = true;
        });
});

//  On focus: Replace masked title and icon[href] with original ones.
window.addEventListener('focus', () => {
    title.unmask();
    favicon.unmask();
    html.unmask();
});
