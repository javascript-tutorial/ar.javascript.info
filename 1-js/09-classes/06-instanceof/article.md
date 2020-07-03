# فحص الأصناف عبر instanceof

يُتيح لنا المُعامل `instanceof` (أهو سيرورة من) فحص هل الكائن ينتمي إلى الصنف الفلاني؟ كما يأخذ الوراثة في الحسبان عند الفحص.

توجد حالات عديدة يكون فيها هذا الفحص ضروريًا. **سنستعمله هنا لصناعة دالة **، أي دالة تغيّر تعاملها حسب نوع الوسطاء الممرّرة لها.

## معامل instanceof

صياغته هي:

```js
obj instanceof Class
```

يُعيد المُعامل قيمة `true` لو كان الكائن `obj` ينتمي إلى الصنف `Class` أو أيّ صنف يرثه.

مثال:


```js run
class Rabbit {}
let rabbit = new Rabbit();

// ‫هل هو كائن من الصنف Rabbit؟
*!*
alert( rabbit instanceof Rabbit ); // نعم
*/!*
```

كما يعمل مع الدوال البانية:

```js run
*!*
// ‫بدل استعمال class
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // نعم
```

...كما والأصناف المضمّنة مثل المصفوفات `Array`:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // نعم
alert( arr instanceof Object ); // نعم
```

لاحظ كيف أنّ الكائن `arr` ينتمي إلى صنف الكائنات `Object` أيضًا، إذ ترث المصفوفات -عبر prototype- الكائناتَ.

عادةً ما يتحقّق المُعامل `instanceof` من سلسلة prototype عند الفحص. كما يمكننا وضع المنطق الذي نريد لكلّ صنف في التابِع الثابت `Symbol.hasInstance`.

تعمل خوارزمية `obj instanceof Class` بهذه الطريقة تقريبًا:

1. لو وجدت التابِع الثابت `Symbol.hasInstance` تستدعيه وينتهي الأمر: `Class[Symbol.hasInstance](obj)‎`. يُعيد التابِع إمّا `true` وإمّا `false`. هكذا نخصّص سلوك المُعامل `instanceof`.

    مثال:


    ```js run
    // ‫ضبط instanceOf للتحقق من الافتراض القائل
    // ‫بأن كل شيء يملك الخاصية canEat هو حيوان
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };

    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called
    ```

2. ليس لأغلب الأصناف التابِع `Symbol.hasInstance`. في هذه الحالة تستعمل المنطق العادي: يفحص `obj instanceOf Class` لو كان كائن `Class.prototype` مساويًا لأحد كائنات prototype في سلسلة كائنات prototype للكائن `obj`.

    وبعبارة أخرى ، وازن بينهم واحدًا تلو الآخر:

    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
    // ‫لو كانت إجابة أيًا منها true، فتُعيد true
    // ‫وإلّا متى وصلت نهاية السلسلة أعادت false

    ```

    في المثال أعلاه نرى `rabbit.__proto__ === Rabbit.prototype`، بذلك تُعطينا الجواب مباشرةً.

    أمّا لو كنّا في حالة وراثة، فستتوقّف عملية المطابقة عند الخطوة الثانية:


    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // نعم
    */!*

    // rabbit.__proto__ === Rabbit.prototype
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (تطابق!)
    */!*
    ```

إليك صورة توضّح طريقة موازنة `rabbit instanceof Animal` مع `Animal.prototype`:

![](instanceof.svg)

كما وهناك أيضًا التابِع [objA.isPrototypeOf(objB)‎](mdn:js/object/isPrototypeOf)، وهو يُعيد `true` لو كان الكائن `objA` في مكان داخل سلسلة prototype للكائن `objB`. يعني أنّنا نستطيع كتابة الفحص هذا `obj instanceof Class` هكذا: `Class.prototype.isPrototypeOf(obj)‎`.

الأمر مضحك إذ أنّ باني الصنف `Class` نفسه ليس لديه أيّ كلمة عن هذا الفحص! المهم هو سلسلة prototype وكائن `Class.prototype` فقط.

يمكن أن يؤدّي هذا إلى عواقب مثيرة متى تغيّرت خاصية `prototype` للكائن بعد إنشائه. طالع:


```js run
function Rabbit() {}
let rabbit = new Rabbit();

