
# التسلسل الاختياري (غير الإجباري) '.?'

[recent browser="new"]

<<<<<<< HEAD
التسلسل الاختياري `.?` هو طريقة لتجنب الأخطاء التي تهدف للوصول إلى خصائص أو حقول غرض (كائن) ما، حتى إذا لم تكن الخصائص الوسيطة موجودة.

## المشكلة
=======
The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property doesn't exist.

## The "non-existing property" problem
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

إذا كنت قد بدأت للتو في قراءة هذه البرنامج التعليمي الخاصّ بـِ JavaScript، فربما لم تواجه هذه المشكلة من قبل ولكنها شائعة جداً.

<<<<<<< HEAD
فعلى سبيل المثال، يمتلك بعض مستخدمين موقعنا عناويناً، ولكن بعضاً من هؤلاء المستخدمين لم يقوموا بحفظها ضمن ملفاتهم الشخصية. بالتالي لا يمكننا كتابة التعبير التالي من دون حدوث خطأ `user.address.street` وذلك من أجل عرض اسم الشارع الخاص بالعنوان:

```js run
let user = {}; // قد لا يملك المستخدم عنواناً، كهذا الغرض على سبيل المثال
=======
As an example, let's consider objects for user data. Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them. 

In such case, when we attempt to get `user.address.street`, we'll get an error:

```js run
let user = {}; // the user without "address" property
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

alert(user.address.street); // وبالتالي يحدث الخطأ عند محاولة الوصول للخواص أو الحقول ضمنه
```

<<<<<<< HEAD
أو عند الحديث عن تطوير مواقع الويب مثلاً، قد نودّ أحياناً الحصول على معلومات خاصة بعنصر من عناصر الصفحة والتي قد لا تكون موجودة بالأصل، فمثلاً:
=======
That's the expected result, JavaScript works like this, but many practical cases we'd prefer to get `undefined` instead of an error (meaning "no street").

...And another example. In the web development, we may need to get an information about an element on the page, that sometimes doesn't exist:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
// يحدث الخطأ إذا كانت نتيجة التابع أو الطريقة querySelector(...) هي null
let html = document.querySelector('.my-element').innerHTML;
```

قبل ظهور التركيب `.?` في اللغة، كنا نستخدم العامل `&&` لحل هذه المشكلة.

على سبيل المثال:

```js run
let user = {}; // غرض لمستخدم لا يملك عنوان

alert( user && user.address && user.address.street ); // يظهر لنا undefined من دون حدوث خطأ
```

<<<<<<< HEAD
وعلى الرغم من أن إضافة العامل `&&` على طول المسار المطلوب للوصول للخاصية المناسبة يضمن وجود هذه الخاصية وعدم وقوع أخطاء، إلا أنه مرهق في الكتابة.
=======
AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but is cumbersome to write.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## التسلسل الاختياري (غير الإجباري)

يؤدي التسلسل الاختياري `.?` إلى إيقاف تقييم الكود البرمجي وإرجاع `undefined` إذا كانت قيمة الجزء الموجود قبل (أيسر) التركيب `.?` هي `null` أو `undfined`.

وللإيجاز، سنقول ضمن هذه المقالة أن شيئاً ما "موجود" إذا لم تكن قيمته `null` ولم تكن `undefined` كذلك.

وأما الطريقة الآمنة للوصول لـِ `user.address.street` هي:

```js run
let user = {}; // غرض المستخدم التالي لا يملك خاصية العنوان

alert( user?.address?.street ); // سيظهر لنا بدون حدوث خطأ undefined
```

وبالتالي سيبقى التعبير الخاص بقراءة عنوان المستخدم `user?.address` يعمل  حتى لو لم يكن غرض المستخدم موجوداً بالأصل:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

يرجى ملاحظة أن التركيب أو الشقّ `.?` يعمل بشكل صحيح حيث يتم وضعه بالضبط، وليس بعد ذلك المكان الذي تم وضعه فيه.

في السطرين الأخيرين، سيتوقف تقييم الكود البرمجي بشكل فوري بعد الشقّ `.?user` ولا يستمر أبداً للخصائص التي تليه.

يقوم التسلسل الاختياري فقط باختبار القيم `null/undefined`، ولا يتداخل مع ميكانيكية أي من اللغات الأخرى.

ولكن إذا كان الغرض `user` موجوداً بالفعل، فيجب أن تكون الخصائص الوسيطة موجودة ونقصد بالخصائص الوسيطة `user.address` مثلاً.

```warn header="لا تفرط في استخدام تركيب التسلسل الاختياري"
يجب أن نستخدم التركيب `.?` فقط عندما يكون هناك غرض، كائن أو خاصية غير موجودة بالأصل.

<<<<<<< HEAD
فعلى سبيل المثال، ووفقاً للمنطق المتعلق بالأمثلة السابقة، يجب أن يكون غرض المستخدم `user` موجوداً بالأصل، ولكن الخاصية `address` هي اختيارية وقد لا تكون موجودة، وبالتالي التعبير `user.address?.street` سيكون أفضل من إضافة التركيب `.?` للتحقق من كل خاصية أو حقل تابع للغرض `user?.address?.street`.

وبالتالي، إذا كان غرض المستخدم `user` غير معرف بسبب خطأ ما، فسوف نعرف عن هذا الخطأ ونصلحه. وإلا ستتسبب هذه الطريقة بإسكات الأخطاء البرمجية وقد لا يكون ذلك مناسباً، بل سيصبح من الصعب تصحيح هذه الأخطاء وكشفها.
=======
So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
```

````warn header="المتحول الواقع قبل التركيب `.?` يجب أن يكون معرّفاً"
إذا لم يتمّ تعريف المتحول `user`، سيؤدي التعبير `user?.anything` إلى حصول خطأ:

