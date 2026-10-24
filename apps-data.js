/* 과학탐구 LAB · 공개 포털 데이터 */
window.SCIENCE_PORTAL_DATA = {
  "site": {
    "name": "과학탐구 LAB",
    "tagline": "과목별로 모은 실제 수업용 웹앱 · 새로운 도구는 계속 추가됩니다.",
    "intro": "통합과학2, 세포와 물질대사, 생물실험에 활용하는 디지털 탐구 앱을 모았습니다. 새로운 실험 앱도 과목별로 차근차근 추가할 예정입니다.",
    "subjectOrder": [
      "통합과학1",
      "통합과학2",
      "생명과학",
      "세포와 물질대사",
      "생물의 유전",
      "생물실험"
    ]
  },
  "apps": [
    {
      "id": "infection-protein-diagnosis",
      "title": "단백질을 이용한 감염병 진단 모의실험",
      "summary": "감염병 진단에서 포획 항체·시료·검출 시약의 처리와 세척을 수행하고 표준 시료와 비교하여 감염 여부를 판정합니다.",
      "subject": "통합과학2",
      "grades": [
        "고1"
      ],
      "tags": [
        "감염병",
        "항원·항체",
        "세척",
        "진단"
      ],
      "icon": "🧫",
      "kind": "html",
      "url": "apps/protein-diagnosis/index.html",
      "guide": "포획 항체 → 세척 → 시료 → 세척 → 검출 시약 → 세척 → 반응 시약 → 판정의 8단계를 진행합니다. 표준 시료와 사람 검체의 색 변화를 비교하여 감염 여부를 판단하세요.",
      "featured": true,
      "visible": true,
      "image": "images/protein-diagnosis.webp"
    },
    {
      "id": "peppered-moth-natural-selection",
      "title": "후추나방의 자연선택 모의실험",
      "summary": "깨끗한 숲과 오염된 숲에서 포획 확률을 조절하며 세대별 흰색·검은색 후추나방의 비율 변화를 관찰합니다.",
      "subject": "통합과학2",
      "grades": [
        "고1"
      ],
      "tags": [
        "자연선택",
        "변이",
        "환경 변화",
        "진화"
      ],
      "icon": "🦋",
      "kind": "html",
      "url": "apps/peppered-moth/index.html",
      "guide": "숲 환경과 개체별 포획 확률을 선택하고 한 세대 진행 또는 자동 진행을 실행합니다. 그래프에서 세대별 형질 비율 변화를 비교하세요.",
      "featured": true,
      "visible": true,
      "image": "images/peppered-moth.webp"
    },
    {
      "id": "foodchain-foodweb",
      "title": "먹이사슬에서 먹이그물로",
      "summary": "먹이 관계를 화살표로 연결해 먹이사슬을 완성하고, 여러 사슬을 먹이그물로 결합하며 영양 단계를 비교합니다.",
      "subject": "통합과학2",
      "grades": [
        "고1"
      ],
      "tags": [
        "먹이사슬",
        "먹이그물",
        "에너지 전달",
        "영양 단계"
      ],
      "icon": "🌿",
      "kind": "html",
      "url": "apps/foodchain-foodweb/index.html",
      "guide": "기본 또는 심화 모드를 선택하세요. 생물을 배치한 다음 먹히는 생물에서 먹는 생물 방향으로 화살표를 연결합니다. 먹이그물을 완성한 뒤 영양 단계를 분석하세요.",
      "featured": true,
      "visible": true,
      "image": "images/foodchain-foodweb.webp"
    },
    {
      "id": "population-predator-prey",
      "title": "개체군 변동 모의실험",
      "summary": "눈신토끼와 스라소니의 개체수 변화를 그래프로 관찰하고 포식자·피식자 관계에 따른 증감의 시간차를 해석합니다.",
      "subject": "통합과학2",
      "grades": [
        "고1"
      ],
      "tags": [
        "개체군",
        "포식·피식",
        "스라소니",
        "그래프"
      ],
      "icon": "🐇",
      "kind": "html",
      "url": "apps/population-dynamics/index.html",
      "guide": "실험 시작을 눌러 30년 동안 두 개체군의 변화를 관찰합니다. 첫 주기의 최고점과 4개 구간의 증가·감소를 비교하고 결과를 설명해 보세요.",
      "featured": true,
      "visible": true,
      "image": "images/population-dynamics.webp"
    },
    {
      "id": "metabolism-yeast-fermentation",
      "title": "효모의 발효 실험실",
      "summary": "포도당 농도·효모액 농도·온도를 조작 변인으로 선택하고 가설·변인을 설계한 뒤, CO₂ 농도 변화를 측정하는 단계별 모의실험입니다.",
      "subject": "세포와 물질대사",
      "grades": [
        "고2"
      ],
      "tags": [
        "발효",
        "세포 호흡",
        "조작 변인",
        "CO₂ 측정"
      ],
      "icon": "🍞",
      "kind": "html",
      "url": "apps/yeast-fermentation/index.html",
      "guide": "① 포도당 농도·효모액 농도·온도 중 한 가지 조작 변인을 선택합니다. ② 가설과 조작·통제·종속 변인을 작성합니다. ③ 실험 장치를 준비하여 조건별 CO₂ 농도 변화를 측정하고 그래프의 증가 속도를 비교하세요. 실제 센서와 연결되지는 않는 모의실험입니다.",
      "featured": true,
      "visible": true,
      "image": "images/yeast-fermentation.webp"
    },
    {
      "id": "metabolism-germinating-beans",
      "title": "발아콩의 물질대사와 에너지대사",
      "summary": "마른콩과 발아콩을 각각 측정한 뒤 이산화탄소 농도·온도 변화를 비교하고, 물질대사와 에너지대사를 탐구하는 모의실험입니다.",
      "subject": "세포와 물질대사",
      "grades": [
        "고2"
      ],
      "tags": [
        "세포 호흡",
        "발아콩",
        "CO₂ 농도",
        "온도 변화"
      ],
      "icon": "🌱",
      "kind": "html",
      "url": "apps/germinating-beans/index.html",
      "guide": "① 마른콩 25 g을 바이오챔버에 넣고 센서를 설치해 측정합니다. ② 발아콩을 같은 순서로 측정합니다. ③ 두 조건의 CO₂ 농도와 온도 변화를 그래프·표로 비교하고 결과를 해석하세요. 교육용 모의 데이터입니다.",
      "featured": true,
      "visible": true,
      "image": "images/germinating-beans.webp"
    },
    {
      "id": "biology-red-blood-cell-count",
      "title": "적혈구 수 측정",
      "summary": "혈구계산판 사진을 확대하고 적혈구를 직접 클릭·터치하여 계수하는 실험 도구입니다.",
      "subject": "생물실험",
      "grades": [
        "고2",
        "고3"
      ],
      "tags": [
        "적혈구",
        "혈구계산판",
        "수동 계수",
        "이미지 분석"
      ],
      "icon": "🩸",
      "kind": "html",
      "url": "apps/red-blood-cell-count/index.html",
      "guide": "현미경 사진을 불러오거나 예제 사진으로 연습합니다. 계수 모드에서 세포 중심을 눌러 표시하고, 확대·이동·삭제 기능을 활용하세요. 계수 규칙을 적용한 후 결과 사진 또는 작업 파일을 저장할 수 있습니다.",
      "featured": true,
      "visible": true,
      "image": "images/red-blood-cell-count.webp"
    },
    {
      "id": "biology-centrifuge-rcf-rpm-converter",
      "title": "원심분리기 RCF ↔ RPM 변환기",
      "summary": "로터 반경 또는 기기 사양을 설정하여 상대원심력(×g)과 회전속도(rpm)를 간편하게 상호 변환하는 실험 계산 도구입니다.",
      "subject": "생물실험",
      "grades": [
        "고2",
        "고3"
      ],
      "tags": [
        "원심분리",
        "RCF",
        "RPM",
        "원심분획"
      ],
      "icon": "🌀",
      "kind": "html",
      "url": "apps/rcf-rpm-converter.html",
      "guide": "① 로터 반경을 직접 입력하거나 최대 RPM·RCF에서 계산하거나 등록된 기기를 선택합니다. ② 목표 ×g를 입력해 RPM을 계산하고, RPM을 입력해 ×g를 확인합니다. ③ 빠른 참고표와 복사 기능을 활용하세요. CF-10 기본 반경은 추정값이므로 실제 로터 사양을 반드시 확인해야 합니다.",
      "featured": true,
      "visible": true,
      "image": "images/rcf-rpm-converter.webp"
    },
    {
      "id": "biology-daphnia-heart-rate",
      "title": "물벼룩 심장박동수 측정",
      "summary": "현미경 영상을 불러와 심장 영역을 지정한 후 박동 신호를 분석하고, 피크를 직접 보정하여 BPM과 처리 조건별 결과를 비교하는 실험 도구입니다.",
      "subject": "생물실험",
      "grades": [
        "고2",
        "고3"
      ],
      "tags": [
        "물벼룩",
        "심장박동",
        "영상 분석",
        "BPM"
      ],
      "icon": "💓",
      "kind": "html",
      "url": "apps/daphnia-heart-rate.html",
      "guide": "① 물벼룩 관찰 영상을 불러오거나 연습 영상을 선택합니다. ② 심장 부위를 드래그해 지정하고 영상의 슬로모션 배수와 분석 구간을 설정합니다. ③ 박동 신호 분석 후 그래프의 피크를 추가하거나 삭제해 검출 결과를 보정합니다. ④ 처리 조건과 개체 정보를 기록해 대조군·처리군의 BPM을 비교하세요. 연습 영상은 모의 데이터입니다.",
      "featured": true,
      "visible": true,
      "image": "images/daphnia-heart-rate.webp"
    }
  ]
};
