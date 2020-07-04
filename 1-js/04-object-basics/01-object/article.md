
# الكائنات

كما عرفنا من فصل[أنواع البيانات](info:types), هنالك ثماني أنواع للبيانات في الجافا اسكريبت.سبعة منهم يسمون "أوليةprimitive",لأن قيمهم تحتوي شيئا واحداً (لتكن سلسلة نصية أو رقم أو أي شيْ)

في المقابل,تستخدم الكائنات لحفظ مجموعات keyed collections من مختلف البيانات و الكيانات المركبة.في الجافا اسكريبت,تدخل الكائنات تقريبا في كل جانب من جوانب اللغة. لذا يتوجب علينا فهمها قبل التعمق في أي شيئ آخر.

يمكن إنشاء أي كائن باستخدام الأقواس المعقوصة `{…}` مع قائمة اختيارية بالخاصيات. الخاصية هي زوج من "مفتاح: قيمة" (`key: value`) إذ يكون المفتاح عبارة عن نص (يُدعى "اسم الخاصية")، والقيمة يمكن أن تكون أي شيء.

يمكننا تخيل الكائن كخزانة تحوي ملفات. يُخزن كل جزء من هذه البيانات في الملف الخاص به باستخدام المفتاح. يمكن إيجاد، أو إضافة، أو حذف ملف باستخدام اسمه.

![](object.svg)

يمكن إنشاء كائن فارغ ("خزانة فارغة") باستخدام إحدى تركيبتين:

```js
let user = new Object(); // "object constructor" syntax صيغة منشئ الكائن
let user = {};  // "object literal" syntax 
```

![](object-user-empty.svg)

تُستخدم الأقواس المعقوصة `{...}` عادة، وهذا النوع من التصريح يُسمى «*الصياغة المختصرة لتعريف كائن*» (*object literal*).

## القيم المُجرَّدة والخاصيات

يمكننا إضافة بعض الخاصيات (properties) إلى الكائن المعرَّف بالأقواس `{...}` مباشرة بشكل أزواج "مفتاح: قيمة":

```js
let user = {     // an object كائن
  name: "John",  // خزن القيمة "John" عبر المفتاح "name"
  age: 30        // خزن القيمة "30" عبر المفتاح "age"
};
```

لدى كل خاصية مفتاح (يُدعى أيضًا "اسم " أو "مُعَرِّف") قبل النقطتين `":"` وقيمة لهذه الخاصية بعد النقطتين.

يوجد خاصيتين في الكائن `user`:

1. اسم الخاصية الأولى هو `"name"` وقيمتها هي `"John"`.  
2. اسم الخاصية الثانية هو `"age"` وقيمتها هي `"30"`.

يمكن تخيل الكائن السابق `user` كخزانة بملفين مُسَمَّيان "name" و "age".

![user object](object-user.svg)

يمكننا إضافة، وحذف، وقراءة الملفات من الخزانة في أي وقت. 

يمكن الوصول إلى قيم الخاصيات باستخدام الصيغة النُقَطية (dot notation):

```js
//الحصول على قيم خصائص الكائن: 
alert( user.name ); // John
alert( user.age ); // 30
```

يمكن للقيمة أن تكون من أي نوع، لِنُضِف قيمة من نوع بيانات منطقية (boolean):

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

يمكننا استخدام المُعامِل `delete` لحذف خاصية:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

