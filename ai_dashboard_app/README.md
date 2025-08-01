# AI Insight Dashboard

A simple React + Vite application that displays curated information about the latest developments in artificial intelligence. The dashboard contains several sections such as news headlines, newly released tools, trending models and more. The news headlines are loaded from the public Hacker News API at runtime.

## Running Locally

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Deploying to Vercel

1. Sign in to [Vercel](https://vercel.com/) and create a new project.
2. Import this repository or upload the `ai_dashboard_app` directory.
3. Vercel automatically detects Vite projects. Use the default build command `vite build` and output directory `dist`.
4. After deployment, your dashboard will be accessible on the web.

Click the **Refresh News** button in the AI News section to load the latest stories.

Feel free to customize the content in `src/data.js` with live data sources or API calls.
