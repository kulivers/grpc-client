#!/bin/bash

PROTO_DIR=.

# Generate JavaScript code - INDUS CODE
#npm run grpc_tools_node_protoc \
#    --js_out=import_style=commonjs,binary:${PROTO_DIR} \
#    --grpc_out=${PROTO_DIR} \
#    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
#    -I ./proto \
#    proto/*.proto


#my below
protoc --proto_path=. *.proto --js_out=import_style=commonjs:.

protoc --proto_path=. *.proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.