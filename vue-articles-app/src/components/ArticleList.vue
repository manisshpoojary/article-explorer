<template>
  <div>
    <div v-if="articles.length === 0">No articles found.</div>
    <ul v-else>
      <li v-for="article in articles" :key="article.id" class="article-item">
        <h3>{{ article.title }}</h3>
        <p>By {{ article.author }} | {{ article.type }} | {{ article.category }}</p>
        <div v-if="article.tags && article.tags.length">
          <span v-for="tag in article.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
        <p>{{ article.summary || article.content?.slice(0, 100) + '...' }}</p>
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
.tag {
  background: #f0f0f0;
  border-radius: 4px;
  padding: 0.2em 0.5em;
  margin-right: 0.5em;
  font-size: 0.9em;
}
</style>
