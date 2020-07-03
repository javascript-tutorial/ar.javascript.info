# الوراثة النموذجية -2-

لا تنسَ بأنّك يمكنك إنشاء كائنات جديدة من خلال دالّة الباني (مثل `new F()‎ ‫`).

لو كان `F.prototype` كائن جافاسكربت، فإن المعامِل `new` سيضبط الخاصية `[[Prototype]]` لهذا الكائن الجديد.

من بداية تضمين لغة جافاسكربت للوراثة النموذجية جعلتها من المميزات الأساسية في اللغة.
ولكن في الماضي لم يكن هنالك القدرة للوصول المباشر للوراثة النموذجية والطريقة الوحيدة الّتي حلّت محلها هي خاصية `"prototype"` في دالّة الباني. سنشرح في هذا الدرس كيفية استخدامها لأنه مازال العديد من الشيفرات البرمجية القديمة تستخدمها.

لاحظ بأنّ `F.prototype` هنا تعني وجود خاصية عادية باسم `"prototype"` للكائن `F`. ربما تفكّر وكأنها النموذج الأولي لهذا الكائن، ولكن لا... فهنا نعني حرفيًا أنها خاصية عادية لها هذا الاسم.

إليك مثالًا:

```
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal; // هنا

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

تعني التعليمة `Rabbit.prototype = animal` حرفيًا الآتي: "ما إن يُنشأ كائن `new Rabbit`، أسنِد خاصية `[[Prototype]]` له لتكون للكائن `animal`".

إليك الصورة الناتجة:

[proto-constructor-animal-rabbit.png]

في الصورة نرى `"prototype"` في سهم أفقي (أي أنّها خاصية عادية) بينما `[[Prototype]]` في سهم رأسي (أي أنّها توضّح وراثة كائن `rabbit` للكائن `animal`).

إن الخاصية `F.prototype` تستخدم عند الإنشاء فقط أي عندما تستدعى تعليمة `new F` وتُسند للكائن القيمة المناسبة للخاصية `[[Prototype]]`.
في حال تغيرت الخاصية `F.prototype` مثلًا (`F.prototype = <another object>‎`)، عندها ستحصل الكائنات المنشأة بعد هذا التغيير على القيمة الجديدة للخاصية `[[Prototype]]` (أي الكائن الجديد)،
ولكن الكائنات القديمة مازالت تحتفظ بالقيمة القديمة.

## القيمة الإفتراضية للخاصية prototype في الباني

لكلّ دالة خاصية `"prototype"` حتّى لو لم نقدّمها نحن.

إن القيمة الإفتراضية للخاصية `"prototype"` تُشير إلى نفس الدالّة.

هكذا تمامًا:

```
function Rabbit() {}

/* كائن‫ prototype
Rabbit.prototype = { constructor: Rabbit };
*/
```

[function-prototype-constructor.png]

يمكننا فحص ذلك أيضًا:

```
function Rabbit() {}
// مبدئيًا:
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

طبيعيًا، إن لم نعدل أي شيء، ستكون خاصية `constructor` مُتاحة لكلّ كائنات `rabbit` من خلال كائن `[[Prototype]]`:

```
function Rabbit() {}
// مبدئيًا:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // ترث من‫ {constructor: Rabbit}

alert(rabbit.constructor == Rabbit); // ‫ true من prototype‎ 
```

[rabbit-prototype-constructor.png]

يمكننا استعمال الخاصية `constructor` لإنشاء كائن جديد باستعمال نفس الباني الّذي أنشأ الكائن الموجود حاليًا.

هكذا:

```
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

// انظر
let rabbit2 = new rabbit.constructor("Black Rabbit");
```

يُفيدنا هذا حين نكون أمام كائن ولكن لا نعرف الباني الحقيقي الّذي بناه (ربما أتى من مكتبة خارجية)، وأردنا إنشاء كائن آخر مثله.

ولكن الأمر الأهم الّذي يتعلّق بِـ `"constructor"` هو أنّ **لغة جافاسكربت نفسها لا تتأكّد من صحّة قيمة خاصية `"constructor"`.**

نعم كما قرأت، الخاصية موجودة في `"prototype"` للدوالّ، وهذا كلّ ما في الأمر. إذ ستعتمد لغة جافاسكربت علينا فيما سيحدث لاحقًا.

فمثلًا لو أردنا استبدال القيمة الإفتراضية للخاصية prototype، فلن يملك الكائن أيّ خاصية `"constructor"`.

مثال:

```
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
// لاحظ
alert(rabbit.constructor === Rabbit); // false
```

ولهذا لنُبقي على خاصية `"constructor"` الصحيحة يمكننا إضافة الخاصيات وإزالتها من كائن `"prototype"` الإفتراضي بدل الطريقة السابقة. هكذا:

```
function Rabbit() {}

// بدل الكتابة على كلّ ‫Rabbit.prototype
// نُضيف ما نريد إليه
Rabbit.prototype.jumps = true
// هكذا تبقى خاصية‫ Rabbit.prototype.constructor الإفتراضية محفوظة
```

أو يمكننا (لو أردنا) إعادة إنشاء الخاصية `constructor` يدويًا:

```
Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit // هنا
};

// الآن سيكون المُنشِئ صحيحًا إذ أنّا من أضفناه
```


## خلاصة

شرحنا في هذا الفصل سريعًا طريقة ضبط كائن `[[Prototype]]` للكائنات الّتي أنشأتها بدالّة الباني. سنرى لاحقًا أنماط متقدّمة في البرمجة تعتمد على هذا الطريقة.

ما أخذناه بسيط، ولكن بعض الأمور نوضّحها ثانيةً للتأكّد:

