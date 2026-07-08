---
layout: default
title: Members
permalink: /members/
---

<section class="section wrap" style="border-bottom:none; padding-bottom:0;">
  <div class="section-head">
    <span class="section-eyebrow">Members</span>
    <h2>구성원</h2>
    <p class="section-sub">구성원 정보는 <code>_data/members.yml</code> 파일에서 관리됩니다.</p>
  </div>
</section>

<section class="section wrap">

  <div class="pub-tabs" id="memberTabs">
    <button class="pub-tab active" data-panel="panel-prof">교수</button>
    <button class="pub-tab" data-panel="panel-current">재학생</button>
    <button class="pub-tab" data-panel="panel-alumni">졸업생</button>
  </div>

  <div class="member-panel" id="panel-prof">
    {% assign p = site.data.members.professor %}
    <div class="prof-card">
      <img class="member-photo" src="{{ p.photo | relative_url }}" alt="{{ p.name_kr }} 교수 사진" onerror="this.style.opacity=0"
        {% if p.photo_alt and p.photo_alt != "" %}data-alt="{{ p.photo_alt | relative_url }}"{% endif %}>
      <div>
        <h3>{{ p.name_kr }} <span class="en">({{ p.name_en }})</span></h3>
        <div class="role">{{ p.position }}</div>
        <div class="email"><a href="mailto:{{ p.email }}">{{ p.email }}</a></div>
        <p class="bio">{{ p.bio }}</p>
      </div>
    </div>
  </div>

  <div class="member-panel" id="panel-current" style="display:none;">
    {% if site.data.members.phd_students and site.data.members.phd_students.size > 0 %}
    <div class="member-group-title">박사과정 / PhD Students</div>
    <div class="member-grid">
      {% for m in site.data.members.phd_students %}
      <div class="member-card">
        <img class="member-photo" src="{{ m.photo | relative_url }}" alt="{{ m.name_kr }} 사진" onerror="this.style.opacity=0"
          {% if m.photo_alt and m.photo_alt != "" %}data-alt="{{ m.photo_alt | relative_url }}"{% endif %}>
        <h3>{{ m.name_kr }}</h3>
        <div class="en">{{ m.name_en }}</div>
        <div class="role">{{ m.year }}</div>
        <div class="email"><a href="mailto:{{ m.email }}">{{ m.email }}</a></div>
      </div>
      {% endfor %}
    </div>
    {% endif %}

    {% if site.data.members.ms_students and site.data.members.ms_students.size > 0 %}
    <div class="member-group-title">석사과정 / MS Students</div>
    <div class="member-grid">
      {% for m in site.data.members.ms_students %}
      <div class="member-card">
        <img class="member-photo" src="{{ m.photo | relative_url }}" alt="{{ m.name_kr }} 사진" onerror="this.style.opacity=0"
          {% if m.photo_alt and m.photo_alt != "" %}data-alt="{{ m.photo_alt | relative_url }}"{% endif %}>
        <h3>{{ m.name_kr }}</h3>
        <div class="en">{{ m.name_en }}</div>
        <div class="role">{{ m.year }}</div>
        <div class="email"><a href="mailto:{{ m.email }}">{{ m.email }}</a></div>
      </div>
      {% endfor %}
    </div>
    {% endif %}
  </div>

  <div class="member-panel" id="panel-alumni" style="display:none;">
    {% if site.data.members.alumni and site.data.members.alumni.size > 0 %}
    <ul class="pub-list">
      {% for a in site.data.members.alumni %}
      <li style="grid-template-columns: 1fr;">
        <div>
          <strong>{{ a.name_kr }}</strong> — {{ a.degree }}
          {% if a.current %}<span class="pub-meta">현재: {{ a.current }}</span>{% endif %}
        </div>
      </li>
      {% endfor %}
    </ul>
    {% else %}
    <p class="section-sub">등록된 졸업생이 없습니다.</p>
    {% endif %}
  </div>

</section>
