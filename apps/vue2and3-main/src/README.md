The following works:

```bash
npm install
cd node_modules/vue2and3-dependency
npx webpack
cd ../..
npx webpack
open index.html
```

You should see:

```
Vue 3 Component
Vue 2 Component
```

This shows that the builds can coexist if the dependencies of the vue 2 build are all declared **at the dependency module level**.

When you think about it, this is exactly how npm is supposed to work. Otherwise lots of dependencies wouldn't work due to conflicts with project level.

Where we get into trouble is when we **try to initiate the apostrophe build from the project level.** This sends us down the wrong `node_modules` to start with.

So here is a possible approach:

* Apostrophe does the admin UI asset build with the working directory set to `node_modules/apostrophe` if it exists ("if it exists" is an "out" we provide to those using alternative tools i.e. monorepos that don't use `node_modules`, if that is even a thing).
* The `modules` dir **for admin UI** has to get built in `node_modules/apostrophe/modules` there too, so that relative paths work properly there.
* But the `modules` dir must be separately built **for ui/src** in `modules` so that it doesn't find older dependencies in `node_modules/apostrophe/node_modules`).
* One tricky problem is when custom admin UI code **at project level** depends on other npm modules, and project level vue 3 or other code depends on different versions of those same modules.
* I think that this has to be handled, and can be handled, through `package.json` aliasing. There isn't another realistic solution and this problem already potentially exists today so in a sense it is not a bc break.
* For most people these changes will allow Vue 2 admin UI and Vue 3 public UI to coexist today.
* When we switch to Vue 3 in the admin UI, the reverse should also be true.
* OK so maybe you're using a monorepo and things are different. **How** are they different? If it really breaks the above pattern, which seems unlikely because it would also break any situation where module A requires module C version 1 and module B requires module C version 2, should this type of customer just commit to sticking with Vue 2 only until it's time to stick to Vue 3 only?
