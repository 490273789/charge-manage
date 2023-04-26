module.exports = {
  '**/*.{tsx,ts}': ['npm run lint:es', 'git add .'],
  '**/*.{scss,css}': ['npm run lint:style', 'git add .']
}
