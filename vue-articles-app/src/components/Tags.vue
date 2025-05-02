<template>
  <div class="page">
    <h2>Tags</h2>
    <input
      v-model="search"
      class="tag-search"
      type="text"
      placeholder="Search tags..."
    />
    <div class="tags-list">
      <span
        v-for="tag in filteredTags"
        :key="tag"
        class="tag-item"
        @click="goToTag(tag)"
        tabindex="0"
        @keyup.enter="goToTag(tag)"
      >
        #{{ tag }}
        <span class="tag-count">({{ getTagCount(tag) }})</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const tags = ref([]);
const articles = ref([]);
const search = ref('');
const router = useRouter();

onMounted(async () => {
  const resp = await fetch('/src/mock-data/homePage.json').then(r => r.json());
  const arts = resp.data.articles || [];
  articles.value = arts;
  tags.value = [...new Set(arts.flatMap(a => a.tags || []))];
});

const filteredTags = computed(() => {
  if (!search.value) return tags.value;
  return tags.value.filter(tag =>
    tag.toLowerCase().includes(search.value.toLowerCase())
  );
});

function getTagCount(tag) {
  return articles.value.filter(a => (a.tags || []).includes(tag)).length;
}

function goToTag(tag) {
  router.push({ name: 'TagArticles', params: { tag } });
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
.tag-search {
  width: 350px;
  max-width: 100%;
  display: block;
  margin: 0 auto 1.2em auto;
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 1px solid #e0e7ff;
  font-size: 1.08em;
  outline: none;
  transition: border 0.2s;
}
.tag-search:focus {
  border: 1.5px solid #2563eb;
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
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  outline: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.tag-item:hover, .tag-item:focus {
  background: #e0e7ff;
  color: #1d4ed8;
}
.tag-count {
  color: #64748b;
  font-size: 0.98em;
  margin-left: 0.5em;
}
</style>
