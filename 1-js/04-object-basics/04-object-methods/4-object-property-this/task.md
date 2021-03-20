الأهمية: 5

---

# استخدام `this` في الكائن معرَّف باختصار عبر الأقواس

تُرجِع الدالة `makeUser` كائنًا هنا. ما النتيجة من الدخول إلى `ref` الخاص بها؟ ولماذا؟

What is the result of accessing its `ref`? Why?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // ما النتيجة؟
```

