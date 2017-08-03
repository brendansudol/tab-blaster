document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({}, tabs => {
    const txt = `${tabs.length} / 10 tabs in use. I hope you're having a lovely day.`
    document.getElementById('content').textContent = txt
  })
})
