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
<<<<<<< HEAD
// المتغير المحلي X يعتبر معروف للمحرك من البداية, لكن **غير معرف بقيمة** تظل حتي let
  // لذلك هناك خطأ
=======
  // the local variable x is known to the engine from the beginning of the function,
  // but "uninitialized" (unusable) until let ("dead zone")
  // hence the error
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
*/!*

  console.log(x); // ReferenceError: لا نستطيع الوصول لـ 'x' قبل إعطائها قيمة

  let x = 2;
}
```

هذه المنطقة من المتغيرات المؤقتة الغير مستخدمة من بداية الكود حتي `let` تسمي **بالمنطقة الميتة**
