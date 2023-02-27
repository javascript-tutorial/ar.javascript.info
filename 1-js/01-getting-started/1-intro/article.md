# مقدّمة لجافا سكريبت

دعونا نرى ما يميز جافا سكريبت ، وما يمكننا تحقيقه بها ، وأي التقنيات الأخرى التي تعمل بشكل جيد معها.
## ماهي جافا سكريبت؟

*جافا سكريبت* تم إنشائها في بادئ الأمر "لجعل الصفحات الإلكترونية حية".

البرامج في هذه اللغة تسمّي *سكريبتات*. يمكن كتابتها مباشرة في الصفحات الإلكترونية HTML و  سوف يتم تفعيلها آليا عند تحميل الصفحة.

تتوفر السكريبتات وتنفذ كنص عادي. لا تحتاج الى تحضير خاص أو تحويل برمجي لتشتغل.

في هذا الجانب ، تختلف جافا سكريبت اختلافًا كبيرًا عن لغة أخرى تسمى [جافا](https://ar.wikipedia.org/wiki/جافا_(لغة_برمجة))

```smart header="لماذا تم تسميتها <u>جافا</u>سكريبت؟" 
عندما تم إنشاء جافا سكريبت، كانت تحمل اسما اخر  "لايفسكربت".

ولكن كان لجافا شعبية كبيره في ذلك الوقت، لذلك تقرّر أن وضع لغة جديدة كـ "الأخ الأصغر" لجافا سيساعد.
ولكن مع تطورها ، أصبحت جافا سكريبت لغة مستقلة تمامًا مع مواصفاتها الخاصة التي تسمى [إكماسكربت](http://ar.wikipedia.org/wiki/إي_سي_إم_ايه_سكريبت) ، والآن لا علاقة لها بجافا على الإطلاق.
``` 
اليوم، يمكن تنفيذ جافا سكريبت ليس فقط في المتصفح، ولكن أيضًا على الخادم، أو فعليًا على أي جهاز به برنامج خاص يسمى [محرك جافا سكريبت](https://ar.wikipedia.org/wiki/محرك_جافا_سكريبت).

يحتوي المتصفح على محرك مثبت يسمى أحيانًا "آلة جافا سكريبت الافتراضية".

المحركات المختلفة لها "أسماء رمزية" مختلفة. على سبيل المثال:

- [في 8](https://ar.wikipedia.org/wiki/كروم_في_8) -- في كروم و اوبرا.
- [سبايدر مونكي](https://ar.wikipedia.org/wiki/سبايدر_مونكي_(محرك_جافا_سكريبت)) -- في فايرفوكس.
- ...هناك أسماء رمزية أخرى مثل "تشاكرا" لاصدارات مختلفه من انترنت اكسبلورر، "تشاكرا كور" لمايكروسوفت إيدج،  "نيترو" و "سكيرلفيش" لسفاري، إلخ. 

من الجيد تذكر المصطلحات الواردة أعلاه لأنها مستخدمة في مقالات المطورين على الإنترنت. سنستخدمهم أيضًا. على سبيل المثال ، إذا كانت "الميزة إكس مدعومة بواسطة في8" ، فمن المحتمل أنها تعمل في كروم و أوبرا.

<<<<<<< HEAD
```smart header="كيف تعمل المحركات؟"

المحركات معقدة. ولكن الأساسيات بسيطه .
=======
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome, Opera and Edge.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...There are other codenames like "Chakra" for IE, "JavaScriptCore", "Nitro" and "SquirrelFish" for Safari, etc.

The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome, Opera and Edge.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

١. يقرأ ("يحلّل") المحرك (المثبت إذا كان متصفحًا) السكريبت.

٢. ثم يحول ("يترجم") السكربت الى لغة  الآلة.

<<<<<<< HEAD
٣. وبعد ذلك يتم تشغيل رموز الآلة، بسرعة كبيرة.
=======
1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to machine code.
3. And then the machine code runs, pretty fast.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

يطبق المحرك التحسينات في كل خطوة من العملية. حتى أنه يراقب النص المترجم أثناء تشغيله ، ويحلل البيانات التي تتدفق من خلاله ، ويزيد من تحسين رموز الآلة بناءً على تلك المعرفة.
```

<<<<<<< HEAD
## ما الذي يمكن أن يفعله جافا سكريبت في المتصفح؟
=======
## What can in-browser JavaScript do?

Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or the CPU, because it was initially created for browsers which do not require it.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

جافا سكريبت الحديثة هي لغة برمجة "آمنة". لا توفر وصولاً منخفض المستوى إلى الذاكرة أو وحدة المعالجة المركزية، لأنه تم إنشاؤها في البداية للمتصفحات التي لا تتطلب ذلك.

تعتمد قدرات جافا سكريبت بشكل كبير على البيئة التي تعمل بها. على سبيل المثال ، يدعم [نود.جي إس](https://ar.wikipedia.org/wiki/نود.جي_إس) 
الوظائف التي تسمح لجافا سكريبت بقراءة / كتابة ملفات عشوائية ، وتنفيذ طلبات الشبكة، إلخ.

يمكن لجافا سكريبت في المتصفح القيام بكل ما يتعلق بمعالجة صفحات الويب والتفاعل مع المستخدم وخادم الويب.

على سبيل المثال ، يمكن لجافا سكريبت في المتصفح:

- إضافة HTML جديد إلى الصفحة ، وتغيير المحتوى الحالي ، وتعديل التصاميم.
- الرد على تفاعلات المستخدم ، والتشغيل على نقرات الفأرة ، وحركات المؤشر ، والضغط على المفاتيح.
- إرسال الطلبات عبر الشبكة إلى الخوادم المنعزلة ،تنزيل الملفات وتحميلها (ما يسمى بـتقنيات [أجاكس](https://ar.wikipedia.org/wiki/أجاكس) و [كوميت](https://en.wikipedia.org/wiki/Comet_(programming)).
- الحصول على ملفات تعريف الارتباط وتعيينها ، وطرح الأسئلة على الزائر ، وإظهار الرسائل.
- تذكر البيانات الموجودة على جانب العميل ("التخزين المحلي").

<<<<<<< HEAD
## ما الذي لا يمكن لجافا سكريبت في المتصفح فعله؟
=======
JavaScript's abilities in the browser are limited to protect the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

إمكانيات جافا سكريبت في المتصفح محدودة من أجل سلامة المستخدم. الهدف هو منع صفحة ويب شريرة من الوصول إلى المعلومات الخاصة أو الإضرار ببيانات المستخدم.

من أمثلة هذه القيود:

- جافا سكريبت على صفحة الويب قد لا تقرأ/تكتب ملفات عشوائية على القرص الصلب أو تنسخها أو تنفذ برامج. ليس لديها وصول مباشر إلى وظائف نظام التشغيل.

<<<<<<< HEAD
    تسمح المتصفحات الحديثة له بالعمل مع الملفات ، ولكن الوصول محدود ويتم توفيره فقط إذا قام المستخدم بإجراءات معينة ، مثل "إسقاط" ملف في نافذة المتصفح أو تحديده عبر علامة `<input>`.

    هناك طرق للتفاعل مع الكاميرا / الميكروفون والأجهزة الأخرى ، لكنها تتطلب إذنًا صريحًا من المستخدم. لذلك قد لا تعمل الصفحة التي تم تمكين جافا سكريبت فيها بشكل خفي على تمكين كاميرا الويب ومراقبة المناطق المحيطة وإرسال المعلومات إلى [آن آس أيه](https://ar.wikipedia.org/wiki/وكالة_الأمن_القومي_الأمريكية)
-بشكل عام لا تعرف علامات التبويب / النوافذ المختلفة حول بعضها البعض. في بعض الأحيان يفعلون ذلك، على سبيل المثال عندما تستخدم إحدى النوافذ جافا سكريبت لفتح النافذة الأخرى. ولكن حتى في هذه الحالة ، قد لا تتمكن جافا سكريبت في إحدى الصفحات من الوصول إلى الصفحة الأخرى إذا كانت تأتي من مواقع مختلفة (من مجال أو بروتوكول أو منفذ مختلف).

    وهذا ما يسمى "سياسة المصدر الأوحد". للتغلب على ذلك ، يجب أن توافق *الصفحتان* على تبادل البيانات وتحتوي على كود جافا سكريبت خاص يتعامل معه. سنغطي ذلك في البرنامج التعليمي.
    
هذا القيد ، مرة أخرى ، لسلامة المستخدم. يجب ألا تتمكن صفحة من `http://anysite.com` فتحها المستخدم من الوصول إلى نافذة متصفح أخرى بعنوان `http://gmail.com` وسرقة المعلومات من هناك.
- يمكن لـ جافا سكريبت الاتصال بسهولة عبر الشبكة بالخادم الذي جاءت منه الصفحة الحالية. لكن قدرته على تلقي البيانات من المواقع / المجالات الأخرى معطلة. على الرغم من إمكانية ذلك، إلا أنه يتطلب موافقة صريحة (معبرًا عنها في رؤوس HTTP) عن بعد. مرة أخرى ، هذا قيد أمان.

![](limitations.svg)

لا توجد مثل هذه الحدود إذا تم استخدام جافا سكريبت خارج المتصفح ، على سبيل المثال على الخادم. تسمح المتصفحات الحديثة أيضًا الإضافات التي قد تطلب تصريحات ممتدة.
=======
    There are ways to interact with the camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other page if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and must contain special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com`, for example, and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limitations do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugins/extensions which may ask for extended permissions.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

## ما الذي يجعل جافا سكريبت فريدًا؟

هناك على الأقل *ثلاثة* أشياء رائعة حول جافا سكريبت:

```compare
<<<<<<< HEAD
+ تكامل تام مع HTML / CSS.
+ الأشياء البسيطة تتم ببساطة.
+ مدعوم من قبل جميع المتصفحات الرائدة وتمكينه تلقائيا.
=======
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Supported by all major browsers and enabled by default.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f
```

جافا سكريبت هي تقنية المتصفح الوحيدة التي تجمع بين هذه الأشياء الثلاثة.

هذا ما يجعل جافا سكريبت فريدًا. هذا هو السبب في أنها الأداة الأكثر انتشارًا لإنشاء واجهات المتصفح.

<<<<<<< HEAD
ومع ذلك، تسمح جافا سكريبت أيضًا بإنشاء خوادم وتطبيقات الجوال، إلخ.
=======
That said, JavaScript can be used to create servers, mobile applications, etc.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

## لغات "فوق" جافا سكريبت

لا تتناسب القواعد اللغوية لجافا سكريبت مع احتياجات الجميع. الناس المختلفون يريدون ميزات مختلفة.

هذا أمر متوقع ، لأن المشاريع والمتطلبات تختلف من شخص لآخر.

<<<<<<< HEAD
ظهرت في الآونة الأخيرة عدد كبير من اللغات الجديدة ، والتي *تم تحويلها* إلى جافا سكريبت قبل تشغيلها في المتصفح.
=======
So, recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

الأدوات الحديثة تجعل الترجمة سريعة وشفافة للغاية ، مما يسمح للمطورين في الواقع بالتشفير بلغة أخرى وتحويلها تلقائيًا "خلف الكواليس".

أمثلة على هذه اللغات:

<<<<<<< HEAD
- [كوفي سكريبت](http://coffeescript.org/) هو "سكر نحوي" لجافا سكريبت. إنه يقدم بناء جمل أقصر ، مما يسمح لنا بكتابة كود أكثر وضوحًا ودقة. عادة ،مطورو روبي يحبونها.
- [تايب سكريبت](http://www.typescriptlang.org/) يركز على إضافة "كتابة بيانات صارمة" لتبسيط تطوير ودعم الأنظمة المعقدة. تم تطويره بواسطة ميكروسوفت.
- [فلو](http://flow.org/) يضيف أيضًا كتابة البيانات ، ولكن بطريقة مختلفة. تم تطويره بواسطة فايسبوك.
- [دارت](https://www.dartlang.org/) هي لغة قائمة بذاتها لها محركها الخاص الذي يعمل في بيئات غير المتصفح (مثل تطبيقات الهاتف المحمول) ، ولكن يمكن أيضًا تحويلها إلى جافا سكريبت. من تطوير جوجل.
- [بريثون](https://brython.info/) هو محول من بايثون إلى جافا سكريبت و الذي يمكّن من كتابة التطبيقات بلغة بايثون بشكل كامل بدون جافا سكريبت.
- [كوتلن](https://kotlinlang.org/docs/reference/js-overview.html) هي لغة برمجة حديثة وموجزة وآمنة يمكنها استهداف المتصفح أو نود.

هناك أكثر. بالطبع ، حتى لو استخدمنا إحدى اللغات المترجمة ، يجب أن نعرف أيضًا جافا سكريبت لفهم ما نقوم به حقًا.
=======
- [CoffeeScript](https://coffeescript.org/) is "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](https://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](https://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.

There are more. Of course, even if we use one of these transpiled languages, we should also know JavaScript to really understand what we're doing.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

## ملخص

<<<<<<< HEAD
- تم إنشاء جافا سكريبت في البداية كلغة للمتصفح فقط ، ولكنها تُستخدم الآن في العديد من البيئات الأخرى أيضًا.
- تتمتع جافا سكريبت اليوم بمكانة فريدة باعتبارها لغة المتصفح الأكثر استخدامًا مع تكاملها التام مع HTML / CSS.
- هناك العديد من اللغات التي يتم "تحويلها" إلى جافا سكريبت وتوفر ميزات معينة. يوصى بإلقاء نظرة عليهم ، على الأقل لفترة وجيزة ، بعد إتقان جافا سكريبت.
=======
- JavaScript was initially created as a browser-only language, but it is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language, fully integrated with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f
