# مدخل إلى JavaScript 
دعونا نتعرف معاً ماهي JavaScript وماذا يمكننا أن نعمل بها، وما التقنيات التي تعمل معها.
Let's see what's so special about JavaScript, what we can achieve with it, and which other technologies play well with it.

## ماهي JavaScript?

*JavaScript* تم إنشاء الجافاسكريبت في البداية من أجل أن "تجعل صفحات ا الويب حية ".

البرامج بهذه اللغة يطلق عليها * scripts*. (البرامج النصية).
ويمكن كتابتها بشكل مباشر في صفحات الويب داخل ال HTML ويتم تشغيلها تلقائياً أثناء تشغيل الصفحة.

ويتم توفير البرامج النصية وتشغيلها كنص عادي. إذ أنها لاتحتاج إلى إعداد خاص بها، أو حتى عمل إعادة تجميع من أجل تشغيلها.




وفي هذا الجانب, JavaScript  تختلف اختلافاً كبيراً عن لغة أخرى تسمى [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="لماذا تسمى  <u>Java</u>Script?"
عندما تم إنشاء الجافاسكريبت، ظهرت باسم آخر وهو "LiveScript".لكن في هذا الوقت كانت الجافا مشهورة, لذلك فقط قرروا أن يتم تسمية اللغة الجديدة باسم ليكون الأخ الأصغر من لغة الجافا لكي يساعده في بداية الظهور.

لكن ومع تطوير اللغة الجديدة، أصبحت الجافاسكريبت مستقلة بذاتها وتم تسميتها [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), والآن ليس لها أي علاقة بالجافا على الإطلاق.
```

واليوم أصبحت الجافاسكريبت لايتم تشغيلها فقط على المتصفح، بل إنها تعمل على الخادم، في الحقيقة أنها تعمل على أي جهاز يمتلك  , برامج خاصة تسمى [the JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

يحتوي المتصفح على محرك مضمن يسمى "JavaScript virtual machine".

المحركات مختلفة لها أسماء رمزية مختلفة مثال: 
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- في متصفح جوجل كروم وأوبرا.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- في متصفح فايرفوكس.
- ...وهناك أسماء رمزية أخرى مثل"Trident" و "Chakra" لإصدارات مختلفة من متصفح انترنت اكسبلولر, "ChakraCore" لمتصفح ميكروسوفت إيدج, "Nitro" و "SquirrelFish" لمتصفح سفاري, وخلافة.

The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome and Opera.

```smart header="How do engines work?"

Engines are complicated. But the basics are easy.

1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to the machine language.
3. And then the machine code runs, pretty fast.

The engine applies optimizations at each step of the process. It even watches the compiled script as it runs, analyzes the data that flows through it, and further optimizes the machine code based on that knowledge.
```

## What can in-browser JavaScript do?

Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or CPU, because it was initially created for browsers which do not require it.

JavaScript's capabilities greatly depend on the environment it's running in. For instance, [Node.js](https://wikipedia.org/wiki/Node.js) supports functions that allow JavaScript to read/write arbitrary files, perform network requests, etc.

In-browser JavaScript can do everything related to webpage manipulation, interaction with the user, and the webserver.

For instance, in-browser JavaScript is able to:

- Add new HTML to the page, change the existing content, modify styles.
- React to user actions, run on mouse clicks, pointer movements, key presses.
- Send requests over the network to remote servers, download and upload files (so-called [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) and [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) technologies).
- Get and set cookies, ask questions to the visitor, show messages.
- Remember the data on the client-side ("local storage").

## What CAN'T in-browser JavaScript do?

JavaScript's abilities in the browser are limited for the sake of the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.

Examples of such restrictions include:

- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS functions.

    Modern browsers allow it to work with files, but the access is limited and only provided if the user does certain actions, like "dropping" a file into a browser window or selecting it via an `<input>` tag.

    There are ways to interact with camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and contain a special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com` and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limits do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugin/extensions which may ask for extended permissions.

## What makes JavaScript unique?

There are at least *three* great things about JavaScript:

```compare
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Support by all major browsers and enabled by default.
```
JavaScript is the only browser technology that combines these three things.

That's what makes JavaScript unique. That's why it's the most widespread tool for creating browser interfaces.

That said, JavaScript also allows to create servers, mobile applications, etc.

## Languages "over" JavaScript

The syntax of JavaScript does not suit everyone's needs. Different people want different features.

That's to be expected, because projects and requirements are different for everyone.

So recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.

Modern tools make the transpilation very fast and transparent, actually allowing developers to code in another language and auto-converting it "under the hood".

Examples of such languages:

- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.

There are more. Of course, even if we use one of transpiled languages, we should also know JavaScript to really understand what we're doing.

## ملخص

- JavaScript تم إنشاؤها في البداية من أجل أن تكون لغة تستخدم في المتصفح فقط، إلا أنها تستخدم الآن في العديد من البيئات الأخرى. 
- اليوم,  استطاعت لغة الجافاسكريبت أن تحصل على مكانة فريدة، حيث أنها تعد اللغة الأكثر استخداماً في المتصفحات، بالتكامل مع HTML/CSS.
- هناك العديد من اللغات التي يتم تحويلها إلى الجافا سكريبت وتوفر ميزات معينة. ونوصي بأن تٌلقي نظرة عليهم على الأقل لفترة وجيزة، لكن بعد أن تنتهي من دراسة الجافا سكريبت وإتقانها.
