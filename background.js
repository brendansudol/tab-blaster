const LIMIT = 10
let tabsAll = []

const getInitialState = () => {
  const now = Date.now()

  chrome.tabs.query({}, tabs => {
    tabsAll = tabs
      .filter(tab => tab.id !== chrome.tabs.TAB_ID_NONE)
      .sort((a, b) => a.id - b.id)
      .map((tab, i) => {
        return { id: tab.id, age: i + 1 }
      })

    updateBadge()
  })
}

const updateBadge = () => {
  chrome.browserAction.setBadgeText({ text: `${tabsAll.length}` })
}

const onTabCreate = tab => {
  tabsAll.push({
    id: tab.id,
    age: (tabsAll.length ? tabsAll[tabsAll.length - 1].age : 0) + 1,
  })

  if (tabsAll.length <= LIMIT) updateBadge()
  else chrome.tabs.remove(tabsAll[0].id, () => {})
}

const onTabRemove = tabId => {
  tabsAll = tabsAll.filter(tab => tab.id !== tabId)
  updateBadge()
}

function init() {
  getInitialState()

  chrome.tabs.onCreated.addListener(onTabCreate)
  chrome.tabs.onRemoved.addListener(onTabRemove)
}

chrome.runtime.onInstalled.addListener(init)
