
# ربط الدوالّ Function binding

ثمّة مشكلة معروفة تواجهنا متى مرّرنا توابِع الكائنات على أنّها ردود نداء (كما نفعل مع `‎setTimeout‎`)، هي ضياع هويّة الأنا `‎this‎`.

سنرى في هذا الفصل طرائق إصلاح هذه المشكلة.

## ضياع الأنا (الكلمة المفتاحية `this`)

رأينا قبل الآن أمثلة كيف ضاعت قيمة `‎this‎`. فما نلبث أن مرّرنا التابِع إلى مكان آخر منفصلًا عن كائنه، ضاع `‎this‎`.

إليك ظواهر هذه المشكلة باستعمال `‎setTimeout‎` مثلًا:

```
let user = {
  firstName: "John",
  sayHi() {
    alert(`‎Hello, ${this.firstName}!‎`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
```

كما رأينا في ناتج الشيفرة، لم نرحّب بالأخ «John» (كما أردنا باستعمال `‎this.firstName‎`)، بل بالأخ غير المعرّف `‎undefined‎`!

هذا لأنّ التابِع `‎setTimeout‎` استلم الدالة `‎user.sayHi‎` منفصلةً عن كائنها. يمكن أن نكتب السطر الأخير هكذا:

```
let f = user.sayHi;
setTimeout(f, 1000); // ‫ضاع سياق المستخدم user
```

بالمناسبة فالتابِع `‎setTimeout‎` داخل المتصفّحات يختلف قليلًا، إذ يضبط `‎this=window‎` حين نستدعي الدالة (بينما في Node.js يصير `‎this‎` هو ذاته كائن المؤقّت، ولكنّ هذا ليس بالأمر المهم الآن). يعني ذلك بأنّ `‎this.firstName‎` هنا هي فعليًا `‎window.firstName‎`، وهذا المتغير غير موجود. عادةً ما تصير `‎this‎` غير معرّفة `‎undefined‎` في الحالات الأخرى.

كثيرًا ما نواجه هذه المسألة ونحن نكتب الشيفرة: نريد أن نمرّر تابِع الدالة إلى مكان آخر (مثل هنا، مرّرناه للمُجدول) حيث سيُستدعى من هناك. كيف لنا أن نتأكّد بأن يُستدعى في سياقه الصحيح؟

## الحل رقم واحد: نستعمل  دالة مغلفة

أسهل الحلول هو استعمال دالة غالِفة _Wrapping function_:

```
let user = {
  firstName: "John",
  sayHi() {
    alert(`‎Hello, ${this.firstName}!‎`);
  }
};

setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
```

الآن اكتملت المهمة إذ استلمنا المستخدم `‎user‎` من البيئة المُعجمية الخارجية، وثمّ استدعينا التابِع كما العادة.

إليك ذات المهمة بأسطر أقل:

