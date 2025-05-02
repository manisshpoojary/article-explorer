<template>
  <div class="filter-bar">
    <select v-model="selected.category" @change="emitChange">
      <option value="">All Categories</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
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
function emitChange() {
  emit('filter-change', { ...selected });
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 1em;
  margin-bottom: 1em;
}
select {
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
