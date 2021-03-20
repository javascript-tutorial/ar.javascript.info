# خطأ عند قراءة خاصية غير موجودة

عادة، عند محاولة قراءة خاصية غير موجودة فإنها تُرجع `undefined`.

قم بإنشاء بروكسي يقوم بإظهار خطأ عند محاولة قراءة خاصية غير موجودة بدلًا من ذلك.

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
alert(user.age); // ReferenceError: Property doesn't exist "age"
*/!*
```