- تضبط الخاصية `F.prototype` (لا تظنّها كائن `[[Prototype]]`) لكائنٍ ما الخاصية `[[Prototype]]` لكلّ الكائنات الجديدة متى استدعيت `new F()‎`.
- يجب أن تكون قيمة `F.prototype` إمّا كائنًا أو `null`، ولن تعمل أيّة قيم أخرى.
- هذا التأثير للخاصية `"prototype"` موجود فقط حين يُضبط في دالة الباني وحين يُنفّذ بتعليمة `new`.

في الكائنات العادية ليست بخاصية خاصة جدًا:
```
let user = {
  name: "John",
  prototype: "Bla-bla" // نزعنا السحر
};
```

لكلّ الدوالّ مبدئيًا `F.prototype = { constructor: F }‎`، فيمكننا أن نأخذ باني معين من كائن ما بالدخول إلى الخاصية `"constructor"` الخاصة به.

## تمارين
### تغيير الخاصية ”prototype“
_الأهمية: 5_

أنشأنا في الشيفرة أدناه كائنًا جديدًا `new Rabbit` وحاولنا بعدها تعديل الخاصية prototype لهذا الكائن.

بادئ ذي بدء، كانت الشيفرة:

```
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


1. وأضفنا سلسلة نصية أخرى (عليها علامة). ماذا سيعرض التابِع `alert`؟

    ```
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    Rabbit.prototype = {}; // (*)

    alert( rabbit.eats ); // ?
    ```

2. وماذا لو... كانت الشيفرة كهذه (استبدلنا سطرًا فيها)؟

    ```
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    Rabbit.prototype.eats = false; // (*)

    alert( rabbit.eats ); // ?
    ```

3. وماذا عن هذه (استبدلنا سطرًا أيضًا)؟

    ```
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    delete rabbit.eats; // (*)

    alert( rabbit.eats ); // ?
    ```

4. وهذه... أيضًا:

    ```
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    delete Rabbit.prototype.eats; // (*)

    alert( rabbit.eats ); // ?
    ```
#### الحل
الإجابات:

1. `true`.

    عملية الإسناد على `Rabbit.prototype` تضع الخاصية `[[Prototype]]` للكائنات الجديدة، ولكنّها لا تعدّل على الكائنات الموجودة مسبقًا.

2. `false`.
    عملية الإسناد تكون من خلال الخاصية `Rabbit.prototype`، إن الخاصية المشار إليها هنا `Rabbit.prototype` ليست مكررًا، وإنما بقيت يُشار إليها من خلال `Rabbit.prototype` و الخاصية `[[Prototype]]` للكائن `rabbit`.

    لذا حين نغيّر المحتوى في الطريقة الأولى سنرى النتائج في الطريقة الثانية.

3. `true`.
    كلّ عمليات الحذف تطبق مباشرة على الكائن. تحاول هذه التعليمة `delete rabbit.eats` حذف الخاصية المخصصة للكائن `rabbit` ولكنها ليست لها. لذا العملية لن يكون لها أي تأثير.


4. `undefined`.

    حُذفت الخاصية `eats` من كائن prototype وما عادت موجودة بعد الآن.

### إنشاء كائن جديد من خلال نفس باني لكائنٍ آخر
_الأهمية: 5_

تخيّل بأنّ لدينا الكائن الفريد `obj` وأنشأته بدالة الباني، ولكننا... لا نعرف أيّ دالة هذه، ولكن مع ذلك نريد استعمال نفس الباني لإنشاء كائن جديد آخر.

أيمكن لهذه الشيفرة إنجاز المهمة؟

```
let obj2 = new obj.constructor();
```

اكتب مثالين باستخدام بانيين للكائن `obj`، واحدًا يعمل مع الشيفرة أعلاه، وواحدًا لا يعمل له.
#### الحل
يمكن أن نستعمل هذه الطريقة لو كنّا متأكدين مئة بالمئة بأنّ خاصية `"constructor"` تحمل القيمة الصحيحة.

فمثلًا لو لم نعدّل على `"prototype"` المبدئية فستعمل هذه الشيفرة بلا ريب:

```
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (عملت!)
```

نفذت الشيفرة تنفيذًا صحيحًا إذ أنّ `User.prototype.constructor == User`.

ولكن... لو أتى أحدهم مثلًا وكتب على `User.prototype` ونسي إعادة إنشاء `constructor` لتُشير إلى كائن المستخدم `User`، فلن تعمل الشيفرة.

مثال:

```
function User(name) {
  this.name = name;
}
User.prototype = {}; // (*)

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

لمَ قيمة `user2.name` هي `undefined`؟

إليك طريقة عمل تعليمة `new user.constructor('Pete')‎`:

1. أولًا، تبحث عن المُنشِئ `constructor` داخل `user`، ولا تجده.
2. ثمّ تتبع سلسلة prototype وتجد prototype الكائن `user` هو `User.prototype`، وأيضًا لا تجده.
3. قيمة `User.prototype` ما هي إلّا كائنًا فارغًا `{}`، و قيمة الخاصية prototype لهذا الكائن هي `Object.prototype`، وهنا وجدنا `Object.prototype.constructor == Object` بذلك استعملناه.

وفي نهاية الأمر، لدينا التعليمة `let user2 = new Object('Pete')‎` إذ أنّ الباني الخاص بالكائن `Object` يتجاهل الوسطاء وينشىء دائمًا كائنًا فارغًا. بطريقة مشابهة جدًا للتعليمة `let user2 = {}‎` والّتي أنشأت لنا الكائن `user2` في نهاية الأمر.

ترجمة -وبتصرف- للفصل [F.prototype](https://javascript.info/function-prototype) من كتاب [The JavaScript language](https://javascript.info/js)

