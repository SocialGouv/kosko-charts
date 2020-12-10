# Update to `@socialgouv/kosko-charts` 4

## Package update

```sh
$ cd .k8s
$ yarn
$ yarn upgrade @socialgouv/kosko-charts 
# or if the v4 is still in alpha version
$ yarn upgrade @socialgouv/kosko-charts@alpha 
```

## Depencencies change

```
$ yarn add -D @babel/core @babel/plugin-transform-modules-commonjs @types/jest
```

Your `package.json` shoudl look like that :

```js
{
  // [...]
  "dependencies": {
    "@kosko/env": "^1.0.1",
    "@kubernetes-models/sealed-secrets": "^1.0.1",
    "@socialgouv/kosko-charts": "^4.0.0-alpha.15",
    "@types/node": "^14.14.11",
    "kosko": "^1.0.1",
    "kubernetes-models": "^1.0.1",
    "ts-node": "^9.1.1",
    "typescript": "^4.1.2"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9",
    "@babel/plugin-transform-modules-commonjs": "^7.12.1",
    "@types/jest": "^26.0.18",
    "dotenv": "^8.2.0",
    "jest": "^26.6.3"
  }
}
```

## K8S testing 

Copie that tests files from the latest update (here `v4.0.0-alpha.15`) 

```sh
$ npx degit "SocialGouv/kosko-charts/e2e/testing/__fixtures__/__tests__#v4.0.0-alpha.15" __tests__
$ npx degit "SocialGouv/kosko-charts/e2e/testing/__fixtures__/babel.config.js#v4.0.0-alpha.15" babel.config.js
```

Add a `test` script in the `.k8s/package.json`
```js
{
  // [...]
  "scripts": {
    // [...]
    "test": "jest"
  },
  // [...]
}
```

```sh
$ yarn test 
$ yarn test -u # to update the snapshots
```

