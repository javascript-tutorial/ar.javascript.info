_الأهمية: 5_

---

### كائن عد

هنا صنعنا كائن عدّ بمساعدة دالة مُنشئة _Constructor Function_.

هل ستعمل؟ ماذا سيظهر؟


```js
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

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

