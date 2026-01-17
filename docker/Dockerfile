FROM dunglas/frankenphp:1.11.1-php8.5.1-alpine AS php
# see also https://github.com/opencontainers/image-spec/blob/main/annotations.md
LABEL org.opencontainers.image.vendor="Ember Nexus" \
    org.opencontainers.image.authors="Sören Klein / Syndesi <soerenklein98@gmail.com>" \
    org.opencontainers.image.licenses="LicenseRef-Source-First-License-1.1" \
    org.opencontainers.image.source="https://github.com/ember-nexus/app-web" \
    org.opencontainers.image.title="App Web" \
    org.opencontainers.image.description="Experimental web app for the Ember Nexus knowledge graph API."

RUN apk add --no-cache \
		git \
        nodejs \
        npm \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY ./docker/Caddyfile /etc/frankenphp/Caddyfile
COPY ./docker/docker-entrypoint.sh /usr/local/bin/
RUN set -x \
    && chmod +x /usr/local/bin/docker-entrypoint.sh \
    && adduser -D worker \
	&& setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/frankenphp \
	&& chown -R worker:worker /config/caddy /data/caddy

STOPSIGNAL SIGTERM

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

WORKDIR /var/www/html
RUN rm -rf /app



FROM php AS production-build

COPY bin/console /var/www/html/bin/console
COPY config /var/www/html/config
COPY public /var/www/html/public
COPY src /var/www/html/src
COPY docker/.env.docker /var/www/html/.env
COPY composer.json /var/www/html/composer.json
COPY composer.lock /var/www/html/composer.lock
COPY LICENSE /var/www/html/LICENSE
RUN APP_ENV=prod COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader --no-cache \
    && rm -rf /usr/local/include/php \
    && mv /usr/local/lib/php/extensions /usr/local/lib/php_extensions \
    && rm -rf /usr/local/lib/php \
    && mkdir /usr/local/lib/php \
    && mv /usr/local/lib/php_extensions /usr/local/lib/php/extensions \
    && rm -rf /tmp/pear \
    && rm -rf /usr/src \
    && rm /usr/local/bin/php-cgi \
    && rm /usr/local/bin/phpdbg \
    && chown worker:worker -R /var/www/html



FROM scratch AS production
# see also https://github.com/opencontainers/image-spec/blob/main/annotations.md
LABEL org.opencontainers.image.vendor="Ember Nexus" \
    org.opencontainers.image.authors="Sören Klein / Syndesi <soerenklein98@gmail.com>" \
    org.opencontainers.image.licenses="LicenseRef-Source-First-License-1.1" \
    org.opencontainers.image.source="https://github.com/ember-nexus/app-web" \
    org.opencontainers.image.title="App Web" \
    org.opencontainers.image.description="Experimental web app for the Ember Nexus knowledge graph API."

COPY --from=production-build / /

STOPSIGNAL SIGTERM

#HEALTHCHECK --interval=30s --timeout=3s \
#  CMD php bin/console healthcheck

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

EXPOSE 80

WORKDIR /var/www/html

USER worker


FROM php AS development

COPY ./docker/php-embed/php.dev.ini "$PHP_INI_DIR/php.ini"

RUN apk add --no-cache \
    	bash

EXPOSE 80

USER worker

#HEALTHCHECK --interval=30s --timeout=3s \
#  CMD php bin/console healthcheck
