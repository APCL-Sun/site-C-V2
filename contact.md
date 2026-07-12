---
layout: default
title: Contact
permalink: /contact/
---

<section class="section wrap" style="border-bottom:none; padding-bottom:0;">
  <div class="section-head">
    <span class="section-eyebrow">Contact</span>
    <h2>오시는 길 &amp; 문의</h2>
  </div>
</section>

<section class="section wrap">
  <div class="contact-grid">
    <div class="contact-info">
      <dl>
        <dt>주소</dt>
        <dd>{{ site.address_kr }}</dd>

        <dt>Address</dt>
        <dd>{{ site.address_en }}</dd>

        <dt>Email</dt>
        <dd><a href="mailto:{{ site.email }}">{{ site.email }}</a></dd>

        <dt>소속</dt>
        <dd>{{ site.department }}</dd>
      </dl>

      {% if site.recruiting %}
      <div class="recruit-box">
        <h3>대학원생 모집 (석사·박사과정)</h3>
        <p>
          2027년 전기 석사/박사과정 대학원생을 상시 모집합니다.
          관심 있는 분은 이메일로 간단한 자기소개, 성적증명서, 하고 싶은 연구 분야를
          정리하여 <a href="mailto:{{ site.email }}">{{ site.email }}</a> 로 보내주세요.
          면담 일정을 조율해드립니다.
        </p>
      </div>
      {% endif %}
    </div>

    <div class="map-embed">
      <iframe
        src="https://www.google.com/maps?q={{ site.gmap_query | url_encode }}&output=embed"
        loading="lazy"
        title="연구실 위치 지도"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </div>
</section>
