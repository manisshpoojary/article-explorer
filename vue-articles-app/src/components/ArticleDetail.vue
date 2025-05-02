<template>
  <button class="back-btn" @click="goBack">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Back
  </button>
  <div v-if="article" class="article-detail">
    <div class="detail-hero-container">
      <div v-if="article.type === 'video' && article.mediaUrl" class="video-youtube-ui">
        <div class="video-frame-container">
          <video controls :poster="article.hero" class="video-frame">
            <source :src="article.mediaUrl" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="video-meta">
          <h1 class="video-title">{{ article.title }}</h1>
          <div class="video-subtitle">{{ article.subtitle }}</div>
          <div class="video-author-row">
            <img v-if="article.authorImage" :src="article.authorImage" class="video-author-img" alt="author" />
            <div class="video-author-info">
              <span class="video-author-name">{{ article.authorName }}</span>
              <span class="video-published">{{ article.published }}</span>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <img v-if="article.hero" :src="article.hero" class="detail-hero" alt="hero" />
        <div class="author-avatar-block">
          <img v-if="article.authorImage" :src="article.authorImage" class="author-img" alt="author" @mouseenter="showAuthor = true" @mouseleave="showAuthor = false" />
          <transition name="fade">
            <div v-if="showAuthor" class="author-float">{{ article.authorName }}</div>
          </transition>
        </div>
      </template>
    </div>
    <div v-if="article.type !== 'video'">
      <h1 class="detail-title">{{ article.title }}</h1>
      <div class="subtitle">{{ article.subtitle }}</div>
      <div class="meta">
        <span class="author-link" @click="goToAuthor(article.authorName)">
          <svg class="icon-user" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#2563eb"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/></svg>
          {{ article.authorName }}
        </span>
        <span v-if="categoryName" class="category-link" @click="goToCategory(article.categoryId)">
          <svg class="icon-category" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2" fill="#16a34a"/><rect x="14" y="3" width="7" height="7" rx="2" fill="#16a34a"/><rect x="14" y="14" width="7" height="7" rx="2" fill="#16a34a"/><rect x="3" y="14" width="7" height="7" rx="2" fill="#16a34a"/></svg>
          {{ categoryName }}
        </span>
        <span v-if="article.tags && article.tags.length">
          <svg class="icon-tag" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M20.59 13.41l-8.3 8.3a2 2 0 0 1-2.83 0l-6.17-6.17a2 2 0 0 1 0-2.83l8.3-8.3a2 2 0 0 1 2.83 0l6.17 6.17a2 2 0 0 1 0 2.83z" stroke="#3b82f6" stroke-width="2"/><circle cx="7.5" cy="7.5" r="1.5" fill="#3b82f6"/></svg>
          <span v-for="tag in article.tags" :key="tag" class="tag" @click.stop="goToTag(tag)">#{{ tag }}</span>
        </span>
      </div>
    </div>
    <transition name="float-desc-fade">
      <div v-if="showDesc" class="desc-float" @mouseleave="showDesc = false">
        {{ article.description || article.summary || 'No content available.' }}
      </div>
    </transition>
    <div class="content" :class="{ 'video-content': article.type === 'video' }">
      <p v-if="article.description" v-html="article.description"></p>
      <p v-else-if="article.summary">{{ article.summary }}</p>
      <p v-else>No content available.</p>
    </div>
    <div :class="['comments-section', { 'text-article': article.type === 'text' }]" v-if="article.comments && article.comments.length">
      <h2><svg class="icon-comments" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#2563eb" stroke-width="2" fill="#f0f4ff"/></svg> Comments</h2>
      <ul class="comments-list">
        <li v-for="(comment, idx) in article.comments" :key="idx" class="comment-item">
          <div class="comment-header">
            <span class="comment-user">{{ comment.user }}</span>
            <span class="comment-date">{{ comment.date }}</span>
          </div>
          <div class="comment-text">{{ comment.comment }}</div>
        </li>
      </ul>
    </div>
    <div :class="['related-articles', { 'text-article': article.type === 'text' }]" v-if="article.relatedArticles && article.relatedArticles.length">
      <h2><svg class="icon-related" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 17v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" stroke="#16a34a" stroke-width="2" fill="#f0fdfa"/><circle cx="9" cy="7" r="4" stroke="#16a34a" stroke-width="2" fill="#e0e7ff"/><circle cx="17" cy="17" r="4" stroke="#16a34a" stroke-width="2" fill="#e0e7ff"/></svg> Related Articles</h2>
      <div class="related-list">
        <router-link v-for="rel in article.relatedArticles" :key="rel.articleId" :to="{ name: 'ArticleDetail', params: { articleId: rel.articleId } }" class="related-card">
          <div class="related-title">{{ rel.title }}</div>
          <svg class="related-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/></svg>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else class="not-found">Article not found.</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const article = ref(null);