يمكننا أيضا استخدام خاصيات بأسماء تحوي أكثر من كلمة، لكن يجب وضعها بين علامات الاقتباس "":

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // يجب أن تكون الخاصية ذات الاسم المُحتوي على أكثر من كلمة بين علامتي اقتباس
};
```

![](object-user-props.svg)


يمكن إضافة فاصلة بعد آخر خاصية في القائمة:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
وهذا يسمى فاصلة "زائدة" أو "معلقة". يجعل من السهل إضافة / إزالة / نقل الخصائص ، لأن جميع الأسطر تصبح متشابهة.

````smart header="الكائن المعرف بأنه ثابت يمكنه أن يتغير"
يرجى ملاحظة: يمكن تعديل كائن معلن على أنه ثابت.

مثلاً:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

قد يبدو أن الخط `(*)` سيسبب خطأ ، لكن لا. يُحدِّد "const" قيمة "user" ، وليس إصلاح محتوياتها.

لن يُظهر "const" خطأ إلا إذا حاولنا تعيين "user = ...` ككل.

هناك طريقة أخرى لعمل خصائص كائن ثابتة ، وسنتناولها لاحقًا في الفصل<info:property-descriptors>.
````

## الأقواس المربعة

لا تعمل طريقة الوصول إلى الخاصيات ذات الأسماء المحتوية على أكثر من كلمة باستخدام الصيغة النُقَطية:

```js run
// سيعطي هذا خطأ في الصياغة
user.likes birds = true
```

لا تفهم الجافا اسكريبت هذه الصيغه. يعتقد أننا نتعامل مع "user.likes" ، ثم تعطي خطأ في بناء الجملة عندما يصادف "birds" غير متوقعة

تتطلب النقطة أن يكون المفتاح معرفًا متغيرًا صالحًا. هذا يعني: أنه لا يحتوي على مسافات ، ولا يبدأ برقم ولا يتضمن أحرفًا خاصة (يُسمح بـ `$` و` _`).

هناك بديل "رمز القوس المربع" يعمل مع أي سلسلة:

```js run
let user = {};

// تعيين قيمة
user["likes birds"] = true;

// الحصول على قيمة
alert(user["likes birds"]); // true

// حذف
delete user["likes birds"];
```

الآن كل شيء على ما يرام. يرجى ملاحظة أن السلسلة داخل الأقواس مقتبسة بشكل صحيح (أي نوع من علامات الاقتباس ستفعل).

توفر الأقواس المربعة أيضًا جلب اسم خاصية ناتجة عن قيمة أي تعبير  - على عكس السلسلة الحرفية - مثل المتغير كما يلي:

```js
let key = "likes birds";

// يشبه تماماً user["likes birds"] = true;
user[key] = true;
```

هنا, المتغير`key` يمكن حسابه وقت التنفيذ run-time أو اعتمادا على ما يدخله المستخدم. من ثم نستخدمها للوصول إلى الخاصية.وهذا يمنحنا قدراً كبيراً من المرونة.

مثلاً:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// الوصول عن طريق المتغير
alert( user[key] ); // John (if enter "name")
```

لا يمكن استخدام رمز النقطة بطريقة مماثلة لما مضى:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### خصائص محسوبة (computed properties)

يمكننا استخدام الأقواس المربعة في كائن حرفي object literal، عند إنشاء كائن. وهذا ما يسمى * الخصائص المحسوبة computed properties*.

مثلا:

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
*!*
  [fruit]: 5, // يؤخذ اسم الخاصية من المتغير fruit
*/!*
};

alert( bag.apple ); // 5 if fruit="apple"
```

معنى computed property بسيط: `[fruit]` تعني أن اسم الخاصية يجب أن يؤخذ من `fruit`.

لذا, إذا أدخل الزائر `"apple"`, `bag` ستتحول `{apple: 5}`.

يعمل الأمر السابق بالطريقة التالية ذاتها:
```js run
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// خذ اسم الخاصية من متغير fruit
bag[fruit] = 5;
```

...يبدو ذلك أفضل.

يمكننا استخدام تعبيرات أكثر تعقيداً داخل الأقواس المربعة:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

الأقواس المربعة أقوى بكثير من استخدام الصيغة النُقطية.حيث تسمح باستخدام أي أسماء خصائص و متغيرات. لكنها أيضا أكثر إرهاقاً في الكتابة.

