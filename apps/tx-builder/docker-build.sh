#!/bin/bash
# tx-builder 도커 빌드 스크립트
cd "$(dirname "$0")/../.." || exit
docker build -t tx-builder:local -f apps/tx-builder/Dockerfile .
