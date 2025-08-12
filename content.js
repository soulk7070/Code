(function(){
  function parseCountFromText(t){
    // Cari pola seperti "1,234 results" atau "About 1,234" (fallback)
    const m = (t||'').match(/([0-9][0-9.,]*)\s*(results|hasil)/i);
    if(m){
      return Number(m[1].replace(/[.,]/g, m[1].includes('.') && !m[1].includes(',') ? '' : '').replace(/\./g,'').replace(/,/g,''));
    }
    return null;
  }

  function trySelectors(){
    // Beberapa kandidat selector (Adobe Stock sering berubah UI)
    const selectors = [
      '[data-testid="result-count"]',
      '.search-results__count',
      'span[aria-live="polite"]',
      'div[class*="results"]:has(span)'
    ];
    for(const sel of selectors){
      const el = document.querySelector(sel);
      if(el){ const c = parseCountFromText(el.textContent); if(c) return c; }
    }
    // Fallback: scan seluruh body
    return parseCountFromText(document.body.innerText);
  }

  const url = new URL(location.href);
  const q = url.searchParams.get('k') || '(unknown)';

  // Tunggu sedikit agar komponen dinamis render
  setTimeout(()=>{
    const count = trySelectors();
    chrome.runtime.sendMessage({ type:'COUNT_RESULT', q, count, tabId: chrome.devtools?.inspectedWindow?.tabId || null });
  }, 800);
})();
