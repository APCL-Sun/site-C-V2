---
layout: default
title: News & Gallery
permalink: /news/
---

<section class="section wrap" style="border-bottom:none; padding-bottom:0;">
  <div class="section-head">
    <span class="section-eyebrow">News &amp; Gallery</span>
    <h2>연구실 소식</h2>
    <p class="section-sub">학회 발표, 수상, 워크숍 등 연구실 소식입니다. 소식 내용은 <code>_data/news.yml</code> 파일에서 관리됩니다.</p>
  </div>
</section>

<section class="section wrap">
  <div class="board-toolbar">
    <input type="text" id="newsSearch" class="board-search" placeholder="제목 또는 내용 검색">
  </div>

  <div class="board-list" id="newsList"></div>
  <p class="board-empty" id="newsEmpty" style="display:none;">검색 결과가 없습니다.</p>

  <div class="board-pagination" id="newsPagination"></div>
</section>

<div class="board-modal" id="newsModal" aria-hidden="true">
  <div class="board-modal-backdrop" id="newsModalBackdrop"></div>
  <div class="board-modal-content" role="dialog" aria-modal="true">
    <button class="board-modal-close" id="newsModalClose" aria-label="닫기">✕</button>
    <div class="board-modal-body" id="newsModalBody"></div>
  </div>
</div>

<script>window.SITE_BASEURL = {{ site.baseurl | jsonify }};</script>
<script type="application/json" id="newsData">{{ site.data.news | jsonify }}</script>
