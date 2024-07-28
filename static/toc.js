const toc = document.querySelector('#text-table-of-contents');
const tocItems = Array.from(document.querySelectorAll('#text-table-of-contents a'));
const content = document.querySelector('#content');
const tocItemsArray = Array.from(tocItems);

window.addEventListener('scroll', throttle(highlightTocItem, 300));
window.addEventListener('load', throttle(highlightTocItem, 300));

function highlightTocItem() {
    const currentPosition = window.scrollY;
    let minDistance = Number.MAX_SAFE_INTEGER;
    let closestTocItem = null;

    for (const item of tocItemsArray) {
        const hash = item.getAttribute('href');
        const target = document.querySelector(hash);
        if (target) {
            const distance = Math.abs(currentPosition - target.offsetTop);
            if (distance < minDistance) {
                minDistance = distance;
                closestTocItem = item;
            }
        }
    }

    const toc_rect = toc.getBoundingClientRect();
    const content_rect = content.getBoundingClientRect();
    const isAlone = (toc_rect.x < content_rect.x);

    if (!isAlone) {
        closestTocItem = null;
    }

    tocItems.forEach(item => item.classList.remove('active'));
    closestTocItem?.classList.add('active');
    closestTocItem?.scrollIntoView();
}

function throttle(fn, delay) {
    let timer = null;
    let lastCall = 0;

    return function() {
        const now = Date.now();
        const remainingTime = delay - (now - lastCall);

        if (remainingTime <= 0) {
            fn.apply(this, arguments);
            lastCall = now;
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                lastCall = now;
            }, remainingTime);
        }
    };
}