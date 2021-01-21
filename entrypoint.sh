#!/bin/sh

echo "Starting"
yarn --cwd be/ start &
P1=$!
echo "Starting 2"
nginx -g 'daemon off;' & 
P2=$!
echo "Starting 3"
wait $P1 $P2