```js run
// ReferenceError: user is not defined
user?.address;
```
<<<<<<< HEAD
=======
There must be a declaration (e.g. `let/const/var user`). The optional chaining works only for declared variables.
````
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## اختصار الطرق (Short-circuiting)

كما تمّ ذكره آنفاً، يقوم التركيب `.?` بإيقاف عملية تقييم الكود البرمجي (يختصر الطريق) إذا لم يكن القسم اليساري (على يسار التركيب) موجوداً.

<<<<<<< HEAD
لذلك، وإذا كان هنالك أي استدعاءات لتوابع، لا يتم استدعائها أو تنفيذها:
=======
So, if there are any further function calls or side effects, they don't occur.

For instance:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // لا يحدث شيء
=======
user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

alert(x); // لا يتم زيادة القيمة 0
```

<<<<<<< HEAD
## حالات أخرى ().?، [].?
=======
## Other variants: ?.(), ?.[]
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

لا يقتصر التسلسل الاختياري `.?` في عمله على المتحولات فقط فهو ليس بعامل (رياضي) كالجمع والطرح، بل هو تركيب بنيوي يعمل أيضاً على التوابع والأقواس المربعة (أقواس المصفوفات).

على سبيل المثال، يمكن استخدام التركيب `().?` لاستدعاء تابع قد لا يكون معرّفاً بالأصل.

في المثال أدناه، يمتلك بعض أغراض المستخدمين الطريقة (method) أو التابع المُسمى `admin` وبعضهم الآخر لا يمتلك:

```js run
let user1 = {
  admin() {
    alert("I am admin");
  }
}

let user2 = {};

*!*
user1.admin?.(); // I am admin
user2.admin?.();
*/!*
```

<<<<<<< HEAD
لقد استخدمنا في السطرين السابقين علامة النقطة `.` للوصول للتابع `admin` (مع عدم وجود إشارة الاستفهام) وذلك لأن غرض المستخدم `user` يجب أن يكون موجوداً من قبل ليكون من الآمن قراءة التعابير منه.

وبالتالي سيقوم التعبير `().?` بفحص الجزء اليساري، فإذا كان التابع `admin` معرّفاً، فيعمل التعبير (من أجل `user1`)، وإلا (من أجل `user2`) فستتوقف عملية التقييم من دون حدوث أخطاء.
=======
Here, in both lines we first use the dot (`user1.admin`) to get `admin` property, because the user object must exist, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `user1`). Otherwise (for `user2`) the evaluation stops without errors.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

في حال الرغبة باستخدام الأقواس المربّعة `[]` بدلاً من النقطة `.` للوصول للخواص ضمن غرض أو كائن ما، سيفي التعبير `[].?` بالغرض أيضاً. وبشكل مشابه للحالات السابقة، يسمح هذا التعبير بشكل آمن قراءةَ خاصية أو حقل ضمن غرض معيّن قد لا يكون موجوداً.

```js run
let user1 = {
  firstName: "John"
};

let user2 = null; // على سبيل المثال، لم يكن بإمكاننا المصادقة على وجود مستخدم ما (القيام بعملية تسجيل الدخول له)

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

كذلك يمكننا استخدام التركيب `.?` مع التعبير `delete`:

```js run
delete user?.name; // سيقوم بحذف اسم المستخدم في حال كان غرض المستخدم موجوداً
```

<<<<<<< HEAD
```warn header="يمكننا استخدام التركيب `.?` للقراءة والحذف الآمن (بدون وقوع أخطاء)، ولكن ليس مع الكتابة (الإسناد)"
لا يمكن استخدام تركيب التسلسل الاختياري `.?` في الطرف اليساري لعملية الإسناد:
=======
````warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

For example:
```js run
<<<<<<< HEAD
// فإذا حاولنا إسناد قيمة معينة لاسم المستخدم إذا كان المستخدم موجوداً
=======
let user = null;
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

user?.name = "John"; // فسيحدث خطأ، لأن هذه الطريقة لا تعمل
// لأنه سيتم تقييمها على أن
// undefined = "John"
```

<<<<<<< HEAD
## الخلاصة

لتركيب التسلسل الاختياري `.?` ثلاثة أشكال:

1. `obj?.prop` -- يردّ التعبير `obj.prop` قيمةً صحيحة إذا كان الغرض `obj` موجوداً، وإلا يُعيد `undefined`.
2. `obj?.[prop]` -- يردّ التعبير `obj[prop]` قيمةً صحيحة إذا كان الغرض `obj` موجوداً، وإلا يُعيد `undefined`.
3. `()obj?.method` -- يقوم باستدعاء `()obj.method` إذا كان الغرض `obj` موجوداً، وإلا يُعيد `undefined`.
=======
It's just not that smart.
````

## Summary

The optional chaining `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj.method?.()` -- calls `obj.method()` if `obj.method` exists, otherwise returns `undefined`.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

وكما نرى، جميع الطرق السابقة واضحة وسهلة الاستخدام. فالتركيب `.?` يتحقق من الجزء الأيسر فيما إذا لم يكن `null/undefined` ليسمح بعدها بإكمال عملية التقييم.

وإذا كان لدينا خصائص متداخلة فيما بينها، فيسمح تسلسل من التركيب `.?` بقرائتها بشكلٍ آمن.

<<<<<<< HEAD
ومع ذلك، يجب علينا استخدام التركيب `.?` بعناية (عدم الإفراط) وذلك فقط في حالة عدم تأكدنا من وجود الجزء اليساري للتركيب.

حتى لا يخفي أخطاء البرمجة التي نرتكبها أحياناً، وذلك في حال حدثت.
=======
Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't to exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
