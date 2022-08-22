أولاً ، دعنا نرى لماذا لا يعمل الكود الأخير.

يصبح السبب واضحًا إذا حاولنا تشغيله. يجب على مُنشئ الفصل الموروث استدعاء `` super () `. وإلا فلن يتم تحديد "هذا" ".

إذن هذا هو الإصلاح:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // need to call the parent constructor when inheriting
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

لكن هذا ليس كل شيء بعد.

<<<<<<< HEAD
حتى بعد الإصلاح ، لا يزال هناك اختلاف مهم في "class rabbit يوسع الكائن" "مقابل" class Rabbit ".
=======
Even after the fix, there's still an important difference between `"class Rabbit extends Object"` and `class Rabbit`.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

كما نعلم ، فإن الصيغة "الممتدة" تضع نموذجين أوليين:

1. بين "النموذج" لوظائف المنشئ (للطرق).
2. بين وظائف المنشئ أنفسهم (للأساليب الثابتة).

<<<<<<< HEAD
في حالتنا ، تعني كلمة "أرنب يمتد الكائن" ما يلي:
=======
In the case of `class Rabbit extends Object` it means:
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

<<<<<<< HEAD
إذن يوفر "الأرنب" الآن إمكانية الوصول إلى الأساليب الثابتة لـ "الكائن" عبر "الأرنب" ، على النحو التالي:
=======
So `Rabbit` now provides access to the static methods of `Object` via `Rabbit`, like this:
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

```js run
class Rabbit extends Object {}

*!*
// normally we call Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

ولكن إذا لم يكن لدينا `Extended Object` ، فلن يتم تعيين` Rabbit .__ proto__` على `Object`.

هنا هو العرض التوضيحي:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // as any function by default

*!*
// error, no such function in Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

لذا `Rabbit` لا يوفر الوصول إلى الأساليب الثابتة لـ "الكائن" في هذه الحالة.

<<<<<<< HEAD
بالمناسبة ، يحتوي `Function.prototype` على طرق وظيفية" عامة "، مثل` call` و` bind` وما إلى ذلك. وهي متاحة في النهاية في كلتا الحالتين ، لأن مُنشئ `Object` المدمج ،` Object .__ proto__ = == Function.prototype`.
=======
By the way, `Function.prototype` also has "generic" function methods, like `call`, `bind` etc. They are ultimately available in both cases, because for the built-in `Object` constructor, `Object.__proto__ === Function.prototype`.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

ها هي الصورة:

![](rabbit-extends-object.svg)

لذلك ، باختصار ، هناك اختلافان:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | needs to call `super()` in constructor |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
