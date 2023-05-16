هناك العديد من الطرق، على سبيل المثال:

عقدة `<DOM <div`:

```js
document.body.firstElementChild;
// أو
document.body.children[0];
// أو (العقدة الأولى هي المسافة، لذلك نأخذ الثانية)
document.body.childNodes[1];
```

عقدة `<DOM <ul`:

```js
document.body.lastElementChild;
// أو
document.body.children[1];
```

العنصر `<li>` الثاني (مع Pete):

```js
// احصل على <ul>، ثم احصل على آخر عنصر فرعي له
document.body.lastElementChild.lastElementChild;
```
