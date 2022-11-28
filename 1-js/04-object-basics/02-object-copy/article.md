# Object references and copying

One of the fundamental differences of objects versus primitives is that objects are stored and copied "by reference", whereas primitive values: strings, numbers, booleans, etc -- are always copied "as a whole value".

That's easy to understand if we look a bit under the hood of what happens when we copy a value.

Let's start with a primitive, such as a string.

Here we put a copy of `message` into `phrase`:

```js
let message = "Hello!";
let phrase = message;
```

As a result we have two independent variables, each one storing the string `"Hello!"`.

![](variable-copy-value.svg)

Quite an obvious result, right?

Objects are not like that.

**A variable assigned to an object stores not the object itself, but its "address in memory" -- in other words "a reference" to it.**

Let's look at an example of such a variable:

```js
let user = {
    name: "John",
};
```

And here's how it's actually stored in memory:

![](variable-contains-reference.svg)

The object is stored somewhere in memory (at the right of the picture), while the `user` variable (at the left) has a "reference" to it.

We may think of an object variable, such as `user`, like a sheet of paper with the address of the object on it.

When we perform actions with the object, e.g. take a property `user.name`, the JavaScript engine looks at what's at that address and performs the operation on the actual object.

Now here's why it's important.

**When an object variable is copied, the reference is copied, but the object itself is not duplicated.**

For instance:

```js no-beautify
let user = { name: "John" };

let admin = user; // ينسخ المؤشر
```

Now we have two variables, each storing a reference to the same object:

![](variable-copy-reference.svg)

As you can see, there's still one object, but now with two variables that reference it.

We can use either variable to access the object and modify its contents:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // تم تغييرها بواسطة المؤشر "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', التغيرات مرئية بواسطة مؤشر "user"
```

It's as if we had a cabinet with two keys and used one of them (`admin`) to get into it and make changes. Then, if we later use another key (`user`), we are still opening the same cabinet and can access the changed contents.

## المقارنة بالمؤشرات

Two objects are equal only if they are the same object.

For instance, here `a` and `b` reference the same object, thus they are equal:

```js run
let a = {};
let b = a; // نسخ المؤشر

alert(a == b); // true, كلاهما يشيران لنفس الكائن
alert(a === b); // true
```

And here two independent objects are not equal, even though they look alike (both are empty):

```js run
let a = {};
let b = {}; // كائنان منفصلان

alert(a == b); // false
```

For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely -- usually they appear as a result of a programming mistake.

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

نسخ المتغير ينشئ مؤشر آخر لنفس الكائن.

<<<<<<< HEAD
لكن ماذا إذا أردنا نسخ الكائن نفسه كنسخة منفصلة ؟

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. But there is rarely a need -- copying by reference is good most of the time.

لكن إذا أردنا ذلك حقًا يمكننا فعل ذلك عن طريق عمل كائن آخر والمرور على خواص الكائن الحالي ونسخها واحدة تلو الأخرى.
=======
But what if we need to duplicate an object?

We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

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
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

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
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0
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
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

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
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

There are also other methods of cloning an object, e.g. using the [spread syntax](info:rest-parameters-spread) `clone = {...user}`, covered later in the tutorial.

## Nested cloning

<<<<<<< HEAD
مثل هذا:
=======
Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

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
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

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
=======
// user and clone share sizes
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0
```

To fix that and make `user` and `clone` truly separate objects, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning" or "structured cloning". There's [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) method that implements deep cloning.


### structuredClone

The call `structuredClone(object)` clones the `object` with all nested properties.

Here's how we can use it in our example:

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

## ملخص

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.

كل العمليات التي تتم بواسطة النسخة (مثل إضافة وحذف الخواص) تحدث على نفس الكائن.

<<<<<<< HEAD
لعمل نسخة حقيقية يمكننا استخدام `Object.assign` لما يسمى "shallow copy" (الكائنات الداخلية تنسخ بالمؤشر) أو دالة "deep cloning" مثل [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
=======
To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function `structuredClone` or use a custom cloning implementation, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0
