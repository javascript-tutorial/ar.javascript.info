# جالبات الخصائص وضابطاتها (Getters and Setters)

يوجد نوعين من الخصائص.

<<<<<<< HEAD
الأوّل هو خصائص البيانات _data properties_. نحن بالفعل نعلم كيف نتعامل مع هذا النوع. إذ كلّ ما استعملناه من البداية حتى الآن هو خصائص البيانات.
=======
There are two kinds of object properties.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

النوع الثاني من الخصائص هو شيئ ما جديد. و هو _accessor properties_. هي دوال بشكل أساسي تجلب القيم و تضبطها, ولكن في الكود تظهرُ لنا وكأنها خصائص عادية.

<<<<<<< HEAD
## الجالبات والضابطات
=======
The second type of properties is something new. It's *accessor properties*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

خصائص الوصول تمثل بـ "getter" و "setter". يشار إليهم داخل الكائن بـ `get` and `set`:

```js
let obj = {
  *!*get propName()*/!* {
    // ‫جالب، يُستعمَل لجلب قيمة الخاصية obj.propName
  },

  *!*set propName(value)*/!* {
    // ‫ضابط يُستعمَل لضبط قيمة الخاصية obj.propName إلى value
  }
};
```

يستعمل الجالب عند قراءة الخاصية `obj.propName`, الضابط -- عند ضبط أو إسناد قيمة تلك الخاصية.

لاحظ مثلا, لدينا كائن `user` و لديه `name` و `surname`:

```js
let user = {
  name: 'John',
  surname: 'Smith',
};
```

الآن نريد إضافة خاصية الاسم الكامل `fullName`, التى يجب ان تكون `"John Smith"`. بالطبع, طبعًا لا نريد نسخ المعلومات ولصقها, لذا سنُنفذها باستخدام خاصية الوصول (ِget) :

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

<<<<<<< HEAD
من الخارج, لا تبدو خاصية الوصول إلا خاصية عادية. وهذا بالضبط الغرض من هذه الخصائص. فلسنا نريد _إستدعاء_ `user.fullName` على أنّها دالة, بل _قراءتها_ بشكل طبيعي: ونترك الجالب يقوم بعمله خلف الكواليس.
=======
From the outside, an accessor property looks like a regular one. That's the idea of accessor properties. We don't *call* `user.fullName` as a function, we *read* it normally: the getter runs behind the scenes.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

حتى الآن, `fullName` لديها فقط جالب. لو حاولنا إسناد قيمة لها عن طريق `user.fullName=`, سوف يحدث خطأ:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // خطأ (للخاصية جالب فقط)
*/!*
```

هيًا نُصلح الخطأ ونُضيف ضابطًا للخاصية `user.fullName`:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// ضبط fullName تم بالقيمة المعطاه.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

و نتيجة لذلك, لدينا خاصية "وهمية" `fullName`. يمكننا قراءتها والكتابة عليها، ولكنها في واقع الأمر، غير موجودة.

## واصفات الوصول (Accessor Descriptors)

واصِفات خصائص الوصول (Accessor Properties) تختلف عن واصِفات خصائص البيانات (Data Properties).

بالنسبة لخصائص الوصول, لا يوجد `value` او `writable`, و لكن بدلاً من ذلك يوجد دوال `get` و `set`.

أي, واصف الوصول يمكن ان يمتلك ما يلي:

- **`get`** -- داله لا تستقبل قيم, و تعمل عند قراءة الخاصية,
- **`set`** -- داله تستقبل قيمة واحدة, و تعمل عند إرادة ضبة الخاصية,
- **`enumerable`** -- خاصية قابلية الإحصاء وهي مشابهة لخاصيّات البيانات,
- **`configurable`** -- خاصية قابلية إعادة الضبط وهي مشابهة لخاصيّات البيانات.

فمثلاً, لنُنشئ خاصية الوصول `fullName` بإستخدام `defineProperty`, يمكن أن نُمرر واصفاً مثل `get` و `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

يرجى ملاحظة أن الخاصية يمكن ان تكون خاصية وصول (لها طرق `get/set`) او خاصية بيانات (لديها `value`), و لكن ليس كلاهما.

لو حاولنا تقديم `get` و `value` معاً في نفس الواصف, سوف يحدث خطأ:

```js run
*!*
// خطأ: واصِف الخاصية غير صالح.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## الجوالب والضوابط الذكية

يمكننا استعمال الجوالب والضوابط كأغلفة لقيم الخاصيات "الفعلية" لكى تستطيع التحكم اكثر في العمليات بينهم.

فمثلاً, إذا اردنا منع الأسماء القصيرة لـ `user`, فيمكن ان يكون لدينا الضابط `name` و ترك القيمه في خاصية منفصلة `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert('Name is too short, need at least 4 characters');
      return;
    }
    this._name = value;
  },
};

user.name = 'Pete';
alert(user.name); // Pete

user.name = ''; // ...الإسم قصير جدا
```

إذاً, سوف يتخزن الإسم في خاصية `_name`, و الوصول سوف يكون عن طريق الجالبات و الضابطات.

عملياً, الكود الخارجي يمكن ان يصل الى الإسم بشكل مباشر عن طريق إستخدام `user._name`. ولكن هناك مفهوم شائع هو أنّ الخاصيات التي تبدأ بشرطة سفلية `"_"` هي خاصيات داخلية وممنوع التعديل عليها من خارج الكائن.

## استعمالها لغرض التوافقية

إحدى استعمالات خاصيات الوصول هذه هي إتاحة الفرصة للتحكّم بخاصية بيانات "عادية" متى أردنا واستبدالها بدالتي جلب وضبط وتعديل سلوكها.

لنقل مثلًا بأنّا بدأنا المشروع حيث كانت كائنات المستخدمين تستعمل خاصيات البيانات `name` and `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User('John', 25);

alert(john.age); // 25
```

...و لكن عاجلاً ام آجلاً, يمكن أن تتغير الأمور. بدلاً من `age` يمكن ان نقرر التخزين في `birthday`, لأنه اكثر دقه و سهوله في الإستعمال:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User('John', new Date(1992, 6, 1));
```

و لكن ماذا نفعل مع الكود القديم الذي ما زال يستخدم خاصية `age`؟

يمكن إن نبحث عن كل الأماكن التى تستخدمها و نقوم بالإصلاح, و لكن ذلك سوف يتغرق الوقت و يمكن ان يكون من الصعب تنفيذه إذا كان هذا الكود يستخدمه اشخاص آخرون. كما إن وجود عمر المستخدم, `age` داخل `user` هو امر جيد, اليس كذلك ؟

دعنا نبقي الخاصية كما هي.

إضافة جالب للخاصية `age` سوف يقوم بحل المشكلة:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // العمر هو الفرق بين التاريخ اليوم وتاريخ الميلاد
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // تاريخ الميلاد موجود
alert( john.age );      // ...وعمر المستخدم أيضًا
```

الآن الكود القديم يعمل إيضاً و لدينا خاصية إضافية لطيفه.
