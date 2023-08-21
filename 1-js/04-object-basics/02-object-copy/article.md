# Object references and copying

أحد الاختلافات الأساسية بين الكائنات والقيم الأساسية هو أن الكائنات تخزن وتنسخ "ضمنيًا" وبالمقابل، يتم نسخ القيم الأساسية بالكامل.

هذا سهل الفهم إذا نظرنا قليلاً تحت الغطاء لما يحدث عند نسخ القيمة.

لنبدأ بالقيمة الأساسية، مثل السلسلة.

هنا نضع نسخة من `message` في `phrase`:

```js
let message = "Hello!";
let phrase = message;
```

نحن الآن لدينا متغيران مستقلان، يخزن كل منهما السلسانة `"Hello!"`.

![](variable-copy-value.svg)

نتيجة واضحة جدًا، أليس كذلك؟

الكائنات ليست كذلك.

**يخزن المتغير الذي يشير إلى كائن ليس الكائن نفسه، ولكن "عنوانه في الذاكرة" - بعبارة أخرى "مرجعًا" له.**

لنلقي نظرة على مثال لمتغير من هذا النوع:

```js
let user = {
    name: "John",
};
```

وهنا كيف يتم تخزينه في الذاكرة:

![](variable-contains-reference.svg)

يتم تخزين الكائن في مكان ما في الذاكرة (على اليمين من الصورة)، في حين يحتوي المتغير `user` (على اليسار) على "مرجع" إلى هذا المكان.

<<<<<<< HEAD
يمكننا التفكير في متغير الكائن، مثل `user`، كورقة ورق بها عنوان الكائن.
=======
We may think of an object variable, such as `user`, like a sheet of paper with the address of the object on it.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

عندما نقوم بإجراء أي عمليات على الكائن، مثل الوصول إلى خاصية `user.name`، يقوم محرك JavaScript بالنظر إلى ما يوجد في ذلك العنوان وينفذ العملية على الكائن الفعلي.

والآن هنا هو السبب في أهمية هذا الأمر.

**عند نسخ متغير الكائن ، يتم نسخ المرجع ، ولكن الكائن نفسه لا يتم استنساخه.**

على سبيل المثال:

```js no-beautify
let user = { name: "John" };

let admin = user; // المرجع يتم نسخه
```

الآن لدينا متغيران، يخزن كل منهما مرجعًا إلى نفس الكائن نفسه:

![](variable-copy-reference.svg)

كما يمكن رؤية، لا يوجد سوى كائن واحد، ولكن الآن بوجود متغيرين يشيران إليه.

يمكننا استخدام أي من المتغيرين للوصول إلى الكائن وتعديل محتوياته:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // تم تغييرها بواسطة المؤشر "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', التغيرات مرئية بواسطة مؤشر "user"
```

هذا يعني أنه وكأننا لدينا خزانة بها مفاتيحان واستخدمنا واحدة منهما (`admin`) للوصول إلى المحتويات وإجراء التغييرات، ثم إذا استخدمنا المفتى الأخرى (`user`) في وقت لاحق، فنحن لا نفتح سوى نفس الخزانة ويمكننا الوصول إلى المحتويات المغيرة.

## المقارنة بالمؤشرات

Two objects are equal only if they are the same object.

For instance, here `a` and `b` reference the same object, thus they are equal:

```js run
let a = {};
let b = a; // نسخ المؤشر

alert(a == b); // true, كلاهما يشيران لنفس الكائن
alert(a === b); // true
```

وهنا لا يتساوى كائنان مستقلان، على الرغم من أنهما يبدوان متشابهين (كلاهما فارغ):

```js run
let a = {};
let b = {}; // كائنان منفصلان

