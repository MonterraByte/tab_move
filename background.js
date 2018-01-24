function moveToRight(tab) {
    if (tab.pinned) {
        var query = browser.tabs.query({ currentWindow: true, pinned: true })
    } else {
        var query = browser.tabs.query({ currentWindow: true })
    }

    query.then(tabs => {
        var highest_index = 0
        for (var num in tabs) {
            if (tabs[num].index > highest_index) {
                highest_index = tabs[num].index
            }
        }
        browser.tabs.move(tab.id, { index: highest_index })
    })
}

function moveToLeft(tab) {
    var query = browser.tabs.query({ currentWindow: true, pinned: true })

    query.then(pinned_tabs => {
        if (pinned_tabs.length === 0 || tab.pinned) {
            browser.tabs.move(tab.id, { index: 0 })
        } else {
            var highest_index = 0
            for (var num in pinned_tabs) {
                if (pinned_tabs[num].index > highest_index) {
                    highest_index = pinned_tabs[num].index
                }
            }
            browser.tabs.move(tab.id, { index: highest_index + 1 })
        }
    })
}

function callback(info, tab) {
    switch (info.menuItemId) {
        case "moveToRight":
            moveToRight(tab)
            break
        case "moveToLeft":
            moveToLeft(tab)
            break
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
