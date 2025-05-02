<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="$emit('page-change', currentPage - 1)">Prev</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="$emit('page-change', currentPage + 1)">Next</button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2em;
  margin: 2em 0 1em 0;
}
.pagination button {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5em 1.2em;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.pagination button:disabled {
  background: #e0e7ff;
  color: #b6b6b6;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .pagination {
    gap: 0.7em;
  }
  .pagination button {
    padding: 0.4em 0.8em;
    font-size: 0.98em;
  }
}
@media (max-width: 600px) {
  .pagination {
    flex-direction: column;
    gap: 0.5em;
  }
  .pagination button {
    width: 100%;
    font-size: 0.97em;
  }
}
</style>