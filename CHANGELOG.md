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
