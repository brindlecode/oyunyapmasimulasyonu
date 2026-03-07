/* AI Game Studio Tycoon Türkiye - Tam Türkçe web tabanlı yönetim simülasyonu */
const STORAGE_KEY = 'aiGameStudioTycoonTRSave_v1';
const AUTO_SAVE_MS = 10000;

const DATA = {
  genres: ['Bulmaca','Hyper Casual','Roguelike','Kart Oyunu','Idle','Simülasyon','Korku','Strateji','Mobil Casual','Hikâye Tabanlı','Platformer','Arcade'],
  themes: ['Uzay','Şehir','Korku','Fantezi','Tarih','Bilim Kurgu','Okul','Hayatta Kalma','Yarış','İş Dünyası','Dedektiflik'],
  platforms: ['Mobil','PC','Web'],
  audiences: ['Çocuk','Genç','Casual','Hardcore','Geniş Kitle'],
  monetizations: ['Reklam','Premium Satış','Freemium','Kozmetik Satış','Sezon Sistemi'],
  qualityTargets: ['Düşük','Orta','Yüksek','Çok Yüksek'],
  riskLevels: ['Düşük','Orta','Yüksek'],
  aiIntensity: ['Hız Odaklı','Dengeli','Kalite Odaklı'],
  devStages: ['Fikir Doğrulama','Tasarım','İçerik Üretimi','Kodlama','Test','Optimizasyon','Store Hazırlığı','Yayınlama'],
  publishChannels: ['Mobil Store','PC Mağazası','Web Portalı','Bağımsız Launcher','Bölgesel Yayın','Global Yayın'],
  difficulties: {
    Kolay: { cash: 300000, bugMul: 0.8, marketCompetition: 0.85, investorInterest: 1.25, salaryPressure: 0.85, adMultiplier: 1.15 },
    Dengeli: { cash: 180000, bugMul: 1, marketCompetition: 1, investorInterest: 1, salaryPressure: 1, adMultiplier: 1 },
    Zor: { cash: 110000, bugMul: 1.3, marketCompetition: 1.2, investorInterest: 0.75, salaryPressure: 1.25, adMultiplier: 0.85 }
  },
  roles: ['Oyun Tasarımcısı','Prompt / AI Operatörü','Programcı','UI Tasarımcısı','QA Test Uzmanı','Veri Analisti','Topluluk Yöneticisi','Pazarlama Uzmanı','Reklam Monetization Uzmanı','İş Geliştirme Yöneticisi','Finans Yöneticisi','İK Uzmanı','CTO','COO','Stüdyo Müdürü'],
  aiTiers: [
    { name:'Temel AI', cost:0, speed:1, quality:1, bug:1 },
    { name:'Gelişmiş AI', cost:85000, speed:1.1, quality:1.08, bug:0.95 },
    { name:'Prototip Uzmanı AI', cost:130000, speed:1.2, quality:1.02, bug:1.05 },
    { name:'İçerik Motoru AI', cost:170000, speed:1.15, quality:1.12, bug:0.98 },
    { name:'Hata Avcısı AI', cost:190000, speed:0.95, quality:1.15, bug:0.78 },
    { name:'Monetization AI', cost:210000, speed:1.0, quality:1.08, bug:0.95 },
    { name:'Viral Analiz AI', cost:260000, speed:1.05, quality:1.15, bug:0.9 },
    { name:'AAA Stüdyo AI', cost:390000, speed:1.2, quality:1.3, bug:0.82 },
    { name:'Otonom Geliştirme Sistemi', cost:620000, speed:1.35, quality:1.45, bug:0.75 }
  ],
  upgrades: [
    ['Daha iyi PC',25000],['AI Sunucu Paketi',50000],['Tasarım Monitörü',18000],['Test Cihazı Paketi',35000],['Hızlı İnternet',22000],
    ['Toplantı Odası',70000],['Küçük Ofis',120000],['Orta Ölçekli Stüdyo',220000],['Açık Ofis',280000],['Prestij Plazası',450000],
    ['Motion Capture Odası',320000],['Ses Kayıt Odası',260000],['Topluluk Operasyon Merkezi',140000],['Veri Analitik Merkezi',210000],
    ['Remote Çalışma Altyapısı',90000],['Hibrit Yönetim Modülü',125000],['İç Test Grubu Laboratuvarı',115000],['Marka IP Atölyesi',160000],
    ['Erken Erişim Operasyon Birimi',145000],['Yayın Takvimi Komuta Paneli',130000],['Kriz Yönetim Masası',175000],['Halka Arz Hazırlık Paketi',310000]
  ],
  // 60+ yorum
  comments: [
    'Oyun güzel ama çok reklam var.','İlk başta sardı ama sonra tekrar ediyor.','Grafikler beklediğimden iyi.','Telefonumda çok kasıyor.','Arkadaşımla oynasaydım daha iyi olurdu.',
    'Son güncellemeden sonra bozuldu.','Bu fiyat için içerik az.','Baya bağımlılık yaptı.','Türkçe çeviriler komik olmuş.','Geliştirici ilgileniyor, güzel.',
    'Müzikler harika olmuş.','Enerji sistemi fazla kısıtlayıcı.','Kontroller akıcı.','Yükleme süreleri uzun.','İçerik güncellemeleri hızlı geliyor.',
    'Sezon bileti fena değil.','Pay-to-win hissi var.','Reklam izleyince ödül iyi.','Arkadaş davet ödülleri daha iyi olabilir.','Hikâye şaşırtıcı derecede iyi.',
    'Arayüz temiz ama font küçük.','Tablet optimizasyonu istiyorum.','Düşük cihazlarda performans kötü.','Yeni etkinlik çok eğlenceli.','Eşleştirme sistemi dengesiz.',
    'Sunucu hataları can sıkıyor.','Fiyat indirimi bekliyorum.','DLC içerikleri kaliteli.','Etkinlikler tekrar etmeye başladı.','Günlük görevler motive ediyor.',
    'Oyuna para yatırmadan da ilerlenebiliyor.','Karakter tasarımları hoş.','Ses efektleri yetersiz.','Liderlik tablosu hile dolu gibi.','Hata düzeltmeleri hızlı geliyor.',
    'Topluluk yöneticisi cevap veriyor.','İlk 30 dakika çok iyi.','Sonra tempo düşüyor.','Yeni başlayanlar için zor.','Hardcore oyuncular için iyi.',
    'Mobilde pil tüketimi fazla.','Store görselleri yanıltıcıydı.','Beklediğimden daha derin çıktı.','Klan sistemi gelsin.','Co-op modu şart.',
    'Premium paket pahalı.','İndirimde alırım.','Geliştirici günlükleri güzel fikir.','AI destekli içerik üretimi hissettiriyor.','Türk geliştirici görmek güzel.',
    'Yama notları çok açıklayıcı.','Çok fazla bildirim geliyor.','Bildirimleri kapatma seçeneği iyi.','Ödüllü reklam oranı dengeli.','Çekiliş etkinliği keyifliydi.',
    'Güncellemeden sonra FPS arttı.','Oyunun sonu yok, güzel.','Sosyal özellikler güçlü olmalı.','Abonelik kulübü mantıklı.','Rekabetçi sezonlar heyecanlı.',
    'Bölgesel sunucu eklensin.','Viral etkinlik patladı.','Bugünkü patch harikaydı.'
  ],
  crisisTypes: ['Sunucu Çökmesi','Kritik Bug Krizi','Telif İtirazı','Negatif İnceleme Dalgası','Reklam SDK Çakışması','Finansal Darboğaz','Yatırımcı Baskısı','Rakip Kopya Oyunu','Çalışan Toplu İstifa Riski','Platform Komisyon Artışı','PR Krizi','Store Görünürlük Kaybı','Veri Kaybı Riski','İade Dalgası','Topluluk Boykotu'],
  marketTrends: ['Idle Oyun Furyası','Low Poly Survival Modası','Cozy Game Yükselişi','Mobil Puzzle Patlaması','Nostaljik Retro Dalgası','Yapay Zekâ Temalı Oyunlar','Kısa Oturum Casual Trend','Hikâye Odaklı Premium Geri Dönüşü','Web Oyun Canlanması','Kart-Build Meta','Roguelike Co-op Rüzgarı','Korku Yayıncı Patlaması','Simülasyon Ekonomisi Trendi','Hızlı Tüketilen Mini Oyun Modası','Sosyal Parti Oyunları Yükselişi'],
  badges: ['İlk Yayın','1000 İndirme','10K Aylık Gelir','İlk Çalışan','İlk Yatırım','Viral Oyun','4.5+ Puan','12 Ay Yaşayan Oyun','Orta Ofis','10M Şirket Değeri'],
  investorOffers: [
    'Melek yatırımcı: 300.000₺ karşılığı %7 hisse.', 'Mobil oyun fonu: 1.200.000₺ karşılığı %18 hisse.', 'Risk sermayesi: 2.800.000₺ karşılığı %26 hisse.',
    'Yayıncı şirket: Sadece yeni oyun için gelir paylaşımı %35.', 'Stratejik ortak: 900.000₺ + pazarlama desteği karşılığı %12 hisse.',
    'Büyük teknoloji şirketi: Şirket satın alma ön teklifi 9.500.000₺.', 'IP satın alma teklifi: Başarılı oyunun markası için 1.100.000₺.',
    'Reklam ortaklığı: 6 ay garantili CPM bonusu + %10 gelir payı.', 'Kısmi ortaklık: 600.000₺ karşılığı %9 hisse ve 1 yönetim koltuğu.',
    'Global yayın anlaşması: PC lansmanında peşin 450.000₺ + %22 pay.', 'Film/dizi uyarlama niyeti: opsiyon bedeli 750.000₺.',
    'Unicorn büyüme fonu: 4.000.000₺ karşılığı %30 hisse.', 'Reklam devi işbirliği: özel kampanya bütçesi 350.000₺.',
    'Bölgesel yayıncı: 200.000₺ peşin + yerel pazarlama.', 'Kazanç paylaşımı teklifi: 2 yıl brüt gelirin %12si.',
    'Kredi benzeri finansman: 500.000₺, 8 ay sonra %15 geri ödeme.', 'Esports ortaklığı teklifi: 270.000₺ etkinlik desteği.',
    'Kozmetik marka sponsorluğu: yıllık 320.000₺.', 'Platform özel içerik fonu: 410.000₺.', 'Hızlı çıkış satın alımı: 6.700.000₺ tüm şirket.'
  ],
  tasks: [
    'İlk oyununu yayınla','1000 indirmeyi geç','Aylık 10.000 gelir üret','İlk çalışanını işe al','İlk yatırım teklifini al','3 oyuna aynı anda destek ver','Kullanıcı puanını 4.5 üstüne çıkar',
    'Bir oyunu 12 ay aktif tut','Stüdyonu orta ofise taşı','Şirket değerini 10 milyona çıkar','İlk satın alma teklifini al','Bir oyunun viral olmasını sağla','50.000 aktif kullanıcıya ulaş',
    '3 farklı gelir modeli kur','3 farklı pazarlama kanalı kullan','Bir krizi başarıyla çöz','2 yatırım teklifini reddet','5 çalışanlı ekip kur','En az 3 gün üst üste net kâr et',
    'Bir oyunda çökme oranını %2 altına indir','1M toplam indirmeye ulaş','Topluluk memnuniyetini 80 üstüne taşı','Store görünürlük puanını 75 yap','Wishlist sayısını 10.000 yap',
    'İç test grubunu aktive et','Sezon etkinliği düzenle','Bir oyunun devam oyununu üret','Premium oyunla 200k gelir','Freemium oyunda ARPDAU 1.5 üstü',
    'Çalışan memnuniyetini 70 üstüne çıkar','3 ay iflas etmeden büyü','Rakip trendini doğru yakala'
  ],
  employeeNames: [
    'Zeynep Yıldız','Mert Aksoy','Ece Kaya','Berke Yılmaz','Selin Arslan','Can Demirtaş','Defne Karaca','Emir Aydın','Duru Koç','Onur Güneş',
    'Pelin Şahin','Yiğit Çelik','İlayda Öz','Kaan Polat','Mina Erdem','Alp Eren','Sude Uslu','Berkay Korkmaz','Aslı Bozkurt','Umut Tan',
    'Rüya Avcı','Deniz Kurt','Ozan Duman','Nehir Ateş','Kerem Gün','Merve Toprak','Bora Çınar','Nazlı Gür','Tolga Sönmez','Buse İnce',
    'Ekin Yaman','Arda Savaş','Elif Durmaz','Cemre Acar','Serhat Demir','Melis Çetin','Gizem Özkan','Baran Işık','Sena Kılıç','Hakan Yüce',
    'Lara Bayram','Doğa Ercan','Cansu Ural','Poyraz Şen','Mina Dalkıran','Kıvanç Taş','Begüm Arı','Vera Boyraz','Aren Aksu','Leyla Tuna'
  ],
  gameNames: [
    'Kod Atlası','Pixel Patron','Rüya Stüdyosu','Yıldız Kurucu','Bug Avcısı','Sokak Simülasyonu','Sessiz Terminal','Viral Arena','Ofis Efsanesi','Kozmik Kartlar',
    'Gizemli Mahalle','Hızlı Kargo Tycoon','Pazar Ustası','İmparator Arayüzü','Ritim Fabrikası','Fikir Madeni','Hyper Çiftlik','Karanlık Kule','Neon Dedektif','Yıldırım Girişim',
    'Sonsuz Patch','Kahveci CEO','Ada Savunması','Büyü Defteri','Kritik Çöküş','Retro Sokak','Ajans Hikayesi','Arşiv 404','Türkçe Macera','Rota Sim',
    'Görev Defteri','Çay ve Kod','Efsane Build','Kasa Patronu','Tek Tuş Arena','Saklı Senaryo','Drone Yarışı','Koleksiyon Kartı','Labirent Günlüğü','Mağaza Ustası',
    'Kale ve Kâr','Siber Çiftlik','Kutup Ekspresi','Kayıp Dosya','Yapay Şehir','Klan Hikayesi','Gece Vardiyası','Şans Sokağı','Yama Günleri','Karar Sim'
  ],
  // 100+ olay
  randomEvents: Array.from({length: 120}, (_,i)=> `Rastgele Olay #${i+1}: ${['Platform algoritması değişti','Reklam gelirleri düştü','Yayıncı oyunu oynadı','Sosyal medyada viral oldun','Büyük bug krizi çıktı','Sunucu çöktü','Transfer fırsatı doğdu','Rakipten yıldız ayrıldı','Ekonomik kriz etkisi','Store öne çıkarma fırsatı','Yanlış fiyatlandırma tepkisi','Topluluk seni sevdi','Oyunun klonu çıktı','Telif itirazı çözüldü','Röportaj daveti geldi'][i%15]}`)
};

