# رايات الخصائص و واصفاتها

كما نعلم, الكائنات يمكن ان تُخزن الخصائص.

حتى الآن, الخاصيه كانت لنا زوجاً بسيطاً من "المفاتيح-القيم". و لكن خاصية الكائن هى حقاً اكثر مرونة و قوة.

فى هذا القسم سوف ندرس خصائص ضبط إضافية, وفي الفصل الّذي يليه سنرى كيف نحوّلها إلى دوال جلب/ضبط (Setters/Getters) أيضًا.

## رايات الخصائص

خصائص الكائنات, بالإضافة الى **`قيمتها`**, لديها ثلاث سمات مميزة اخرى (لذلك تسمى "flags" او رايات) :

- **`writable` : قابلة التعديل** -- إذا كانت `true`, يمكن تغيير القيمة, غير ذلك فالقيمة للقراءة فقط.
- **`enumerable` : قابلة الإحصاء** -- إذا كانت `true`, سوف يظهر مفتاح الخاصية ضمن مفاتيح الكائن عند إستخدام **`for..in`**, غير ذلك فلن يظهر.
- **`configurable` : قابلة إعادة الضبط** -- إذا كانت `true`, فيمكن حذف الخاصية وتعديل هذه السمات, غير ذلك فلا.

لم نري تلك الرايات ختي الآن, لأنهم بشكل عام لا يظهرون. عندما نقوم بعمل خاصية "بالطريقة العادية", فكل هذه السمات تكون بقيمة `true`. و لكن يمكننا طبعاً تغييرها متى أردنا.

اولاً, دعنا نري كيف يمكننا الحصول علي تلك الرايات.

الطريقة [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) تسمح بالإستعلام _الكامل_ عن المعلومات الخاصة بأيّ خاصية.

<<<<<<< HEAD
و صياغتها تكون كالآتي:
=======
The method [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) allows to query the *full* information about a property.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: الكائن الّذي سنجلب معلوماته.

`propertyName`
: اسم الخاصية الّتي نريدها.

القيمة العائدة تسمي بكائن "واصف الخصائص" : و هي تحتوي علي القيمه و جميع الرايات.

اليك مثالاً:

```js run
let user = {
  name: 'John',
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert(JSON.stringify(descriptor, null, 2));
/* واصف الخاصية:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

<<<<<<< HEAD
لتغيير الرايات, يمكننا إستخدام [Object.defineProperty](mdn:js/Object/defineProperty).
=======
To change the flags, we can use [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

و صياغتها تكون كالآتي:

```js
Object.defineProperty(obj, propertyName, descriptor);
```

`obj`, `propertyName`
: الكائن الّذي سنطبّق عليه الواصِف، واسم الخاصية.

`descriptor`
: واصِف الخصائص الّذي سنطبّقه على الكائن.

لو كانت الخاصية موجوده, `defineProperty` سوف تقوم بتحديث راياتها. غير ذلك, وإلّا فسيُنشئ الخاصية بهذه القيمة الممرّرة والرايات كذلك; في هذه الحالة, إذا كانت الراية غير موجوده, سوف يُفترض قيمتها بـ `false`.

إليك مثالاً, هنا الخاصية `name` سوف يتم إنشائها حيث تكون كل راياتها تساوى **`false`**:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

قارن ذلك مع `user.name` "التي انشأناها بشكل طبيعي" بالإعلي: الآن كل الرايات لديها القيمة `false`. إذا لم يكن هذا ما نريدة إذا سوف يكون من الأفضل ضبط قيمتهم بـ `true` في `descriptor`.

نرى الآن تأثيرات هذه الرايات في هذا المثال.

## منع قابلية التعديل

لنجعل `user.name` غير قابلة للتعديل (لا يمكن إسناد قيمة لها) عن طريق تغيير قيمة الراية `writable` :

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // خطأ: لا يمكن إسناد القيم إلى الخاصية ‫ `name` إذ هي للقراءة فقط
*/!*
```

الآن يستحيل على أيّ شخص تعديل اسم هذا المستخدم, إلا عند تطبيق `defineProperty` لتعديل ما فعلناه نحن.

```smart header="لا تظهر الأخطاء إلّا في الوضع الصارم `strict mode`" في الوضع الغير صارم `non-strict mode`, لا يحدث أخطاء عند التعديل علي خاصية غير قابلة للتعديل. و لكن العمليه لن تتم بنجاح أيضاً. أخطاء خرق الرايه يتم تجاهلها بصمت في الوضع الغير صارم `non-strict`.

````

إليك نفس المثال, و لكن سوف يتم إنشاء الخاصية من الصفر:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // لو كانت الخصائص جديدة فعلينا إسناد قيمها إسنادًا صريحًا
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
````

## منع قابلية الإحصاء

الآن دعنا نضيف الطريقة `toString` الى الكائن `user`.

عادةً, لا يمكننا إستخدام `toString` مع الكائنات و ذلك لإنها غير قابلة للإحصاء, و هي لا تظهر عند إستخدام `for..in`. و لكن إذا قمنا بإضافة `toString` الخاصة بنا, إذا بشكل افتراضي سوف تظهر عند إستخدام `for..in`, كما فى المثال التالي:

```js run
let user = {
  name: 'John',
  toString() {
    return this.name;
  },
};

// بشكل إفتراضي, كلا الخاصيتين سوف يتم عرضهم:
for (let key in user) alert(key); // name, toString
```

لو لم نرد ذلك, يمكننا وضع `enumerable:false`. و سوف لن تظهر عند إستخدام `for..in`, كما فى الوضع العادى:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// الآن toString اختفت:
*/!*
for (let key in user) alert(key); // name
```

