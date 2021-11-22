function initScript() {
    const scraper = new Scraper(window.location.href);
    const scrapedContent = scraper.getScrapedContent();
    generateHtml(scrapedContent);
    generateCookingModeHtml(scrapedContent);
}


chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: initScript
    });
});