alert(a == b); // false
```

للمقارنات مثل `obj1 > obj2` أو للمقارنة مع قيمة أولية `obj == 5`، يتم تحويل الكائنات إلى قيم أولية. سندرس كيفية عمل تحويلات الكائنات قريبًا جدًا، ولكن لنقل الحقيقة، تحتاج هذه المقارنات نادرًا جدًا - عادة ما تظهر نتيجة خطأ في البرمجة.

<<<<<<< HEAD
## استنساخ ودمج، Object.assign [#cloning-and-merging-object-assign]
=======
````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but it does not. The value of `user` is constant, it must always reference the same object, but properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole.

That said, if we really need to make constant object properties, it's also possible, but using totally different methods. We'll mention that in the chapter <info:property-descriptors>.
````

## Cloning and merging, Object.assign [#cloning-and-merging-object-assign]
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

نسخ المتغير ينشئ مؤشر آخر لنفس الكائن.

<<<<<<< HEAD
لكن ماذا إذا أردنا نسخ الكائن نفسه كنسخة منفصلة ؟

هذا أيضًا قابل للتنفيذ، ولكنه أكثر صعوبة قليلاً، لأنه لا يوجد طريقة مدمجة لذلك في جافا سكريبت. ولكن نادرًا ما يكون هناك حاجة - فالنسخ بالإشارة جيد في معظم الأحيان.

لكن إذا أردنا ذلك حقًا يمكننا فعل ذلك عن طريق عمل كائن آخر والمرور على خواص الكائن الحالي ونسخها واحدة تلو الأخرى.
=======
But what if we need to duplicate an object?

We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

كالتالي:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // كائن جديد فارغ

// هيا ننسخ كل خواص user له
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// الآن النسخة منفصلة تمامًا وبها نفس المحتوى
clone.name = "Pete"; // تغيير البيانات

alert( user.name ); // تبقى John في الكائن الأصلي
```

<<<<<<< HEAD
أيضًا يمكننا استخدام [Object.assign](mdn:js/Object/assign) لذلك.
=======
We can also use the method [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

The syntax is:

```js
Object.assign(dest, ...sources)
```

<<<<<<< HEAD
-   المعامل الأول `dest` هو الكائن المراد.
-   باقي المعاملات `src1, ..., srcN` (يمكن أن تكون أي عدد) هي المصادر المراد نسخها.
-   تقوم بنسخ خواص المصادر `src1, ..., srcN` إلى الهدف `dest`. بكلمات أخرى يتم نسخ الخواص من كل المعاملات بدءًا من الثاني ويتم وضعها في الأول.
-   وترجع `dest`.

مثلًا يمكننا استخدامها لدمج العديد من الكائنات في كائن واحد:

```js
=======
- The first argument `dest` is a target object.
- Further arguments is a list of source objects.

It copies the properties of all source objects into the target `dest`, and then returns it as the result.

For example, we have `user` object, let's add a couple of permissions to it:

```js run
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// نسخ كل الخواص من permissions1 و permissions2 إلى user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true
```

إذا كانت الخاصية موجودة يتم استبدالها:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

<<<<<<< HEAD
إيضًا يمكننا استخدام `Object.assign` لاستبدال الحلقة التكرارية `for..in` في النسخ البسيط:
=======
We also can use `Object.assign` to perform a simple object cloning:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*

alert(clone.name); // John
alert(clone.age); // 30
```

<<<<<<< HEAD
تنسخ كل الخواص من `user` إلى كائن فارغ وترجعه.

## النسخ المتداخل
=======
Here it copies all properties of `user` into the empty object and returns it.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

هناك أيضًا طرق أخرى لاستنساخ كائن، على سبيل المثال باستخدام [spread syntax](info:rest-parameters-spread) `clone = {...user}`، والتي سيتم تغطيتها في وقت لاحق في البرنامج التعليمي.

## النسخ الشامل

<<<<<<< HEAD
مثل هذا:
=======
Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50,
    },
};

