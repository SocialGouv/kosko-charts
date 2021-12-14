<h1 align="center">
  <img src="https://github.com/SocialGouv/helm-charts/raw/master/.github/boat.gif" width="250"/>
  <p align="center">Kosko Charts</p>
  <p align="center" style="font-size: 0.5em">🧹The Social Gouv Kosko Charts✨</p>
</h1>

<p align="center">
  <a href="https://github.com/SocialGouv/kosko-charts/workflows/main/"><img src="https://github.com/SocialGouv/kosko-charts/workflows/main/badge.svg" alt="Github Master Main Status"></a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" alt="License: Apache-2.0"></a>
  <a href="https://www.npmjs.com/package/@socialgouv/kosko-charts"><img src="https://img.shields.io/npm/v/@socialgouv/kosko-charts.svg" alt="Npm version"></a>
  <a href="https://codecov.io/gh/SocialGouv/kosko-charts"><img src="https://codecov.io/gh/SocialGouv/kosko-charts/branch/master/graph/badge.svg" alt="codecov"></a>
</p>

<br>
<br>
<br>

> [Kosko](https://github.com/tommy351/kosko) charts for the SocialGouv needs

See also : the [API Documentation](https://socialgouv.github.io/kosko-charts/)

## Problem

Providing a common Kubernetes (k8s) configuration to SocialGouv apps is a tricky task. We want to provide

- a "zero configuration" build, where most application will start from
- a Continuous delivery (CD) approach where each Git branches and tags should be deployed
- a [k8s namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) should be created per branches and tags. It should be GitLab friendly
- a basic k8s triad : [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [Service](https://kubernetes.io/fr/docs/concepts/services-networking/service/), [Ingress](https://kubernetes.io/fr/docs/concepts/services-networking/ingress/)
- a [GitLab environments and deployments](https://docs.gitlab.com/ee/ci/environments/) and [clusters](https://docs.gitlab.com/ee/user/project/clusters/index.html#web-terminals) ready configuration
- a [Kubernetes Resource Report](https://github.com/hjacobs/kube-resource-report) friendly labelling
- a [kubed wildcard sync](https://appscode.com/products/kubed/0.9.0/guides/config-syncer/intra-cluster/)

<br>
<br>
<br>
<br>

## Solution

Powered by [Kosko](https://github.com/tommy351/kosko), in this lib we provide default SocialGouv components and environments. We expect project to use and extend them at will.

```sh
$ npx degit "SocialGouv/kosko-charts/templates/sample#v9.8.20" .k8s
$ yarn --cwd .k8s
# on GitLab
$ yarn --cwd .k8s kosko generate --env dev
# locally
$ DOTENV_CONFIG_PATH=environments/.gitlab-ci.env yarn --cwd .k8s dev --require dotenv/config
```

<br>
<br>
<br>
<br>

## Installation

We use [degit](https://github.com/Rich-Harris/degit) to scaffold the deployment config.

```sh
$ npx degit "SocialGouv/kosko-charts/templates/sample#v9.8.20" .k8s
```

`.k8s` is the target deployment config package folder.
You can install it with :

```sh
$ yarn --cwd .k8s
```

You can add a shortcut to it in your `package.json`

```js
{
  // [...]
  "scripts": {
    // [...]
    "k8s": "yarn --silent --cwd .k8s",
    // [...]
  }
  // [...]
}
```

The shortcut using `--silent` to be pipable to `kubectl apply` like :

```
$ yarn k8s generate | kubectl apply -f -
```

<br>
<br>
<br>

## Usage

### Components

The SocialGouv default components

#### [`@socialgouv/kosko-charts/components/app`](./src/components/app)

#### [`@socialgouv/kosko-charts/components/azure-pg`](./src/components/azure-pg)

#### [`@socialgouv/kosko-charts/components/hasura`](./src/components/hasura)

#### [`@socialgouv/kosko-charts/components/metabase`](./src/components/metabase)

#### [`@socialgouv/kosko-charts/components/namespace`](./src/components/namespace)

#### [`@socialgouv/kosko-charts/components/netpol`](./src/components/netpol)

#### [`@socialgouv/kosko-charts/components/nginx`](./src/components/nginx)

#### [`@socialgouv/kosko-charts/components/pg-secret`](./src/components/pg-secret)

#### [`@socialgouv/kosko-charts/components/pgweb`](./src/components/pgweb)

#### [`@socialgouv/kosko-charts/components/redis`](./src/components/redis)

### Environments

The SocialGouv default components

#### [`@socialgouv/kosko-charts/components/gitlab`](./src/components/gitlab)

### Templates

In addition to the `sample` template inspired by the [SocialGouv/sample-next-app](https://github.com/SocialGouv/sample-next-app/), you will find addtional templates you can use to bootstrap your `.k8s` folder.

```sh
# For [hasura](https://hasura.io/)
$ npx degit "SocialGouv/kosko-charts/templates/hasura#v9.8.20" .k8s

# For [nginx](https://nginx.org/)
$ npx degit "SocialGouv/kosko-charts/templates/nginx#v9.8.20" .k8s

# For [pgweb](https://sosedoff.github.io/pgweb/)
$ npx degit "SocialGouv/kosko-charts/templates/pgweb#v9.8.20" .k8s

# For [redis](https://redislabs.com/)
$ npx degit "SocialGouv/kosko-charts/templates/redis#v9.8.20" .k8s
```

### Testing

`@socialgouv/kosko-charts` provides a snapshot testing strategy through [Jest](https://jestjs.io/).

```
# At the root of your project
$ npx degit "SocialGouv/kosko-charts/templates/testing#v9.8.20" .k8s
```

Then update the `.k8s/__tests__` file to match your project.  
Our [`e2e/testing/__fixtures__/__tests__`](./e2e/testing/__fixtures__/__tests__) will run default testing cases.  
Using the global `environments/.gitlab-ci.env` (if exists in your kosko context).
In addition, it will try to load and merge it with `environments/<env>/.gitlab-ci.env`.

<br>
<br>
<br>
<br>

## Inspiration

This package was inspired by the [kosko itself](https://github.com/tommy351/kosko/) and the year of experimentation with [Helm](https://helm.sh/) and our [SocialGouv/helm-charts](https://github.com/SocialGouv/helm-charts).

<br>
<br>
<br>
<br>

## [License Apache-2.0](./LICENSE)
