## Todo list to create your stack

### In `/stacks` folder create the stack
  - [ ] add API stack for `POST /users`
    - [x] add function definition for `create.js`
  - [ ] add API stack for `GET /s3test`
    - [ ] add function definition for `get.js`
    - [ ] add permissions for `get.js` to access `bucket` in `blob-images-dev` service

### In `/src` folder create the handler functions
  - [x] create `create.js` handler
  - [ ] create `get.js` handler
    - [ ] add query of `bucket` in `blob-images-dev` service

### In `/npm` folder expose functions and arn info for client
  - [ ] expose url endpoint for API `GET /s3test`
  - [ ] expose url endpoint for API `POST /users`