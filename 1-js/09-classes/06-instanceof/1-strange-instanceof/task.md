
_الأهمية: 5_

---

## instnaceof غريب 

في الشيفرة أسفله، لماذا يُعيد `instanceof` القيمة `true`. يتّضح جليًا بأنّ `B()‎` لم يُنشِئ `a`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
