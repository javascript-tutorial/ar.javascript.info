<<<<<<< HEAD
# نسخ الكائنات والإشارات

واحد من أكبر الإختلافات بين الكائنات والقيم primitives هو أنها تخزن وتنسخ عن طريق الإشارة إليها.

القيم Primitive: strings, numbers, booleans -- تخزن وتنسخ كقيمة كاملة.

على سبيل المثال:
=======
# Object references and copying

One of the fundamental differences of objects versus primitives is that objects are stored and copied "by reference", whereas primitive values: strings, numbers, booleans, etc -- are always copied "as a whole value".

That's easy to understand if we look a bit under the hood of what happens when we copy a value.

Let's start with a primitive, such as a string.

Here we put a copy of `message` into `phrase`:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js
let message = "Hello!";
let phrase = message;
```

<<<<<<< HEAD
تكون النتيجة هي متغيران منفصلان كل منهما به كلمة `"Hello!"`.

![](variable-copy-value.svg)

الكائنات ليست كذلك.

**المتغير لا يحمل الكائن نفسه بل يحمل "عنوانه في الذاكرة" وبكلمات أخرى يحمل "مؤشر له".**

هذه صورة الكائن:
=======
As a result we have two independent variables, each one storing the string `"Hello!"`.

![](variable-copy-value.svg)

Quite an obvious result, right?

Objects are not like that.

**A variable assigned to an object stores not the object itself, but its "address in memory" -- in other words "a reference" to it.**

Let's look at an example of such a variable:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js
let user = {
    name: "John",
};
```

And here's how it's actually stored in memory:

![](variable-contains-reference.svg)

<<<<<<< HEAD
هنا يتم تخزين الكائن في مكان ما في الذاكرة والمتغير `user` لديه مؤشر لذلك المكان.

**عندما يتم نسخ الكائن -- يتم نسخ المؤشر ولا يتم تكرار الكائن.**
=======
The object is stored somewhere in memory (at the right of the picture), while the `user` variable (at the left) has a "reference" to it.

We may think of an object variable, such as `user`, as like a sheet of paper with the address of the object on it.

When we perform actions with the object, e.g. take a property `user.name`, the JavaScript engine looks at what's at that address and performs the operation on the actual object.

Now here's why it's important.

**When an object variable is copied, the reference is copied, but the object itself is not duplicated.**
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

For instance:

```js no-beautify
let user = { name: "John" };

let admin = user; // ينسخ المؤشر
```

<<<<<<< HEAD
الآن لدينا متغيرين كل منهما به مؤشر لنفس الكائن:

![](variable-copy-reference.svg)

يمكننا استخدام أي متغير لنصل للكائن ونعدل فيه:
=======
Now we have two variables, each storing a reference to the same object:

![](variable-copy-reference.svg)

As you can see, there's still one object, but now with two variables that reference it.

We can use either variable to access the object and modify its contents:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // تم تغييرها بواسطة المؤشر "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', التغيرات مرئية بواسطة مؤشر "user"
```

<<<<<<< HEAD
المثال بالأعلى يوضح أن لدينا كائن واحد فقط. فإذا كان لدينا متغيرين واستخدمنا احدهما للوصول للكائن (`admin`) فعندما نستخدم اللآخر (`user`) يمكن رؤية التغيرات.
=======
It's as if we had a cabinet with two keys and used one of them (`admin`) to get into it and make changes. Then, if we later use another key (`user`), we are still opening the same cabinet and can access the changed contents.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

## المقارنة بالمؤشرات

<<<<<<< HEAD
العامل `==` والعامل `===` هما نفس الشئ مع الكائنات.

**الكائنان يكونان متساويان فقط إذا كانا يشيران لنفس الكائن.**

هنا المتغيران يشيران لنفس الكائن لذا هما متساويان:
=======
Two objects are equal only if they are the same object.

For instance, here `a` and `b` reference the same object, thus they are equal:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js run
let a = {};
let b = a; // نسخ المؤشر

alert(a == b); // true, كلاهما يشيران لنفس الكائن
alert(a === b); // true
```

<<<<<<< HEAD
وهنا كائنان منفصلان غير متساويان حتى ولو كانا فارغين:
=======
And here two independent objects are not equal, even though they look alike (both are empty):
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js run
let a = {};
let b = {}; // كائنان منفصلان