// غيّرنا كائن prototype
Rabbit.prototype = {};

// ...لم يعد أرنبًا بعد الآن!
*!*
alert( rabbit instanceof Rabbit ); // لا
*/!*
```

## التابع Object.prototype.toString للأنواع

نعلم بأنّ الكائنات العادية حين تتحوّل إلى سلاسل نصية تصير `[object Object]`:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // كما أعلاه
```

يعتمد هذا على طريقة توفيرهم لتنفيذ التابِع `toString`. ولكن هناك ميزة مخفيّة تجعل هذا التابِع أكثر فائدة بكثير ممّا هو عليه، أن نستعمله على أنّه مُعامل `typeof` موسّع المزايا، أو بديلًا عن التابِع `toString`.

تبدو غريبة؟ أليس كذلك؟ لنُزل الغموض.


حسب [المواصفة](https://tc39.github.io/ecma262/#sec-object.prototype.tostring)، فيمكننا استخراج التابِع `toString` المضمّن من الكائن وتنفيذه في سياق أيّ قيمة أخرى نريد، وسيكون ناتجه حسب تلك القيمة.

- لو كان عددًا، فسيكون `[object Number]`
- لو كان قيمة منطقية، فسيكون `[object Boolean]`
- لو كان `null`: ‏`[object Null]`
- لو كان `undefined`: ‏`[object Undefined]`
- لو كانت مصفوفة: `[object Array]`
- ...إلى آخره (ويمكننا تخصيص ذلك).

هيًا نوضّح:


```js run
// ننسخ التابِع‫ toString إلى متغير ليسهل عملنا
let objectToString = Object.prototype.toString;

// ما هذا النوع؟
let arr = [];

alert( objectToString.call(arr) ); // [object *!*مصفوفة*/!*]
```

استعملنا هنا [call](mdn:js/function/call)“ لتنفيذ الدالة `objectToString` بسياق `this=arr`.

تفحص خوارزمية `toString` داخليًا قيمة `this` وتُعيد الناتج الموافق لها. إليك أمثلة أخرى:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### خاصية Symbol.toStringTag

يمكننا تخصيص سلوك التابِع `toString` للكائنات باستعمال خاصية الكائنات `Symbol.toStringTag` الفريدة.

مثال:


```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

لأغلب الكائنات الخاصّة بالبيئات خاصية مثل هذه. إليك بعض الأمثلة من المتصفّحات مثلًا:

```js run
// تابِع ‫toStringTag للكائنات والأصناف الخاصّة بالمتصفّحات:
alert( window[Symbol.toStringTag]); // window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

كما نرى فالناتج هو تمامًا ما يقوله `Symbol.toStringTag` (لو وُجد) بغلاف `[object ...‎]`.

في النهاية نجد أن لدينا "نوع من المنشطات" لا تعمل فقط على الأنواع الأولية للبيانات بل وحتى الكائنات المضمنة في اللغة ويمكننا تخصيصها أيضًا.

يمكننا استخدام `‎{}.toString.call` بدلًا من `instanceof` للكائنات المضمنة في اللغة عندما نريد الحصول على نوع البيانات كسلسلة بدلًا من التحقق منها.


## الملخص

لنلخّص ما نعرف عن التوابِع التي تفحص الأنواع:

| | يعمل على | يُعيد |
|--|--|--|
| `typeof` | الأنواع الأولية | سلسلة نصية |
| `{}.toString` | الأنواع الأولية والكائنات المضمّنة والكائنات التي لها `Symbol.toStringTag` | سلسلة نصية |
| `instanceof` | الكائنات | true/false |


كما نرى فعبارة `‎{}.toString` هي تقنيًا `typeof` ولكن ”متقدّمة أكثر“.

بل إن التابع `instanceof` يؤدي دور مميّز عندما نتعامل مع تسلسل هرمي للأصناف ونريد التحقق من صنفٍ ما مع مراعاة الوراثة.

