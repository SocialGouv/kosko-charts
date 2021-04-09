# @socialgouv/kosko-charts

This package provide [kosko](https://kosko.dev/) components and helpers for common Kubernetes use-cases in the [SocialGouv](https://github.com/SocialGouv) GitOps infrastructure.

Components are configured with gitlab-friendly defaults and annotations and are fully customisable.

Using TypeScript, we can use the power of JavaScript and validates our manifests against [kubernetes-models](https://github.com/tommy351/kubernetes-models-ts) API, use JEST snapshot testing and have IDE autocompletion.

## Usage

Its important to read the [kosko documentation](https://kosko.dev/docs/) before proceeding.

### Setup

In your project, the `.k8s` folder holds all the kosko configuration.

You can clone a sample folder from our template :

`npx degit "SocialGouv/kosko-charts/templates/sample#master" .k8s`

Add to your project `package.json` scripts : `"k8s": "yarn --silent --cwd .k8s"`

### Generate manifests

Now you can generate your manifests locally or from the CI:

```sh
yarn k8s generate --env prod
```

See [kosko documentation](https://kosko.dev/docs/) for more usage examples

## Components

- **app** : Basic docker application with [[Deployment]], [[Service]] and [[Ingress]]
- **azure-pg** : Azure Postgres related jobs
- **azure-storage** : Azure Storage related jobs
- **hasura**: hasura.io with [[Deployment]], [[Service]] and optionnal [[Ingress]]
- **metabase**: metabase.com with [[Deployment]], [[Service]] and [[Ingress]]
- **namespace**: Namespace creation
- **netpol**: [[NetworkPolicy]]
- **nginx**: Nginx with [[Deployment]], [[Service]] and [[Ingress]]
- **pg-secret**: Postgres secrets creation
- **pgweb**: PGweb with [[Deployment]], [[Service]] and [[Ingress]]
- **redis**: Redis with [[Deployment]] and [[Service]]

## Utils

- [[addEnv]]
- [[addInitContainer]]
- [[addInitContainerCommand]]
- [[addPostgresUserSecret]]
- [[addToEnvFrom]]
- [[addWaitForHttp]]
- [[addWaitForPostgres]]
- [[addWaitForService]]
- [[createDeployment]]
- [[createIngress]]
- [[createService]]
- [[getDeployment]]
- [[getHarborImagePath]]
- [[getIngressHost]]
- [[getManifestByKind]]
- [[getPgServerHostname]]
- [[waitForHttp]]
- [[waitForPostgres]]
- [[waitForService]]

## Related

- [Kubernetes reference](https://k8sref.io/)
- [shared GitLab jobs gitlab-ci-yml](https://github.com/SocialGouv/gitlab-ci-yml)
- [Common docker images](https://github.com/SocialGouv/docker)
