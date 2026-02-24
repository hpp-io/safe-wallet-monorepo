# 1) Build stage
FROM node:20-alpine AS build
WORKDIR /app

# node-gyp(네이티브 모듈) 빌드에 필요한 툴체인
RUN apk add --no-cache python3 make g++

# Corepack 활성화 및 Yarn 4.12.0 설정
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# Yarn 설정 파일 복사 (Yarn 4 사용을 위해 필수)
COPY .yarnrc.yml ./.yarnrc.yml

# package.json과 yarn.lock만 먼저 복사 (레이어 캐싱)
COPY apps/tx-builder/package.json ./package.json
COPY yarn.lock ./yarn.lock

# 의존성 설치 (standalone 모드, Yarn 4)
RUN yarn install --mode=skip-build

# 소스 코드 복사
COPY apps/tx-builder ./

# 빌드 (build 디렉토리 생성)
RUN yarn build


# 2) Runtime stage (nginx로 정적 서빙)
FROM nginx:1.26-alpine AS runtime

# /tx-builder 서브패스 서빙 + SPA 라우팅 대응 nginx 설정
COPY apps/tx-builder/nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 산출물 복사 (vite.config.ts의 outDir이 'build'로 설정됨)
COPY --from=build /app/build /usr/share/nginx/html/tx-builder

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
