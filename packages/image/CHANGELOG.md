# @readr-media/react-image Changelog

## 2023-09-04, Version 2.1.3

### Notable Changes
- Handle error when params `images` is null.


### Commits
* \[[`9728454bfb`](https://github.com/readr-media/react-image/commit/9728454bfb)] - fix(image): handle error when param `images` is `null` (DianYangFu)
* \[[`ebcb8b22dd`](https://github.com/readr-media/react-image/commit/ebcb8b22dd)] - chore(image): bump version into `2.1.3` (DianYangFu)


## 2023-09-01, Version 2.1.2

### Notable Changes
- Fix problem of unable load images if not pass props `imagesWebP`.


### Commits
* \[[`e855d4e8fe`](https://github.com/readr-media/react-image/commit/e855d4e8fe)] - fix(image): unable load image if not pass props `imagesWebP` (DianYangFu)
* \[[`daac8a00e0`](https://github.com/readr-media/react-image/commit/daac8a00e0)] - chore(image): bump version into `2.1.2` (DianYangFu)


## 2023-08-31, Version 2.1.1

### Notable Changes
- Fix problem of unable load `.webp` image which size is `original`.


### Commits
* \[[`415a9499bf`](https://github.com/readr-media/react-image/commit/415a9499bf)] - fix(image): unable load webp image of original size (DianYangFu)
* \[[`a2b28631dd`](https://github.com/readr-media/react-image/commit/a2b28631dd)] - chore(image): bump version into `2.1.1` (DianYangFu)


## 2023-08-31, Version 2.1.0

### Notable Changes
- Improve code readability, use `async/await` to replace Promise `.then/.catch`. 
- Support sequential loading `.webp` images.


### Commits
* \[[`13c393601f`](https://github.com/readr-media/react-image/commit/13c393601f)] - refactor(image): replace Promise `.then/.catch` to `async/await` (DianYangFu)
* \[[`81ca44c521`](https://github.com/readr-media/react-image/commit/81ca44c521)] - feat(image): support webp format (DianYangFu)
* \[[`3a8c4e810c`](https://github.com/readr-media/react-image/commit/3a8c4e810c)] - doc(image): update README.md (DianYangFu)
* \[[`0b41d9e91b`](https://github.com/readr-media/react-image/commit/0b41d9e91b)] - chore(image): bump version to `2.1.0` (DianYangFu)



## 2023-08-30, Version 2.0.0

### Notable Changes
- Support ES Modules


### Commits
* \[[`6a75564022`](https://github.com/readr-media/react-image/commit/6a75564022)] - chore(image): update Makefile, tsconfig, package.json to support ESM (DianYangFu)
* \[[`069ab5d720`](https://github.com/readr-media/react-image/commit/069ab5d720)] - chore(image): update webpack.config.js to fit module type (DianYangFu)
* \[[`aac8f3fe8a`](https://github.com/readr-media/react-image/commit/aac8f3fe8a)] - chore(image): add devDep `@babel/plugin-transform-runtime` (DianYangFu)
* \[[`98a0ef9866`](https://github.com/readr-media/react-image/commit/98a0ef9866)] - chore(image): update file import path to support module type (DianYangFu)
* \[[`8ece49249f`](https://github.com/readr-media/react-image/commit/8ece49249f)] - chore(image): add `.babelrc.js` (DianYangFu)
* \[[`faf3363155`](https://github.com/readr-media/react-image/commit/faf3363155)] - refactor(image): add folder types to place `@typedef`, export type (DianYangFu)
* \[[`3de9078e01`](https://github.com/readr-media/react-image/commit/3de9078e01)] - doc(image): update README.md (DianYangFu)
* \[[`f8203e8527`](https://github.com/readr-media/react-image/commit/f8203e8527)] - chore(image): bump version into `2.0.0` (DianYangFu)
* \[[`c58f2900e9`](https://github.com/readr-media/react-image/commit/c58f2900e9)] - doc(image): update CHANGELOG.md (DianYangFu)


## 2023-05-14, Version 1.6.0

### Notable Changes
- add param `intersectionObserverOptions` to control observers for lazy-loading image. 


### Commits
* \[[`b7bf2b7d15`](https://github.com/readr-media/react-image/commit/b7bf2b7d15)] - chore(image): bump version into 1.6.0 (DianYangFu)
* \[[`4d163026bb`](https://github.com/readr-media/react-image/commit/4d163026bb)] - docs(image): update README.md (DianYangFu)
* \[[`c2ea7e9333`](https://github.com/readr-media/react-image/commit/c2ea7e9333)] - refactor(image): update mock data (DianYangFu)
* \[[`8e22f948c2`](https://github.com/readr-media/react-image/commit/8e22f948c2)] - feat(image): add param `intersectionObserverOptions` (DianYangFu)


## 2023-03-17, Version 1.5.1

### Notable Changes
- fix issue that image path with special characters doesn't load

### Commits
* \[[`67e8c38463`](https://github.com/readr-media/react-image/commit/67e8c38463)] - chore(image): bump version to 1.5.1 (Tsuki Akiba)
* \[[`1c4e52c12b`](https://github.com/readr-media/react-image/commit/1c4e52c12b)] - refactor(image): fix image path with special characters (Tsuki Akiba)
* \[[`43bb7e6feb`](https://github.com/readr-media/react-image/commit/43bb7e6feb)] - docs(image): update CHANGELOG (Tsuki Akiba)
* \[[`e6a7109524`](https://github.com/readr-media/react-image/commit/e6a7109524)] - chore(image): bump version to 1.5.0 (Tsuki Akiba)
* 
## 2023-03-17, Version 1.5.0

### Notable Changes
- fix issue that image path with special characters doesn't load

### Commits
* \[[`a910b6ba73`](https://github.com/readr-media/react-image/commit/a910b6ba73)] - chore(image): bump version to 1.5.0 (Tsuki Akiba)
* \[[`6c840c12d2`](https://github.com/readr-media/react-image/commit/6c840c12d2)] - refactor(image): fix image path with special characters (Tsuki Akiba)
* \[[`273c165155`](https://github.com/readr-media/react-image/commit/273c165155)] - docs(image): update CHANGELOG.md (Tsuki Akiba)

## 2023-03-17, Version 1.4.2

### Notable Changes
- fix JSDoc comments

### Commits
* \[[`67eadfedf7`](https://github.com/readr-media/react-image/commit/67eadfedf7)] - chore(image): bump version to 1.4.2 (Tsuki Akiba)
* \[[`55bf8a5b92`](https://github.com/readr-media/react-image/commit/55bf8a5b92)] - refactor(image): fix JSDoc comments (Tsuki Akiba)
* \[[`00818d8d52`](https://github.com/readr-media/react-image/commit/00818d8d52)] - docs(image): update CHANGELOG.md (Tsuki Akiba)

## 2023-03-17, Version 1.4.1

### Notable Changes
- fix generated `sizes` format

### Commits
* \[[`28b5e0df7b`](https://github.com/readr-media/react-image/commit/28b5e0df7b)] - Merge branch 'main' of <https://github.com/readr-media/react> (Tsuki Akiba)
* \[[`fb09d56c65`](https://github.com/readr-media/react-image/commit/fb09d56c65)] - chore(image): bump version to 1.4.1 (Tsuki Akiba)
* \[[`197ab1408c`](https://github.com/readr-media/react-image/commit/197ab1408c)] - refactor(image): fix `sizes` format issues (Tsuki Akiba)
* \[[`a6b774089c`](https://github.com/readr-media/react-image/commit/a6b774089c)] - docs(image): update CHANGELOG.md (Tsuki Akiba)
* \[[`9c54185cd1`](https://github.com/readr-media/react-image/commit/9c54185cd1)] - Merge branch 'main' of <https://github.com/readr-media/react> (Tsuki Akiba)

## 2023-03-16, Version 1.4.0

### Notable Changes
- make default value of `sizes` configurable

### Commits
* \[[`573832a09c`](https://github.com/readr-media/react-image/commit/573832a09c)] - chore(image): bump version to 1.4.0 (Tsuki Akiba)
* \[[`e520405226`](https://github.com/readr-media/react-image/commit/e520405226)] - docs(image): update `rwd` prop description (Tsuki Akiba)
* \[[`4900aeb881`](https://github.com/readr-media/react-image/commit/4900aeb881)] - refactor(image): make default value of sizes configurable (Tsuki Akiba)
* \[[`6aa3cfc7b8`](https://github.com/readr-media/react-image/commit/6aa3cfc7b8)] - chore(image): bump version to 1.3.0 (Tsuki Akiba)
* \[[`de8ead1ca3`](https://github.com/readr-media/react-image/commit/de8ead1ca3)] - docs(image): add CHANGELOG.md (Tsuki Akiba)

## 2023-03-14, Version 1.3.0

### Notable Changes
- add `priority` props to control image preload or lazy loading
- remove unused codes
- add type declaration file generation to build process

### Commits
* \[[`0de2fe311f`](https://github.com/readr-media/react-image/commit/0de2fe311f)] - chore(image): add type generation to build process (Tsuki Akiba)
* \[[`86d43b70d9`](https://github.com/readr-media/react-image/commit/86d43b70d9)] - refactor(image): remove unused codes (Tsuki Akiba)
* \[[`1d8a280bb8`](https://github.com/readr-media/react-image/commit/1d8a280bb8)] - feat(image): add `priority` props (Tsuki Akiba)


## 2023-02-09, Version 1.2.2

### Commits
* \[[`15abdc01c5`](https://github.com/readr-media/react-image/commit/15abdc01c5)] - fix(image): unable set src of imageRef on unexpected error (#122) (Dian-Yang Fu)

## 2023-02-07, Version 1.2.1

### Commits
* \[[`e229d8a0f8`](https://github.com/readr-media/react-image/commit/e229d8a0f8)] - fix(image): unable render defaultImage if images is not existed (#121) (Dian-Yang Fu)

## 2023-02-04, Version 1.2.0

### Commits
* \[[`2d15ed447b`](https://github.com/readr-media/react-image/commit/2d15ed447b)] - refactor(image): remove param loadMode, loadResolution and change way of loading image (#120) (Dian-Yang Fu)

## 2023-02-03, Version 1.1.1

### Commits
* \[[`2f44dbdabc`](https://github.com/readr-media/react-image/commit/2f44dbdabc)] - fix(image): unable auto load if images only one property (#119) (Dian-Yang Fu)

## 2023-02-01, Version 1.1.0

### Commits
* \[[`a2b897d875`](https://github.com/readr-media/react-image/commit/a2b897d875)] - feat(image): add different mode of loading image (#117) (Dian-Yang Fu)

## 2023-01-13, Version 1.0.0

### Commits
* \[[`a5cc4ed5f6`](https://github.com/readr-media/react-image/commit/a5cc4ed5f6)] - **feat**: add package `react-image` (#115) (Dian-Yang Fu)

---
*Changelog is generated by [changelog-maker](https://www.npmjs.com/package/changelog-maker)*