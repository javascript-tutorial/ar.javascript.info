الاهميه: 5

---

# استدعاء في سياق مصفوفه

 ماهي النتيجه؟ لماذا؟

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

