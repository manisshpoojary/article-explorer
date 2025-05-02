<script setup>
</script>

<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="/vite.svg" alt="Logo" />
      <span class="navbar-title">Article Explorer</span>
    </div>
    <div class="navbar-links">
      <router-link to="/" exact-active-class="active">Home</router-link>
      <router-link to="/categories" exact-active-class="active">Categories</router-link>
      <router-link to="/tags" exact-active-class="active">Tags</router-link>
      <router-link to="/about" exact-active-class="active">About</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style scoped>
.navbar {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(60,60,60,0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7em 2em;
  border-radius: 0 0 16px 16px;
  margin-bottom: 2em;
}
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.7em;
}
.navbar-logo img {
  width: 36px;
  height: 36px;
}
.navbar-title {
  font-size: 1.3em;
  font-weight: 700;
  color: #3b82f6;
  letter-spacing: 1px;
}
.navbar-links {
  display: flex;
  gap: 1.5em;
}
.navbar-links a {
  color: #222;
  text-decoration: none;
  font-weight: 500;
  font-size: 1em;
  padding: 0.2em 0.5em;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
}
.navbar-links a.active, .navbar-links a:hover {
  background: #e0e7ff;
  color: #2563eb;
}
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.7em 1em;
    gap: 0.7em;
  }
  .navbar-links {
    gap: 1em;
  }
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
