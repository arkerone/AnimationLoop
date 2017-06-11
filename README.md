# AnimationLoop
AnimationLoop.js is a javascript class used to create a loop for games or animations.

## Quick Start

#### 1) Create a function for your animation
```javascript
function animation(elapsed) {
   // ...
}
```

#### 2) Create an instance of AnimationLoop and pass the function as a parameter 
```javascript
const animationLoop = new AnimationLoop(animation);
```

#### 3) Start the loop
```javascript
animationLoop.start();
```

## API

### new AnimationLoop(callback)
Constructs a AnimationLoop object with the callback function.

### start()
Start the loop. The callback function is called each usually 60 times per second,  but will generally match the display 
refresh rate.

### stop()
Stop the loop.

## Examples

See `example` for more complex examples.

## License
The MIT License (MIT)

Copyright (c) 2017 Axel SHAÏTA <shaita.axel@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
