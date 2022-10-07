The following works:

```bash
npm install -g @microsoft/rush
rush install
cd apps/vue2and3-main
cd node_modules/vue2and3-dependency
npx webpack
cd ../..
npx webpack
# Extra step - re-link because node_modules/vue2and3-dependency/public is missing
rush link
open apps/vue2and3-main/index.html
```

OR via a rush command as a bonus (see `apps/vue2and3-main/package.json`):
```bash
rush install
rush build
rush link
open apps/vue2and3-main/index.html
```

You should see:

```
Vue 3 Component
Vue 2 Component
```


Do `cd apps/vue2and3-main` and `ls -la node_modules` in order to see how node_modules are handled by the monorepo tool. 

In particular, when we do the node_modules build inside of our app `node_modules/vue2and3-dependency`, we are actually working in `common/temp/node_modules/vue2and3-dependency`. After a successful build, the `public` folder is not available in our project app, because it was non-existing when we did `rush install`. Executing `rush link` as an extra step is fixing that. 

The problem above is more related with the fact that the PoC is directly requiring the dependency client script from node modules. I can imagine if it does what Apostrophe does (copies the build result in the project root instead) things should work smoothly (and we can actually try that).

[Rush Docs](https://rushjs.io/pages/intro/welcome/)
