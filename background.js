function moveToRight(tab) {
    var promise = browser.windows.get(tab.windowId, {populate: true})
    promise.then(window => {
        browser.tabs.move(tab.id, {index: window.tabs[window.tabs.length - 1].index})
    })
}

function moveToLeft(tab) {
    browser.tabs.move(tab.id, {index: 0})
}

function callback(info, tab) {
    switch (info.menuItemId) {
        case "moveToRight":
            moveToRight(tab)
        case "moveToLeft":
            moveToLeft(tab)
    }
}

browser.menus.create({
    id: "moveToRight",
    title: "Move to right",
    contexts: ["tab"]
})

browser.menus.create({
    id: "moveToLeft",
    title: "Move to left",
    contexts: ["tab"]
})

browser.menus.onClicked.addListener(callback)