alert(a == b); // false
```

<<<<<<< HEAD
مقارنة مثل `obj1 > obj2` أو مقارنة كائن مع قيمة primitive `obj == 5` يتم تحويل الكائنات إلى primitives. سنتكلم لاحقًا عن طريقة التحويل ولكن في الحقيقة هذه المقارنات نادرًا ما تحدث وفي الغالب تكون خطأ برمجي.
=======
For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely -- usually they appear as a result of a programming mistake.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

## نسخ ودمج, Object.assign

نسخ المتغير ينشئ مؤشر آخر لنفس الكائن.

لكن ماذا إذا أردنا نسخ الكائن نفسه كنسخة منفصلة ؟

<<<<<<< HEAD
هذا ممكن ولكنه صعب قليلًا حيث لا توجد دالة جاهزة في الجافاسكربت تقوم بذلك. في الجقيقة هذا الأمر نادر الحدوث ودائمًا ما يكون نسخ المؤشرات هو الأكثر فاعلية.
=======
That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. But there is rarely a need -- copying by reference is good most of the time.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

لكن إذا أردنا ذلك حقًا يمكننا فعل ذلك عن طريق عمل كائن آخر والمرور على خواص الكائن الحالي ونسخها واحدة تلو الأخرى.

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

أيضًا يمكننا استخدام [Object.assign](mdn:js/Object/assign) لذلك.

The syntax is:

```js
Object.assign(dest, [src1, src2, src3...])
```

-   المعامل الأول `dest` هو الكائن المراد.
-   باقي المعاملات `src1, ..., srcN` (يمكن أن تكون أي عدد) هي المصادر المراد نسخها.
-   تقوم بنسخ خواص المصادر `src1, ..., srcN` إلى الهدف `dest`. بكلمات أخرى يتم نسخ الخواص من كل المعاملات بدءًا من الثاني ويتم وضعها في الأول.
-   وترجع `dest`.

مثلًا يمكننا استخدامها لدمج العديد من الكائنات في كائن واحد:

```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// نسخ كل الخواص من permissions1 و permissions2 إلى user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

إذا كانت الخاصية موجودة يتم استبدالها:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

إيضًا يمكننا استخدام `Object.assign` لاستبدال الحلقة التكرارية `for..in` في النسخ البسيط:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

تنسخ كل الخواص من `user` إلى كائن فارغ وترجعه.

## النسخ المتداخل

حتى الآن إفترضنا أن كل خواص `user` هي primitive. ولكن الخواص يمكن أن تكون مؤشرات لكائنات أخرى فماذا سنفعل ؟

مثل هذا:

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

الآن ليس كافيًا نسخ `clone.sizes = user.sizes` لأن `user.sizes` هو كائن وسيتم نسخ المؤشر ويكون `clone` و `user` لهما نفس الخاصية sizes:

مثل هذا:

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

// user و clone يتشاركان sizes
user.sizes.width++; // تغيير الخاصية من مكان
alert(clone.sizes.width); // 51, يجعل التغيير مئي في المكان الآخر
```

<<<<<<< HEAD
لإصلاح ذلك يجب استخدام حلقة نسخ تفصل كل `user[key]` وإذا كان كائن يتم إيضًا نسخ بنيته وهذا يسمى النسخ العميق "deep cloning".

هناك خوارزمية لذلك تتعامل مع ما رأيناه في الأعلى أو أكثر تعقيدًا وتسمى [Structured cloning algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data).

يمكننا كتابتها باستخدام الغستدعاء الذاتي Recursion أو لا نعيد اختراع العدلة ونستخدم الدالة الجاهزة مثل [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) من مكتبة [lodash](https://lodash.com).
=======
To fix that, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

We can use recursion to implement it. Or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

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
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

## ملخص

<<<<<<< HEAD
الكائنات توضع وتنسخ بالمؤشرات أو بمعنى آخر أن المتغير لا يحمل القيمة نفسها ولكنه يحمل مؤشر لها أي عنوان هذه القيمة في الذاكرة. لذلك نسخ هذا المتغير أو تمريره لدالة لا ينسخ القيمة نفسها بل المؤشر.
=======
Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

كل العمليات التي تتم بواسطة النسخة (مثل إضافة وحذف الخواص) تحدث على نفس الكائن.

لعمل نسخة حقيقية يمكننا استخدام `Object.assign` لما يسمى "shallow copy" (الكائنات الداخلية تنسخ بالمؤشر) أو دالة "deep cloning" مثل [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
