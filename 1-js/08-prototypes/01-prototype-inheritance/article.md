# الوراثة النموذجية (Prototypal inheritance)

أثناء البرمجة، نرى دائما مواقف حيث تريد أخذ شيء وتوسعته أكثر.

فمثلًا لدينا كائن مستخدم `user` له خاصيات وتوابِع، وأردنا إنشاء نسخ عنه (مدراء `admin` وضيوف `guest`) لكن معدّلة قليلًا. سيكون رائعًا لو أعدنا استعمال الموجود في كائن المستخدم بدل نسخه أو إعادة كتابة توابِعه، سيكون رائعًا لو صنعنا كائنًا جديدًا فوق كائن `user`.

_الوراثة النموذجية_ (تدعى أيضًا الوراثة عبر كائن النموذج الأولي prototype)\* هي الميزة الّتي تساعدنا في تحقيق هذا الأمر.

## الخاصية [[Prototype]]

لكائنات جافا سكريبت خاصية مخفية أخرى باسم `[[Prototype]]` (هذا اسمها في المواصفات القياسية للغة جافا سكريبت)، وهي إمّا أن تكون `null` أو أن تشير إلى كائن آخر. نسمّي هذا الكائن بِـ”prototype“ (نموذج أولي).

عند قراءة خاصية من `كائن` وتعذر وجودها، تقوم جافا سكريبت تلقائيًا بأخذها من النموذج الأصلي. في البرمجة، يُطلق على مثل هذا الأمر "الوراثة النمطية" ("Prototypal inheritance"). وقريبًا سندرس العديد من الأمثلة على هذه الوراثة، بالإضافة إلى ميزات لغوية أكثر إثارة تستند عليها.

إن كائن النموذج الأولي ”سحريٌ“ إن صحّ القول، فحين نريد قراءة خاصية من كائن `object` ولا يجدها محرّك جافا سكريبت، يأخذها تلقائيًا من كائن النموذج الأولي لذاك الكائن. يُسمّى هذا في علم البرمجة ”بالوراثة النموذجية“ (‏Prototypal inheritance)، وهناك العديد من المزايا الرائعة في اللغة وفي التقنيات البرمجية مبنية عليها.

الخاصية `[[Prototype]]` هي خاصية داخلية ومخفية، إلّا أنّ هناك طُرق عديدة لنراها.
‎  
إحداها استعمال `__proto__` هكذا:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
*/!*
```

الآن إذا قرأنا خاصية من `rabbit`، ولم تكن موجودة، ستقوم جافاسكريبت تلقائيًا بأخذها من `animal`.
```js
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// الآن كلتا الخاصيتين في الأرنب:
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

هنا نضبط (في السطر `(*)`) كائن `animal` ليكون النموذج الأولي (Prototype) للكائن `rabbit`.

بعدها متى ما حاولت التعليمة `alert` قراءة الخاصية `rabbit.eats` (انظر `(**)`)، ولم يجدها في كائن `rabbit` ستتبع لغة جافا سكريبت الخاصية `[[Prototype]]` لمعرفة ما هو كائن النموذج الأولي لكائن `rabbit`، وسيجده كائن `animal` (البحث من أسفل إلى أعلى):

[proto-animal-rabbit.png]

يمكن أن نقول هنا بأنّ الكائن `animal` هو النموذج الأولي للكائن `rabbit`، أو كائن `rabbit` هو نسخة نموذجية من الكائن `animal`.

وبهذا لو كان للكائن `animal` خاصيات وتوابِع كثيرة مفيدة، تصير مباشرةً موجودة عند كائن `rabbit`. نسمّي هذه الخاصيات بأنّها ”موروثة“.

لو كان للكائن `animal` تابِعًا فيمكننا استدعائه في كائن `rabbit`:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal walk");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// نأخذ ‫ walk من كائن النموذج الأولي
*!*
rabbit.walk(); // Animal walk
*/!*
```

يُؤخذ التابِع تلقائيًا من كائن النموذج الأولي، هكذا:

[proto-animal-rabbit-walk.png]

يمكن أيضًا أن تكون سلسلة الوراثة النموذجية (النموذج الأولي) أطول:

```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

// نأخذ الدالّة ‫walk من سلسلة الوراثة النموذجية
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (from rabbit)
```

![](proto-animal-rabbit-chain.svg)

الآن إذا قرأنا شيئًا من `longEar`، ولم يتم العثور عليه، ستبحث جافاسكريبت عنه أولاً في `rabbit`، ثم في `animal`.

هناك فقط حدْان:

ومن الواضح جليًا أيضًا أي كائن سيرث كائن `[[Prototype]]` واحد وواحد فقط، لا يمكن للكائن وراثة كائنين.

```smart header="`**proto**`is a historical getter/setter for`[[Prototype]]`"
It's a common mistake of novice developers not to know the difference between these two.

