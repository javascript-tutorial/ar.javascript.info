

الحل يكمن في التعريف `n!` يساوي `n * (n-1)`.


بطريقة أخري, ناتج `factorial(n)` يمكن أن نحسبه علي هذه الطريقة `n` مضروب في ناتج `factorial(n-1)`. ومناداة `n-1`  يمكن أن تنادي نفسها بتكرار أصغر فأصغر حتي نصل إلي`1`

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

الاساس التكراري هنا هو `1` يمكن أيضاً ان يكون `0` ولكن هذا لا يهم هذا يعطينا مناداة إضافية فقط:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
