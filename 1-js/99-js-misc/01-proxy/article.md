# الوسيط Proxy و الـReflect

الكائن `Proxy` يُحيط كائن آخر و يتوسط العمليات التى تُجري على هذا الكائن، مثل القراءة أو التعديل على الخصائص وغيرها والتعامل معهم بشكل اختياري أو تجعل الكائن الأساسي يتعامل معهم دون تدخل.

إن الـProxies مُستخدمة فى كثير من المكتبات وبعض أطر العمل. سنرى الكثير من التطبيقات العملية فى هذا المقال.

## الوسيط Proxy

الشكل:

```js
let proxy = new Proxy(target, handler);
```

- `target` -- هو الكائن الذي يتم إحاطته ويمكن أن يكون أى شيئ حتي الدوال (functions).
- `handler` -- إعدادت الـproxy: هو كائن يحتوي علي "traps" والتي هي عبارة عن دوال تعمل فى العمليات. مثلًا الـ `get` trap لقراءة خاصية من الـobject `target` وكذلك `set` trap لتعديل\إضافة خاصية للـobject `target` وهكذا.

بالنسبة للعمليات فى الـ `proxy`، فإنه إذا كان هناك trap فى الـobject `handler` وثم بعد ذلك تعمل وبعد ذلك يكون لديها الفرصة للتعامل معه وإذا لم يوجد trap فإن العملية تُجري علي `target`.

كمثال مبدأى، هيا ننشئ proxy بدون traps:

```js run
let target = {};
let proxy = new Proxy(target, {}); // handler فارغ

proxy.test = 5; // التعديل علي البروكسي (1)
alert(target.test); // 5, ظهور الخاصية فى الكائن الأصلي!

alert(proxy.test); // 5, ويمكننا قرائته من البروكسي أيضًا (2)

for (let key in proxy) alert(key); // test, التكرار يعمل (3)
```

وبما أنه لا توجد traps فإن كل العمليات التي التي تُجرى على الـ `proxy` يتم تحويلها إلى الـ `target`.

1. عملية التعديل `proxy.test=` تُعدل القيمة فى الـ`target`.
2. عملية القراءة `proxy.test` تقوم بإرجاع القيمة من `target`.
3. التكرار على الـ`proxy` يقوم بإرجاع القيم من `target`.

كما نري فإن الـ`proxy` بدون traps هو محيط شفاف حول `target`. أى أنه لا يفعل أى شيئ فى المنتصف.

![](proxy.svg)

`Proxy`إن الـ كائن من نوع خاص لا يحتوي علي أى خصائص وعندما يكون `handler` فارغًا فإنه يحوّل كل العمليات إلى `target`.

للحصول علي قدرات أكثر هيا نضيف traps.

ماذا يمكننا أن نتدخّل (intercept) بهم؟

لأغلب العمليات علي الـobjects توجد دوال تسمي "الدوال الداخلية" "internal method" فى مصدر الجافاسكريبت والتي تصف كيفية عملها عند أقل مستوي. علي سبيل المثال الدالة `[[Get]]` هي دالة داخلية لقراءة خاصية والدالة `[[Set]]` هي دالة داخلية لإضافة\تعديل خاصية وهكذا. هذه الدوال تستخدم فقط داخليًا ولا يمكننا استعمالهم بشكل مباشر.

تتدخّل الـ Proxy traps فى استدعاء هذه الدوال. وهم موجودون بالتفصيل في [المصدر](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots) وفي الجدول أدناه.

لكل دالة داخلية يوجد trap في هذا الجدول: اسم الدالة التي يمكننا إضافتها للمتغير الذي يسمي `handler` والذي نضيفه للـ `new Proxy` للتدخل فى العملية:

