<template>
  <div>
    <div v-if="articles.length === 0">No articles found.</div>
    <ul v-else>
      <li v-for="article in articles" :key="article.id" class="article-item">
        <div class="article-row">
          <img v-if="article.hero" :src="article.hero" alt="hero" class="hero-img" />
          <div class="article-content">
            <h3>{{ article.title }}</h3>
            <div v-if="article.subtitle" class="subtitle">{{ article.subtitle }}</div>
            <p>By {{ article.author || article.authorId || 'Unknown' }} | {{ article.type || 'N/A' }} | {{ article.category || article.categoryId || 'N/A' }}</p>
            <div v-if="article.tags && article.tags.length">
              <span v-for="tag in article.tags" :key="tag" class="tag">#{{ tag }}</span>
            </div>
            <p>{{ article.summary || article.description || (article.content ? article.content.slice(0, 100) + '...' : '') }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  articles: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.article-item {
  border-bottom: 1px solid #eee;
  padding: 1em 0;
}
.article-row {
  display: flex;
  align-items: flex-start;
  gap: 1em;
}
.hero-img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}
.article-content {
  flex: 1;
}
.tag {
  background: #f0f0f0;
  border-radius: 4px;
  padding: 0.2em 0.5em;
  margin-right: 0.5em;
  font-size: 0.9em;
}
</style>
