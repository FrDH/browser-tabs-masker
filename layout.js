//	Fill checkboxes
const $template = document.querySelector('#website-checkbox');
const _template = $template.innerHTML;
const $result = document.createElement('div');
const _result = '';

Object.keys(BrowserMasker.masks).forEach(key => {
    $result.innerHTML += _template
        .split('{name}')
        .join(key)
        .split('{title}')
        .join(BrowserMasker.masks[key].title.split(' - ')[0].split(' | ')[0])
        .split('{icon}')
        .join(BrowserMasker.masks[key].favicon);
});

$template.after($result);
$template.remove();

// 	Read and store bookmarklet
let _bookmarklet = '';
const $bookmarklet = document.querySelector('#bookmarklet');

const createBookmarklet = () => {
    const __browsermasks = Array.prototype.slice
        .call($result.querySelectorAll(':checked'))
        .map(checkbox => checkbox.name);

    let bookmark = 'javascript:(() => { window.__browsermasks = ';
    if (__browsermasks.length) {
        bookmark += '["' + __browsermasks.join('", "') + '"]';
    } else {
        bookmark += 'undefined';
    }

    bookmark += '; ' + _bookmarklet + ' })();';

    $bookmarklet.setAttribute('href', bookmark);
};

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        _bookmarklet = xhr.responseText
            .split('\t')
            .join(' ')
            .split('\n')
            .join(' ')
            .split('\r')
            .join(' ');

        while (_bookmarklet.indexOf('  ') > -1) {
            _bookmarklet = _bookmarklet.split('  ').join(' ');
        }

        document.body.classList.add('has-bookmarklet');
        createBookmarklet();

        $result.addEventListener('change', e => {
            createBookmarklet();
        });
    }
};
xhr.open('GET', 'bookmarklet.js', true);
xhr.send();