| الدالة الداخلية         | الدالة العاملة             | تعمل عند...                                                                                                                                                                                                                                                                                                                       |
| ----------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[[Get]]`               | `get`                      | قراءة خاصية                                                                                                                                                                                                                                                                                                                       |
| `[[Set]]`               | `set`                      | التعديل علي خاصية                                                                                                                                                                                                                                                                                                                 |
| `[[HasProperty]]`       | `has`                      | `in` المعامل                                                                                                                                                                                                                                                                                                                      |
| `[[Delete]]`            | `deleteProperty`           | `delete` المعامل                                                                                                                                                                                                                                                                                                                  |
| `[[Call]]`              | `apply`                    | استدعاء دالة                                                                                                                                                                                                                                                                                                                      |
| `[[Construct]]`         | `construct`                | `new` المعامل                                                                                                                                                                                                                                                                                                                     |
| `[[GetPrototypeOf]]`    | `getPrototypeOf`           | [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)                                                                                                                                                                                                   |
| `[[SetPrototypeOf]]`    | `setPrototypeOf`           | [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)                                                                                                                                                                                                   |
| `[[IsExtensible]]`      | `isExtensible`             | [Object.isExtensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)                                                                                                                                                                                                       |
| `[[PreventExtensions]]` | `preventExtensions`        | [Object.preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)                                                                                                                                                                                             |
| `[[DefineOwnProperty]]` | `defineProperty`           | [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)                                                              |
| `[[GetOwnProperty]]`    | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries`                                                                                                                                      |
| `[[OwnPropertyKeys]]`   | `ownKeys`                  | [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in`, `Object/keys/values/entries` |

```warn header="بعض الثوابت"
تفرض الجافاسكريبت بعض الثوابت -- شروط يجب أن تتحقق بالmethods و الtraps.

أغلبهم لإرجاع قيم:
- الدالة `[[Set]]` يجب أن تقوم بإرجاع `true` إذا كُتبت القيمة بشكل صحيح أو تقوم بإرجاع `false` إذا لم تكن كذلك.
- الدالة `[[Delete]]` يجب أن اقةم بإرجاع `true` إذا تم حذف القيمة بشكل صحيح وإلا تقوم بإرجاع `false`.
- ...وهكذا، وسنري المزيد في الأمثلة القادمة.

هناك المزيد من الثوابت، مثلًا:
- الدالة `[[GetPrototypeOf]]` الموجودة في البروكسي، يجب أن تُرجع نفس القيمة التي تُرجعها الدالة `[[GetPrototypeOf]]` الموجودة في الأوبجكت المستهدف (target). أو يمكننا القول بطريقة أخري، أن استرجاع القيم من الprototype الخاص بالبروكسي يجب دائما أن تُرجع الprototype الخاص بالأوبجكت المستهدف (target).

تستطيع الtraps أن تعترض طريق هذه العمليات، ولكن يجب أن يتبعو هذه القواعد.

تضمن الثوابت صحة وتناسق سلوك مزايا اللغة. وللإطلاع علي القائمة الكاملة للثوابت فهي موجودة في [المصدر](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots). لا تقلق، لن تقوم بمخالفة هذه الثوابت مالم تكن تقوم بعمل غريب.
```

هيا نري كيف يتم تطبيق ذلك في أمثلة عملية.

## إرجاع قيمة افتراضية بالtrap "get"

أكثر الtraps استعمالًا التي تسترجع أو تعدل الخصائص (properties).

لاعتراض طريق عملية الإسترجاع، يجب أن يحتوي ال`handler` علي الدالة `get(target, property, receiver)`.

يتم تشغيلها عندما تكون الخاصية للإسترجاع بالمتغيرات التالية:

- `target` -- هو الأوبجكت المستهدف والذي يتم تمريره كمتغير أول لل`new Proxy`,
- `property` -- اسم الخاصية,
- `receiver` -- إذا كانت الخاصية للإسترجاع getter فإن ال`receiver` هو الأوبجكت الذي سيتم استخدامه كقيمة ل`this` عند استرجاعها. وعادة مايكون البروكسي نفسه (أو أوبجكت يرث منه). والآن لا نريد هذا المتغير، ولذلك سيتم شرحه لاحقًا بالتفصيل.

هيا نستخدم `get` لتطبيق القيمة الإفتراضية لأوبجكت.

سنقوم بإنشاء array تحتوي علي أرقام والتي تقوم بإرجاع `0` للقيم الغير موجودة.

عادة، عندما يحاول أحد أن يسترجع قيمة غير موجودة في الarray فإنه يحصل علي `undefined`, ولكننا سنحيط الarray العادية ببروكسي والذي سيعترض عملية الاسترجاع ويقوم بإرجاع `0` إذا لم توجد الخاصية:

```js run
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // القيمة الإفتراضية
    }
  }
});

*!*
alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (لا يوجد عنصر كهذا)
*/!*
```

كما نري، فأن هذا يمكن تحقيقه بسهوله باستخدام الtrap `get`.

يمكننا استخدام `Proxy` لتطبيق أي طريقة للقيم الإفتراضية.

تخيل أن لدينا قاموسًا، بالجمل وترجماتها:

```js run
let dictionary = {
  Hello: "مرحبًا",
  Bye: "إلي اللقاء",
};

alert(dictionary["Hello"]); // مرحبًا
alert(dictionary["Welcome"]); // undefined
```

حاليًا، ليست هناك جملة، فعند الإسترجاع من القاموس تقوم بإرجاع `undefined`. ولكن في التطبيق العملي، فإن ترك الجملة غير مترجمة أفضل من `undefined`. ولذلك سنجعلها تقوم بإرجاع الجملة غير مترجمة بدلًا من `undefined`.

لتحقيق ذلك، سنحيط ال`dictionary` ببروكسي والذي سيقوم باعتراض طريق استرجاع الخصائص:

```js run
let dictionary = {
  'Hello': 'مرحبًا',
  'Bye': 'إلي اللقاء'
};

dictionary = new Proxy(dictionary, {
*!*
  get(target, phrase) { // تعترض طريق استرجاع الخصائص من القاموس
*/!*
    if (phrase in target) { // إذا كانت لدينا بالفعل
      return target[phrase]; // قم بإرجاع الترجمة
    } else {
      // وإلا فلتقم بإرجاع الجملة كما هي
      return phrase;
    }
  }
});