const UI_TABS = [
  ['dashboard','Ana Dashboard'],['new-game','Yeni Oyun Oluştur'],['projects','Aktif Projeler'],['published','Yayınlanmış Oyunlar'],
  ['employees','Çalışanlar'],['finance','Finans'],['investors','Yatırımcılar / Anlaşmalar'],['office','Ofis / Yükseltmeler'],
  ['community','Topluluk / Yorumlar'],['reports','Raporlar / Analiz'],['settings','Ayarlar']
];

let state = null;
let loopHandle = null;
let activeTab = 'dashboard';

function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function pick(arr){ return arr[rand(0, arr.length-1)]; }
function fmt(n){ return `${Math.round(n).toLocaleString('tr-TR')}₺`; }
function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }

function createInitialState(companyName='Aras Interactive', difficulty='Dengeli', logoColor='#52a5ff') {
  const d = DATA.difficulties[difficulty];
  return {
    meta: { companyName, difficulty, logoColor, notificationsOn:true, soundOn:false },
    founder: { name:'Aras Demir' },
    time: { day:1, week:1, month:1, speed:1, paused:false },
    finance: { cash:d.cash, companyValue:d.cash*2, monthlyIncome:0, monthlyExpense:45000, netProfit:0, taxCommissionRate:0.16, adIncome:0, salesIncome:0, iapIncome:0, dealIncome:0, history:[] },
    office: { level:'Ev Ofisi', upgrades:[], workModel:'Ofis', reputation:35, culture:45, visibility:20, wishlist:250 },
    ai: { tierIndex:0 },
    projects: [],
    games: [],
    employees: [{ name:'Aras Demir', role:'Kurucu / Genel Yönetici', salary:0, exp:85, motivation:75, loyalty:85, productivity:80, creativity:82, tech:80, bugTendency:25, stress:18, raiseExpectation:0, quitRisk:2 }],
    market: { trend:pick(DATA.marketTrends), cpm:1, competition:d.marketCompetition, platformCommission:0.3, viralChance:0.04, buyingPower:1, mobileAdEfficiency:1*d.adMultiplier, pcExpectation:1, webPopularity:1 },
    marketing: { budget:20000, channels:{} },
    eventsLog: ['Kariyer başladı. Aras Demir ev ofiste ilk adımı attı.'],
    notifications: [],
    tasks: DATA.tasks.slice(0,8).map((t,i)=>({text:t, done:i===0?false:false})),
    badges: [],
    investorQueue: [],
    rivals: [{name:'PixelNova', power:42},{name:'Anatolia Labs', power:35},{name:'Kuzey Oyun', power:39}],
    analytics: { totalUsers:0, dailyRevenue:0, churn:0, bestGame:null, worstGame:null }
  };
}

