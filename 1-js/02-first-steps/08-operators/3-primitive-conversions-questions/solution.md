
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

<<<<<<< HEAD
1. الإضافة بسلسلة "" + 1` تحول `1` إلى سلسلة:` "" + 1 = "1" `، وبعد ذلك لدينا" 1 "+ 0` ، يتم تطبيق نفس القاعدة.
2. يعمل الطرح `-` (مثل معظم عمليات الرياضيات) مع الأرقام فقط ، فهو يحول سلسلة فارغة" "" إلى "0".
3. الإضافة بسلسلة تلحق الرقم `5` بالسلسلة.
4. يتحول الطرح دائمًا إلى أرقام ، لذلك يجعل "-9" `رقمًا -9` (تجاهل المسافات حوله).
5. يصبح "null" "0" بعد التحويل الرقمي.
6. يصبح "غير معرّف" "NaN" بعد التحويل الرقمي.
7. يتم قطع أحرف المسافة من بداية السلسلة ونهايتها عند تحويل سلسلة إلى رقم. تتكون السلسلة بأكملها هنا من أحرف مسافة ، مثل `\ t` و` \ n` ومسافة "عادية" بينهما. لذا ، على غرار السلسلة الفارغة ، تصبح `0`.
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8
