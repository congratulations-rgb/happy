# Birthday Surprise ❤️
1. `npm install` then `npm run dev`
2. Put your song at `public/assets/birthday.mp3` and photos in `public/images/` (image.jpg, image2.jpg … image10.jpg). Missing photos are skipped.
3. Edit names, captions, letter and texts in `src/config.js`.
## Deploy
- **Vercel:** import the repo (framework: Vite). Done.
- **GitHub Pages:** `npm run build`, then publish the `dist/` folder (e.g. gh-pages branch). Paths are relative (`base: './'`), so it works in any sub-folder.
