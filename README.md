# 과학탐구 LAB — 수업용 웹앱 포털

과목별로 수업용 웹앱을 모아 실행할 수 있는 **공개형 정적 홈페이지**입니다. HTML 단일 파일로 작성된 실험 앱과 이미 인터넷에 공개된 앱 URL을 함께 등록할 수 있습니다. 이번 배포본에는 **실제 HTML 수업용 앱 6개**가 포함되어 있으며, 나머지 과목은 앞으로 앱을 추가할 수 있도록 남겨 두었습니다.

## 1. 포함된 웹앱

| 과목 | 앱 이름 | 실행 경로 |
|---|---|---|
| 통합과학2 | 단백질을 이용한 감염병 진단 모의실험 | `apps/protein-diagnosis/index.html` |
| 통합과학2 | 후추나방의 자연선택 모의실험 | `apps/peppered-moth/index.html` |
| 통합과학2 | 먹이사슬에서 먹이그물로 | `apps/foodchain-foodweb/index.html` |
| 통합과학2 | 개체군 변동 모의실험 | `apps/population-dynamics/index.html` |
| 세포와 물질대사 | 효모의 발효 실험실 | `apps/yeast-fermentation/index.html` |
| 세포와 물질대사 | 발아콩의 물질대사와 에너지대사 | `apps/germinating-beans/index.html` |

6개의 HTML 앱 파일은 사용자가 제공한 원본을 그대로 복사했고 **앱 내부 기능은 수정하지 않았습니다**. `images/` 폴더에는 각 앱의 시작 화면을 담은 WebP 썸네일이 있습니다.

### 유지되는 과목 메뉴

**통합과학1 / 통합과학2 / 생명과학 / 세포와 물질대사 / 생물의 유전 / 생물실험**

새 앱이 아직 없는 과목에는 `아직 등록된 웹앱이 없습니다` 안내가 표시됩니다. 이전 버전의 **가상의 예시 카드들은 정리**했습니다. 실제 수업용 앱만 표시됩니다.

## 2. 실행 방법

ZIP을 압축 해제한 후 `science-webapp-portal/index.html`을 열고 과목을 선택하세요. 앱 카드의 **앱 실행**을 누르면 새 창에서 해당 HTML 앱을 열 수 있습니다. 검색, 학년 필터, 즐겨찾기를 이용할 수도 있습니다.

앱에 따라 브라우저의 로컬 파일 제한이 적용될 수 있으므로 웹으로 공개한 후 최종 동작도 점검하는 것이 좋습니다.

## 3. 새 웹앱을 하나씩 추가하기

1. `manage.html`을 열어 **＋ 새 앱 추가**를 누릅니다.
2. 앱 이름, 설명, 과목, 대상 학년, 태그, 사용법을 입력합니다.
3. HTML 파일이 있는 경우 `apps/새앱명/index.html`에 복사하고 해당 상대 경로를 입력합니다. 외부에 이미 게시된 앱이면 `https://...` URL을 입력합니다.
4. **변경사항 저장**을 누릅니다. 이 단계는 **현재 브라우저의 임시 저장**일 뿐 공개 사이트에 자동으로 반영되지 않습니다.
5. **배포용 목록 파일 다운로드**를 눌러 받은 `apps-data.js`로 기존 파일을 교체합니다.
6. 새 HTML 앱 파일과 이미지 파일도 함께 GitHub 저장소에 업로드하면 모두에게 공개됩니다.

`manage.html`의 **JSON 백업** 기능을 사용하면 등록한 목록을 따로 보관할 수 있습니다.

## 4. Github Pages 공개 방법

1. GitHub에서 공개 저장소(Public)를 하나 만듭니다. 예: `science-lab`.
2. `science-webapp-portal/` 폴더 **안의 파일과 하위 폴더**를 저장소 최상위에 올립니다. 최상위에 `index.html`이 있어야 합니다.
3. 저장소의 **Settings → Pages → Source → Deploy from a branch**를 선택합니다.
4. **Branch: main / (root)**를 선택해 저장합니다.
5. 게시가 완료되면 `https://깃허브아이디.github.io/science-lab/` 주소로 접속할 수 있습니다.

공식 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 5. 파일 구조와 공개 주의사항

- `index.html`: 학생이 보는 홈페이지
- `manage.html`: 앱 카드를 등록·수정하는 로컬 관리 화면
- `apps-data.js`: 등록된 웹앱 목록과 분류 순서
- `portal.js`, `manage.js`, `styles.css`: 화면과 기능
- `apps/`: 직접 게시하는 HTML 웹앱 모음
- `images/`: 실제 앱 화면의 카드 썸네일

**주의:** GitHub Pages에 올린 HTML과 코드, 이미지 등은 공개 저장소에 들어갑니다. 학생 개인정보·비밀번호·비공개 API 키·학교 내부 기기관리 정보가 포함된 파일은 업로드하지 마세요. `manage.html`은 별도 관리자 인증 시스템이 아니며, 편집은 GitHub 저장소의 쓰기 권한 없이 공개 사이트를 바꿀 수 없습니다.

## 6. 기존 데이터를 편집한 경우

이 ZIP의 `apps-data.js`에는 실제 앱 6개가 등록되어 있습니다. 이전 포털을 개인적으로 수정한 경우에는 신규 파일로 바로 덮어쓰면 기존 편집 내용이 사라질 수 있으니 먼저 JSON 백업을 만든 뒤 목록을 병합하세요.

---

이 포털은 별도 유료 서버 없이 HTML/CSS/JavaScript로 실행됩니다.
