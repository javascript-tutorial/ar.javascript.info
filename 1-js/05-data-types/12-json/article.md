# الكائن json وكيفية استخدامه

دعنا نقول أن لدينا كائن معقد ونريد تحويله إلى نص (string) لإرساله عن طريق شبكة الإنترنت أو أن نطبعه فقط.

من المفترض أن يحتوى النص هذا على كل الخصائص المهمه للكائن.

يمكننا إجراء التحويل كالآتى:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...ولكن عند التطبيق العملى يتم إضافة خصائص جديده أو إعادة تسمية خصائص قديمه أو إزالتها. فتحديث النص عن طريق الدالة `toString` كل  مرة سيكون صعبًا. يمكننا أن نقوم بالتكرار على كل الخصائص فى هذا الكائن ولكن ماذا إذا كان هذا الكائن معقدًا ويحتوى على كائنات أخرى بداخله؟ يجب أن نقوم بتحويلهم أيضًا.

لحسن الحظ، ليس هناك حاجه لكتابة كود يقوم بالتعامل مع ذلك. فقد تم حل هذه المشكله بالفعل.

## JSON.stringify

إن الكائن 
[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation)
هو شكل عام لعرض الكائنات والقيم. وقد تم وصفه كما فى ال [RFC 4627](http://tools.ietf.org/html/rfc4627).
لقد صُنع فى البداية من أجل الجافاسكريبت، ولكن هناك لغات ومكتبات أخرى للتعامل معه أيضًا. ولذلك من السهل استخدام الكائن JSON لتبادل البيانات عندما تكون الواجهة بالجافاسكريبت والسيرفر / الباك اند بلغة مثل Ruby/PHP/Java أو أيًا كان.

تحتوى الجافاسكريبت على دوال للتعامل مع الكائن JSON:

- `JSON.stringify` لتحويل الكائن إلى جيسون.
- `JSON.parse` لتحويل الجيسون مرة أخرى إلى كائن.

على سبيل المثال، هنا قمنا بتحويل الكائن `student` باستخدام `JSON.stringify`:

```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // لدينا نص!

alert(json);
*!*
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
*/!*
```

تستقبل الدالة `JSON.stringify(student)` كائنًا وتحوّله إلى نص.

والجيسون الناتج عن ذلك يسمى _JSON-encoded object_ أو _serialized object_ أو _stringified object_ أو _marshalled object_. والآن يمكننا أن نرسله عن طريق الشبكة أو نضعه فى مكان ما لتخزين البيانات.

لاحظ أن الكائن المحوَّل يختلف عن الكائن العادى فى عدة نقاط:

- النصوص تستخدم العلامات النصيه `""` ولا توجد العلامه المفرده `''` أو هذه ` `. فإن `'John'` يتحول إلى `"John"`.
- أسماء الخواص فى الكائن تكون محاطه بالعلامه النصيه الثنائية أيضًا `""` . ولذلك فإن `age:30` يتحول إلى `"age":30`.

ويمكن استخادم `JSON.stringify` مع القيم المفردة أيضًا وليس مع الكائنات فقط.

يدعم الجيسون أنواع البيانات الآتية:

- الكائنات `{ ... }`
- القوائم (arrays) `[ ... ]`
- القيم المفردة (Primitives):
  - النصوص (strings),
  - الأرقام,
  - القيم المنطقيه (booleans) `true/false`,
  - `null`.

على سبيل المثال:

```js run
// الرقم المحوِّل إلى جيسون هو رقم أيضًا
alert(JSON.stringify(1)); // 1

// النص المحوَّل إلى جيسون هو نصٌ أيضًا ولكن محاط بعلامة التنصيص الثنائية ""
alert(JSON.stringify("test")); // "test"

alert(JSON.stringify(true)); // true

alert(JSON.stringify([1, 2, 3])); // [1,2,3]
```

الجيسون يستخدم خصيصًا لعرض البيانات فقط ولذلك فإن بعض خصائص الكائنات فى الجافاسكريبت يتم تخطيها عند استخدام `JSON.stringify`.

وهى:

- الخصائص التى هي عباره عن دوال (Functions).
- الخصائص من نوع الرمز (Symbol).
- الخصائص التى قيمتها `undefined`.

```js run
let user = {
  sayHi() {
    // يتم تجاهلها
    alert("Hello");
  },
  [Symbol("id")]: 123, // يتم تجاهلها
  something: undefined, // يتم تجاهلها
};

alert(JSON.stringify(user)); // {} (كائن فارغ)
```

عادةً ما يكون هذا جيدً. وإذا لم يكن هذا مانريده، إذا سنرى قريبًا كيف يمكن أن نعدل هذه العملية لصالحنا.

الشئ الجيد هنا أن الكائنات الموجوده بداخل أخرى مدعومة ويتم تحويلها تلقائيًا.

على سبيل المثال:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* الشكل بالكامل تم تحويله إلى نص:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

هناك شئ مهم يمنع هذا: وهو أنه لابد أن لا يحتوى الكائن على كائن هو أيضًا يحتوى على الكائن الأول.

على سبيل المثال:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup يحتوى على room
room.occupiedBy = meetup; // room يحتوى على meetup

*!*
JSON.stringify(meetup); // خطأ: Converting circular structure to JSON
*/!*
```

فى هذه الحالة يفضل التحويل وهذا بسبب احتواء كل كائن على آخر (circular reference): `room.occupiedBy` تحتوى على `meetup`، و `meetup.place` تحتوى على `room`

![](json-meetup.svg)

## Excluding and transforming: replacer

كيفية استخدام `JSON.stringify` هو كالآتى:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: هي القيمة التى ستحوَّل.

replacer
: قائمة (array) من الخصائص لتحويلها أو دالة لتنفيذعا على كل خاصية.

space
: كم المسافه التى يجب استخدامها من أجل التنظيم.

فى أغلب الوقت تُستخدم `JSON.stringify` مع أول متغير فقط، ولكن إذا أردنا أن نتحكم فى كيفية عمل هذه الدالة، مثل التحقق من وجود كائن بداخل آخر يحتوى على هذا الكائن والعكس (circular references)، إذًا يمكننا استخدام المتغير الثاني للدالة `JSON.stringify`.

إذا مررنا قائمة من الخصائص للدالة، فسيتم تحويل قيم هذه الخصائص فقط.

على سبيل المثال:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup يحتوى علي room
};

room.occupiedBy = meetup; // room يحتوى علي meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

هنا نحن محَدَّدين. حيث أن القائمة المُمرَّرة هي للكائن بأكمله ولذلك فإن الكائنات بداخل `participants` فارغة لأن الخاصية `name` ليست فى القائمة.

هيا نحِّل كل الخصائص عدا `room.occupiedBy` والتى يمكن أن تسبب المرجع الدائرى (circular reference):

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup يحتوى علي room
};

room.occupiedBy = meetup; // room يحتوى علي meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

كل شيئ الآن تم تحويله عدا `occupiedBy`، ولكن القائمة طويلة قليلًا.

لحسن الحظ، يمكننا أن نستعمل دالة بدلًا من القائمة وتسمّي `replacer`.

هذه الدالة سيتم استدعاؤها لكل خاصية وقيمتها وستقوم بإرجاع القيمة "البديلة" والتى ستستخدم بلًا من الأصلية أو ستقوم بإرجاع `undefined` للقيمة التى سيتم تخطيها.

فى حالتنا هذه، يمكننا أن نقوم بإرجاع القيمة "كما هي" لكل شئ عدا `occupiedBy`. ولتجاهل `occupiedBy`، سيقوم الكود التالى بإرجاع `undefinrd`:

```js run
let room = {
  number: 23,
};

let meetup = {
  title: "Conference",
  participants: [{ name: "John" }, { name: "Alice" }],
  place: room, // meetup يحتوى علي room
};

room.occupiedBy = meetup; // room يحتوى علي meetup

alert(
  JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return key == "occupiedBy" ? undefined : value;
  })
);

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/
```

لاحظ أن الدالة `replacer` تستقبل كل خاصية وقيمتها بما فيها من كائنات مُضَمّنة وكذلك عناصر القائمة. حيث أنه سيتم تنفيذه بشكل متكرر. وقيمة 
`this`
 داخل الدالة 
 `replacer`
 هو كائن يحتوى على الخاصية الحالية.

الإستدعاء الأول للدالة خاص. لأنه يتم بكائن خاص يحتويه `{"": meetup}`. بصيغة أخرى يمكن أن نقول أن أول خاصية بقيمتها تحتوى على خاصية فارغة والقيمة هي الكائن المستهدف تحويله بأكمله.لهذا قيمة أول سطر هي `":[object Object]"` قى المثال أعلاه.

الفكرة هي أن تعطي صلاحيات للدالة `replacer` على قدر المستطاع: حيث أن لديها الفرصه للتحليل وكذلك الإستبدال أو التخطي حتي للكائن بأكمله إذا كان هذا ضروريًا.

## التنظيم: المسافات

المتغير الثالث للدالة `JSON.stringify(value, replacer, space)` هو عدد المسافات لاستخدامها فى التنظيم.

سابقًا، كانت كل الكائنات المُحوَّلة إلى نصوص لا تحتوى على أى تنظيم. وهذا كافى إذا كنا نريد أن نرسل الكائن عبر الشبكة. والمتغير `space` يستخدم تحديدًا لطباعة الكائن بشكل منظم.

هنا `space = 2` تُخبر الجافاسكريبت أن تعرض الكائنات الداخلية على سطور عدة مع مسافات فارغة تقدر بمسافتين داخل الكائن:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true,
  },
};

alert(JSON.stringify(user, null, 2));
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* عند استخدام JSON.stringify(user, null, 4) فإن النتيجة تحتوى على مزيد من المسافات الفارغة:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```
يُستخدم المتغير `space` لوحده من أجل الطباعة بشكل منظم.

