
بداية النمط واضحة: `pattern: <style`.

... ولكن بعد ذلك لا يمكننا ببساطة كتابة `pattern: <style. *؟>` ، لأن `match: <styler>` ستطابقها.

نحتاج إلى مسافة بعد `match: <style` ثم اختياريًا شيء آخر أو` `match:>` النهائي.

في لغة regexp: `pattern: <style (> | \ s. *؟>)`.

بشكل عملي:

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```

