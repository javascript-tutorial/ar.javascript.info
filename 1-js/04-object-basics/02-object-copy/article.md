# نسخ الكائنات والإشارات

واحد من أكبر الإختلافات بين الكائنات والقيم primitives هو أنها تخزن وتنسخ عن طريق الإشارة إليها.

القيم Primitive: strings, numbers, booleans -- تخزن وتنسخ كقيمة كاملة.

على سبيل المثال:

```js
let message = "Hello!";
let phrase = message;
```

تكون النتيجة هي متغيران منفصلان كل منهما به كلمة `"Hello!"`.

![](variable-copy-value.svg)

الكائنات ليست كذلك.

**المتغير لا يحمل الكائن نفسه بل يحمل "عنوانه في الذاكرة" وبكلمات أخرى يحمل "مؤشر له".**

هذه صورة الكائن:

```js
let user = {
    name: "John",
};
```

![](variable-contains-reference.svg)

هنا يتم تخزين الكائن في مكان ما في الذاكرة والمتغير `user` لديه مؤشر لذلك المكان.

**عندما يتم نسخ الكائن -- يتم نسخ المؤشر ولا يتم تكرار الكائن.**

For instance:

```js no-beautify
let user = { name: "John" };

let admin = user; // ينسخ المؤشر
```

الآن لدينا متغيرين كل منهما به مؤشر لنفس الكائن:

![](variable-copy-reference.svg)

يمكننا استخدام أي متغير لنصل للكائن ونعدل فيه:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // تم تغييرها بواسطة المؤشر "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', التغيرات مرئية بواسطة مؤشر "user"
```

المثال بالأعلى يوضح أن لدينا كائن واحد فقط. فإذا كان لدينا متغيرين واستخدمنا احدهما للوصول للكائن (`admin`) فعندما نستخدم اللآخر (`user`) يمكن رؤية التغيرات.

## المقارنة بالمؤشرات

العامل `==` والعامل `===` هما نفس الشئ مع الكائنات.

**الكائنان يكونان متساويان فقط إذا كانا يشيران لنفس الكائن.**

هنا المتغيران يشيران لنفس الكائن لذا هما متساويان:

```js run
let a = {};
let b = a; // نسخ المؤشر

alert(a == b); // true, كلاهما يشيران لنفس الكائن
alert(a === b); // true
```

وهنا كائنان منفصلان غير متساويان حتى ولو كانا فارغين:

```js run
let a = {};
let b = {}; // كائنان منفصلان

alert(a == b); // false
```

مقارنة مثل `obj1 > obj2` أو مقارنة كائن مع قيمة primitive `obj == 5` يتم تحويل الكائنات إلى primitives. سنتكلم لاحقًا عن طريقة التحويل ولكن في الحقيقة هذه المقارنات نادرًا ما تحدث وفي الغالب تكون خطأ برمجي.

## نسخ ودمج, Object.assign

نسخ المتغير ينشئ مؤشر آخر لنفس الكائن.

لكن ماذا إذا أردنا نسخ الكائن نفسه كنسخة منفصلة ؟

هذا ممكن ولكنه صعب قليلًا حيث لا توجد دالة جاهزة في الجافاسكربت تقوم بذلك. في الجقيقة هذا الأمر نادر الحدوث ودائمًا ما يكون نسخ المؤشرات هو الأكثر فاعلية.

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

لإصلاح ذلك يجب استخدام حلقة نسخ تفصل كل `user[key]` وإذا كان كائن يتم إيضًا نسخ بنيته وهذا يسمى النسخ العميق "deep cloning".

هناك خوارزمية لذلك تتعامل مع ما رأيناه في الأعلى أو أكثر تعقيدًا وتسمى [Structured cloning algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data).

يمكننا كتابتها باستخدام الغستدعاء الذاتي Recursion أو لا نعيد اختراع العدلة ونستخدم الدالة الجاهزة مثل [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) من مكتبة [lodash](https://lodash.com).

## ملخص

الكائنات توضع وتنسخ بالمؤشرات أو بمعنى آخر أن المتغير لا يحمل القيمة نفسها ولكنه يحمل مؤشر لها أي عنوان هذه القيمة في الذاكرة. لذلك نسخ هذا المتغير أو تمريره لدالة لا ينسخ القيمة نفسها بل المؤشر.

كل العمليات التي تتم بواسطة النسخة (مثل إضافة وحذف الخواص) تحدث على نفس الكائن.

لعمل نسخة حقيقية يمكننا استخدام `Object.assign` لما يسمى "shallow copy" (الكائنات الداخلية تنسخ بالمؤشر) أو دالة "deep cloning" مثل [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
