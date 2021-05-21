FROM node:16.2-buster-slim
LABEL Name=nostalgic Version=1.3.2

ARG DEBIAN_FRONTEND="noninteractive"
RUN apt-get update && apt-get install -y --no-install-recommends \
        bash \
        build-essential \
        bzip2 \
        curl \
        git \
        less \
        locales \
        nano \
        pkg-config \
        software-properties-common \
        tar \
        unzip \
        wget \
        xz-utils && \
    rm -rf /var/lib/apt/lists/* && \
    localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

ENV LANG en_US.utf8

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
COPY . .
