(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const stored = new URLSearchParams(location.search).get('preview') === '1' ? localStorage.getItem('sciencePortalDraftV1') : null;
  let data = window.SCIENCE_PORTAL_DATA || {site:{},apps:[]};
  if (stored) { try { const parsed=JSON.parse(stored);if(parsed && Array.isArray(parsed.apps)) data=parsed; } catch(e){} }
  const apps = (Array.isArray(data.apps) ? data.apps : []).filter(x=>x.visible !== false);
  const favKey = 'sciencePortalFavoritesV1';
  let favorites = new Set();
  try { favorites = new Set(JSON.parse(localStorage.getItem(favKey) || '[]')); } catch(e) {}
  let subject = 'all', showFavorites = false, lastFocus = null;
  const tint={"통합과학1":"#ebf4f2","통합과학2":"#edf4ff","생명과학":"#edf4e9","세포와 물질대사":"#fff6e7","생물의 유전":"#f4eefb","생물실험":"#f0f4f9"};
  const subjectBlurb={
    "통합과학1":"기초 개념과 탐구 활동을 돕는 실험·분석 도구",
    "통합과학2":"생태·감염병·시스템 이해를 돕는 시뮬레이션 도구",
    "생명과학":"항상성, 세포, 진화 등 생명 현상을 탐구하는 도구",
    "세포와 물질대사":"광합성, 호흡, 발효 등 물질대사 단원용 도구",
    "생물의 유전":"가계도, 형질 분리, 유전자형 해석 도구",
    "생물실험":"실험 수행과 데이터 정리를 돕는 보조 도구"
  };
  const subjectOrder = Array.isArray(data.site?.subjectOrder) && data.site.subjectOrder.length ? data.site.subjectOrder : [...new Set(apps.map(a=>a.subject).filter(Boolean))];
  function text(el,value){ el.textContent=String(value ?? '');return el; }
  function node(tag,cls,contents){const el=document.createElement(tag);if(cls)el.className=cls;if(contents!==undefined)text(el,contents);return el;}
  function isSafeUrl(url) {
    if (typeof url !== 'string' || !url.trim()) return false;
    const u=url.trim();
    if (/^(apps\/|\.\/apps\/)/i.test(u) && !u.includes('..') && !u.includes('\\')) return true;
    if (/^https?:\/\//i.test(u)) { try { const parsed=new URL(u);return ['https:','http:'].includes(parsed.protocol); } catch(e){return false;} }
    return false;
  }
  function isSafeImage(url){return isSafeUrl(url) || (typeof url==='string' && /^(images\/|\.\/images\/)/.test(url) && !url.includes('..') && !url.includes('\\'));}
  function effectiveUrl(url){return isSafeUrl(url) ? url.trim() : ''}
  const title=data.site?.name || '과학탐구 LAB';
  document.title=title+' | 웹앱 라이브러리';
  text($('brandName'),title);text($('footerName'),title);text($('heroIntro'),data.site?.intro || '과학 수업에 활용하는 웹앱 라이브러리입니다.');text($('sectionSub'),data.site?.tagline || '과목과 단원에 맞는 웹앱을 찾아 수업에 활용해 보세요.');
  function subjectChips(){
    const options = ['전체', ...subjectOrder.filter(Boolean)];
    const filters=$('filters');filters.replaceChildren();
    options.forEach((s,i)=>{const b=node('button','chip',s);b.type='button';b.dataset.subject=i===0?'all':s;b.setAttribute('aria-pressed',String((i===0)));b.addEventListener('click',()=>{subject=b.dataset.subject;filters.querySelectorAll('[data-subject]').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.subject===subject)));render();});filters.append(b)});
    const line=node('span','filter-divider');filters.append(line);
    const fav=node('button','chip fav-filter','☆ 즐겨찾기');fav.type='button';fav.id='favoriteFilter';fav.setAttribute('aria-pressed','false');fav.addEventListener('click',()=>{showFavorites=!showFavorites;fav.setAttribute('aria-pressed',String(showFavorites));fav.textContent=(showFavorites?'★':'☆')+' 즐겨찾기';render()});filters.append(fav);
  }
  function makeCard(app){
    const ready=!!effectiveUrl(app.url);
    const article=node('article','app-card');
    if (app.image && isSafeImage(app.image)) {
      const cover=node('div','app-preview');
      const pic=document.createElement('img');pic.src=app.image;pic.alt=(app.title||'웹앱')+' 실행 화면 미리보기';pic.loading='lazy';
      pic.onerror=()=>cover.remove();cover.append(pic);article.append(cover);
    }
    const top=node('div','card-top');const icon=node('div','app-icon',app.icon || '🔬');icon.style.setProperty('--card-tint',tint[app.subject]||'#e9f5f3');

    top.append(icon);
    const star=node('button','star-btn',favorites.has(app.id)?'★':'☆');star.type='button';star.setAttribute('aria-label',app.title+' 즐겨찾기');star.setAttribute('aria-pressed',String(favorites.has(app.id)));
    star.addEventListener('click',()=>{if(favorites.has(app.id))favorites.delete(app.id);else favorites.add(app.id);try{localStorage.setItem(favKey,JSON.stringify([...favorites]))}catch(e){}render()});top.append(star);article.append(top);
    const main=node('div','card-main'),labs=node('div','card-labels');
    labs.append(node('span','tiny-tag',app.subject || '기타'));if(app.grades?.length)labs.append(node('span','tiny-tag grade',app.grades.join(' · ')));
    main.append(labs,node('h3','',app.title || '이름 없음'),node('p','card-desc',app.summary || '앱 소개가 등록되지 않았습니다.'));
    const tags=node('div','tagline');(app.tags||[]).slice(0,4).forEach(t=>tags.append(node('span','text-tag','# '+t)));main.append(tags);article.append(main);
    const foot=node('div','card-foot'),status=node('span',ready?'app-state ready':'app-state',ready?'실행 가능':'연결 준비 중');foot.append(status);
    const actions=node('div','card-actions');const detail=node('button','text-button','상세 보기');detail.type='button';detail.addEventListener('click',()=>openModal(app));actions.append(detail);
    if(ready){const link=node('a','open-button','앱 실행 ↗');link.href=effectiveUrl(app.url);link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label',app.title+' 새 탭에서 실행');actions.append(link)}
    else actions.append(node('span','muted-button','등록 예정'));
    foot.append(actions);article.append(foot);return article;
  }
  function render(){
    const q=$('search').value.toLocaleLowerCase().trim();const grade=$('gradeSelect').value;const sort=$('sortSelect').value;
    let found=apps.filter(a => {
      const haystack=[a.title,a.summary,a.subject,a.guide,...(a.tags||[])].join(' ').toLocaleLowerCase();
      return (subject==='all'||a.subject===subject) && (grade==='all'||(a.grades||[]).includes(grade)) && (!showFavorites||favorites.has(a.id)) && (!q||haystack.includes(q));
    });
    if(sort==='name') found.sort((a,b)=>String(a.title).localeCompare(String(b.title),'ko'));
    else if(sort==='ready')found.sort((a,b)=>Number(!!effectiveUrl(b.url))-Number(!!effectiveUrl(a.url)));
    else found.sort((a,b)=>Number(!!b.featured)-Number(!!a.featured) || subjectOrder.indexOf(a.subject)-subjectOrder.indexOf(b.subject));

    const container = $('cards');
    container.replaceChildren();
    const orderedSubjects = subject==='all' ? subjectOrder : [subject];
    orderedSubjects.forEach(sub => {
      const list = found.filter(app=>app.subject===sub);
      const shouldShowEmptySubject = !q && grade==='all' && !showFavorites && !list.length;
      if(!list.length && !shouldShowEmptySubject) return;
      const section = node('section','subject-section');
      section.dataset.subject = sub;
      const header = node('div','subject-head');
      const labelWrap = node('div','subject-head-main');
      const badge = node('span','subject-badge',sub);
      const count = node('span','subject-count',list.length+'개');
      const titleWrap = node('div','subject-title-row');
      titleWrap.append(badge,count);
      labelWrap.append(titleWrap,node('p','subject-blurb',subjectBlurb[sub] || '해당 과목의 수업용 웹앱 모음'));
      header.append(labelWrap);
      if(list.length){
        const grid = node('div','cards subject-cards');
        grid.append(...list.map(makeCard));
        section.append(header,grid);
      } else {
        section.classList.add('subject-pending');
        section.append(header,node('p','pending-message','아직 등록된 웹앱이 없습니다. 새 실험 앱이 완성되면 이곳에 추가됩니다.'));
      }
      container.append(section);
    });

    $('empty').hidden=found.length>0 || (!q && grade==='all' && !showFavorites);text($('resultCount'),found.length+'개 웹앱이 검색되었습니다.');
  }
  function openModal(app){
    lastFocus=document.activeElement;const c=$('modalContent');c.replaceChildren();
    c.append(node('div','icon-big',app.icon||'🔬'),node('h2','',app.title),node('p','',app.summary));
    c.append(node('div','info-label','대상 및 교과'));c.append(node('div','info-box',(app.subject||'기타')+' · '+(app.grades||[]).join(', ')));
    c.append(node('div','info-label','사용 방법'));c.append(node('div','info-box',app.guide||'앱의 사용 안내를 등록해 주세요.'));
    const actions=node('div','modal-actions');if(effectiveUrl(app.url)){const a=node('a','btn','앱 실행 ↗');a.href=effectiveUrl(app.url);a.rel='noopener noreferrer';a.target='_blank';actions.append(a)}else actions.append(node('div','btn','앱 주소 등록 전'));
    c.append(actions);$('modalBackdrop').hidden=false;document.body.style.overflow='hidden';$('closeModal').focus();
  }
  function closeModal(){ $('modalBackdrop').hidden=true;document.body.style.overflow='';lastFocus?.focus(); }
  $('closeModal').addEventListener('click',closeModal);
  $('modalBackdrop').addEventListener('click',e=>{if(e.target===$('modalBackdrop'))closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('modalBackdrop').hidden)closeModal();if(e.key==='Tab'&&!$('modalBackdrop').hidden){const links=[...$('modalBackdrop').querySelectorAll('a[href],button:not([disabled])')];if(links.length){const first=links[0],last=links[links.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}});
  $('search').addEventListener('input',render);$('gradeSelect').addEventListener('change',render);$('sortSelect').addEventListener('change',render);
  function reset(){subject='all';showFavorites=false;$('search').value='';$('gradeSelect').value='all';$('sortSelect').value='default';subjectChips();render()}
  $('resetFilters').addEventListener('click',reset);
  text($('totalCount'),apps.length);$('setupNotice').hidden=apps.some(a=>!!effectiveUrl(a.url)) || apps.length===0;
  if(stored){const info=$('setupNotice');info.hidden=false;info.innerHTML='<span class="ico" aria-hidden="true">ⓘ</span><div><strong>관리자 미리 보기 화면입니다.</strong> 이 변경은 아직 공개 사이트에 배포되지 않았습니다. 관리 화면에서 데이터 파일을 다운로드하여 저장소의 apps-data.js와 교체하세요.</div>';}
  subjectChips();render();
})();