```
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

ممتازة جدًا، ولكن ستظهر لنا نقطة ضعف في بنية الشيفرة.

ماذا لو حدث وتغيّرت قيمة `‎user‎` قبل أن تعمل `‎setTimeout‎`؟ (لا تنسَ التأخير، ثانية كاملة!) حينها سنجد أنّا استدعينا الكائن الخطأ دون أن ندري!


```
let user = {
  firstName: "John",
  sayHi() {
    alert(`‎Hello, ${this.firstName}!‎`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ‫...تغيّرت قيمة user خلال تلك الثانية
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// setTimeout! هناك مستخدم آخر داخل التابِع‏
```

الحل الثاني سيضمن لنا ألّا تحدث هكذا أمور غير متوقّعة.

## الحل رقم اثنين: ربطة

تقدّم لنا الدوال تابِعًا مضمّنًا في اللغة باسم [bind](https://wiki.hsoub.com/JavaScript/Function/bind) يتيح لنا ضبط قيمة `‎this‎`.

إليك صياغته الأساسية:

```
// ستأتي الصياغة المعقّدة لاحقًا لا تقلق
let boundFunc = func.bind(context);
```

ناتِج التابِع `‎func.bind(context)‎` هو «كائن دخيل» يشبه الدالة ويمكن لنا استدعائه على أنّه دالة، وسيمرّر هذا الاستدعاء إلى `‎func‎` بعدما يضبط `‎this=context‎` من خلف الستار.

أي بعبارة أخرى، لو استدعينا `‎boundFunc‎` فكأنّما استدعينا `‎func‎` بعدما ضبطنا قيمة `‎this‎`.

إليك مثالًا تمرّر فيه `‎funcUser‎` الاستدعاء إلى `‎func‎` بضبط `‎this=user‎`:

```
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // John  
```

رأينا «النسخة الرابطة» من `‎func‎`، ‏`‎func.bind(user)‎` بعد ضبط `‎this=user‎`.

كما أنّ المُعاملات كلّها تُمرّر إلى دالة `‎func‎` الأًصلية «كما هي». مثال:

```
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// ‫نربط this إلى user
let funcUser = func.bind(user);

funcUser("Hello"); // ‫Hello, John (مُرّر المُعامل "Hello" كما وُضبط this=user)
```

فلنجرّب الآن مع تابع لكائن:


```
let user = {
  firstName: "John",
  sayHi() {
    alert(`‎Hello, ${this.firstName}!‎`);
  }
};

let sayHi = user.sayHi.bind(user); // (*)

// يمكن أن نشغّلها دون وجود كائن
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// ‫حتّى لو تغيّرت قيمة user خلال تلك الثانية
// ‫فما زالت تستعمل sayHi القيمة التي ربطناها قبلًا
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

أخذنا في السطر `‎(*)‎` التابِع `‎user.sayHi‎` وربطناه مع المستخدم `‎user‎`. ندعو الدالة `‎sayHi‎` بالدالة «المربوطة» حيث يمكن أن نستدعيها لوحدها هكذا أو نمرّرها إلى `‎setTimeout‎`. مهما فعلًا فسيكون السياق صحيحًا كما نريد.

نرى هنا أنّ المُعاملات مُرّرت «كما هي» وما ضبطه `‎bind‎` هو قيمة `‎this‎` فقط:

```
let user = {
  firstName: "John",
  say(phrase) {
    alert(`‎${phrase}, ${this.firstName}!‎`);
  }
};

let say = user.say.bind(user);

say("Hello"); // ‫Hello, John!‎ (مُرّر المُعامل "Hello" إلى say)
say("Bye"); // ‫Bye, John!‎ (مُرّر المعامل "Bye" إلى say)
```

**تابِع مفيد: `‎bindAll‎`**
لو كان للكائن توابِع كثيرة وأردنا تمريرها هنا وهناك بكثرة، فربّما نربطها كلّها في حلقة:

```
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

كما تقدّم لنا مكتبات جافاسكربت دوال للربط الجماعي لتسهيل الأمور، مثل [`‎_.bindAll(obj)‎`](http://lodash.com/docs#bindAll) في المكتبة lodash.

## الدوال الجزئية

طوال هذه الفترة لم نُناقش شيئًا إلّا ربط `‎this‎`. لنُضيف شيئًا آخر على الطاولة.

يمكن أيضًا أن نربط المُعاملات وليس `‎this‎` فحسب. صحيح أنّا نادرًا ما نفعل ذلك إلّا أنّ الأمر مفيد في أحيان عصيبة.

صياغة `‎bind‎` الكاملة:

```
let bound = func.bind(context, [arg1], [arg2], ...);
```

وهي تسمح لنا بربط السياق ليكون `‎this‎` والمُعاملات الأولى في الدالة.

نرى مثالًا: دالة ضرب `‎mul(a, b)‎`:

```
function mul(a, b) {
  return a * b;
}
```

فلنستعمل `‎bind‎` لنصنع دالة «ضرب في اثنين» `‎double‎` تتّخذ تلك أساسًا لها:

```
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

يصنع استدعاء `‎mul.bind(null, 2)‎` دالةً جديدة `‎double‎` تُمرّر الاستدعاءات إلى `‎mul‎` وتضبط `‎null‎` ليكون السياق و`‎2‎` ليكون المُعامل الأول. الباقي من مُعاملات يُمرّر «كما هو».

هذا ما نسمّيه [باستعمال الدوال الجزئية](https://en.wikipedia.org/wiki/Partial_application) -- أن نصنع دالة بعد ضبط بعض مُعاملات واحدة غيرها.

لاحظ هنا بأنّا لا نستعمل `‎this‎` هنا أصلًا... ولكنّ التابِع `‎bind‎` يطلبه فعلينا تقديم شيء (وكان `‎null‎` مثلًا).

الدالة `‎triple‎` أسفله تضرب القيمة في ثلاثة:

```
function mul(a, b) {
  return a * b;
}

let triple = mul.bind(null, 3);

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

ولكن لماذا نصنع الدوال الجزئية أصلًا، وعادةً؟!

الفائدة هي إنشاء دالة مستقلة لها اسم سهل القراءة (`‎double‎` أو `‎triple‎`)، فنستعملها دون تقديم المُعامل الأول في كلّ مرة إذ ضبطنا قيمته باستعمال `‎bind‎`.

وهناك حالات أخرى يفيدنا الاستعمال الجزئي هذا حين نحتاج نسخة أكثر تحديدًا من دالة عامّة جدًا، ليسهُل استعمالها فقط.

فمثلًا يمكن أن نصنع الدالة `‎send(from, to, text)‎`. وبعدها في كائن المستخدم `‎user‎` نصنع نسخة جزئية عنها: `‎sendTo(to, text)‎` تُرسل النصّ من المستخدم الحالي.

## الجزئية، بدون السياق

ماذا لو أردنا أن نضبط بعض المُعاملات ولكن دون السياق `‎this‎`؟ مثلًا نستعملها لتابِع أحد الكائنات.

تابِع `‎bind‎` الأصيل في اللغة لا يسمح بذلك، ومستحيل أن نُزيل السياق ونضع المُعاملات فقط.

لكن لحسن الحظ فيمكننا صنع دالة مُساعدة `‎partial‎` تربط المُعاملات فقط.

هكذا تمامًا:

```
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

// الاستعمال:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`‎[${time}] ${this.firstName}: ${phrase}!‎`);
  }
};

// نُضيف تابِعًا جزئيًا بعد ضبط الوقت
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// وسيظهر ما يشبه الآتي:
// [10:00] John: Hello!
```

ناتِج استدعائنا للدالة `‎partial(func[, arg1, arg2...])‎` هو غِلاف `‎(*)‎` يستدعي الدالة `‎func‎` هكذا:
- يترك `‎this‎` كما هو (فتكون قيمته `‎user‎` داخل الاستدعاء `‎user.sayNow‎`)
- ثمّ يمرّر لها `‎...argsBound‎`: أي المُعاملات من استدعاء `‎partial‎` ‏(`‎"10:00"‎`)
- وثمّ يمرّر لها `‎...args‎`: المُعاملات الممرّرة للغِلاف (`‎"Hello"‎`)

ساعدنا مُعامل التوزيع كثيرًا هنا، أم لا؟

كما أنّ هناك شيفرة [`‎_.partial`](https://lodash.com/docs#partial)  في المكتبة lodash.

## ملخص

يُعيد التابِع `‎func.bind(context, ...args)‎` «نسخة مربوطة» من الدالة `‎func‎` بعد ضبط سياقها `‎this‎` ومُعاملاتها الأولى (في حال مرّرناها).

عادةً ما نستعمل `‎bind‎` لنضبط `‎this‎` داخل تابِع لأحد الكائنات، فيمكن أن نمرّر التابِع ذلك إلى مكان آخر، مثلًا إلى `‎setTimeout‎`.

وحين نضبط بعضًا من مُعاملات إحدى الدوال، يكون الناتج (وهو أكثر تفصيلًا) دالةً ندعوها بالدالة *الجزئية* أو *المطبّقة بنحوٍ جزئي* _partially applied_.

تُفيدنا هذه الدوال الجزئية حين لا نريد تكرار ذات الوسيط مرارًا وتكرارًا، مثل دالة `‎send(from, to)‎` حيث يجب أن يبقى `‎from‎` كما هو في مهمّتنا هذه، فنأخذ دالة جزئية ونتعامل بها.
## تمارين
### دالة ربط على أنّها تابِع
_الأهمية: 5_

ما ناتج هذه الشيفرة؟

```
function f() {
  alert( this ); // ؟
}

let user = {
  g: f.bind(null)
};

user.g();
```

#### الحل
الجواب هو: `‎null‎`.

سياق دالة الربط مكتوب في الشيفرة (hard-coded) ولا يمكن تغييره لاحقًا بأيّ شكل من الأشكال.

فحتّى لو شغّلنا `‎user.g()‎` فستُستدعى الدالة الأصلية بضبط `‎this=null‎`.
### ربطة ثانية
_الأهمية: 5_

هي يمكن أن نغيّر قيمة `‎this‎` باستعمال ربطة إضافية؟

ما ناتج هذه الشيفرة؟

```
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

#### الحل
الجواب هو: **John**.

```
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

لا يتذكّر كائن [دالة الربط](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) «الدخيل» (الذي يُعيده `‎f.bind(...)‎`) السياق (مع الوُسطاء إن مُرّرت) - لا يتذكّر هذا كلّه إلى وقت إنشاء الكائن.

أي: لا يمكن إعادة ربط الدوال.
### خاصية الدالة بعد الربط
_الأهمية: 5_

تمتلك خاصية إحدى الدوال قيمة ما. هل ستتغيّر بعد `‎bind‎`؟ نعم، لماذا؟ لا، لماذا؟

```
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // ما الناتج؟ لماذا؟
```

#### الحل
الجواب هو: `‎undefined‎`.

ناتِج `‎bind‎` هو كائن آخر، وليس في هذا الكائن خاصية `‎test‎`.

### أصلِح هذه الدالة التي يضيع «this» منها
_الأهمية: 5_

على الاستدعاء `‎askPassword()‎` في الشيفرة أسفله فحص كلمة السر، ثمّ استدعاء `‎user.loginOk/loginFail‎` حسب نتيجة الفحص.

ولكن أثناء التنفيذ نرى خطأً. لماذا؟

أصلِح الجزء الذي فيه `‎(*)‎` لتعمل الشيفرة كما يجب (تغيير بقية الأسطر ممنوع).

```
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`‎${this.name} logged in‎`);
  },

  loginFail() {
    alert(`‎${this.name} failed to log in‎`);
  },

};