## دالة "toJson" مخصصه

كما أنه توجد دالة `toString` للتحويل إلى نص، يمكن لأى كائن أن يحتوى علي دالة `toJSON` للتحويل إلى جيسون. وتستدعيها الدالة `JSON.stringify` تلقائيًا إذا كانت موجودة.

على سبيل المثال:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

يمكننا أن نري هنا أن `date` `(1)` أصبحت نصًا وهذا لأن كل التواريخ تحتوى على دالة `toJSON` موجودة بالفعل والتى تقوم بإرجاع هذا النوع من النصوص.

هيا نقوم بإنشاء دالة `toJSON` مخصصة للكائن `room` `(2)`:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

كما نرى هنا فإن الدالة `toJSON` يمكن استخدامها عن طريق استدعاء `JSON.stringify(room)` مباشرةً أو عندما يكون الكائن `room` بداخل كائن آخر.

## JSON.parse

لإرجاع الكائن المحوَّل إلى جيسون مرةً أخرى سنحتاج إلى دالة أخرى تسمى [JSON.parse](mdn:js/JSON/parse).

كيفية استخدامها:

```js
let value = JSON.parse(str, [reviver]);
```

str
: النص المحوَّل لجيسون لإرجاعه.

reviver
: دالة اختيارية تستقبل الخاصية وقيمتها والتى سيتم استدعاؤها لكل خاصية وقيمتها ويمكنها تحويل القمة.

