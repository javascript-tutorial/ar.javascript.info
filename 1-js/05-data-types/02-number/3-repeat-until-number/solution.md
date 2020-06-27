
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Enter a number please?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

إن الحل أكثر تعقيدا بعض الشيء مما يمكن أن يكون لأننا نحتاج إلى معالجته `null`/سطور فارغة.

لذلك نحن في الواقع نقبل الإدخال حتى يصبح "رقما منتظما". كِلا `null` (ملغى) والخط الفارغ يلائم أيضا ذلك الشرط، لأنه في الشكل الرقمي هو `0`.

بعد أن توقفنا، يجب أن نعالج `null` وسطر الفارغ خصيصاً (ترجع `null`),لأن تحويلهم إلى رقم سيرجع `0`.

