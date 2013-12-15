# node-validator

_node-validator_ is a simple, extensible object property validator for node.js

In the very near future it will include express.js middleware functionality for automatically validating request body content.

## Example
```javascript
var validator = require('node-validator');

var child = validator.isObject()
  .withRequired('prop', validator.isString({ regex: /[abc]+/ }));

var test = validator.isObject()
  .withRequired('_id', validator.isString({ regex: /[abc]+/ }))
  .withOptional('date', validator.isIsoDate())
  .withOptional('children', validator.isArray(child, {min: 1}));

var toValidate = {
  "_id": 'abababa',
  "date": '2013-10-24',
  "children": [{
    "prop": 'zxzx'
  }]
};

validator.run(test, toValidate, function(errorCount, errors) {
  // will return:
  // errorCount=1
  // errors=[{"message":'Invalid value. Value must match required pattern.',"parameter":'children[0].prop',"value":'zxzx'}]
});
```
## Installation

    $ npm install node-validator

## License

(The MIT License)

Copyright (c) 2013

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.