// قم باكتشاف الجمل الاعتباطية!
// في أسوأ الحالت لن يتم ترجمتهم.
alert( dictionary['Hello'] ); // Hola
*!*
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (لا توجد ترجمة)
*/!*
```

````smart
لاحظ كيف يستبدل البروكسي المتغير:

```js
dictionary = new Proxy(dictionary, ...);
```

يجب أن يقوم المتغير باستبدال الأوبجكت المستهدف\المستقبل بشكل تام. يجب ألا يستطيع أحد استدعاء الأوبجكت المستقبل بعد أن تمت إحاطته ببروكسي. وإلا سيكون من السهل أن تفسد كل شيئ.
````

## التحقق من القيم باستخدام الtrap "set"

دعنا نقول أننا نريد array للأرقام فقط. وإذا تمت إضافة قيمة من نوع آخر، يجب أن يكون هناك خطأ.

تعمل الtrap `set` عند التعديل علي خاصية.

`set(target, property, value, receiver)`:

- `target` -- هو الأوبجكت المستقبل، هو الذي يتم تمريره كمتغير أول لـ`new Proxy`,
- `property` -- إسم الخاصية,
- `value` -- قيمة الخاصية,
- `receiver` -- شبيه بالJtrap `get`، ولكن مفيد فقط للخصائص التي يتم التعديل عليها.

يجب أن يقوم الtrap `set` بإرجاع `true` إذا نجح التعديل، وإلا يقوم بإرجاع `false` (يقوم بتشغيل `TypeError`).

هيا نستخدمه للتحقق من القيم الجديدة:

```js run
let numbers = [];

