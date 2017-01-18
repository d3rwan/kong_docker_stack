Kong stack from scratch, with Docker
====================================

## Run (stack)
```
  # run (daemon)
  docker-compose up -d
  # show logs
  docker-compose logs -f
```

## Deployed stack

* API                   [ :3000]
* UI (Kong-Dashboard)   [ :8080]
* Kong (api gateway)    [ :8000]
* Kong (admin)          [ :8001]

## Demo

* create API
```
 curl -i -X POST http://localhost:8001/apis/ \
  --data 'name=GOT' \
  --data 'upstream_url=http://anapioficeandfire.com/api/' \
  --data 'request_path=/got/' \
  --data 'preserve_host=false'\
  --data 'strip_request_path=true'
```

* request API
```
curl -i -X GET http://localhost:8000/got/characters/583
```
*  enable apikey
```
curl -i -X POST http://localhost:8001/apis/GOT/plugins/ \
  --data 'name=key-auth' \
  --data 'config.key_names=apiKey'
```
*  request API
```
curl -i -X GET http://localhost:8000/got/characters/583
```
*  adding user
```
curl -i -X POST http://localhost:8001/consumers/ \
  --data "username=erwan"
```
*  adding user key
```
curl -i -X POST http://localhost:8001/consumers/erwan/key-auth \
  --data "key=secret"
```
*  request API
```
curl -i -X GET http://localhost:8000/got/characters/583
curl -i -X GET http://localhost:8000/got/characters/583?apiKey=secret
```
*  rate limiting
```
curl -X POST  http://localhost:8001/apis/GOT/plugins \
  --data "name=rate-limiting" \
  --data "config.hour=2"
```
*  request API
```
curl -i -X GET http://localhost:8000/got/characters/583?apiKey=secret'
curl -i -X GET http://localhost:8000/got/characters/583?apiKey=secret'
curl -i -X GET http://localhost:8000/got/characters/583?apiKey=secret'
```