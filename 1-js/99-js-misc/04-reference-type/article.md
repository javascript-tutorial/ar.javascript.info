# النوع المرجعي

```warn header="خصائص متقدمه فى اللغه"
هذه المقالة تقوم بتغطية موضوع متقدم, لفهم بعض الحالات بشكل أفضل.

<<<<<<< HEAD
إنها ليست مهمة. يعيش العديد من المطورين ذوي الخبرة بشكل جيد دون معرفة ذلك. تابع القراءة إذا كنت تريد معرفة كيفية عمل الأشياء خلف الكواليس.
=======
```warn header="In-depth language feature"
This article covers an advanced topic, to understand certain edge-cases better.

It's not important. Many experienced developers live fine without knowing it. Read on if you want to know how things work under the hood.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f
```

قد تفقد استدعاء تابع تم تقييمه بشكل ديناميكي `this`.

علي سبيل المثال:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // تعمل

// الآن دعونا نقوم بتشغيل user.hi أو user.bye بناءً علي الإسم
*!*
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

على السطر الأخير يوجد عامل شرطي يختار إما `user.hi` أو `user.bye`. فى هذه الحالة تكون النتيجة `user.hi`.

ثم يتم استدعاء التابع على الفور بين قوسين `()`. و لكنه لم يعمل بشكل صحيح!

كما ترى, تشغيل التابع أحدث خطأ, بسبب أن نتيجة `"this"` داخل تشغيل التابع أنتج `undefined`.

هذا يعمل (كائن نقطة تابع):

```js
user.hi();
```

هذا لا يعمل:

```js
(user.name == 'John' ? user.hi : user.bye)(); // خطأ!
```

لماذ ؟ إذا كنا نريد ان نفهم لماذا يحدث هذا, دعونا نري خلف الكواليس كيف يعمل `()obj.method`.

## تفسير النوع المرجعي

عند التدقيق, ربما نلاحظ وجود عمليتين علي عبارة `()obj.method`:

1. اولاً, النقطة `'.'` تجب الخاصية `obj.method`.
2. ثانياً الأقواس `()` تقوم بتشغيلها.

لذا, كيف يمكن للمعلومات الخاصة بـ `this` ان تمر من الجزء الأول الى الجزء الثاني?

إذا وضعنا هذه العمليات على خطوط منفصلة, اذا `this` سوف نقوم بفقدها بالتأكيد:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
};

*!*
// تقسيم الحصول على واستدعاء التابع في سطرين
let hi = user.hi;
hi(); // خطأ, لأن this غير معرفة
*/!*
```

هنا `hi = user.hi` يضع التابع في المتغير, ثم في السطر الأخير يكون مستقلاً تماماً, و في هذه الحالة لا يوجد `this`.

**لجعل `()user.hi` تعمل, جافا سكريبت تستخدم خدعة -- النقطة `'.'` لا تيعد تابع, و لكن قيمه من المميز [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

النوع المرجعي هو "نوع المواصفات". لا يمكننا استخدامها صراحة, و لكن يتم استخدامها داخلياً بواسطة اللغه.

قيمة النوع المرجعي هي مزيج من ثلاث قيم `(base, name, strict)`, حيث:

- `base` الكائن.
- `name` إسم الخاصية.
- `strict` تكون صحيحة اذا `use strict` تعمل.

النتيجة من إستخدام `user.hi` لا يكون تابع, و لكن قيمة من النوع المرجعي. `user.hi` في الوضع الصارم تكون:

```js
// قيمة النوع المرجعي
user, 'hi', true;
```

<<<<<<< HEAD
حيث الأقواس `()` تسمى النوع المرجعي, يتلقون المعلومات الكاملة حول الكائن و توابعه, و يمكن وضع القيمه الصحيحة لـ `this` (`=user` في هذه الحالة).
=======
When parentheses `()` are called on the Reference Type, they receive the full information about the object and its method, and can set the right `this` (`user` in this case).
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

النوع المرجعي هو نوع داخلي خاص "وسيط", بغرض تمرير المعلومات من النقطة `.` الي طلب الأقواس `()`.

اى عملية اخري مثل `hi = user.hi` تتجاهل النوع المرجعي بالكامل, تأخذ القيمة من `user.hi` (التابع) و تقوم بتمريره. اذا اى من العمليات المستقبلية "تفقد" `this`.

So, as the result, the value of `this` is only passed the right way if the function is called directly using a dot `obj.method()` or square brackets `obj['method']()` syntax (they do the same here). There are various ways to solve this problem such as [func.bind()](/bind#solution-2-bind).

## الملخص

النوع المرجعي هو نوع داخلي من اللغة.

قراءة خاصية ، كما هو الحال مع النقطة `.` في `obj.method()` لا يعيد قيمة الخاصية بالضبط, و لكن "النوع المرجعي" كلاً من قيمة الخاصية والكائن الذي تم أخذها منه.

هذا لاستدعاء الطريقة اللاحقة `()` للوصل الى الكائن و وضع قيمة `this` بها.

بالنسبة لجميع العمليات الأخرى ، يصبح النوع المرجعي تلقائيًا قيمة الخاصية (تابع في حالتنا).

The whole mechanics is hidden from our eyes. It only matters in subtle cases, such as when a method is obtained dynamically from the object, using an expression.
