(() => {
  'use strict';
  const $=id=>document.getElementById(id),key='sciencePortalDraftV1';
  const published=window.SCIENCE_PORTAL_DATA || {site:{},apps:[]};
  const deepClone=obj=>JSON.parse(JSON.stringify(obj));
  let data=deepClone(published),selected=0,adding=false;
  try{const stored=JSON.parse(localStorage.getItem(key));if(stored&&Array.isArray(stored.apps))data=stored}catch(e){}
  function saveDraft(){try{localStorage.setItem(key,JSON.stringify(data))}catch(e){toast('브라우저에 임시 저장할 수 없습니다. 배포용 파일을 다운로드하세요.')}}
  function toast(msg){$('toast').textContent=msg;$('toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>{$('toast').hidden=true},3700)}
  function safeUrl(url){if(!url.trim())return true;const u=url.trim();if(/^(apps\/|\.\/apps\/)/.test(u)&&!u.includes('..')&&!u.includes('\\'))return true;if(/^https?:\/\//i.test(u)){try{return ['https:','http:'].includes(new URL(u).protocol)}catch(e){return false}}return false}
  function safeImageUrl(url){return safeUrl(url) || (/^(images\/|\.\/images\/)/.test(url) && !url.includes('..') && !url.includes('\\'))}
  function generateId(){let id='app-'+Date.now();let n=1;while(data.apps.some(a=>a.id===id))id='app-'+Date.now()+'-'+n++;return id}
  function emptyApp(){return {id:generateId(),title:'',summary:'',subject:'통합과학1',grades:[],tags:[],icon:'🔬',kind:'html',url:'',guide:'',featured:false,visible:true,image:''}}
  function h(tag,cls,content){let el=document.createElement(tag);if(cls)el.className=cls;if(content!==undefined)el.textContent=String(content);return el}
  function updateList(){
    $('appCounter').textContent=data.apps.length;
    const list=$('manageList');list.replaceChildren();
    data.apps.forEach((app,i)=>{
      const row=h('div','manage-item'+(!adding && i===selected?' selected':''));
      const choose=h('button','', '');choose.type='button';choose.setAttribute('aria-label',app.title+' 편집');choose.style.cssText='display:flex;align-items:center;gap:9px;text-align:left;flex:1;min-width:0;border:0;background:transparent;cursor:pointer;color:inherit;padding:0';
      const icon=h('span','mi-icon',app.icon||'🔬'),label=h('span','mi-main');label.append(h('strong','',app.title||'제목 없는 앱'),h('small','',app.url?.trim()?'● 주소 연결됨':'○ 주소 미등록'));choose.append(icon,label);choose.addEventListener('click',()=>{adding=false;selected=i;showForm();updateList()});row.append(choose);
      const up=h('button','manage-btn neutral','↑');up.type='button';up.title='위로 이동';up.setAttribute('aria-label',app.title+' 위로 이동');up.style.padding='4px 7px';up.disabled=i===0;up.addEventListener('click',()=>move(i,-1));
      const down=h('button','manage-btn neutral','↓');down.type='button';down.title='아래로 이동';down.setAttribute('aria-label',app.title+' 아래로 이동');down.style.padding='4px 7px';down.disabled=i===data.apps.length-1;down.addEventListener('click',()=>move(i,1));row.append(up,down);list.append(row)
    });
    if(!data.apps.length)list.append(h('p','help-text','등록된 앱이 없습니다. 새 앱 추가 버튼을 눌러 주세요.'));
  }
  function move(index,offset){const [item]=data.apps.splice(index,1);data.apps.splice(index+offset,0,item);if(!adding){if(selected===index)selected=index+offset;else if(selected===index+offset)selected=index}saveDraft();updateList()}
  function setSite(){ $('siteName').value=data.site?.name||'';$('siteTagline').value=data.site?.tagline||'';$('siteIntro').value=data.site?.intro||''; }
  function showForm(){
    const app=adding?emptyApp():data.apps[selected]; if(!app){adding=true;return showForm()}
    $('formTitle').textContent=adding?'새 웹앱 등록':'앱 정보 편집';$('editBadge').textContent=adding?'새로 등록':`#${selected+1} · ${app.url?.trim()?'주소 연결됨':'예시/대기'}`;
    $('appTitle').value=app.title||'';$('appSummary').value=app.summary||'';$('appSubject').value=app.subject||'통합과학1';$('appIcon').value=app.icon||'';$('appTags').value=(app.tags||[]).join(', ');
    $('appKind').value=app.kind==='external'?'external':'html';$('appUrl').value=app.url||'';$('appImage').value=app.image||'';$('appGuide').value=app.guide||'';
    $('appFeatured').checked=!!app.featured;$('appVisible').checked=app.visible!==false;
    ['고1','고2','고3'].forEach((grade,i)=>$('grade'+(i+1)).checked=(app.grades||[]).includes(grade));
    $('deleteApp').hidden=adding;$('urlHint').textContent=$('appKind').value==='html'?'HTML 파일은 apps/ 폴더에 넣고 상대 경로를 입력합니다.':'https://로 시작하는 공개 웹앱 주소를 입력합니다.';
  }
  function getForm(){
    const original=adding?emptyApp():data.apps[selected];
    return {...original,title:$('appTitle').value.trim(),summary:$('appSummary').value.trim(),subject:$('appSubject').value,icon:$('appIcon').value.trim()||'🔬',grades:['고1','고2','고3'].filter((g,i)=>$('grade'+(i+1)).checked),tags:$('appTags').value.split(',').map(x=>x.trim()).filter(Boolean).slice(0,7),kind:$('appKind').value,url:$('appUrl').value.trim(),image:$('appImage').value.trim(),guide:$('appGuide').value.trim(),featured:$('appFeatured').checked,visible:$('appVisible').checked};
  }
  $('appForm').addEventListener('submit',e=>{
    e.preventDefault();const app=getForm();
    if(!app.title||!app.summary){toast('이름과 설명은 필수입니다.');return}
    if(!safeUrl(app.url)){toast('실행 주소는 https:// 또는 apps/ 경로로 시작해야 합니다.');$('appUrl').focus();return}
    if(app.image && !safeImageUrl(app.image)){toast('이미지는 https:// 또는 images/ 경로를 이용하세요.');return}
    if(adding){selected=data.apps.length;data.apps.push(app);adding=false}else data.apps[selected]=app;
    saveDraft();showForm();updateList();toast('브라우저에 임시 저장했습니다. 공개 적용은 배포용 파일 교체가 필요합니다.')
  });
  $('appKind').addEventListener('change',()=>{$('urlHint').textContent=$('appKind').value==='html'?'예: apps/daphnia/index.html · 해당 파일도 같이 업로드합니다.':'예: https://example.com/my-app'});
  $('addApp').addEventListener('click',()=>{adding=true;showForm();updateList();$('formPanel').scrollIntoView({behavior:'smooth'});$('appTitle').focus({preventScroll:true})});
  $('deleteApp').addEventListener('click',()=>{const app=data.apps[selected];if(!app)return;if(!confirm('"'+app.title+'" 앱을 목록에서 삭제할까요?'))return;data.apps.splice(selected,1);selected=Math.max(0,Math.min(selected,data.apps.length-1));adding=!data.apps.length;saveDraft();updateList();showForm();toast('앱을 목록에서 삭제했습니다.')});
  $('saveSite').addEventListener('click',()=>{data.site={...data.site,name:$('siteName').value.trim()||'과학탐구 LAB',tagline:$('siteTagline').value.trim(),intro:$('siteIntro').value.trim()};saveDraft();toast('사이트 문구를 임시 저장했습니다.')});
  function download(name,textContent,mime){const blob=new Blob([textContent],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)}
  $('exportJs').addEventListener('click',()=>{download('apps-data.js','/* 과학탐구 LAB · 공개 포털 데이터 */\nwindow.SCIENCE_PORTAL_DATA = '+JSON.stringify(data,null,2)+';\n','text/javascript;charset=utf-8');toast('배포용 apps-data.js를 다운로드했습니다. 기존 파일과 교체하세요.')});
  $('exportJson').addEventListener('click',()=>{download('apps-backup.json',JSON.stringify(data,null,2)+'\n','application/json;charset=utf-8');toast('JSON 백업을 다운로드했습니다.')});
  $('preview').addEventListener('click',()=>{saveDraft();window.open('index.html?preview=1','_blank','noopener')});
  $('resetDraft').addEventListener('click',()=>{if(!confirm('브라우저의 편집 내용을 지우고 현재 폴더의 apps-data.js 목록을 다시 불러올까요?'))return;data=deepClone(published);selected=0;adding=!data.apps.length;localStorage.removeItem(key);setSite();showForm();updateList();toast('배포본으로 초기화했습니다.')});
  $('importFile').addEventListener('change',async e=>{
    const file=e.target.files?.[0];if(!file)return;
    try{
      let contents=await file.text();const eq=contents.indexOf('=');
      if(file.name.endsWith('.js')){if(!/^\s*(?:\/\*[\s\S]*?\*\/\s*)?window\.SCIENCE_PORTAL_DATA\s*=/.test(contents))throw new Error('포털용 apps-data.js 형식이 아닙니다.');contents=contents.slice(eq+1).trim().replace(/;\s*$/,'')}
      const incoming=JSON.parse(contents);if(!incoming||!Array.isArray(incoming.apps)||typeof incoming.site!=='object'||incoming.apps.length>500)throw new Error('올바른 포털 데이터가 아닙니다.');
      if(!confirm('현재 브라우저의 편집 중인 목록을 가져온 파일로 바꿀까요?'))return;
      data=deepClone(incoming);selected=0;adding=!data.apps.length;saveDraft();setSite();showForm();updateList();toast('목록을 성공적으로 불러왔습니다.');
    }catch(err){toast('목록을 불러오지 못했습니다: '+err.message)}finally{e.target.value=''}
  });
  adding=!data.apps.length;setSite();updateList();showForm();
})();
