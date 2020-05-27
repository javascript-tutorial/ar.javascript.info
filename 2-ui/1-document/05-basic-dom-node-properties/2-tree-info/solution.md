لنقم بعمل iteration علي  `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

في الحلقة ، نحتاج إلى إدخال النص داخل كل "li".

يمكننا قراءة النص من العقدة الفرعية الأولى لـ `li` ، وهي العقدة النصية:
```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title is the text in <li> before any other nodes
}
```

ثم يمكننا الحصول على عدد الchildren items
 `li.getElementsByTagName('li').length`.