Please note that `__proto__` is _not the same_ as the internal `[[Prototype]]` property. It's a getter/setter for `[[Prototype]]`. Later we'll see situations where it matters, for now let's just keep it in mind, as we build our understanding of JavaScript language.

The `__proto__` property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use `Object.getPrototypeOf/Object.setPrototypeOf` functions instead that get/set the prototype. We'll also cover these functions later.

By the specification, `__proto__` must only be supported by browsers. In fact though, all environments including server-side support `__proto__`, so we're quite safe using it.

As the `__proto__` notation is a bit more intuitively obvious, we use it in the examples.

````

## Writing doesn't use prototype

لا يمكننا تعديل أو حذف خصائص أو دوالّ من كائن النموذج الأولي وإنما هو للقراءة فقط. وأيّة عمليات كتابة أو حذف تكون مباشرةً على الكائن نفسه وليس على كائن النموذج الأولي.

في المثال أسفله نُسند التابِع `walk` إلى الكائن `rabbit`:


```js run
let animal = {
  eats: true,
  walk() {
    /* لن يستعمل الكائن‫ `rabbit` هذا التابِع */
  }
};

let rabbit = {
  __proto__: animal
};

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
````

من الآن فصاعدًا فستجد استدعاء التابع `rabbit.walk()‎` سيكون من داخل كائن `rabbit` مباشرةً وتُنفّذه دون استعمال كائن النموذج الأولي:

![](proto-animal-rabbit-walk-2.svg)

ولكن خاصيات الوصول استثناء للقاعدة، إذ يجري الإسناد على يد دالة الضابِط، أي أنّك بالكتابة في هذه الخاصية في الكائن الجديد ولكنّك استدعيت دالة الضابط الخاصة بكائن النموذج الأولي لإسناد هذه القيمة.

لهذا السبب نرى الخاصية `admin.fullName` في الشيفرة أسفله تعمل كما ينبغي لها:

```js run
let user = {
  name: 'John',
  surname: 'Smith',

  set fullName(value) {
    [this.name, this.surname] = value.split(' ');
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

alert(admin.fullName); // John Smith (*)

// عمل الضابِط!
admin.fullName = 'Alice Cooper'; // (**)

alert(admin.fullName); // Alice Cooper, state of admin modified
alert(user.fullName); // John Smith, state of user protected
```

هنا في السطر `(*)` نرى أن `admin.fullName` استدعت الجالِب داخل الكائن `user`، ولهذا استُدعيت الخاصية. وفي السطر `(**)` نرى عملية إسناد للخاصية `admin.fullName` ولهذا استدعيَ الضابِط داخل الكائن `user`.

## ماذا عن "this"؟

بعدما تتمعّن في المثال أعلاه، يمكن أن تتساءل ما قيمة `this` داخل `set fullName(value)‎`؟ أين كُتبت القيم الجديدة `this.name` و `this.surname`؟ داخل الكائن `user` أم داخل الكائن `admin`؟

جواب هذا السؤال المحيّر بسيط: لا تؤثّر كائنات النموذج الأولي على قيمة `this`.

**أينما كان التابِع موجودًا أكان في الكائن أو في كائن النموذج الأولي، سيكون تأثير `this` على الكائن الّذي قبل النقطة (الكائن المستدعى من خلاله هذه الخاصية) دائمًا وأبدًا.**

لهذا فالضابِط الّذي يستدعي `admin.fullName=‎` يستعمل كائن `admin` عوضًا عن `this` وليس الكائن `user`.

في الواقع فهذا أمر مهما جدًا جدًا إذ أنّ لديك ربما كائنًا ضخمًا فيه توابِع كثيرة جدًا، وهناك كائنات أخرى ترثه، وما إن تشغّل تلك الكائنات الموروثة التوابِعَ الموروثة، ستعدّل حالتها هي -أي الكائنات- وليس حالة الكائن الضخم ذاك.

فمثلًا هنا، يمثّل كائن `animal` ”مخزّنَ توابِع“ وكائن `rabbit` يستغلّ هذا المخزن.

فاستدعاء `rabbit.sleep()‎` يضبط `this.isSleeping` على كائن `rabbit`:

```js run
// للحيوان توابِع
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};

let rabbit = {
  name: 'White Rabbit',
  __proto__: animal,
};

// يعدّل rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // غير معرّف (لا يوجد خاصية معرفة في كائن النموذج الأولي بهذا الأسم)‫
```

الصورة الناتجة:

![](proto-animal-rabbit-walk-3.svg)

لو كانت هناك كائنات أخرى (مثل الطيور `bird` والأفاعي `snake` وغيرها) ترث الكائن`animal`، فسيمكنها الوصول إلى توابِع الكائن `animal`، إلّا أنّ قيمة `this` في كلّ استدعاء للتوابِع سيكون على الكائن الّذي استُدعيت منه، وستعرِفه لغة جافا سكريبت أثناء الاستدعاء (أي سيكون الكائن الّذي قبل النقطة) ولن يكون `animal`. لذا متى كتبنا البيانات من خلال `this`، فستُخزّن في تلك الكائنات الّتي استدعيت عليها `this`.

وبهذا نخلص إلى أنّ التوابِع مشتركة، ولكن حالة الكائن ليست مشتركة.

## حلقة for..in

كما أنّ حلقة `for..in` تَمرُّ على الخاصيات الموروثة هي الأخرى.

مثال:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// يُعيد التابع ‫Object.keys خصائص الكائن نفسه فقط
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// تدور حلقة‫ for..in على خصائص الكائن نفسه والخصائص الموروثة معًا
for(let prop in rabbit) alert(prop); // jumps, then eats
*/!*
```

لو لم تكن هذه النتيجة ما نريد (أي نريد استثناء الخاصيات الموروثة)، فيمكن استعمال التابِع [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty) المضمّن في اللغة: إذ يُعيد `true` لو كان للكائن `obj` نفسه (وليس للموروث منه) خاصية بالاسم `key`.

بهذا يمكننا ترشيح الخاصيات الموروثة (ونتعامل معها على حدة):

```js run
let animal = {
  eats: true,
};

let rabbit = {
  jumps: true,
  __proto__: animal,
};

for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // تخصّنا:‫ jumps
  } else {
    alert(`Inherited: ${prop}`); // ورثناها: ‫eats
  }
}
```

هنا نرى سلسلة الوراثة الآتية: يرث كائن `rabbit` كائنَ `animal`، والّذي يرثه هكذا `Object.prototype` (إذ أنّه كائن مجرّد `{...}`، وهذا السلوك المبدئي)، وبعدها يرث `null`:

![](rabbit-animal-object.svg)

ملاحظة لطيفة في هذا السياق وهي: من أين أتى التابِع `rabbit.hasOwnProperty`؟ لم نعرّفه يدويًا! لو تتبّعناه في السلسلة لرأينا بأنّ كائن النموذج الأولي `Object.prototype.hasOwnProperty` هو من قدّم التابِع، أي بعبارة أخرى، ورث كائن `rabbit` هذا التابِع من كائن النموذج الأولي.

ولكن لحظة... لماذا لم يظهر تابع `hasOwnProperty` في حلقة `for..in` كما ظهرت `eats` و `jumps` طالما تُظهر حلقات `for..in` الخاصيات الموروثة؟

الإجابة هنا بسيطة أيضًا: لإنه مُنع من قابلية العدّ (من خلال إسناده لقيمة الراية `enumerable:false`). في النهاية هي مِثل غيرها من الخاصيات في `Object.prototype`- تملك الراية `enumerable:false`، وحلقة `for..in` لا تمرّ إلّا على الخاصيات القابلة للعدّ. لهذا السبب لم نراها لا هي ولا خاصيات `Object.prototype` الأخرى.

**كلّ التوابِع الّتي تجلب المفتاح/القيمة تُهمل الخاصيات الموروثة، تقريبًا مثل تابِع `Object.keys` أو تابِع `Object.values` وما شابههم. إذ إنهم يتعاملون مع خصائص الكائن نفسه ولا يأخذون بعين الاعتبار الخصائص الموروثة**

## الملخص

- لكلّ كائنات جافا سكريبت خاصية `[[Prototype]]` مخفية قيمتها إمّا أحد الكائنات أو `null`.
- يمكننا استعمال `obj.__proto__‎` للوصول إلى هذه الخاصية (وهي خاصية جالِب/ضابِطة). هناك طرق أخرى سنراها لاحقًا.
- الكائن الّذي تُشير إليه الخاصية `[[Prototype]]` يسمّى كائن النموذج الأولي.
- لو أردنا قراءة خاصية داخل كائن ما `obj` أو استدعاء تابِع، ولم تكن موجودة/يكن موجودًا، فسيحاول محرّك جافا سكريبت البحث عنه/عنها في كائن النموذج الأولي.
- عمليات الكتابة والحذف تتطبّق مباشرة على الكائن المُستدعي ولا تستعمل كائن النموذج الأولي (إذ يعدّ أنّها خاصية بيانات وليست ضابِطًا).
- لو استدعينا التابِع `‎obj.method()‎‏` وأخذ المحرّك التابِع `method` من كائن النموذج الأولي، فلن تتغير إشارة `this` وسيُشير إلى `obj`، أي أنّ التوابِع تعمل على الكائن الحالي حتّى لو كانت التوابِع نفسها موروثة.
- تمرّ حلقة `for..in` على خاصيات الكائن والخاصيات الموروثة، بينما لا تعمل توابِع جلب المفاتيح/القيم إلّا على الكائن نفسه.