alert(user.sizes.height); // 182
```

<<<<<<< HEAD
الآن ليس كافيًا نسخ `clone.sizes = user.sizes` لأن `user.sizes` هو كائن وسيتم نسخ المؤشر ويكون `clone` و `user` لهما نفس الخاصية sizes:

مثل هذا:
=======
Now it's not enough to copy `clone.sizes = user.sizes`, because `user.sizes` is an object, and will be copied by reference, so `clone` and `user` will share the same sizes:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50,
    },
};

let clone = Object.assign({}, user);

alert(user.sizes === clone.sizes); // true, نفس الكائن

<<<<<<< HEAD
// user و clone يتشاركان sizes
user.sizes.width++; // تغيير الخاصية من مكان
alert(clone.sizes.width); // 51, يجعل التغيير مئي في المكان الآخر
```

لحل هذه المشكلة، يجب علينا استخدام حلقة نسخ تفحص كل قيمة في `user[key]` وإذا كانت كائنًا، فإنه يتم تكرار هيكله أيضًا. يُسمى ذلك "نسخًا عميقًا".

يمكن استخدام التكرار لتنفيذ نسخة عميقة، أو يمكن استخدام تنفيذ موجود لعدم اختراع العجلة، على سبيل المثال [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) من مكتبة JavaScript [lodash](https://lodash.com).

````smart header="يمكن تعديل الكائنات التي تم تعريفها بـ const"
آثار جانبية مهمة لتخزين الكائنات كمراجع هو أنه يمكن تعديل كائن معرف بـ `const`.

على سبيل المثال:
=======
// user and clone share sizes
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one
```

To fix that and make `user` and `clone` truly separate objects, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning" or "structured cloning". There's [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) method that implements deep cloning.


### structuredClone

The call `structuredClone(object)` clones the `object` with all nested properties.

Here's how we can use it in our example:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

*!*
let clone = structuredClone(user);
*/!*

alert( user.sizes === clone.sizes ); // false, different objects

// user and clone are totally unrelated now
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 50, not related
```

<<<<<<< HEAD
قد يبدو أن السطر `(*)` سيتسبب في حدوث خطأ، ولكن لا يحدث خطأ. قيمة `user` ثابتة، يجب أن يشير دائمًا إلى نفس الكائن، ولكن يمكن تغيير خصائص هذا الكائن.

بمعنى آخر، يتم إصدار خطأ عند استخدام `const user` فقط إذا حاولنا تعيين `user=...` ككل.

ومع ذلك، إذا كنا بحاجة فعلًا إلى جعل خصائص الكائن ثابتة، فمن الممكن ذلك باستخدام طرق مختلفة تمامًا. سنذكر ذلك في الفصل <info:property-descriptors>.
````
=======
The `structuredClone` method can clone most data types, such as objects, arrays, primitive values.

It also supports circular references, when an object property references the object itself (directly or via a chain or references).

For instance:

```js run
let user = {};
// let's create a circular reference:
// user.me references the user itself
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true
```

As you can see, `clone.me` references the `clone`, not the `user`! So the circular reference was cloned correctly as well.

Although, there are cases when `structuredClone` fails.

For instance, when an object has a function property:

```js run
// error
structuredClone({
  f: function() {}
});
```

Function properties aren't supported.

To handle such complex cases we may need to use a combination of cloning methods, write custom code or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

## ملخص

الكائنات تتم تعيينها ونسخها بالمرجع. وبمعنى آخر، يخزن المتغير ليس "قيمة الكائن" ولكن "مرجع" (عنوان في الذاكرة) للقيمة. لذلك، عند نسخ هذا المتغير أو تمريره كوسيط لدالة، يتم نسخ هذا المرجع، وليس الكائن نفسه.

كل العمليات التي تتم بواسطة النسخة (مثل إضافة وحذف الخواص) تحدث على نفس الكائن.

<<<<<<< HEAD
لعمل نسخة حقيقية يمكننا استخدام `Object.assign` لما يسمى "shallow copy" (الكائنات الداخلية تنسخ بالمؤشر) أو دالة "deep cloning" مثل [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
=======
To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function `structuredClone` or use a custom cloning implementation, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