function saveGame(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function loadGame(){ const raw=localStorage.getItem(STORAGE_KEY); return raw?JSON.parse(raw):null; }

function addNotification(text,type='info'){
  state.notifications.unshift({text,type,day:state.time.day});
  if(state.notifications.length>30) state.notifications.pop();
}

function setupStartScreen(){
  document.getElementById('newCareerBtn').onclick = () => openNewCareerModal();
  document.getElementById('loadCareerBtn').onclick = () => {
    const loaded = loadGame();
    if(!loaded) return alert('Kayıt bulunamadı.');
    state = loaded; startGame();
  };
  document.querySelectorAll('[data-open-modal]').forEach(btn=>btn.onclick=()=>openInfoModal(btn.dataset.openModal));
}

function openNewCareerModal(){
  const html = `
  <div class="field"><label>Şirket Adı</label><input id="companyInput" value="Aras Interactive" /></div>
  <div class="field"><label>Logo Rengi</label><input id="colorInput" type="color" value="#52a5ff" /></div>
  <div class="field"><label>Zorluk</label><select id="difficultyInput">${Object.keys(DATA.difficulties).map(d=>`<option>${d}</option>`).join('')}</select></div>
  <button id="startCareerConfirm">Kariyeri Başlat</button>`;
  openModal('Yeni Kariyer', html, (modal)=>{
    modal.querySelector('#startCareerConfirm').onclick = ()=>{
      state = createInitialState(modal.querySelector('#companyInput').value, modal.querySelector('#difficultyInput').value, modal.querySelector('#colorInput').value);
      startGame();
      closeModal();
    };
  });
}

function openInfoModal(id){
  const map = {
    settingsModal:`<p>Ses: <b>${state?.meta.soundOn?'Açık':'Kapalı'}</b><br>Bildirimler: <b>${state?.meta.notificationsOn?'Açık':'Kapalı'}</b></p>`,
    howToModal:`<ul><li>AI panelinden oyun üret.</li><li>Projeleri aşama aşama yönet.</li><li>Yayın sonrası topluluğa kulak ver.</li><li>Ekibi, yatırımı ve ofisi büyüt.</li></ul>`,
    aboutModal:`<p>AI Game Studio Tycoon Türkiye - Aras Demir ile sıfırdan dev stüdyoya.</p>`
  };
  openModal('Bilgi', map[id]||'<p>İçerik bulunamadı.</p>');
}

function openModal(title, content, onMount){
  const tpl = document.getElementById('modalTemplate').content.cloneNode(true);
  tpl.querySelector('.modal-title').textContent = title;
  tpl.querySelector('.modal-content').innerHTML = content;
  document.getElementById('modalRoot').innerHTML = '';
  document.getElementById('modalRoot').appendChild(tpl);
  document.querySelector('.close-modal').onclick = closeModal;
  if(onMount) onMount(document.querySelector('.modal-card'));
}
function closeModal(){ document.getElementById('modalRoot').innerHTML=''; }

function startGame(){
  document.getElementById('startScreen').classList.remove('active');
  document.getElementById('gameScreen').classList.add('active');
  buildSidebar();
  bindGlobalButtons();
  render();
  if(loopHandle) clearInterval(loopHandle);
  loopHandle = setInterval(gameTick, 1000);
  setInterval(()=>saveGame(), AUTO_SAVE_MS);
}

function bindGlobalButtons(){
  document.querySelectorAll('[data-speed]').forEach(btn=>btn.onclick=()=>{
    state.time.speed = Number(btn.dataset.speed);
    document.querySelectorAll('[data-speed]').forEach(b=>b.classList.remove('active-speed'));
    btn.classList.add('active-speed');
  });
  document.getElementById('manualSaveBtn').onclick=()=>{ saveGame(); addNotification('Manuel kayıt alındı.'); render(); };
  document.getElementById('newGameResetBtn').onclick=()=>{ if(confirm('Yeni oyun başlatılsın mı?')){ localStorage.removeItem(STORAGE_KEY); location.reload(); } };
}

function buildSidebar(){
  const side = document.getElementById('sidebar');
  side.innerHTML = UI_TABS.map(([k,v])=>`<button class="tab-btn ${k===activeTab?'active':''}" data-tab="${k}">${v}</button>`).join('');
  side.querySelectorAll('.tab-btn').forEach(btn=>btn.onclick=()=>{ activeTab=btn.dataset.tab; buildSidebar(); render(); });
}

function gameTick(){
  if(state.time.speed===0) return;
  for(let i=0;i<state.time.speed;i++) advanceOneDay();
  render();
}

function advanceOneDay(){
  state.time.day++;
  if(state.time.day%7===0) state.time.week++;
  if(state.time.day%30===0){
    state.time.month++;
    monthlyCycle();
  }
  runProjects();
  runPublishedGames();
  randomWorldEvents();
  employeeEvents();
  updateCompanyValue();
  checkTasksAndBadges();
}

function monthlyCycle(){
  const salaries = state.employees.reduce((a,e)=>a+e.salary,0);
  const officeExpense = 15000 + state.office.upgrades.length*2200;
  const server = Math.max(8000, state.games.reduce((a,g)=>a + g.metrics.serverLoad*80,0));
  const marketingSpend = Object.values(state.marketing.channels).reduce((a,v)=>a+v,0);
  const fixed = salaries + officeExpense + server + marketingSpend;
  const tax = Math.max(0, state.finance.monthlyIncome) * state.finance.taxCommissionRate;
  const expense = fixed + tax;
  state.finance.monthlyExpense = expense;
  state.finance.netProfit = state.finance.monthlyIncome - expense;
  state.finance.cash += state.finance.netProfit;
  state.finance.history.push({month:state.time.month, cash:state.finance.cash, income:state.finance.monthlyIncome});
  if(state.finance.history.length>18) state.finance.history.shift();
  state.finance.monthlyIncome = 0;
  if(state.finance.cash<0) addNotification('Nakit eksiye düştü, iflas riski yükseldi!', 'bad');
  state.market.trend = pick(DATA.marketTrends);
}

function runProjects(){
  const ai = DATA.aiTiers[state.ai.tierIndex];
  state.projects.forEach(p=>{
    if(p.done) return;
    const teamPower = state.employees.reduce((a,e)=>a + e.productivity*0.01, 0.8);
    p.progress += (ai.speed * teamPower * (p.aiIntensity==='Hız Odaklı'?1.2:p.aiIntensity==='Kalite Odaklı'?0.85:1));
    if(Math.random() < 0.08) triggerProjectEvent(p);
    if(p.progress >= 100){
      p.stageIndex++;
      p.progress = 0;
      if(p.stageIndex >= DATA.devStages.length){ publishGameFromProject(p); }
    }
  });
}

function runPublishedGames(){
  state.games.forEach(g=>{
    const trendBonus = g.genre.includes(state.market.trend.split(' ')[0]) ? 1.15 : 1;
    const quality = (g.hidden.fun + g.hidden.tech + g.hidden.graphics + g.hidden.innovation)/4;
    const retention = clamp(g.hidden.retention * (1 - g.metrics.churn/100), 10, 95);
    const dau = Math.max(0, g.metrics.weeklyActive * (retention/100) + rand(-80,120));
    g.metrics.dailyActive = Math.round(dau);
    g.metrics.monthlyActive = Math.round(g.metrics.dailyActive * rand(16,24));
    const adFactor = g.monetization==='Reklam'?1.3:0.6;
    const saleFactor = g.monetization==='Premium Satış'?1.5:0.7;
    const iapFactor = ['Freemium','Kozmetik Satış','Sezon Sistemi'].includes(g.monetization)?1.4:0.4;
    const dailyRevenue = (g.metrics.dailyActive * (quality/100) * trendBonus * (adFactor*state.market.mobileAdEfficiency + saleFactor + iapFactor)) / 8;
    g.metrics.dailyRevenue = Math.max(0, Math.round(dailyRevenue));
    g.metrics.totalRevenue += g.metrics.dailyRevenue;
    g.metrics.totalDownloads += Math.max(0, Math.round(g.metrics.dailyActive*0.35 + rand(-30,50)));
    g.metrics.rating = clamp(g.metrics.rating + ((quality>70?0.01:-0.015) - g.metrics.crashRate/250), 1.8, 4.9);
    g.metrics.churn = clamp(g.metrics.churn + rand(-2,2) + (g.adDensity>65?2:-1), 5, 55);
    g.metrics.communitySatisfaction = clamp(g.metrics.communitySatisfaction + rand(-2,2) + (g.metrics.rating>4.2?1:-1), 15, 98);
    g.metrics.weeklyActive = Math.max(0, g.metrics.weeklyActive + rand(-200,280));
    state.finance.monthlyIncome += g.metrics.dailyRevenue;
    state.finance.adIncome += Math.round(g.metrics.dailyRevenue*(g.monetization==='Reklam'?0.55:0.2));
    state.finance.salesIncome += Math.round(g.metrics.dailyRevenue*(g.monetization==='Premium Satış'?0.7:0.18));
    state.finance.iapIncome += Math.round(g.metrics.dailyRevenue*(['Freemium','Kozmetik Satış','Sezon Sistemi'].includes(g.monetization)?0.5:0.12));
  });
  state.analytics.totalUsers = state.games.reduce((a,g)=>a+g.metrics.dailyActive,0);
  state.analytics.dailyRevenue = state.games.reduce((a,g)=>a+g.metrics.dailyRevenue,0);
}

function randomWorldEvents(){
  if(Math.random()<0.06){
    const ev = pick(DATA.randomEvents);
    state.eventsLog.unshift(ev);
    if(state.eventsLog.length>120) state.eventsLog.pop();
    if(ev.includes('viral')) state.market.viralChance += 0.01;
    if(ev.includes('Reklam gelirleri düştü')) state.market.mobileAdEfficiency *= 0.96;
    if(ev.includes('Store öne çıkarma')) state.office.visibility += 3;
    addNotification(ev, 'warn');
  }
  if(state.finance.cash>450000 && Math.random()<0.04*DATA.difficulties[state.meta.difficulty].investorInterest){
    state.investorQueue.unshift({ text: pick(DATA.investorOffers), day: state.time.day });
  }
}

function employeeEvents(){
  if(state.employees.length<=1 || Math.random()>0.09) return;
  const e = pick(state.employees.slice(1));
  const pool = ['zam istedi','rakip firmadan teklif aldı','fazla mesai yüzünden mutsuz','harika fikir getirdi','takımı motive etti','büyük hata yaptı','hastalandı','yeni araç önerdi','işten ayrılma sinyali verdi','hisse paketi istiyor'];
  const ev = `${e.name} ${pick(pool)}.`;
  addNotification(ev, 'warn');
  if(ev.includes('büyük hata')) e.stress += 8;
  if(ev.includes('harika fikir')) state.office.reputation += 1;
  if(ev.includes('ayrılma sinyali')) e.quitRisk += 5;
}

function triggerProjectEvent(p){
  const events = [
    ['AI beklenenden iyi iş çıkardı', ()=>{ p.quality += 5; p.bugRisk -= 4; }],
    ['AI tekrar eden içerik üretti', ()=>{ p.innovation -= 6; }],
    ['Beklenenden fazla bug geldi', ()=>{ p.bugRisk += 7; }],
    ['Asset stili tutarsız oldu', ()=>{ p.graphics -= 5; }],
    ['Ana döngü sıkıcı kaldı', ()=>{ p.fun -= 5; }],
    ['Test kullanıcıları oyunu sevdi', ()=>{ p.fun += 6; p.retention += 5; }],
    ['Sunucu maliyeti tahmini yükseldi', ()=>{ p.serverLoad += 8; }],
    ['App store açıklamaları zayıf kaldı', ()=>{ p.commentQuality -= 6; }],
    ['Son gün kritik bug çıktı', ()=>{ p.bugRisk += 10; }],
    ['Reklam SDK çakışması oldu', ()=>{ p.bugRisk += 5; p.monetization -= 4; }],
    ['Telif riski oluşturan benzerlik tespit edildi', ()=>{ p.innovation -= 8; }],
    ['Topluluk sanat stilini sevdi', ()=>{ p.graphics += 8; p.viral += 4; }]
  ];
  const [text, effect] = pick(events);
  effect();
  addNotification(`${p.name}: ${text}`, 'info');
}

function updateCompanyValue(){
  const gameValue = state.games.reduce((a,g)=>a + g.metrics.totalRevenue*1.4 + g.metrics.weeklyActive*2,0);
  const rep = state.office.reputation*5000;
  state.finance.companyValue = Math.max(50000, state.finance.cash + gameValue + rep);
}

function checkTasksAndBadges(){
  const done = (name)=>state.tasks.find(t=>t.text===name)?.done;
  state.tasks.forEach(t=>{
    if(t.done) return;
    if(t.text==='İlk oyununu yayınla' && state.games.length>0) t.done=true;
    if(t.text==='1000 indirmeyi geç' && state.games.some(g=>g.metrics.totalDownloads>1000)) t.done=true;
    if(t.text==='Aylık 10.000 gelir üret' && state.analytics.dailyRevenue>330) t.done=true;
    if(t.text==='İlk çalışanını işe al' && state.employees.length>1) t.done=true;
    if(t.text==='İlk yatırım teklifini al' && state.investorQueue.length>0) t.done=true;
  });
  if(done('İlk oyununu yayınla') && !state.badges.includes('İlk Yayın')) state.badges.push('İlk Yayın');
  if(done('1000 indirmeyi geç') && !state.badges.includes('1000 İndirme')) state.badges.push('1000 İndirme');
}

function publishGameFromProject(p){
  p.done = true;
  const g = {
    id: crypto.randomUUID(),
    name: p.name,
    genre: p.genre,
    theme: p.theme,
    platform: p.platform,
    audience: p.audience,
    monetization: p.monetization,
    launchDay: state.time.day,
    adDensity: rand(30,65),
    hidden: { fun:p.fun, tech:p.quality, graphics:p.graphics, innovation:p.innovation, addiction:p.addiction, bugRisk:p.bugRisk, serverLoad:p.serverLoad, retention:p.retention, viral:p.viral, commentQuality:p.commentQuality, monetization:p.monetizationScore },
    updates: ['v1.0 yayınlandı.'],
    metrics: {
      firstDayDownloads: rand(300,2200), weeklyActive: rand(500,3800), monthlyActive: rand(3000,19000), sessionMin: rand(8,31), rating: Number((rand(28,46)/10).toFixed(1)),
      comments: rand(30,420), crashRate: rand(1,14), refundRate: p.monetization==='Premium Satış'?rand(1,9):0, adImpressions: rand(10000,90000), arpu:Number((Math.random()*2.4+0.4).toFixed(2)),
      arpdau:Number((Math.random()*2+0.2).toFixed(2)), dailyRevenue:0, monthlyRevenue:0, totalRevenue:0, viralGrowth:rand(1,32), marketingEfficiency:rand(25,93), churn:rand(8,38), communitySatisfaction:rand(40,85),
      dailyActive:rand(200,1200), totalDownloads:rand(600,5000), serverLoad:p.serverLoad
    }
  };
  state.games.unshift(g);
  addNotification(`${g.name} başarıyla yayınlandı!`, 'ok');
}

function aiSummaryFromProject(p){
  const lines = [];
  const qualityAvg = (p.fun+p.quality+p.graphics+p.innovation)/4;
  if(qualityAvg>74) lines.push('Potansiyeli yüksek.');
  if(p.bugRisk>58) lines.push('Teknik riski var.');
  if(p.monetizationScore>75) lines.push('Gelir modeli agresif olabilir.');
  if(p.retention<52 && p.fun>65) lines.push('İlk hafta severler ama çabuk sıkılabilirler.');
  if(p.adDensity>60) lines.push('Reklam yoğunluğu iyi ayarlanmalı.');
  if(p.audience==='Hardcore' || p.genre==='Roguelike') lines.push('Niş kitleye hitap ediyor.');
  return lines;
}

function createProjectFromForm(form){
  const ai = DATA.aiTiers[state.ai.tierIndex];
  const budget = Number(form.budget.value);
  const riskBonus = form.risk.value==='Yüksek'?12:form.risk.value==='Düşük'?-5:0;
  const qualityTarget = { 'Düşük':45,'Orta':58,'Yüksek':72,'Çok Yüksek':82 }[form.quality.value];
  const base = clamp(qualityTarget + rand(-10,10) + (budget/20000) + (ai.quality*8), 20, 98);
  const proj = {
    id: crypto.randomUUID(), done:false, stageIndex:0, progress:0,
    name: form.name.value || pick(DATA.gameNames), genre: form.genre.value, theme: form.theme.value, platform: form.platform.value, audience: form.audience.value,
    monetization: form.monetization.value, budget, deadline:Number(form.deadline.value), qualityTarget:form.quality.value, risk:form.risk.value, aiIntensity:form.aiIntensity.value,
    fun: clamp(base + rand(-8,8), 20, 99), quality: clamp(base + rand(-8,8), 20, 99), graphics: clamp(base + rand(-10,10), 20, 99), innovation: clamp(base + rand(-12,12), 20, 99),
    addiction: clamp(base + rand(-6,6), 20, 99), bugRisk: clamp(45 + riskBonus + rand(-10,10) * DATA.difficulties[state.meta.difficulty].bugMul / ai.bug, 5, 95),
    serverLoad: clamp(rand(20,80), 5, 95), retention: clamp(base + rand(-15,8), 10, 95), viral: clamp(base + rand(-20,20), 5, 99), commentQuality: clamp(base + rand(-15,15),10,95),
    monetizationScore: clamp(base + rand(-15,16),15,95), adDensity: rand(35,75)
  };
  state.projects.unshift(proj);
  state.finance.cash -= budget;
  addNotification(`${proj.name} projesi başlatıldı.`, 'ok');
}

function hireEmployee(role){
  const name = pick(DATA.employeeNames);
  const salary = rand(18000, 55000);
  if(state.finance.cash < salary*2) return alert('Yetersiz nakit: en az iki maaş tamponu gerekli.');
  state.employees.push({
    name, role, salary, exp:rand(30,88), motivation:rand(42,88), loyalty:rand(35,90), productivity:rand(35,92), creativity:rand(30,90), tech:rand(32,93),
    bugTendency:rand(8,52), stress:rand(12,70), raiseExpectation:rand(2,15), quitRisk:rand(3,19)
  });
  addNotification(`${name} (${role}) işe alındı.`, 'ok');
}

function render(){
  if(!state) return;
  document.getElementById('companyNameLabel').textContent = `${state.meta.companyName} • ${state.founder.name}`;
  document.getElementById('dateLabel').textContent = `${state.time.day}. Gün | ${state.time.week}. Hafta | ${state.time.month}. Ay`;
  document.getElementById('resourceStrip').innerHTML = [
    `Nakit: ${fmt(state.finance.cash)}`,
    `Şirket Değeri: ${fmt(state.finance.companyValue)}`,
    `Toplam Kullanıcı: ${state.analytics.totalUsers.toLocaleString('tr-TR')}`,
    `Trend: ${state.market.trend}`,
    `AI: ${DATA.aiTiers[state.ai.tierIndex].name}`
  ].map(s=>`<span>${s}</span>`).join('');
  renderTab();
}

function renderTab(){
  const el = document.getElementById('contentArea');
  const map = {
    dashboard: renderDashboard, 'new-game': renderNewGame, projects: renderProjects, published: renderPublished,
    employees: renderEmployees, finance: renderFinance, investors: renderInvestors, office: renderOffice,
    community: renderCommunity, reports: renderReports, settings: renderSettings
  };
  map[activeTab](el);
}

function renderDashboard(el){
  const notifs = state.notifications.slice(0,5).map(n=>`<div class="notification">${n.text}<div class="small">Gün ${n.day}</div></div>`).join('');
  el.innerHTML = `
  <div class="card-grid">
    <div class="card"><h3>Stüdyo Durumu</h3><div>İtibar: <b>${state.office.reputation}</b></div><div>Kültür: <b>${state.office.culture}</b></div><div>Görünürlük: <b>${state.office.visibility}</b></div><div>Çalışma Modeli: <b>${state.office.workModel}</b></div></div>
    <div class="card"><h3>Canlı KPI</h3><div>Günlük Gelir <div class="kpi">${fmt(state.analytics.dailyRevenue)}</div></div><div>Aktif Proje: ${state.projects.filter(p=>!p.done).length}</div><div>Yayınlanan Oyun: ${state.games.length}</div></div>
    <div class="card"><h3>Görevler</h3>${state.tasks.slice(0,10).map(t=>`<div>${t.done?'✅':'⬜'} ${t.text}</div>`).join('')}</div>
    <div class="card"><h3>Rozetler</h3>${state.badges.length?state.badges.map(b=>`<span class="badge">${b}</span>`).join(' '):'Henüz rozet yok.'}</div>
  </div>
  <div class="card" style="margin-top:10px;"><h3>Bildirim Akışı</h3>${notifs || '<p>Henüz bildirim yok.</p>'}</div>`;
}

function renderNewGame(el){
  el.innerHTML = `
  <div class="card"><h3>AI Oyun Üretim Paneli</h3>
    <form id="newGameForm" class="grid-2">
      <div class="field"><label>Oyun Adı</label><input name="name" placeholder="${pick(DATA.gameNames)}"></div>
      <div class="field"><label>Tür</label><select name="genre">${DATA.genres.map(v=>`<option>${v}</option>`).join('')}</select></div>
      <div class="field"><label>Tema</label><select name="theme">${DATA.themes.map(v=>`<option>${v}</option>`).join('')}</select></div>
      <div class="field"><label>Platform</label><select name="platform">${DATA.platforms.map(v=>`<option>${v}</option>`).join('')}</select></div>
      <div class="field"><label>Hedef Kitle</label><select name="audience">${DATA.audiences.map(v=>`<option>${v}</option>`).join('')}</select></div>
      <div class="field"><label>Gelir Modeli</label><select name="monetization">${DATA.monetizations.map(v=>`<option>${v}</option>`).join('')}</select></div>
      <div class="field"><label>Geliştirme Bütçesi (₺)</label><input type="number" name="budget" min="10000" step="5000" value="45000"></div>
      <div class="field"><label>Teslim Süresi (gün)</label><input type="number" name="deadline" min="10" value="60"></div>
      <div class="field"><label>Kalite Hedefi</label><select name="quality">${DATA.qualityTargets.map(v=>`<option>${v}</option>`).join('')}</select></div>
      <div class="field"><label>Risk Seviyesi</label><select name="risk">${DATA.riskLevels.map(v=>`<option>${v}</option>`).join('')}</select></div>
      <div class="field"><label>AI Yoğunluğu</label><select name="aiIntensity">${DATA.aiIntensity.map(v=>`<option>${v}</option>`).join('')}</select></div>
      <div class="field"><label>Yayın Kanalı</label><select name="channel">${DATA.publishChannels.map(v=>`<option>${v}</option>`).join('')}</select></div>
    </form>
    <div class="row"><button id="analyzeBtn">AI Analiz Önizleme</button><button id="createProjectBtn">Projeyi Başlat</button></div>
    <div id="analysisBox" class="small" style="margin-top:8px;"></div>
  </div>`;
  const form = el.querySelector('#newGameForm');
  el.querySelector('#analyzeBtn').onclick = ()=>{
    const ghost = createGhostProject(form);
    el.querySelector('#analysisBox').innerHTML = aiSummaryFromProject(ghost).map(s=>`<div>• ${s}</div>`).join('') || 'Analiz: Ortalama risk / ortalama potansiyel.';
  };
  el.querySelector('#createProjectBtn').onclick = ()=>{
    if(Number(form.budget.value)>state.finance.cash*0.8) return alert('Bu bütçe şu anda çok yüksek.');
    createProjectFromForm(form);
    render();
  };
}
function createGhostProject(form){
  return { ...createInitialState().projects?.[0], ...Object.fromEntries(new FormData(form).entries()), fun:rand(40,90),quality:rand(40,90),graphics:rand(35,92),innovation:rand(30,90),retention:rand(30,90),bugRisk:rand(10,80),monetizationScore:rand(25,92),adDensity:rand(30,80)};
}

function renderProjects(el){
  const active = state.projects.filter(p=>!p.done);
  el.innerHTML = `<div class="card"><h3>Aktif Projeler</h3>${active.length?'' : '<p>Aktif proje yok.</p>'}</div>`;
  const wrap = el.querySelector('.card');
  active.forEach(p=>{
    const aiText = aiSummaryFromProject(p).join(' | ');
    wrap.innerHTML += `<div class="card" style="margin-top:8px;"><h4>${p.name}</h4><div>${DATA.devStages[p.stageIndex]} • %${p.progress.toFixed(1)}</div><div class="small">${aiText}</div><div class="row" style="margin-top:6px;">
      <button data-act="budget" data-id="${p.id}">Ek Bütçe Ayır</button><button data-act="extend" data-id="${p.id}">Süreyi Uzat</button><button data-act="soft" data-id="${p.id}">Soft Launch</button><button data-act="delay" data-id="${p.id}">Çıkışı Ertele</button></div></div>`;
  });
  wrap.querySelectorAll('button[data-act]').forEach(btn=>btn.onclick=()=>{
    const p = state.projects.find(x=>x.id===btn.dataset.id);
    if(!p) return;
    const a = btn.dataset.act;
    if(a==='budget'){ state.finance.cash-=15000; p.quality+=3; p.bugRisk-=2; }
    if(a==='extend'){ p.deadline+=7; p.quality+=2; }
    if(a==='soft'){ p.viral+=3; p.commentQuality+=2; }
    if(a==='delay'){ p.deadline+=14; p.bugRisk-=4; }
    render();
  });
}

function renderPublished(el){
  const games = state.games;
  el.innerHTML = `<div class="card"><h3>Yayınlanmış Oyunlar</h3>${games.length?'<table class="table"><thead><tr><th>Oyun</th><th>Puan</th><th>Aktif</th><th>İndirme</th><th>Gelir</th><th>İşlem</th></tr></thead><tbody>' +
    games.map(g=>`<tr><td>${g.name}<div class="small">${g.genre} / ${g.theme}</div></td><td>${g.metrics.rating.toFixed(1)}</td><td>${g.metrics.dailyActive.toLocaleString('tr-TR')}</td><td>${g.metrics.totalDownloads.toLocaleString('tr-TR')}</td><td>${fmt(g.metrics.totalRevenue)}</td><td><button data-game="${g.id}">Detay</button></td></tr>`).join('') +
    '</tbody></table>':'<p>Henüz yayınlanan oyun yok.</p>'}</div>`;
  el.querySelectorAll('button[data-game]').forEach(btn=>btn.onclick=()=>openGameDetail(btn.dataset.game));
}

function openGameDetail(gameId){
  const g = state.games.find(x=>x.id===gameId); if(!g) return;
  const rival = pick(state.rivals);
  openModal(`${g.name} - Oyun Detayı`, `
    <div class="card-grid">
      <div class="card"><h4>Genel</h4><div>Tür: ${g.genre}</div><div>Tema: ${g.theme}</div><div>Çıkış: Gün ${g.launchDay}</div><div>Platform: ${g.platform}</div></div>
      <div class="card"><h4>Metrikler</h4><div>Kullanıcı Puanı: ${g.metrics.rating.toFixed(1)}</div><div>Aktif Kullanıcı: ${g.metrics.dailyActive.toLocaleString('tr-TR')}</div><div>Toplam İndirme: ${g.metrics.totalDownloads.toLocaleString('tr-TR')}</div><div>Toplam Gelir: ${fmt(g.metrics.totalRevenue)}</div></div>
      <div class="card"><h4>Kalite & Risk</h4><div>Hata Seviyesi: ${g.hidden.bugRisk}</div><div>Reklam Yoğunluğu: ${g.adDensity}</div><div>Topluluk Memnuniyeti: ${g.metrics.communitySatisfaction}</div><div>Store Görünürlük: ${state.office.visibility}</div></div>
      <div class="card"><h4>Rakip Karşılaştırması</h4><div>${rival.name} güç: ${rival.power}</div><div>Senin oyun momentumu: ${g.metrics.viralGrowth}</div></div>
    </div>
    <h4>Güncelleme Geçmişi</h4>
    <ul>${g.updates.map(u=>`<li>${u}</li>`).join('')}</ul>
    <div class="row"><button id="patchBtn">Hızlı Yama Çıkar</button><button id="contentBtn">Yeni İçerik Paketi</button><button id="adDownBtn">Reklam Sıklığını Azalt</button></div>
  `, (m)=>{
    m.querySelector('#patchBtn').onclick=()=>{ g.metrics.crashRate=clamp(g.metrics.crashRate-2,0,100); g.updates.push(`Gün ${state.time.day}: Hızlı yama`); render(); };
    m.querySelector('#contentBtn').onclick=()=>{ g.metrics.communitySatisfaction+=4; g.metrics.dailyActive+=250; g.updates.push(`Gün ${state.time.day}: İçerik paketi`); render(); };
    m.querySelector('#adDownBtn').onclick=()=>{ g.adDensity=clamp(g.adDensity-10,0,100); g.metrics.rating+=0.1; render(); };
  });
}

function renderEmployees(el){
  el.innerHTML = `<div class="card"><h3>Çalışanlar</h3><div class="row"><select id="hireRole">${DATA.roles.map(r=>`<option>${r}</option>`).join('')}</select><button id="hireBtn">İşe Al</button></div>
  <table class="table"><thead><tr><th>İsim</th><th>Rol</th><th>Maaş</th><th>Motivasyon</th><th>Stres</th><th>Risk</th><th>Karar</th></tr></thead><tbody>
  ${state.employees.map((e,i)=>`<tr><td>${e.name}</td><td>${e.role}</td><td>${fmt(e.salary)}</td><td>${e.motivation}</td><td>${e.stress}</td><td>${e.quitRisk}%</td><td>${i===0?'Kurucu':`<button data-emp="${i}" data-a="raise">Zam</button><button data-emp="${i}" data-a="bonus">Prim</button><button data-emp="${i}" data-a="warn">Uyar</button><button data-emp="${i}" data-a="fire">Çıkar</button>`}</td></tr>`).join('')}
  </tbody></table></div>`;
  el.querySelector('#hireBtn').onclick=()=>{ hireEmployee(el.querySelector('#hireRole').value); render(); };
  el.querySelectorAll('button[data-emp]').forEach(btn=>btn.onclick=()=>{
    const e = state.employees[Number(btn.dataset.emp)];
    const a = btn.dataset.a;
    if(a==='raise'){ e.salary*=1.12; e.motivation+=8; state.finance.cash-=Math.round(e.salary*0.5); }
    if(a==='bonus'){ e.motivation+=6; e.loyalty+=4; state.finance.cash-=12000; }
    if(a==='warn'){ e.motivation-=8; e.quitRisk+=7; }
    if(a==='fire'){ state.employees.splice(Number(btn.dataset.emp),1); }
    render();
  });
}

function renderFinance(el){
  const last = state.finance.history.slice(-8);
  el.innerHTML = `
  <div class="card-grid">
    <div class="card"><h3>Finans Özet</h3><div>Günlük Gelir: ${fmt(state.analytics.dailyRevenue)}</div><div>Aylık Gelir (birikim): ${fmt(state.finance.monthlyIncome)}</div><div>Net Kâr: ${fmt(state.finance.netProfit)}</div><div>Sabit Gider: ${fmt(state.finance.monthlyExpense)}</div></div>
    <div class="card"><h3>Gelir Kırılımı</h3><div>Reklam: ${fmt(state.finance.adIncome)}</div><div>Satış: ${fmt(state.finance.salesIncome)}</div><div>IAP: ${fmt(state.finance.iapIncome)}</div><div>Anlaşma: ${fmt(state.finance.dealIncome)}</div></div>
    <div class="card"><h3>Maliyetler</h3><div>Personel: ${fmt(state.employees.reduce((a,e)=>a+e.salary,0))}</div><div>Pazarlama Bütçesi: ${fmt(state.marketing.budget)}</div><div>Sunucu Maliyeti: ${fmt(state.games.reduce((a,g)=>a+g.metrics.serverLoad*80,0))}</div><div>Vergi/Komisyon: %${Math.round(state.finance.taxCommissionRate*100)}</div></div>
  </div>
  <div class="card" style="margin-top:10px;"><h3>Nakit Akışı Grafiği (Metin)</h3>${last.map(h=>`<div>Ay ${h.month}: Nakit ${fmt(h.cash)} | Gelir ${fmt(h.income)}</div>`).join('') || '<p>Henüz veri yok.</p>'}</div>`;
}

function renderInvestors(el){
  el.innerHTML = `<div class="card"><h3>Yatırımcılar / Anlaşmalar</h3>${state.investorQueue.length?state.investorQueue.slice(0,8).map((o,idx)=>`<div class="card" style="margin-top:8px;"><div>${o.text}</div><div class="row"><button data-idx="${idx}" data-a="accept">Kabul Et</button><button data-idx="${idx}" data-a="negotiate">Pazarlık Yap</button><button data-idx="${idx}" data-a="reject">Reddet</button></div></div>`).join(''):'<p>Şimdilik teklif yok. Büyümeye devam et.</p>'}</div>`;
  el.querySelectorAll('button[data-idx]').forEach(btn=>btn.onclick=()=>{
    const idx = Number(btn.dataset.idx);
    const offer = state.investorQueue[idx]; if(!offer) return;
    if(btn.dataset.a==='accept'){
      const gain = rand(180000, 1600000); state.finance.cash += gain; state.finance.dealIncome += gain; state.office.reputation += 3; addNotification(`Yatırım kabul edildi: +${fmt(gain)}`, 'ok');
    }
    if(btn.dataset.a==='negotiate'){
      const gain = rand(120000, 900000); state.finance.cash += gain; state.office.reputation += 1; addNotification(`Pazarlıkla anlaşma sağlandı: +${fmt(gain)}`, 'ok');
    }
    if(btn.dataset.a==='reject'){ state.office.reputation += 1; addNotification('Teklif reddedildi, bağımsız büyüme sürüyor.', 'info'); }
    state.investorQueue.splice(idx,1);
    render();
  });
}

function renderOffice(el){
  const ai = DATA.aiTiers[state.ai.tierIndex];
  el.innerHTML = `<div class="card-grid">
  <div class="card"><h3>Ofis</h3><div>Seviye: ${state.office.level}</div><div>Yükseltme Sayısı: ${state.office.upgrades.length}</div><div>Çalışma Modeli: <select id="workModel"><option ${state.office.workModel==='Ofis'?'selected':''}>Ofis</option><option ${state.office.workModel==='Hibrit'?'selected':''}>Hibrit</option><option ${state.office.workModel==='Remote'?'selected':''}>Remote</option></select></div></div>
  <div class="card"><h3>AI Altyapısı</h3><div>Aktif: <b>${ai.name}</b></div><div>Hız çarpanı: ${ai.speed}</div><div>Kalite çarpanı: ${ai.quality}</div><div>Bug çarpanı: ${ai.bug}</div><button id="upgradeAiBtn">AI Seviyesini Yükselt</button></div>
  <div class="card"><h3>Yükseltmeler</h3>${DATA.upgrades.slice(0,20).map(([n,c])=>`<div class="row"><span>${n} - ${fmt(c)}</span><button data-up="${n}">Al</button></div>`).join('')}</div>
  </div>`;
  el.querySelector('#workModel').onchange=(e)=>{ state.office.workModel=e.target.value; };
  el.querySelector('#upgradeAiBtn').onclick=()=>{
    const next = DATA.aiTiers[state.ai.tierIndex+1];
    if(!next) return alert('En yüksek AI seviyesi aktif.');
    if(state.finance.cash<next.cost) return alert('Yetersiz nakit.');
    state.finance.cash-=next.cost; state.ai.tierIndex++; addNotification(`AI yükseltildi: ${next.name}`, 'ok'); render();
  };
  el.querySelectorAll('button[data-up]').forEach(btn=>btn.onclick=()=>{
    const up = DATA.upgrades.find(u=>u[0]===btn.dataset.up); if(!up) return;
    if(state.office.upgrades.includes(up[0])) return;
    if(state.finance.cash<up[1]) return alert('Yetersiz bütçe.');
    state.finance.cash-=up[1]; state.office.upgrades.push(up[0]); state.office.reputation+=2; render();
  });
}

function renderCommunity(el){
  const g = state.games[0];
  const comments = Array.from({length:12},()=>pick(DATA.comments));
  el.innerHTML = `<div class="card"><h3>Topluluk / Geri Bildirim</h3>${g?`<p>Odak Oyun: <b>${g.name}</b></p>`:'<p>Henüz oyun yayınlamadın.</p>'}
    ${comments.map(c=>`<div class="notification">"${c}"</div>`).join('')}
    <div class="row"><button id="quickPatch">Hızlı yama çıkar</button><button id="reduceAds">Reklam sıklığını azalt</button><button id="lowerPrice">Fiyat düşür</button><button id="newContent">Yeni içerik paketi</button><button id="influencer">Influencer kampanyası</button></div>
  </div>`;
  const act = (fn)=>{ if(!g) return; fn(); render(); };
  el.querySelector('#quickPatch').onclick=()=>act(()=>{ g.metrics.crashRate-=1.8; g.metrics.rating+=0.08; });
  el.querySelector('#reduceAds').onclick=()=>act(()=>{ g.adDensity-=8; g.metrics.rating+=0.1; g.metrics.dailyRevenue*=0.95; });
  el.querySelector('#lowerPrice').onclick=()=>act(()=>{ g.metrics.refundRate-=0.5; g.metrics.totalDownloads+=200; });
  el.querySelector('#newContent').onclick=()=>act(()=>{ g.metrics.communitySatisfaction+=4; g.metrics.dailyActive+=220; });
  el.querySelector('#influencer').onclick=()=>act(()=>{ state.finance.cash-=30000; g.metrics.viralGrowth+=5; g.metrics.totalDownloads+=900; });
}

function renderReports(el){
  const best = [...state.games].sort((a,b)=>b.metrics.totalRevenue-a.metrics.totalRevenue)[0];
  const worst = [...state.games].sort((a,b)=>a.metrics.totalRevenue-b.metrics.totalRevenue)[0];
  el.innerHTML = `<div class="card-grid">
    <div class="card"><h3>Pazar & Trend</h3><div>Trend: ${state.market.trend}</div><div>Rekabet: ${state.market.competition.toFixed(2)}</div><div>CPM: ${state.market.cpm.toFixed(2)}</div><div>Viral İhtimal: %${Math.round(state.market.viralChance*100)}</div></div>
    <div class="card"><h3>Performans</h3><div>En iyi oyun: ${best?best.name:'-'}</div><div>En kötü oyun: ${worst?worst.name:'-'}</div><div>Toplam kullanıcı: ${state.analytics.totalUsers.toLocaleString('tr-TR')}</div><div>Aktif projeler: ${state.projects.filter(p=>!p.done).length}</div></div>
    <div class="card"><h3>Krizler</h3>${DATA.crisisTypes.slice(0,8).map(c=>`<div>• ${c}</div>`).join('')}</div>
    <div class="card"><h3>Rakip Stüdyolar</h3>${state.rivals.map(r=>`<div>${r.name} - Güç ${r.power}</div>`).join('')}</div>
  </div>
  <div class="card" style="margin-top:10px;"><h3>Olay Günlüğü</h3>${state.eventsLog.slice(0,15).map(e=>`<div>${e}</div>`).join('')}</div>`;
}

function renderSettings(el){
  el.innerHTML = `<div class="card"><h3>Ayarlar</h3><div class="row"><button id="toggleSound">Ses ${state.meta.soundOn?'Kapat':'Aç'}</button><button id="toggleNotif">Bildirimler ${state.meta.notificationsOn?'Kapat':'Aç'}</button><button id="saveNow">Kaydet</button><button id="loadNow">Yükle</button></div><p class="small">Otomatik kayıt aktiftir. Ayrıca manuel kayıt önerilir.</p></div>`;
  el.querySelector('#toggleSound').onclick=()=>{ state.meta.soundOn=!state.meta.soundOn; render(); };
  el.querySelector('#toggleNotif').onclick=()=>{ state.meta.notificationsOn=!state.meta.notificationsOn; render(); };
  el.querySelector('#saveNow').onclick=()=>{ saveGame(); addNotification('Ayarlar ekranından kayıt yapıldı.','ok'); render(); };
  el.querySelector('#loadNow').onclick=()=>{ const s=loadGame(); if(s){ state=s; render(); } };
}

setupStartScreen();
