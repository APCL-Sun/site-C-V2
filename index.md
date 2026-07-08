---
layout: default
title: Home
permalink: /
---

<section class="hero">
  <div class="hero-media">
    {% if site.home_hero_gif and site.home_hero_gif != "" %}
      <img class="hero-gif" src="{{ site.home_hero_gif | relative_url }}" alt="추력기 연소시험 GIF">
    {% elsif site.home_video_file and site.home_video_file != "" %}
      <video autoplay muted loop playsinline poster="{{ '/assets/images/hero-poster.jpg' | relative_url }}">
        <source src="{{ site.home_video_file | relative_url }}" type="video/mp4">
      </video>
    {% elsif site.home_video_youtube_id and site.home_video_youtube_id != "" %}
      <iframe src="https://www.youtube.com/embed/{{ site.home_video_youtube_id }}?autoplay=1&mute=1&loop=1&playlist={{ site.home_video_youtube_id }}&controls=0&showinfo=0&rel=0"
              title="추력기 시험 영상" frameborder="0" allow="autoplay; encrypted-media"></iframe>
    {% else %}
      <div class="hero-fallback"></div>
    {% endif %}
  </div>

  <div class="hero-content">
    <span class="hero-eyebrow">Chungbuk National Univ. · Dept. of Mechanical Engineering</span>
    <h1>{{ site.lab_name_kr }}
      <span class="en">{{ site.lab_name_en }} (APCL)</span>
    </h1>
    <div class="hero-ctas">
      <a class="btn btn-primary" href="{{ '/research/' | relative_url }}">연구 분야 보기</a>
      <a class="btn btn-ghost" href="{{ '/contact/' | relative_url }}">대학원 모집 안내</a>
    </div>
  </div>
</section>

{% include thrust-divider.html %}

<section class="section wrap">
  <div class="section-head">
    <span class="section-eyebrow">Research Interests</span>
    <h2>세 가지 핵심 연구 축</h2>
    <p class="section-sub">자세한 내용은 Research 페이지에서 확인하실 수 있습니다.</p>
  </div>
  <div class="research-grid">
    <div class="research-card">
      <span class="idx">01</span>
      <h3>추력기 연소시험 &amp; 성능평가</h3>
      <p>고체/액체 추진기관 지상 연소시험을 통한 추력·비추력 성능 분석</p>
    </div>
    <div class="research-card">
      <span class="idx">02</span>
      <h3>연소 불안정성 진단</h3>
      <p>압력 진동·음향 모드 계측을 통한 연소 불안정 메커니즘 규명</p>
    </div>
    <div class="research-card">
      <span class="idx">03</span>
      <h3>친환경 추진제 &amp; CFD 해석</h3>
      <p>차세대 친환경 추진제 배합 연구와 전산유체역학 기반 연소장 해석</p>
    </div>
  </div>
</section>

<section class="section wrap">
  <div class="section-head">
    <span class="section-eyebrow">News &amp; Gallery</span>
    <h2>최근 소식</h2>
    <p class="section-sub">전체 소식은 News&nbsp;&amp;&nbsp;Gallery 페이지에서 확인하실 수 있습니다.</p>
  </div>
  <p><a href="{{ '/news/' | relative_url }}">→ News & Gallery 페이지에서 최신 소식 모두 보기</a></p>
</section>
