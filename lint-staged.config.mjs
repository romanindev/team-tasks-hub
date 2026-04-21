export default {
  '*.{js,mjs,cjs,ts,tsx,json,md,yml,yaml}': ['prettier --write'],
  '*.{js,mjs,cjs,ts,tsx}': ['eslint --fix']
};
