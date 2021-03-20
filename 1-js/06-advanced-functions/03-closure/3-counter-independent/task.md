_الأهمية: 5_

---

### هل العدّادات مستقلة عن بعضها البعض؟

صنعنا هنا عدّادين اثنين `‎counter‎` و `‎counter2‎` باستعمال ذات الدالة `‎makeCounter‎`.

هل هما مستقلان عن بعضهما البعض؟ ما الذي سيعرضه العدّاد الثاني؟ `‎0,1‎` أم `‎2,3‎` أم ماذا؟

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