على سبيل المثال:

```js run
// قائمة محوَّلة
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert(numbers[1]); // 1
```

أو لكائنات مُضَمَّنة (nested objects):

```js run
let userData =
  '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert(user.friends[1]); // 1
```

يمكن أن يكون الجيسون معقدًا حيث يمكن أن تحتوى الكائنات علي كائنات أو قوائم أخرى، ولكنهم يجب أن يتبعو نفس تنظيم الكائن جيسون.

هنا بعض الأخطاء لجيسون تمت كتابته باليد (أحيانًا نحتاج لكتابته لأغراض البحث عن الأخطاء):

```js
let json = `{
  *!*name*/!*: "John",                     // mistake: property name without quotes
  "surname": *!*'Smith'*/!*,               // mistake: single quotes in value (must be double)
  *!*'isAdmin'*/!*: false                  // mistake: single quotes in key (must be double)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
```

إلى جانب ذلك، لا يدعم الجيسون التعليقات (comments)، حيث أن إضافة تعليق للكائن جيسون سيجعله غير صالح.

هناك بُنية أخري تسمي [JSON5](http://json5.org/) والتى تسمح بالخصائص الغير محاطة بعلامة التنصيص الثنائية والتعليقات وغيرها، ولكن هذه مكتبة أخرى وليست فى مواصفات اللغة.

إن الكائن JSON هو محدَّد وذلك ليس لأن المطوِّرين كسولين ولكن للسماح بسرعة وسهولة خطوات التحويل.

## استخدام الدالة reviver

تخيل أن لدينا كائنًا محوَّل إلى نص يسمي `meetup` قادم من السيرفر\الخادم.

سيكون بهذا الشكل:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...والآن سنحتاج إلى تحويله إلى كائن عادى.

هيا نفعل ذلك باستدعاء `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // خطأ!
*/!*
```

يا إلهى! خطأ!

إن قيمة `meetup.date` هي نص وليست تاريخ، كيف يمكن للدالة `JSON.parse` أن تعلم أنها يجب أن تحول هذا النص إلى تاريخ؟

هيا نمرر الدالة `reviver` إلى الدالة `JSON.parse` كمتغير ثانٍ والتى تقوم بإرجاع كل شيئ كما هو عدا 
`date` ستتحول إلى `تاريخ`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // لا يوجد خطأ الآن!
```

وهي تعمل مع الكائنات المُضَمَّنة أيضًا:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // تعمل جيدًا!
*/!*
```

## الملخص

- الكائن JSON هو شكل من أشكال البيانات والتى تحتوى على قواعدها ومكتباتها الخاصة لأغلب لغات البرمجة.
- الكائن JSON يدعم الكائنات العادية والقوائم والأرقام والقيم المنطقية والنصوص و القيمة `null`.
- توجد دوال فى الجافاسكريبت [JSON.stringify](mdn:js/JSON/stringify) لتحويل الكائن إلى جيسون و أيضًا [JSON.parse](mdn:js/JSON/parse) لتحويله مرة أخري إلى كائن.
- كلا الدالتين تدعم الدوال التى تحوِّل من وإلى بشكل ذكي.
- إذا كان الكائن يحتوى على الدالة `toJSON`، إذا سيتم استدعاؤها عن طريق الدالة `JSON.stringify`.
