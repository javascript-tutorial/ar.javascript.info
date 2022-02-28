# الباني والعامل "new"

<<<<<<< HEAD
نُنشِئ الكائنات باستخدام الصيغة الاعتيادية المختصرة `{...}`. لكننا نحتاج لإنشاء العديد من الكائنات المتشابهة غالبًا، مثل العديد من
المستخدمين، أو عناصر لقائمة وهكذا. يمكن القيام بذلك باستخدام الدوال البانية (constructor functions) لكائن والمُعامِل
`"new"`.
=======
The regular `{...}` syntax allows us to create one object. But often we need to create many similar objects, like multiple users or menu items and so on.
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

## الدالة البانية

تقنيًا، الدوال البانية هي دوال عادية، لكن يوجد فكرتين متفق عليها:

1. أنها تبدأ بأحرف كبيرة.
2. يجب تنفيذها مع المُعامِل `"new"` فقط.
   إليك المثال التالي:

```
function User(name) {
this.name = name;
this.isAdmin = false;
}
let user = new User("Jack");
alert(user.name); // Jack
alert(user.isAdmin); // false
```

عند تنفيذ دالة مع الُعامِل `new`، تُنَفَّذ الخطوات التالية:

1. يُنشَأ كائن فارغ ويُسنَد إلى `this`.
2. يُنَفَّذ محتوى الدالة. تقوم غالبًا بتعديل `this`، وإضافة خاصيات إليه.
3. تُرجَع قيمة `this`.
   بمعنى آخر، تقوم `new User(...)‎` بشيء يشبه ما يلي:

```
function User(name) {
// this = {}; (implicitly)
// this إضافة خاصيات إلى
this.name = name;
this.isAdmin = false;
// this; (implicitly) إرجاع
}
```

إذًا، تُعطي `let user = new User("Jack")‎` النتيجة التالية ذاتها:

```
let user = {
name: "Jack",

isAdmin: false
};
```

الآن، إن أردنا إنشاء مستخدمين آخرين، يمكننا استدعاء `new User("Ann")‎`، و `new User("Alice‎")‎` وهكذا. تعدُّ هذه
الطريقة في بناء الكائنات أقصر من الطريقة الاعتيادية عبر الأقواس فقط، وأيضًا أسهل للقراءة. هذا هو الغرض الرئيس للبانيات،
وهي تطبيق شيفرة قابلة لإعادة الاستخدام لإنشاء الكائنات.
لاحظ أنَّه يمكن استخدام أي دالة لتكون دالة بانية تقنيًا. يعني أنه يمكن تنفيذ أي دالة مع `new`، وستُنَفَّذ باستخدام الخوارزمية أعلاه.
استخدام الأحرف الكبيرة في البداية هو اتفاق شائع لتمييز الدالة البانية من غيرها وأنَّه يجب استدعاؤها مع `new`.

<<<<<<< HEAD
### `**new function() { … }‎**`

إن كان لدينا العديد من الأسطر البرمجية، وجميعها عن إنشاء كائن واحد مُعَقَّد، فبإمكاننا تضمينها في دالة بانية، هكذا:

```
let user = new function() {
this.name = "John";
this.isAdmin = false;
// ...شيفرة إضافية لإنشاء مستخدم
// ربما منطق معقد أو أي جمل
// متغيرات محلية وهكذا..
};
```

لا يمكن استدعاء المُنشِئ مجددًا، لأنه غير محفوظ في أي مكان، يُنشَأ ويُستدعى فقط. لذا فإن الخدعة تهدف إلى تضمين الشيفرة التي تُنشِئ كائنًا واحدًا، دون إعادة الاستخدام وتكرار العملية مستقبلًا.
=======
Let's note once again -- technically, any function (except arrow functions, as they don't have `this`) can be used as a constructor. It can be run with `new`, and it will execute the algorithm above. The "capital letter first" is a common agreement, to make it clear that a function is to be run with `new`.

````smart header="new function() { ... }"
If we have many lines of code all about creation of a single complex object, we can wrap them in an immediately called constructor function, like this:

```js
// create a function and immediately call it with new
let user = new function() { 
  this.name = "John";
  this.isAdmin = false;

  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
};
```

This constructor can't be called again, because it is not saved anywhere, just created and called. So this trick aims to encapsulate the code that constructs the single object, without future reuse.
````
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

