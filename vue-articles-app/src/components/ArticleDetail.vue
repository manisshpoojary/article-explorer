<template>
  <div v-if="article" class="article-detail">
    <div class="detail-hero-container">
      <img v-if="article.hero" :src="article.hero" class="detail-hero" alt="hero" />
      <div class="author-avatar-block">
        <img v-if="article.authorImage" :src="article.authorImage" class="author-img" alt="author" @mouseenter="showAuthor = true" @mouseleave="showAuthor = false" />
        <transition name="fade">
          <div v-if="showAuthor" class="author-float">{{ article.authorName }}</div>
        </transition>
      </div>
    </div>
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
    <transition name="float-desc-fade">
      <div v-if="showDesc" class="desc-float" @mouseleave="showDesc = false">
        {{ article.description || article.summary || 'No content available.' }}
      </div>
    </transition>
    <div class="content">
      <p v-if="article.description" v-html="article.description"></p>
      <p v-else-if="article.summary">{{ article.summary }}</p>
      <p v-else>No content available.</p>
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
  // Fetch all articles from homePage.json to get the list of IDs
  const homeResp = await fetch('/src/mock-data/homePage.json').then(r => r.json());
  const articles = homeResp.data.articles || [];
  // Find the articleId from the route
  const articleId = route.params.articleId;
  // If the articleId matches the one in article.json, fetch article.json for full details
  if (articleId === 'a2b448sq') {
    const resp = await fetch('/src/mock-data/article.json').then(r => r.json());
    const data = resp.data;
    article.value = {
      articleId: data.articleId,
      title: data.title,
      subtitle: data.subtitle || data.Subtitle,
      hero: data.hero,
      authorId: data.author.authorId,
      authorName: data.author.authorName,
      authorImage: data.author.authorImage,
      categoryId: data.category.categoryId,
      categoryName: data.category.categoryName,
      published: data.published,
      tags: data.tags,
      description: data.description,
      summary: data.summary,
      articleType: data.articleType
    };
    // Fetch category name from categories.json if not present
    if (!article.value.categoryName) {
      const catResp = await fetch('/src/mock-data/categories.json').then(r => r.json());
      const categories = catResp.data.categories || [];
      const cat = categories.find(c => c.id === article.value.categoryId);
      categoryName.value = cat ? cat.name : '';
    } else {
      categoryName.value = article.value.categoryName;
    }
  } else {
    // fallback: find from homePage.json for demo
    article.value = articles.find(a => a.articleId === articleId);
    if (article.value) {
      const catResp = await fetch('/src/mock-data/categories.json').then(r => r.json());
      const categories = catResp.data.categories || [];
      const cat = categories.find(c => c.id === article.value.categoryId);
      categoryName.value = cat ? cat.name : '';
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
</script>

<style scoped>
.article-detail {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(60,60,60,0.13);
  padding: 2.5em 2em 2em 2em;
  margin: 2em auto;
  max-width: 750px;
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
