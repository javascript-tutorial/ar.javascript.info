# Mixins

فى جافاسكريبت يمكننا الوراثة من كائن واحد فقط. يمكن ان يوجد `[[Prototype]]` واحد فقط للكائن. و يمكن للـ `class` ان يقوم بـ `extend` فقط من `class` واحد آخر.

و لكن في بعض الأحيان ذلك يوحي بالتقييد. مثال علي ذلك, لدينا `class` هو `StreetSweeper` و `class` آخر هو `Bicycle`, و نريد تكوين ذلك المزيج بينهم: و هو `StreetSweepingBicycle`.

أو لدينا `class` هو `User` و `class` آخر هو `EventEmitter` الذي يقوم بتنفيذ إستخراج الأحداث, و نريد الآن إضافة دوال `EventEmitter` إلى `User`, لكي يمكن مستخدمينا من إرسال الأحداث.

يوجد مفهوم يمكن أن يساعدنا هنا, يُسيمى `mixins`.

كما يتم تعريفه في ويكيبيديا, [mixin](https://en.wikipedia.org/wiki/Mixin) هو `class` يحتوي علي دوال يمكن إستخدامها بواسطة `classes` أخرى بدون الحاجه الى الوراثة منها.

بطريقة أخرى, _mixin_ يمكنها توفير دوال تقوم بتنفيذ سلوك محدد, و لكن نحن لا نستخدمها وحدها, نحن نستخدمها لنضيف سلوك الى `classes` أخرى.

## مثال علي mixin

أسهل طريقة لتنفيذ `mixin` فى جافاسكريبت هو ان تقوم بعمل كائن له دوال مفيدة, لذا يمكننا بسهولة دمجهم مع `prototype` خاص بأيّ `class`.

For instance here the mixin `sayHiMixin` is used to add some "speech" for `User`:

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert(`مرحباً ${this.name}`);
  },
  sayBye() {
    alert(`الوداع ${this.name}`);
  }
};

*!*
// usage:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// نسخ الدوال
Object.assign(User.prototype, sayHiMixin);

// الآن User يمكن ان يقول مرحباً
new User("Dude").sayHi(); // مرحباً Dude!
```

لا يوجد وراثة, و لكن نسخ دوال ببساطة. لذا `User` ربما يرث من `class` آخر و يقوم بتضمين `mixin` لكي "يمزج" الدوال الإضافية, مثل ذلك:

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

`Mixins` يمكنها الإستفادة من الوراثة داخل نفسها.

مثال علي ذلك, هنا `sayHiMixin` ترث من `sayMixin`:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (او يمكننا إستخدام Object.create لكى نضع prototype هنا)

  sayHi() {
    *!*
    // طلب تنفيذ الدالة الأب
    */!*
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// نسخ الدوال
Object.assign(User.prototype, sayHiMixin);

// الآن User يمكن أن يقول مرحباً
new User("Dude").sayHi(); // مرحباً Dude!
```

برجاء ملاحظة ان طلب الدالة الأب `super.say()` من `sayHiMixin` (فى السطور المعنونه بـ `(*)`) تبحث عن الداله في `prototype` الخاص بـ `mixin`, ليس الخاص ب `class`.

هذا هو الرسم البياني (أنظر الى الجزء الأيمن):

![](mixin-inheritance.svg)

هذا بسبب الدالة `sayHi` و `sayBye` الذي تم إنشاؤهما فى `sayHiMixin`. لذا علي الرغم من انه تم نسخهم, `[[HomeObject]]` الخاص بهم هو مرجع الخاصية الداخلية `sayHiMixin`, كما هو موضح فى الصورة اعلاه.

كما أن `super` يبحث عن الدالة الأب في `[[HomeObject]].[[Prototype]]`, هذا يعني انه يبحث في `sayHiMixin.[[Prototype]]`, و ليس `User.[[Prototype]]`.

## EventMixin

الآن دعنا نقوم بعمل مثال حقيقي للـ `mixin` .

ميزة مهمة للعديد من كائنات المتصفح (مثال) أنهم يمكنهم استخراج احداث. الأحداث هي طريقة جيدة لـ "نشر المعلومات" لأي شخص يريدها. لذا دعنا نقوم بعمل `mixin` الذي يسمح لنا ان نقوم بسهولة بإضافة دوال متعلقه بالأحداث لأي `class/object`.

