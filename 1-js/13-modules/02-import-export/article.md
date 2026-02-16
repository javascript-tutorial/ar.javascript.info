# التصدير والاستيراد

لمُوجِّهات (تعليمات) الاستيراد والتصدير أكثر من صياغة برمجية واحدة.

رأينا في الفصل السابق استعمالًا بسيطًا له، فهيًا نرى بقية الاستعمالات.

## التصدير قبل التصريح

يمكننا أن نقول لأيّ تصريح بأنّه مُصدّر بوضع عبارة `export` قبله، كان التصريح عن متغيّر أو عن دالة أو عن صنف.

فمثلًا، التصديرات هنا كلّها صحيحة:

```
// تصدير مصفوفة
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// تصدير ثابت
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// تصدير صنف
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

**ملاحظة**: لا يوجد فواصل منقوطة بعد تعليمة التصدير للأصناف أو الدوالّ
لاحظ أن تعليمة `export` قبل الصنف أو الدالة لا يجعلها [تعابير الدوالّ](https://academy.hsoub.com/programming/javascript/تعابير-الدوال-والدوال-السهمية-في-جافا سكريبت-r782/). ولو أنه يصُدرها، لكنه لا يزال تعريفًا للدالّة أو الصنف.

لا توصي معظم الأدلة التعليمية بوضع فاصلة منقوطة بعد تعريف الدوال والأصناف.

لهذا السبب لا داعي للفاصلة المنقوطة في نهاية التعليمة `export class` والتعليمة `export function`:

```
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} // لاحظ لا يوجد فاصلة منقوطة في نهاية التعريف
```

## التصدير بعيدًا عن التصريح

كما يمكننا وضع عبارة `export` لوحدها.

هنا نصرّح أولًا عن الدالتين وبعدها نُصدّرهما:

<<<<<<< HEAD
```
=======
Here we first declare, and then export:

```js
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // a list of exported variables
*/!*
```

أو... يمكننا تقنيًا وضع `export` أعلى الدوال أيضًا.

## عبارة استيراد كلّ شيء

عادةً نضع قائمة بما نريد استيراده في أقواس معقوفة `import {...}‎`، هكذا:

```
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

ولكن لو أردنا استيراد وحدات كثيرة، فيمكننا استيراد كلّ شيء كائنًا واحدًا باستعمال `import * as <obj>‎` هكذا:

```
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

يقول المرء من النظرة الأولى ”استيراد كلّ شيء فكرة جميلة جدًا، وكتابة الشيفرة سيكون أسرع. أساسًا لمَ نقول جهارةً ما نريد استيراده؟“

ذلك... لأسباب وجيهة.