const categoryName = ref('');
const showAuthor = ref(false);
const showDesc = ref(false);

onMounted(async () => {
  const articleId = route.params.articleId;
  if (articleId) {
    const resp = await fetch('/src/mock-data/article.json').then(r => r.json());
    const articlesArr = Array.isArray(resp.data) ? resp.data : [resp.data];
    let found = articlesArr.find(a => a.articleId === articleId);
    if (found) {
      // Normalize fields for template compatibility
      article.value = {
        ...found,
        type: found.articleType,
        authorImage: found.author?.authorImage || found.authorImage,
        authorName: found.author?.authorName || found.authorName,
        categoryId: found.category?.categoryId || found.categoryId,
        categoryName: found.category?.categoryName || found.categoryName,
        mediaUrl: found.mediaUrl || '',
        tags: found.tags || [],
      };
      categoryName.value = article.value.categoryName || '';
    } else {
      article.value = null;
    }
  }
});

function goToTag(tag) {
  router.push({ name: 'TagArticles', params: { tag } });
}

function goToCategory(categoryId) {
  router.push({ name: 'CategoryArticles', params: { categoryId } });
}

function goToAuthor(author) {
  router.push({ name: 'AuthorArticles', params: { author } });
}

function goBack() {
  window.history.length > 1 ? router.back() : router.push({ name: 'Home' });
}
</script>

