importance: 3

---

# تفسير القيمة الخاصه بـ "this"

في الشيفرة بالأسفل نريد تنفيذ `obj.go()` 4 مرات.

لكن تنفيذ `(1)` و `(2)` يكون مختلف عن تنفيذ `(3)` 4 `(4)`. لماذا?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

