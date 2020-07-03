
# الوصول إلي array[-1] 

في بعض لغات البرمجة، يمكن الوصول إلي عناصر المصفوفات برقم سالب حيث تقوم بالحسبة من النهاية.

كهذا:

```js
let array = [1, 2, 3];

array[-1]; // 3, the last element
array[-2]; // 2, one step from the end
array[-3]; // 1, two steps from the end
```

بطريقة أخري، فإن `array[-N]` هو نفسه `array[array.length - N]`.

قم بإنشاء بروكسي لتنفيذ هذا السلوك.

هنا كيف يجب أن تعمل:

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* your code */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

// السلوك الطبيعي للمصفوفات الأخري يجب أن يظل كما هو
```
