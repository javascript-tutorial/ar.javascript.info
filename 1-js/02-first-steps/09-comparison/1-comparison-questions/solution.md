

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

بعض الأسباب:

<<<<<<< HEAD
1. من الواضح ، صحيح.
2. مقارنة القاموس ، وبالتالي خطأ. "" a "أصغر من" "p" ".
3. مرة أخرى ، مقارنة القاموس ، الحرف الأول من "2" أكبر من الحرف الأول من "1".
4. القيم "فارغة" و "غير محددة" تساوي بعضها البعض فقط.
5. المساواة الصارمة صارمة. أنواع مختلفة من كلا الجانبين تؤدي إلى خطأ.
6- على غرار "(4)` ، "فارغ" يساوي فقط "غير محدد".
7. المساواة الصارمة بمختلف أنواعها.
=======
1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char `"2"` is greater than the first char `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
