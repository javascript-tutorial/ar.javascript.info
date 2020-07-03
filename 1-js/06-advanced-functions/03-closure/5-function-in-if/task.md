
### دالة في شرط if


طالِع الشيفرة أسفله. ما ناتج الاستدعاء في آخر سطر؟


```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
