# الأساليب البدائية للبيانات

جافا سكريبت تتيح لنا العمل بالأساليب البدائية (strings, numbers, etc.) كما لو كانت objects. كما أنها توفر وسائل للأتصال علي هذا النحو. وسندرسها قريبا, لكن أولاً سنرى كيف يعمل لأن الأساليب البدائية ليست objects
(وهنا سنجعله أكثر وضوحاً).

لننظر إلى الفروق الرئيسية بين الأساليب البدائية و objects .

بدائية

- هو قيمة من النوع البدائي.
- هناك 7 أنواع بدائية: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` أيضا `undefined`.

An object

- قادر على تخزين قيم متعددة كخصائص.
- يمكن تكوينه بواسطة `{}`, على سبيل المثال: `{name: "John", age: 30}`. هناك أنواع أخرى من objects في جافا سكريبت: functions, على سبيل المثال,  objects.

أحد أفضل الأشياء في ال objects هو أنه يمكننا أن نخزن a function كأحد خصائصها.

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

إذاً هنا صنعنا an object `john` مع ال  `sayHi` method.

العديد من ال built-in objects موجودة بالفعل, مثل تلك التي تعمل مع التواريخ و الأخطاء و عناصر HTML , إلخ. فلهم خصائص وأساليب مختلفة.

ولكن ، تأتي هذه الميزات بتكلفة!

Objects  "اثقل" من الأساليب البدائية. وهي تتطلب موارد إضافية لدعم الآلية الداخلية.

## بدائي كا an object

هنا التناقض الذي واجه صانع جافا سكريبت:

<<<<<<< HEAD
- هناك العديد من الأشياء التي يمكن أن يفعلها الشخص بالأسلوب البدائي مثل  string أو  number. سيكون من الرائع استخدامهم كا methods.
- الأساليب البدائية يجب أن تكون سريعة وخفيفة بقدر الإمكان.
=======
- There are many things one would want to do with a primitive like a string or a number. It would be great to access them using methods.
- Primitives must be as fast and lightweight as possible.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

إن الحل يبدو غريبا بعض الشيء، ولكن ها هو:

1. الأساليب البدائية  ما زالت بدائية. قيمة واحدة, كما يحلو لها.
2. تسمح اللغة بالوصول الي ال  methods و الخصائص الخاصة ب strings, numbers, booleans و symbols.
3. ولكي يعمل ذلك، يتم إنشاء "object wrapper" خاص يوفر الوظائف الإضافية، ثم يتم تدميره.

<<<<<<< HEAD
ال "object wrappers" تختلف لكل نوع بدائي و تدعى: `String`, `Number`, `Boolean` و `Symbol`. وبالتالي، فإنها توفر مجموعات مختلفة من methods.
=======
The "object wrappers" are different for each primitive type and are called: `String`, `Number`, `Boolean`, `Symbol` and `BigInt`. Thus, they provide different sets of methods.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

على سبيل المثال
, هنالك a string method [()str.toUpperCase](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) التي ترجع capitalized `str`.

إليك كيف يعمل:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

بسيط، أليس كذلك؟ إليكم ما يحدث في الواقع `()str.toUpperCase`:

1. النص `str` هو نوع بدائي. لذا في لحظة الولوج لخصائصه, يتكون object خاص يعرف قيمة النص, و لديه  methods مفيدة, مثل `()toUpperCase`.
2. هذه ال method  تعْملُ وتقوم بإرجاع نص جديد (يعرض بواسطة `alert`).
3. ال object تم تدميره, و ترك النوع البدائي  `str` مُنْفَرِداً.

يمكن للأنواع البدائية أن توفر methods, لكنها لا تزال خفيفة.

محرك جافا سكريبت يرتقي بهذه العملية إلى أقصى حد. قد يتخطي عملية تكوين  object إضافي على الإطلاق. ولكن ما زال عليها أن تلتزم بالمواصفات وتتصرف كما لو أنها تنشئ واحد.

الرقم لديه ال methods الخاصة به, علي سبيل المثال, [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) تقوم بتقريب الرقم حسب القيمة المعطاه :

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

سنري methods أكثر تحديداً في الفصول <info:number> و <info:string>.


````warn header="Constructors `String/Number/Boolean` هي للاستعمال الداخلي فقط"
بعض اللغات مثل جافا تسمح لنا بصريح التعبير بصنع "object wrappers" للأنواع البدائية بإستخدام   syntax مثل `new Number(1)` أو `new Boolean(false)`.

في جافا سكريبت, وهذا ممكن أيضا لأسباب تاريخية, اكن **غير موصى به**. ستصاب الأمور بالجنون في عدة مواضع.

على سبيل المثال:

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

Objects دائما صادق في `if`, لذا هنا سيظهر الإنذار:

```js run
let zero = new Number(0);

if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
}
```

من ناحية أخرى, استخدام نفس ال functions `String/Number/Boolean` بدون `new` هو شيء سَليم و مفيد. يحولون قيمة إلى النوع المقابل: إلي a string, a number, or a boolean (primitive - نوع بدائي).

علي سبيل المثال, هذا صحيح تماما:
```js
let num = Number("123"); // convert a string to number
```
````


````warn header="null/undefined have no methods"
الأنواع البدائية الخاصة `null` و `undefined` حالات استثنائية. ليس لديهم ما يشابههم "wrapper objects" و لا تزودنا بال methods. بمعنى, هم "الأكثر بدائية".

ومن شأن محاولة الوصول إلى خاصية بهذه القيمة أن تعطي هذا الخطأ:

```js run
alert(null.test); // error
````

## مُلخّص

- الأنواع البدائية ماعدا `null` و `undefined` تزودنا بالعديد من ال  methods المساعدة. وسندرسها في الفصول القادمة.
- رَسمِيّا, هذه ال  methods تعمل عن طريق  objects مؤقتة, ولكن محركات جافا سكريبت مضبوطة بشكل جيد لتحسين ذلك داخليا, لذا ليس مكلفا إستدعائهم.