<style scoped>
.article-detail {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(60,60,60,0.13);
  padding: 2.5em 2em 2em 2em;
  margin: 2em auto;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  position: relative;
  animation: fadeIn 0.5s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: none; }
}
.detail-hero-container {
  display: flex;
  align-items: flex-end;
  gap: 1.5em;
  margin-bottom: 1.2em;
}
.detail-hero {
  width: 70%;
  max-height: 260px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(60,60,60,0.10);
}
.author-avatar-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}
.author-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #2563eb;
  box-shadow: 0 2px 8px rgba(60,60,60,0.10);
  cursor: pointer;
  background: #f0f4ff;
}
.author-float {
  position: absolute;
  left: 80px;
  top: 10px;
  background: #fff;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.12);
  padding: 0.5em 1em;
  font-size: 1em;
  white-space: nowrap;
  z-index: 10;
  animation: fadeIn 0.2s;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.detail-title {
  margin: 0 0 0.5em 0;
  font-size: 2.2em;
  color: #222;
  font-weight: 800;
  text-align: left;
  letter-spacing: 0.5px;
}
.subtitle {
  color: #6c757d;
  font-size: 1.15em;
  margin-bottom: 0.7em;
  font-weight: 500;
}
.meta {
  color: #2563eb;
  font-size: 1.08em;
  margin-bottom: 1.2em;
  display: flex;
  align-items: center;
  gap: 1.2em;
  flex-wrap: wrap;
}
.icon-user, .icon-category, .icon-tag, .icon-desc {
  margin-right: 0.3em;
  vertical-align: middle;
}
.tag {
  background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
  border-radius: 4px;
  padding: 0.2em 0.7em;
  margin-right: 0.5em;
  font-size: 0.98em;
  color: #3b82f6;
  font-weight: 500;
  display: inline-block;
  cursor: pointer;
  transition: background 0.2s;
}
.tag:hover {
  background: #dbeafe;
}
.content {
  color: #444;
  font-size: 1.13em;
  margin-top: 2em;
  line-height: 1.7;
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5em 1.2em;
  box-shadow: 0 1px 4px rgba(60,60,60,0.06);
}
.video-content {
  max-width: 900px;
  margin: 2em auto 0 auto;
  font-size: 1.08em;
  padding: 1.2em 1.5em;
  background: #f8fafc;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(60,60,60,0.06);
}
@media (max-width: 900px) {
  .video-content {
    max-width: 100%;
    padding: 1em 0.5em;
  }
}
.desc-float-btn {
  margin-top: 1.5em;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.5em;
  font-size: 1.08em;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(60,60,60,0.07);
  display: flex;
  align-items: center;
  gap: 0.5em;
  transition: background 0.2s;
}
.desc-float-btn:hover {
  background: #1d4ed8;
}
.desc-float {
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
  background: #fff;
  color: #222;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(60,60,60,0.18);
  padding: 2em 2em;
  font-size: 1.15em;
  min-width: 300px;
  max-width: 90vw;
  z-index: 1000;
  text-align: left;
  animation: fadeIn 0.2s;
}
.float-desc-fade-enter-active, .float-desc-fade-leave-active {
  transition: opacity 0.25s;
}
.float-desc-fade-enter-from, .float-desc-fade-leave-to {
  opacity: 0;
}
.not-found {
  text-align: center;
  color: #e53e3e;
  margin: 3em 0;
  font-size: 1.3em;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5em;
  background: #e0e7ff;
  color: #2563eb;
  border: none;
  border-radius: 8px;
  padding: 0.5em 1.2em;
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 1.2em;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(60,60,60,0.07);
  transition: background 0.18s;
}
.back-btn:hover {
  background: #dbeafe;
}
.video-youtube-ui {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
}
.video-frame-container {
  width: 100%;
  max-width: 900px;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(60,60,60,0.18);
  margin-bottom: 1.2em;
}
.video-frame {
  width: 100%;
  height: 420px;
  max-width: 900px;
  background: #000;
  display: block;
}
@media (max-width: 900px) {
  .video-frame {
    height: 240px;
  }
}
.video-meta {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  background: #fff;
  border-radius: 0 0 16px 16px;
  padding: 1.2em 1.5em 1.5em 1.5em;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
}
.video-title {
  font-size: 1.7em;
  font-weight: 800;
  color: #222;
  margin: 0 0 0.2em 0;
}
.video-subtitle {
  color: #6c757d;
  font-size: 1.13em;
  margin-bottom: 0.5em;
  font-weight: 500;
}
.video-author-row {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-top: 0.7em;
}
.video-author-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2563eb;
  background: #f0f4ff;
}
.video-author-info {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}
.video-author-name {
  font-weight: 700;
  color: #222;
  font-size: 1.08em;
}
.video-published {
  color: #64748b;
  font-size: 0.98em;
}
.related-articles {
  margin-top: 2.5em;
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5em 1.7em;
  box-shadow: 0 2px 8px rgba(60,60,60,0.08);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.related-articles.text-article {
  max-width: 700px;
}
.related-articles h2 {
  font-size: 1.18em;
  color: #16a34a;
  margin-bottom: 1.1em;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.icon-related {
  vertical-align: middle;
}
.related-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2em;
}
.related-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(60,60,60,0.06);
  padding: 1em 1.3em;
  min-width: 220px;
  max-width: 320px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #2563eb;
  font-weight: 600;
  font-size: 1.05em;
  text-decoration: none;
  transition: box-shadow 0.18s, background 0.18s;
  cursor: pointer;
}
.related-card:hover {
  background: #e0e7ff;
  box-shadow: 0 4px 16px rgba(60,60,60,0.13);
  color: #1d4ed8;
}
.related-title {
  flex: 1;
  margin-right: 0.7em;
  text-align: left;
}
.related-arrow {
  flex-shrink: 0;
  margin-left: 0.2em;
}
.comments-section {
  margin-top: 2.5em;
  background: #fff;
  border-radius: 12px;
  padding: 1.5em 1.7em;
  box-shadow: 0 2px 8px rgba(60,60,60,0.08);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.comments-section.text-article {
  max-width: 700px;
}
.comments-section h2 {
  font-size: 1.18em;
  color: #2563eb;
  margin-bottom: 1.1em;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.icon-comments {
  vertical-align: middle;
}
.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.comment-item {
  background: #f8fafc;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(60,60,60,0.04);
  padding: 1em 1.2em;
  margin-bottom: 1.1em;
  transition: box-shadow 0.18s;
}
.comment-item:last-child {
  margin-bottom: 0;
}
.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.3em;
}
.comment-user {
  font-weight: 700;
  color: #2563eb;
  font-size: 1.08em;
}
.comment-date {
  color: #64748b;
  font-size: 0.97em;
}
.comment-text {
  color: #374151;
  font-size: 1.08em;
  margin-top: 0.2em;
  line-height: 1.6;
}
@media (max-width: 700px) {
  .article-detail {
    padding: 1.2em 0.5em;
  }
  .detail-hero-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7em;
  }
  .detail-hero {
    width: 100%;
    max-width: 100%;
    height: 180px;
    max-height: 180px;
  }
  .author-img {
    width: 48px;
    height: 48px;
  }
}
</style>