numbers = new Proxy(numbers, { // (*)
*!*
  set(target, prop, val) { // لاعتراض عملية التعديل
*/!*
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // تمت إضافته بنجاح
numbers.push(2); // تمت إضافته بنجاح
alert("Length is: " + numbers.length); // 2

*!*
numbers.push("test"); // TypeError ('set' on proxy returned false)
*/!*

alert("لن يتم الوصول إلي هذا السطر أبدا، فهناك خطأ فى السطر الأعلي");
```

لاحظ أن: الوظيفة الأساسية للarray ما زالت تعمل كما هي! تُضاف القيم باستخدام `push`. وتزداد الخاصية `length` تلقائيًا عند إضافة قيم جديدة. لا يعدل البروكسي أي شيئ.

لسنا مضطرين لاستبدال الدوال المسؤولة عن إضافة قيم للarray مثل `push` و `unshift`, وهكذا, لإضافة تحققات هناك, لأنهم ضمنيًا يستخدمون الدالة `[[Set]]` والتي يتم اعتراضها بالبروكسي.

وهكذا يكون الكود نظيف ومتناسق.

```warn header="لا تنسي أن تُرجع `true`"
كما قيل بالأعلي، هناك ثوابت يجب الإلتزام بها.

ففي الدالة `set`، يجب أن تقوم بإرجاع `true` في التعديل الناجح.

إذا نسينا أن نفعل ذلك أو قمنا بإرجاع أى قيمة غير حقيقية (falsy)، يتقوم العملية بتفعيل الخطأ `TypeError`.

````

## التكرار باستخدام "ownKeys" و "getOwnPropertyDescriptor"

التكرارات `Object.keys`, `for..in` وأغلب الدوال الأخري اللتي تقوم بالتكرار علي خصائص الأوبجكت تستخدم ضمنيًا الدالة `[[OwnPropertyKeys]]` (والتي يتم اعتراضها عن طريق الtrap`ownKeys`) لاسترجاع قائمة من الخصائص.

دوال كهذه تختلف فى التفاصيل:
- تقوم الدالة `Object.getOwnPropertyNames(obj)` بإرجاع الخصائص التي ليست من نوع الرمز (symbol).
- تقوم الدالة `Object.getOwnPropertySymbols(obj)` بإرجاع الخصائص من نوع الرمز.
- تقوم الدالة `Object.keys/values()` بإرجاع الخصائص والقيم التي ليست من نوع الرمز والتي تحتوى علي المعرٌف `enumerable` (تم شرح المعرفات في المقال <info:property-descriptors>).
- التكرارات `for..in` تقوم بالتكرار علي الخصائص التي ليست من نوع الرمز والمحتوية علي المعرف `enumerable` وأيضًا الخصائص الموجودة فى الprototype.

...ولكن جميعهم يبدأون بهذه القائمة.

في المثال أدناه استخدمنا الtrap `ownKeys` لجعل التكرار `for..in` علي الأوبجكت `user`، وكذلك `Object.keys` و `Object.values`، لتخطي الخصائص اللتي تبدأ بـ `_`:

```js run
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" filters out _password
for(let key in user) alert(key); // name, then: age

// same effect on these methods:
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
````

إنها تعمل الآن.

علي الرغم من ذلك، إذا قمنا بإرجاع خاصية ليست موجودة في الأوبجكت فإن `Object.keys` لن تعرضه:

```js run
let user = { };

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user) ); // <فارغ>
```

لماذا؟ السبب بسيط: تقوم `Object.keys` بإرجاع الخصائص المحتويه علي المعرف `enumerable` فقط. للتحقق من ذلك، هي تقوم باستدعاء الدالة `[[GetOwnProperty]]` لكل خاصية لاسترجاع [المعرف الخاص بها](info:property-descriptors). وهنا، بما أنه لا يوجد خصائص، فإن معرفها فارغ، ولا يوجد المعرف `enumerable` فيتم تخطيها.

لجعل `Object.keys` تقوم بإرجاع خاصية، نحتاج إلي أن تكون موجودة في الأوبجكت ومحتوية علي المعرف `enumerable`، أو يمكننا اعتراض استدعاء الدالة `[[GetOwnProperty]]` (يقوم بهذا الtrap `getOwnPropertyDescriptor`)، ويقوم بإرجاع واصف (descriptor) والراية `enumerable`: true.

هنا مثال علي ذلك:

```js run
let user = {};

user = new Proxy(user, {
  ownKeys(target) {
    // يتم استدعاؤها مرة لإرجاع قائمة
    return ["a", "b", "c"];
  },

  getOwnPropertyDescriptor(target, prop) {
    // يتم استدعاؤها لكل خاصية
    return {
      enumerable: true,
      configurable: true,
      /* ...other flags, probable "value:..." */
    };
  },
});

alert(Object.keys(user)); // a, b, c
```

هيا نسجل ذلك مرة أخري: نحتاج لاعتراض `[[GetOwnProperty]]` فقط إذا كانت الخاصية غير موجودة في الأوبجكت.

## الخصائص المحمية باستخدام "deleteProperty" وغيره من الtraps

هناك شئ شائع متفق عليه وهو أن الخصائص التي تبدأ بـ`_` هي ضمنية ولا يجب أن يتم الوصول إليها من خارج الأوبجكت.

وهذا ممكن تقنيًا:

```js run
let user = {
  name: "John",
  _password: "secret",
};

alert(user._password); // secret
```

هيا نستخدم الproxies لمنع أي وصول إلي الخسائص البادئة بـ `_`.

سنحتاج إلي الtraps:

- `get` لإطهار خطأ عند استرجاع خاصية كهذه,
- `set` لإظهار خطأ عند التعديل,
- `deleteProperty` لإظهار خطأ عند الحذف,
- `ownKeys` لاستثناء الخصائص البادئة بـ `_` من التكرار `for..in` والدوال الأخري مثل `Object.keys`.

إليك الكود:

```js run
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
*!*
  get(target, prop) {
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
*!*
  set(target, prop, val) { // لاعتراض التعديل علي الخاصية
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
*!*
  deleteProperty(target, prop) { // لاعتراض حذف الخاصية
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
*!*
  ownKeys(target) { // لاعتراض عرض الخصائص في قائمة
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" لا تسمح بإرجاع _password
try {
  alert(user._password); // Error: Access denied
} catch(e) { alert(e.message); }

// "set" لا تسمح بتعديل _password
try {
  user._password = "test"; // Error: Access denied
} catch(e) { alert(e.message); }

// "deleteProperty" لا تسمج بحذف _password
try {
  delete user._password; // Error: Access denied
} catch(e) { alert(e.message); }

// "ownKeys" تستثني _password
for(let key in user) alert(key); // name
```

لاحظ التفصيلة المهمه في الtrap `get` في السطر `(*)`:

```js
get(target, prop) {
  // ...
  let value = target[prop];
*!*
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
*/!*
}
```

لماذا نحتاج إلي دالة لاستدعاء `value.bind(target)`؟

والسبب أن دوال أﻷوبجكت، مثل `user.checkPassword()`، يجب أن تقدر علي الوصول إلى `_password`:

```js
user = {
  // ...
  checkPassword(value) {
    // دالة الأوبجكت يجب أن تقدر علي الوصول إلي _password
    return value === this._password;
  },
};
```

استدعاء `user.checkPassword()` يقوم بإرجاع `user` المُحاط ببروكسي كقيمة لـ `this` (الأوبجكت قبل علامة النقطة هو قيمة `this`)، ولذلك فعندما تحاول الوصول إلي `this._password` ينشط الـtrap `get` (تعمل مع كل استدعاء لخاصية) وتظهر خطأًا.

ولذلك نقوم بربط سياق دوال الأوبجكت بالأوبجكت الأصلي، `target`، في لاسطر `(*)`. وبعد ذلك فإن استدعائهم في المستقبل سيسختدم `target` كقيمة لـ `this`، بدون trap.

هذا الحل عادة ما يعمل، ولكنه ليس مثاليًا، فإن دالة كهذه يمكنها أن ترجع الأوبجكت غير محاط ببروكسي في أي مكان آخر وهكذا سيفسد كل شيئ: أين الأوبجكت الأصلي؟ وأين المحاط ببروكسي؟

إلي جانب ذلك، فإن أوبجكت كهذا يمكن إحاطته ببروكسي أكثر من مره (كل بروكسي يمكن أن يضيف تعديلات غير منتهية للأوبجكت)، وإذا قمنا بتمرير أوبجكت غير محاط لأوبجكت، فإنه يمكن أن يكون هناك نتائج غير متوقعه.

ولذلك فإن بروكسي كهذا لا يجب أن يتم استخدامه في كل مكان.

```smart header="الخصائص الخاصه في الكلاس"
محركات الجافاسكريبت الحديثة تدعم الخصائص الخاصة (private properties) في الكلاس، مسبوقة بالعلامة `#`, تم شرحهم في المقال <info:private-protected-properties-methods>. لا نحتاج إلي بروكسي.

خصائص كهذه لها مشاكلها الخاصة. تحديدًا، لا يمكن توارثها.
```

## "In range" مع الtrap "has"

هيا نري أمثلة أخري.

لدينا الأوبجكت range:

```js
let range = {
  start: 1,
  end: 10,
};
```

نود أن نستعمل `in` للتحقق من وجود هذا الرقم في الـ`range`.

الtrap `has` الذي يعترض اسدعاء `in`.

`has(target, property)`

- `target` -- هو الأوبجكت المستهدف، يتم تمريره كمتغير أول لـ `new Proxy`,
- `property` -- اسم الخاصية

هنا التطبيق:

```js run
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
*!*
  has(target, prop) {
*/!*
    return prop >= target.start && prop <= target.end;
  }
});

*!*
alert(5 in range); // true
alert(50 in range); // false
*/!*
```

مصطلح بديل لطيف، أليس كذلك؟ وسهل تطبيقه.

## الدوال المُحاطة: "apply" [#proxy-apply]

يمكن أن نحيط دالة ببروكسي أيضًا.

الtrap `apply(target, thisArg, args)` يتعامل مع استدعاء البروكسي كدالة:

- `target` هو الأوبجكت المستهدف (الدوال ماهي إلا أوبجكت في الجافاسكريبت
- `thisArg` هو قيمة `this`.
- `args` هو قائمة من المتغيرات.

علي سبيل المثال هيا نعيد استذكار `delay(f, ms)`، والتي قمنا بإنشائها في المقال <info:call-apply-decorators>.

في هذا المقال أنشأناها بدون بروكسي. فإن استدعاء `delay(f, ms)` قام بإرجاع دالة تفوض كل الإستدعاءات إلي `f` بعد `ms` مللي ثانيه.

هنا الكود السابق، من غير بروكسي:

```js run
function delay(f, ms) {
  // تُرجع غلاف يقوم بتمرير الاستدعاء ﻹلي f بعد انتهاء الوقت
  return function () {
    // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// بعد هذه الإحاطه فإن استدعاء الدالة سيتأخر ل 3 ثواني
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (after 3 seconds)
```

هذا يعمل كما رأينا بالفعل. الدالة المُحيطة `(*)` تقوم بالإستدعاء بعد انتهاء الوقت.

ولكن لا تقوم الدالة المحيطه بتمرير قراءة أو تعديل خاصية أو أي شيء آخر. بعد الإحاطه، تتم خسارة الوصول إلي الخاصائص الخاصة بالدالة الأصليه، مثل `name`, `length` وغيرهم:

```js run
function delay(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

*!*
alert(sayHi.length); // 1 (function length is the arguments count in its declaration)
*/!*

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 0 (in the wrapper declaration, there are zero arguments)
*/!*
```

إن ال `Proxy` أقوي بكثير لأنه يقوم بتمرير كل شيئ إلي الأوبجكت المستهدف.

هيا نستخدم بروكسي بلًا من الدالة المحيطة:

```js run
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 1 (*) proxy forwards "get length" operation to the target
*/!*

sayHi("John"); // Hello, John! (after 3 seconds)
```

النتيجة مماثله، ولكن الآن ليست الاستدعاءات فقط مايتم تمريرها ولكن الكل العمليات أيضًا. ولذلك فإن `sayHi.length` يتم استرجاعها بشكل صحيح بعد الإحاطه في السطر `(*)`.

لدينا غلاف أقوي.

هناك traps أخري: القائمة الكاملة موجودة في بداية المقال. وطريقة استخدامهم مشابهة لما سبق.

## الأوبجكت Reflect

الأوبجكت `Reflect` هو أوبجكت موجود في اللغة والذي يقوم بتبسيط إنشاء `Proxy`.

لقد قيل سابقًا أن الدوال الضمنية مثل `[[Get]]`, `[[Set]]` وغيرهم هم دوال مصدرية فقط، لا يمكن استدعاؤهم بشكل مباشر.

الكائن `Reflect` يجعل ذلك بسيطا نوعا ما. الدوال الخاصة به هي غلاف مباشر للدوال الضمنية.

هنا أمثلة لبعض العمليات وكذلك استدعاءات ال `Reflect` والتي تقوم بعمل نفس الشيئ:

| Operation           | `Reflect` call                      | Internal method |
| ------------------- | ----------------------------------- | --------------- |
| `obj[prop]`         | `Reflect.get(obj, prop)`            | `[[Get]]`       |
| `obj[prop] = value` | `Reflect.set(obj, prop, value)`     | `[[Set]]`       |
| `delete obj[prop]`  | `Reflect.deleteProperty(obj, prop)` | `[[Delete]]`    |
| `new F(value)`      | `Reflect.construct(F, value)`       | `[[Construct]]` |
| ...                 | ...                                 | ...             |

علي سبيل المثال:

```js run
let user = {};

Reflect.set(user, "name", "John");

alert(user.name); // John
```

بالتحديد، يسمح لنا ال`Reflect` باستدعاء العمليات (`new`, `delete`...) كدوال (`Reflect.construct`, `Reflect.deleteProperty`, ...). وهذه ميزة جيدة ومثيرة، ولكن هنا شيئ آخر مهم.

**لكل خاصية ضمنية، تم اعتراضها ببروكسي، دالة في ال `Reflect`، بنفس الإسم والمتغيرات الخاصة بالtrap.**

لذلك يمكننا استخدام `Reflect` لتمرير عملية إلي الكائن الأصلي.

في هذا المثال، كلا من `get` و `set` يقومان بتمرير القراءة والتعديل إلي الأوبجكت بشكل شفاف، ويظهران رسالة:

```js run
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
*!*
    return Reflect.get(target, prop, receiver); // (1)
*/!*
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
*!*
    return Reflect.set(target, prop, val, receiver); // (2)
*/!*
  }
});

let name = user.name; // shows "GET name"
user.name = "Pete"; // shows "SET name=Pete"
```

هنا:

- `Reflect.get` تقرأ خاصية لأوبجكت.
- `Reflect.set` تقوم بتعديل خاصية لأوبجت وتُرجع `true` في حالة النجاح و `false` في غير ذلك.

وهكذا كل شيئ بسيط: إذا أراد trap أن يمرر استدعاءًا لأوبجكت فإنه من الكافي استدعاء `Reflect.<method>` بنفس الخصائص.

في أغلب الحالات يمكننا فعل نفس الشيئ بدون `Reflect`، علي سبيل المثال، قراءة خاصية بـ `Reflect.get(target, prop, receiver)` يمكن استبداله بـ `target[prop]`. ولكن مع ذلك هناك فروق مهمه.

### إحاطة الـgetter أو الجالب ببروكسي

هيا نري مثالًا يوضح لماذا `Reflect.get` أفضل. وسنري أيضًا لماذا `get/set` لديهم المتغير الرابع `receiver` الذي لم نستخدمه من فيل.

لدينا الأوبجكت `user` الذي يحتوي علي الخاصية `_name` وجالب لها.

هنا بروكسي حولها:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

*!*
let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  }
});
*/!*

alert(userProxy.name); // Guest
```

الtrap `get` شفاف هنا، حيث تقوم بإرجاع الخاصية الأصلية ولا تفعل أي شيئ آخر. وهذا طافٍ لمثالنا.

كل شيئ يبدو كأنه صحيح. ولكن هيا ننشئ مثالًا أكثر تعقيدًا.

بعد وراثة أوبجكت آخر `admin` من `user`، يمكننا مشاهدة السلوك الخاطئ:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

*!*
let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// Expected: Admin
alert(admin.name); // outputs: Guest (?!?)
*/!*
```

استرجاع `admin.name` يجب أن ينتج "Admin"`, وليس`"Guest"`!

ماذا حدث؟ من الممكن أننا فعلنا شيئًا خاطئًا مع الوراثة؟

ولكن إذا قمنا بإزالة البروكسي، سيعمل كل شيئ كما هو متوقع.

المشكلة تحديدًا في البروكسي في السطر `(*)`.

1. عند قراءة `admin.name` فإن الأوبجكت `admin` ليس لديه خاصية كهذه فيذهب البحث إلي الـprototype المتصل به.
2. الprototype هو `userProxy`.
3. عند قراءة الخاصية `name` من البروكسي، فإن الtrap `get` يُشغل ويُرجع قيمتها من الأوبجكت ألأصلي كما `target[prop]` في السطر `(*)`.

   استدعاء `target[prop]`، عندما تكون `prop` جالبة، تقوم بتشغيل الكود في سياق `this=target`. لذلك تكون النتيجة `this._name` من الكائن الأصلي `target` والذي هو `user`.

لإصلاح ذلك، نحتاج إلي `receiver`، المتغير الثالث للtrap `get`. هي تحافظ علي القيمة الصحيحة لـ `this` وتمريرها لجالب. في حالتنا هو `admin`.

كيف تمرر سياق لجالب؟ في الدوال العادية يمكننا استخدام `call/apply` ولكن هذا جالب ولا يتم استدعاؤه، فقط الوصول إليه إليه.

تستطيع `Reflect.get` أن تفعل ذلك. كل شيئ يمكنه أن يعمل بشكل صحيح إذا استخدمناه.

هنا الكود المصحح:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
*!*
    return Reflect.get(target, prop, receiver); // (*)
*/!*
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

*!*
alert(admin.name); // Admin
*/!*
```

والآن فإن `receiver` الذي يحافظ علي القيمة الصحيحه `this`، يتم تمريره للجالب باستخدام `Reflect.get` في السطر `(*)`.

يمكننا كتابة الtrap بشكل أقصر:

```js
get(target, prop, receiver) {
  return Reflect.get(*!*...arguments*/!*);
}
```

استدعاءات `Reflect` مسماة بنفس أسماء الtraps وتستقبل نفس المتغيرات. تم إنشائهم بهذه الطريقة.

لذلك فإن `return Reflect...` يعطينا طريقة آمنو لتمرير العمليات دون أن نقلق إن كنا نسينا شيئًا.

## حدود البروكسي

إن البروكسي هو طريقة فريدة لتعديل سلوك الكائنات الموجودة علي أدني مستوي. ومع ذلك هو ليس أفضل شيئ. هناك حدود.

### الأوبجكتس الموجود بالفعل: Internal slots

الكثير من الكائنات الموجودة بالفعل مثل `Map`, `Set`, `Date`, `Promise` وغيرهم يستخدمون مايسمي "internal slots".

هي عبارة عن خصائص، ولكن محفوظة ويتم استخدامها ضمنيًا فقط. علي سبيل المثال، يخزن الـ `Map` العناصر في فتحة داخلية (internal slot) تسمي `[[MapData]]`. الدوال الموجودة في اللغة تصل إليهم مباشرة وليس عن طريق `[[Get]]/[[Set]]`. ولذلك فإن البروكسي لا يستطيع اعتراضهم.

لماذا نهتم؟ إنهم أشياء مضمنة علي كل الأحوال!

حسنًا، هنا المشكله، بعد أن يتم إحاطة أوبجكت كهذا ببروكسي فإن البروكسي لا يملك هذه الـ internal slots ولذلك فإن الدوال الضمنية ستفشل.

علي سبيل المثال:

```js run
let map = new Map();

let proxy = new Proxy(map, {});

*!*
proxy.set('test', 1); // خطأ
*/!*
```

ضمنيًا، يخزن الـ `Map` كل البيانات في `[[MapData]]`. والبروكسي ليس لديه فتحة (slot) كهذه. والدالة [`Map.prototype.set`](https://tc39.es/ecma262/#sec-map.prototype.set) تحاول أن تصل إلي الخاصية الداخلية `this.[[MapData]]` ولكن بما أن `this=proxy` فإنها لا تجدها بداخل البروكسي وتفشل.

لحسن الحظ، هناك طريقة لإصلاح ذلك:

```js run
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
*!*
    return typeof value == 'function' ? value.bind(target) : value;
*/!*
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)
```

والآن هي تعمل جيدًا، لأن الtrap `get` يربط خصائص الدالة ، مثل `map.set`، بالأوبجكت المستهدف.

علي عكس المثال السابق، فإن قيمة `this` بداخل `proxy.set(...)` لن تكون بروكسي ولكن فقط ال`map` الأصلي. لذلك عندما تحاول الدالة `set` أن تصل إلي `this.[[MapData]]` فإنها تنجح.

```smart header="`Array` لا تحتوي علي internal slots"
استثناء ملحوظ: الـ `Array` لا تستخدم الـ internal slots. وهذا لأسباب متأصلة وتاريخية، لأنها ظهرت منذ زمن طويل.

لذلك لا توجد مشكلة كهذه عند إحاطة المصفوفة ببروكسي.

````

### الخصائص الخاصة Private fields

الشيئ المشابه يحدث مع الخصائص الخاصة بالكلاس.

علي سبيل المثال، الدالة `getName()` تصل إلي الخاصية الخاصة `#name` وتقف بعد الإحاطة:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

*!*
alert(user.getName()); // خطأ
*/!*
````

السبب في ذلك أن الخصائص الداخلية يتم إنشاؤها بالـ internal slots. ولا تستخدم الجافاسكريبت `[[Get]]/[[Set]]` عند الوصول إليهم.

عند استدعاء `getName()` فإن قيمة `this` يتم إحاطتها بالأوبجكت `user`، وهي لا تملك فتحة (slot) مع الخصائص الخاصة.

مرة أخري، فإن الحل بالربط يجعلها تعمل:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == "function" ? value.bind(target) : value;
  },
});

