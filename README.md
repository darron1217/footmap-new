# 푸트맵 프로젝트

## 프로젝트 소개

### 개발 개요 & 개발 타겟
간단하게 요깃거리를 찾지만 마땅한 먹거리를 찾기 힘들었던 소비자들<br>
내 주위에 어떤 푸드트럭들이 있는지 궁금했던 소비자들<br>
푸드트럭에서 메뉴를 주문하고 싶지만 대기 시간이 너무 길어 감당이 되지 않던 소비자들<br>
푸드트럭 판매 장소를 옮길 때 마다 마땅한 홍보 플랫폼을 찾기 힘들었던 공급자들.<br>

이러한 소비자와 공급자의 고민을 해결하기 위해 웹 애플리케이션 **푸트맵**을 만들었습니다.

### 프로젝트 

<img src="https://github.com/darron1217/footmap-new/blob/master/resources/screenshot1_home.gif?raw=true">

## 목차

- [컴퓨터 구성 / 필수 조건 안내 (Prerequisites)](#컴퓨터-구성--필수-조건-안내-prerequisites)
- [설치 안내 (Installation Process)](#설치-안내-installation-process)
- [사용법 (Getting Started)](#사용법-getting-started)
- [파일 정보 및 목록 (File Manifest)](#파일-정보-및-목록-file-manifest)
- [저작권 및 사용권 정보 (Copyright / End User License)](#저작권-및-사용권-정보-copyright--end-user-license)
- [배포자 및 개발자의 연락처 정보 (Contact Information)](#배포자-및-개발자의-연락처-정보-contact-information)
- [알려진 버그 (Known Issues)](#알려진-버그-known-issues)
- [문제 발생에 대한 해결책 (Troubleshooting)](#문제-발생에-대한-해결책-troubleshooting)
- [크레딧 (Credit)](#크레딧-credit)
- [업데이트 정보 (Change Log)](#업데이트-정보-change-log)

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
  * Node (v10.16.3)
  * NPM (v6.9.0)
  * Json-server (v0.15.1)

## 설치 안내 (Installation Process)

### 프로젝트 설치
```
npm install
```

### Json Server 설치 (글로벌 설치)
```
npm install -g json-server
```

## 사용법 (Getting Started)

### Json Server DB 구동
```
npm run api
```

### 프로젝트 실행
```
npm run serve
```

### 사이트 접속
```
Web: http://localhost:8080
DB : http://localhost:3000/${TableName}
```
| TableName | Meaning |
|-----------|:-------:|
| `trucks`  | 현재 등록된 푸드트럭들의 테이블          |
| `orders`  | 주문내역을 저장한 테이블                |
| `foods`   | 푸드트럭마다 저장된 모든 음식들의 테이블 |

## 파일 정보 및 목록 (File Manifest)

```sh
Github
  │  README.md
  │  db.json
  │  package.json
  │  middleware.js
  └─src
     │   App.vue
     │   main.js
     ├─views
     │   AdminTruck.vue
     │   AdminTruckDetail.vue
     │   Home.vue
     │   LoginView.vue
     │   Truck.vue
     ├─components
     │   TruckModal.vue
     └─router
         index.js
```

## 저작권 및 사용권 정보 (Copyright / End User License)

The Footmap is open-source software licensed under the MIT license.

## 배포자 및 개발자의 연락처 정보 (Contact Information)

+ Team Name: Food Finder
  - 공군 중위 강 찬   (blizzard1107@gmail.com)
  - 육군 상병 이 종아 (whddk4415@gmail.com)
  - 육군 상병 박 관영 (darron1217@gmail.com)

## 알려진 버그 (Known Issues)

- None

## 문제 발생에 대한 해결책 (Troubleshooting)

[Github 리포지토리](https://github.com/darron1217/footmap-new/)에 Issue를 등록해주세요! 언제나 환영입니다!

## 크레딧 (Credit)

- Maintainers : @LieutenantKang, @whddk4415, @darron1217

## 업데이트 정보 (Change Log)

[CHANGELOG.md](https://github.com/darron1217/footmap-new/blob/master/CHANGELOG.md)
