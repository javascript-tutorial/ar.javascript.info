الطول الكلي هو `maxlength`، لذا فإننا نحتاج لقص النص إلى أقصر من ذلك بقليل لإعطاء مساحة للنقط `"…"`. لاحظ أن هناك حرف يونيكود واحد للحرف `"…"`. وليست ثلاث نقاط.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