alert(user.getName()); // Guest
```

كما قيل، فإن الحل له عيوب، كما تم التوضيح سابقًا: فإنه يقوم بتعريض الكائن الأصلي للدالة ويسمح بتمريره وإنهاء الكائنات بروكسي الأخري.

### البروكسي ليس هو الأوبجكت المستهدف

إن البروكسي والكائن الأصلي مختلفان. هذا طبيعي، صحيح؟

لذلك إذا استخدمنا الأوبدجكت الأصلي كخاصية، ثم إحاطته ببروكسي، فإن البروكسي لا يمكن إيجاده:

```js run
let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

*!*
alert(allUsers.has(user)); // false
*/!*
```

كما نري، فإنه بعد الإحاطة لا نستطيع أن نجد `user` في المجموعه `allUsers`، لأن البروكسي هو كائن مختلف.

```warn header="البروكسي لا يستطيع أن يعترض اختبار المساواة `===`"
البروكسي يمكنه اعتراض الكثير من العمليات، مثل `new` باستخدام `construct` و كذلك `in` باستخدام `has` وهكذا.

ولكن ليست هناك طريقة لاعتراض اختبار المساواة `===` للأوبجكتس. فإن الأوبجكت مساوٍ تماما لنفسه فقط وليس أي قيمة أخري.

