<template>
  <div class="page">
    <h2>About</h2>
    <p>
      <strong>Article Explorer</strong> is a modern Vue app for browsing, filtering, and exploring articles by category, type, author, and tag. It features a responsive design and a clean, user-friendly interface.
    </p>
    <ul class="about-list fancy-list">
      <li><span class="list-icon">⚡</span> Built with <strong>Vue 3 + Vite</strong></li>
      <li><span class="list-icon">🃏</span> Modern card UI and navigation</li>
      <li><span class="list-icon">📱</span> Responsive for all devices <span class="device-badge">iPhone 15</span></li>
      <li><span class="list-icon">🔎</span> Filter articles by <span class="highlight">category</span>, <span class="highlight">type</span>, <span class="highlight">author</span>, and <span class="highlight">tag</span></li>
    </ul>
    <div class="about-links fancy-links">
      <button class="fancy-btn" @click="goTo('Home')">
        <span class="btn-icon">🏠</span> Go to Home
      </button>
      <button class="fancy-btn" @click="goTo('Categories')">
        <span class="btn-icon">📂</span> Browse Categories
      </button>
      <button class="fancy-btn" @click="goTo('Tags')">
        <span class="btn-icon">🏷️</span> Browse Tags
      </button>
    </div>
    <div class="about-team fancy-team">
      <h3>Meet the Authors</h3>
      <ul class="fancy-author-list">
        <li v-for="author in authors" :key="author.authorId" class="author-item fancy-author-item">
          <div class="author-avatar">
            <img :src="author.authorImage" :alt="author.authorName" class="author-img" />
          </div>
          <div class="author-info">
            <span class="author-name">{{ author.authorName }}</span>
            <span class="author-bio">{{ author.authorBio }}</span>
          </div>
        </li>
      </ul>
    </div>
    <p style="margin-top:2em; color:#6c757d; font-size:0.98em;">
      &copy; 2025 Article Explorer. All rights reserved.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const authors = ref([]);
const router = useRouter();

onMounted(async () => {
  const resp = await fetch('/src/mock-data/article.json').then(r => r.json());
  const articles = Array.isArray(resp.data) ? resp.data : [resp.data];
  // Unique authors by authorId
  const map = new Map();
  articles.forEach(a => {
    if (a.author && !map.has(a.author.authorId)) {
      map.set(a.author.authorId, a.author);
    }
  });
  authors.value = Array.from(map.values());
});

function goTo(page) {
  router.push({ name: page });
}
</script>

<style scoped>
.page {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  padding: 2em 1.5em;
  margin: 2em auto;
}
.about-list {
  margin: 1.5em 0 0 1.2em;
  color: #2563eb;
  font-size: 1.08em;
  line-height: 1.7;
}
.about-links {
  margin: 2em 0 2em 0;
  display: flex;
  gap: 1.2em;
  flex-wrap: wrap;
}
.about-links button {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.5em;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(60,60,60,0.07);
  transition: background 0.18s;
}
.about-links button:hover {
  background: #1d4ed8;
}
.about-team {
  margin-top: 2.5em;
}
.about-team h3 {
  margin-bottom: 1em;
  color: #2563eb;
  font-size: 1.2em;
}
.author-item {
  display: flex;
  align-items: flex-start;
  gap: 1em;
  margin-bottom: 1.2em;
}
.author-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e7ff;
  background: #f0f4ff;
}
.author-name {
  font-weight: 700;
  color: #222;
  font-size: 1.08em;
}
.author-bio {
  display: block;
  color: #64748b;
  font-size: 0.98em;
  margin-top: 0.2em;
}
.fancy-list {
  margin: 1.5em 0 0 1.2em;
  color: #2563eb;
  font-size: 1.13em;
  line-height: 1.8;
  list-style: none;
  padding: 0;
}
.fancy-list li {
  background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
  border-radius: 8px;
  margin-bottom: 1em;
  padding: 0.9em 1.3em;
  box-shadow: 0 1px 4px rgba(60,60,60,0.06);
  display: flex;
  align-items: center;
  gap: 0.9em;
  font-weight: 500;
  transition: background 0.18s;
}
.fancy-list li:hover {
  background: #dbeafe;
}
.list-icon {
  font-size: 1.25em;
  margin-right: 0.7em;
  display: inline-block;
}
.device-badge {
  background: #2563eb;
  color: #fff;
  border-radius: 6px;
  padding: 0.1em 0.7em;
  font-size: 0.95em;
  margin-left: 0.5em;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.highlight {
  color: #1d4ed8;
  font-weight: 600;
  background: #e0e7ff;
  border-radius: 4px;
  padding: 0.1em 0.4em;
  margin: 0 0.1em;
}
.fancy-links {
  margin: 2em 0 2em 0;
  display: flex;
  gap: 1.2em;
  flex-wrap: wrap;
  justify-content: center;
}
.fancy-btn {
  background: linear-gradient(90deg, #2563eb 60%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.7em 2em;
  font-size: 1.08em;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(60,60,60,0.10);
  transition: background 0.18s, transform 0.18s;
  display: flex;
  align-items: center;
  gap: 0.7em;
  letter-spacing: 0.5px;
}
.fancy-btn:hover {
  background: linear-gradient(90deg, #1d4ed8 60%, #3b82f6 100%);
  transform: translateY(-2px) scale(1.04);
}
.btn-icon {
  font-size: 1.25em;
  margin-right: 0.5em;
  display: inline-block;
}
.fancy-team {
  margin-top: 2.5em;
  background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  padding: 2em 1.5em;
}
.fancy-team h3 {
  margin-bottom: 1.2em;
  color: #2563eb;
  font-size: 1.25em;
  text-align: center;
  letter-spacing: 0.5px;
}
.fancy-author-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2em 2.5em;
  justify-content: center;
}
.fancy-author-item {
  display: flex;
  align-items: center;
  gap: 1.2em;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(60,60,60,0.06);
  padding: 1.1em 1.5em;
  min-width: 320px;
  max-width: 400px;
  margin-bottom: 1.2em;
  transition: box-shadow 0.18s, transform 0.18s;
}
.fancy-author-item:hover {
  box-shadow: 0 4px 16px rgba(60,60,60,0.13);
  transform: translateY(-2px) scale(1.03);
}
.author-avatar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.author-img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e0e7ff;
  background: #f0f4ff;
  box-shadow: 0 1px 4px rgba(60,60,60,0.08);
}
.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}
.author-name {
  font-weight: 700;
  color: #222;
  font-size: 1.13em;
  margin-bottom: 0.1em;
}
.author-bio {
  color: #64748b;
  font-size: 0.98em;
  margin-top: 0.1em;
}

@media (max-width: 900px) {
  .page {
    padding: 1.2em 0.5em;
  }
  .about-links {
    gap: 0.7em;
  }
  .fancy-author-list {
    gap: 1em 1.2em;
  }
  .fancy-author-item {
    min-width: 180px;
    max-width: 100%;
    padding: 0.7em 0.7em;
  }
}
@media (max-width: 600px) {
  .page {
    padding: 0.7em 0.2em;
  }
  .about-list, .fancy-list {
    font-size: 1em;
    margin-left: 0.2em;
  }
  .about-links {
    flex-direction: column;
    gap: 0.5em;
  }
  .fancy-btn {
    width: 100%;
    font-size: 0.98em;
    padding: 0.5em 0.7em;
  }
  .fancy-author-list {
    flex-direction: column;
    gap: 0.7em;
  }
  .fancy-author-item {
    min-width: 100%;
    max-width: 100%;
    padding: 0.7em 0.5em;
  }
}
</style>
