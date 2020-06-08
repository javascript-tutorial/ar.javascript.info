
# الخواص والدوال الثابتة

كما يمكننا تعيين خاصية لدالة الclass ذاتها, وليس لـ `"prototype"` الخاص بها. مثل هذه الدوال تسمى بـ*static*.

في الـ class, يتم إلحاقهم بكلمة رئيسية ` static `'' ، مثل هذا:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

هذا في الواقع يفعل نفس الشيء عند تعيينه كخاصية مباشرة:

```js run
class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
```

قيمة `this` في` User.staticMethod () `هي مُنشئ الفئة` المستخدم` نفسه (قاعدة "object قبل النقطة").

عادة ، يتم استخدام الأساليب الثابتة لتنفيذ الوظائف التي تنتمي إلى الفئة ، ولكن ليس لأي object معين منها.

على سبيل المثال ، لدينا objects `Article` ونحتاج إلى وظيفة لمقارنتها. الحل الطبيعي هو إضافة طريقة `Article.compare` ، على النحو التالي:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// usage
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

هنا "Article.compare" تقف المقالات "أعلاه" ، كوسيلة لمقارنتها. إنها ليست دالة لـ `article` ، ولكن بدلاً من الـ `class` بأكمله.

مثال آخر هو ما يسمى طريقة "المصنع". تخيل ، نحن بحاجة إلى طرق قليلة لإنشاء مقال:

1. إنشاء بواسطة معلمات معينة (`العنوان` ،` التاريخ` وما إلى ذلك).
2. إنشاء مقال فارغ بتاريخ اليوم.
3. ... أو بطريقة أخرى.

يمكن تنفيذ الطريقة الأولى من قبل المنشئ. وللثاني يمكننا عمل طريقة ثابتة للفئة.

مثل `Article.createTodays()` هنا:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // remember, this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Today's digest
```

الآن في كل مرة نحتاج فيها إلى إنشاء ملخص اليوم ، يمكننا استدعاء `` Article.createTodays () `. مرة أخرى ، هذه ليست طريقة لمقالة ، ولكنها طريقة للفصل بأكمله.

يتم استخدام الأساليب الثابتة أيضًا في الفئات المتعلقة بقاعدة البيانات للبحث / حفظ / إزالة الإدخالات من قاعدة البيانات ، مثل هذا:

```js
// assuming Article is a special class for managing articles
// static method to remove the article:
Article.remove({id: 12345});
```

## Static properties

[recent browser=Chrome]

الخصائص الثابتة ممكنة أيضًا ، فهي تبدو مثل خصائص الفئة العادية ، ولكن يتم إلحاقها بـ `static`:

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

That is the same as a direct assignment to `Article`:

```js
Article.publisher = "Ilya Kantor";
```

## وراثة الدوال والخصائص الثابتة

الخصائص والأساليب الثابتة موروثة.

على سبيل المثال ، `Animal.compare` و` Animal.planet` في الشفرة أدناه موروثة ويمكن الوصول إليها باسم `Rabbit.compare` و`Rabbit.planet`:

```js run
class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth
```

الآن عندما نسمي "Rabbit.compare" ، سيتم استدعاء "Animal.compare" الموروث.

كيف يعمل؟ مرة أخرى ، باستخدام النماذج الأولية. كما كنت قد خمنت بالفعل ، فإن كلمة "يمتد" تعطي كلمة "أرنب" يشير "[[نموذج أولي]]` إلى "حيوان".

![](animal-rabbit-static.svg)

So, `Rabbit extends Animal` creates two `[[Prototype]]` references:

1. `Rabbit` function prototypally inherits from `Animal` function.
2. `Rabbit.prototype` prototypally inherits from `Animal.prototype`.

As a result, inheritance works both for regular and static methods.

Here, let's check that by code:

```js run
class Animal {}
class Rabbit extends Animal {}

// for statics
alert(Rabbit.__proto__ === Animal); // true

// for regular methods
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## ملخص

يتم استخدام الأساليب الثابتة للوظيفة التي تنتمي إلى الفئة "ككل". لا يتعلق الأمر بمثيل فئة ملموسة.

على سبيل المثال ، طريقة للمقارنة `Article.compare (article1 ، article2)` أو طريقة مصنع `Article.createTodays ()`.

يتم تسميتها بكلمة "ثابت" في إعلان الفئة.

يتم استخدام الخصائص الثابتة عندما نرغب في تخزين البيانات على مستوى الفصل الدراسي ، والتي لا ترتبط أيضًا بمثيل.

الصيغة هي:


```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

من الناحية الفنية ، فإن الإعلان الثابت هو نفسه التخصيص للـ `class` نفسها:

```js
MyClass.property = ...
MyClass.method = ...
```

الخصائص والأساليب الثابتة موروثة.

بالنسبة إلى "الفئة B التي تمد A" ، يشير النموذج الأولي للفئة `B` نفسها إلى` A`: `B. [[Prototype]] = A`. لذا ، إذا لم يتم العثور على حقل في `B` ، فسيستمر البحث في` A`.

