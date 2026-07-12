---
layout: default
title: Publications
permalink: /publications/
---

<section class="section wrap" style="border-bottom:none; padding-bottom:0;">
  <div class="section-head">
    <span class="section-eyebrow">Publications</span>
    <h2>연구 실적</h2>
  </div>
</section>

<section class="section wrap">

  <div class="pub-tabs" id="pubTabs">
    <button class="pub-tab active" data-cat="all">전체</button>
    <button class="pub-tab" data-cat="domestic">국내논문</button>
    <button class="pub-tab" data-cat="international">국외논문</button>
    <button class="pub-tab" data-cat="patents">특허</button>
    <button class="pub-tab" data-cat="conferences">학술대회</button>
  </div>

  <div class="board-toolbar">
    <input type="text" id="pubSearch" class="board-search" placeholder="제목 / 저자 / 학술지 검색">
  </div>

  <ul class="pub-list" id="pubList"></ul>
  <p class="board-empty" id="pubEmpty" style="display:none;">검색 결과가 없습니다.</p>

  <div class="board-pagination" id="pubPagination"></div>

</section>

<script type="application/json" id="pubData">{{ site.data.publications | jsonify }}</script>