askPassword(user.loginOk, user.loginFail); // (*)
```
#### الحل
سبب الخطأ هو أنّ الدالة `‎ask‎` تستلم الدالتين `‎loginOk/loginFail‎` دون كائنيهما.

فمتى ما استدعتهما، تُعدّ `‎this=undefined‎` بطبيعتها.

علينا ربط السياق!

```
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`‎${this.name} logged in‎`);
  },

  loginFail() {
    alert(`‎${this.name} failed to log in‎`);
  },

};

// (*)\maskPassword(user.loginOk.bind(user), user.loginFail.bind(user));
```

الآن صارت تعمل.

أو، بطريقة أخرى:
```
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

هذه الشيفرة تعمل وعادةً ما تكون سهلة القراءة أيضًا.

ولكنّها في حالات أكثر تعقيدًا تصير أقلّ موثوقية، مثل لو تغيّر المتغير `‎user‎` *بعدما* استُدعيت الدالة `‎askPassword‎` و*قبل* أن يُجيب الزائر على الاستدعاء `‎() => user.loginOk()‎`.
### استعمال الدوال الجزئية لولوج المستخدم

هذا التمرين معقّد أكثر من سابقه، بقليل.

هنا تعدّل كائن `‎user‎`، فصار فيه بدل الدالتين `‎loginOk/loginFail‎` دالة واحدة `‎user.login(true/false)‎`.

ما الأشياء التي نمرّرها إلى `‎askPassword‎` في الشيفرة أسفله فتستدعي `‎user.login(true)‎` باستعمال `‎ok‎` وتستدعي `‎user.login(false)‎` باستعمال `‎fail‎`؟

```
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

askPassword(?, ?); // ؟ (*)
```

يجب أن تعدّل الجزء الذي عليه `‎(*)‎` فقط لا غير.

#### الحل
1. نستعمل دالة غالِفة... سهمية لو أردنا التفصيل:

    ```
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    هكذا تأخذ `‎user‎` من المتغيرات الخارجية وتُشغّل الدوال بالطريقة العادية.

2. أو نصنع دالة جزئية من `‎user.login‎` تستعمل `‎user‎` سياقًا لها ونضع مُعاملها الأول كما يجب:


    ```
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```

ترجمة -وبتصرف- للفصل [Function binding](https://javascript.info/bind) من كتاب [The JavaScript language](https://javascript.info/js)