لذلك فإن كل العمليات والكلاسز المبنيو في اللغة والتي تقارن الكائنات للمساواة ستقوم بالتفريق بين الأوبجكت والبروكسي. لا يوجد استبدال هنا.

````

## البروكسي القابل للإلغاء

دعنا نقول أن لدينا مصدر، ونريد أن نمنع الوصول إليه في أى وقت.

مانستطيع فعله هو أن نحيطه ببروكسي قابل للإلغاء، بدون أي trap. هذا البروكسي سيقوم بتمرير العمليات إلي الأوبجكت ويمكننا أن نمنع الوصول إليه في أى وقت.

الشكل:

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
````

الإستدعاء يقوم بإرجاع أوبجكت يحتوي علي `proxy` ودالة `revoke` لإبطاله.

هاك مثالًا:

```js run
let object = {
  data: "Valuable data",
};

let { proxy, revoke } = Proxy.revocable(object, {});

// تمرير اليروكسي إلى مكان آخر بلًا من الأوبجكت...
alert(proxy.data); // بيانات قيمة

// فيما بعد
revoke();

// لا يعمل البروكسي الآن (تم الإلغاء)
alert(proxy.data); // خطأ
```

استدعاء `revoke()` يمسح كل المراجع الداخلية للأوبجكت المستهدف من البروكسي، ولذلك فإنهما ليسا متصلان بعد الآن. الأوبجكت المستهدف يمكن أن يتم تنظيفه بعد ذلك.

