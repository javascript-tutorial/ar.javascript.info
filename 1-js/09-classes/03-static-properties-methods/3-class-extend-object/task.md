درجة الأهمية: 3

---

# فئة تمدد الكائن؟

كما نعلم ، عادة ما ترث جميع الكائنات من `Object.prototype` وتحصل على طرق للكائنات" العامة "مثل` hasOwnProperty` وما إلى ذلك.

على سبيل المثال:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// hasOwnProperty method is from Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

ولكن إذا وضحناها صراحة مثل "class class rabbit Extended Object" ، فستكون النتيجة مختلفة عن "class rabbit" بسيطة؟

ماهو الفرق؟

فيما يلي مثال لمثل هذا الرمز (لا يعمل - لماذا؟ إصلاحه؟):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
