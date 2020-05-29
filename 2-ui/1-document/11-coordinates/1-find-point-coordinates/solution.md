# الزوايا الخارجية

الزوايا الخارجية هي في الأساس ما نحصل عليه من [elem.getBoundingClientRect ()] (https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

إحداثيات الزاوية العلوية اليسرى `answer1` والزاوية اليمنى السفلى` answer2`:

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# الزاوية الداخلية اليسرى العليا

هذا يختلف عن الزاوية الخارجية بعرض الحدود. طريقة موثوقة للحصول على المسافة هي `clientLeft / clientTop`:

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# الزاوية الداخلية اليمنى السفلية
في حالتنا ، نحتاج إلى طرح حجم الحدود من الإحداثيات الخارجية.
يمكننا استخدام طريقة CSS:

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

هناك طريقة بديلة تتمثل في إضافة "clientWidth / clientHeight" إلى إحداثيات الزاوية العلوية اليسرى. ربما هذا أفضل:

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```

