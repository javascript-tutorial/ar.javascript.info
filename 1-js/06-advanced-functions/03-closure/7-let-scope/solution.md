الناتج: **خطأ**.

جرب الكود للتأكد:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: لا نستطيع الوصول لـ 'x' قبل إعطائها قيمة
*/!*
  let x = 2;
}

func();
```

In this example we can observe the peculiar difference between a "non-existing" and "uninitialized" variable.

أو بطريقة أخرى, المُتغير تقنياً موجود, لكن ا تستطيع الوصول له قبل `let`.

الكود فى الأعلي وضح ذلك.

```js
function func() {
*!*
// المتغير المحلي X يعتبر معروف للمحرك من البداية, لكن **غير معرف بقيمة** تظل حتي let
  // لذلك هناك خطأ
*/!*

  console.log(x); // ReferenceError: لا نستطيع الوصول لـ 'x' قبل إعطائها قيمة

  let x = 2;
}
```

هذه المنطقة من المتغيرات المؤقتة الغير مستخدمة من بداية الكود حتي `let` تسمي **بالمنطقة الميتة**
