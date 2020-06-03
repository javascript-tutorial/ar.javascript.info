# خطأ في setTimeout

ما رأيك؟ هل سيتم تشغيل "catch"؟ اشرح اجابتك.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