يمكننا أيضًا أن نخزن الدالة `revoke` في `WeakMap`، لنكون قادرين علي إيجاده بواسطة بروكسي:

```js run
*!*
let revokes = new WeakMap();
*/!*

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..later in our code..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // خطأ (تم إلغاؤه)
```

الفائدة من نهج كهذا هو أننا لسنا مضطرين لأن نحمل الدالة `revoke`. يمكننا الحصول عليها من الmap بواسطة `proxy` عند الحاجه.

نستخدم `WeakMap` بدلًل من `Map`هنا لأننا لا نريد أن نمنع عملية التنظيف (garbage collection). إذا أصبح الأوبجكت "لا يمكن الوصول إليه" (علي سبيل المثال لا توجد أي متغيرات تصل إليها)، تسمح له الـ `WeakMap` أن يتم مسحه من الذاكرة مع دالة `revoke` الخاصة به فليس هناك حاجة لها بعد الآن.

## المراجع

- المصدر: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots).
- MDN: [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## الملخص

إن الـ `Proxy` هو غلاف حول الأوبجكت، والذي يقوم بتمرير العمليات إلي الأوبجكت، ويقوم باعتراض بعضهم بشكل اختياري.

يمكنه أن يحيط أي أوبجكت، بما فيه الكلاس والدالة.

الشكل:

```js
let proxy = new Proxy(target, {
  /* traps */
});
```

...بعد ذلك يجب أن نستخدم `proxy` في كل مكان بدلًا من `target`. إن البروكسي لا يحتوي علي خصائص أو دوال خاصة به. هو يقوم باعتراض العمليه إذا وجد trap وإلا فإنه يمرر العمليه إلي الأوبجكت المستهدف.

يمكننا أن نعترض:

- قراءة (`get`), تعديل (`set`), حذف (`deleteProperty`) خاصية (حتي إذا لم تكن موجودة).
- استدعاء دالة (`apply`).
- المعامل `new` (`construct` trap).
- وغيره الكثير من العمليات (القامة الكاملة موجودة في بداية المقال وفي [المصدر](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)).

هذا يسمح لنا أن ننشئ خواص ودوال افتراضية واسترجاع قيم افتراضية وأوبجكت ملحوظ والكثير.

يمكننا أيضًا أن نعترض أوبجكت مرات عدة ببروكسي مختلف، وتعليمها بطرق مختلفة.

[الكائن Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) تم إنشاؤه ليكمل الـ [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). لكل trap في `Proxy`, يوجد استدعاء لـ `Reflect` بنفس المتغيرات. يجب أن نستخدمها لتمرير القيم إلي الأوبجكت المستهدف.

البروكسي له حدود:

- الأوبجكت المبنية بالفعل تمتلك "internal slots"، والوصول إليها لا مككن إحاطته ببروكسي. أنظر إلي الحل أعلاه.
- ومثله أيضًا الخصائص الخاصة في الكلاس، حيث أنهم يتم إنشاؤهم داخليا باستخدام فتحات (slots). ولذلك فإن الدوال المغلفة يجب أن تحتوي علي الأوبجكت المستهدف كقيمة لـ `this` للوصول إليهم بنجاح.
- اختبار التساوي `===` لا يمكن اعتراضه.
- السرعة: هذا يعتمد علي الإنجن ولكن بشكل عام فإن الوصول إلي خاصية ببروطسي بسيط يستغرق وقتًا أطول.
