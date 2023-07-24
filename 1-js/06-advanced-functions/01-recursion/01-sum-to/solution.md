الحل بإستخدام الحلقة: 

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

الحل بإستخدام التكرار: 

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```
الحل بإستخدام هذه المعادلة: `sumTo(n) = n*(n+1)/2`:


```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

1. منطقياً حل المعادلة هو أسرع حل لأننا نستخدم ثلاث عمليات فقط لأي رقم `n`.‘إذا الرياضة تساعد

الدالة المتكررة تأتي في المرتبة الاخيرة في السرعة ببساطة لأنها نفذت الكثير من النداءات و ذلك تطلب الكثير من سياقات التنفيذ و كومة سياقات التنفيذ لذلك فإنها الأبطأ

<<<<<<< HEAD
2. يعض المحركات تدعم تحسين "tail call": أذا كان النداء المتكرر هو الأخير في الدالة (مثلما في`sumTo` ) إذا فالدالة الخارجية لن تحتاج إلي مواصلة التنفيذ وبالتالي فإن المحرك لا يحتاج إلي تذكر سياق التنفيذ. ذلك يزبل العبء عن الذاكرة لذلك العد إلي `sumTo(100000)` ممكناً. لكن محرك جافا سكريبت لا يدعم هذا التحسين أو المعظم لا يدعم, لذلك سيكون هناك خطأ: لقد تخطيت الحجم الأقصي لكومة سياق التنفيذ.
=======
P.P.S. Some engines support the "tail call" optimization: if a recursive call is the very last one in the function, with no other calculations performed, then the outer function will not need to resume the execution, so the engine doesn't need to remember its execution context. That removes the burden on memory. But if the JavaScript engine does not support tail call optimization (most of them don't), there will be an error: maximum stack size exceeded, because there's usually a limitation on the total stack size.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10
