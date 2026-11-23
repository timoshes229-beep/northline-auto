#!/usr/bin/env bash
# Статическая сборка для GitHub Pages и публикация в ветку gh-pages.
# API-маршрут заявок на статическом хостинге не работает, поэтому на время сборки он убирается.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"

mv app/api /tmp/northline-api-$$
trap 'mv /tmp/northline-api-$$ "$ROOT/app/api"' EXIT

OUT=.next-pages   # при output: "export" Next кладёт готовый сайт прямо в distDir
rm -rf "$OUT"
PAGES=1 NEXT_DIST_DIR=.next-pages npx next build
touch "$OUT"/.nojekyll   # иначе GitHub Pages не отдаст папку _next

if [ "${1:-}" = "--deploy" ]; then
  REMOTE=$(git remote get-url origin)
  cd "$OUT"
  git init -q -b gh-pages
  git add -A
  git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" \
    commit -q -m "Deploy to GitHub Pages"
  git push -f -q "$REMOTE" gh-pages
  rm -rf .git
  echo "Опубликовано в ветку gh-pages"
fi
