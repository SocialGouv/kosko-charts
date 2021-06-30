# Github Environments

> The Github focus environments.

## [`GithubGlobalEnvironment`](./index.ts)

> extends [`GlobalEnvironment`](./../types/index.ts)

### Usage

Import the github global environment object.

```ts
// in .k8s/environments/_base/index.ts
import github from "@socialgouv/kosko-charts/environments/github";

export default github(process.env);
```

You can customize it

```ts
// in .k8s/environments/_base/index.ts
import github from "@socialgouv/kosko-charts/environments/github";

export default {
  ...github(process.env),
};
```

### Requirements

As this environment is meant to be used in Github, some environment variables are expected.

| Variable                   | Description                                                                |
| -------------------------- | -------------------------------------------------------------------------- |
| `GITHUB_SHA`               | The commit SHA that triggered the workflow\*                               |
| `GITHUB_REF`               | The branch or tag ref that triggered the workflow\*                        |
| `GITHUB_JOB`               | The job_id of the current job\*                                            |
| `GITHUB_RUN_ID`            | A unique number for each run within a repository\*                         |
| `GITHUB_REPOSITORY`        | The owner and repository name\*                                            |
| `SOCIALGOUV_BASE_DOMAIN`   | The base domain used to forge deployments urls                             |
| `RANCHER_PROJECT_ID`       | The Rancher project ID                                                     |
| `SOCIALGOUV_PREPRODUCTION` | (optional) If set we are in preproduction (on the developement cluster)    |
| `SOCIALGOUV_PRODUCTION`    | (optional) If set we are in production (on the production cluster)         |

\*: see https://docs.github.com/en/actions/reference/environment-variables
