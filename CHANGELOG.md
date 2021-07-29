## [8.1.1](https://github.com/SocialGouv/kosko-charts/compare/v8.1.0...v8.1.1) (2021-07-29)


### Bug Fixes

* **environments:** github branch env slug missing prefix ([#623](https://github.com/SocialGouv/kosko-charts/issues/623)) ([23fa233](https://github.com/SocialGouv/kosko-charts/commit/23fa233ee050a62f6cf3a60ca326daf29f1e452f))

# [8.1.0](https://github.com/SocialGouv/kosko-charts/compare/v8.0.3...v8.1.0) (2021-07-29)


### Features

* **utils:** add gitlab like environmentSlug function ([#622](https://github.com/SocialGouv/kosko-charts/issues/622)) ([3f75386](https://github.com/SocialGouv/kosko-charts/commit/3f7538688c651382b1b970a10d705b72abbb534b))

## [8.0.3](https://github.com/SocialGouv/kosko-charts/compare/v8.0.2...v8.0.3) (2021-07-24)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.17.6 ([#620](https://github.com/SocialGouv/kosko-charts/issues/620)) ([0790a8f](https://github.com/SocialGouv/kosko-charts/commit/0790a8fee456de72ac9eec04b2aea0460696ad3e))


### Reverts

* **azure-storage:** add dynamic fileshare pvc ([#585](https://github.com/SocialGouv/kosko-charts/issues/585)) ([ff6c0dc](https://github.com/SocialGouv/kosko-charts/commit/ff6c0dcb666e7dacc94053b5b4b10ec118e9d276))

## [8.0.2](https://github.com/SocialGouv/kosko-charts/compare/v8.0.1...v8.0.2) (2021-07-16)


### Bug Fixes

* **ingress:** missing pathType and name port collision ([#608](https://github.com/SocialGouv/kosko-charts/issues/608)) ([9a12a7b](https://github.com/SocialGouv/kosko-charts/commit/9a12a7b0247af8c54bdc4af7327280263ce13469))

## [8.0.1](https://github.com/SocialGouv/kosko-charts/compare/v8.0.0...v8.0.1) (2021-07-15)


### Bug Fixes

* **deps:** update dependency slugify to ^1.6.0 ([#607](https://github.com/SocialGouv/kosko-charts/issues/607)) ([918ebf5](https://github.com/SocialGouv/kosko-charts/commit/918ebf5c0f00631c6c2481c2d35a92332e7169f3))

# [8.0.0](https://github.com/SocialGouv/kosko-charts/compare/v7.0.8...v8.0.0) (2021-07-13)


* feat(ingress)!: update from extensions/v1beta1 to networking.k8s.io/v1 (#604) ([e3b383c](https://github.com/SocialGouv/kosko-charts/commit/e3b383c1cd620ea86ae189b17de3245dbaad67f9)), closes [#604](https://github.com/SocialGouv/kosko-charts/issues/604)


### BREAKING CHANGES

* Our utils deployment and ingress will no longer depend on `process.env`

```diff
 createDeployment({
   containerPort: 8080,
   name: "www",
+  registry: "registry.gitlab.factory.social.gouv.fr/socialgouv/sample",
+  sha: "0123456789abcdefghijklmnopqrstuvwxyz0123",
 })

 createIngress({
   hosts: ["sample.dev2.fabrique.social.gouv.fr"],
+  isProduction: false,
   name: "my-ingress",
 })
```

## [7.0.8](https://github.com/SocialGouv/kosko-charts/compare/v7.0.7...v7.0.8) (2021-07-09)


### Bug Fixes

* **deps:** update dependency ts-node to ^10.1.0 ([#601](https://github.com/SocialGouv/kosko-charts/issues/601)) ([fe270ef](https://github.com/SocialGouv/kosko-charts/commit/fe270ef4f7a32e8373286d0c7c2ffa0c4f009145))

## [7.0.7](https://github.com/SocialGouv/kosko-charts/compare/v7.0.6...v7.0.7) (2021-07-07)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.17.5 ([#599](https://github.com/SocialGouv/kosko-charts/issues/599)) ([58373b4](https://github.com/SocialGouv/kosko-charts/commit/58373b4aa5ec69ba4559fc11fe053a9b5668446f))

## [7.0.6](https://github.com/SocialGouv/kosko-charts/compare/v7.0.5...v7.0.6) (2021-07-05)


### Bug Fixes

* Slugify namespace properly. ([#595](https://github.com/SocialGouv/kosko-charts/issues/595)) ([b2afca4](https://github.com/SocialGouv/kosko-charts/commit/b2afca4f87a2054a183f5b5fe7ad366d453c7403))

## [7.0.5](https://github.com/SocialGouv/kosko-charts/compare/v7.0.4...v7.0.5) (2021-07-02)


### Bug Fixes

* Use SOCIALGOUV_BASE_DOMAIN in Github testing env ([#593](https://github.com/SocialGouv/kosko-charts/issues/593)) ([0f0cb4f](https://github.com/SocialGouv/kosko-charts/commit/0f0cb4f0bac0ec9a1785af06221ad41ecb2e9ee3))

## [7.0.4](https://github.com/SocialGouv/kosko-charts/compare/v7.0.3...v7.0.4) (2021-07-01)


### Bug Fixes

* Use global ci env in Azure volumes. ([#592](https://github.com/SocialGouv/kosko-charts/issues/592)) ([c7fdbf8](https://github.com/SocialGouv/kosko-charts/commit/c7fdbf81515667b0e8450d6e3b358959bdc58721))

## [7.0.3](https://github.com/SocialGouv/kosko-charts/compare/v7.0.2...v7.0.3) (2021-07-01)


### Bug Fixes

* Use azure-pg-user secret name on preprod and prod. ([#591](https://github.com/SocialGouv/kosko-charts/issues/591)) ([a51c2ba](https://github.com/SocialGouv/kosko-charts/commit/a51c2ba8255844060e5371849fe3846f01d27b0c))

## [7.0.2](https://github.com/SocialGouv/kosko-charts/compare/v7.0.1...v7.0.2) (2021-07-01)


### Bug Fixes

* Use azure-pg-user secret name on preprod and prod. ([#590](https://github.com/SocialGouv/kosko-charts/issues/590)) ([fde1a20](https://github.com/SocialGouv/kosko-charts/commit/fde1a20b8aa323e5d35b94e27e5b950c3197e7c1))

## [7.0.1](https://github.com/SocialGouv/kosko-charts/compare/v7.0.0...v7.0.1) (2021-07-01)


### Bug Fixes

* **deps:** update dependency typescript to ^4.3.5 ([#587](https://github.com/SocialGouv/kosko-charts/issues/587)) ([0633081](https://github.com/SocialGouv/kosko-charts/commit/06330814a55706266b71c88a62bf98acf8adb647))

# [7.0.0](https://github.com/SocialGouv/kosko-charts/compare/v6.5.0...v7.0.0) (2021-06-30)


* feat(environments)!: GitLab and GitHub environments fusion 🔬 (#577) ([c48453e](https://github.com/SocialGouv/kosko-charts/commit/c48453e62442cb710200d81d264640073b7881f1)), closes [#577](https://github.com/SocialGouv/kosko-charts/issues/577)


### Bug Fixes

* Add github env. ([4c7dd35](https://github.com/SocialGouv/kosko-charts/commit/4c7dd351234ae456cc19773cfaa29c6cb502d699))
* Rebase and fix lint. ([09c1b20](https://github.com/SocialGouv/kosko-charts/commit/09c1b2027eab564da9118bfbf6fddeb3b1b39422))
* Replace manifest by metadata in CIEnv type. ([a34dbb3](https://github.com/SocialGouv/kosko-charts/commit/a34dbb318e1286b91ccc474f065ac1bb39587357))
* Update README. ([4b6f43b](https://github.com/SocialGouv/kosko-charts/commit/4b6f43b81bb0ce5ba027a3933e2eb58f4db7643b))
* Update unit tests snapshots. ([6626308](https://github.com/SocialGouv/kosko-charts/commit/66263083d722c0ccbaeccda9d0593153db3276a6))
* Use common environment in restore-db job. ([a179027](https://github.com/SocialGouv/kosko-charts/commit/a17902702b68a21c3c57e6faacf096437971016b))


### BREAKING CHANGES

* We should now use a common ci environments

```diff
- import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
+ import gitlab from "@socialgouv/kosko-charts/environments";

- const ciEnv = gitlab(process.env);
+ const ciEnv = environments(process.env);
```
* the previous envParams is now inside the ci env as `metadata`

```diff
export interface CIEnv {
  isPreProduction: boolean;
  isProduction: boolean;
  metadata: GlobalEnvironment;
  projectName: string;
  shortSha: string;
}
```



Co-authored-by: Social Groovy Bot <45039513+SocialGroovyBot@users.noreply.github.com>

## [6.5.1-beta.3](https://github.com/SocialGouv/kosko-charts/compare/v6.5.1-beta.2...v6.5.1-beta.3) (2021-06-30)


### Bug Fixes

* Replace manifest by metadata in CIEnv type. ([a34dbb3](https://github.com/SocialGouv/kosko-charts/commit/a34dbb318e1286b91ccc474f065ac1bb39587357))

## [6.5.1-beta.2](https://github.com/SocialGouv/kosko-charts/compare/v6.5.1-beta.1...v6.5.1-beta.2) (2021-06-30)


### Bug Fixes

* Update README. ([4b6f43b](https://github.com/SocialGouv/kosko-charts/commit/4b6f43b81bb0ce5ba027a3933e2eb58f4db7643b))

## [6.5.1-beta.1](https://github.com/SocialGouv/kosko-charts/compare/v6.5.0...v6.5.1-beta.1) (2021-06-30)


### Bug Fixes

* Add github env. ([4c7dd35](https://github.com/SocialGouv/kosko-charts/commit/4c7dd351234ae456cc19773cfaa29c6cb502d699))
* Rebase and fix lint. ([09c1b20](https://github.com/SocialGouv/kosko-charts/commit/09c1b2027eab564da9118bfbf6fddeb3b1b39422))
* Update unit tests snapshots. ([6626308](https://github.com/SocialGouv/kosko-charts/commit/66263083d722c0ccbaeccda9d0593153db3276a6))
* Use common environment in restore-db job. ([a179027](https://github.com/SocialGouv/kosko-charts/commit/a17902702b68a21c3c57e6faacf096437971016b))

# [6.5.0](https://github.com/SocialGouv/kosko-charts/compare/v6.4.2...v6.5.0) (2021-06-30)


### Features

* **azure-storage:** add dynamic fileshare pvc ([#584](https://github.com/SocialGouv/kosko-charts/issues/584)) ([df74344](https://github.com/SocialGouv/kosko-charts/commit/df7434498f3f14622ccacee7e7a7386b322bd6f0))

## [6.4.2](https://github.com/SocialGouv/kosko-charts/compare/v6.4.1...v6.4.2) (2021-06-29)


### Bug Fixes

* **azure-pg:** ensure to use constant pvc-pv naming ([#581](https://github.com/SocialGouv/kosko-charts/issues/581)) ([9364d7a](https://github.com/SocialGouv/kosko-charts/commit/9364d7afa78d617c18acae4fe12282479e92d846))

## [6.4.1](https://github.com/SocialGouv/kosko-charts/compare/v6.4.0...v6.4.1) (2021-06-28)


### Bug Fixes

* **azure-storage:** use env name instead of dynamic application name ([#580](https://github.com/SocialGouv/kosko-charts/issues/580)) ([e62484b](https://github.com/SocialGouv/kosko-charts/commit/e62484bfe546ef7ef985e0b2e7021fab13b0e863))

# [6.4.0](https://github.com/SocialGouv/kosko-charts/compare/v6.3.0...v6.4.0) (2021-06-28)


### Features

* **azure-pg:** make restore db uses azure files pv ([#578](https://github.com/SocialGouv/kosko-charts/issues/578)) ([10d0c45](https://github.com/SocialGouv/kosko-charts/commit/10d0c45661b271b51b749cee90546fdfdc8f8468))

# [6.3.0](https://github.com/SocialGouv/kosko-charts/compare/v6.2.1...v6.3.0) (2021-06-25)


### Features

* **azure-storage:** add project volume ([#573](https://github.com/SocialGouv/kosko-charts/issues/573)) ([059e4a6](https://github.com/SocialGouv/kosko-charts/commit/059e4a6c1698fda6d2bd1ceb48803636cdb68023))

## [6.2.1](https://github.com/SocialGouv/kosko-charts/compare/v6.2.0...v6.2.1) (2021-06-25)


### Bug Fixes

* release ([c05ee11](https://github.com/SocialGouv/kosko-charts/commit/c05ee11645ba2d6ab749e1e5e3ef1178a5655954))

# [6.2.0](https://github.com/SocialGouv/kosko-charts/compare/v6.1.9...v6.2.0) (2021-06-24)


### Features

* **utils:** allow volumes entry on deployment ([#572](https://github.com/SocialGouv/kosko-charts/issues/572)) ([cb088a4](https://github.com/SocialGouv/kosko-charts/commit/cb088a4fe22969fd1ba60bb014e08c88d173c995))

## [6.1.9](https://github.com/SocialGouv/kosko-charts/compare/v6.1.8...v6.1.9) (2021-06-23)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.17.4 ([#571](https://github.com/SocialGouv/kosko-charts/issues/571)) ([593f643](https://github.com/SocialGouv/kosko-charts/commit/593f64332d3f51605f942e88226d4c989fd70450))

## [6.1.8](https://github.com/SocialGouv/kosko-charts/compare/v6.1.7...v6.1.8) (2021-06-17)


### Bug Fixes

* **deps:** update dependency typescript to ^4.3.4 ([#564](https://github.com/SocialGouv/kosko-charts/issues/564)) ([25b0b8d](https://github.com/SocialGouv/kosko-charts/commit/25b0b8df15f79e8a4e93fdcd9201ba357ecb2593))

## [6.1.7](https://github.com/SocialGouv/kosko-charts/compare/v6.1.6...v6.1.7) (2021-06-17)


### Bug Fixes

* **azure-pg:** use public kubernetes-models import ([1562644](https://github.com/SocialGouv/kosko-charts/commit/1562644db8557ff1b0a0a5a0da6fa55a8f1a8a61))
* **deps:** update dependency typescript to ^4.3.3 ([#562](https://github.com/SocialGouv/kosko-charts/issues/562)) ([62cf018](https://github.com/SocialGouv/kosko-charts/commit/62cf0180667d843f2501e2d0254f2e43a16129b7))

## [6.1.6](https://github.com/SocialGouv/kosko-charts/compare/v6.1.5...v6.1.6) (2021-06-15)


### Bug Fixes

* **deps:** update dependency ts-node to v10 ([#559](https://github.com/SocialGouv/kosko-charts/issues/559)) ([8291cf3](https://github.com/SocialGouv/kosko-charts/commit/8291cf37b9e2026a2069d9e85aa266d38b988c1f))

## [6.1.5](https://github.com/SocialGouv/kosko-charts/compare/v6.1.4...v6.1.5) (2021-06-15)


### Bug Fixes

* **deps:** update dependency @types/node to v14.17.3 ([#558](https://github.com/SocialGouv/kosko-charts/issues/558)) ([ac3dca8](https://github.com/SocialGouv/kosko-charts/commit/ac3dca8e78f727633775a5f2445a46c83d7f9b96))

## [6.1.4](https://github.com/SocialGouv/kosko-charts/compare/v6.1.3...v6.1.4) (2021-06-15)


### Bug Fixes

* **deps:** update dependency @kosko/env to v2 ([#510](https://github.com/SocialGouv/kosko-charts/issues/510)) ([05d850b](https://github.com/SocialGouv/kosko-charts/commit/05d850bbd15e9c8d60d583601fd0a6cb813e1ff1))

## [6.1.3](https://github.com/SocialGouv/kosko-charts/compare/v6.1.2...v6.1.3) (2021-06-14)


### Bug Fixes

* **deps:** update kosko monorepo ([#554](https://github.com/SocialGouv/kosko-charts/issues/554)) ([8581685](https://github.com/SocialGouv/kosko-charts/commit/8581685507c6ea2d2533f37838128a11ba9b849b))

## [6.1.2](https://github.com/SocialGouv/kosko-charts/compare/v6.1.1...v6.1.2) (2021-06-14)


### Bug Fixes

* **deps:** update dependency typescript to ^4.3.2 ([#553](https://github.com/SocialGouv/kosko-charts/issues/553)) ([c8e350c](https://github.com/SocialGouv/kosko-charts/commit/c8e350ce04e2cbbe346e5a5de69799eae576e454))

## [6.1.1](https://github.com/SocialGouv/kosko-charts/compare/v6.1.0...v6.1.1) (2021-06-14)


### Bug Fixes

* **deps:** update dependency @sindresorhus/is to ^4.0.1 ([#544](https://github.com/SocialGouv/kosko-charts/issues/544)) ([f955395](https://github.com/SocialGouv/kosko-charts/commit/f9553955216edceb3e94ad2ad7d55de4a5781e4c))

# [6.1.0](https://github.com/SocialGouv/kosko-charts/compare/v6.0.2...v6.1.0) (2021-06-14)


### Bug Fixes

* **deps:** add missing fs-extra ([c491000](https://github.com/SocialGouv/kosko-charts/commit/c49100061bb9c108611e8dcb0bde6a29aa28fa44))
* **deps:** add missing fs-extra ([1e383be](https://github.com/SocialGouv/kosko-charts/commit/1e383be8b2b09da719ecb1ea95bc63a40032b93b))


### Features

* **testing:** run as env prod ([1b52a57](https://github.com/SocialGouv/kosko-charts/commit/1b52a57469897239c6922e22ca1cbb5021863265))

## [6.0.2](https://github.com/SocialGouv/kosko-charts/compare/v6.0.1...v6.0.2) (2021-06-10)


### Bug Fixes

* **gitlab:** all *-dev\d+ env are dev env now ([#536](https://github.com/SocialGouv/kosko-charts/issues/536)) ([f3849d5](https://github.com/SocialGouv/kosko-charts/commit/f3849d5c224e3b71812f4ae9f60fd5ea0ddc339c))

## [6.0.1](https://github.com/SocialGouv/kosko-charts/compare/v6.0.0...v6.0.1) (2021-06-09)


### Bug Fixes

* **deps:** require @kosko/env@2 as peerDependencies ([12ec2f6](https://github.com/SocialGouv/kosko-charts/commit/12ec2f6f216788fc0e4f06b24dde927d80a8a185))

# [6.0.0](https://github.com/SocialGouv/kosko-charts/compare/v5.4.0...v6.0.0) (2021-06-09)


* feat(deps)!: update kosko monorepo (#441) ([619db28](https://github.com/SocialGouv/kosko-charts/commit/619db28235b6d43e64932b8b0ec1ec3204e2a121)), closes [#441](https://github.com/SocialGouv/kosko-charts/issues/441)


### BREAKING CHANGES

* components app `create` functions are now async !

```diff
import { create } from "@socialgouv/kosko-charts/components/hasura";

- export default (): { kind: string }[] => {
-   const manifests = create("hasura", { env })
    // [...]
- }
+ export default async (): Promise<{ kind: string }[]> => {
+   const manifests = await create("hasura", { env })
    // [...]
+ }
```
* the fist args of the `create` function must be an name !

```diff
import { create } from "@socialgouv/kosko-charts/components/hasura";

-const manifests = create({
+const manifests = create("hasura", {
  env,
});
```

Co-authored-by: Renovate Bot <bot@renovateapp.com>
Co-authored-by: Douglas DUTEIL <douglasduteil@gmail.com>

# [5.4.0](https://github.com/SocialGouv/kosko-charts/compare/v5.3.5...v5.4.0) (2021-05-26)


### Features

* Add util to forge ghcr.io registry URLs. ([#525](https://github.com/SocialGouv/kosko-charts/issues/525)) ([161af38](https://github.com/SocialGouv/kosko-charts/commit/161af38b74c377201a5081380125561af83f2cbf))

## [5.3.5](https://github.com/SocialGouv/kosko-charts/compare/v5.3.4...v5.3.5) (2021-05-10)


### Bug Fixes

* **redis:** bump version ([#522](https://github.com/SocialGouv/kosko-charts/issues/522)) ([eedeba6](https://github.com/SocialGouv/kosko-charts/commit/eedeba616ffb80bfdec9753cb1c3cd33a994df41))

## [5.3.4](https://github.com/SocialGouv/kosko-charts/compare/v5.3.3...v5.3.4) (2021-05-06)


### Bug Fixes

* use ghcr.io container registry ([#520](https://github.com/SocialGouv/kosko-charts/issues/520)) ([26401bf](https://github.com/SocialGouv/kosko-charts/commit/26401bfa9056067997dd99d4a48a0c3b0f784e78))

## [5.3.3](https://github.com/SocialGouv/kosko-charts/compare/v5.3.2...v5.3.3) (2021-04-15)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.41 ([#516](https://github.com/SocialGouv/kosko-charts/issues/516)) ([672f253](https://github.com/SocialGouv/kosko-charts/commit/672f25346abdae7235bfd04d9383aede225b4288))

## [5.3.2](https://github.com/SocialGouv/kosko-charts/compare/v5.3.1...v5.3.2) (2021-04-15)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.40 ([#514](https://github.com/SocialGouv/kosko-charts/issues/514)) ([8240de6](https://github.com/SocialGouv/kosko-charts/commit/8240de6f0cee4534c65f99f192d569e18498bd39))

## [5.3.1](https://github.com/SocialGouv/kosko-charts/compare/v5.3.0...v5.3.1) (2021-04-15)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.39 ([#512](https://github.com/SocialGouv/kosko-charts/issues/512)) ([387c02e](https://github.com/SocialGouv/kosko-charts/commit/387c02e5ce2af56191309832dd621768cd1d4487))

# [5.3.0](https://github.com/SocialGouv/kosko-charts/compare/v5.2.0...v5.3.0) (2021-04-10)


### Bug Fixes

* **create-db:** sert backoffLimit to 5 ([#495](https://github.com/SocialGouv/kosko-charts/issues/495)) ([c8957d7](https://github.com/SocialGouv/kosko-charts/commit/c8957d7bdbe93ac108015a2bfc23dc0766530eb9))


### Features

* **pg-restore:** exclude audit schema ([#497](https://github.com/SocialGouv/kosko-charts/issues/497)) ([b9a9566](https://github.com/SocialGouv/kosko-charts/commit/b9a9566928e93a44b3d89e8b56cffa97bca0fb41))

# [5.2.0](https://github.com/SocialGouv/kosko-charts/compare/v5.1.4...v5.2.0) (2021-04-09)


### Features

* add components.netpol ([#507](https://github.com/SocialGouv/kosko-charts/issues/507)) ([f46970a](https://github.com/SocialGouv/kosko-charts/commit/f46970aaf065c49d16a02c630e72cc80291768b9))

## [5.1.4](https://github.com/SocialGouv/kosko-charts/compare/v5.1.3...v5.1.4) (2021-04-09)


### Bug Fixes

* **template:** use harbor ([#505](https://github.com/SocialGouv/kosko-charts/issues/505)) ([dba7513](https://github.com/SocialGouv/kosko-charts/commit/dba75130cda7900e808e95aea3ce1b692341fa9e))

## [5.1.3](https://github.com/SocialGouv/kosko-charts/compare/v5.1.2...v5.1.3) (2021-04-07)


### Bug Fixes

* **deps:** update dependency typescript to ^4.2.4 ([#502](https://github.com/SocialGouv/kosko-charts/issues/502)) ([3500780](https://github.com/SocialGouv/kosko-charts/commit/3500780b0fca9e5619badb45d8404c0cc8d1cf4e))

## [5.1.2](https://github.com/SocialGouv/kosko-charts/compare/v5.1.1...v5.1.2) (2021-03-27)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.37 ([#491](https://github.com/SocialGouv/kosko-charts/issues/491)) ([711796f](https://github.com/SocialGouv/kosko-charts/commit/711796f5dfca77370aaad6f46b4890ba77ef1894))

## [5.1.1](https://github.com/SocialGouv/kosko-charts/compare/v5.1.0...v5.1.1) (2021-03-25)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.36 ([#486](https://github.com/SocialGouv/kosko-charts/issues/486)) ([a5dd535](https://github.com/SocialGouv/kosko-charts/commit/a5dd5352eb54a2bbf0b835722754268883262f5c))

# [5.1.0](https://github.com/SocialGouv/kosko-charts/compare/v5.0.0...v5.1.0) (2021-03-24)


### Features

* **autoscale:** add autoscale component ([#481](https://github.com/SocialGouv/kosko-charts/issues/481)) ([f54faa2](https://github.com/SocialGouv/kosko-charts/commit/f54faa2cb93b615b760784b7ae05850abaaed301))

# [5.0.0](https://github.com/SocialGouv/kosko-charts/compare/v4.10.3...v5.0.0) (2021-03-19)


* docs!: @kosko/cli@>=1.1.0 is broken :( ([c35ffa1](https://github.com/SocialGouv/kosko-charts/commit/c35ffa13439c3a18bd53603e33d4da141b68713a))
* feat(pkg)!: make all kosko dependencies peerDependencies (#477) ([3022609](https://github.com/SocialGouv/kosko-charts/commit/30226095ba1b5841a72ea1f50867adf1e41866e5)), closes [#477](https://github.com/SocialGouv/kosko-charts/issues/477)


### Bug Fixes

* **release:** husky conflict with npm during releases ([19f851a](https://github.com/SocialGouv/kosko-charts/commit/19f851a14b28d83686775aaf1a2adf1b264ab68c))


### BREAKING CHANGES

* One must add a manual resolution for @kosko/cli

```json title="package.json"
{
 "resolutions": {
    "@kosko/cli": "1.1.0"
  },
}
```
* You will now need to manually install your kosko related dependencies !

As `kosko`, `@kosko/env`, etc... can have breaking version, we chose to put the versioning responsibility on the user side.

# [5.0.0-alpha.2](https://github.com/SocialGouv/kosko-charts/compare/v5.0.0-alpha.1...v5.0.0-alpha.2) (2021-03-19)


### Bug Fixes

* **release:** husky conflict with npm during releases ([19f851a](https://github.com/SocialGouv/kosko-charts/commit/19f851a14b28d83686775aaf1a2adf1b264ab68c))

# [5.0.0-alpha.1](https://github.com/SocialGouv/kosko-charts/compare/v4.10.3...v5.0.0-alpha.1) (2021-03-19)


* feat(pkg)!: make all kosko dependencies peerDependencies (#477) ([3022609](https://github.com/SocialGouv/kosko-charts/commit/30226095ba1b5841a72ea1f50867adf1e41866e5)), closes [#477](https://github.com/SocialGouv/kosko-charts/issues/477)


### BREAKING CHANGES

* You will now need to manually install your kosko related dependencies !

As `kosko`, `@kosko/env`, etc... can have breaking version, we chose to put the versioning responsibility on the user side.

# [5.0.0-alpha.1](https://github.com/SocialGouv/kosko-charts/compare/v4.10.3...v5.0.0-alpha.1) (2021-03-19)


* feat(pkg)!: make all kosko dependencies peerDependencies (#477) ([3022609](https://github.com/SocialGouv/kosko-charts/commit/30226095ba1b5841a72ea1f50867adf1e41866e5)), closes [#477](https://github.com/SocialGouv/kosko-charts/issues/477)


### BREAKING CHANGES

* You will now need to manually install your kosko related dependencies !

As `kosko`, `@kosko/env`, etc... can have breaking version, we chose to put the versioning responsibility on the user side.

## [4.10.3](https://github.com/SocialGouv/kosko-charts/compare/v4.10.2...v4.10.3) (2021-03-16)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.35 ([#470](https://github.com/SocialGouv/kosko-charts/issues/470)) ([6722858](https://github.com/SocialGouv/kosko-charts/commit/6722858c808b563a13104df5e33738dbd8a5cee7))

## [4.10.2](https://github.com/SocialGouv/kosko-charts/compare/v4.10.1...v4.10.2) (2021-03-12)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.34 ([#463](https://github.com/SocialGouv/kosko-charts/issues/463)) ([5345766](https://github.com/SocialGouv/kosko-charts/commit/5345766290a7ddebc61027ef54d5391b62182c3d))

## [4.10.1](https://github.com/SocialGouv/kosko-charts/compare/v4.10.0...v4.10.1) (2021-03-09)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.33 ([#460](https://github.com/SocialGouv/kosko-charts/issues/460)) ([5b099ec](https://github.com/SocialGouv/kosko-charts/commit/5b099ec6852be639b44207827f5c4592fd2de69c))

# [4.10.0](https://github.com/SocialGouv/kosko-charts/compare/v4.9.5...v4.10.0) (2021-03-09)


### Features

* utils.addEnvs ([#458](https://github.com/SocialGouv/kosko-charts/issues/458)) ([96b231c](https://github.com/SocialGouv/kosko-charts/commit/96b231c3ff95c04bb6245543767014b75795ad11))

## [4.9.5](https://github.com/SocialGouv/kosko-charts/compare/v4.9.4...v4.9.5) (2021-03-07)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.32 ([#457](https://github.com/SocialGouv/kosko-charts/issues/457)) ([1b125d8](https://github.com/SocialGouv/kosko-charts/commit/1b125d81fa7b57ee44365bcb84e4cf08f1354c6d))

## [4.9.4](https://github.com/SocialGouv/kosko-charts/compare/v4.9.3...v4.9.4) (2021-03-05)


### Bug Fixes

* **deps:** update dependency typescript to ^4.2.3 ([#455](https://github.com/SocialGouv/kosko-charts/issues/455)) ([650fa15](https://github.com/SocialGouv/kosko-charts/commit/650fa156bcce80b46cbba2243b53ab0d3017c26e))

## [4.9.3](https://github.com/SocialGouv/kosko-charts/compare/v4.9.2...v4.9.3) (2021-03-04)


### Bug Fixes

* **app:** handle empty subdomain config ([#453](https://github.com/SocialGouv/kosko-charts/issues/453)) ([2033f88](https://github.com/SocialGouv/kosko-charts/commit/2033f88661a2b8f8c9364677d01f64cb255f7660))

## [4.9.2](https://github.com/SocialGouv/kosko-charts/compare/v4.9.1...v4.9.2) (2021-02-26)


### Bug Fixes

* **subdomain:** only override when env=prod ([#439](https://github.com/SocialGouv/kosko-charts/issues/439)) ([bb3775c](https://github.com/SocialGouv/kosko-charts/commit/bb3775c2f9268b26ceef4a557e4d90627783c432))

## [4.9.1](https://github.com/SocialGouv/kosko-charts/compare/v4.9.0...v4.9.1) (2021-02-24)


### Bug Fixes

* **deps:** update dependency typescript to ^4.2.2 ([#436](https://github.com/SocialGouv/kosko-charts/issues/436)) ([9550ce0](https://github.com/SocialGouv/kosko-charts/commit/9550ce056f727a8644dbbc2e681c3cec44f992da))

# [4.9.0](https://github.com/SocialGouv/kosko-charts/compare/v4.8.3...v4.9.0) (2021-02-23)


### Features

* **deps:** update socialgouv/docker images docker tags to v4.6.0 ([#395](https://github.com/SocialGouv/kosko-charts/issues/395)) ([f12f2f9](https://github.com/SocialGouv/kosko-charts/commit/f12f2f93f5d76a1d84aba65a2f33147202a4e4f9))

## [4.8.3](https://github.com/SocialGouv/kosko-charts/compare/v4.8.2...v4.8.3) (2021-02-22)


### Bug Fixes

* **deps:** update kosko monorepo to ^1.2.0 ([#428](https://github.com/SocialGouv/kosko-charts/issues/428)) ([87c407c](https://github.com/SocialGouv/kosko-charts/commit/87c407c2af58fe13641bba8a5485b66e409890f5))

## [4.8.2](https://github.com/SocialGouv/kosko-charts/compare/v4.8.1...v4.8.2) (2021-02-19)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.31 ([#424](https://github.com/SocialGouv/kosko-charts/issues/424)) ([f7dfdc8](https://github.com/SocialGouv/kosko-charts/commit/f7dfdc8160142f8deb2e4bcff895c5ec5d4bcadf))

## [4.8.1](https://github.com/SocialGouv/kosko-charts/compare/v4.8.0...v4.8.1) (2021-02-19)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.30 ([#420](https://github.com/SocialGouv/kosko-charts/issues/420)) ([9da9233](https://github.com/SocialGouv/kosko-charts/commit/9da9233ec5f28777c6df6df5961fbcffb9a10218))

# [4.8.0](https://github.com/SocialGouv/kosko-charts/compare/v4.7.11...v4.8.0) (2021-02-17)


### Features

* **deps:** update registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-http docker tag to v4 ([#416](https://github.com/SocialGouv/kosko-charts/issues/416)) ([b702ed1](https://github.com/SocialGouv/kosko-charts/commit/b702ed1b4b3929eb769cfb3eac045a815ff3ec99))

## [4.7.11](https://github.com/SocialGouv/kosko-charts/compare/v4.7.10...v4.7.11) (2021-02-14)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.28 ([#413](https://github.com/SocialGouv/kosko-charts/issues/413)) ([d2b738c](https://github.com/SocialGouv/kosko-charts/commit/d2b738ca1eb7536733f7b025e90053509243f511))

## [4.7.10](https://github.com/SocialGouv/kosko-charts/compare/v4.7.9...v4.7.10) (2021-02-12)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.27 ([#409](https://github.com/SocialGouv/kosko-charts/issues/409)) ([16d4d6a](https://github.com/SocialGouv/kosko-charts/commit/16d4d6a61d332deb5cab6dcb2e7ef347a7264c05))

## [4.7.9](https://github.com/SocialGouv/kosko-charts/compare/v4.7.8...v4.7.9) (2021-02-12)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.26 ([#407](https://github.com/SocialGouv/kosko-charts/issues/407)) ([47819fa](https://github.com/SocialGouv/kosko-charts/commit/47819fa8f66c25aecc898be3961779b8730f88e0))

## [4.7.8](https://github.com/SocialGouv/kosko-charts/compare/v4.7.7...v4.7.8) (2021-02-10)


### Bug Fixes

* **deps:** update dependency typescript to ^4.1.5 ([#404](https://github.com/SocialGouv/kosko-charts/issues/404)) ([a11f25b](https://github.com/SocialGouv/kosko-charts/commit/a11f25b56828d12f8037a1564329daa5f93df452))

## [4.7.7](https://github.com/SocialGouv/kosko-charts/compare/v4.7.6...v4.7.7) (2021-02-09)


### Bug Fixes

* **deps:** update dependency typescript to ^4.1.4 ([#403](https://github.com/SocialGouv/kosko-charts/issues/403)) ([a054fe5](https://github.com/SocialGouv/kosko-charts/commit/a054fe53b22888365afad8385bc355acbe1cd994))

## [4.7.6](https://github.com/SocialGouv/kosko-charts/compare/v4.7.5...v4.7.6) (2021-02-07)


### Bug Fixes

* **deps:** update kosko monorepo to ^1.1.0 ([#400](https://github.com/SocialGouv/kosko-charts/issues/400)) ([3dd16df](https://github.com/SocialGouv/kosko-charts/commit/3dd16dff38d277c806b5bb73f56eafaef0ed8f4d))

## [4.7.5](https://github.com/SocialGouv/kosko-charts/compare/v4.7.4...v4.7.5) (2021-02-05)


### Bug Fixes

* **restore:** enable multiple calls to job ([#394](https://github.com/SocialGouv/kosko-charts/issues/394)) ([d773932](https://github.com/SocialGouv/kosko-charts/commit/d773932e1262c1b71562851cdfc19b959d7bf27c))

## [4.7.4](https://github.com/SocialGouv/kosko-charts/compare/v4.7.3...v4.7.4) (2021-02-04)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.25 ([#393](https://github.com/SocialGouv/kosko-charts/issues/393)) ([58deff1](https://github.com/SocialGouv/kosko-charts/commit/58deff165dc31b4c78eabe8a3e5fa65c1f2b1050))

## [4.7.3](https://github.com/SocialGouv/kosko-charts/compare/v4.7.2...v4.7.3) (2021-02-04)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.24 ([#392](https://github.com/SocialGouv/kosko-charts/issues/392)) ([f3e55e8](https://github.com/SocialGouv/kosko-charts/commit/f3e55e887b2f61d57d28ff480e2e80e7998c193c))

## [4.7.2](https://github.com/SocialGouv/kosko-charts/compare/v4.7.1...v4.7.2) (2021-02-03)


### Bug Fixes

* fix wait user on restore initContainer ([#391](https://github.com/SocialGouv/kosko-charts/issues/391)) ([ee29548](https://github.com/SocialGouv/kosko-charts/commit/ee2954867e78c23107438e71e2400886ae21d481))

## [4.7.1](https://github.com/SocialGouv/kosko-charts/compare/v4.7.0...v4.7.1) (2021-01-31)


### Bug Fixes

* **deps:** update kosko monorepo to ^1.0.3 ([#387](https://github.com/SocialGouv/kosko-charts/issues/387)) ([946b531](https://github.com/SocialGouv/kosko-charts/commit/946b531dd69f02ae37a0cd1b3ded55fd2f75d912))

# [4.7.0](https://github.com/SocialGouv/kosko-charts/compare/v4.6.1...v4.7.0) (2021-01-28)


### Bug Fixes

* **deps:** update kosko monorepo ([#362](https://github.com/SocialGouv/kosko-charts/issues/362)) ([10a9d0a](https://github.com/SocialGouv/kosko-charts/commit/10a9d0a4f869174a4311d572c32f7086e2dbde37))


### Features

* **restore-db-job:** add post-restore script ([#359](https://github.com/SocialGouv/kosko-charts/issues/359)) ([69c2643](https://github.com/SocialGouv/kosko-charts/commit/69c264367ff9ecbb8b16cd1a60fb525b6359a7a7))

## [4.6.1](https://github.com/SocialGouv/kosko-charts/compare/v4.6.0...v4.6.1) (2021-01-26)


### Bug Fixes

* **jobs:** add ttlSecondsAfterFinished ([#383](https://github.com/SocialGouv/kosko-charts/issues/383)) ([a2509b2](https://github.com/SocialGouv/kosko-charts/commit/a2509b234ee36213bb754083bd56feaa652364f1))

# [4.6.0](https://github.com/SocialGouv/kosko-charts/compare/v4.5.2...v4.6.0) (2021-01-25)


### Features

* **app:** add kapp annotations by default ([#381](https://github.com/SocialGouv/kosko-charts/issues/381)) ([b249eb0](https://github.com/SocialGouv/kosko-charts/commit/b249eb05430da842554b0a51998041181c275a1c))

## [4.5.2](https://github.com/SocialGouv/kosko-charts/compare/v4.5.1...v4.5.2) (2021-01-20)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.22 ([#372](https://github.com/SocialGouv/kosko-charts/issues/372)) ([ea23085](https://github.com/SocialGouv/kosko-charts/commit/ea23085791bca129a6b8dbe5d5168931408bcb2e))

## [4.5.1](https://github.com/SocialGouv/kosko-charts/compare/v4.5.0...v4.5.1) (2021-01-19)


### Bug Fixes

* **waitForPostgres:** use renovate friendly version ([#361](https://github.com/SocialGouv/kosko-charts/issues/361)) ([95e99ad](https://github.com/SocialGouv/kosko-charts/commit/95e99adc630bff94d93eb12c2ed2140cf275572f))

# [4.5.0](https://github.com/SocialGouv/kosko-charts/compare/v4.4.1...v4.5.0) (2021-01-19)


### Features

* add utils.getHarborImagePath ([#371](https://github.com/SocialGouv/kosko-charts/issues/371)) ([3184dc6](https://github.com/SocialGouv/kosko-charts/commit/3184dc64a6a9296056d583ac8564b0f6ab8e87c1))

## [4.4.1](https://github.com/SocialGouv/kosko-charts/compare/v4.4.0...v4.4.1) (2021-01-14)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.21 ([#366](https://github.com/SocialGouv/kosko-charts/issues/366)) ([b898858](https://github.com/SocialGouv/kosko-charts/commit/b89885801c821ee59dd257c226db6cf9e1a6ddc6))

# [4.4.0](https://github.com/SocialGouv/kosko-charts/compare/v4.3.0...v4.4.0) (2021-01-11)


### Features

* utils. importYamlFolder : load external yamls ([#328](https://github.com/SocialGouv/kosko-charts/issues/328)) ([5c5051b](https://github.com/SocialGouv/kosko-charts/commit/5c5051b7566ab402723ec080c4a1f8804e40aa47))

# [4.3.0](https://github.com/SocialGouv/kosko-charts/compare/v4.2.2...v4.3.0) (2021-01-07)


### Features

* add metabase component ([#351](https://github.com/SocialGouv/kosko-charts/issues/351)) ([5778efe](https://github.com/SocialGouv/kosko-charts/commit/5778efe5fe3018b81bca9dab21d5a14f67e5736d))

## [4.2.2](https://github.com/SocialGouv/kosko-charts/compare/v4.2.1...v4.2.2) (2021-01-05)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.20 ([#357](https://github.com/SocialGouv/kosko-charts/issues/357)) ([aab833a](https://github.com/SocialGouv/kosko-charts/commit/aab833a4a8023e045ffb960bc5de437540b5504a))

## [4.2.1](https://github.com/SocialGouv/kosko-charts/compare/v4.2.0...v4.2.1) (2021-01-01)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.19 ([#355](https://github.com/SocialGouv/kosko-charts/issues/355)) ([215017a](https://github.com/SocialGouv/kosko-charts/commit/215017a945f6a62b844f8ca18f0f078f25a86698))

# [4.2.0](https://github.com/SocialGouv/kosko-charts/compare/v4.1.5...v4.2.0) (2020-12-31)


### Features

* add utils/addInitContainerCommand ([#352](https://github.com/SocialGouv/kosko-charts/issues/352)) ([af9611b](https://github.com/SocialGouv/kosko-charts/commit/af9611bb1772a57de7bbd91cd08986df7ff52079))

## [4.1.5](https://github.com/SocialGouv/kosko-charts/compare/v4.1.4...v4.1.5) (2020-12-30)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.17 ([#353](https://github.com/SocialGouv/kosko-charts/issues/353)) ([a86c83f](https://github.com/SocialGouv/kosko-charts/commit/a86c83f910321a896b19e5ed4ace4c2ca861e64d))

## [4.1.4](https://github.com/SocialGouv/kosko-charts/compare/v4.1.3...v4.1.4) (2020-12-23)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.16 ([#350](https://github.com/SocialGouv/kosko-charts/issues/350)) ([213b810](https://github.com/SocialGouv/kosko-charts/commit/213b810552d7a55acb0143ab820710ecdaa51cdc))

## [4.1.3](https://github.com/SocialGouv/kosko-charts/compare/v4.1.2...v4.1.3) (2020-12-17)


### Bug Fixes

* upgrade docker/azure-db ([#343](https://github.com/SocialGouv/kosko-charts/issues/343)) ([709e08a](https://github.com/SocialGouv/kosko-charts/commit/709e08aa2a271d3deec880b88e99f804f121ec22))


### Reverts

* **gitlab:** remove -dev2 suffix on application name ([#344](https://github.com/SocialGouv/kosko-charts/issues/344)) ([0405496](https://github.com/SocialGouv/kosko-charts/commit/0405496c3453665fab6e1333372aaf5719c1af8f))
* **renovate:** multi registryUrls on docker datasource ([7e73a93](https://github.com/SocialGouv/kosko-charts/commit/7e73a93047b8b658c3cdc56d2334a22a4a798ccd))

## [4.1.2](https://github.com/SocialGouv/kosko-charts/compare/v4.1.1...v4.1.2) (2020-12-15)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.14 ([#341](https://github.com/SocialGouv/kosko-charts/issues/341)) ([f452ec0](https://github.com/SocialGouv/kosko-charts/commit/f452ec09c45607b82251929922e14458751c18f2))

## [4.1.1](https://github.com/SocialGouv/kosko-charts/compare/v4.1.0...v4.1.1) (2020-12-15)


### Bug Fixes

* **deps:** update kosko monorepo to ^1.0.2 ([#339](https://github.com/SocialGouv/kosko-charts/issues/339)) ([13eb56d](https://github.com/SocialGouv/kosko-charts/commit/13eb56d61f38caf628d92f4e51e73c15069d5e23))

# [4.1.0](https://github.com/SocialGouv/kosko-charts/compare/v4.0.5...v4.1.0) (2020-12-14)


### Features

* **azure-storage:** restore container and DB ([#324](https://github.com/SocialGouv/kosko-charts/issues/324)) ([4b0afa9](https://github.com/SocialGouv/kosko-charts/commit/4b0afa92334fd4b858a125ca915308f2706646c3))

## [4.0.5](https://github.com/SocialGouv/kosko-charts/compare/v4.0.4...v4.0.5) (2020-12-12)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.13 ([#336](https://github.com/SocialGouv/kosko-charts/issues/336)) ([f247f36](https://github.com/SocialGouv/kosko-charts/commit/f247f36b7488a65f2efcb7bd976a1a4484b61d53))

## [4.0.4](https://github.com/SocialGouv/kosko-charts/compare/v4.0.3...v4.0.4) (2020-12-12)


### Bug Fixes

* **deps:** update kosko monorepo to v1 ([#334](https://github.com/SocialGouv/kosko-charts/issues/334)) ([fa5c5a2](https://github.com/SocialGouv/kosko-charts/commit/fa5c5a2402331b0ba296397684db027d89b0da8c))

## [4.0.3](https://github.com/SocialGouv/kosko-charts/compare/v4.0.2...v4.0.3) (2020-12-11)


### Bug Fixes

* **deps:** update dependency typescript to ^4.1.3 ([#335](https://github.com/SocialGouv/kosko-charts/issues/335)) ([a2eaf2c](https://github.com/SocialGouv/kosko-charts/commit/a2eaf2c3bc49b34b7d9b2dbb18c1a64f040dbad2))

## [4.0.2](https://github.com/SocialGouv/kosko-charts/compare/v4.0.1...v4.0.2) (2020-12-11)


### Bug Fixes

* **deps:** update dependency @types/node to ^14.14.12 ([#332](https://github.com/SocialGouv/kosko-charts/issues/332)) ([8fc0998](https://github.com/SocialGouv/kosko-charts/commit/8fc0998e49db95c3bb1fdb724026980a3c6c505b))

## [4.0.1](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0...v4.0.1) (2020-12-11)


### Bug Fixes

* **deps:** update dependency kubernetes-models to ^1.0.1 ([#333](https://github.com/SocialGouv/kosko-charts/issues/333)) ([093de52](https://github.com/SocialGouv/kosko-charts/commit/093de52a931c93ad78518b824b8933249c5abffc))

# [4.0.0](https://github.com/SocialGouv/kosko-charts/compare/v3.4.0...v4.0.0) (2020-12-11)


### Bug Fixes

* **create-db:** create-db job is back in project namespace with kubed ([#312](https://github.com/SocialGouv/kosko-charts/issues/312)) ([29337a7](https://github.com/SocialGouv/kosko-charts/commit/29337a7426723cadf0f1be90b737baae789adbd1))
* **pkg:** add missing testing files ([a2928b9](https://github.com/SocialGouv/kosko-charts/commit/a2928b96ab722ca294fbe0f1a5631e2add3b476d))
* **testing:** add mystic haste config, allow tests from node_modules ([b6709d8](https://github.com/SocialGouv/kosko-charts/commit/b6709d8ad5c8b9cca2cc40daef47567c07be2723))
* **testing:** do not try to load unknown env if not defined ([8c1345f](https://github.com/SocialGouv/kosko-charts/commit/8c1345f8e41091933dbf01da3170c72864d3dd4c))
* **testing:** remove mystic haste config ([2d47559](https://github.com/SocialGouv/kosko-charts/commit/2d4755950fdc619638423119367be4716e0607d6))
* **testing:** try running kosko from npx no install ([05cd088](https://github.com/SocialGouv/kosko-charts/commit/05cd088ff8f716a116f19ac0dec470c5fca3c927))
* **utils:** explicite utils dependencies ([5b0596e](https://github.com/SocialGouv/kosko-charts/commit/5b0596e7fbfe75b4b333b1ced3fd380a4e09c8ca))
* **utils:** wrap the merge utils function ([915ce0c](https://github.com/SocialGouv/kosko-charts/commit/915ce0caae55d743b3e6f47d77b7c8adc3e4aaa6))
* fix config overrides ([#317](https://github.com/SocialGouv/kosko-charts/issues/317)) ([dfd25c7](https://github.com/SocialGouv/kosko-charts/commit/dfd25c789d3ec6b84fd6d61d937abee3a2fbdd1b))
* force path version ([7fa418a](https://github.com/SocialGouv/kosko-charts/commit/7fa418a3dc6b38b680f30df18026dfcef15a39e3))
* rename file ([1d8593f](https://github.com/SocialGouv/kosko-charts/commit/1d8593ff5e68de35249c367847dd675e350d9dd9))
* **utils:** loadYaml can return undefined too ([6f1a815](https://github.com/SocialGouv/kosko-charts/commit/6f1a815151de72c8b146059fabf4b49bdcbb4066))


### Features

* **components:** change envParams precedence ([a0a5b56](https://github.com/SocialGouv/kosko-charts/commit/a0a5b560be1f82c32297315aaccca759dfbf6e56))
* **gitlab:** remove -dev2 suffix on application name ([5e99bb0](https://github.com/SocialGouv/kosko-charts/commit/5e99bb056c50288bfac3ab2edeb17db21e7650cb))
* **namespace:** add azure-pg-admin-user label ([#309](https://github.com/SocialGouv/kosko-charts/issues/309)) ([fe7aa12](https://github.com/SocialGouv/kosko-charts/commit/fe7aa12d3617d297888d4bed69687b3fc70ebc9c))
* **template:** add dummy pg component ([66b5565](https://github.com/SocialGouv/kosko-charts/commit/66b5565776658ad15f53473269f8e36e3af573f8))
* **template:** add testing template ([8659465](https://github.com/SocialGouv/kosko-charts/commit/8659465717ea68b6905d60f2f4e02b3a7c11a53c))
* **templates:** rename .gitlab.env to .gitlab-ci.env ([#310](https://github.com/SocialGouv/kosko-charts/issues/310)) ([5d53ef4](https://github.com/SocialGouv/kosko-charts/commit/5d53ef455212fb4ddf6de0376719b7d5dde050b3))
* **testing:** add extra kosko args ([04f8336](https://github.com/SocialGouv/kosko-charts/commit/04f83365828550358caf19b6e677fe40438149ad))
* **testing:** add gitlab.env faker ([#323](https://github.com/SocialGouv/kosko-charts/issues/323)) ([36d3ddc](https://github.com/SocialGouv/kosko-charts/commit/36d3ddc0693939746d0bbb17ad317f1752722acd))
* **testing:** add testing helper config ([86dbd17](https://github.com/SocialGouv/kosko-charts/commit/86dbd17a679427d64c47f6b96926ae1467bf55c1))
* **utils:** add @kosko/env/dist/paths.js wrapper ([11fb2ed](https://github.com/SocialGouv/kosko-charts/commit/11fb2ed1b02c808593d16b18b78742af6f20d502))
* **utils:** add @kosko/env/dist/paths.js wrapper (2) ([b8bf057](https://github.com/SocialGouv/kosko-charts/commit/b8bf05754100119faa0c4f1a52bc2d6a077ae4fb))


### Reverts

* downgrade of @kosko/env ([4bbaf6c](https://github.com/SocialGouv/kosko-charts/commit/4bbaf6ceb7ec81c2e05ade2c3f823b26724afca5))


* refactor(components)!: remove io-ts from pg-secret (#238) ([1f8d1ab](https://github.com/SocialGouv/kosko-charts/commit/1f8d1ab924da2ba5fc163bfd1ac32819980205e9)), closes [#238](https://github.com/SocialGouv/kosko-charts/issues/238)
* refactor(environments)!: remove io-ts from gitlab env (#235) ([e955437](https://github.com/SocialGouv/kosko-charts/commit/e955437e5711ef5987c672c93b548fcd125b414c)), closes [#235](https://github.com/SocialGouv/kosko-charts/issues/235)
* refactor(component)!: move createNamespace to components/ (#231) ([fb4e4e0](https://github.com/SocialGouv/kosko-charts/commit/fb4e4e0f95c93cd86d353838e0f0088fa3476ac6)), closes [#231](https://github.com/SocialGouv/kosko-charts/issues/231)


### BREAKING CHANGES

* **templates:** You will need to rename your env file... sorry
* **components:** The local config is now the lowers in the priority

We merge the params from

1. local app components params
1. the defined config in the components folder
1. the defined config in the environement folder
1. the process env
* might break empty string pg secret generation
* might impact all component at runtime
* the namespace is now created through import { createNamespace } from "@socialgouv/kosko-charts/components/namespace"

```diff
- import { createNamespace } from "@socialgouv/kosko-charts/utils/createNamespace";
+ import { createNamespace } from "@socialgouv/kosko-charts/components/namespace";
```

# [4.0.0-alpha.17](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.16...v4.0.0-alpha.17) (2020-12-11)


### Features

* **gitlab:** remove -dev2 suffix on application name ([5e99bb0](https://github.com/SocialGouv/kosko-charts/commit/5e99bb056c50288bfac3ab2edeb17db21e7650cb))

# [4.0.0-alpha.16](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.15...v4.0.0-alpha.16) (2020-12-11)


### Features

* **template:** add testing template ([8659465](https://github.com/SocialGouv/kosko-charts/commit/8659465717ea68b6905d60f2f4e02b3a7c11a53c))

# [4.0.0-alpha.15](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.14...v4.0.0-alpha.15) (2020-12-09)


### Bug Fixes

* **utils:** wrap the merge utils function ([915ce0c](https://github.com/SocialGouv/kosko-charts/commit/915ce0caae55d743b3e6f47d77b7c8adc3e4aaa6))

# [4.0.0-alpha.14](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.13...v4.0.0-alpha.14) (2020-12-09)


### Bug Fixes

* **utils:** explicite utils dependencies ([5b0596e](https://github.com/SocialGouv/kosko-charts/commit/5b0596e7fbfe75b4b333b1ced3fd380a4e09c8ca))

# [4.0.0-alpha.13](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.12...v4.0.0-alpha.13) (2020-12-09)


### Bug Fixes

* fix config overrides ([#317](https://github.com/SocialGouv/kosko-charts/issues/317)) ([dfd25c7](https://github.com/SocialGouv/kosko-charts/commit/dfd25c789d3ec6b84fd6d61d937abee3a2fbdd1b))

# [4.0.0-alpha.12](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.11...v4.0.0-alpha.12) (2020-12-09)


### Features

* **testing:** add gitlab.env faker ([#323](https://github.com/SocialGouv/kosko-charts/issues/323)) ([36d3ddc](https://github.com/SocialGouv/kosko-charts/commit/36d3ddc0693939746d0bbb17ad317f1752722acd))

# [4.0.0-alpha.11](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.10...v4.0.0-alpha.11) (2020-12-04)


### Bug Fixes

* **create-db:** create-db job is back in project namespace with kubed ([#312](https://github.com/SocialGouv/kosko-charts/issues/312)) ([29337a7](https://github.com/SocialGouv/kosko-charts/commit/29337a7426723cadf0f1be90b737baae789adbd1))


### Features

* **azure-pg:** add uuid-ossp extension on create ([#280](https://github.com/SocialGouv/kosko-charts/issues/280)) ([e65eae9](https://github.com/SocialGouv/kosko-charts/commit/e65eae96313440d206dfadc86c5bd9bf82345461))

# [4.0.0-alpha.10](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.9...v4.0.0-alpha.10) (2020-12-04)


### Bug Fixes

* **azure-db:** upgrade create-db docker image ([#311](https://github.com/SocialGouv/kosko-charts/issues/311)) ([c49aa89](https://github.com/SocialGouv/kosko-charts/commit/c49aa89bc495632fdcf240862e3b4cb5e90cd0d2))

# [3.4.0](https://github.com/SocialGouv/kosko-charts/compare/v3.3.1...v3.4.0) (2020-12-04)


### Features

* **utils:** add wait for http ([#281](https://github.com/SocialGouv/kosko-charts/issues/281)) ([2a46485](https://github.com/SocialGouv/kosko-charts/commit/2a464857df95db17aa7655eef7ddb9b8609112e7))
* **azure-pg:** add uuid-ossp extension on create ([#280](https://github.com/SocialGouv/kosko-charts/issues/280)) ([e65eae9](https://github.com/SocialGouv/kosko-charts/commit/e65eae96313440d206dfadc86c5bd9bf82345461))

## [3.3.1](https://github.com/SocialGouv/kosko-charts/compare/v3.3.0...v3.3.1) (2020-12-04)


### Bug Fixes

* **azure-db:** upgrade create-db docker image ([#311](https://github.com/SocialGouv/kosko-charts/issues/311)) ([c49aa89](https://github.com/SocialGouv/kosko-charts/commit/c49aa89bc495632fdcf240862e3b4cb5e90cd0d2))

# [3.3.0](https://github.com/SocialGouv/kosko-charts/compare/v3.2.5...v3.3.0) (2020-12-04)

* **utils:** add wait for http ([#281](https://github.com/SocialGouv/kosko-charts/issues/281)) ([2a46485](https://github.com/SocialGouv/kosko-charts/commit/2a464857df95db17aa7655eef7ddb9b8609112e7))

# [4.0.0-alpha.9](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.8...v4.0.0-alpha.9) (2020-12-04)


### Features

* **namespace:** add azure-pg-admin-user label ([#309](https://github.com/SocialGouv/kosko-charts/issues/309)) ([fe7aa12](https://github.com/SocialGouv/kosko-charts/commit/fe7aa12d3617d297888d4bed69687b3fc70ebc9c))

# [4.0.0-alpha.8](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.7...v4.0.0-alpha.8) (2020-12-04)

# [4.0.0-alpha.8](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.7...v4.0.0-alpha.8) (2020-12-04)

### Features

* **templates:** rename .gitlab.env to .gitlab-ci.env ([#310](https://github.com/SocialGouv/kosko-charts/issues/310)) ([5d53ef4](https://github.com/SocialGouv/kosko-charts/commit/5d53ef455212fb4ddf6de0376719b7d5dde050b3))


### BREAKING CHANGES

* **templates:** You will need to rename your env file... sorry

# [4.0.0-alpha.7](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.6...v4.0.0-alpha.7) (2020-12-03)


### Bug Fixes

* **testing:** do not try to load unknown env if not defined ([8c1345f](https://github.com/SocialGouv/kosko-charts/commit/8c1345f8e41091933dbf01da3170c72864d3dd4c))


### Features

* **testing:** add extra kosko args ([04f8336](https://github.com/SocialGouv/kosko-charts/commit/04f83365828550358caf19b6e677fe40438149ad))

# [4.0.0-alpha.6](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.5...v4.0.0-alpha.6) (2020-12-03)


### Bug Fixes

* rename file ([1d8593f](https://github.com/SocialGouv/kosko-charts/commit/1d8593ff5e68de35249c367847dd675e350d9dd9))

# [4.0.0-alpha.5](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.4...v4.0.0-alpha.5) (2020-11-25)


### Bug Fixes

* **testing:** try running kosko from npx no install ([05cd088](https://github.com/SocialGouv/kosko-charts/commit/05cd088ff8f716a116f19ac0dec470c5fca3c927))

# [4.0.0-alpha.4](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.3...v4.0.0-alpha.4) (2020-11-25)


### Bug Fixes

* **testing:** remove mystic haste config ([2d47559](https://github.com/SocialGouv/kosko-charts/commit/2d4755950fdc619638423119367be4716e0607d6))

# [4.0.0-alpha.3](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.2...v4.0.0-alpha.3) (2020-11-24)


### Bug Fixes

* **testing:** add mystic haste config, allow tests from node_modules ([b6709d8](https://github.com/SocialGouv/kosko-charts/commit/b6709d8ad5c8b9cca2cc40daef47567c07be2723))

# [4.0.0-alpha.2](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-alpha.1...v4.0.0-alpha.2) (2020-11-24)


### Bug Fixes

* **pkg:** add missing testing files ([a2928b9](https://github.com/SocialGouv/kosko-charts/commit/a2928b96ab722ca294fbe0f1a5631e2add3b476d))

# [4.0.0-alpha.1](https://github.com/SocialGouv/kosko-charts/compare/v3.3.0-alpha.1...v4.0.0-alpha.1) (2020-11-24)


### Bug Fixes

* force path version ([7fa418a](https://github.com/SocialGouv/kosko-charts/commit/7fa418a3dc6b38b680f30df18026dfcef15a39e3))
* **utils:** loadYaml can return undefined too ([6f1a815](https://github.com/SocialGouv/kosko-charts/commit/6f1a815151de72c8b146059fabf4b49bdcbb4066))


### Features

* **components:** change envParams precedence ([a0a5b56](https://github.com/SocialGouv/kosko-charts/commit/a0a5b560be1f82c32297315aaccca759dfbf6e56))
* **template:** add dummy pg component ([66b5565](https://github.com/SocialGouv/kosko-charts/commit/66b5565776658ad15f53473269f8e36e3af573f8))
* **utils:** add @kosko/env/dist/paths.js wrapper ([11fb2ed](https://github.com/SocialGouv/kosko-charts/commit/11fb2ed1b02c808593d16b18b78742af6f20d502))
* **utils:** add @kosko/env/dist/paths.js wrapper (2) ([b8bf057](https://github.com/SocialGouv/kosko-charts/commit/b8bf05754100119faa0c4f1a52bc2d6a077ae4fb))


### Reverts

* downgrade of @kosko/env ([4bbaf6c](https://github.com/SocialGouv/kosko-charts/commit/4bbaf6ceb7ec81c2e05ade2c3f823b26724afca5))


* refactor(components)!: remove io-ts from pg-secret (#238) ([1f8d1ab](https://github.com/SocialGouv/kosko-charts/commit/1f8d1ab924da2ba5fc163bfd1ac32819980205e9)), closes [#238](https://github.com/SocialGouv/kosko-charts/issues/238)
* refactor(environments)!: remove io-ts from gitlab env (#235) ([e955437](https://github.com/SocialGouv/kosko-charts/commit/e955437e5711ef5987c672c93b548fcd125b414c)), closes [#235](https://github.com/SocialGouv/kosko-charts/issues/235)
* refactor(component)!: move createNamespace to components/ (#231) ([fb4e4e0](https://github.com/SocialGouv/kosko-charts/commit/fb4e4e0f95c93cd86d353838e0f0088fa3476ac6)), closes [#231](https://github.com/SocialGouv/kosko-charts/issues/231)


### BREAKING CHANGES

* **components:** The local config is now the lowers in the priority

We merge the params from

1. local app components params
1. the defined config in the components folder
1. the defined config in the environement folder
1. the process env
* might break empty string pg secret generation
* might impact all component at runtime
* the namespace is now created through import { createNamespace } from "@socialgouv/kosko-charts/components/namespace"

```diff
- import { createNamespace } from "@socialgouv/kosko-charts/utils/createNamespace";
+ import { createNamespace } from "@socialgouv/kosko-charts/components/namespace";
```

# [3.3.0-alpha.1](https://github.com/SocialGouv/kosko-charts/compare/v3.2.5...v3.3.0-alpha.1) (2020-11-24)


### Features

* **testing:** add testing helper config ([86dbd17](https://github.com/SocialGouv/kosko-charts/commit/86dbd17a679427d64c47f6b96926ae1467bf55c1))

# [4.0.0-beta.11](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.10...v4.0.0-beta.11) (2020-11-23)


### Reverts

* Revert "ci(github): build before lint" ([809583d](https://github.com/SocialGouv/kosko-charts/commit/809583d78801ab5c2cd93d8899e0c856f98f18e9))

# [4.0.0-beta.10](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.9...v4.0.0-beta.10) (2020-11-23)


### Features

* **components:** change envParams precedence ([a0a5b56](https://github.com/SocialGouv/kosko-charts/commit/a0a5b560be1f82c32297315aaccca759dfbf6e56))


### BREAKING CHANGES

* **components:** The local config is now the lowers in the priority

We merge the params from

1. local app components params
1. the defined config in the components folder
1. the defined config in the environement folder
1. the process env

# [4.0.0-beta.9](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.8...v4.0.0-beta.9) (2020-11-23)


### Bug Fixes

* **deps:** update dependency @kosko/env to v1 ([#294](https://github.com/SocialGouv/kosko-charts/issues/294)) ([99c19ba](https://github.com/SocialGouv/kosko-charts/commit/99c19bad8acc4945e00a41c2efb387a23b286c98))
* **deps:** update dependency fp-ts to ^2.8.6 ([#289](https://github.com/SocialGouv/kosko-charts/issues/289)) ([8565dd7](https://github.com/SocialGouv/kosko-charts/commit/8565dd7c477a7a9623f70321fb793775fda72a27))
* **deps:** update dependency fp-ts to ^2.9.0 ([#296](https://github.com/SocialGouv/kosko-charts/issues/296)) ([5788eb9](https://github.com/SocialGouv/kosko-charts/commit/5788eb9a28b10f1c43604578bc517685f8bb6c9b))


### Reverts

* downgrade of @kosko/env ([4bbaf6c](https://github.com/SocialGouv/kosko-charts/commit/4bbaf6ceb7ec81c2e05ade2c3f823b26724afca5))

## [3.2.5](https://github.com/SocialGouv/kosko-charts/compare/v3.2.4...v3.2.5) (2020-11-23)


### Bug Fixes

* **deps:** update dependency fp-ts to ^2.9.0 ([#296](https://github.com/SocialGouv/kosko-charts/issues/296)) ([5788eb9](https://github.com/SocialGouv/kosko-charts/commit/5788eb9a28b10f1c43604578bc517685f8bb6c9b))

## [3.2.4](https://github.com/SocialGouv/kosko-charts/compare/v3.2.3...v3.2.4) (2020-11-22)


### Bug Fixes

* **deps:** update dependency @kosko/env to v1 ([#294](https://github.com/SocialGouv/kosko-charts/issues/294)) ([99c19ba](https://github.com/SocialGouv/kosko-charts/commit/99c19bad8acc4945e00a41c2efb387a23b286c98))

## [3.2.3](https://github.com/SocialGouv/kosko-charts/compare/v3.2.2...v3.2.3) (2020-11-20)


### Bug Fixes

* **deps:** update dependency fp-ts to ^2.8.6 ([#289](https://github.com/SocialGouv/kosko-charts/issues/289)) ([8565dd7](https://github.com/SocialGouv/kosko-charts/commit/8565dd7c477a7a9623f70321fb793775fda72a27))

# [4.0.0-beta.8](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.7...v4.0.0-beta.8) (2020-11-20)


### Features

* **utils:** add @kosko/env/dist/paths.js wrapper ([11fb2ed](https://github.com/SocialGouv/kosko-charts/commit/11fb2ed1b02c808593d16b18b78742af6f20d502))
* **utils:** add @kosko/env/dist/paths.js wrapper (2) ([b8bf057](https://github.com/SocialGouv/kosko-charts/commit/b8bf05754100119faa0c4f1a52bc2d6a077ae4fb))

# [4.0.0-beta.7](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.6...v4.0.0-beta.7) (2020-11-20)


### Bug Fixes

* **azure-db:** run create-db jobs in project secret namespace ([#273](https://github.com/SocialGouv/kosko-charts/issues/273)) ([3d34b10](https://github.com/SocialGouv/kosko-charts/commit/3d34b106408d8b8d289e6728a72799d5a7aa47bb))
* **azure-db:** upgrade docker deps ([#278](https://github.com/SocialGouv/kosko-charts/issues/278)) ([d618868](https://github.com/SocialGouv/kosko-charts/commit/d618868cc2440b4b8b21e6fa757404029e7d7880))
* **azure-pg:** dont try to load admin secret ([#276](https://github.com/SocialGouv/kosko-charts/issues/276)) ([9f995bf](https://github.com/SocialGouv/kosko-charts/commit/9f995bf95fe8a81a02d2ece30a89c6a9862d6373))
* **azure-pg:** set spec.ttlSecondsAfterFinished to 24h ([#277](https://github.com/SocialGouv/kosko-charts/issues/277)) ([e4d5748](https://github.com/SocialGouv/kosko-charts/commit/e4d574890e3a833b26f0914ac1b41acf05983ef4))


### Features

* **azure-pg:** add drop-autodevops-dbs job ([#274](https://github.com/SocialGouv/kosko-charts/issues/274)) ([c149410](https://github.com/SocialGouv/kosko-charts/commit/c149410205d37f909341a07654b2abbd71fcd486))

## [3.2.2](https://github.com/SocialGouv/kosko-charts/compare/v3.2.1...v3.2.2) (2020-11-05)


### Bug Fixes

* **azure-db:** upgrade docker deps ([#278](https://github.com/SocialGouv/kosko-charts/issues/278)) ([d618868](https://github.com/SocialGouv/kosko-charts/commit/d618868cc2440b4b8b21e6fa757404029e7d7880))

## [3.2.1](https://github.com/SocialGouv/kosko-charts/compare/v3.2.0...v3.2.1) (2020-11-05)


### Bug Fixes

* **azure-pg:** dont try to load admin secret ([#276](https://github.com/SocialGouv/kosko-charts/issues/276)) ([9f995bf](https://github.com/SocialGouv/kosko-charts/commit/9f995bf95fe8a81a02d2ece30a89c6a9862d6373))
* **azure-pg:** set spec.ttlSecondsAfterFinished to 24h ([#277](https://github.com/SocialGouv/kosko-charts/issues/277)) ([e4d5748](https://github.com/SocialGouv/kosko-charts/commit/e4d574890e3a833b26f0914ac1b41acf05983ef4))

# [3.2.0](https://github.com/SocialGouv/kosko-charts/compare/v3.1.6...v3.2.0) (2020-11-05)


### Features

* **azure-pg:** add drop-autodevops-dbs job ([#274](https://github.com/SocialGouv/kosko-charts/issues/274)) ([c149410](https://github.com/SocialGouv/kosko-charts/commit/c149410205d37f909341a07654b2abbd71fcd486))

## [3.1.6](https://github.com/SocialGouv/kosko-charts/compare/v3.1.5...v3.1.6) (2020-11-03)


### Bug Fixes

* **azure-db:** run create-db jobs in project secret namespace ([#273](https://github.com/SocialGouv/kosko-charts/issues/273)) ([3d34b10](https://github.com/SocialGouv/kosko-charts/commit/3d34b106408d8b8d289e6728a72799d5a7aa47bb))

# [4.0.0-beta.6](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.5...v4.0.0-beta.6) (2020-10-30)


### Bug Fixes

* **deps:** update dependency fp-ts to ^2.8.5 ([#265](https://github.com/SocialGouv/kosko-charts/issues/265)) ([f3a10ed](https://github.com/SocialGouv/kosko-charts/commit/f3a10ede42ffff6fdbf2736586739a6a8639efcc))

## [3.1.5](https://github.com/SocialGouv/kosko-charts/compare/v3.1.4...v3.1.5) (2020-10-28)


### Bug Fixes

* **deps:** update dependency fp-ts to ^2.8.5 ([#265](https://github.com/SocialGouv/kosko-charts/issues/265)) ([f3a10ed](https://github.com/SocialGouv/kosko-charts/commit/f3a10ede42ffff6fdbf2736586739a6a8639efcc))

# [4.0.0-beta.5](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.4...v4.0.0-beta.5) (2020-10-20)


### Bug Fixes

* **service:** add default service.port.name=http ([#249](https://github.com/SocialGouv/kosko-charts/issues/249)) ([2a287bd](https://github.com/SocialGouv/kosko-charts/commit/2a287bdea1d1aa7f5c13e2eabe8bd68d89a5174d))
* **utils:** loadYaml can return undefined too ([6f1a815](https://github.com/SocialGouv/kosko-charts/commit/6f1a815151de72c8b146059fabf4b49bdcbb4066))


### Features

* **template:** add dummy pg component ([66b5565](https://github.com/SocialGouv/kosko-charts/commit/66b5565776658ad15f53473269f8e36e3af573f8))

## [3.1.4](https://github.com/SocialGouv/kosko-charts/compare/v3.1.3...v3.1.4) (2020-10-20)


### Bug Fixes

* **service:** add default service.port.name=http ([#249](https://github.com/SocialGouv/kosko-charts/issues/249)) ([2a287bd](https://github.com/SocialGouv/kosko-charts/commit/2a287bdea1d1aa7f5c13e2eabe8bd68d89a5174d))

# [4.0.0-beta.4](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.3...v4.0.0-beta.4) (2020-10-19)


### Bug Fixes

* **hasura:** increase RAM limits ([#248](https://github.com/SocialGouv/kosko-charts/issues/248)) ([3fcc455](https://github.com/SocialGouv/kosko-charts/commit/3fcc4555d60424edc1c730b2bdc17fcb384f762e))

# [4.0.0-beta.3](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.2...v4.0.0-beta.3) (2020-10-16)

- refactor(components)!: remove io-ts from pg-secret (#238) ([1f8d1ab](https://github.com/SocialGouv/kosko-charts/commit/1f8d1ab924da2ba5fc163bfd1ac32819980205e9)), closes [#238](https://github.com/SocialGouv/kosko-charts/issues/238)

### Bug Fixes

- **deps:** update dependency @kubernetes-models/sealed-secrets to ^1.0.1 ([#232](https://github.com/SocialGouv/kosko-charts/issues/232)) ([ed3cad2](https://github.com/SocialGouv/kosko-charts/commit/ed3cad23f6d0cbd85a3af9001afe40efd9d44ebb))
- **deps:** update dependency kubernetes-models to ^1.0.1 ([#233](https://github.com/SocialGouv/kosko-charts/issues/233)) ([2dccee3](https://github.com/SocialGouv/kosko-charts/commit/2dccee3766241430eea5538a061ff5a99e17e743))

### BREAKING CHANGES

- might break empty string pg secret generation

# [4.0.0-beta.2](https://github.com/SocialGouv/kosko-charts/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2020-10-16)

- refactor(environments)!: remove io-ts from gitlab env (#235) ([e955437](https://github.com/SocialGouv/kosko-charts/commit/e955437e5711ef5987c672c93b548fcd125b414c)), closes [#235](https://github.com/SocialGouv/kosko-charts/issues/235)

### BREAKING CHANGES

- might impact all component at runtime

# [4.0.0-beta.1](https://github.com/SocialGouv/kosko-charts/compare/v3.1.0...v4.0.0-beta.1) (2020-10-16)

- refactor(component)!: move createNamespace to components/ (#231) ([fb4e4e0](https://github.com/SocialGouv/kosko-charts/commit/fb4e4e0f95c93cd86d353838e0f0088fa3476ac6)), closes [#231](https://github.com/SocialGouv/kosko-charts/issues/231)

### BREAKING CHANGES

- the namespace is now created through import { createNamespace } from "@socialgouv/kosko-charts/components/namespace"

```diff
- import { createNamespace } from "@socialgouv/kosko-charts/utils/createNamespace";
+ import { createNamespace } from "@socialgouv/kosko-charts/components/namespace";
```

## [3.1.3](https://github.com/SocialGouv/kosko-charts/compare/v3.1.2...v3.1.3) (2020-10-19)

### Bug Fixes

- **hasura:** increase RAM limits ([#248](https://github.com/SocialGouv/kosko-charts/issues/248)) ([3fcc455](https://github.com/SocialGouv/kosko-charts/commit/3fcc4555d60424edc1c730b2bdc17fcb384f762e))

## [3.1.2](https://github.com/SocialGouv/kosko-charts/compare/v3.1.1...v3.1.2) (2020-10-16)

### Bug Fixes

- **deps:** update dependency kubernetes-models to ^1.0.1 ([#233](https://github.com/SocialGouv/kosko-charts/issues/233)) ([2dccee3](https://github.com/SocialGouv/kosko-charts/commit/2dccee3766241430eea5538a061ff5a99e17e743))

## [3.1.1](https://github.com/SocialGouv/kosko-charts/compare/v3.1.0...v3.1.1) (2020-10-16)

### Bug Fixes

- **deps:** update dependency @kubernetes-models/sealed-secrets to ^1.0.1 ([#232](https://github.com/SocialGouv/kosko-charts/issues/232)) ([ed3cad2](https://github.com/SocialGouv/kosko-charts/commit/ed3cad23f6d0cbd85a3af9001afe40efd9d44ebb))

# [3.1.0](https://github.com/SocialGouv/kosko-charts/compare/v3.0.5...v3.1.0) (2020-10-15)

### Features

- **waitForPostgres:** use socialgouv/docker/wait-for-postgres:2.0.0 ([a09c4ac](https://github.com/SocialGouv/kosko-charts/commit/a09c4acec182235b97ac1fe7ddc443a4b8eeebfd))
- **withPostgres:** add config.withPostgres ([#199](https://github.com/SocialGouv/kosko-charts/issues/199)) ([e68fe75](https://github.com/SocialGouv/kosko-charts/commit/e68fe7568d2f55d9d190da4b071f510d55dcd69a))
- **withRedirections:** add config.withRedirections ([#209](https://github.com/SocialGouv/kosko-charts/issues/209)) ([406943b](https://github.com/SocialGouv/kosko-charts/commit/406943b3b69469cb39b30f209ef9870a8acc8edd))

# [3.1.0-alpha.3](https://github.com/SocialGouv/kosko-charts/compare/v3.1.0-alpha.2...v3.1.0-alpha.3) (2020-10-15)

### Features

- **withRedirections:** add config.withRedirections ([#209](https://github.com/SocialGouv/kosko-charts/issues/209)) ([406943b](https://github.com/SocialGouv/kosko-charts/commit/406943b3b69469cb39b30f209ef9870a8acc8edd))

# [3.1.0-alpha.2](https://github.com/SocialGouv/kosko-charts/compare/v3.1.0-alpha.1...v3.1.0-alpha.2) (2020-10-15)

### Features

- **waitForPostgres:** use socialgouv/docker/wait-for-postgres:2.0.0 ([a09c4ac](https://github.com/SocialGouv/kosko-charts/commit/a09c4acec182235b97ac1fe7ddc443a4b8eeebfd))

# [3.1.0-alpha.1](https://github.com/SocialGouv/kosko-charts/compare/v3.0.5...v3.1.0-alpha.1) (2020-10-15)

### Features

- **withPostgres:** add config.withPostgres ([#199](https://github.com/SocialGouv/kosko-charts/issues/199)) ([e68fe75](https://github.com/SocialGouv/kosko-charts/commit/e68fe7568d2f55d9d190da4b071f510d55dcd69a))

## [3.0.5](https://github.com/SocialGouv/kosko-charts/compare/v3.0.4...v3.0.5) (2020-10-15)

### Bug Fixes

- **template:** add missing .gitlab.env file ([#167](https://github.com/SocialGouv/kosko-charts/issues/167)) ([0083e3f](https://github.com/SocialGouv/kosko-charts/commit/0083e3f3dd04b65d4bbb6159e5927aad36dd9dfe))

## [3.0.4](https://github.com/SocialGouv/kosko-charts/compare/v3.0.3...v3.0.4) (2020-10-13)

### Bug Fixes

- **deps:** update dependency kubernetes-models to v1 ([#223](https://github.com/SocialGouv/kosko-charts/issues/223)) ([2406528](https://github.com/SocialGouv/kosko-charts/commit/2406528c5c0cf60c2a3150f0e6815e811be21801))

## [3.0.3](https://github.com/SocialGouv/kosko-charts/compare/v3.0.2...v3.0.3) (2020-10-13)

### Bug Fixes

- **deps:** update dependency @kubernetes-models/sealed-secrets to v1 ([#222](https://github.com/SocialGouv/kosko-charts/issues/222)) ([79287a9](https://github.com/SocialGouv/kosko-charts/commit/79287a94985403e9077dd5f6fe75975cee57f0be))

## [3.0.2](https://github.com/SocialGouv/kosko-charts/compare/v3.0.1...v3.0.2) (2020-10-12)

### Bug Fixes

- **deps:** update dependency @sindresorhus/is to v4 ([#220](https://github.com/SocialGouv/kosko-charts/issues/220)) ([4d5430c](https://github.com/SocialGouv/kosko-charts/commit/4d5430c49e774e422e231d58d3b5596beabd774f))

## [3.0.1](https://github.com/SocialGouv/kosko-charts/compare/v3.0.0...v3.0.1) (2020-10-12)

### Bug Fixes

- **deps:** update dependency fp-ts to ^2.8.4 ([#217](https://github.com/SocialGouv/kosko-charts/issues/217)) ([257975f](https://github.com/SocialGouv/kosko-charts/commit/257975f75384bc7e7199ce1ee56d5e7fe8435502))

# [3.0.0](https://github.com/SocialGouv/kosko-charts/compare/v2.7.2...v3.0.0) (2020-09-30)

- feat(gitlab)!: use preprod-\${CI_PROJECT_NAME} ingress for preprod-dev2 (#192) ([0fb15b4](https://github.com/SocialGouv/kosko-charts/commit/0fb15b407886358455d2f25fe398f5e88b6bc1e3)), closes [#192](https://github.com/SocialGouv/kosko-charts/issues/192)

### BREAKING CHANGES

- preprod URLs will start with `preprod-*` instead of `vX-Y-Z-*` by default

## [2.7.2](https://github.com/SocialGouv/kosko-charts/compare/v2.7.1...v2.7.2) (2020-09-22)

### Bug Fixes

- **deps:** update dependency fp-ts to ^2.8.3 ([#190](https://github.com/SocialGouv/kosko-charts/issues/190)) ([c226702](https://github.com/SocialGouv/kosko-charts/commit/c226702d4ae819eee995e4d7c09b3c296dde5f2d))

## [2.7.1](https://github.com/SocialGouv/kosko-charts/compare/v2.7.0...v2.7.1) (2020-09-18)

### Bug Fixes

- **hasura:** handle deployment options ([#184](https://github.com/SocialGouv/kosko-charts/issues/184)) ([3ed8f4a](https://github.com/SocialGouv/kosko-charts/commit/3ed8f4a41ad52058cff7f534dfdabe3679382fcd))

# [2.7.0](https://github.com/SocialGouv/kosko-charts/compare/v2.6.4...v2.7.0) (2020-09-15)

### Features

- add params.imagePullSecrets ([#169](https://github.com/SocialGouv/kosko-charts/issues/169)) ([fda70c1](https://github.com/SocialGouv/kosko-charts/commit/fda70c1960821b94b7bb7b8094e93666e9155e29))

## [2.6.4](https://github.com/SocialGouv/kosko-charts/compare/v2.6.3...v2.6.4) (2020-08-27)

### Bug Fixes

- **redis:** accept optional deployment params fix ([#149](https://github.com/SocialGouv/kosko-charts/issues/149)) ([08e8c02](https://github.com/SocialGouv/kosko-charts/commit/08e8c02d84c8b1281492be279655ac40bae7c58a)), closes [#146](https://github.com/SocialGouv/kosko-charts/issues/146)

## [2.6.3](https://github.com/SocialGouv/kosko-charts/compare/v2.6.2...v2.6.3) (2020-08-24)

### Bug Fixes

- **deps:** update dependency fp-ts to ^2.8.2 ([#138](https://github.com/SocialGouv/kosko-charts/issues/138)) ([22c412b](https://github.com/SocialGouv/kosko-charts/commit/22c412bba9fe67dc6edb1997deee558660261abd))

## [2.6.2](https://github.com/SocialGouv/kosko-charts/compare/v2.6.1...v2.6.2) (2020-08-22)

### Bug Fixes

- **deps:** update dependency @sindresorhus/is to ^3.1.2 ([#134](https://github.com/SocialGouv/kosko-charts/issues/134)) ([5bc2e14](https://github.com/SocialGouv/kosko-charts/commit/5bc2e14bfcb7f77edbfe138600740872e5e02687))

## [2.6.1](https://github.com/SocialGouv/kosko-charts/compare/v2.6.0...v2.6.1) (2020-08-16)

### Bug Fixes

- **deps:** update dependency @sindresorhus/is to ^3.1.1 ([#124](https://github.com/SocialGouv/kosko-charts/issues/124)) ([1b306d5](https://github.com/SocialGouv/kosko-charts/commit/1b306d5869018c415b40edfb0c2d236bc7761e6e))

# [2.6.0](https://github.com/SocialGouv/kosko-charts/compare/v2.5.2...v2.6.0) (2020-08-07)

### Features

- **pg:** add config.pgHost ([#116](https://github.com/SocialGouv/kosko-charts/issues/116)) ([5400c9a](https://github.com/SocialGouv/kosko-charts/commit/5400c9a529dfb68fe4ff23e0c9a1ede1438c67b3))

## [2.5.2](https://github.com/SocialGouv/kosko-charts/compare/v2.5.1...v2.5.2) (2020-08-07)

### Bug Fixes

- **k8s:** restore waitForPg delays ([#115](https://github.com/SocialGouv/kosko-charts/issues/115)) ([f4bdd1b](https://github.com/SocialGouv/kosko-charts/commit/f4bdd1b62aa77c86a09f7c448c343e35ca60de56))

## [2.5.1](https://github.com/SocialGouv/kosko-charts/compare/v2.5.0...v2.5.1) (2020-08-07)

### Bug Fixes

- **wait-for-pg:** handle postgres shell and return exit status on error ([#114](https://github.com/SocialGouv/kosko-charts/issues/114)) ([09cbadb](https://github.com/SocialGouv/kosko-charts/commit/09cbadba42a9724e36da533e991a8063c497a49d))

# [2.5.0](https://github.com/SocialGouv/kosko-charts/compare/v2.4.0...v2.5.0) (2020-08-06)

### Features

- add addWaitForService ([#113](https://github.com/SocialGouv/kosko-charts/issues/113)) ([3af46b6](https://github.com/SocialGouv/kosko-charts/commit/3af46b63ae6c2210853e19f5b327f165f6d4c246))

# [2.4.0](https://github.com/SocialGouv/kosko-charts/compare/v2.3.0...v2.4.0) (2020-08-06)

### Features

- **pg-secret:** add DB_URI and PGRST_DB_URI ([#112](https://github.com/SocialGouv/kosko-charts/issues/112)) ([2bf576b](https://github.com/SocialGouv/kosko-charts/commit/2bf576b09b9161f33bfc0306c07c3ec7c5c35aa8))

# [2.3.0](https://github.com/SocialGouv/kosko-charts/compare/v2.2.2...v2.3.0) (2020-08-05)

### Features

- add utils: getIngressHost and getManifestByKind ([#108](https://github.com/SocialGouv/kosko-charts/issues/108)) ([ce60a79](https://github.com/SocialGouv/kosko-charts/commit/ce60a7919312464b0f208cfb8f1df690ab489d73))

## [2.2.2](https://github.com/SocialGouv/kosko-charts/compare/v2.2.1...v2.2.2) (2020-08-04)

### Bug Fixes

- **deps:** update dependency fp-ts to ^2.8.1 ([#106](https://github.com/SocialGouv/kosko-charts/issues/106)) ([1c32c1a](https://github.com/SocialGouv/kosko-charts/commit/1c32c1a088889d71c93a65584adf3dc1dce784b0))

## [2.2.1](https://github.com/SocialGouv/kosko-charts/compare/v2.2.0...v2.2.1) (2020-08-04)

### Bug Fixes

- **namespace:** use PRODUCTION_NAMESPACE when provided ([#104](https://github.com/SocialGouv/kosko-charts/issues/104)) ([a0f1124](https://github.com/SocialGouv/kosko-charts/commit/a0f1124c8bcb5a238352eda7b1b065951ea1e5b7))

# [2.2.0](https://github.com/SocialGouv/kosko-charts/compare/v2.1.4...v2.2.0) (2020-08-02)

### Features

- add components and options ([#100](https://github.com/SocialGouv/kosko-charts/issues/100)) ([517f684](https://github.com/SocialGouv/kosko-charts/commit/517f6844f54e232b51afa50092f45391c52a4523))

## [2.1.4](https://github.com/SocialGouv/kosko-charts/compare/v2.1.3...v2.1.4) (2020-07-31)

### Bug Fixes

- **deps:** update dependency kubernetes-models to ^0.8.1 ([#91](https://github.com/SocialGouv/kosko-charts/issues/91)) ([06a2a45](https://github.com/SocialGouv/kosko-charts/commit/06a2a45f544b9e8cb66469bde1e02b2e6f184b9f))

## [2.1.3](https://github.com/SocialGouv/kosko-charts/compare/v2.1.2...v2.1.3) (2020-07-31)

### Bug Fixes

- **deps:** update dependency @sindresorhus/is to ^3.1.0 ([#88](https://github.com/SocialGouv/kosko-charts/issues/88)) ([28a09b7](https://github.com/SocialGouv/kosko-charts/commit/28a09b7bedc5d918d65aee40eb9fbcef7f4f0512))

## [2.1.2](https://github.com/SocialGouv/kosko-charts/compare/v2.1.1...v2.1.2) (2020-07-31)

### Bug Fixes

- **deps:** update dependency fp-ts to ^2.7.1 ([#89](https://github.com/SocialGouv/kosko-charts/issues/89)) ([a88c783](https://github.com/SocialGouv/kosko-charts/commit/a88c783188668a792d1851db318084b1d2db94e9))

## [2.1.1](https://github.com/SocialGouv/kosko-charts/compare/v2.1.0...v2.1.1) (2020-07-31)

### Bug Fixes

- **deps:** update dependency @kosko/env to ^0.5.2 ([#87](https://github.com/SocialGouv/kosko-charts/issues/87)) ([ae79793](https://github.com/SocialGouv/kosko-charts/commit/ae79793f1af70b9051336ca5f9f02e1da9105e4a))

# [2.1.0](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0...v2.1.0) (2020-07-31)

### Features

- **ingress:** allow mutliple hosts ([#94](https://github.com/SocialGouv/kosko-charts/issues/94)) ([e0101f9](https://github.com/SocialGouv/kosko-charts/commit/e0101f90143294e4355257373d25e88393204f19))

# [2.0.0](https://github.com/SocialGouv/kosko-charts/compare/v1.0.2...v2.0.0) (2020-07-31)

- refactor!: v2.0.0 ([903470b](https://github.com/SocialGouv/kosko-charts/commit/903470bf2b8ebbbb3178fbcee2f846720a8f1b9d))

### BREAKING CHANGES

- **COMPLETE REWORK**

`@socialgouv/kosko-charts` is now exposing component and environment
generators !

# [2.0.0-beta.23](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2020-07-31)

### Bug Fixes

- adjust some nginx values ([34cee31](https://github.com/SocialGouv/kosko-charts/commit/34cee310e521a02a7a553bc8bd771d5c8bcda657))
- tests ([b9f2954](https://github.com/SocialGouv/kosko-charts/commit/b9f2954bfad58b0b4c323471e41b7d0c6c00a78d))

# [2.0.0-beta.22](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2020-07-31)

### Bug Fixes

- **nginx:** use /index.html for probes ([6e15237](https://github.com/SocialGouv/kosko-charts/commit/6e152379abc0b39ee00a19ca0bae9cd3cced6921))

# [2.0.0-beta.21](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2020-07-30)

### Bug Fixes

- **nginx:** use / for probes ([2ee3697](https://github.com/SocialGouv/kosko-charts/commit/2ee369769dd59f6509708bdac3d6f0cbdfb1eeec))

# [2.0.0-beta.20](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2020-07-30)

### Features

- add nginx component ([af9592b](https://github.com/SocialGouv/kosko-charts/commit/af9592b9fbe38e0e771cda7e584906777763270c))

# [2.0.0-beta.19](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2020-07-30)

### Bug Fixes

- yarn.lock ([cacaea6](https://github.com/SocialGouv/kosko-charts/commit/cacaea693cefd2066aee861e71db3f9e607b8e5a))

# [2.0.0-beta.18](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2020-07-30)

### Bug Fixes

- **utils:** committed conflicts ([ed3ac80](https://github.com/SocialGouv/kosko-charts/commit/ed3ac80fd930eb93b675a072bd213d6c804abeab))

### Features

- more utils ([b26991c](https://github.com/SocialGouv/kosko-charts/commit/b26991ccdcb64e41e570037110490452a6285466))

# [2.0.0-alpha.31](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.30...v2.0.0-alpha.31) (2020-07-30)

### Bug Fixes

- **ingress:** add prod annotations ([a309eb3](https://github.com/SocialGouv/kosko-charts/commit/a309eb38ec7347460735e20f946f5b72a669e7ef))

# [2.0.0-alpha.30](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.29...v2.0.0-alpha.30) (2020-07-30)

### Bug Fixes

- **utils:** ensure to use the azure-pg-user on tags ([638c457](https://github.com/SocialGouv/kosko-charts/commit/638c457a7816654b7ec1a8ca32ed58c806c03ce4))

# [2.0.0-alpha.29](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.28...v2.0.0-alpha.29) (2020-07-30)

### Bug Fixes

- **hasura:** use azure fix pg user on tags ([fda47d0](https://github.com/SocialGouv/kosko-charts/commit/fda47d04b0abfd75bc309bc6d0412b2cc9851d24))

# [2.0.0-alpha.28](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.27...v2.0.0-alpha.28) (2020-07-29)

### Bug Fixes

- tmp fix addWaitForPostgres ([d5eef8e](https://github.com/SocialGouv/kosko-charts/commit/d5eef8e0fd153225951946ce4d4977f28fc3dc9d))

# [2.0.0-alpha.27](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.26...v2.0.0-alpha.27) (2020-07-29)

### Bug Fixes

- use pg.sealed-secret.yaml ([c08771e](https://github.com/SocialGouv/kosko-charts/commit/c08771e3fca1dcb068aeff8eeec7c1e3a405b840))

# [2.0.0-alpha.26](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.25...v2.0.0-alpha.26) (2020-07-29)

### Reverts

- Revert "e2e(templates): update snapshots" ([8d33664](https://github.com/SocialGouv/kosko-charts/commit/8d3366441fd039c8d3ec9a75cd43b99480dcede7))

# [2.0.0-alpha.25](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.24...v2.0.0-alpha.25) (2020-07-29)

### Bug Fixes

- **k8s:** preprod namespace name ([f9ea78f](https://github.com/SocialGouv/kosko-charts/commit/f9ea78f366ad7d86e0940c22478ed3868a95aba2))

### Features

- **k8s:** add subdomain prefix ([88046e2](https://github.com/SocialGouv/kosko-charts/commit/88046e2336e64a12042baa2a58f7a8ede0e464b2))

# [2.0.0-alpha.24](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.23...v2.0.0-alpha.24) (2020-07-29)

### Bug Fixes

- type azure-pg ([fca477b](https://github.com/SocialGouv/kosko-charts/commit/fca477b126e7bb06011a045015e1fcc1e4108395))

# [2.0.0-alpha.23](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.22...v2.0.0-alpha.23) (2020-07-29)

### Bug Fixes

- make hasura/config optional ([e4d4958](https://github.com/SocialGouv/kosko-charts/commit/e4d4958ba720b427f89403a715688dfdb43ee7dd))

# [2.0.0-alpha.22](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.21...v2.0.0-alpha.22) (2020-07-29)

### Features

- **app:** allow optional config ([31d9b50](https://github.com/SocialGouv/kosko-charts/commit/31d9b501eeb2ecd491ecb415c032a4b307050511))

# [2.0.0-alpha.21](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.20...v2.0.0-alpha.21) (2020-07-29)

### Bug Fixes

- **app:** forbid the use of containerPort in external deployment config ([6e4592c](https://github.com/SocialGouv/kosko-charts/commit/6e4592c3eb1007dccf096260aac6f46e557d09e2))

# [2.0.0-alpha.20](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.19...v2.0.0-alpha.20) (2020-07-29)

### Bug Fixes

- **wait-for-pg:** use dummy psql ([8c4f0c7](https://github.com/SocialGouv/kosko-charts/commit/8c4f0c736e460182f8cc5d34f2925c3cbb0596bb))

# [2.0.0-alpha.19](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.18...v2.0.0-alpha.19) (2020-07-28)

### Bug Fixes

- tests ([4f83185](https://github.com/SocialGouv/kosko-charts/commit/4f83185f5057a93c7a85c611f6d943f46c6c8e52))

### Features

- **app:** merge containers ([731fdd5](https://github.com/SocialGouv/kosko-charts/commit/731fdd56a0fe5f614a0915d05e76fe2d697cd45c))

# [2.0.0-alpha.18](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.17...v2.0.0-alpha.18) (2020-07-28)

### Bug Fixes

- test pg script ([731630e](https://github.com/SocialGouv/kosko-charts/commit/731630ed615b51035e005734e6d7c8da3a98c380))
- tests ([75de4c3](https://github.com/SocialGouv/kosko-charts/commit/75de4c32bc6491445557e4eb6305583554acc719))

# [2.0.0-alpha.17](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.16...v2.0.0-alpha.17) (2020-07-28)

### Bug Fixes

- typo ([60ed9a1](https://github.com/SocialGouv/kosko-charts/commit/60ed9a1c42824f6dd58217a4dc5606adf3eede61))
- typo ([875b48d](https://github.com/SocialGouv/kosko-charts/commit/875b48d3ac16dcd2699ea6666fe87b39bd411943))

# [2.0.0-alpha.16](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2020-07-28)

### Features

- add addWaitForPostgres and use in hasura component ([f8181ff](https://github.com/SocialGouv/kosko-charts/commit/f8181ffae293d06819d4d59e3af1f411c8475392))

# [2.0.0-alpha.15](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2020-07-27)

### Features

- add components/hasura ([75a2f9a](https://github.com/SocialGouv/kosko-charts/commit/75a2f9aa5646dc962abfc1dbf5605b2fb257f452))

# [2.0.0-alpha.14](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.13...v2.0.0-alpha.14) (2020-07-27)

### Bug Fixes

- **createDeployment:** handle request/limits ([25f7ae5](https://github.com/SocialGouv/kosko-charts/commit/25f7ae5112688ec86065f2940466be7708d0d626))

# [2.0.0-alpha.13](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2020-07-27)

### Bug Fixes

- create-db-job name ([2236bc6](https://github.com/SocialGouv/kosko-charts/commit/2236bc6acd613412597a1176bd94f358838a4424))

# [2.0.0-alpha.12](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2020-07-27)

### Bug Fixes

- **app:** simplify metadata typing to allow more cases ([0ba7acd](https://github.com/SocialGouv/kosko-charts/commit/0ba7acd2cd71a04b8137c8ba8f6869c56c2f5ad3))
- **deps:** pin io-ts to 2.2.6 ([2caebbc](https://github.com/SocialGouv/kosko-charts/commit/2caebbc0a725cf7a96fd62c4730ffd3c74bba57a))
- **release:** add template package.json in release commit ([584263d](https://github.com/SocialGouv/kosko-charts/commit/584263da191a1d5e578727443643b826e32f5912))
- **release:** missing v before version number ([eea00a4](https://github.com/SocialGouv/kosko-charts/commit/eea00a4d3aee5755f23ec4b1cad5f0f5a6def9e1))
- **release:** sed the doc ([9d252f4](https://github.com/SocialGouv/kosko-charts/commit/9d252f4b15291e77a171f83efd6706af35c7f452))
- **release:** sed the doc (2) ([10db9b8](https://github.com/SocialGouv/kosko-charts/commit/10db9b8467a701d43e7f27573a3a5af505c0b667))
- **release:** sed the doc (3) ([5ffa54e](https://github.com/SocialGouv/kosko-charts/commit/5ffa54e4d000ad05c2916c8b65f83b5de4a463ca))
- **release:** sed the doc (4) ([0734af1](https://github.com/SocialGouv/kosko-charts/commit/0734af1edc439045d9e69170888d04ea28ab57d6))
- **release:** sed the doc (5) ([799539e](https://github.com/SocialGouv/kosko-charts/commit/799539e932ec2afef6a09d5bdc271ca769a8256d))
- **release:** sed the doc (6) ([b0366cc](https://github.com/SocialGouv/kosko-charts/commit/b0366cc9678c2cf84f1c22d604f067653e7dd548))
- **utils:** committed conflicts ([ed3ac80](https://github.com/SocialGouv/kosko-charts/commit/ed3ac80fd930eb93b675a072bd213d6c804abeab))
- generation doc ([b5f2a44](https://github.com/SocialGouv/kosko-charts/commit/b5f2a443f34f739e7fa1b9c044c2ee10c79b2d41))
- **release:** update string to replace in README.md ([413a67f](https://github.com/SocialGouv/kosko-charts/commit/413a67f38032742c1debb6a346cae803cf058865))

### Code Refactoring

- **e2e:** run e2e tests on real world templates ([e975403](https://github.com/SocialGouv/kosko-charts/commit/e9754036234e49d15b4914c68ba58c7299ca6f04)), closes [SocialGouv/kosko-charts#2](https://github.com/SocialGouv/kosko-charts/issues/2) [SocialGouv/kosko-charts#2](https://github.com/SocialGouv/kosko-charts/issues/2)

### Features

- more utils ([b26991c](https://github.com/SocialGouv/kosko-charts/commit/b26991ccdcb64e41e570037110490452a6285466))
- **utils:** add helperz ([#65](https://github.com/SocialGouv/kosko-charts/issues/65)) ([787a882](https://github.com/SocialGouv/kosko-charts/commit/787a882dcfc48c4c05fbbfead66ed37022c9ecce))
- components/azure-db ([#62](https://github.com/SocialGouv/kosko-charts/issues/62)) ([90de6d4](https://github.com/SocialGouv/kosko-charts/commit/90de6d406d7a2c6d8fb0fa702df0310533c88401))
- update to io-ts 2.2.7 ([400704b](https://github.com/SocialGouv/kosko-charts/commit/400704b78b2637f4cee0a8a9d929b0c70c568b91))
- **app:** add default livenessProbe and readinessProbe ([03aeba9](https://github.com/SocialGouv/kosko-charts/commit/03aeba926ad1ff8be5284178a70ea8b582c9e168))
- **app:** add startupProbe ([ec6e468](https://github.com/SocialGouv/kosko-charts/commit/ec6e4680de04d57a730ef45c5ce5f81366535066))
- **app:** boost default limits ([95c139c](https://github.com/SocialGouv/kosko-charts/commit/95c139cef30c9045af0a6a12a33fcd45af7f844b))
- **app:** pass params annotations down to pods ([a154598](https://github.com/SocialGouv/kosko-charts/commit/a154598be9f6a486d7757f0fe62242adcf9b50b1))
- **app:** target our cluster v2 ([fac1347](https://github.com/SocialGouv/kosko-charts/commit/fac13475823ba04c9814ad51e60ea1527104946c))
- **templates:** update default scripts ([d255d8b](https://github.com/SocialGouv/kosko-charts/commit/d255d8b981d80784aa63806dbe862c26282d2c10))
- **types:** add NamedComponentEnvironment ([101aa32](https://github.com/SocialGouv/kosko-charts/commit/101aa32401481df724371a196293cb4aa68c4725))
- **utils:** add public merge function ([fbd0f82](https://github.com/SocialGouv/kosko-charts/commit/fbd0f82c31bb05fe504316b03cc3240dfa8e199b))

### BREAKING CHANGES

- **e2e:** we are introduction the `templates` folder

This will change how we scaffold a deployment folder
We should now be using

````diff

# [2.0.0-beta.17](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2020-07-02)


### Features

* **utils:** add helperz ([#65](https://github.com/SocialGouv/kosko-charts/issues/65)) ([787a882](https://github.com/SocialGouv/kosko-charts/commit/787a882dcfc48c4c05fbbfead66ed37022c9ecce))

# [2.0.0-beta.16](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2020-07-01)


### Features

* update to io-ts 2.2.7 ([400704b](https://github.com/SocialGouv/kosko-charts/commit/400704b78b2637f4cee0a8a9d929b0c70c568b91))

# [2.0.0-beta.15](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2020-07-01)


### Bug Fixes

* **deps:** pin io-ts to 2.2.6 ([2caebbc](https://github.com/SocialGouv/kosko-charts/commit/2caebbc0a725cf7a96fd62c4730ffd3c74bba57a))

# [2.0.0-beta.14](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2020-07-01)


### Features

* components/azure-db ([#62](https://github.com/SocialGouv/kosko-charts/issues/62)) ([90de6d4](https://github.com/SocialGouv/kosko-charts/commit/90de6d406d7a2c6d8fb0fa702df0310533c88401))

# [2.0.0-beta.13](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2020-06-28)


### Features

* **templates:** update default scripts ([d255d8b](https://github.com/SocialGouv/kosko-charts/commit/d255d8b981d80784aa63806dbe862c26282d2c10))

# [2.0.0-beta.12](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2020-06-28)


### Bug Fixes

* **app:** simplify metadata typing to allow more cases ([0ba7acd](https://github.com/SocialGouv/kosko-charts/commit/0ba7acd2cd71a04b8137c8ba8f6869c56c2f5ad3))


### Features

* **types:** add NamedComponentEnvironment ([101aa32](https://github.com/SocialGouv/kosko-charts/commit/101aa32401481df724371a196293cb4aa68c4725))

# [2.0.0-beta.11](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2020-06-22)


### Bug Fixes

* **release:** missing v before version number ([eea00a4](https://github.com/SocialGouv/kosko-charts/commit/eea00a4d3aee5755f23ec4b1cad5f0f5a6def9e1))

# [2.0.0-beta.10](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2020-06-19)


### Bug Fixes

* **release:** sed the doc (6) ([b0366cc](https://github.com/SocialGouv/kosko-charts/commit/b0366cc9678c2cf84f1c22d604f067653e7dd548))

# [2.0.0-beta.9](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2020-06-19)


### Bug Fixes

* **release:** sed the doc ([9d252f4](https://github.com/SocialGouv/kosko-charts/commit/9d252f4b15291e77a171f83efd6706af35c7f452))
* **release:** sed the doc (2) ([10db9b8](https://github.com/SocialGouv/kosko-charts/commit/10db9b8467a701d43e7f27573a3a5af505c0b667))
* **release:** sed the doc (3) ([5ffa54e](https://github.com/SocialGouv/kosko-charts/commit/5ffa54e4d000ad05c2916c8b65f83b5de4a463ca))
* **release:** sed the doc (4) ([0734af1](https://github.com/SocialGouv/kosko-charts/commit/0734af1edc439045d9e69170888d04ea28ab57d6))
* **release:** sed the doc (5) ([799539e](https://github.com/SocialGouv/kosko-charts/commit/799539e932ec2afef6a09d5bdc271ca769a8256d))

# [2.0.0-beta.8](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2020-06-19)


### Bug Fixes

* generation doc ([b5f2a44](https://github.com/SocialGouv/kosko-charts/commit/b5f2a443f34f739e7fa1b9c044c2ee10c79b2d41))

# [2.0.0-beta.7](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2020-05-28)


### Features

* **app:** pass params annotations down to pods ([a154598](https://github.com/SocialGouv/kosko-charts/commit/a154598be9f6a486d7757f0fe62242adcf9b50b1))

# [2.0.0-beta.6](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2020-05-26)


### Features

* **app:** add startupProbe ([ec6e468](https://github.com/SocialGouv/kosko-charts/commit/ec6e4680de04d57a730ef45c5ce5f81366535066))
* **app:** target our cluster v2 ([fac1347](https://github.com/SocialGouv/kosko-charts/commit/fac13475823ba04c9814ad51e60ea1527104946c))

# [2.0.0-beta.5](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2020-05-26)


### Features

* **app:** add default livenessProbe and readinessProbe ([03aeba9](https://github.com/SocialGouv/kosko-charts/commit/03aeba926ad1ff8be5284178a70ea8b582c9e168))
* **app:** boost default limits ([95c139c](https://github.com/SocialGouv/kosko-charts/commit/95c139cef30c9045af0a6a12a33fcd45af7f844b))

# [2.0.0-beta.4](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2020-05-25)


### Bug Fixes

* **release:** update string to replace in README.md ([413a67f](https://github.com/SocialGouv/kosko-charts/commit/413a67f38032742c1debb6a346cae803cf058865))

# [2.0.0-beta.3](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2020-05-25)


### Bug Fixes

* **release:** add template package.json in release commit ([584263d](https://github.com/SocialGouv/kosko-charts/commit/584263da191a1d5e578727443643b826e32f5912))

# [2.0.0-beta.2](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2020-05-25)


### Code Refactoring

* **e2e:** run e2e tests on real world templates ([e975403](https://github.com/SocialGouv/kosko-charts/commit/e9754036234e49d15b4914c68ba58c7299ca6f04)), closes [SocialGouv/kosko-charts#2](https://github.com/SocialGouv/kosko-charts/issues/2) [SocialGouv/kosko-charts#2](https://github.com/SocialGouv/kosko-charts/issues/2)


### BREAKING CHANGES

* **e2e:** we are introduction the `templates` folder

This will change how we scaffold a deployment folder
We should now be using

```diff

# [2.0.0-beta.1](https://github.com/SocialGouv/kosko-charts/compare/v1.0.2...v2.0.0-beta.1) (2020-05-25)


### Bug Fixes

* **app:** add wildcard-crt as default cert ([65b2146](https://github.com/SocialGouv/kosko-charts/commit/65b21461f2bcde78c6d700b7a1b49ceb882b7f25))
* **components:** allow ingress secretName override in app ([22346e8](https://github.com/SocialGouv/kosko-charts/commit/22346e870dc9a8901f2b1197ed8ec1dd9f89c5af))
* **github:** transfert built folder to release job (9) ([ca73944](https://github.com/SocialGouv/kosko-charts/commit/ca7394470092955aa1fb8d3d2f6be7b9c2d38b90))
* **gitlab:** use CI_PROJECT_NAME as namespace in prod ([f97d05e](https://github.com/SocialGouv/kosko-charts/commit/f97d05ed90b2b3a28c66edce97e7a145ab9bd5d5))
* **k8s:** use tagged image when available (2) ([15cca25](https://github.com/SocialGouv/kosko-charts/commit/15cca255103f5920fdcab5d7a921b374b37bfe4d))
* **k8s:** use tagged image when available (3) ([527687d](https://github.com/SocialGouv/kosko-charts/commit/527687da4b372de8c9fb340fe5a9b069910f46d7))
* **pkg:** missing files in published package ([05ea4c3](https://github.com/SocialGouv/kosko-charts/commit/05ea4c3d7f53f76e5155d79d4d03cd5f16323847))
* **pkg:** missing utils files in published package ([1d92713](https://github.com/SocialGouv/kosko-charts/commit/1d92713b524aabbf6a556c34f1cd2e38cdd8d2cc))
* compile without composite option ([f78b9a0](https://github.com/SocialGouv/kosko-charts/commit/f78b9a07a4447c8f99b80682f75b50e6a19e98a2))
* trigger patch release ([c1c2fd6](https://github.com/SocialGouv/kosko-charts/commit/c1c2fd679ad133c64d62df2d50749b2133160fbb))


### Features

* **component:** use undefined to disable annotations ([0e90f1a](https://github.com/SocialGouv/kosko-charts/commit/0e90f1a94bc79d35457ae5dc8527641e330960e9))
* **env:** prefix app with gitlab env slug ([ffcaa3c](https://github.com/SocialGouv/kosko-charts/commit/ffcaa3c3e53fbb8f61f8077ca83958714e7c336e))
* **utils:** add public merge function ([fbd0f82](https://github.com/SocialGouv/kosko-charts/commit/fbd0f82c31bb05fe504316b03cc3240dfa8e199b))


* feat!: format preprod subdomain with CI_COMMIT_TAG (#16) ([6a6d59e](https://github.com/SocialGouv/kosko-charts/commit/6a6d59ef661b50b8e5a64487e9a589ddb44dcefc)), closes [#16](https://github.com/SocialGouv/kosko-charts/issues/16)
* refactor(github)!: export generators ([4f502d0](https://github.com/SocialGouv/kosko-charts/commit/4f502d040f14bec93229e8b2cad29b4e03eeaf10))


### BREAKING CHANGES

*   - format preprod subdomain with CI_COMMIT_TAG
  - refactor(app): better runtime error
* **COMPLETE REWORK**

`@socialgouv/kosko-charts` is now exposing component and environment
generators !
More docs soon ;)

# [2.0.0-alpha.11](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.10...v2.0.0-alpha.11) (2020-05-20)


### Bug Fixes

* **app:** add wildcard-crt as default cert ([65b2146](https://github.com/SocialGouv/kosko-charts/commit/65b21461f2bcde78c6d700b7a1b49ceb882b7f25))

# [2.0.0-alpha.10](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2020-05-20)


### Bug Fixes

* **gitlab:** use CI_PROJECT_NAME as namespace in prod ([f97d05e](https://github.com/SocialGouv/kosko-charts/commit/f97d05ed90b2b3a28c66edce97e7a145ab9bd5d5))
* **k8s:** use tagged image when available (2) ([15cca25](https://github.com/SocialGouv/kosko-charts/commit/15cca255103f5920fdcab5d7a921b374b37bfe4d))
* **k8s:** use tagged image when available (3) ([527687d](https://github.com/SocialGouv/kosko-charts/commit/527687da4b372de8c9fb340fe5a9b069910f46d7))

# [2.0.0-alpha.9](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2020-05-20)


### Bug Fixes

* **pkg:** missing utils files in published package ([1d92713](https://github.com/SocialGouv/kosko-charts/commit/1d92713b524aabbf6a556c34f1cd2e38cdd8d2cc))

# [2.0.0-alpha.8](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2020-05-20)


* feat!: format preprod subdomain with CI_COMMIT_TAG (#16) ([6a6d59e](https://github.com/SocialGouv/kosko-charts/commit/6a6d59ef661b50b8e5a64487e9a589ddb44dcefc)), closes [#16](https://github.com/SocialGouv/kosko-charts/issues/16)


### BREAKING CHANGES

*   - format preprod subdomain with CI_COMMIT_TAG
  - refactor(app): better runtime error

# [2.0.0-alpha.7](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2020-05-19)


### Features

* **env:** prefix app with gitlab env slug ([ffcaa3c](https://github.com/SocialGouv/kosko-charts/commit/ffcaa3c3e53fbb8f61f8077ca83958714e7c336e))

# [2.0.0-alpha.6](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2020-05-19)


### Features

* **component:** use undefined to disable annotations ([0e90f1a](https://github.com/SocialGouv/kosko-charts/commit/0e90f1a94bc79d35457ae5dc8527641e330960e9))

# [2.0.0-alpha.5](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2020-05-19)


### Bug Fixes

* **components:** allow ingress secretName override in app ([22346e8](https://github.com/SocialGouv/kosko-charts/commit/22346e870dc9a8901f2b1197ed8ec1dd9f89c5af))

# [2.0.0-alpha.4](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2020-05-19)


### Bug Fixes

* **github:** transfert built folder to release job (9) ([ca73944](https://github.com/SocialGouv/kosko-charts/commit/ca7394470092955aa1fb8d3d2f6be7b9c2d38b90))

# [2.0.0-alpha.3](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2020-05-19)


### Bug Fixes

* compile without composite option ([f78b9a0](https://github.com/SocialGouv/kosko-charts/commit/f78b9a07a4447c8f99b80682f75b50e6a19e98a2))
* **pkg:** missing files in published package ([05ea4c3](https://github.com/SocialGouv/kosko-charts/commit/05ea4c3d7f53f76e5155d79d4d03cd5f16323847))

# [2.0.0-alpha.2](https://github.com/SocialGouv/kosko-charts/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2020-05-19)


### Bug Fixes

* trigger patch release ([c1c2fd6](https://github.com/SocialGouv/kosko-charts/commit/c1c2fd679ad133c64d62df2d50749b2133160fbb))

# [2.0.0-alpha.1](https://github.com/SocialGouv/kosko-charts/compare/v1.0.2...v2.0.0-alpha.1) (2020-05-14)


* refactor(github)!: export generators ([4f502d0](https://github.com/SocialGouv/kosko-charts/commit/4f502d040f14bec93229e8b2cad29b4e03eeaf10))


### BREAKING CHANGES

* **COMPLETE REWORK**

`@socialgouv/kosko-charts` is now exposing component and environment
generators !
More docs soon ;)

## [1.0.2](https://github.com/SocialGouv/kosko-charts/compare/v1.0.1...v1.0.2) (2020-05-11)


### Bug Fixes

* **release:** update package.json file too ([423a59e](https://github.com/SocialGouv/kosko-charts/commit/423a59e1978c74643859760700056f656356c38c))

## [1.0.1](https://github.com/SocialGouv/kosko-charts/compare/v1.0.0...v1.0.1) (2020-05-07)


### Bug Fixes

* **release:** release on npm too ([182e3b9](https://github.com/SocialGouv/kosko-charts/commit/182e3b98e2a37745072674b2a27c278dd6cda845))

# 1.0.0 (2020-05-07)


* feat!: make a release ([1aa07b2](https://github.com/SocialGouv/kosko-charts/commit/1aa07b2d9ac10ca3b1f56e24b80d60ae6395261b))


### BREAKING CHANGES

* First release :tada:
````
