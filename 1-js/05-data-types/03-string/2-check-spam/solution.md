لجعل البحث غير حساس لحالة الأحرف، نحوِّل  النص إلى أحرف صغيرة  ومن ثم نبحث فيه على النص المطلوب: 

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

