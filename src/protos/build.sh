#!/bin/bash

PROTO_DIR=.
OUT_DIR=.

# Generate JavaScript code - INDUS CODE
#npm run grpc_tools_node_protoc \
#    --js_out=import_style=commonjs,binary:${PROTO_DIR} \
#    --grpc_out=${PROTO_DIR} \
#    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
#    -I ./proto \
#    proto/*.proto


#my below
protoc -IPATH=$PROTO_DIR *.proto \
    --js_out=import_style=commonjs:$OUT_DIR \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$OUT_DIR


# protoc --proto_path=. --js_out=import_style=commonjs:. test1.proto
#protoc --proto_path=. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:. test1.proto




# ниже - это для json
#D:\Playground\test-react-grpc-proj\src\protos>pbjs -t json greet.proto > greet.json