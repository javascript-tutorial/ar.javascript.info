لنرى ما يحدث داخل الاستدعاء `‎speedy.eat("apple")‏` بدقّة.

1. نجد التابِع `speedy.eat` في كائن النموذج الأولي الهامستر (`=hamster`)، وبعدها ننفّذه بقيمة `this=speedy` (الكائن قبل النقطة).

2. بعدها تأتي مهمة البحث للتابِع `this.stomach.push()‎` ليجد خاصية المعدة `stomach` ويستدعي عليها `push`. يبدأ البحث عن `stomach` في `this` (أي في `speedy`)، ولكنّه لا يجد شيئًا.

3. بعدها يتبع سلسلة الوراثة ويجد المعدة `stomach` في `hamster`.

4. ثمّ يستدعي `push` عليها ويذهب الطعام في *معدة النموذج الأولي*.

بهذا تتشارك الهامسترات كلها معدةً واحدة!

أكان `lazy.stomach.push(...)‎` أم `speedy.stomach.push()‎`، لا نجد خاصية المعدة `stomach` إلّا في كائن النموذج الأولي (إذ ليست موجودة في الكائن نفسه)، بذلك ندفع البيانات الجديدة إلى كائن النموذج الأولي.

لاحظ كيف أنّ هذا لا يحدث لو استعملنا طريقة الإسناد البسيط `this.stomach=‎`:


```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // نُسند إلى this.stomach بدلًا من this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// وجد الهامستر السريع الطعام
speedy.eat("apple");
alert( speedy.stomach ); // apple

// معدة ذاك الكسول فارغة
alert( lazy.stomach ); // <nothing>
```

الآن يعمل كلّ شيء كما يجب، إذ لا تبحث عملية الإسناد `this.stomach=‎` عن خاصية `stomach`، بل تكتبها مباشرةً في كائن الهامستر الّذي وجد الطعام (المستدعى قبل النقطة).

ويمكننا تجنّب هذه المشكلة من الأساس بتخصيص معدة لكلّ هامستر (كما الطبيعي):


```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// وجد الهامستر السريع الطعام
speedy.eat("apple");
alert( speedy.stomach ); // apple

// معدة ذاك الكسول فارغة
alert( lazy.stomach ); // <nothing>
```

يكون الحلّ العام هو أن تُكتب الخاصيات كلّها الّتي تصف حالة الكائن المحدّد ذاته (مثل `stomach` أعلاه) - أن تُكتب في الكائن ذاته، وبهذا نتجنّب مشاكل تشارك المعدة.
