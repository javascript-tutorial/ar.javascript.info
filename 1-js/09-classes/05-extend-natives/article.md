
# امتداد الـ `classes` المدمجة 

الـ `classes` المدمجة مثل الـ `Array` و `Map` وغيرهم قابلين للامتداد أيضا

على سبيل المثال ، هنا يرث `PowerArray` من` Array` الأصلي:

```js run
// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

يرجى ملاحظة شيء مثير جدا للاهتمام. الأساليب المدمجة مثل `filter` و` map` وغيرها - تُرجع كائنات جديدة من النوع الموروث` PowerArray` بالضبط. يستخدم التنفيذ الداخلي خاصية `مُنشئ 'الكائن لذلك.

في المثال أعلاه,
```js
arr.constructor === PowerArray
```

عند استدعاء `arr.filter ()` ، فإنه ينشئ داخليًا مجموعة جديدة من النتائج باستخدام "arr.constructor" بالضبط ، وليس `Array` الأساسي. هذا في الواقع رائع جدًا ، لأنه يمكننا الاستمرار في استخدام طرق `` PowerArray` بشكل أكبر على النتيجة.

بل وأكثر من ذلك ، يمكننا تخصيص هذا السلوك.

يمكننا إضافة مُصطلح ثابت خاص `Symbol.species` إلى الفصل. إذا كان موجودًا ، فيجب أن يُرجع المُنشئ الذي ستستخدمه JavaScript داخليًا لإنشاء كيانات جديدة في `خريطة` و` فلتر` وما إلى ذلك.

إذا كنا نرغب في استخدام طرق مضمنة مثل `الخريطة` أو` الفلتر` لإرجاع المصفوفات العادية ، فيمكننا إرجاع `المصفوفة` في` الرمز المحدد '، كما يلي:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr is not PowerArray, but Array
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

كما ترى ، الآن يُرجع `.filter`` Array`. لذلك لم يتم تمرير الدالة الموروثة أكثر من ذلك.

"` `smart header =" مجموعات أخرى تعمل بنفس الطريقة "
تعمل مجموعات أخرى ، مثل `Map` و` Set` ، على حد سواء. كما أنهم يستخدمون `Symbol.species`.
``

## لا وجود للتوريث الثابت في كل المدمجات

لها دوال  ثابتة خاصة بها ، مثل `Object.keys` ،` Array.isArray` إلخ.

كما نعلم بالفعل ، تمتد الفصول الدراسية الأصلية لبعضها البعض. على سبيل المثال ، `Array` يمتد` Object`.

عادة ، عندما تمد فئة واحدة أخرى ، يتم توريث كل من الأساليب الثابتة وغير الثابتة. تم شرح ذلك تمامًا في المقالة [] (info: static-properties-methods # statics-and-inheritance).

لكن الفصول المدمجة استثناء. لا يرثون إحصائيات عن بعضهم البعض.

على سبيل المثال ، يرث كل من `Array` و` Date` من `Object` ، لذا فإن نُسخهما تحتوي على طرق من` Object.prototype`. لكن `Array. [[Prototype]]` لا يشير إلى `Object` ، لذلك لا يوجد ، على سبيل المثال ،` Array.keys () `(أو` Date.keys () `) طريقة ثابتة.

إليك بنية الصورة لـ `Date` و` Object`:


![](object-date-inheritance.svg)

كما ترى ، لا يوجد رابط بين `التاريخ` و` الكائن`. إنهم مستقلون ، فقط يرث `Date.prototype` من` Object.prototype`.

هذا اختلاف مهم في الميراث بين الكائنات المضمنة مقارنة بما نحصل عليه مع `extends` ''.
