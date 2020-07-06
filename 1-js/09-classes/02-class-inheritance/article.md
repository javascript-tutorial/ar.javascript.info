
# Class توريث ال

توريث الclass هو وسيلة لفئة واحدة لتمديد فئة أخرى.

حتى نتمكن من إنشاء وظائف جديدة على رأس القائمة.

## الكلمة الرئيسية "يمتد"

لنفترض أن لدينا فئة `Animal`:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");
```

إليك كيفية تمثيل كائن "الحيوان" وفئة "الحيوان" بشكل رسومي:

![](rabbit-animal-independent-animal.svg)

... ونود إنشاء "أرنب من الدرجة" آخر.

نظرًا لأن الأرانب حيوانات ، يجب أن تستند فئة "الأرانب" إلى "الحيوانات" ، وأن تكون قادرة على الوصول إلى الأساليب الحيوانية ، حتى تتمكن الأرانب من القيام بما يمكن أن تفعله الحيوانات "العامة".

بناء الجملة لتمديد فئة أخرى هو: `class child Extended Parent`.

لنقم بإنشاء "أرنب الطبقة" الذي يرث من "الحيوان":

```js
*!*
class Rabbit extends Animal {
*/!*
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```

يمكن لكائن فئة "أرنب" الوصول إلى كل من طرق "أرنب" ، مثل "أرنب. إخفاء ()" ، وأيضًا إلى طرق "الحيوان" ، مثل "أرنب". () `.

داخليًا ، تعمل الكلمة الرئيسية `` الموسعة '' باستخدام ميكانيكا النموذج القديم الجيدة. يقوم بتعيين "Rabbit.prototype. [[Prototype]]` إلى "Animal.prototype`. لذلك ، إذا لم يتم العثور على طريقة في `Rabbit.prototype` ، فإن JavaScript تأخذها من` Animal.prototype`.

![](animal-rabbit-extends.svg)

على سبيل المثال ، للعثور على طريقة `rabbit.run` ، يتحقق المحرك (من أسفل إلى أعلى في الصورة):
1. كائن "الأرنب" (ليس له "تشغيل").
2. نموذجها الأولي ، وهو "Rabbit.prototype" (به "إخفاء" وليس "تشغيل").
3. نموذجها الأولي ، أي (بسبب "يمتد") "Animal.prototype" ، الذي يحتوي في النهاية على طريقة "run".

كما يمكننا أن نتذكر من الفصل <info: original-prototypes> ، فإن JavaScript نفسها تستخدم الوراثة النموذجية للكائنات المدمجة. على سبيل المثال `Date.prototype. [[Prototype]]` هو `Object.prototype`. هذا هو السبب في أن التواريخ يمكنها الوصول إلى طرق الكائنات العامة.

````smart header="يسمح بأي تعبير بعد "يمتد"
يسمح بناء جملة الصنف بتحديد ليس فئة فقط ، ولكن أي تعبير بعد "يمتد".

على سبيل المثال ، استدعاء دالة ينشئ الفئة الأصل:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
}

*!*
class User extends f("Hello") {}
*/!*

new User().sayHi(); // Hello
```
هنا يرث `مستخدم class` من نتيجة` f ("Hello") `.

قد يكون ذلك مفيدًا لأنماط البرمجة المتقدمة عندما نستخدم الدالات لإنشاء فئات اعتمادًا على العديد من الشروط ويمكن أن ترثها.
````

## تجاوز دالة

الآن دعنا نمضي قدمًا ونستبدل إحدى الطرق. افتراضيًا ، يتم أخذ جميع الطرق غير المحددة في "class Rabbit" مباشرةً "كما هي" من "class Animal`.

ولكن إذا حددنا طريقتنا الخاصة في "أرنب" ، مثل `stop ()` ، فسيتم استخدامها بدلاً من ذلك:

```js
class Rabbit extends Animal {
  stop() {
    // ...now this will be used for rabbit.stop()
    // instead of stop() from class Animal
  }
}
```

عادة لا نريد استبدال طريقة رئيسية تمامًا ، ولكن بدلاً من ذلك نبني عليها لاستبدالها أو توسيع وظائفها. نفعل شيئًا في طريقتنا ، ولكن استدعاء الطريقة الأم قبل / بعدها أو في العملية.

توفر الفصول كلمة رئيسية `` فائقة '' لذلك.

- `super.method (...)` لاستدعاء طريقة أصل.
- `` super (...) `لاستدعاء مُنشئ أصل (داخل مُنشئنا فقط).

على سبيل المثال ، دع أرنبا يختبئ تلقائيًا عندما يتوقف:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

*!*
  stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }
*/!*
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White rabbit hides!
```

الآن يحتوي "الأرنب" على طريقة "الإيقاف" التي تستدعي الأصل `super.stop ()` في العملية.

````smart header="وظائف السهم ليس لها" سوبر "
كما ذكر في الفصل <info: arrow-function> ، فإن دالات الأسهم لا تحتوي على `super`.

إذا تم الوصول إليه ، فهو مأخوذ من الوظيفة الخارجية. على سبيل المثال:

```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
  }
}
```

وظيفة `super` في وظيفة السهم هي نفسها في` stop () `، لذا فهي تعمل على النحو المنشود. إذا حددنا وظيفة "عادية" هنا ، فسيكون هناك خطأ:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````


## تجاوز constructor

مع المنشئين يصبح الأمر صعبًا بعض الشيء.

حتى الآن ، لم يكن لدى "الأرنب" "مُنشئ" خاص به.

وفقًا لـ [المواصفات] (https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation) ، إذا كان الفصل يمتد إلى فصل آخر ولا يحتوي على "مُنشئ" ، فإن المُنشئ التالي "الفارغ" التالي `يتم إنشاء:

```js
class Rabbit extends Animal {
  // generated for extending classes without own constructors
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

كما نرى ، فإنه يطلق بشكل أساسي على `المنشئ` الأصل ويمررها جميع الحجج. يحدث هذا إذا لم نكتب مُنشئًا خاصًا بنا.

الآن دعنا نضيف مُنشئًا مخصصًا لـ "أرنب". ستحدد "طول الأذن" بالإضافة إلى "الاسم":


```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
// Doesn't work!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
*/!*
```

عفوًا! لدينا خطأ. الآن لا يمكننا إنشاء الأرانب. ماذا حصل؟

الاجابة السريعة:

- **الإجابة المختصرة هي: يجب على منشئو الفصول الموروثة استدعاء `super (...)` و (!) قبل ذلك باستخدام `this`.**

...لكن لماذا؟ ماذا يجري هنا؟ في الواقع ، يبدو الشرط غريبًا.

بالطبع ، هناك تفسير. دعنا ندخل في التفاصيل ، حتى تفهم حقًا ما يحدث.

في جافا سكريبت ، هناك تمييز بين دالة المُنشئ لفئة وراثية (ما يسمى "مُنشئ مُشتق") ووظائف أخرى. لدى المنشئ المشتق خاصية داخلية خاصة `[[ConstructorKind]]:" مشتق "". هذا تسمية داخلية خاصة.

يؤثر هذا التصنيف على سلوكه بـ "جديد".

- عندما يتم تنفيذ وظيفة عادية باستخدام `new` ، فإنها تنشئ كائنًا فارغًا وتعينه بـ` this`.
- ولكن عندما يعمل منشئ مشتق ، فإنه لا يفعل ذلك. وتتوقع من المُنشئ الأصلي أن يقوم بهذه المهمة.

لذا يجب على المُنشئ المشتق استدعاء `super` من أجل تنفيذ مُنشئه الأصلي (غير المُشتق) ، وإلا فلن يتم إنشاء كائن` this`. وسنحصل على خطأ.

لكي يعمل مُنشئ "الأرنب" ، يجب الاتصال بـ "super ()` قبل استخدام `this` ، كما يلي:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
// now fine
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```

### Overriding class fields: a tricky note

```warn header="Advanced note"
This note assumes you have a certain experience with classes, maybe in other programming languages.

It provides better insight into the language and also explains the behavior that might be a source of bugs (but not very often).

If you find it difficult to understand, just go on, continue reading, then return to it some time later.
```

We can override not only methods, but also class fields.

Although, there's a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.

Consider this example:

```js run
class Animal {
  name = 'animal'

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
*!*
new Rabbit(); // animal
*/!*
```

Here, class `Rabbit` extends `Animal` and overrides `name` field with its own value.

There's no own constructor in `Rabbit`, so `Animal` constructor is called.

What's interesting is that in both cases: `new Animal()` and `new Rabbit()`, the `alert` in the line `(*)` shows `animal`.

**In other words, parent constructor always uses its own field value, not the overridden one.**

What's odd about it?

If it's not clear yet, please compare with methods.

Here's the same code, but instead of `this.name` field we call `this.showName()` method:

```js run
class Animal {
  showName() {  // instead of this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // instead of alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
*!*
new Rabbit(); // rabbit
*/!*
```

Please note: now the output is different.

And that's what we naturally expect. When the parent constructor is called in the derived class, it uses the overridden method.

...But for class fields it's not so. As said, the parent constructor always uses the parent field.

Why is there the difference?

Well, the reason is in the field initialization order. The class field is initialized:
- Before constructor for the base class (that doesn't extend anything),
- Imediately after `super()` for the derived class.

In our case, `Rabbit` is the derived class. There's no `constructor()` in it. As said previously, that's the same as if there was an empty constructor with only `super(...args)`.

So, `new Rabbit()` calls `super()`, thus executing the parent constructor, and (per the rule for derived classes) only after that its class fields are initialized. At the time of the parent constructor execution, there are no `Rabbit` class fields yet, that's why `Animal` fields are used.

This subtle difference between fields and methods is specific to JavaScript

Luckily, this behavior only reveals itself if an overridden field is used in the parent constructor. Then it may be difficult to understand what's going on, so we're explaining it here.

If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.

## Super: الأجزاء الداخلية ، [[HomeObject]]

```warn header="معلومات متقدمة"
إذا كنت تقرأ البرنامج التعليمي لأول مرة - فقد يتم تخطي هذا القسم.

إنه يتعلق بالآليات الداخلية الكامنة وراء الميراث و "السوبر".
``

دعونا نتعمق قليلاً تحت غطاء "السوبر". سنرى بعض الأشياء المثيرة للاهتمام على طول الطريق.

بادئ ذي بدء ، من كل ما تعلمناه حتى الآن ، من المستحيل أن يعمل "السوبر" على الإطلاق!

نعم ، في الواقع ، دعونا نسأل أنفسنا ، كيف يجب أن تعمل تقنيًا؟ عندما يتم تشغيل أسلوب كائن ، فإنه يحصل على الكائن الحالي باسم `هذا`. إذا استدعىنا "super.method ()` ، فسيحتاج المحرك إلى الحصول على "الطريقة" من النموذج الأولي للكائن الحالي. ولكن كيف؟

قد تبدو المهمة بسيطة ، لكنها ليست كذلك. المحرك يعرف الكائن الحالي `هذا` ، لذا يمكن أن يحصل على` الطريقة` الرئيسية كـ `هذا .__ بروتو __. الطريقة`. لسوء الحظ ، لن يعمل مثل هذا الحل "الساذج".

دعونا نثبت المشكلة. بدون فصول ، استخدام الأشياء البسيطة من أجل البساطة.

يمكنك تخطي هذا الجزء والانتقال أدناه إلى القسم الفرعي [[HomeObject]] `إذا كنت لا تريد معرفة التفاصيل. هذا لن يضر. أو اقرأ إذا كنت مهتمًا بفهم الأشياء بعمق.

في المثال أدناه ، "rabbit .__ proto__ = animal`. الآن دعنا نحاول: في "rabbit.eat ()` سنطلق عليه `animal.eat ()` ، باستخدام `this .__ proto__`:


```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
*!*
    // that's how super.eat() could presumably work
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```

عند السطر `(*)` نأخذ `نأكل` من النموذج الأولي (` الحيوان`) ونطلق عليه في سياق الكائن الحالي. يرجى ملاحظة أن ".call (هذا)` مهم هنا ، لأن "هذا .__ proto __.

وفي الكود أعلاه يعمل في الواقع على النحو المنشود: لدينا "التنبيه" الصحيح.

الآن دعنا نضيف كائنًا آخر إلى السلسلة. سنرى كيف تنكسر الأشياء:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...bounce around rabbit-style and call parent (animal) method
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...do something with long ears and call parent (rabbit) method
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Error: Maximum call stack size exceeded
*/!*
```

الكود لم يعد يعمل! يمكننا رؤية الخطأ في محاولة استدعاء `longEar.eat ()`.

قد لا يكون ذلك واضحًا ، ولكن إذا تتبعنا مكالمة `longEar.eat ()` ، فيمكننا معرفة السبب. في كلا الخطين `(*)` و `(**)` قيمة `هذا` هي الكائن الحالي (` longEar`). هذا أمر ضروري: تحصل جميع أساليب الكائن على الكائن الحالي كـ `this` ، وليس كنموذج أولي أو شيء من هذا القبيل.

لذا ، في كلا الخطين `(*)` و `(**)` قيمة `هذا .__ proto__` هي نفسها بالضبط:" أرنب ". كلاهما يطلق عليه "rabbit.eat" دون الصعود في السلسلة في الحلقة اللانهائية.

إليك صورة لما يحدث:

![](this-super-loop.svg)

1. داخل `longEar.eat ()` ، يستدعي السطر `(**)` rabbit.eat` تزويده بـ `this = longEar`.
    ```js
    // inside longEar.eat() we have this = longEar
    this.__proto__.eat.call(this) // (**)
    // becomes
    longEar.__proto__.eat.call(this)
    // that is
    rabbit.eat.call(this);
    ```
2. ثم في السطر `(*)` من 'rabbit.eat` ، نرغب في تمرير المكالمة أعلى في السلسلة ، ولكن `this = longEar` ، لذا` هذا .__ proto __. eat` هو مرة أخرى " أرنب يأكل `!

    ```js
    // inside rabbit.eat() we also have this = longEar
    this.__proto__.eat.call(this) // (*)
    // becomes
    longEar.__proto__.eat.call(this)
    // or (again)
    rabbit.eat.call(this);
    ```

3. ... لذا فإن "rabbit.eat" تطلق على نفسها اسمها في الحلقة اللانهائية ، لأنها لا تستطيع الصعود أكثر من ذلك.

لا يمكن حل المشكلة باستخدام "هذا" وحده.

### `[[HomeObject]]`

لتوفير الحل ، تضيف JavaScript خاصية داخلية خاصة أخرى للوظائف: `[[HomeObject]]`.

عند تحديد دالة كفئة أو أسلوب كائن ، تصبح خاصية `[[HomeObject]]` هي ذلك الكائن.

ثم يستخدمه `super` لحل النموذج الأولي وطرقه.

دعونا نرى كيف يعمل ، أولاً مع الأشياء العادية:

```js run
let animal = {
  name: "Animal",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

*!*
// works correctly
longEar.eat();  // Long Ear eats.
*/!*
```

يعمل على النحو المقصود ، بسبب ميكانيكا `[[HomeObject]]. هناك طريقة ، مثل `longEar.eat` ، تعرف` [[HomeObject]] `وتأخذ الطريقة الأم من النموذج الأولي الخاص بها. دون أي استخدام "هذا".

### الدوال ليست "مجانية"

كما عرفنا من قبل ، تكون الوظائف عمومًا "مجانية" ، وليست مرتبطة بكائنات في JavaScript. لذا يمكن نسخها بين الأشياء واستدعاؤها بـ "هذا" آخر.

إن وجود [[HomeObject]] بحد ذاته ينتهك هذا المبدأ ، لأن الأساليب تتذكر أغراضها. لا يمكن تغيير `[[HomeObject]]` ، لذا فإن هذه الرابطة إلى الأبد.

المكان الوحيد في اللغة حيث يتم استخدام `[[HomeObject]] - هو` super`. لذلك ، إذا كانت الطريقة لا تستخدم `super` ، فيمكننا اعتبارها مجانية ونسخها بين الكائنات. ولكن مع الأشياء "الفائقة" ، قد تسوء الأمور.

في ما يلي عرض توضيحي لنتيجة "خارقة" خاطئة بعد النسخ:

```js run
let animal = {
  sayHi() {
    console.log(`I'm an animal`);
  }
};

// rabbit inherits from animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    console.log("I'm a plant");
  }
};

// tree inherits from plant
let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // I'm an animal (?!?)
*/!*
```

يُظهر استدعاء "tree.sayHi ()` أنا حيوان ". خطأ بالتأكيد.

والسبب بسيط:
- في السطر `(*)` ، تم نسخ الأسلوب `tree.sayHi` من` rabbit`. ربما أردنا فقط تجنب تكرار التعليمات البرمجية؟
- "[[HomeObject]]` هو "أرنب" ، حيث تم إنشاؤه في "أرنب". لا توجد طريقة لتغيير `[[HomeObject]]`.
- كود `tree.sayHi ()` يحتوي على `super.sayHi ()` بالداخل. يرتفع من "أرنب" ويأخذ الطريقة من "حيوان".

إليك الرسم البياني لما يحدث:

![](super-homeobject-wrong.svg)

### الدوال ، وليس خصائص الدوال

يتم تعريف `[[HomeObject]]` للطرق سواء في الفئات أو في الكائنات العادية. ولكن بالنسبة للكائنات ، يجب تحديد الطرق تمامًا باسم `الطريقة ()` ، وليس كـ '' الطريقة: الوظيفة () "`.

قد يكون الاختلاف غير ضروري بالنسبة لنا ، ولكنه مهم لجافا سكريبت.

في المثال أدناه ، يتم استخدام بناء جملة غير أسلوب للمقارنة. لم يتم تعيين خاصية `[[HomeObject]]` ولا يعمل الميراث:

```js run
let animal = {
  eat: function() { // intentionally writing like this instead of eat() {...
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
*/!*
```

## ملخص

1. لتمديد الفصل الدراسي: `class child تمديد Parent`:
     - هذا يعني أن "Child.prototype .__ proto__" سيكون "Parent.prototype" ، لذلك يتم توريث الطرق.
2. عند تجاوز منشئ:
     - يجب أن نطلق على مُنشئ الوالدين باسم `super ()` في مُنشئ `Child` قبل استخدام` this`.
3. عند تجاوز طريقة أخرى:
     - يمكننا استخدام `super.method ()` في طريقة `Child` لاستدعاء طريقة` Parent`.
4. الداخلية:
     - تتذكر الأساليب فئتها / كائنها في خاصية `[[HomeObject]] الداخلية. هذه هي الطريقة التي يحل `super` الأساليب الأم.
     - لذا ليس من الآمن نسخ طريقة باستخدام "super" من كائن إلى آخر.

أيضا:
- لا تحتوي وظائف السهم على "هذا" أو "فائق" خاص بها ، لذا فهي تتناسب بشفافية مع السياق المحيط.
