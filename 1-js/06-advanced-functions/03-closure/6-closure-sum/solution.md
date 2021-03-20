ليعمل القوسين الثانيين، يجب أن يُعيد الأوليين دالة.

هكذا:


```js run
function sum(a) {

  return function(b) {
    return a + b; // takes "a" from the outer lexical environment
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

