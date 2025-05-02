<template>
  <div class="page">
    <h2>About</h2>
    <p>
      <strong>Article Explorer</strong> is a modern Vue 3 demo app for browsing, filtering, and exploring articles by category, type, author, and tag. It features a responsive design, mock data, and a clean, user-friendly interface.
    </p>
    <ul class="about-list">
      <li>Built with Vue 3 + Vite</li>
      <li>Modern card UI and navigation</li>
      <li>Responsive for all devices (including iPhone 15)</li>
      <li>Filter articles by category, type, author, and tag</li>
      <li>Mock data for demo purposes</li>
    </ul>
    <p style="margin-top:2em; color:#6c757d; font-size:0.98em;">
      &copy; 2025 Article Explorer Demo
    </p>
  </div>
</template>

<script setup>
// No logic needed for static About page
</script>

<style scoped>
.page {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  padding: 2em 1.5em;
  margin: 2em auto;
  max-width: 600px;
}
.about-list {
  margin: 1.5em 0 0 1.2em;
  color: #2563eb;
  font-size: 1.08em;
  line-height: 1.7;
}
</style>
