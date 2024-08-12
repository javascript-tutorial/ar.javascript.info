
<<<<<<< HEAD
علامة الفتح هي `النمط: \ [(b | url | الاقتباس) \]`.
=======
Opening tag is `pattern:\[(b|url|quote)]`.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

ثم للعثور على كل شيء حتى علامة الإغلاق - دعنا نستخدم النمط `pattern:. *؟` مع العلامة `pattern: s` لمطابقة أي حرف بما في ذلك السطر الجديد ثم إضافة مرجع خلفي إلى علامة الإغلاق.

<<<<<<< HEAD
النمط الكامل: `pattern: \ [(b | url | الاقتباس) \]. *؟ \ [/ \ 1 \]`.
=======
The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1]`.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

بشكل عملي:

```js run
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

<<<<<<< HEAD
يرجى ملاحظة أنه بالإضافة إلى الهروب من `نمط: [` و `نقش:]` ، كان علينا أن نهرب من شرطة مائلة لنموذج علامة الإغلاق: [\ / \ 1] `، لأن الخط المائل يغلق النمط عادةً.
=======
Please note that besides escaping `pattern:[`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d
