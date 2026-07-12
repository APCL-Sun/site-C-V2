---
layout: default
title: Members
permalink: /members/
---

<section class="section wrap" style="border-bottom:none; padding-bottom:0;">
  <div class="section-head">
    <span class="section-eyebrow">Members</span>
    <h2>구성원</h2>
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

        {% if p.education and p.education.size > 0 %}
        <div class="prof-detail">
          <h4>학력</h4>
          <ul class="prof-list">
            {% for e in p.education %}<li>{{ e }}</li>{% endfor %}
          </ul>
        </div>
        {% endif %}

        {% if p.career and p.career.size > 0 %}
        <div class="prof-detail">
          <h4>경력</h4>
          <ul class="prof-list">
            {% for c in p.career %}<li{% if c.highlight %} class="highlight"{% endif %}>{{ c.text }}</li>{% endfor %}
          </ul>
        </div>
        {% endif %}
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
        {% if m.research and m.research != "" %}<div class="research">{{ m.research }}</div>{% endif %}
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
        {% if m.research and m.research != "" %}<div class="research">{{ m.research }}</div>{% endif %}
      </div>
      {% endfor %}
    </div>
    {% endif %}

    {% if site.data.members.undergrad_students and site.data.members.undergrad_students.size > 0 %}
    <div class="member-group-title">학부생 / Undergraduate Students</div>
    <div class="member-grid">
      {% for m in site.data.members.undergrad_students %}
      <div class="member-card">
        <img class="member-photo" src="{{ m.photo | relative_url }}" alt="{{ m.name_kr }} 사진" onerror="this.style.opacity=0"
          {% if m.photo_alt and m.photo_alt != "" %}data-alt="{{ m.photo_alt | relative_url }}"{% endif %}>
        <h3>{{ m.name_kr }}</h3>
        <div class="en">{{ m.name_en }}</div>
        <div class="role">{{ m.year }}</div>
        <div class="email"><a href="mailto:{{ m.email }}">{{ m.email }}</a></div>
        {% if m.research and m.research != "" %}<div class="research">{{ m.research }}</div>{% endif %}
      </div>
      {% endfor %}
    </div>
    {% endif %}
  </div>

  <div class="member-panel" id="panel-alumni" style="display:none;">
    {% assign phd_alumni = site.data.members.alumni.phd %}
    {% assign ms_alumni = site.data.members.alumni.ms %}

    {% if phd_alumni and phd_alumni.size > 0 %}
    <div class="member-group-title">박사 졸업생 / PhD Alumni</div>
    <div class="member-grid">
      {% for a in phd_alumni %}
      <div class="member-card">
        {% if a.photo and a.photo != "" %}
        <img class="member-photo" src="{{ a.photo | relative_url }}" alt="{{ a.name_kr }} 사진" onerror="this.style.opacity=0">
        {% endif %}
        <h3>{{ a.name_kr }}</h3>
        <div class="role">{{ a.degree }}</div>
        {% if a.current %}<div class="email">현재: {{ a.current }}</div>{% endif %}
      </div>
      {% endfor %}
    </div>
    {% endif %}

    {% if ms_alumni and ms_alumni.size > 0 %}
    <div class="member-group-title">석사 졸업생 / MS Alumni</div>
    <div class="member-grid">
      {% for a in ms_alumni %}
      <div class="member-card">
        {% if a.photo and a.photo != "" %}
        <img class="member-photo" src="{{ a.photo | relative_url }}" alt="{{ a.name_kr }} 사진" onerror="this.style.opacity=0">
        {% endif %}
        <h3>{{ a.name_kr }}</h3>
        <div class="role">{{ a.degree }}</div>
        {% if a.current %}<div class="email">현재: {{ a.current }}</div>{% endif %}
      </div>
      {% endfor %}
    </div>
    {% endif %}

    {% if (phd_alumni == nil or phd_alumni.size == 0) and (ms_alumni == nil or ms_alumni.size == 0) %}
    <p class="section-sub">등록된 졸업생이 없습니다.</p>
    {% endif %}
  </div>

</section>
