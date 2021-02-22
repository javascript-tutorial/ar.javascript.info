# أحجام النوافذ والتمرير

كيف نجد عرض وارتفاع نافذة المتصفح؟ كيف نحصل على العرض والارتفاع الكاملين للوثيقة ، بما في ذلك الجزء المسحوب؟ كيف ننتقل الصفحة باستخدام جافا سكريبت؟

<<<<<<< HEAD
بالنسبة لمعظم هذه الطلبات ، يمكننا استخدام عنصر المستند الجذر `document.documentElement` ، الذي يتوافق مع العلامة` <html> `. ولكن هناك طرق وخصائص إضافية مهمة بما يكفي للنظر فيها.
=======
For this type of information, we can use the root document element `document.documentElement`, that corresponds to the `<html>` tag. But there are additional methods and peculiarities to consider.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

## عرض / ارتفاع النافذة

<<<<<<< HEAD
للحصول على عرض النافذة وارتفاعها ، يمكننا استخدام `clientWidth / clientHeight` من` document.documentElement`:
=======
To get window width and height, we can use the `clientWidth/clientHeight` of `document.documentElement`:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

![](document-client-width-height.svg)

```online
على سبيل المثال ، يعرض هذا الزر ارتفاع النافذة:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

<<<<<<< HEAD
````warn header="ليس `window.innerWidth / Height`"
كما تدعم المستعرضات الخصائص `window.innerWidth / innerHeight`. يبدون مثل ما نريد. فلماذا لا تستخدمها بدلاً من ذلك؟

إذا كان هناك شريط تمرير ، ويحتل بعض المساحة ، يوفر `clientWidth / clientHeight` العرض / الارتفاع بدونه (اطرحه). بمعنى آخر ، تقوم بإرجاع عرض / ارتفاع الجزء المرئي من المستند المتاح للمحتوى.

... و `window.innerWidth / innerHeight` تتضمن شريط التمرير.
=======
````warn header="Not `window.innerWidth/innerHeight`"
Browsers also support properties like `window.innerWidth/innerHeight`. They look like what we want, so why not to use them instead?

If there exists a scrollbar, and it occupies some space, `clientWidth/clientHeight` provide the width/height without it (subtract it). In other words, they return the width/height of the visible part of the document, available for the content.

`window.innerWidth/innerHeight` includes the scrollbar.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

إذا كان هناك شريط تمرير ، ويشغل بعض المساحة ، فإن هذين الخطين يعرضان قيمًا مختلفة:
```js run
alert( window.innerWidth ); // full window width
alert( document.documentElement.clientWidth ); // window width minus the scrollbar
```

<<<<<<< HEAD
في معظم الحالات ، نحتاج إلى عرض النافذة * المتوفرة *: لرسم شيء ما أو وضعه. هذا هو: داخل أشرطة التمرير إذا كان هناك أي. لذا يجب علينا استخدام `documentElement.clientHeight / Width`.
=======
In most cases, we need the *available* window width in order to draw or position something within scrollbars (if there are any), so we should use `documentElement.clientHeight/clientWidth`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
````

````warn header=" "DOCTYPE` مهم"
يرجى ملاحظة: قد تعمل خصائص الهندسة عالية المستوى بشكل مختلف قليلاً عندما لا يكون هناك <! DOCTYPE HTML> `في HTML. الأشياء الغريبة ممكنة.

في HTML الحديثة يجب أن نكتب دائمًا "DOCTYPE".
````

## عرض / ارتفاع الوثيقة

<<<<<<< HEAD
نظريًا ، نظرًا لأن عنصر المستند الجذر هو `document.documentElement` ، ويشتمل على كل المحتوى ، يمكننا قياس حجم المستند بالكامل على أنه` document.documentElement.scrollWidth / ScrollHeight`.

ولكن في هذا العنصر ، بالنسبة للصفحة بأكملها ، لا تعمل هذه الخصائص على النحو المنشود. في Chrome / Safari / Opera إذا لم يكن هناك تمرير ، فقد يكون `documentElement.scrollHeight` أقل من` documentElement.clientHeight`! يبدو هراء ، غريب ، أليس كذلك؟
=======
Theoretically, as the root document element is `document.documentElement`, and it encloses all the content, we could measure the document's full size as `document.documentElement.scrollWidth/scrollHeight`.

But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera, if there's no scroll, then `documentElement.scrollHeight` may be even less than `documentElement.clientHeight`! Weird, right?
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

للحصول على ارتفاع المستند بشكل موثوق ، يجب أن نأخذ الحد الأقصى من هذه الخصائص:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

لما ذلك؟ من الأفضل ألا تسأل. هذه التناقضات تأتي من العصور القديمة ، وليس منطق "ذكي".

## احصل على التمرير الحالي [# page-roll]

<<<<<<< HEAD
عناصر DOM لها حالة التمرير الحالية في `elem.scrollLeft / rollTop`.

بالنسبة إلى تمرير المستند ، يعمل المستند document.documentElement.scrollLeft / Top` في معظم المتصفحات ، باستثناء المتصفحات القديمة التي تستند إلى WebKit ، مثل Safari (الخطأ [5991] (https://bugs.webkit.org/show_bug.cgi؟id=5991) ) ، حيث يجب أن نستخدم `document.body` بدلاً من` document.documentElement`.

لحسن الحظ ، ليس علينا أن نتذكر هذه الخصائص على الإطلاق ، لأن التمرير متاح في الخصائص الخاصة `window.pageXOffset/pageYOffset`:
=======
DOM elements have their current scroll state in their `scrollLeft/scrollTop` properties.

For document scroll, `document.documentElement.scrollLeft/scrollTop` works in most browsers, except older WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use `document.body` instead of `document.documentElement`.

Luckily, we don't have to remember these peculiarities at all, because the scroll is available in the special properties, `window.pageXOffset/pageYOffset`:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```js run
alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
```

هذه الخصائص للقراءة فقط.

## التمرير: التمرير إلى التمرير التمرير التمرير العرضي [# window-تمرير]

<<<<<<< HEAD
احذر
لتمرير الصفحة من JavaScript ، يجب بناء DOM بالكامل.

على سبيل المثال ، إذا حاولنا تمرير الصفحة من البرنامج النصي في `<head>` ، فلن تعمل.
``
=======
```warn
To scroll the page with JavaScript, its DOM must be fully built.

For instance, if we try to scroll the page with a script in `<head>`, it won't work.
```
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

يمكن تمرير العناصر العادية عن طريق تغيير `التمرير / التمرير لليسار`.

<<<<<<< HEAD
يمكننا فعل الشيء نفسه للصفحة باستخدام `document.documentElement.scrollTop / Left` (باستثناء Safari ، حيث يجب استخدام` document.body.scrollTop / Left` بدلاً من ذلك).

بدلاً من ذلك ، هناك حل أبسط وعالمي: طرق خاصة [window.scrollBy (x، y)] (mdn: api / Window / rollBy) و [window.scrollTo (pageX، pageY)] (mdn: api / Window / rollTo) .
=======
We can do the same for the page using `document.documentElement.scrollTop/scrollLeft` (except Safari, where `document.body.scrollTop/Left` should be used instead).

Alternatively, there's a simpler, universal solution: special methods [window.scrollBy(x,y)](mdn:api/Window/scrollBy) and [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

- طريقة `التمرير (x، y) 'تقوم بتمرير الصفحة * بالنسبة إلى موقعها الحالي *. على سبيل المثال ، يؤدي `التمرير (0،10)` إلى تمرير الصفحة `10 بكسل` لأسفل.

    `` online
    يوضح الزر أدناه هذا:

    <button onclick = "window.scrollBy (0،10)"> window.scrollBy (0،10) </button>
    ``
- طريقة `التمرير (pageX ، pageY)` تقوم بتمرير الصفحة * إلى إحداثيات مطلقة * ، بحيث يكون للزاوية العلوية اليسرى للجزء المرئي إحداثيات `((pageX ، pageY)` بالنسبة إلى الزاوية العلوية اليسرى للمستند. الأمر أشبه بإعداد `التمرير الأيسر / التمرير العلوي`.

    للتمرير إلى البداية ، يمكننا استخدام `التمرير (0،0)`.
    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

تعمل هذه الطرق لجميع المتصفحات بنفس الطريقة.

## scrollIntoView

<<<<<<< HEAD
للاستكمال ، دعنا نغطي طريقة أخرى: [elem.scrollIntoView (top)] (mdn: api / Element / rollIntoView).
=======
For completeness, let's cover one more method: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

يؤدي استدعاء `elem.scrollIntoView (أعلى)` إلى تمرير الصفحة لإظهار `elem`. لها حجة واحدة:

<<<<<<< HEAD
- إذا كان `top = true` (هذا هو الافتراضي) ، فسيتم تمرير الصفحة لإظهار` elem` في أعلى النافذة. يتم محاذاة الحافة العلوية للعنصر مع أعلى النافذة.
- إذا كان `top = false` ، فتمرر الصفحة لتظهر` elem` في الأسفل. يتم محاذاة الحافة السفلية للعنصر مع أسفل النافذة.

```online
يمرر الزر أدناه الصفحة لإظهار نفسها في أعلى النافذة:
=======
- If `top=true` (that's the default), then the page will be scrolled to make `elem` appear on the top of the window. The upper edge of the element will be aligned with the window top.
- If `top=false`, then the page scrolls to make `elem` appear at the bottom. The bottom edge of the element will be aligned with the window bottom.

```online
The button below scrolls the page to position itself at the window top:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

<button onclick = "this.scrollIntoView ()"> this.scrollIntoView () </button>

<<<<<<< HEAD
وهذا الزر يقوم بتمرير الصفحة لإظهارها في الأسفل:
=======
And this button scrolls the page to position itself at the bottom:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## منع التمرير

<<<<<<< HEAD
نحتاج أحيانًا إلى جعل المستند "غير قابل للتمرير". على سبيل المثال ، عندما نحتاج إلى تغطيتها برسالة كبيرة تتطلب اهتمامًا فوريًا ، ونريد من الزائر أن يتفاعل مع هذه الرسالة ، وليس مع المستند.

لجعل المستند غير قابل للتمرير ، يكفي تعيين `document.body.style.overflow =" hidden "`. سيتم تجميد الصفحة في التمرير الحالي.
=======
Sometimes we need to make the document "unscrollable". For instance, when we need to cover the page with a large message requiring immediate attention, and we want the visitor to interact with that message, not with the document.

To make the document unscrollable, it's enough to set `document.body.style.overflow = "hidden"`. The page will "freeze" at its current scroll position.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```online
جربها:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

<<<<<<< HEAD
يجمد الزر الأول التمرير ، ويستأنفه الزر الثاني.
``

يمكننا استخدام نفس التقنية "لتجميد" التمرير للعناصر الأخرى ، وليس فقط لـ `المستند.

عيب الطريقة هو اختفاء شريط التمرير. إذا كانت تحتل بعض المساحة ، فإن هذه المساحة الآن خالية ، ويزداد المحتوى لملئها.

يبدو هذا غريبًا بعض الشيء ، ولكن يمكن التعامل معه إذا قارنا `ClientWidth` قبل التجميد وبعده ، وإذا زاد (اختفى شريط التمرير) ، فأضف` padding` إلى `document.body` بدلاً من شريط التمرير ، إلى حافظ على عرض المحتوى كما هو.
=======
The first button freezes the scroll, while the second one releases it.
```

We can use the same technique to freeze the scroll for other elements, not just for `document.body`.

The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free and the content "jumps" to fill it.

That looks a bit odd, but can be worked around if we compare `clientWidth` before and after the freeze. If it increased (the scrollbar disappeared), then add `padding` to `document.body` in place of the scrollbar to keep the content width the same.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

## الملخص

الهندسة:

<<<<<<< HEAD
- عرض / ارتفاع الجزء المرئي من المستند (عرض / ارتفاع منطقة المحتوى): `document.documentElement.clientWidth / Height`
- عرض / ارتفاع الوثيقة بأكملها ، مع الجزء الممرر:
=======
- Width/height of the visible part of the document (content area width/height): `document.documentElement.clientWidth/clientHeight`
- Width/height of the whole document, with the scrolled out part:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

التمرير:

- قراءة التمرير الحالي: `window.pageYOffset / pageXOffset`.
- تغيير التمرير الحالي:

    - `window.scrollTo (pageX ، pageY)` - الإحداثيات المطلقة ،
     - `window.scrollBy (x، y)` - انتقل نسبيًا إلى المكان الحالي ،
     - `elem.scrollIntoView (أعلى)` - قم بالتمرير لجعل `elem` مرئيًا (محاذاة مع الجزء العلوي / السفلي من النافذة).
