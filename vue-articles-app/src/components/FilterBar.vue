<template>
  <div class="filter-bar">
    <select v-model="selected.category" @change="emitChange">
      <option value="">All Categories</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
    </select>
    <select v-model="selected.type" @change="emitChange">
      <option value="">All Types</option>
      <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
    </select>
    <select v-model="selected.author" @change="emitChange">
      <option value="">All Authors</option>
      <option v-for="author in authors" :key="author" :value="author">{{ author }}</option>
    </select>
    <select v-model="selected.tag" @change="emitChange">
      <option value="">All Tags</option>
      <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
    </select>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
const props = defineProps({
  categories: Array,
  types: Array,
  authors: Array,
  tags: Array
});
const emit = defineEmits(['filter-change']);
const selected = reactive({ category: '', type: '', author: '', tag: '' });

// Watch for prop changes to reset dropdowns when filters are cleared
watch(
  () => [props.categories, props.types, props.authors, props.tags],
  () => {
    selected.category = '';
    selected.type = '';
    selected.author = '';
    selected.tag = '';
  }
);

// Also watch for an explicit reset event from parent (if needed)
watch(
  () => [props.categories.length, props.types.length, props.authors.length, props.tags.length],
  () => {
    selected.category = '';
    selected.type = '';
    selected.author = '';
    selected.tag = '';
  }
);

function emitChange() {
  emit('filter-change', { ...selected });
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 1em;
  margin-bottom: 1.5em;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  padding: 0.7em 1em;
  align-items: center;
}
select {
  padding: 0.5em 1.2em 0.5em 0.7em;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: #f8fafc;
  color: #222;
  font-size: 1em;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(60,60,60,0.04);
  transition: border 0.2s, box-shadow 0.2s;
  outline: none;
  margin-right: 0.5em;
}
select:focus {
  border: 1.5px solid #3b82f6;
  box-shadow: 0 0 0 2px #e0e7ff;
}
@media (max-width: 600px) {
  .filter-bar {
    flex-direction: column;
    gap: 0.7em;
    padding: 0.7em 0.5em;
  }
  select {
    width: 100%;
    margin-right: 0;
  }
}
</style>
