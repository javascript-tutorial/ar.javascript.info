<<<<<<< HEAD
الطول الكلي هو `maxlength`، لذا فإننا نحتاج لقص النص إلى أقصر من ذلك بقليل لإعطاء مساحة للنقط `"…"`. لاحظ أن هناك حرف يونيكود واحد للحرف `"…"`. وليست ثلاث نقاط.
=======
The maximal length must be `maxlength`, so we need to cut it a little shorter, to give space for the ellipsis.

Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
