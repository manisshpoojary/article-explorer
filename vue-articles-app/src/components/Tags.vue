<template>
  <div class="page">
    <h2>Tags</h2>
    <div class="tags-list">
      <span v-for="tag in tags" :key="tag" class="tag-item">#{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const tags = ref([]);

onMounted(async () => {
  const resp = await fetch('/src/mock-data/homePage.json').then(r => r.json());
  const articles = resp.data.articles || [];
  tags.value = [...new Set(articles.flatMap(a => a.tags || []))];
});
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
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7em;
  margin-top: 1em;
}
.tag-item {
  background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
  color: #3b82f6;
  border-radius: 4px;
  padding: 0.4em 1em;
  font-size: 1.05em;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(60,60,60,0.04);
}
</style>
