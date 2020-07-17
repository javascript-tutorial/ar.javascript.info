**Aالإجابة: ظهور خطأ.**

جربها:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); //  ِلِقيمة غير معرفة 'name' خطأ: لا يمكن قراءة الخاصية
```

ذلك لأن القواعد التي تعين `this` لا تنظر إلى تعريف الكائن. ما يهم هو وقت الاستدعاء. قيمة `this` هنا بداخل `makeUser()‎` هي `undefined`، لأنها استُدعيَت كدالة منفصلة، وليس كدالة بصياغة النقطة.

قيمة `this` هي واحدة للدالة ككل، ولا تؤثر عليها أجزاء الشيفرة ولا حتى الكائنات. لذا فإن `ref: this` تأخذ `this` الحالي للدالة 
```js runذ
function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
كما ترى فإن نتيجة `alert( makeUser().name )` هي نفسها نتيجة `alert( user.ref.name )` من المثال السابق
هنا حالة معاكسة تمامًا:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

أصبحت تعمل هنا لأن `user.ref()‎` هي دالة، وقيمة `this` تعَيَّن للكائن الذي قبل النقطة `'.'`
