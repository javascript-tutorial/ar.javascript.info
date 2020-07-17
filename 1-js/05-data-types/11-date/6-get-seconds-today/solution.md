للحصول على عدد الثواني، بإمكاننا توليد غرض من التاريخ باستخدام اليوم بحيث يكون الوقت 00:00:00، ثم نقوم بطرح هذا التاريخ من قيمة التاريخ "الآن".

الفرق هو عدد المللي ثانية منذ بداية اليوم، والذي يجب أن نقسمه على 1000 للحصول على الثواني المطلوبة:

```js run
function getSecondsToday() {
  let now = new Date();

  // إنشاء غرض من التاريخ باستخدام السنة/الشهر/اليوم الحاليين
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // الفرق من مرتبة المللي ثانية
  return Math.round(diff / 1000); // التحويل للثواني
}

alert( getSecondsToday() );
```

يمكن استخدام الحل البديل، وهو الحصول على الساعات/الدقائق/الثواني الحالية وتحويلها جميعاً إلى فئة الثانية:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
```