## وضع اختبار الباني: `new.target`

**ميزة متقدمة**: تُستخدم الصيغة في هذا الجزء نادرًا، ويمكنك تخطيها إلا إن كنت تُريد الإلمام بكل شيء.
يمكننا فحص ما إن كانت الدالة قد استدعيت باستخدام `new` أو دونه من داخل الدالة، وذلك باستخدام الخاصية الخاصة `new.target`.
تكون الخاصية فارغة في الاستدعاءات العادية، وتساوي الدالة البانية إذا استُدعِيَت باستخدام `new`:

````

Inside a function, we can check whether it was called with `new` or without it, using a special `new.target` property.

It is undefined for regular calls and equals the function if called with `new`:

```js run
function User() {
alert(new.target);
}
// "new" بدون:
User(); // undefined
// باستخدام "new":
new User(); // function User { ... }
````

يمكن استخدام ذلك بداخل الدالة لمعرفة إن استُدعِيَت مع `new`، "في وضع بناء كائن"، أو دونه "في الوضع العادي".
يمكننا أيضًا جعل كلًا من الاستدعاء العادي و`new` ينفِّذان الأمر ذاته -بناء كائن- هكذا:

```
function User(name) {
if (!new.target) { // new إن كنت تعمل بدون
return new User(name); // new ...سأضيف
}
this.name = name;
}
let john = User("John"); // new User تُوَجِّه الاستدعاء إلى
alert(john.name); // John
```

يستخدم هذا الأسلوب في بعض المكتبات أحيانًا لجعل الصيغة أكثر مرونة حتى يتمكن الأشخاص من استدعاء الدالة مع `new` أو دونه، وتظل تعمل.
ربما ليس من الجيد استخدام ذلك في كل مكان، لأن حذف `new` يجعل ما يحدث أقل وضوحًا. لكن مع `new`، يعلم الجميع أن كائنًا جديدًا قد أُنشِئ.

## ما تُرجِعه الدوال البانية

لا تملك الدوال البانية عادةً التعليمة `return`. فَمُهِمَتُهَا هي كتابة الأمور المهمة إلى `this`، وتصبح تلقائيًا هي النتيجة. لكن إن كان هناك التعليمة `return` فإن القاعدة سهلة:

- إن استُدعِيَت `return` مع كائن، يُرجَع الكائن بدلًا من `this`.
- إن استُدعِيَت `return` مع متغير أولي، يُتَجاهَل.
  بمعنىً آخر، `return` مع كائن يُرجَع الكائن، وفي الحالات الأخرى تُرجَع `this`. مثلًا، يعاد في المثال التالي الكائن المرفق بعد `return` ويهمل الكائن المسنَد إلى `this`:

```
function BigUser() {
this.name = "John";
return { name: "Godzilla" }; // <-- تُرجِع هذا الكائن
}
alert( new BigUser().name ); // Godzilla, حصلنا على الكائن
```

وهنا مثال على استعمال `return` فارغة (أو يمكننا وضع متغير أولي بعدها، لا فرق):

```

function SmallUser() {
this.name = "John";
return; // ← this تُرجِع
}
alert( new SmallUser().name ); // John
```

لا تحتوي الدوال البانية غالبًا على تعليمة الإعادة `return`. نذكر هنا هذا التصرف الخاص عند إرجاع الكائنات بغرض شمول جميع النواحي.

### **حذف الأقواس**

بالمناسبة، يمكننا حذف أقواس `new` في حال غياب المعاملات مُعامِلات:

```
let user = new User; // <-- لا يوجد أقوس
// الغرض ذاته
let user = new User();
```

لا يُعد حذف الأقواس أسلوبًا جيدَا، لكن الصيغة مسموح بها من خلال المواصفات.

## الدوال في الباني

استخدام الدوال البانية لإنشاء الكائنات يُعطي مرونة كبيرة. قد تحتوي الدالة البانية على مُعامِلات ترشد في بناء الكائن ووضعه، إذ يمكننا إضافة خاصيات ودوال إلى `this` بالطبع. مثلًا، تُنشِئ `new User(name)‎` في الأسفل كائنًا بالاسم المُعطَى `name` والدالة `sayHi`:

```
function User(name) {
this.name = name;
this.sayHi = function() {
alert( "My name is: " + this.name );
};
}
let john = new User("John");
john.sayHi(); // My name is: John
/*
john = {
name: "John",
sayHi: function() { ... }
}
*/

