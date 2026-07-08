# APCL Lab Website — 관리자용 설정 가이드

충북대학교 기계공학부 고급추진연소연구실(APCL) 홈페이지 소스입니다.
Jekyll 정적 사이트이며, GitHub Pages로 호스팅하고 `apcl.chungbuk.ac.kr` 커스텀 도메인을 연결합니다.

후배들이 내용을 수정하는 방법은 **`README_수정방법.md`**를 참고하세요. 이 문서는 최초 설정용입니다.

## 1. GitHub 저장소에 올리기

```bash
cd apcl-lab-site
git init
git add .
git commit -m "Initial commit: APCL lab site"
git branch -M main
git remote add origin https://github.com/<계정 또는 조직>/<저장소이름>.git
git push -u origin main
```

## 2. GitHub Pages 활성화

1. 저장소 → **Settings → Pages**
2. **Build and deployment → Source**: `Deploy from a branch`
3. **Branch**: `main` / `/ (root)` 선택 → Save
4. 몇 분 뒤 `https://<계정>.github.io/<저장소이름>/` 에서 접속 확인

## 3. 커스텀 도메인 연결 (apcl.chungbuk.ac.kr)

이미 저장소 루트에 `CNAME` 파일이 포함되어 있습니다 (`apcl.chungbuk.ac.kr`).

1. **학교 도메인/DNS 관리 부서(정보화본부 등)에 요청**하여 아래 레코드를 등록합니다.

   | 유형 | 호스트 | 값(Target) |
   |---|---|---|
   | CNAME | `apcl` | `<계정 또는 조직>.github.io.` |

   (조직 계정이 아니라 개인 계정 GitHub Pages를 쓰는 경우도 CNAME 방식은 동일합니다.
   IP를 직접 지정하는 A 레코드 방식은 GitHub Pages IP가 바뀔 수 있어 권장하지 않습니다.)

2. DNS가 전파되면 (보통 몇 분~몇 시간) 저장소 **Settings → Pages**에서
   Custom domain 항목에 `apcl.chungbuk.ac.kr`을 입력하고 저장합니다.
3. DNS 확인이 완료되면 **Enforce HTTPS** 체크박스를 켜서 `https://apcl.chungbuk.ac.kr`로만
   접속되도록 설정합니다 (인증서 발급까지 다소 시간이 걸릴 수 있습니다).

> 참고: 학교 도메인이 `.ac.kr`이라 서브도메인 위임/등록에 학교 내부 승인 절차가 필요할 수 있습니다.
> 정보화본부에 "GitHub Pages로 서비스하는 정적 사이트에 CNAME 레코드 등록"이라고 요청하면 됩니다.

## 4. 로컬에서 미리보기 (선택 사항)

Ruby가 설치되어 있다면:

```bash
bundle install
bundle exec jekyll serve
```

`http://localhost:4000` 에서 확인할 수 있습니다. Ruby 설치가 번거롭다면 로컬 미리보기 없이
바로 GitHub에 push해서 Pages 빌드 결과로 확인해도 무방합니다 (Actions 탭에서 빌드 로그 확인 가능).

## 5. 최초 커스터마이징 체크리스트

- [ ] `_config.yml` — 이메일, 주소, `gmap_query`(지도 검색어) 실제 정보로 수정
- [ ] `_config.yml` — `home_hero_gif`(GIF) / `home_video_file`(mp4) / `home_video_youtube_id`(유튜브) 중
      하나에 추력기 영상·움짤 연결 (우선순위: GIF > mp4 > 유튜브)
- [ ] `research.md` — 실제 연구 분야 문구로 교체, `assets/images/research/`에 같은 파일명으로 사진 추가
- [ ] `_data/members.yml` — 실제 교수님/학생 정보로 교체, 사진 업로드
- [ ] `_data/publications.yml` — 실제 논문/특허 목록으로 교체
- [ ] `_data/news.yml` — 예시 소식 삭제 후 실제 소식으로 교체
- [ ] `assets/images/members/professor.jpg` 등 실제 사진 업로드 (없으면 사진 영역이 비어 보입니다)

## 6. 커스텀 도메인 연결 시 baseurl 되돌리기 (중요)

개발 중 `https://<계정>.github.io/<저장소이름>/` 임시 주소로 미리보기하려면 `_config.yml`의
`baseurl`을 `"/저장소이름"`으로 설정해야 링크가 정상 동작합니다. 하지만 **실제 커스텀 도메인
(`apcl.chungbuk.ac.kr`)을 연결한 뒤에는 `baseurl`을 반드시 빈 문자열로 되돌려야** 합니다.

```yaml
url: "https://apcl.chungbuk.ac.kr"
baseurl: ""
```

커스텀 도메인은 루트(`/`)로 바로 서비스되기 때문에, `baseurl`이 남아있으면 반대로 모든 링크가 깨집니다.

## 폴더 구조

```
apcl-lab-site/
├── _config.yml              # 사이트 전역 설정 (관리자용)
├── _data/
│   ├── members.yml          # 구성원 명단 (후배 수정)
│   ├── publications.yml     # 논문/특허/학술대회 (후배 수정)
│   └── news.yml              # News & Gallery 소식 (후배 수정)
├── _layouts/default.html    # 공통 레이아웃
├── _includes/                # 네비게이션, 푸터, 시그니처 SVG
├── assets/
│   ├── css/style.css
│   ├── js/main.js             # 탭/검색/페이지네이션/모달 로직 포함
│   ├── images/members/       # 구성원 사진
│   ├── images/news/          # 소식 사진
│   ├── images/research/      # Research 카드 이미지 (관리자용)
│   ├── images/hero/           # 홈 화면 GIF (관리자용)
│   └── videos/                # 홈 배경 영상 (선택)
├── index.md                  # Home
├── research.md                # Research Interests (관리자 수정)
├── members.md                 # Members 페이지 틀 (교수/재학생/졸업생 탭)
├── publications.md            # Publications 페이지 틀 (탭+검색+페이지네이션)
├── news.md                    # News & Gallery 페이지 틀 (검색+페이지네이션+상세보기)
├── contact.md                 # Contact
├── CNAME                      # 커스텀 도메인
└── README_수정방법.md         # 후배용 한글 가이드
```
