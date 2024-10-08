chrome.commands.onCommand.addListener((command) => {
    if (command === "copy-query") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            const url = new URL(tab.url);

            // Only run if the tab is on a Google search result page
            if (url.hostname === 'www.google.com') {
                const queryParams = new URLSearchParams(url.search);
                const query = queryParams.get('q');

                console.log(query)

                if (query) {
                    openNewTab(query)
                } else {
                    console.log('No search query found');
                }
            }
        });
    }
});

function openNewTab(query) {
    chrome.tabs.create({
        url: `https://chatgpt.com/?q=${query}`  // Replace with the URL you want to open
    }, function(tab) {
        // Optional: Handle the created tab if needed
        console.log('Opened new tab with ID:', tab.id);
    });
}