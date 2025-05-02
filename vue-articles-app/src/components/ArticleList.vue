<template>
  <div>
    <div v-if="articles.length === 0">No articles found.</div>
    <ul v-else>
      <li v-for="article in articles" :key="article.id" class="article-item">
        <router-link :to="{ name: 'ArticleDetail', params: { articleId: article.id } }" class="article-link">
          <div class="article-row">
            <img v-if="article.hero" :src="article.hero" alt="hero" class="hero-img" />
            <div class="article-content">
              <h3>{{ article.title }}</h3>
              <div v-if="article.subtitle" class="subtitle">{{ article.subtitle }}</div>
              <p>By {{ article.authorName || article.author || article.authorId || 'Unknown' }} | {{ article.type || 'N/A' }} | {{ article.category || article.categoryId || 'N/A' }}</p>
              <div v-if="article.tags && article.tags.length">
                <span v-for="tag in article.tags" :key="tag" class="tag">#{{ tag }}</span>
              </div>
              <p>{{ article.summary || article.description || (article.content ? article.content.slice(0, 100) + '...' : '') }}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  articles: {
    type: Array,
    required: true
  }
});

const router = useRouter();

function goToDetail(articleId) {
  router.push({ name: 'ArticleDetail', params: { articleId } });
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.article-item {
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(60,60,60,0.08);
  background: #fff;
  margin-bottom: 1.5em;
  padding: 1.2em 1.5em;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  align-items: stretch;
  min-height: 120px;
}
.article-item:hover {
  box-shadow: 0 6px 24px rgba(60,60,60,0.16);
  transform: translateY(-2px) scale(1.01);
}
.article-row {
  display: flex;
  align-items: flex-start;
  gap: 1.5em;
  width: 100%;
}
.hero-img {
  width: 100%;
  max-width: 140px;
  height: 100%;
  max-height: 120px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  flex-shrink: 0;
  background: #f6f6f6;
  align-self: stretch;
}
.article-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h3 {
  margin: 0 0 0.2em 0;
  font-size: 1.25em;
  color: #222;
  font-weight: 700;
}
.subtitle {
  color: #6c757d;
  font-size: 1em;
  margin-bottom: 0.5em;
  font-weight: 500;
}
p {
  margin: 0.2em 0 0.2em 0;
  color: #444;
  font-size: 1em;
}
.meta-row {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 0.98em;
  color: #2563eb;
  margin-bottom: 0.7em; /* Increased margin for separation */
  flex-wrap: wrap;
}
.tag {
  background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
  border-radius: 4px;
  padding: 0.2em 0.7em;
  margin-right: 0.5em;
  font-size: 0.92em;
  color: #3b82f6;
  font-weight: 500;
  display: inline-block;
}
.article-link {
  display: block;
  color: inherit;
  text-decoration: none;
}
.article-link:visited {
  color: inherit;
}
@media (max-width: 600px) {
  .article-row {
    flex-direction: column;
    gap: 0.7em;
  }
  .hero-img {
    width: 100%;
    max-width: 100%;
    height: 160px;
    max-height: 160px;
  }
  .article-item {
    padding: 1em 0.7em;
  }
}
</style>