لذلك معظم الوقت, حينما يكون اسم خاصية معروفا أو بسيطا, تستخدم الصيغة النُقطية . وإذا أردنا شيئاً أكثر تعقيدا, ننتقل إلى استخدام الأقواس المربعة.

## اختصار قيمة الخاصية(Property value shorthand)

في الكود الحقيقي ، غالبًا ما نستخدم المتغيرات الموجودة كقيم لأسماء الخصائص.

مثلاً:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...other properties
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

في المثال السابق, تمتلك الخصائص نفس أسماء المتغيرات. حالة عمل خاصية من متغير هي أمر شائع جدا, that ذلك أنه من المميز وجود *اختصار قيمة الخاصية* لجعلها مختصرة .

بدلاً من `name:name` يمكننا فقط كتابة `name`, كهذا المثال:

```js
function makeUser(name, age) {
*!*
  return {
    name, // تماماً مثل name: name
    age,  // تماماً مثل age: age
    // ...
  };
*/!*
}
```

يمكننا استخدام كل من الخصائص العادية و والاختصارات كليهما في نفس الكائن object :

```js
let user = {
  name,  // same as name:name
  age: 30
};
```


## قيود أسماء الخصائص Property names limitations

كما نعلم, لا يمكن للمتغير أن يمتلك اسماً يساوي واحداً من الكلمات المحفوظة للغة language-reserved words مثل "for", "let", "return" إلخ.

لكن بالنسبة لخاصية في كائن, لا توجد مثل هذه القيود:

```js run
// كل هذه الخصائص صحيحة
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```


باختصار, ليس هناك أي قيود لأسماء الخصائص property names. يمكن أن يكونوا أي حرف أو رمز (نوع مميز من identifiers, سيتم الحديث عنه لاحقاً).

الأنواع الأخرى تتحول تلقائياً لسلاسل نصية strings.

مثلاً, رقم `0` يتحول إلى حرف `"0"` عند استخدامه كاسم خاصية property key:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// كليهما يسمحان بالوصول إلى الخاصية (رقم 0 يتحول إلى حرف "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

There's a minor gotcha with a special property named `__proto__`. لا يمكننا استخدام الاسم على أنَّه قيمة لغير كائن:

```js run
let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
```

كما نرى من الكود , إعطاء قيمة أولية  primitive `5` يتم تجاهلها.

سوف نغطي طبيعة `__proto__` في [subsequent chapters](info:prototype-inheritance), واقتراح [ways to fix](info:prototype-methods) مثل هذا السلوك.

## فحص الكينونة, "in" معامل

ميزة ملحوظة للكائنات في الجافا اسكريبت ، مقارنة بالعديد من اللغات الأخرى ، هي أنه من الممكن الوصول إلى أي خاصية. لن يكون هناك خطأ إذا كانت الخاصية غير موجودة!


قراءة خاصية غير موجودة تُرجع فقط "غير محدد". لذا يمكننا بسهولة اختبار ما إذا كانت الخاصية موجودة:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // "تحقق هذه الموازنة يشير إلى "عدم وجود الخاصية
```

يوجد أيضا مُعامل خاصة `"in"` لفحص تواجد أي خاصية.

The syntax is:
```js
"key" in object
```

مثلاً:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age موجود
alert( "blabla" in user ); // false, user.blabla غير موجود
```

يرجى ملاحظة أنه في الجهة اليسرى من `in` يجب أن يكون هناك *اسم خاصية*. يكون عادة نصًا بين علامتي تنصيص.

إذا حذفنا علامات التنصيص ، فهذا يعني متغيرًا ، يجب أن يحتوي على الاسم الفعلي المراد اختباره. على سبيل المثال:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, خاصية "age" موجودة
```

لماذا يوجد المعامل `in`? أليس من الكافي المقارنة مقابل `undefined`?

حسناً, في معظم الأحيان المقارنة ب `undefined` تكون جيدة. ولكن هناك حالة خاصة عندما تفشل, لكن `"in"` تعمل بشكل صحيح.

يحدث ذلك عند وجود خاصية  داخل كائن ، ولكنها تخزن قيمة `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // تعطي undefined, لذلك - ألا توجد هذه الخاصية؟

