يمكن للدالة أن تأخذ كل الخصائص المعدودة (enumerable) باستخدام `Object.keys` وطباعة قائمة بهم.

لجعل الدالة `toString` غير معدودة (non-enumerable)، سنقوم بتعريفها باستخدام واصف (descriptor). ويسمح لنا شكل `Object.create` أن نضع واصفًا لخاصية كمتغير ثانٍ.

```js run
*!*
let dictionary = Object.create(null, {
  toString: {
    value() { // قيمتها عبارة عن دالة
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple و __proto__ فى التكرار
for(let key in dictionary) {
  alert(key); // "apple", ثم "__proto__"
}

// comma-separated list of properties by toString
// قائمة من االخصائص مفصول بينها بالفاصلة
alert(dictionary); // "apple,__proto__"
```

عند إنشاء خاصية بواصف فإن مُعرِّفاتها تكون قيمها `false`. ولذلك فى الكود أعلاه فإن `dictionary.toString` هي غير معدودة (non-enumerable).

أنظر فصل [](info:property-descriptors) للمراجعة.
