#!/bin/sh

cd /app/be
node /app/be/index.js &
P1=$!
nginx -g 'daemon off;' & 
P2=$!
wait $P1 $P2