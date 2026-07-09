// =====================================================
// APCL 사이트 공통 스크립트
// 이 파일은 후배분들이 수정할 필요가 없습니다.
// =====================================================
document.addEventListener("DOMContentLoaded", function () {

  // ---------- 모바일 상단 메뉴 토글 ----------
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ---------- Members 페이지: 교수 / 재학생 / 졸업생 탭 ----------
  var memberTabs = document.getElementById("memberTabs");
  if (memberTabs) {
    var mTabs = memberTabs.querySelectorAll(".pub-tab");
    mTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        mTabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var targetId = tab.getAttribute("data-panel");
        document.querySelectorAll(".member-panel").forEach(function (panel) {
          panel.style.display = (panel.id === targetId) ? "" : "none";
        });
      });
    });
  }

  // ---------- 멤버 사진 이스터에그 (더블클릭하면 다른 사진으로) ----------
  document.querySelectorAll(".member-photo[data-alt]").forEach(function (img) {
    var altSrc = img.getAttribute("data-alt");
    var origSrc = img.getAttribute("src");
    img.addEventListener("dblclick", function () {
      img.classList.add("photo-flip");
      setTimeout(function () {
        img.src = (img.src.indexOf(altSrc) !== -1) ? origSrc : altSrc;
      }, 140);
      setTimeout(function () {
        img.classList.remove("photo-flip");
      }, 280);
    });
  });

  // =====================================================
  // 공용 게시판 빌더 (News & Gallery / Publications 공용 로직)
  // =====================================================
  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function buildPagination(container, totalItems, pageSize, currentPage, onChange) {
    container.innerHTML = "";
    var totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    if (totalPages <= 1) return;

    function makeBtn(label, page, opts) {
      opts = opts || {};
      var btn = document.createElement("button");
      btn.className = "board-page-btn" + (opts.active ? " active" : "");
      btn.textContent = label;
      btn.disabled = !!opts.disabled;
      btn.addEventListener("click", function () { onChange(page); });
      return btn;
    }

    container.appendChild(makeBtn("‹", Math.max(1, currentPage - 1), { disabled: currentPage === 1 }));
    for (var i = 1; i <= totalPages; i++) {
      container.appendChild(makeBtn(String(i), i, { active: i === currentPage }));
    }
    container.appendChild(makeBtn("›", Math.min(totalPages, currentPage + 1), { disabled: currentPage === totalPages }));
  }

  // ---------- News & Gallery 게시판 ----------
  var newsListEl = document.getElementById("newsList");
  if (newsListEl) {
    var newsDataEl = document.getElementById("newsData");
    var newsItems = [];
    try { newsItems = JSON.parse(newsDataEl.textContent || "[]") || []; } catch (e) { newsItems = []; }

    var newsSearch = document.getElementById("newsSearch");
    var newsEmpty = document.getElementById("newsEmpty");
    var newsPagination = document.getElementById("newsPagination");
    var newsPageSize = 6;
    var newsPage = 1;
    var newsQuery = "";

    function filteredNews() {
      if (!newsQuery) return newsItems;
      var q = newsQuery.toLowerCase();
      return newsItems.filter(function (item) {
        return (item.title || "").toLowerCase().indexOf(q) !== -1 ||
               getNewsText(item).toLowerCase().indexOf(q) !== -1;
      });
    }

    // blocks 배열에서 텍스트 블록만 모아 하나의 문자열로 (검색용)
    function getNewsText(item) {
      return (item.blocks || [])
        .filter(function (b) { return b.type === "text"; })
        .map(function (b) { return b.text || ""; })
        .join(" ");
    }

    // blocks 배열에서 이미지 총 개수
    function getNewsImageCount(item) {
      return (item.blocks || [])
        .filter(function (b) { return b.type === "images"; })
        .reduce(function (sum, b) { return sum + (b.images || []).length; }, 0);
    }

    function renderNews() {
      var items = filteredNews();
      newsEmpty.style.display = items.length === 0 ? "" : "none";
      var start = (newsPage - 1) * newsPageSize;
      var pageItems = items.slice(start, start + newsPageSize);

      newsListEl.innerHTML = "";
      pageItems.forEach(function (item) {
        var row = document.createElement("div");
        row.className = "board-row";
        var imgCount = getNewsImageCount(item);
        row.innerHTML =
          '<div class="date">' + escapeHtml(item.date) + '</div>' +
          '<div class="title">' + escapeHtml(item.title) + '</div>' +
          (imgCount > 0 ? '<div class="badge">사진 ' + imgCount + '장</div>' : '<div></div>');
        row.addEventListener("click", function () { openNewsModal(item); });
        newsListEl.appendChild(row);
      });

      buildPagination(newsPagination, items.length, newsPageSize, newsPage, function (p) {
        newsPage = p;
        renderNews();
        newsListEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    if (newsSearch) {
      newsSearch.addEventListener("input", function () {
        newsQuery = newsSearch.value.trim();
        newsPage = 1;
        renderNews();
      });
    }

    // ---- 상세보기 모달 ----
    var newsModal = document.getElementById("newsModal");
    var newsModalBody = document.getElementById("newsModalBody");
    var newsModalClose = document.getElementById("newsModalClose");
    var newsModalBackdrop = document.getElementById("newsModalBackdrop");

    function renderNewsBlock(block) {
      if (block.type === "text") {
        return '<p class="content-block">' + escapeHtml(block.text) + '</p>';
      }
      if (block.type === "images") {
        var imgs = (block.images || []).filter(Boolean);
        if (imgs.length === 0) return "";
        var cls = "board-modal-gallery" + (block.size === "large" ? " large" : "");
        var html = imgs.map(function (img) {
          var src = (typeof img === "string") ? img : img.src;
          var orientation = (typeof img === "object" && img.orientation === "portrait") ? "portrait" : "landscape";
          var full = (window.SITE_BASEURL || "") + src;
          var imgCls = orientation === "portrait" ? ' class="portrait"' : "";
          return '<img' + imgCls + ' src="' + escapeHtml(full) + '" alt="" onerror="this.style.display=\'none\'">';
        }).join("");
        return '<div class="' + cls + '">' + html + '</div>';
      }
      return "";
    }

    function openNewsModal(item) {
      var blocksHtml = (item.blocks || []).map(renderNewsBlock).join("");
      newsModalBody.innerHTML =
        '<div class="date">' + escapeHtml(item.date) + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        blocksHtml;
      newsModal.classList.add("open");
      newsModal.setAttribute("aria-hidden", "false");
    }
    function closeNewsModal() {
      newsModal.classList.remove("open");
      newsModal.setAttribute("aria-hidden", "true");
    }
    if (newsModalClose) newsModalClose.addEventListener("click", closeNewsModal);
    if (newsModalBackdrop) newsModalBackdrop.addEventListener("click", closeNewsModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && newsModal && newsModal.classList.contains("open")) closeNewsModal();
    });

    renderNews();
  }

  // ---------- Publications 게시판 (탭 + 검색 + 페이지네이션) ----------
  var pubListEl = document.getElementById("pubList");
  if (pubListEl) {
    var pubDataEl = document.getElementById("pubData");
    var pubDataRaw = {};
    try { pubDataRaw = JSON.parse(pubDataEl.textContent || "{}") || {}; } catch (e) { pubDataRaw = {}; }

    var CATEGORY_LABELS = {
      domestic: "국내논문",
      international: "국외논문",
      patents: "특허",
      conferences: "학술대회"
    };

    var allPubs = [];
    Object.keys(CATEGORY_LABELS).forEach(function (cat) {
      (pubDataRaw[cat] || []).forEach(function (pub) {
        allPubs.push(Object.assign({ category: cat }, pub));
      });
    });
    // 최신 연도가 위로 오도록 정렬 (같은 연도 내에서는 yml에 적은 순서 유지)
    allPubs.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });

    var pubTabsEl = document.getElementById("pubTabs");
    var pubSearch = document.getElementById("pubSearch");
    var pubEmpty = document.getElementById("pubEmpty");
    var pubPagination = document.getElementById("pubPagination");
    var pubPageSize = 8;
    var pubPage = 1;
    var pubQuery = "";
    var pubCategory = "all";

    function metaLine(pub) {
      if (pub.category === "patents") {
        return [pub.inventors, pub.number].filter(Boolean).join(" · ");
      }
      return [pub.authors, pub.venue].filter(Boolean).join(" · ");
    }

    function filteredPubs() {
      var list = pubCategory === "all" ? allPubs : allPubs.filter(function (p) { return p.category === pubCategory; });
      if (!pubQuery) return list;
      var q = pubQuery.toLowerCase();
      return list.filter(function (p) {
        return (p.title || "").toLowerCase().indexOf(q) !== -1 ||
               (metaLine(p) || "").toLowerCase().indexOf(q) !== -1;
      });
    }

    function renderPubs() {
      var items = filteredPubs();
      pubEmpty.style.display = items.length === 0 ? "" : "none";
      var start = (pubPage - 1) * pubPageSize;
      var pageItems = items.slice(start, start + pubPageSize);

      pubListEl.innerHTML = "";
      pageItems.forEach(function (pub) {
        var li = document.createElement("li");
        li.innerHTML =
          '<div class="pub-year">' + escapeHtml(pub.year) + '</div>' +
          '<div>' +
            '<div class="pub-title">' + escapeHtml(pub.title) +
              ' <span class="badge">' + CATEGORY_LABELS[pub.category] + '</span></div>' +
            '<div class="pub-meta">' + escapeHtml(metaLine(pub)) + '</div>' +
          '</div>';
        pubListEl.appendChild(li);
      });

      buildPagination(pubPagination, items.length, pubPageSize, pubPage, function (p) {
        pubPage = p;
        renderPubs();
        pubListEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    if (pubTabsEl) {
      pubTabsEl.querySelectorAll(".pub-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          pubTabsEl.querySelectorAll(".pub-tab").forEach(function (t) { t.classList.remove("active"); });
          tab.classList.add("active");
          pubCategory = tab.getAttribute("data-cat");
          pubPage = 1;
          renderPubs();
        });
      });
    }
    if (pubSearch) {
      pubSearch.addEventListener("input", function () {
        pubQuery = pubSearch.value.trim();
        pubPage = 1;
        renderPubs();
      });
    }

    renderPubs();
  }
});