- الـ `mixin` سوف يوفر دالة `.trigger(name, [...data])` لكى "نستخرج الحدث" عندما يحدث شيئ مهم لها. متغير الـ `name` هو إسم الحدث, متبوعاً بشكل إختياري بـ متغيرات إضافية ببيانات الحدث.
- أيضاً الدالة `.on(name, handler)` التى تضيف دالة `handler` التي تقوم بالإستماع للأحداث المُعطي إسمها. سوف يتم طلبها عندما يتم تشغيل حدث ما بالـ `إسم` المُعطي, و الحصول علي المتغيرات عند طلب `.trigger`.
- ...و الدالة `.off(name, handler)` التي تقوم بمسح المستمع `handler`.

بعد إضافة `mixin`, الكائن `user` يمكنه إستخراج حدث `"login"` عندما يقوم الزائر بتسجيل الدخول. و كائن آخر, يقول, `calendar` ربما يريد الإستماع لبعض الأحداث لتحميل النتيجة للشخص الذى قام بتسجيل الدخول.

أو, `menu` يمكنه إستخراج الحدث `"select"` عندما يتم أختيار عنصر من القائمة, و كائنات اخري يمكن ان ترفق `handlers` لكى تتفاعل مع هذا الحدث. و كذلك.

هذا هو الكود:

```js run
let eventMixin = {
  /**
   * الإستماع الى الحدث, الإستخدام:
   *  menu.on('select', function(item) { ... }
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * إلغاء المتابعه, الإستخدام:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * إستخراج حدث بالإسم و البيانات المُعطاه
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // لا يوجد handlers لإسم الحدث هذا
    }

    // طلب الـ handlers
    this._eventHandlers[eventName].forEach((handler) => handler.apply(this, args));
  },
};
```

- `.on(eventName, handler)` -- تقوم بتعيين دالة `handler` لتقوم بالعمل عندما يحدث هذا الحدث بذلك الإسم. تقنياً, يوجد خاصية `_eventHandlers` التى تقوم بتخزين مصفوفة من `handlers` لكل إسم حدث, و هى مجرد تقوم بإضافته للقائمة.
- `.off(eventName, handler)` -- تقوم بحذف الدالة من قائمة الـ `handlers`.
- `.trigger(eventName, ...args)` -- تستخرج الحدث: يتم طلب كل الـ `handlers` من `_eventHandlers[eventName]` , بقائمة من المتغيرات `...args`.

الإستخدام:

```js run
// إنشئ class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// أضف mixin بـ دوال خاصة بالحدث
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// أضف handler, لكى يتم طلبها عند الإختيار:
*!*
menu.on("select", value => alert(`القيمة المُختارة: ${value}`));
*/!*

// تنفيذ الحدث => الـ handler بالأعلي يعمل و يُظهر:
// القيمة المُختارة: 123
menu.choose("123");
```

الآن, إذا كنا نريد اى كود يتفاعل عند الإختيار من القائمة, يمكننا الإستماع اليه عن طريق `menu.on(...)`.

و `eventMixin` `mixin` جعلته من السهل إضافة هذا السلوك لـ `classes` كثيرة كما نريد, دون التدخل فى سلسلة الميراث.

## الملخص

_Mixin_ -- هو مصطلح عام خاص بالبرمجة الشيئية `object-oriented programming`: الـ `class` الذي يحتوي علي دوال لـ `classes` اخرى.

بعض اللغات الاخرى تسمح بالوراثة المتعددة. جافاسكريبت لا تسمح بالوراثة المتعددة, و لكن `mixins` يمكن تنفيذها عن طريق نسخ الدوال الى `prototype`.

يمكننا إستخدام `mixins` كطريقة لزيادة الـ `class` عن طريق إضافة سلوكيات متعددة, مثل تنسيق الحدث الذي رأيناه بالأعلي.

`Mixins` يمكن ان تكون نقطة تضارب اذا قاموا عن طريق الخطأ بالكتابه فوق دوال خاصة بـ `class`. إذا بشكل عام يجب علي المرء أن يفكر جيداً فى طريقة تسمية الدوال الخاصه بـ `mixin`,لتقلل إحتمالية حدوث الأخطاء.
