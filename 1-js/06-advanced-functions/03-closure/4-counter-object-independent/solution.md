
طبعًا، ستعمل كما يجب.

صُنعت الدالتين المتداخلتين في نفس البيئة المُعجمية الخارجية، بهذا تتشاركان نفس المتغير `‎count‎` وتصلان إليه:


```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
