# Article Explorer

A modern Vue 3 + Vite application for browsing, filtering, and exploring tech articles by category, type, author, and tag. The app features a responsive design, clean UI, and mock data for demonstration.

## Features
- Browse articles by category, tag, author, or type (text/video)
- Filter and search articles with a dynamic filter bar
- Responsive card-based UI for articles
- Pagination for article lists
- Article detail view with support for video and text articles
- Categories and tags pages with search and count
- About page with author bios
- Mock data for articles, categories, and homepage

## Folder Structure
```
vue-articles-app/
  index.html
  package.json
  vite.config.js
  public/
    vite.svg (default favicon)
  src/
    App.vue
    main.js
    style.css
    assets/
      vue.svg (Vue logo)
    components/
      About.vue
      ArticleDetail.vue
      ArticleList.vue
      Categories.vue
      FilterBar.vue
      HelloWorld.vue
      Home.vue
      Pagination.vue
      Tags.vue
    mock-data/
      article.json
      categories.json
      homePage.json
```

## Mock Data
- `src/mock-data/article.json`: All article details (text and video types)
- `src/mock-data/homePage.json`: Article summaries for homepage listing
- `src/mock-data/categories.json`: List of article categories

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open the app:**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Customization
- To update articles, edit the JSON files in `src/mock-data/`.
- To change the favicon, update the `<link rel="icon">` in `index.html` and place your icon in the `public/` or `src/assets/` folder.

## Authors
Author bios and images are shown on the About page, sourced from the mock data.

## License
This project is for educational/demo purposes.
