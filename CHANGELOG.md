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