```

لإنشاء كائنات أكثر تعقيدًا، يوجد صيغة أكثر تقدمًا، الفئات، والتي سنغطيها لاحقًا.

## الخلاصة

- الدوال البانية، أو باختصار البانيات، هي دوال عادية، لكن يوجد اتفاق متعارف عليه ببدء اسمها بحرف كبير.
- يجب استدعاء الدوال البانية باستخدام `new` فقط. يتضمن هذا الاستدعاء إنشاء كائن فارغ وإسناده إلى `this` وبدء العملية ثم إرجاع هذا الكائن في نهاية المطاف.
- يمكننا استخدام الدوال البانية لإنشاء كائنات متعددة متشابهة.
- تزود JavaScript دوالًا بانية للعديد من الأنواع (الكائنات) المدمجة في اللغة: مثل النوع `Date` للتواريخ، و `Set` للمجموعات وغيرها من الكائنات التي نخطط لدراستها.

### **عودة قريبة**

غطينا الأساسيات فقط عن الكائنات وبانياتها في هذا الفصل. هذه الأساسيات مهمة تمهيدًا لتعلم المزيد عن أنواع البيانات والدوال في الفصل التالي.
بعد تعلم ذلك، سنعود للكائنات ونغطيها بعمق في فصل الخصائص، والوراثة، والأصناف.

## تمارين

### دالتين - كائن واحد

الأهمية: 2
هل يمكن إنشاء الدالة `A` و `B` هكذا `new A()==new B()‎`؟

```
function A() { ... }
function B() { ... }
let a = new A;
let b = new B;
alert( a == b ); // true
```

إن كان ممكنًا، وضح ذلك بمثال برمجي.
**الحل**
نعم يمكن ذلك.
إن كان هناك دالة تُرجِع كائنًا فإن `new` تُرجِعه بدلًا من `this`. لذا فمن الممكن، مثلًا، إرجاع الكائن المعرف خارجيًا `obj`:

```
let obj = {};
function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```

## إنشاء حاسبة جديدة

الأهمية: 5
إنشِئ دالة بانية باسم `Calculator` تنشئ كائنًا بثلاث دوال:

- `read()‎` تطلب قيمتين باستخدام سطر الأوامر وتحفظها في خاصيات الكائن.
- `sum()‎` تُرجِع مجموع الخاصيتين.
- `mul()‎` تُرجِع حاصل ضرب الخاصيتين.
  مثلًا:

```
let calculator = new Calculator();
calculator.read();
alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

**الحل**

```
function Calculator() {
this.read = function() {
this.a = +prompt('a?', 0);
this.b = +prompt('b?', 0);
};
this.sum = function() {
return this.a + this.b;
};
this.mul = function() {
return this.a * this.b;
};
}
let calculator = new Calculator();
calculator.read();
alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

## إنشاء مجمِّع

الأهمية: 5
أنشِئ دالة بانية باسم `Accumulator(startingValue)‎`، إذ يجب أن يتصف هذا الكائن بأنَّه:

- يخزن القيمة الحالية في الخاصية `value`. تُعَيَّن قيمة البدء عبر المعامل `startingValue` المعطى من الدالة البانية.
- يجب أن تستخدم الدالة `read()` الدالة `prompt` لقراءة رقم جديد وإضافته إلى `value`.
  بمعنى آخر، الخاصية `value` هي مجموع القيم المدخلة بواسطة المستخدم بالإضافة إلى القيمة الأولية `startingValue`.
  هنا مثال على ما يجب أن يُنَفَّذ:

```
let accumulator = new Accumulator(1); // القيمة الأولية 1
accumulator.read(); // يضيف قيمة مدخلة بواسطة المستخدم
accumulator.read(); // يضيف قيمة مدخلة بواسطة المستخدم
alert(accumulator.value); // يعرض مجموع القيم
```

**الحل**

```
function Accumulator(startingValue) {
this.value = startingValue;
this.read = function() {
this.value += +prompt('How much to add', 0);
};
}
let accumulator = new Accumulator(1);
accumulator.read();
accumulator.read();
alert(accumulator.value);
```

ترجمة -وبتصرف- للفصل [Constructor, operator "new"](https://javascript.info/constructor-new) من
كتاب [The JavaScript Language](https://javascript.info/js)
