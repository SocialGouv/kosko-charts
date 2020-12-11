# Update to `@socialgouv/kosko-charts` 4

## Package update

```sh
$ npx degit "SocialGouv/kosko-charts/templates/testing/__tests__#v4.X.Y" .k8s/__tests__
$ npx degit "SocialGouv/kosko-charts/templates/testing/package.json#v4.X.Y" .k8s/package.json

#

$ cd .k8s
$ yarn
$ yarn upgrade @socialgouv/kosko-charts
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
    "@socialgouv/kosko-charts": "^4.0.0",
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

## Override "foo" project

- `.k8s/__tests__/kosko generate --env dev.ts`

```diff
     await getEnvManifests("dev", "", {
-       ..project("foo").dev,
+      ...project("sample-next-app").dev,
-      KUBE_NAMESPACE: "foo-XYZ-master-dev2",
+      KUBE_NAMESPACE: "sample-next-app-85-master-dev2",
-      RANCHER_PROJECT_ID: "c-bar:p-foo",
+      RANCHER_PROJECT_ID: "c-bd7z2:p-7ms8p",
     })
```

- `.k8s/__tests__/kosko generate --env preprod.ts`

```diff
     await getEnvManifests("preprod", "", {
-       ..project("foo").preprod,
+      ...project("sample-next-app").preprod,
-      KUBE_NAMESPACE: "foo-XYZ-preprod-dev2",
+      KUBE_NAMESPACE: "sample-next-app-85-preprod-dev2",
-      RANCHER_PROJECT_ID: "c-bar:p-foo",
+      RANCHER_PROJECT_ID: "c-bd7z2:p-7ms8p",
     })
```

- `.k8s/__tests__/kosko generate --env preprod.ts`

```diff
     await getEnvManifests("preprod", "", {
-      ...project("foo").prod,
+      ...project("sample-next-app").prod,
     })
```

## K8S testing 

Copie that tests files from the latest update (here `v4.0.0`)

```sh
$ npx degit "SocialGouv/kosko-charts/e2e/testing/__fixtures__/__tests__#v4.0.0" __tests__
$ npx degit "SocialGouv/kosko-charts/e2e/testing/__fixtures__/babel.config.js#v4.0.0" babel.config.js
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

## Components update

```diff
-import { createNamespace } from "@socialgouv/kosko-charts/utils/createNamespace";
+import { createNamespace } from "@socialgouv/kosko-charts/components/namespace";
```
