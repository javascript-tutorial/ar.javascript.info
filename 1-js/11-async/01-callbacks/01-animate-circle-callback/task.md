
# دائرة متحركة بواسطة ال callback

في المهمة <info:task/animate-circle> تظهر دائرة متنامية متنامية.

الآن دعنا نقول أننا لسنا بحاجة فقط إلى دائرة ، ولكن لإظهار رسالة بداخلها. يجب أن تظهر الرسالة *بعد* اكتمال الرسم المتحرك (الدائرة كاملة) ، وإلا ستبدو قبيحة.

في حل المهمة ، ترسم هذه الدالة `showCircle(cx, cy, radius)` دائرة, لكنها لا تعطي أي وسيلة للتتبع عندما تكون جاهزة.

أضف وسيطة ال callback: `showCircle(cx, cy, radius, callback)` ليتم أستدعاءها عندما الحركه تكتمل. الدالة `callback` يجب أن تستقبل الدائرة `<div>` كوسيط.

إليك المثال:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

الناتج:

[iframe src="solution" height=260]

خذ حل المهمة <info:task/animate-circle> كقاعدة.
