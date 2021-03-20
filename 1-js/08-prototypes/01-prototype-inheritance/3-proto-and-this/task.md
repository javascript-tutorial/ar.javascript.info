_الأهمية: 5_

---

#  أين سيحدث التعديل؟

لدينا الكائن `rabbit` يرث من الكائن `animal`.

لو استدعينا `rabbit.eat()‎` فأيّ الكائنين ستُعدل به الخاصية `full`، الكائن `animal` أم الكائن `rabbit`؟


```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
