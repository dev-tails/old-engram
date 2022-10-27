FROM nginx

WORKDIR /engram

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=engramapp/auth /auth/static ./auth/static