alert( "test" in obj ); // true, الخاصية موجودة بالفعل!
```
 
في الكود السابق, الخاصية `obj.test` موجودة بالفعل. لذا معامل `in`يعمل بشكل صحيح.

مواقف كهذه تحدث نادراً, لأن `undefined` لا ينبغي تعيينها بشكل ذاتي. عادة ما نستخدم `null` ل "unknown" أو "empty" قيم . لذا معامل `in` يعتبر ضيفاً غريباً في الكود.


## The "for..in" loop

للمرور على كل مفاتيح الكائن, يوجد شكل خاص آخر للحلقة loop: `for..in`. هذه الحلقة مختلفة تمامًا عما درسناه سابقًا، أي الحلقة `for(;;)`.

طريقة الكتابة في الكود:

```js
for (key in object) {
  //يتنفذ ما بداخل الحلقة لكل مفتاح ضمن خاصيات الكائن 
}
```

مثلاً, لنطبع جميع خاصيات الكائن `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // المفاتيح
  alert( key );  // name, age, isAdmin
  // قيم المفاتيح
  alert( user[key] ); // John, 30, true
}
```

لاحظ أن جميع تراكيب "for" تتيح لنا تعريف متغير التكرار بِداخل الحلقة، مثل `let key` في المثال السابق,.

أيضاً, يمكننا استخدام اسم متغير آخر بدلا من `key`. مثلا, `"for (let prop in obj)"` مستخدم أيضاَ بكثرة.

### الترتيب مثل الكائنات

هل الكائنات مرتبة? بمعنى آخر, إن تنقلنا في حلقة خلال كائن, هل نحصل على جميع الخاصيات بنفس الترتيب الذي أُضيفت به؟ وهل يمكننا الاعتماد على هذا؟

The short answer is: "ordered in a special fashion": integer properties are sorted, others appear in creation order. The details follow.

As an example, let's consider an object with the phone codes:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

The object may be used to suggest a list of options to the user. If we're making a site mainly for German audience then we probably want `49` to be the first.

But if we run the code, we see a totally different picture:

- USA (1) goes first
- then Switzerland (41) and so on.

The phone codes go in the ascending sorted order, because they are integers. So we see `1, 41, 44, 49`.

````smart header="Integer properties? What's that?"
The "integer property" term here means a string that can be converted to-and-from an integer without a change.

So, "49" is an integer property name, because when it's transformed to an integer number and back, it's still the same. But "+49" and "1.2" are not:

```js run
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
```
````

...On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

*!*
// non-integer properties are listed in the creation order
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

So, to fix the issue with the phone codes, we can "cheat" by making the codes non-integer. Adding a plus `"+"` sign before each code is enough.

Like this:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Now it works as intended.

## Summary

Objects are associative arrays with several special features.

They store properties (key-value pairs), where:
- Property keys must be strings or symbols (usually strings).
- Values can be of any type.

To access a property, we can use:
- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow to take the key from a variable, like `obj[varWithKey]`.

Additional operators:
- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.

What we've studied in this chapter is called a "plain object", or just `Object`.

There are many other kinds of objects in JavaScript:

- `Array` to store ordered data collections,
- `Date` to store the information about the date and time,
- `Error` to store the information about an error.
- ...And so on.

They have their special features that we'll study later. Sometimes people say something like "Array type" or "Date type", but formally they are not types of their own, but belong to a single "object" data type. And they extend it in various ways.

Objects in JavaScript are very powerful. Here we've just scratched the surface of a topic that is really huge. We'll be closely working with objects and learning more about them in further parts of the tutorial.
