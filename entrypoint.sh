#!/bin/sh

yarn --cwd be/ start &
P1=$!
nginx -g 'daemon off;' & 
P2=$!
wait $P1 $P2