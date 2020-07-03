importance: 5

---

# أي من المُتغيرات متاح؟

الدالة `makeWorker` بالإسفل تصنع دالة أخري وتعيدها. هذه الدالة المُعادة يمكن مناداتها من أي مكان.

هل ستحصل علي حق الوصول إلي المتغيرات الخارجية من موقع بنائها أم من موقع مناداتها أو من الاثنين؟


```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// create a function
let work = makeWorker();

// call it
work(); // what will it show?
```
أي قيمة سوف تظهر؟ "Pete" أم "John"؟

