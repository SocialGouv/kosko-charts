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
<br>

> [Kosko](https://github.com/tommy351/kosko) charts for the SocialGouv needs



```

    "@socialgouv/kosko-charts": "link:../../kosko-charts",



```

```
yarn --silent k8s kosko generate --env gitlab

cp ./xxx/charts/xxxx/.gitlab.env ./.k8s/environments/gitlab/.env
DOTENV_CONFIG_PATH=./environments/gitlab/.env yarn --silent k8s kosko generate --require dotenv/config --env gitlab

$ cd e2e/kosko-generate/vanilla
$ DOTENV_CONFIG_PATH=../.env DEBUG=* $(yarn bin)/kosko generate --require dotenv/config -r module-alias/register --env prod "!(_*)"
```
