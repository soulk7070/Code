let queue = [];
let currentTabId = null;
let running = false;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if(msg.type === 'START_QUEUE'){
    queue = msg.items.slice();
    running = true;
    next();
  }
  if(msg.type === 'STOP_QUEUE'){
    running = false;
    if(currentTabId) chrome.tabs.remove(currentTabId);
    queue = [];
    chrome.runtime.sendMessage({ type:'QUEUE_DONE' });
  }
});

async function next(){
  if(!running){ return; }
  const item = queue.shift();
  if(!item){
    running = false;
    chrome.runtime.sendMessage({ type:'QUEUE_DONE' });
    return;
  }

  // Buka tab headless-ish (inactive)
  const tab = await chrome.tabs.create({ url: item.url, active: false });
  currentTabId = tab.id;

  // Tunggu tab complete, lalu inject content.js jika belum otomatis
  chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo){
    if(tabId === currentTabId && changeInfo.status === 'complete'){
      chrome.scripting.executeScript({ target: { tabId: currentTabId }, files: ['content.js'] });
      chrome.tabs.onUpdated.removeListener(listener);
    }
  });

  // Terima hasil dari content.js untuk tab ini
  const handler = (msg) => {
    if(msg.type === 'COUNT_RESULT' && msg.tabId === currentTabId){
      chrome.runtime.onMessage.removeListener(handler);
      chrome.tabs.remove(currentTabId);
      chrome.runtime.sendMessage({ type:'QUEUE_PROGRESS', q: msg.q, count: msg.count });
      currentTabId = null;
      setTimeout(next, 400); // jeda ringan agar ramah
    }
  };
  chrome.runtime.onMessage.addListener(handler);
}
