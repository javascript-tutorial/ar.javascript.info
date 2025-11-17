# مقدّمة إلى الوحدات

سنرى سريعًا بينما تطبيقنا يكبُر حجمًا وتعقيدًا بأنّ علينا تقسيمه إلى ملفات متعدّدة، أو ”وِحدات“ (module). عادةً ما تحتوي الوحدة على صنف أو مكتبة فيها دوالّ.

كانت محرّكات جافا سكريبت تعمل لفترة طويلة جدًا دون أيّ صياغة وِحدات على مستوى اللغة، ولم تكن هذه بالمشكلة إذ أنّ السكربتات سابقًا كانت بسيطة وسهلة ولم يكن هناك داعٍ فعلي للوِحدات.

ولكن كالعادة صارت السكربتات هذه أكثر تعقيدًا وأكبر، فكان على المجتمع اختراع طرائق مختلفة لتنظيم الشيفرات في وحدات (أو مكتبات خاصّة تُحمّل تلك الوحدات حين الطلب).

مثال:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition): هذه إحدى نُظم المكتبات القديمة جدًا والتي كتبت تنفيذها بدايةً المكتبة [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1): نظام الوحدات الذي صُنِع لخوادم Node.js.
- [UMD](https://github.com/umdjs/umd): نظام وِحدات آخر (اقتُرح ليكون للعموم أجمعين) وهو متوافق مع AMD وCommonJS.

<<<<<<< HEAD
أمّا الآن فهذه المكتبات صارت (أو تصير، يومًا بعد آخر) جزءًا من التاريخ، ولكن مع ذلك سنراها في السكربتات القديمة.

ظهر نظام الوحدات (على مستوى اللغة) في المعيار عام 2015، وتطوّر شيئًا فشيئًا منذئذ وصارت الآن أغلب المتصفّحات الرئيسة (كما و Node.js) تدعمه. لذا سيكون أفضل لو بدأنا دراسة عملها من الآن.
=======
- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.js server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now these all slowly became a part of history, but we still can find them in old scripts.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

## ما الوحدة؟

الوحدة هي ملف، فقط. كلّ نص برمجي يساوي وحدة واحدة.

يمكن أن تُحمّل الوحدات بعضها البعض وتستعمل توجيهات خاصة مثل التصدير `export` والاستيراد `import` لتتبادل الميزات فيما بينها وتستدعي الدوالّ الموجودة في وحدة ص، من وحدة س:

- تقول الكلمة المفتاحية `export` للمتغيرات والدوالّ بأنّ الوصول إليها من خارج الوحدة الحالية هو أمر مُتاح.
- وتُتيح `import` استيراد تلك الوظائف من الوحدات الأخرى.

فمثلًا لو كان لدينا الملف `sayHi.js` وهو يُصدّر دالّةً من الدوالّ:

```
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

فيمكن لملف آخر استيراده واستعمالها:

```
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function... نوعها دالة
sayHi('John'); // Hello, John!
```

تتوجه تعليمة `import` للوِحدة `‎./sayHi.js` عبر المسار النسبي المُمرر لها. ويسند التابع `sayHi` للمتغيّر الذي يحمل نفس اسم التابع.

لنشغّل المثال في المتصفّح.

تدعم الوحدات كلمات مفتاحية ومزايا خاصة، لذلك علينا إخبار المتصفّح بأنّ هذا السكربت هو وِحدة ويجب أن يُعامل بهذا النحو، ذلك باستعمال الخاصية `‎<script type="module">‎`.

هكذا:

[codetabs src="say" height="140" current="index.html"]

يجلب المتصفّح الوحدة تلقائيًا ويقيم الشيفرة البرمجية بداخلها (ويستورد جميع الوحدات المتعلقة بها إن لزم الأمر)، وثمّ يشغلها.

```warn header="Modules work only via HTTP(s), not locally"
If you try to open a web-page locally, via `file://` protocol, you'll find that `import/export` directives don't work. Use a local web-server, such as [static-server](https://www.npmjs.com/package/static-server#getting-started) or use the "live server" capability of your editor, such as VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to test modules.
```

## ميزات الوحدات الأساسية

=======

ولكن ما الفرق بين الوحدات والسكربتات (الشيفرات) "العادية“ تلك؟

للوِحدات ميزات أساسية تعمل على محرّكات جافا سكريبت للمتصفّحات وللخوادم على حدّ سواء.

<<<<<<< HEAD
### الوضع الصارم الإفتراضي
=======
Modules always work in strict mode. E.g. assigning to an undeclared variable will give an error.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

تستخدم الوحدات الوضع الصارم تلقائيًا فمثلًا إسناد قيمة لمتحول غير معرّف سينتج خطأ.

```
<script type="module">
  a = 5; // خطأ
</script>
```

### النطاق على مستوى الوحدات

كلّ وِحدة لها نطاق عالي المستوى خاص بها. بتعبيرٍ آخر، لن يُنظر للمتغيّرات والدوالّ من الوحدات الأخرى، وإنما يكون نطاق المتغيرات محلي.

<<<<<<< HEAD
نرى في المثال أدناه أنّا حمّلنا نصّين برمجيين، ويحاول الملف `hello.js` استعمال المتغير `user` المصرّح عنه في الملف `user.js` ولا يقدر:

[codetabs src="scopes" height="140" current="index.html"]

على الوحدات تصدير `export` ما تريد للآخرين من خارجها رؤيته، واستيراد `import` ما تحتاج استعماله.

لذا علينا استيراد `user.js` و`hello.js` وأخذ المزايا المطلوبة منهما بدل الاعتماد على المتغيّرات العمومية.
=======
In the example below, two scripts are imported, and `hello.js` tries to use `user` variable declared in `user.js`. It fails, because it's a separate module (you'll see the error in the console):

[codetabs src="scopes" height="140" current="index.html"]

Modules should `export` what they want to be accessible from outside and `import` what they need.

- `user.js` should export the `user` variable.
- `hello.js` should import it from `user.js` module.

In other words, with modules we use import/export instead of relying on global variables.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

هذه النسخة الصحيحة من الشيفرة:

[codetabs src="scopes-working" height="140" current="hello.js"]

<<<<<<< HEAD
يوجد في المتصفح نطاق مستقل عالي المستوى. وهو موجود أيضًا للوحدات `‎<script type="module">‎`:
=======
In the browser, if we talk about HTML pages, independent top-level scope also exists for each `<script type="module">`.

Here are two scripts on the same page, both `type="module"`. They don't see each other's top-level variables:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```
<script type="module">
  // سيكون المتغير مرئي في مجال هذه الوحدة فقط
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // ‫خطأ: المتغير user غير معرّف
  */!*
</script>
```

<<<<<<< HEAD
ولو أردنا أن ننشئ متغير عام على مستوى النافذة يمكننا تعيينه صراحة للمتغيّر `window` ويمكننا الوصول إليه هكذا `window.user`. ولكن لابد من وجود سبب وجيهٍ لذلك.
=======
```smart
In the browser, we can make a variable window-level global by explicitly assigning it to a `window` property, e.g. `window.user = "John"`. 

Then all scripts will see it, both with `type="module"` and without it. 

That said, making such global variables is frowned upon. Please try to avoid them.
```
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

### تقييم شيفرة الوحدة لمرة واحدة فقط

<<<<<<< HEAD
لو استوردتَ نفس الوحدة في أكثر من مكان، فلا تُنفّذ شيفرتها إلّا مرة واحدة، وبعدها تُصدّر إلى من استوردها.

ولهذا توابع مهمّ معرفتها. لنرى بعض الأمثلة.
=======
If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.

The one-time evaluation has important consequences, that we should be aware of. 

Let's see a couple of examples.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

أولًا، لو كان لشيفرة الوحدة التي ستُنفّذ أيّ تأثيرات (مثل عرض رسالة أو ما شابه)، فاستيرادها أكثر من مرّة سيشغّل ذلك التأثير مرة واحدة، وهي أول مرة فقط:

```
// 📁 alert.js
alert("Module is evaluated!"); // ‫نُفّذت شيفرة الوحدة!
```

```
// نستورد نفس الوحدة من أكثر من ملف

// 📁 1.js
import `./alert.js`; // ‫نُفّذت شيفرة الوحدة!

// 📁 2.js
import `./alert.js`; // (لا نرى شيئًا هنا)
```

<<<<<<< HEAD
في الواقع، فشيفرات الوحدات عالية المستوى في بنية البرمجية لا تُستعمل إلّا لتمهيد بنى البيانات الداخلية وإنشائها. ولو أردنا شيئًا نُعيد استعماله، نُصدّر الوحدة.

الآن حان وقت مثال مستواه متقدّم أكثر.
=======
The second import shows nothing, because the module has already been evaluated.

There's a rule: top-level module code should be used for initialization, creation of module-specific internal data structures. If we need to make something callable multiple times - we should export it as a function, like we did with `sayHi` above.

Now, let's consider a deeper example.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

لنقل بأنّ هناك وحدة تُصدّر كائنًا:

```
// 📁 admin.js
export let admin = {
  name: "John"
};
```

لو استوردنا هذه الوحدة من أكثر من ملف، فلا تُنفّذ شيفرة الوحدة إلّا أول مرة، حينها يُصنع كائن المدير `admin` ويُمرّر إلى كلّ من استورد الوحدة.

وهكذا تستلم كلّ الشيفرات كائن مدير `admin` واحد فقط لا أكثر ولا أقل:

```
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
<<<<<<< HEAD
// ‫كِلا الملفين ‎1.js و ‎2.js سيستوردان نفس الكائن
// ‫التغييرات الّتي ستحدثُ في الملف ‎1.js ستكون مرئية في الملف ‎2.js
*/!*
```

ولنؤكد مجددًا -- تُنفذّ الوحدة لمرة واحدة فقط. وتُنشئ الوحدات المراد تصديرها وتُشارك بين المستوردين لذا فإن تغير شيء ما في كائن `admin` فسترى الوحدات الأخرى ذلك.

يتيح لنا هذا السلوك ”ضبط“ الوحدة عند أوّل استيراد لها، فنضبط خاصياتها المرة الأولى، ومتى ما استوُردت مرة أخرى تكون جاهزة.

فمثلًا قد تقدّم لنا وحدة `admin.js` بعض المزايا ولكن تطلب أن تأتي امتيازات الإدارة من خارج كائن `admin` إلى داخله:
=======
// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js
*/!*
```

As you can see, when `1.js` changes the `name` property in the imported `admin`, then `2.js` can see the new `admin.name`.

That's exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other importers will see that.

**Such behavior is actually very convenient, because it allows us to *configure* modules.**

In other words, a module can provide a generic functionality that needs a setup. E.g. authentication needs credentials. Then it can export a configuration object expecting the outer code to assign to it.

Here's the classical pattern:
1. A module exports some means of configuration, e.g. a configuration object.
2. On the first import we initialize it, write to its properties. The top-level application script may do that.
3. Further imports use the module.

For instance, the `admin.js` module may provide certain functionality (e.g. authentication), but expect the credentials to come into the `config` object from outside:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
```

<<<<<<< HEAD
نضبط في `init.js` (أوّل نص برمجي لتطبيقنا) المتغير `admin.name`. بعدها سيراه كلّ من أراد بما في ذلك الاستدعاءات من داخل وحدة `admin.js` نفسها:
=======
Here, `admin.js` exports the `config` object (initially empty, but may have default properties too).

Then in `init.js`, the first script of our app, we import `config` from it and set `config.user`:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

<<<<<<< HEAD
ويمكن لوحدة أخرى استعمال `admin.name`:

```
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*
=======
...Now the module `admin.js` is configured. 

Further importers can call it, and it correctly shows the current user:

```js
// 📁 another.js
import {sayHi} from './admin.js';
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

sayHi(); // Ready to serve, *!*Pete*/!*!
```


### import.meta

يحتوي الكائن `import.meta` على معلومات الوحدة الحالية.

<<<<<<< HEAD
ويعتمد محتواها على البيئة الحالية، ففي المتصفّحات يحتوي على عنوان النص البرمجي أو عنوان صفحة الوِب الحالية لو كان داخل HTML:
=======
Its content depends on the environment. In the browser, it contains the URL of the script, or a current webpage URL if inside HTML:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```
html run height=0
<script type="module">
<<<<<<< HEAD
  alert(import.meta.url); // ‫عنوان URL للسكربت (عنوان URL لصفحة HTML للسكربت الضمني)
=======
  alert(import.meta.url); // script URL
  // for an inline script - the URL of the current HTML-page
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
</script>
```

### `this` في الوحدات ليست معرّفة

قد تكون هذه الميزة صغيرة، ولكنّا سنذكرها ليكتمل هذا الفصل.

في الوحدات، قيمة `this` عالية المستوى غير معرّفة.

وازن بينها وبين السكربتات غير المعتمدة على الوحدات، إذ ستكون `this` كائنًا عامًا:

```
html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // غير معرّف
</script>
```

## الميزات الخاصة بالمتصفّحات

كما أن هناك عدّة فروق تخصّ المتصفحات السكربتات (المعتمدة على الوحدات) بالنوع `type="module"‎` موازنةً بتلك العادية.

<<<<<<< HEAD
لو كنت تقرأ هذا الفصل لأول مرة، أو لم تكن تستعمل المحرّك في المتصفّح فيمكنك تخطّي هذا القسم.
=======
You may want to skip this section for now if you're reading for the first time, or if you don't use JavaScript in a browser.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

### سكربتات الوحدات مؤجلة

دائمًا ما تكون سكربتات الوحدات مؤجلة، ومشابهة لتأثير السِمة `defer` (الموضحة في هذا [المقال](https://javascript.info/script-async-defer))، لكل من السكربتات المضمّنة والخارجية.

أي وبعبارة أخرى:

<<<<<<< HEAD
- تنزيل السكربتات المعتمدة على الوحدات الخارجية `‎<script type="module" src=‎"...">‎` لا تُوقف معالجة HTML فتُحمّل بالتوازي مع الموارد الأخرى.
- تنتظر السكربتات المعتمدة على الوحدات حتّى يجهز مستند HTML تمامًا (حتّى لو كانت صغيرة وحُمّلت بنحوٍ أسرع من HTML) وتُشغّل عندها.
- تحافظ على الترتيب النسبي للسكربتات: فالسكربت ذو الترتيب الأول ينفذّ أولًا.
=======
As a side effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

ويسبّب هذا بأن ”ترى“ السكربتات المعتمدة على الوحدات صفحة HTML المحمّلة كاملة بما فيه عناصر الشجرة أسفلها.

مثال:

```
<script type="module">
*!*

  alert(typeof button); // ‫كائن (object): يستطيع السكربت رؤية العناصر أدناه
*/!*
  // بما أن الوحدات مؤجلة. سيُشغل السكربت بعد تحميل كامل الصفحة
</script>

Compare to regular script below:

<script>
*!*
  alert(typeof button); // button is undefined, the script can't see elements below
*/!*
  // السكربت العادي سيُشغل مباشرة قبل أن يُستكمل تحميل الصفحة
</script>

<button id="button">Button</button>
```

لاحِظ كيف أنّ النص البرمجي الثاني يُشغّل فعليًا قبل الأول! لذا سنرى أولًا `undefined` وبعدها `object`.
وذلك بسبب كون عملية تشغيل الوحدات مُؤجلة لذلك سننتظر لاكتمال معالجة المستند. نلاحظ أن السكربت العادي سيُشغلّ مباشرة بدون تأجيل ولذا سنرى نتائجه أولًا.

علينا أن نحذر حين نستعمل الوحدات إذ أنّ صفحة HTML تظهر بينما الوحدات تُحمّل، وبعدها تعمل الوحدات. بهذا يمكن أن يرى المستخدم أجزاءً من الصفحة قبل أن يجهز تطبيق جافا سكريبت، ويرى بأنّ بعض الوظائف في الموقع لا تعمل بعد. علينا هنا وضع ”مؤشّرات تحميل“ أو التثبّت من أنّ الزائر لن يتشتّت بهذا الأمر.

### خاصية Async على السكربتات المضمّنة

بالنسبة للسكربتات غير المعتمدة على الوحدات فإن خاصية `async` (اختصارًا لكلمة Asynchronous أي غير المتزامن) تعمل على السكربتات الخارجية فقط. وتُشغل السكربتات غير المتزامنة مباشرة عندما تكون جاهزة،بشكل مستقل عن السكربتات الأخرى أو عن مستند HTML.

تعمل السكربتات المعتمدة على الوحدات طبيعيًا في السكربتات المضمّنة.

فمثلًا يحتوي السكربت المُضمن أدناه على الخاصية `async`، لذلك سيُشغّل مباشرة ولن ينتظر أي شيء.

وهو ينفذ عملية الاستيراد (اجلب الملف `./analytics.js`) وشغله عندما يصبح جاهزًا، حتى وإن لم ينتهِ مستند HTML بعد. أو السكربتات الأُخرى لا تزال معلّقة.

وهذا جيد للتوابع المستقلة مثل العدادات والإعلانات ومستمع الأحداث على مستوى المستند.

في المثال أدناه، جُلبت جميع التبعيات (من ضمنها analytics.js).‫ ومن ثمّ شُغّل السكربت ولم ينتظر حتى اكتمال تحميل المستند أو السكربتات الأخرى.

```
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### السكربتات الخارجية

تختلف السكربتات الخارجية التي تحتوي على السمة `type="module"‎` في جانبين:

1. تنفذ السكربتات الخارجية التي لها نفس القيمة للخاصية `src` مرة واحدة فقط.
   فهنا مثلًا سيُجلب السكربت `my.js` وينفذ مرة واحدة فقط.

   ```
   <script type="module" src="my.js"></script>
   <script type="module" src="my.js"></script>
   ```

2. تتطلب السكربتات الخارجية التي تجلب من مصدر مستقل (موقع مختلف عن الأساسي) ترويسات [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) والموضحة في هذا [المقال](https://javascript.info/fetch-crossorigin). بتعبير آخر إن جُلِبَ سكربت يعتمد على الوحدات من مصدر معين فيجب على الخادم البعيد أن يدعم ترويسات السماح بالجلب `Access-Control-Allow-Origin`.
   يجب أن يدعم المصدر المستقل `Access-Control-Allow-Origin` (في المثال أدناه المصدر المستقل هو another-site.com) وإلا فلن يعمل السكربت.
   ```
   <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
   ```

وذلك سيضمن لنا مستوى أمان أفضل إفتراضيًا.

### لا يُسمح بالوحدات المجردة

في المتصفح، يجب أن تحصل تعليمة `import` على عنوان URL نسبي أو مطلق. وتسمى الوحدات التي بدون أي مسار بالوحدات المجردة. وهي ممنوع في تعليمة `import`.

لنأخذ مثالًا يوضح الأمر، هذا `import` غير صالح:

```
import {sayHi} from 'sayHi'; // خطأ وِحدة مجردة
// ‫يجب أن تمتلك الوحدة مسارًا مثل: '‎./sayHi.js' أو مهما يكُ موقع هذه الوحدة
```

تسمح بعض البيئات، مثل Node.js أو أدوات تجميع الوحدات باستخدام الوحدات المجردة، دون أي مسار، حيث أن لديها طرقها الخاصة للعثور على الوحدات والخطافات لضبطها. ولكن حتى الآن لا تدعم المتصفحات الوحدات المجردة.

### التوافقية باستخدام "nomodule"

لا تفهم المتصفحات القديمة طريقة استخدام الوحدات في الصفحات `type ="module"‎`.بل وإنها تتجاهل السكربت ذو النوعٍ غير المعروف. بالنسبة لهم، من الممكن تقديم نسخة مخصصة لهم باستخدام السمة `nomodule`:

```
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this"):// ‫المتصفحات الحديثة تعرف type=module  و nomodule لذا لن تنفذ الأخير
  alert("Old browsers ignore script with unknown type=module, but execute this.");// ‫المتصفحات القديمة ستتجاهل الوسم ذو السِمة type=module ولكن ستنفذ وسم nomodule
</script>
```

## أدوات البناء

في الحياة الواقعية، نادرًا ما تستخدم وحدات المتصفح في شكلها "الخام". بل عادةّ نجمعها مع أداة خاصة مثل [Webpack] (https://webpack.js.org/) وننشرها على خادم النشر.

إحدى مزايا استخدام المجمعات - فهي تمنح المزيد من التحكم في كيفية التعامل مع الوحدات، مما يسمح بالوحدات المجردة بل وأكثر من ذلك بكثير، مثل وحدات HTML/CSS.

تؤدي أدوات البناء بعض الوظائف منها:

1. جلب الوحدة الرئيسية `main`، وهي الوحدة المراد وضعها في وسم `‎<script type ="module">‎` في ملف HTML.
2. تحليل التبعيات: تحليل تعليمات الاستيراد الخاصة بالملف الرئيسي وثم للملفات المستوردة أيضًا وما إلى ذلك.
3. إنشاء ملفًا واحدًا يحتوي على جميع الوحدات (مع إمكانية تقسيمهُ لملفات متعددة)، مع استبدال تعليمة `import` الأصلية بتوابع الحزم لكي يعمل السكربت. كما تدعم أنواع وحدات "خاصة" مثل وحدات HTML/CSS.
4. يمكننا تطبيق عمليات تحويل وتحسينات أخرى في هذه العملية مثل:
   - إزالة الشيفرات الّتي يتعذر الوصول إليها.
   - إزالة تعليمات التصدير غير المستخدمة (مشابهة لعملية هز الأشجار وسقوط الأوراق اليابسة).
   - إزالة العبارات الخاصة بمرحلة التطوير مثل `console` و`debugger`.
   - تحويل شيفرة جافا سكريبت الحديثة إلى شيفرة أقدم باستخدام وظائف مماثلة للحزمة [Babel] (https://babeljs.io/).
   - تصغير الملف الناتج (إزالة المسافات، واستبدال المتغيرات بأسماء أقصر، وما إلى ذلك).

عند استخدامنا لأدوات التجميع سيُجمع السكربت ليصبح في ملف واحد (أو ملفات قليلة) ، تُستبدل تعليمات `import/export` بداخل السكربتات بتوابع المُجمّع الخاصة. لذلك لا يحتوي السكربت "المُجَمّع" الناتج على أي تعليمات `import/export`، ولا يتطلب السِمة `type="module"‎`، ويمكننا وضعه في سكربت عادي:
في المثال أدناه لنفترض أننا جمعّنا الشيفرات في ملف bundle.js باستخدام مجمع حزم مثل: Webpack.

```
<script src="bundle.js"></script>
```

ومع ذلك يمكننا استخدام الوحدات الأصلية (في شكلها الخام). لذلك لن نستخدم هنا أداة Webpack: يمكنك التعرف عليها وضبطها لاحقًا.

## خلاصة

لنلخص المفاهيم الأساسية:

1. الوحدة هي مجرد ملف. لجعل تعليمتي `import/export` تعملان، ستحتاج المتصفحات إلى وضع السِمة التالية `‎<script type ="module">‎`. تحتوي الوحدات على عدة مُميزات:
   - مؤجلة إفتراضيًا.
   - تعمل الخاصية Async على السكربتات المضمّنة.
   - لتحميل السكربتات الخارجية من مصدر مستقل، يجب استخدام طريقة (المَنفذ / البروتوكول / المجال)، وسنحتاج لترويسات CORS أيضًا.
   - ستُتجاهل السكربتات الخارجية المكررة.
2. لكل وِحدة من الوحدات نطاق خاص بها، وتتبادلُ الوظائف فيما بينها من خلال استيراد وتصدير الوحدات `import/export`.
3. تستخدم الوحدات الوضع الصارم دومًا `use strict`.
4. تُنفذ شيفرة الوحدة لمرة واحدة فقط. وتُصدر إلى من استوردها لمرة واحدة أيضًا، ومن ثمّ تُشارك بين المستوردين.

عندما نستخدم الوحدات، تنفذ كل وِحدة وظيفة معينة وتُصدرها. ونستخدم تعليمة `import` لاستيرادها مباشرة عند الحاجة. إذ يُحمل المتصفح السكربت ويقيّمه تلقائيًا.

وبالنسبة لوضع النشر، غالبًا ما يستخدم الناس مُحزّم الوحدات مثل [Webpack] (https://webpack.js.org) لتجميع الوحدات معًا لرفع الأداء ولأسباب أخرى.

سنرى في الفصل التالي مزيدًا من الأمثلة عن الوحدات، وكيفية تصديرها واستيرادها.

ترجمة -وبتصرف- للفصل [Modules, introduction](https://javascript.info/modules-intro) من كتاب [The JavaScript language](https://javascript.info/js)