الخصائص الغير قابلة للإحصاء يتم استثناءها من `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## منع قابلية إعادة الضبط

راية عدم الضبط (`configurable:false`) احياناً يتم إعدادها مسبقاً في بعض الكائنات والخصائص المضمّنة في اللغة.

<<<<<<< HEAD
الخاصية الغير قابلة للإحصاء لا يمكن حذفها.
=======
A non-configurable property can't be deleted, its attributes can't be modified.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

فمثلاً, `Math.PI` غير قابلة للتعديل, غير قابلة للإحصاء و غير قابلة لإعادة الضبط:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert(JSON.stringify(descriptor, null, 2));
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```

لذا, لن يستطيع المبرمج تغيير قيمة `Math.PI` أو التعديل عليها.

```js run
<<<<<<< HEAD
Math.PI = 3; // خطأ
=======
Math.PI = 3; // Error, because it has writable: false
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

// delete Math.PI لن تعمل أيضًا
```

<<<<<<< HEAD
إن تفعيل خاصيّة منع قابلية إعادة الضبط هو قرار لا عودة فيه. فلا يمكننا تغيير الراية (إتاحة قابلية إعادة الضبط) باستعمال `defineProperty`.

وللدقّة فهذا المنع يضع تقييدات أخرى على `defineProperty`:

1. منع تغيير راية قابلية إعادة الضبط `configurable`.
2. منع تغيير راية قابلية الإحصاء `enumerable`.
3. منع تغيير راية قابلية التعديل `writable: false` الي `true` (و لكن العكس ممكن).
4. منع تغيير ضابط وجالب واصف الوصول `get/set` (ولكن يمكن إسناد قيم إليه).
=======
We also can't change `Math.PI` to be `writable` again:

```js run
// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

There's absolutely nothing we can do with `Math.PI`.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

**Please note: `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value.**

Here `user.name` is non-configurable, but we can still change it (as it's writable):

```js run
let user = {
  name: 'John',
};

Object.defineProperty(user, 'name', {
  configurable: false,
});

user.name = 'Pete'; // works fine
delete user.name; // Error
```

And here we make `user.name` a "forever sealed" constant, just like the built-in `Math.PI`:

```js run
let user = {
  name: 'John',
};

Object.defineProperty(user, 'name', {
  writable: false,
  configurable: false,
});

// won't be able to change user.name or its flags
// all this won't work:
user.name = 'Pete';
delete user.name;
Object.defineProperty(user, 'name', { value: 'Pete' });
```

<<<<<<< HEAD
## Object.defineProperties

يوجد طريقة [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) و التي تسمح بتعريف كثير من الخصائص مره واحده.
=======
```smart header="The only attribute change possible: writable true -> false"
There's a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.
```

## Object.defineProperties

There's a method [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that allows to define many properties at once.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

و صياغتها تكون كالآتي:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2,
  // ...
});
```

مثال علي ذلك:

```js
Object.defineProperties(user, {
  name: { value: 'John', writable: false },
  surname: { value: 'Smith', writable: false },
  // ...
});
```

أي أنّنا نقدر على ضبط أكثر من خاصية معًا.

## Object.getOwnPropertyDescriptors

<<<<<<< HEAD
لجلب كلّ واصفات الخصائص معًا, يمكننا إستعمال الطريقة [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors).
=======
To get all property descriptors at once, we can use the method [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

بدمجه مع `Object.defineProperties` يمكن إستخدامها لنسخ الكائنات "ونحن على علمٍ براياتها":

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

فعادةً حين ننسخ كائنًا, نستعمل الإسناد لنسخ الخصائص، هكذا:

```js
for (let key in user) {
  clone[key] = user[key];
}
```

...و لكن هذا لا ينسخ الرايات. لذا إذا كنا نريد نسخ "أفضل" سيكون إستخدام `Object.defineProperties` أفضل.

<<<<<<< HEAD
إختلاف آخر و ذلك أن `for..in` تتجاهل الخصائص الرمزية (Symbolic Properties), و لكن `Object.getOwnPropertyDescriptors` تُعيد _كل_ واصِفات الخصائص بما فيها الرمزية.
=======
Another difference is that `for..in` ignores symbolic and non-enumerable properties, but `Object.getOwnPropertyDescriptors` returns *all* property descriptors including symbolic and non-enumerable ones.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

## إغلاق الكائنات على المستوى العام

تعمل واصِفات الخصائص على مستوى الخصائص منفردةً. هناك أيضًا توابِع تقصر الوصول إلى الكائن كلّه.

يوجد ايضاً تحدد الدخول الى الكائن _كله_ :

<<<<<<< HEAD
[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: يمنع إضافة خصائص جديدة إلى الكائن.

[Object.seal(obj)](mdn:js/Object/seal)
: يمنع إضافة الخصائص وإزالتها. يقوم بوضع `configurable: false` لكل الخصائص الموجودة.

[Object.freeze(obj)](mdn:js/Object/freeze)
: يمنع إضافة الخصائص أو إزالتها أو تغييرها. يقوم بوضع `configurable: false, writable: false` لكل الخصائص الموجودة.
=======
[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Forbids the addition of new properties to the object.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

كما أنّ هناك توابِع أخرى تفحص تلك المزايا:

<<<<<<< HEAD
[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: يُعيد `false` لو كان ممنوعًا إضافة الخصائص, غير ذلك `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: يُعيد `true` لو كان ممنوعًا إضافة الخصائص أو إزالتها، وكانت كلّ خصائص الكائن الموجودة ممنوعة من قابلية إعادة الضبط `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: يُعيد `true` إذا كان إضافة/حذف/تعديل الخصائص ممنوعاً, و كل الخصائص الحالية `configurable: false, writable: false`.
=======
[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

أمّا على أرض الواقع، فنادرًا ما نستعمل تلك الطرق.
