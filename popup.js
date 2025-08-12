const el = (id) => document.getElementById(id);
const statusEl = el('status');
const tbody = document.querySelector('#tbl tbody');
let running = false;
let rows = [];

function buildUrl(target, q){
  const base = 'https://stock.adobe.com/search?';
  const params = new URLSearchParams({ k: q, search_type: 'usertyped' });
  if(target === 'adobestock-video'){
    // Filter video saja
    params.set('filters[content_type:video]', '1');
  }
  return base + params.toString();
}

function setStatus(t){ statusEl.textContent = t; }

function render(){
  tbody.innerHTML = '';
  rows.forEach((r, i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i+1}</td><td>${r.q}</td><td>${r.count ?? '-'}</td><td><a href="${r.url}" target="_blank">open</a></td>`;
    tbody.appendChild(tr);
  });
}

async function start(){
  if(running) return;
  running = true; setStatus('Berjalan…'); rows = [];
  const target = el('target').value;
  const list = el('keywords').value.split(/\n+/).map(s=>s.trim()).filter(Boolean);

  // Pre-render rows
  list.forEach(q => rows.push({ q, count: null, url: buildUrl(target, q) }));
  render();

  chrome.runtime.sendMessage({ type:'START_QUEUE', items: rows.map(r=>({q:r.q, url:r.url})) });
}

function stop(){
  running = false; setStatus('Dihentikan');
  chrome.runtime.sendMessage({ type:'STOP_QUEUE' });
}

function exportCSV(){
  const header = 'keyword,count,url\n';
  const body = rows.map(r=>`"${r.q.replaceAll('"','""')}",${r.count ?? ''},${r.url}`).join('\n');
  const blob = new Blob([header+body], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'auto-research.csv'; a.click();
  URL.revokeObjectURL(url);
}

// Listen progress from background
chrome.runtime.onMessage.addListener((msg)=>{
  if(msg.type === 'QUEUE_PROGRESS'){
    const { q, count } = msg;
    const row = rows.find(r => r.q === q);
    if(row){ row.count = count; render(); }
    setStatus(`Memproses: ${q} → ${count ?? '-'} hasil`);
  }
  if(msg.type === 'QUEUE_DONE'){
    running = false; setStatus('Selesai');
  }
});

el('start').addEventListener('click', start);
el('stop').addEventListener('click', stop);
el('export').addEventListener('click', exportCSV);
