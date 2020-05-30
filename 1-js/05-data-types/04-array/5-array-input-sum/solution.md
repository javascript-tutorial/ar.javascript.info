يرجى ملاحظة التفاصيل الدقيقة والمهمة للحل. نحن لا نقوم بتحويل`value` الي رقم فورا بعد `prompt`, لان بعد القيمه `value = +value` لن نتمكن من معرفة النص فارغ (علامة التوقف) من الصفر (رقم صالح). سنقوم بذلك لاحقًا بدلاً من ذلك.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("  رقم من فضلك A Number Please", 0);

    // يجب أن نلغي؟
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

