للوصول إلى وظيفة `switch` باستخدام `if` يجب استخدام معامل التساوي الثلاثي `'==='`.

بالنسبة للنصوص فإن `'=='` ستعمل أيضًا.

```js no-beautify
if(browser == 'Edge') {
  alert( "لديك Edge!" );
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'حسنا نحن ندعم هذه المتصفحات أيضًا' );
} else {
  alert( 'نتمنى أن تكون هذه الصفحة معروضة بشكل جيد' );
}
```

تم فصل `browser == 'Chrome' || browser == 'Firefox' …` إلى عدة سطور لسهولة القراءة.

لكن استخدام `switch` ما زال أفضل.
