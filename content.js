// Inform the background page that
// this tab should have a page-action.
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
});

// todo a list clenaup script


// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        // Collect the necessary data.
        // (For your specific requirements `document.querySelectorAll(...)`
        //  should be equivalent to jquery's `$(...)`.)

        var linkMatches = document.querySelectorAll('a:link:not([href^=javascript])');
        var links = new Array(linkMatches.length);
        var linkArr = new Array(linkMatches.length);
        var textArr = new Array(linkMatches.length);
        var buttonArray = new Array(linkMatches.length);

        for (let i = 0; i < linkMatches.length; i++) {
            links[i] = {
                hash: linkMatches[i].hash,
                host: linkMatches[i].host,
                hostname: linkMatches[i].hostname,
                href: linkMatches[i].href,
                origin: linkMatches[i].origin,
                pathname: linkMatches[i].pathname,
                search: linkMatches[i].search,
                text: linkMatches[i].text,
            };
            linkArr[i] = linkMatches[i].href
            textArr[i] = linkMatches[i].text

        }

        var domInfo = {
            textArr: textArr,
            linkArr: linkArr,
        };

        // Directly respond to the sender (popup),
        // through the specified callback.
        response(domInfo);
    }
});

