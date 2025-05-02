import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Categories from './components/Categories.vue';
import Tags from './components/Tags.vue';
import About from './components/About.vue';
import ArticleDetail from './components/ArticleDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/categories', name: 'Categories', component: Categories },
  { path: '/categories/:categoryId', name: 'CategoryArticles', component: Home, props: true },
  { path: '/tags', name: 'Tags', component: Tags },
  { path: '/tags/:tag', name: 'TagArticles', component: Home, props: true },
  { path: '/about', name: 'About', component: About },
  { path: '/article/:articleId', name: 'ArticleDetail', component: ArticleDetail, props: true },
  { path: '/:catchAll(.*)', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app');
