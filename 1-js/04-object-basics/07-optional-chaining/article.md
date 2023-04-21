
# التسلسل الاختياري (غير الإجباري) '.?'

[recent browser="new"]

The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property doesn't exist.

## The "non-existing property" problem

إذا كنت قد بدأت للتو في قراءة هذه البرنامج التعليمي الخاصّ بـِ JavaScript، فربما لم تواجه هذه المشكلة من قبل ولكنها شائعة جداً.

تحتوي على معلومات المستخدمين `user` objects على سبيل المثال، لنقل ان لدينا  
ولاكن بعض المستخدمين لم يقومو بتوفير العنوان،`user.address.street`مع معلومات الشارع،`user.address`معظم المستخدمين لديهم عنوان في


In such case, when we attempt to get `user.address.street`, and the user happens to be without an address, we get an error:

```js run
let user = {}; // a user without "address" property

alert(user.address.street); // وبالتالي يحدث الخطأ عند محاولة الوصول للخواص أو الحقول ضمنه
```

That's the expected result. JavaScript works like this. As `user.address` is `undefined`, an attempt to get `user.address.street` fails with an error.

In many practical cases we'd prefer to get `undefined` instead of an error here (meaning "no street").

...And another example. In the web development, we can get an object that corresponds to a web page element using a special method call, such as `document.querySelector('.elem')`, and it returns `null` when there's no such element.

```js run
// document.querySelector('.elem') is null if there's no element
let html = document.querySelector('.elem').innerHTML; // error if it's null
```

Once again, if the element doesn't exist, we'll get an error accessing `.innerHTML` of `null`. And in some cases, when the absence of the element is normal, we'd like to avoid the error and just accept `html = null` as the result.

How can we do this?

The obvious solution would be to check the value using `if` or the conditional operator `?`, before accessing its property, like this:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

It works, there's no error... But it's quite inelegant. As you can see, the `"user.address"` appears twice in the code. For more deeply nested properties, that becomes a problem as more repetitions are required.

E.g. let's try getting `user.address.street.name`.

We need to check both `user.address` and `user.address.street`:

```js
let user = {}; // user has no address

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

That's just awful, one may even have problems understanding such code.

Don't even care to, as there's a better way to write it, using the `&&` operator:

```js run
let user = {}; // غرض لمستخدم لا يملك عنوان

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)
```

AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn't ideal.

As you can see, property names are still duplicated in the code. E.g. in the code above, `user.address` appears three times.

That's why the optional chaining `?.` was added to the language. To solve this problem once and for all!

## التسلسل الاختياري (غير الإجباري)

The optional chaining `?.` stops the evaluation if the value before `?.` is `undefined` or `null` and returns `undefined`.

وللإيجاز، سنقول ضمن هذه المقالة أن شيئاً ما "موجود" إذا لم تكن قيمته `null` ولم تكن `undefined` كذلك.

In other words, `value?.prop`:
- works as `value.prop`, if `value` exists,
- otherwise (when `value` is `undefined/null`) it returns `undefined`.

Here's the safe way to access `user.address.street` using `?.`:

```js run
let user = {}; // غرض المستخدم التالي لا يملك خاصية العنوان

alert( user?.address?.street ); // سيظهر لنا بدون حدوث خطأ undefined
```

The code is short and clean, there's no duplication at all.

Reading the address with `user?.address` works even if `user` object doesn't exist:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

يرجى ملاحظة أن التركيب أو الشقّ `.?` يعمل بشكل صحيح حيث يتم وضعه بالضبط، وليس بعد ذلك المكان الذي تم وضعه فيه.

E.g. in `user?.address.street.name` the `?.` allows `user` to safely be `null/undefined` (and returns `undefined` in that case), but that's only for `user`. Further properties are accessed in a regular way. If we want some of them to be optional, then we'll need to replace more `.` with `?.`.

ولكن إذا كان الغرض `user` موجوداً بالفعل، فيجب أن تكون الخصائص الوسيطة موجودة ونقصد بالخصائص الوسيطة `user.address` مثلاً.

For example, if according to our coding logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.

So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
```

````warn header="المتحول الواقع قبل التركيب `.?` يجب أن يكون معرّفاً"
إذا لم يتمّ تعريف المتحول `user`، سيؤدي التعبير `user?.anything` إلى حصول خطأ:

```js run
// ReferenceError: user is not defined
user?.address;
```
The variable must be declared (e.g. `let/const/var user` or as a function parameter). The optional chaining works only for declared variables.
````

## اختصار الطرق (Short-circuiting)

كما تمّ ذكره آنفاً، يقوم التركيب `.?` بإيقاف عملية تقييم الكود البرمجي (يختصر الطريق) إذا لم يكن القسم اليساري (على يسار التركيب) موجوداً.

So, if there are any further function calls or side effects, they don't occur.

For instance:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++

alert(x); // لا يتم زيادة القيمة 0
```

## Other variants: ?.(), ?.[]

لا يقتصر التسلسل الاختياري `.?` في عمله على المتحولات فقط فهو ليس بعامل (رياضي) كالجمع والطرح، بل هو تركيب بنيوي يعمل أيضاً على التوابع والأقواس المربعة (أقواس المصفوفات).

على سبيل المثال، يمكن استخدام التركيب `().?` لاستدعاء تابع قد لا يكون معرّفاً بالأصل.

في المثال أدناه، يمتلك بعض أغراض المستخدمين الطريقة (method) أو التابع المُسمى `admin` وبعضهم الآخر لا يمتلك:

```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // nothing (no such method)
*/!*
```

Here, in both lines we first use the dot (`userAdmin.admin`) to get `admin` property, because we assume that the user object exists, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `userAdmin`). Otherwise (for `userGuest`) the evaluation stops without errors.

في حال الرغبة باستخدام الأقواس المربّعة `[]` بدلاً من النقطة `.` للوصول للخواص ضمن غرض أو كائن ما، سيفي التعبير `[].?` بالغرض أيضاً. وبشكل مشابه للحالات السابقة، يسمح هذا التعبير بشكل آمن قراءةَ خاصية أو حقل ضمن غرض معيّن قد لا يكون موجوداً.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null; 

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

كذلك يمكننا استخدام التركيب `.?` مع التعبير `delete`:

```js run
delete user?.name; // سيقوم بحذف اسم المستخدم في حال كان غرض المستخدم موجوداً
```

````warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment.

For example:
```js run
let user = null;

user?.name = "John"; // فسيحدث خطأ، لأن هذه الطريقة لا تعمل
// لأنه سيتم تقييمها على أن
// undefined = "John"
```

It's just not that smart.
````

## Summary

The optional chaining `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj.method?.()` -- calls `obj.method()` if `obj.method` exists, otherwise returns `undefined`.

وكما نرى، جميع الطرق السابقة واضحة وسهلة الاستخدام. فالتركيب `.?` يتحقق من الجزء الأيسر فيما إذا لم يكن `null/undefined` ليسمح بعدها بإكمال عملية التقييم.

وإذا كان لدينا خصائص متداخلة فيما بينها، فيسمح تسلسل من التركيب `.?` بقرائتها بشكلٍ آمن.

Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't exist. So that it won't hide programming errors from us, if they occur.
