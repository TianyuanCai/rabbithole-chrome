function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

// Update the relevant fields with the new data.
const setDOMInfo = info => {
    for (let i = 0; i < info.textArr.length; i++) {
        var btn = document.createElement("button");
        btn.textContent = info.textArr[i];
        btn.addEventListener("click", function () {
            openInNewTab(info.linkArr[i].toString())
        });
        document.body.appendChild(btn);
    }
};

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'DOMInfo'},
            // ...also specifying a callback to be called
            //    from the receiving end (content script).
            setDOMInfo);
    });
});
