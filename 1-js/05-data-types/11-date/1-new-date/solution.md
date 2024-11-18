يقوم الباني `new Date` باستخدام المنطقة الزمنية المحلية. لذا فإن الشيء المهم الوحيد الذي يجب تذكره الآن هو أن الأشهر تبدأ من الصفر وليس من الواحد.

لذلك يتم تمثيل شهر شباط (فبراير) بالرقم 1.

Here's an example with numbers as date components:

```js run
//new Date(year, month, date, hour, minute, second, millisecond)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
We could also create a date from a string, like this:

```js run
//new Date(datastring)
let d2 = new Date("2012-02-20T03:12");
alert( d2 );
```
