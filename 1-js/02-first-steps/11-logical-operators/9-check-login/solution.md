

```js run demo
let userName = prompt("من هناك؟", '');

if (userName === 'Admin') {

  let pass = prompt('كلمة المرور؟', '');

  if (pass === 'TheMaster') {
    alert( 'مرحبا!' );
  } else if (pass === '' || pass === null) {
    alert( 'الغيت' );
  } else {
    alert( 'كلمة مرور خاطئة' );
  }

} else if (userName === '' || userName === null) {
  alert( 'الغيت' );
} else {
  alert( "لا أعرفك" );
}
```

لاحظ المسافات داخل `if`. غير مطلوبة فعليًا ولكنها تجعل الكود مقروء أكثر.
