# Contributing

> Thanks for being willing to contribute !

## TL;DR

```sh
# Install
$ yarn

# Build
$ yarn build
# Watch the build
$ yarn build --watch

# Lint
$ yarn lint

# Type check
$ yarn typecheck --watch

# Test
$ yarn test
# Watch the test
$ yarn test --watch

# Build
$ yarn e2e
# Watch the e2e
$ yarn e2e --watch
```

## Testing local build

You can link the project with

```js
{
  "devDependencies": {
    "@socialgouv/kosko-charts": "link:../../kosko-charts",
  }
}
```

```
yarn --silent k8s kosko generate --env gitlab

cp ./xxx/charts/xxxx/.gitlab.env ./.k8s/environments/gitlab/.env
DOTENV_CONFIG_PATH=./environments/gitlab/.env yarn --silent k8s kosko generate --require dotenv/config --env gitlab

$ cd e2e/kosko-generate/vanilla
$ DOTENV_CONFIG_PATH=../.env DEBUG=* $(yarn bin)/kosko generate --require dotenv/config -r module-alias/register --env prod "!(_*)"
```

## Template testing

We can test a template by running it as a project.
For example, to test the template deployment of `templates/nginx`

```sh
# Ensure you are on the cluster 2
$ export KUBECONFIG=~/.kube/config-dev2
# This will point to the sample-next-app project
$ export RANCHER_PROJECT_ID=c-bd7z2:p-7ms8
# Install the template dependencies
# you might want to replace the `@socialgouv/kosko-charts` version in the tempalte
# `package.json` to link to your local build (`yarn build`) of the package
# - "@socialgouv/kosko-charts": "vX.Y.Z",
# + "@socialgouv/kosko-charts": "link:../..",
$ yarn --prefer-offline --cwd templates/nginx
# Generate the manifest
$ yarn --silent --cwd templates/nginx gitlab:dev
# Generate and apply the manifest
$ yarn --silent --cwd templates/nginx gitlab:dev | kubectl apply -f -
# Go to https://e2e-branch-42-sample-kosko.dev2.fabrique.social.gouv.fr ?
```
