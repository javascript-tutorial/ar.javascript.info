
# الصيغة الأساسية للClass

```quote author="Wikipedia"
في البرمجة الموجهة للكائنات ، * الفئة * عبارة عن قالب رمز برنامج قابل للتوسيع لإنشاء الكائنات ، ويوفر القيم الأولية للحالة (متغيرات الأعضاء) وتنفيذ السلوك (وظائف الأعضاء أو الأساليب).
```

من الناحية العملية ، نحتاج غالبًا إلى إنشاء العديد من العناصر من نفس النوع ، مثل المستخدمين أو السلع أو أيا كان.

كما نعلم بالفعل من الفصل <info: buildor-new> ، يمكن أن تساعد `الوظيفة الجديدة` في ذلك.

ولكن في جافا سكريبت الحديثة ، هناك بنية "صنف" أكثر تقدمًا ، تقدم ميزات جديدة رائعة مفيدة للبرمجة الموجهة للكائنات.

# الصيغة الأساسية للClass

الصيغة الأساسية هي: 
```js
class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

ثم استخدم `New MyClass ()` لإنشاء كائن جديد بكل الطرق المدرجة.

يتم استدعاء طريقة `constructor ()` تلقائيًا بواسطة `new` ، حتى نتمكن من تهيئة الكائن هناك.

فمثلا:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Usage:
let user = new User("John");
user.sayHi();
```

عند استدعاء`new User("John")` :
1. يتم إنشاء كائن جديد.
2. يعمل "المُنشئ" مع الوسيطة المحددة ويعين "اسم هذا" إليه.

... ثم يمكننا استدعاء طرق الكائن ، مثل `user.sayHi ()`.


"` `warn header =" لا فاصلة بين طرق الفصل "
من المشاكل الشائعة للمطورين المبتدئين وضع فاصلة بين طرق الفصل ، مما يؤدي إلى خطأ في بناء الجملة.

لا يجب الخلط بين التدوين هنا وحرف الشيء. داخل الفصل الدراسي ، لا يلزم وجود فواصل.
``

## ما هي الclass ؟

إذن ، ما هي "الطبقة" بالضبط؟ هذا ليس كيانًا جديدًا تمامًا على مستوى اللغة ، كما قد يعتقد المرء.

دعونا نكشف عن أي سحر ونرى ما هو الصف حقا. سيساعد ذلك في فهم العديد من الجوانب المعقدة.

في JavaScript ، الفئة هي نوع من الوظائف.

هنا ، ألق نظرة:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// proof: User is a function
*!*
alert(typeof User); // function
*/!*
```

ما يفعله بناء `مستخدم الفئة {... }` حقًا هو:

1. إنشاء وظيفة باسم "المستخدم" ، والتي تصبح نتيجة لإعلان الفئة. يتم أخذ رمز الوظيفة من طريقة `المنشئ` (يفترض أنها فارغة إذا لم نكتب مثل هذه الطريقة).
2. يخزن طرق الفصل ، مثل `sayHi` ، في` User.prototype`.

بعد إنشاء كائن "مستخدم جديد" ، عندما نسمي أسلوبه ، يتم أخذه من النموذج الأولي ، تمامًا كما هو موضح في الفصل <info: function-prototype>. لذا فإن الكائن لديه حق الوصول إلى أساليب الفصل.

يمكننا توضيح نتيجة إعلان "مستخدم الفئة" كما يلي:

![](class-user.svg)

إليك كود لتتفكر فيه: 

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class is a function
alert(typeof User); // function

// ...or, more precisely, the constructor method
alert(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // alert(this.name);

// there are exactly two methods in the prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## ليس مجرد سكر نحوي

أحيانًا يقول الناس أن "class" عبارة عن "سكر نحوي" (بنية تم تصميمها لتسهيل قراءة الأشياء ، ولكن لا تقدم أي شيء جديد) ، لأنه يمكننا في الواقع أن نعلن الشيء نفسه بدون كلمة "class" على الإطلاق:

```js run
// rewriting class User in pure functions

// 1. Create constructor function
function User(name) {
  this.name = name;
}
// a function prototype has "constructor" property by default,
// so we don't need to create it

// 2. Add the method to prototype
User.prototype.sayHi = function() {
  alert(this.name);
};

// Usage:
let user = new User("John");
user.sayHi();
```

نتيجة هذا التعريف هي نفسها. لذا ، هناك بالفعل أسباب تجعل من الممكن اعتبار "class" سكرًا نحويًا لتحديد المنشئ مع طرق النموذج الأولي.

لا تزال هناك اختلافات مهمة.

1. أولاً ، يتم تصنيف دالة تم إنشاؤها بواسطة "class" بواسطة خاصية داخلية خاصة `[[FunctionKind]]:" classConstructor "`. لذلك فهي ليست تمامًا مثل إنشائها يدويًا.

     تقوم اللغة بالتحقق من هذه الخاصية في أماكن متنوعة. على سبيل المثال ، على عكس الوظيفة العادية ، يجب أن يتم استدعاؤها بـ `new`:

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```

أيضًا ، يبدأ تمثيل السلسلة لمنشئ فئة في معظم محركات JavaScript بـ "class ..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
   هناك اختلافات أخرى ، سنراها قريبًا.

2. دوال الclass لا تعد ولا تحصى.
     يقوم تعريف الفئة بتعيين علامة `enumerable` إلى` false` لجميع الطرق في "" prototype "`.

     هذا أمر جيد ، لأنه إذا كنا 'for..in` فوق كائن ما ، فإننا عادة لا نريد طرقه الطبقية.

