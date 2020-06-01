أولاً ، نحن بحاجة إلى العثور على جميع المراجع الخارجية.

هناك طريقتان.

الأول هو العثور على جميع الروابط باستخدام `document.querySelectorAll ('a')` ثم تصفية ما نحتاج إليه:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // no attribute

  if (!href.includes('://')) continue; // no protocol

  if (href.startsWith('http://internal.com')) continue; // internal

  link.style.color = 'orange';
}
```

يرجى ملاحظة ما يلي: نستخدم `link.getAttribute ('href')`. ليس `link.href` ، لأننا نحتاج إلى القيمة من HTML.

... طريقة أخرى أبسط هي إضافة الشيكات إلى محدد CSS:

```js
// look for all links that have :// in href
// but href doesn't start with http://internal.com
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```

