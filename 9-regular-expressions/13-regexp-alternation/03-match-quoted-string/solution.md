الحل: `pattern: /" (\\. | [^ "\\]) *" / g`.

خطوة بخطوة:

<<<<<<< HEAD
- أولاً نبحث عن "نمط" الاقتباس الافتتاحي: "
- ثم إذا كان لدينا نمط `` الشرطة المائلة للخلف '': `` (يجب علينا تقنيًا مضاعفته في النمط ، لأنه شخصية خاصة ، لذلك فهي خط مائل عكسي في الواقع) ، فإن أي حرف يكون جيدًا بعده (نقطة ).
- وإلا فإننا نأخذ أي حرف باستثناء الاقتباس (وهذا يعني نهاية السلسلة) وشرطة مائلة للخلف (لمنع الخطوط المائلة العكسية الوحيدة ، يتم استخدام الشرطة المائلة للخلف فقط مع بعض الرموز الأخرى بعدها): `النمط: [^" \\] `
- ... وهلم جرا حتى آخر quote أو علامة افتباس .
=======
- First we look for an opening quote `pattern:"`
- Then if we have a backslash `pattern:\\` (we have to double it in the pattern because it is a special character), then any character is fine after it (a dot).
- Otherwise we take any character except a quote (that would mean the end of the string) and a backslash (to prevent lonely backslashes, the backslash is only used with some other symbol after it): `pattern:[^"\\]`
- ...And so on till the closing quote.
>>>>>>> f6ae0b5a5f3e48074312ca3e47c17c92a5a52328

بشكل:

```js run
let regexp = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

alert( str.match(regexp) ); // "test me","Say \"Hello\"!","\\ \""
```