3. الclasses دائمًا "استخدام صارم".
     تكون جميع التعليمات البرمجية داخل بنية الفصل تلقائيًا في وضع صارم.

بالإضافة إلى ذلك ، فإن بناء جملة `class` يجلب العديد من الميزات الأخرى التي سنستكشفها لاحقًا.

## تعبير الclass

تمامًا مثل functions ، يمكن تعريف الفئات داخل تعبير آخر ، وتمريرها ، وإعادتها ، وتعيينها ، وما إلى ذلك.

إليك مثالاً على تعبير class:
```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

على غرار تعبيرات الوظائف المسماة ، قد يكون لتعبيرات الفئة اسم.

إذا كان تعبير فئة له اسم ، فإنه يكون مرئيًا داخل الفصل فقط:

```js run
// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass name is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass name isn't visible outside of the class
```

يمكننا أيضًا أن نجعل classes ديناميكيًا "حسب الطلب" ، مثل هذا:

```js run
function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// Create a new class
let User = makeClass("Hello");

new User().sayHi(); // Hello
```


## Getters/setters

تمامًا مثل الأشياء الحرفية ، قد تتضمن الفئات الحروف / المستوطنين والخصائص المحسوبة وما إلى ذلك.

في ما يلي مثال لـ `user.name` تم تنفيذه باستخدام` get / set`:

```js run
class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name is too short.
```

من الناحية الفنية ، يعمل إعلان الفئة هذا عن طريق إنشاء الحروف والمستوطنين في `User.prototype`.

## الأسماء المحسوبة [...]

في ما يلي مثال باسم الطريقة المحسوبة باستخدام الأقواس `[...]`:

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

من السهل تذكر هذه الميزات ، لأنها تشبه تلك الموجودة في الأشياء الحرفية.

## حقول class

"` `warn header =" قد تحتاج المتصفحات القديمة إلى ملف متعدد "
تعد حقول الصف إضافة حديثة للغة.
``

في السابق ، كانت فصولنا تمتلك طرقًا فقط.

"حقول class" هي بنية تسمح بإضافة أي خصائص.

على سبيل المثال ، دعنا نضيف خاصية `name` إلى` class User`:

```js run
class User {
*!*
  name = "John";
*/!*

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

لذلك ، نكتب فقط "<اسم الخاصية> = <قيمة>" في الإعلان ، وهذا كل شيء.

الاختلاف المهم في حقول الصف هو أنه يتم تعيينها على كائنات فردية ، وليس `User.prototype`:

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

<<<<<<< HEAD
من الناحية الفنية ، تتم معالجتها بعد أن يقوم المنشئ بعمله ، ويمكننا استخدامه بالنسبة لهم التعبيرات المعقدة واستدعاءات الوظائف:
=======
We can also assign values using more complex expressions and function calls:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```

<<<<<<< HEAD
### عمل طرق مرتبطة بحقول class

كما هو موضح في الفصل <info: bind> ، فإن وظائف JavaScript لها ديناميكية `this`. يعتمد ذلك على سياق المكالمة.
=======

### Making bound methods with class fields
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

لذلك إذا تم تمرير طريقة كائن واستدعاؤها في سياق آخر ، فلن يكون `هذا` مرجعاً إلى كائنه بعد الآن.

على سبيل المثال ، سيُظهر هذا الرمز `undefined`:


```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

تسمى المشكلة "فقدان" this "".

هناك طريقتان لإصلاحها ، كما هو موضح في الفصل <info: bind>:

<<<<<<< HEAD
1. قم بتمرير دالة مجمعة ، مثل `setTimeout (() => button.click ()، 1000)`.
2. ربط طريقة الاعتراض ، على سبيل المثال في المنشئ:

```js run
class Button {
  constructor(value) {
    this.value = value;
*!*
    this.click = this.click.bind(this);
*/!*
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // hello
*/!*
```

توفر حقول class بنية أكثر أناقة للحل الأخير:
=======
1. Pass a wrapper-function, such as `setTimeout(() => button.click(), 1000)`.
2. Bind the method to object, e.g. in the constructor.

Class fields provide another, quite elegant syntax:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

<<<<<<< HEAD
ينشئ حقل الفئة `click = () => {...}` وظيفة مستقلة على كل كائن `Button` ، مع` this` مرتبطًا بالكائن. ثم يمكننا تمرير "button.click" في أي مكان ، وسيتم استدعاؤها باستخدام `this` الصحيح.

هذا مفيد بشكل خاص في بيئة المتصفح ، عندما نحتاج إلى إعداد طريقة كمستمع للأحداث.
=======
The class field `click = () => {...}` is created on a per-object basis, there's a separate function for each `Button` object, with `this` inside it referencing that object. We can pass `button.click` around anywhere, and the value of `this` will always be correct.

That's especially useful in browser environment, for event listeners.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

## ملخص

تبدو بنية الصف الأساسية كما يلي:

```js
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}
```

`MyClass` هي وظيفة من الناحية الفنية (تلك التي نقدمها على أنها `مُنشئ`) ، بينما تتم كتابة الأساليب والرسومات والمستوطنين على` MyClass.prototype`.

في الفصول التالية سنتعلم المزيد عن الفصول ، بما في ذلك الميراث والميزات الأخرى.
