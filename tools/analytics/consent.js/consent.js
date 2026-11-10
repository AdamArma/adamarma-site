// consent.js – Consent-based analytics (never auto-load)
(function(){
"use strict";
var STORAGE_KEY="analytics_consent";
var lang=navigator.language||navigator.userLanguage||"en";
var LOCALES={
en:{title:"Privacy Preference Center",desc:"We use analytics to improve this site. Data is processed only after you opt-in. No webvisor or ad personalization.",allow:"Allow",decline:"Decline",withdraw:"Withdraw consent"},
ru:{title:"Центр предпочтений конфиденциальности",desc:"Мы используем аналитику для улучшения сайта. Данные обрабатываются только после вашего согласия. Нет вебвизора и персонализации рекламы.",allow:"Разрешить",decline:"Отклонить",withdraw:"Отозвать согласие"},
ar:{title:"مركز تفضيلات الخصوصية",desc:"نستخدم التحليلات لتحسين الموقع. تُعالج البيانات فقط بعد موافقتك. لا ميزات تصوير ويب أو تخصيص إعلانات.",allow:"السماح",decline:"رفض",withdraw:"سحب الموافقة"},
fa:{title:"مرکز ترجیحات حریم خصوصی",desc:"برای بهبود سایت از تجزیه و تحلیل استفاده می‌کنیم. داده‌ها فقط پس از رضایت شما پردازش می‌شوند.",allow:"اجازه دادن",decline:"رد",withdraw:"پس‌گیری رضایت"},
he:{title:"מרכז העדפות פרטיות",desc:"אנו משתמשים בניתוח לשיפור האתר. נתונים מעובדים רק לאחר הסכמתך. ללא webvisor או התאמה אישית של מודעות.",allow:"לאפשר",decline:"לדחות",withdraw:"ביטול הסכמה"},
zh:{title:"偏好中心",desc:"我们使用分析工具来改进网站。数据仅在您同意后处理。",allow:"允许",decline:"拒绝",withdraw:"撤销同意"},
ja:{title:"プライバシー設定センター",desc:"当サイトは分析を使用します。データは同意後に処理されます。",allow:"許可",decline:"拒否",withdraw:"同意を取り消す"},
ko:{title:"개인정보 선호 센터",desc:"분석을 사용하여 사이트를 개선합니다. 데이터는 동의後に만 처리됩니다.",allow:"허용",decline:"거절",withdraw:"동의 철회"},
de:{title:"Privatsphäre-Einstellungen",desc:"Wir nutzen Analytik zur Verbesserung der Seite. Daten nur nach Einwilligung.",allow:"Erlauben",decline:"Ablehnen",withdraw:"Zustimmung widerrufen"},
es:{title:"Centro de preferencias de privacidad",desc:"Usamos analítica para mejorar el sitio. Datos solo tras su consentimiento.",allow:"Permitir",decline:"Rechazar",withdraw:"Retirar consentimiento"},
fr:{title:"Centre de préférences de confidentialité",desc:"Nous utilisons l'analyse pour améliorer ce site. Données uniquement après consentement.",allow:"Autoriser",decline:"Refuser",withdraw:"Retirer son consentement"},
pt:{title:"Centro de preferências de privacidade",desc:"Usamos análise para melhorar o site. Dados apenas após consentimento.",allow:"Permitir",decline:"Recusar",withdraw:"Revogar consentimento"},
it:{title:"Centro preferenze sulla privacy",desc:"Utilizziamo analisi per migliorare il sito. Dati solo dopo il consenso.",allow:"Consenti",decline:"Rifiuta",withdraw:"Revoca consenso"},
tr:{title:"Gizlilik Tercih Merkezi",desc:"Siteyi iyileştirmek için analitik kullanıyoruz. Veriler yalnızca rızanızla işlenir.",allow:"İzin ver",decline:"Reddet",withdraw:"Onayı geri çek"},
pl:{title:"Centrum preferencji prywatności",desc:"Używamy analityki do ulepszenia strony. Dane tylko po zgodzie.",allow:"Zezwól",decline:"Odrzuć",withdraw:"Cofnąć zgodę"},
nl:{title:"Privacy-voorkeurencentrum",desc:"We gebruiken analytics om de site te verbeteren. Gegevens alleen na toestemming.",allow:"Toestaan",decline:"Weigeren",withdraw:"Toestemming intrekken"},
sv:{title:"Integritetsinställningar",desc:"Vi använder analys för att förbättra webbplatsen. Data endast med samtycke.",allow:"Tillåt",decline:"Neka",withdraw:"Ångra samtycke"},
vi:{title:"Trung tâm tùy chọn quyền riêng tư",desc:"Chúng tôi dùng phân tích để cải thiện trang. Dữ liệu chỉ khi có đồng ý.",allow:"Cho phép",decline:"Từ chối",withdraw:"Thu hồi đồng ý"},
th:{title:"ศูนย์เลือกปฏิบัติความเป็นส่วนตัว",desc:"เราใช้การวิเคราะห์เพื่อปรับปรุงเว็บไซต์ ข้อมูลจะประมวลผลเมื่อได้รับอนุญาตเท่านั้น",allow:"อนุญาต",decline:"ปฏิเสธ",withdraw:"เพิกถอนความยินยอม"},
id:{title:"Pusat Preferensi Privasi",desc:"Kami menggunakan analitik untuk meningkatkan situs. Data hanya diproses dengan persetujuan Anda.",allow:"Izinkan",decline:"Tolak",withdraw:"Cabut persetujuan"},
ms:{title:"Pusat Keutamaan Peribadi",desc:"Kami menggunakan analitik untuk meningkatkan tapak. Data hanya diproses dengan kebenaran anda.",allow:"Benarkan",decline:"Tolak",withdraw:"Membatalkan kebenaran"},
uk:{title:"Центр налаштувань конфіденційності",desc:"Ми використовуємо аналітику для покращення сайту. Дані обробляються лише за вашої згоди.",allow:"Дозволити",decline:"Відхилити",withdraw:"Скасувати згоду"},
cs:{title:"Centrum předvoleb ochrany osobních údajů",desc:"Používáme analytiku ke zlepšování webu. Data pouze po souhlasu.",allow:"Povolit",decline:"Odmítnout",withdraw:"Odvolat souhlas"},
el:{title:"Κέντρο Προτιμήσεων Απορρήτου",desc:"Χρησιμοποιούμε αναλυτικά για τη βελτίωση του ιστότοπου. Δεδομένα μόνο με συναίνεση.",allow:"Να επιτραπεί",decline:"Απόρριψη",withdraw:"Ανάκληση συναίνεσης"},
hu:{title:"Adatvédelmi beállítások",desc:"Elemzést használunk a weboldal javítására. Adatok csak hozzájárulás után.",allow:"Engedélyezem",decline:"Elutasítom",withdraw:"Hozzájárulás visszavonása"},
ro:{title:"Centru de preferințe privind confidențialitatea",desc:"Folosim analiză pentru îmbunătățirea site-ului. Date doar cu consimțământul dvs.",allow:"Permite",decline:"Respinge",withdraw:"Retragerea consimțământului"},
da:{title:"Indstillinger for privatliv",desc:"Vi bruger analyse til at forbedre siden. Data kun med samtykke.",allow:"Tillad",decline:"Afvise",withdraw:"Tilbagekald samtykke"},
fi:{title:"Tietosuojasetukset",desc:"Käytämme analytiikkaa sivuston parantamiseen. Tiedot vain suostumuksella.",allow:"Hyväksy",decline:"Hylkää",withdraw:"Peru suostumus"},
no:{title:"Innstillinger for personvern",desc:"Vi bruker analyse for å forbedre nettstedet. Data kun med samtykke.",allow:"Tillat",decline:"Avvis",withdraw:"Tilbakekall samtykke"}
};
var L=LOCALES[lang.substr(0,2)]||LOCALES[en];
function t(key){return LOCALES[lang.substr(0,2)]?[LOCALES[lang.substr(0,2)][key]]:key;}
var s=localStorage.getItem(STORAGE_KEY);
var ga4Id=null,ymId=null;
document.querySelectorAll("script[src='/assets/analytics/consent.js']").forEach(function(s){ga4Id=s.getAttribute("data-ga4");ymId=s.getAttribute("data-ym");});
if(s==="granted"){
if(ga4Id)loadGA4(ga4Id);
if(ymId)loadYM(ymId);
return;
}
if(s==="denied")return;
var banner=document.createElement("div");banner.id="ac-banner";
banner.innerHTML="
  &lt;div class='ac-inner'&gt;
    &lt;h3&gt;"+L.title+"&lt;/h3&gt;
    &lt;p&gt;"+L.desc+"&lt;/p&gt;
    &lt;div class='ac-btns'&gt;
      &lt;button id='ac-allow'&gt;"+L.allow+"&lt;/button&gt;
      &lt;button id='ac-decline'&gt;"+L.decline+"&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
";
banner.style.cssText="
  position:fixed;bottom:0;left:0;right:0;z-index:2147483647;
  background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);
  color:#e8d5b7;font-family:system-ui,-apple-system,sans-serif;
  border-top:2px solid #c9a84c;padding:16px 20px;
  box-shadow:0 -4px 20px rgba(0,0,0,.4);
  animation:acSlideUp .4s ease-out;
";
var inner=banner.querySelector(".ac-inner");
inner.style.cssText="max-width:600px;margin:0 auto;display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;";
var h3=banner.querySelector("h3");
h3.style.cssText="margin:0;font-size:16px;color:#e8d5b7;font-weight:600;";
var p=banner.querySelector("p");
p.style.cssText="margin:0;font-size:13px;color:#c9a84c;line-height:1.5;";
var btns=banner.querySelector(".ac-btns");
btns.style.cssText="display:flex;gap:12px;margin-top:4px;flex-wrap:wrap;justify-content:center;";
var allowBtn=banner.querySelector("#ac-allow");
var declineBtn=banner.querySelector("#ac-decline");
function styleBtn(b){
  b.style.cssText="
    padding:8px 24px;border:1px solid #c9a84c;border-radius:6px;
    background:transparent;color:#e8d5b7;cursor:pointer;font-size:13px;font-weight:500;
    transition:all .2s;
  ";
  b.onmouseover=function(){this.style.background="#c9a84c";this.style.color="#1a1a2e";};
  b.onmouseout=function(){this.style.background="transparent";this.style.color="#e8d5b7";};
}
styleBtn(allowBtn);styleBtn(declineBtn);
allowBtn.onclick=function(){
  localStorage.setItem(STORAGE_KEY,"granted");
  document.body.removeChild(banner);
  if(ga4Id)loadGA4(ga4Id);
  if(ymId)loadYM(ymId);
};
declineBtn.onclick=function(){
  localStorage.setItem(STORAGE_KEY,"denied");
  document.body.removeChild(banner);
};
document.head.appendChild(banner);
var style=document.createElement("style");
style.textContent="@keyframes acSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}"+
  "body .ac-banner .ac-inner button:hover{background:#c9a84c;color:#1a1a2e}"+
  "@media(max-width:480px){body .ac-inner{padding:8px}}";
document.head.appendChild(style);
function loadGA4(id){
  var s=document.createElement("script");s.defer=true;s.src="https://www.googletagmanager.com/gtag/js?id="+id;
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
  gtag("js",new Date());gtag("config",id,{send_page_view:false,allow_ad_personalization_signals:false});
}
function loadYM(id){
  (function(m,e,t,r,i,a,k){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments);};
  m[i].l=1*new Date();for(var j=0;j&lt;document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
  a=e.createElement(t);k=e.getElementsByTagName(t)[0];a.defer=true;a.src=r;i=i;k.parentNode.insertBefore(a,k);})(window,document,"script","https://mc.yandex.ru/metrika/tag.js",{"id":id,"trackLinks":true,"webvisor":false,"clickmap":true,"ecommerce":"data","accurateTrackBounce":true,"enhancedEcommerce":false});
  try{ym(id,"init",{webvisor:false,enhancedEcommerce:false,trackHash:true,trackLinks:true, params:{__gp:"1"}});}catch(e){}
}
})();
