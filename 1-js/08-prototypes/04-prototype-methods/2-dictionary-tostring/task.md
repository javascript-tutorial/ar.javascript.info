درجة الأهمية: 5

---

# إضافة الدالة toString إلى القاموس

يوجد كائن يسمي `dictionary`، تم إنشاؤه باستخدام `Object.create(null)` لتخزين خصائص بقيمها.

أضف الدالة `dictionary.toString()` لهذا الكائن والتى يجب أن تقوم بإرجاع قائمة من الخصائص بينها الفاصلة. هذا الدالة يجب أن لا تظهر فى التكرار `for..in`.

هنا كيف سيتم استخدامها:

```js
let dictionary = Object.create(null);

*!*
// الكود الخاص بك لإنشاء الدالة dictionary.toString
*/!*

// أضف بعض البيانات
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ هي خاصية عادية

// تظهر فقط apple & __proto__
for(let key in dictionary) {
  alert(key); // "apple", ثم "__proto__"
}  

// استخدام الدالة toString التى صنعتها
alert(dictionary); // "apple,__proto__"
```
