<<<<<<< HEAD
# خطأ عند قراءة خاصية غير موجودة

عادة، عند محاولة قراءة خاصية غير موجودة فإنها تُرجع `undefined`.

قم بإنشاء بروكسي يقوم بإظهار خطأ عند محاولة قراءة خاصية غير موجودة بدلًا من ذلك.
=======
# Error on reading non-existent property

Usually, an attempt to read a non-existent property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existent property instead.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

هذا يساعد علي استكشاف الأخطاء البرمجية بشكل أسرع.

قم بإنشاء دالة `wrap(target)` والتي تستقبل كائن `target` وتقوم بإرجاع بروكسي يضيف هذه الوظيفة.

هذا كيفية فعله:

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* your code */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // ReferenceError: Property doesn't exist: "age"
*/!*
```