<<<<<<< HEAD
1. أدوات البناء الحديثة (مثل: [webpack](http://webpack.github.io/) وغيرها)

   لنقل مثلًا بأنّا أضفنا مكتبة خارجية اسمها `say.js` إلى مشروعنا، وفيها دوالّ عديدة:

   ```
   // 📁 say.js
   export function sayHi() { ... }
   export function sayBye() { ... }
   export function becomeSilent() { ... }
   ```

   هكذا نستعمل واحدة فقط من دوالّ `say.js` في مشروعنا:
=======
1. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
2. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

```smart header="Don't be afraid to import too much"
Modern build tools, such as [webpack](https://webpack.js.org/) and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you `import * as library` from a huge code library, and then use only few methods, then unused ones [will not be included](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) into the optimized bundle.
```
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

   ```
   // 📁 main.js
   import {sayHi} from './say.js';
   ```

   ...حينها تأتي أداة التحسين وترى ذلك، فتُزيل الدوال الأخرى من الشيفرة ... بذلك يصغُر حجم الملف المبني. هذا ما نسميه هز الشجر (لتَسقطَ الأوراق اليابسة).

2. لو وضّحنا بالضبط ما نريد استيراده فيمكننا كتابته باسم أقصر: `sayHi()‎` بدل `say.sayHi()‎`.
3. بكتابة قائمة الاستيراد جهارةً نستطيع أن نفهم بنية الشيفرة دون الخوض في التفاصيل (أي نعرف ما نستعمل من وحدات، وأين نستعملها). هذا يسهّل دعم الشيفرة وإعادة كتابتها لو تطلّب الأمر.

## استيراد كذا بالاسم كذا `as`

يمكننا كذلك استعمال `as` لاستيراد ما نريد بأسماء مختلفة.

فمثلًا يمكننا استيراد الدالة `sayHi` في المتغير المحلي `hi` لنختصر الكلام، واستيراد `sayBye` على أنّها `bye`:

```
// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## تصدير كذا بالاسم كذا `as`

نفس صياغة الاستيراد موجودة أيضًا للتصدير `export`.

فلنصدّر الدوال على أنّها `hi` و`bye`:

```
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

الآن صارت `hi` و`bye` هي الأسماء ”الرسمية“ للشيفرات الخارجية وستُستعمل عند الاستيراد:

```
// 📁 main.js
import * as say from './say.js';

// لاحِظ الفرق
say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!
```

## التصدير المبدئي

في الواقع العملي، ثمّة نوعين رئيسين من الوحدات.

1. تلك التي تحتوي مكتبة (أي مجموعة من الدوال) مثل وحدة `say.js` أعلاه.
2. وتلك التي تصرّح عن كيانٍ واحد مثل وحدة `user.js` التي تُصدّر `class User` فقط.

عادةً ما يُحبّذ استعمال الطريقة الثانية كي يكون لكلّ ”شيء“ وحدةً خاصة به.

ولكن هذا بطبيعة الحال يطلب ملفات كثيرة إذ يطلب كلّ شيء وحدةً تخصّه باسمه، ولكنّ هذه ليست بمشكلة، أبدًا. بل على العكس هكذا يصير التنقل في الشيفرة أسهل (لو كانت تسمية الملفات مرضية ومرتّبة في مجلدات).

توفر الوِحدات طريقة لصياغة عبارة `export default` (التصدير المبدئي) لجعل "سطر تصدير واحد لكلّ وِحدة" تبدو أفضل.

ضَع `export default` قبل أيّ كيان لتصديره:

```
// 📁 user.js
export default class User { // ‫نُضيف ”default“ فقط
  constructor(name) {
    this.name = name;
  }
}
```

لكلّ ملف سطر تصدير `export default` واحد لا أكثر.

وبعدها... نستورد الكيان بدون الأقواس المعقوفة:

```
// 📁 main.js
import User from './user.js'; // ‫لا نضع {User}، بل User

new User('John');
```

أسطر الاستيراد التي لا تحتوي الأقواس المعقوفة أجمل من تلك التي تحتويها. يشيع خطأ نسيان تلك الأقواس حين يبدأ المطورون باستعمال الوِحدات. لذا تذكّر دائمًا، يطلب سطر الاستيراد `import` أقواس معقوفة للكيانات المُصدّرة والتي لها أسماء، ولا يطلبها لتلك المبدئية.

| التصدير الذي له اسم       | التصدير المبدئي                    |
| ------------------------- | ---------------------------------- |
| `export class User {...}` | `export default class User {...}‎` |
| `import {User} from ...`  | `import User from ...`             |

يمكننا نظريًا وضع النوعين من التصدير معًا في نفس الوحدة (الذي له اسم والمبدئي)، ولكن عمليًا لا يخلط الناس عادةً بينها، بل للوِحدة إمّا تصديرات لها أسماء، أو التصدير المبدئي.

ولأنّه لا يمكن أن يكون لكلّ ملف إلا تصديرًا مبدئيًا واحدًا، فيمكن للكيان الذي صُدّر ألّا يحمل أيّ اسم.

فمثلًا التصديرات أسفله كلّها صحيحة مئة في المئة:

```
export default class { // لا اسم للصنف
  constructor() { ... }
}
```

```
export default function(user) { // لا اسم للدالة
  alert(`Hello, ${user}!`);
}
```

```
// نُصدّر قيمةً واحدة دون صنع متغيّر
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

لا مشكلة بتاتًا بعدم كتابة الاسم إذ لا نرى `export default` إلّا مرّة في الملف، بهذا تعرف تمامًا أسطر `import` (بدون استعمال الأقواس المعقوفة) ما عليها استيراده.

ولكن دون `default` فهذا التصدير سيُعطينا خطأً:

```
export class { // Error! (non-default export needs a name)
  constructor() {}
}
```

### الاسم المبدئي

تُستعمل في حالات معيّنة الكلمة المفتاحية `default` للإشارة إلى التصدير المبدئي.

فمثلًا لتصدير الدالة بنحوٍ منفصل عن تعريفها:

```
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// ‫كما لو أضفنا ”export default“ قبل الدالة
export {sayHi as default};
```

أو لنقل بأنّ الوحدة `user.js` تُصدّر شيئًا واحدًا ”مبدئيًا“ وأخرى لها أسماء (نادرًا ما يحدث، ولكنّه يحدث):

```
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

هكذا نستورد التصدير المبدئي مع ذلك الذي لديه اسم:

```
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

وأخيرًا، حين نستورد كلّ شيء `*` على أنّه كائن، فستكون خاصية `default` هي كما التصدير المبدئي:

```
// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
```

كلمتين بخصوص سوء التصديرات المبدئية

التصديرات التي لها أسماء تكون صريحة، أي أنّها تقول تمامًا ما الّذي يجب أن نستورده، وبذلك يكون لدينا هذه المعلومات منهم، وهذا شيء جيد.

تُجبرنا التصديرات التي لها أسماء باستعمال الاسم الصحيح كما هو بالضبط لاستيراد الوحدة:

```
import {User} from './user.js';
// ‫ولن تعمل import {MyUser}‎ إذ يجب أن يكون الاسم {User}
```

بينما في حالة التصدير المبدئي نختار نحن الاسم حين نستورد الوِحدة:

```
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// ‫ويمكن أيضًا أن تكون ”استورِد كل شيء“ import Anything... وستعمل بلا أدنى مشكلة
```

هذا قد يؤدّي إلى أن يستعمل أعضاء الفريق أسماء مختلفة لاستيراد الشيء ذاته، وهذا طبعًا ليس بالجيد.

عادةً ولنتجنّب ذلك ونُحافظ على اتساق الشيفرة، نستعمل القاعدة القائلة بأنّ أسماء المتغيرات المُستورَدة يجب أن تُوافق أسماء الملفات، هكذا مثلًا:

```
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

مع ذلك تنظُر بعض الفِرق لهذا الأمر على أنه عقبة للتصديرات المبدئية فتفضّل استعمال التصديرات التي لها اسم دومًا. فحتّى لو كانت نصدّر شيئًا واحدًا فقط فما زالت تُصدّره باسم دون استعمال `default`.

كما يسهّل هذا إعادة التصدير (طالِع أسفله).

## إعادة التصدير

تُتيح لنا صياغة ”إعادة التصدير“ `export ... from ...‎` استيراد الأشياء وتصديرها مباشرةً (ربما باسم آخر) هكذا:

```
export {sayHi} from './say.js'; // ‫نُعيد تصدير sayHi

export {default as User} from './user.js'; // نُعيد تصدير المبدئي
```

ولكن فيمَ نستعمل هذا أصلًا؟ لنرى مثالًا عمليًا.

Imagine, we're writing a "package": a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages, but we don't have to use them), and many modules are just "helpers", for internal use in other package modules.

يمكن أن تكون بنية الملفات هكذا:

```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

We'd like to expose the package functionality via a single entry point.

In other words, a person who would like to use our package, should import only from the "main file" `auth/index.js`.

Like this:

```
import {login, logout} from 'auth/index.js'
```

The "main file", `auth/index.js` exports all the functionality that we'd like to provide in our package.

The idea is that outsiders, other programmers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.

نظرًا لكون الوظيفة الفعلية المصدّرة مبعثرة بين الحزمة، يمكننا استيرادها إلى `auth/index.js` وتصديرها من هنالك أيضًا:

```
// 📁 auth/index.js

// ‫اِستورد login/logout وصدِرهن مباشرةً
import {login, logout} from './helpers.js';
export {login, logout};

// ‫استورد الملف المبدئي كـ User وصدره من جديد
import User from './user.js';
export {User};
...
```

والآن يمكن لمستخدمي الحزمة الخاصة بنا استيرادها هكذا `import {login} from "auth/index.js"‎`.

إن الصياغة `export ... from ...‎` ماهي إلا اختصار للاستيراد والتصدير:

```
// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export the default export as User
export {default as User} from './user.js';
...
```

The notable difference of `export ... from` compared to `import/export` is that re-exported modules aren't available in the current file. So inside the above example of `auth/index.js` we can't use re-exported `login/logout` functions.

### Re-exporting the default export

يحتاج التصدير المبدئي لمعالجة منفصلة عند إعادة التصدير.

Let's say we have `user.js` with the `export default class User` and would like to re-export it:

```
// 📁 user.js
export default class User {
  // ...
}
```

1. لن تعمل التعليمة `export User from './user.js'‎`. ما الخطأ الذي حدث؟ ولكن هذا الخطأ في صياغة!

We can come across two problems with it:

1. `export User from './user.js'` won't work. That would lead to a syntax error.

<<<<<<< HEAD
2. تعيد التعليمة `export * from './user.js'‎` تصدير التصديرات الّتي لها أسماء فقط، ولكنها تتجاهل التصديرات المبدئية.
=======
    To re-export the default export, we have to write `export {default as User}`, as in the example above.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

   إذا رغبنا في إعادة تصدير التصديرات المبدئية والتي لها أسماء أيضًا، فسنحتاج إلى العبارتين:

<<<<<<< HEAD
   ```
   export * from './user.js'; // لإعادة تصدير التصديرات الّتي لها أسماء
   export {default} from './user.js'; // لإعادة تصدير التصديرات المبدئية
   ```
=======
    If we'd like to re-export both named and default exports, then two statements are needed:
    ```js
    export * from './user.js'; // to re-export named exports
    export {default} from './user.js'; // to re-export the default export
    ```
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Such oddities of re-exporting a default export are one of the reasons why some developers don't like default exports and prefer named ones.

## خلاصة

والآن سنراجع جميع أنواع طرق التصدير `export` التي تحدثنا عنها في هذا الفصل والفصول السابقة.

تحقق من معلوماتك بقراءتك لهم وتذكر ما تعنيه كلُّ واحدةٍ منهم:

- قبل التعريف عن صنف / دالّة / ..:
  - `export [default] class/function/variable ...‎`
- تصدير مستقل:
  - `export {x [as y], ...}‎`.
- إعادة التصدير:
  - `export {x [as y], ...} from "module"‎`
  - `export * from "module"‎` (لا يُعيد التصدير المبدئي).
  - `export {default [as y]} from "module"‎` (يعيد التصدير المبدئي).

استيراد:

- Importing named exports:
  - `import {x [as y], ...} from "module"`
- Importing the default export:
  - `import x from "module"`
  - `import {default as x} from "module"`
- Import all:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign any of its exports to variables:
  - `import "module"`

لا يهم مكان وضع عبارات (تعليمات) `import/export` سواءً في أعلى أو أسفل السكربت فلن يغير ذلك أي شيء.

لذا تقنيًا تعدُّ هذه الشيفرة البرمجية لا بأس بها:

```
sayHi();

// ...

import {sayHi} from './say.js'; // اِستورد في نهاية الملف
```

عمليًا عادة ما تكون تعليمات الاستيراد في بداية الملف فقط لتنسيق أفضل للشيفرة.

لاحظ أن تعليمتي import/export لن يعملا إن كانا في داخل جملة شرطية.

لن يعمل الاستيراد الشرطي مثل هذا المثال:

```
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```

.. ولكن ماذا لو احتجنا حقًا لاستيراد شيء ما بشروط معينة؟ أو في وقتٍ ما؟ مثل: تحميل الوِحدة عند الطلب، عندما تكون هناك حاجة إليها حقًا؟

سنرى الاستيراد الديناميكي في المقالة التالية.

ترجمة -وبتصرف- للفصل [Export and Import](https://javascript.info/import-export) من كتاب [The JavaScript language](https://javascript.info/js)
