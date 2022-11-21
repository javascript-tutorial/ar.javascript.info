# جمع القمامة (Garbage Collection)
تتم عملية ادارة الذاكرة في الJavaScript بطريقة تلقائية غير مرئية
نحن ننشئ لبقيم البسيطة, الكائنات , الدوال... و كل ذلك يستهلك من الذاكرة.

ما الذي سيحدث اذا لم نعد بحاجة لأحدهم ؟ كيف يكتشفها محرك ال JavaScript و يتخلص منها ؟ 


## قابلية الوصول

المفهوم الأساسي لعملية ادارة الذاكرة في ال JavaScript هو *قابلية الوصول.*

ببساطة, القيم التي يمكن الوصول اليها هي القيم التي يمكن الولوج اليها و استخدامها بشكل ما, و تخزينها في الذاكرة شئ حتمي.

1. هناك بعض القيم الأساسية التي يمكن الوصول اليها دائماو لا يمكن مسحها لأسباب واضحة.
    علي سبيل المثال:

    - المتغيرات المحلية و المعاملات للدالة التي يتم استخدامها
    - المتغيرات و معاملات الدوال في سلسلة متصلة من الاستدعاءات 
    - المتغيرات العامة
    - (هنالك المزيد, بعضهم داخلي)

    هذه القيم تسمي ب *الجذور (roots)*.

2. أي قيمة اخري يمكن اعتبارها قابلة للوصول اليها اذا ما كان يمكن الوصول اليها بالفعل  من جذر عن طريق مرجع(reference) او مجموعة من المراجع. 

    علي سبيل المثال, اذا كان هناك كائن مخزن في متغير محلي, و الكائن به خاصية مرجه لكائن اخر, يمكن اعتبار هذا الكائن انه يمكن الوصول اليه, و يمكن الوصول ايضا الي كل مراجع هذا الكائن, كما يتم شرحه في المثال التالي.


تحدث عملية خلفية في محرك ال JavaScript يسمي ب جامع القمامة [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) يتم خلالها مراقبة كل الكائنات و ازالة الكائنات التي لا يمكن الوصول اليها.

## مثـــال بـسـيـط

هذا هوا ابسط مثـال:

```js
// user له مرجع الي الكائن
let user = {
  name: "John"
};
```

![](memory-user-john.svg)

السهم هنا يمثل مرجع لكائن, المتغير العام `"user"` يرجع الي الكائن `{name: "John"}` (الذي سنطلق عليه جون اختصارا). 
خاصية `"name"` في كائن جون تخزن قيمة بسيطة لذا تم رسمها داخل الكائن.

اذا تم استخدام اسم المتغير `user` مرة اخري , هنا يتم فقدان مرجع الكائن: 

```js
user = null;
```

![](memory-user-john-lost.svg)

هنا لا يمكن الوصول الي كائن جون و بالتالي لا يمكن الدخول اليه لعدم وجود مرجع له, و هنا يأتي دور جامع القمامة للتخلص من بياناته و افراغ المساحة التخزينية.

## مرجعين

تصور الأن اننا نسخنا مرجع `user` الي  `admin`:

```js
// user له مرجع الي الكائن
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.svg)

Now if we do the same:
```js
user = null;
```

<<<<<<< HEAD
...في هذه الحالة ما زال بالامكان الوصول الي الكائن عن طريق المتغير العام  `admin`, لذا فهو مخزن بالذاكرة. اذا تم استخدام المتغير `admin` في مكان أخر ايضا هنا يمكن ازالة الكائن .
=======
...Then the object is still reachable via `admin` global variable, so it must stay in memory. If we overwrite `admin` too, then it can be removed.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

## الكائنات المترابطة

Now a more complex example. The family:
و الان الي مثال أكثر تعقيدا, كل العائلة:

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

الدالة `marry` "تزوج" كائنين عن طريق اعطاء كل منهم مرجع للأخر و ترجع كائن جديد يحتوي كليهما.

البناء الناتج في الذاكرة:

![](family.svg)

حتي الأن, كل الكائنات يمكن الوصول اليها.
و الأن فلنزيل اثنين من المراجع:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.svg)

الغاء مرجع واحد فقط من المرجعين لا يكفي ,ستظل امكانية الوصول الي الكائنين ممكنة.

و لكن اذا تم الغاء المرجعين, هنا يمكن ان نري ان جون لم يعد له اي مرجع:

![](family-no-father.svg)

Outgoing references do not matter. Only incoming ones can make an object reachable. So, John is now unreachable and will be removed from the memory with all its data that also became unaccessible.

بعد عملية جمع القمامة:


![](family-no-father-2.svg)

## الجزيرة التي لا يمكن الوصول اليها

هنالك امكانية ان تصبح جزيرة بأكملها من الكائنات المترابطة لا يمكن الوصول اليها و ان تمحي من الذاكرة.

الكائن هو كما بالمثال السابق, و بالتالي:


```js
family = null;
```

الصورة من داخل الذاكرة تصبح كالتالي: 


![](family-no-family.svg)

هذا المثال يشرح اهمية مفهوم قابلية الوصول

من الواضح ان جون و آن ما زالا متصلين ببعضهما بمراجع, لكن هذا غير كافي

كائن `"family"` السابق فقد اتصاله بالجذر, لا يوجد له اي مرجع الآن, لذا فالجزيرة باكملها لا يمكن الوصول اليها و تتم ازالتها.


## الخوارزميات الداخلية

The basic garbage collection algorithm is called "mark-and-sweep".
الخوارزمية الأساسية لجمع القمامة تسمي ب `"mark-and-sweep"`.

تحدث عملية جمع القمامة غالبا علي عدة خطوات:

- جامع القمامة يأخذ الجذر و يضع عليه علامة
- ثم يزور كل المراجع المرتبطة به و يضع علي كل منهم علامة
- ثم يزور كل كل الكائنات التي عليها علامة و يضع علامة علي كل مراجعهم, كل الكائنات التي تمت زيارتها يتم تذكرها حتي لا تتم زيارة نفس الكائن مرتين.
- ... و هكذا الي ان يتم وضع علامة علي كل المراجع بداية من الجذر
- كل الكائنات عدي التي تم وضع علامة عليها يتم ازالتها

كمثال, فلنفترض ان بناء الكائن لدينا كالتالي:


![](garbage-collection-1.svg)

يمكننا بكل بساطة ملاحظة جزيرة لا يمكن الوصول اليها في الجانب الأيمن. و الآن نستطيع ان نري كيف يطبق جامع القمامة ال `"mark-and-sweep"`.

أول خطوة هي وضع علامة عل الجذر:


![](garbage-collection-2.svg)

<<<<<<< HEAD
ثم وضع علامة علي كل المراجع المرتبطة به:

![](garbage-collection-3.svg)

...و مراجعم كذلك ان امكن 
=======
Then we follow their references and mark referenced objects:

![](garbage-collection-3.svg)

...And continue to follow further references, while possible:
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

![](garbage-collection-4.svg)

و الآن, كل الكائنات التي لم تتم زيارتها في هذه العملية تعتبر كائنات لا يمكن الوصول اليها و ستتم ازالتها:

![](garbage-collection-5.svg)


<<<<<<< HEAD
يمكننا تخيل العملية كصب دلو كبير من الطلاء من الجذر و الذي سيسري خلال كل المراجع و يضع علامة علي كل الكائنات التي يمكن الوصول اليها, و الكائنات التي لا يمكن الوصول اليها يتم ازالتها.

تلك هي المبادئ التي يعمل علي اساسها جامع القمامة. محرك ال JavaScript يطبق العديد من التحسينات لجعله يعمل بشكل اسرع و الا يؤثر علي الآداء.

بعض هذه التحسينات:

- **مجموعة الأجيال** -- -- يتم تقسيم الكائنات الي مجموعتين "الجديدة", "القديمة", الكثير من الكائنات يتم انشائها و تؤدي وظيفتها و تموت بسرعة, فيمكن التخلص منها بسرعة. اما الكائنات التي تعيش لفترة طوية تصبح "قديمة" و لا يتم التحقق منها و ازالتها بنفس الكثافة.

- **المجموعة المتزايدة** --في حالة وجود العديد من الكائنات, و حاولنا المرور ووضع علامة علي الكائن كله مرة واحدة, سيستهلك هذا بعضا من الوقت مما قد يؤدي الي بعض التأخير في عملية التنفيذ, لذلك يحاول جامع القمامة تقسيم نفسه الي اجزاء, كل الأجزاء يتم استخدامها وحدها واحدة تلو الأخري, مما قد يتطلب المزيد من الادارة لمتابعة التغييرات و تسجيلها, و لكن تأخيرات عديدة صغيرة افضل من تأخير واحد كبير.


- **مجموعة وقت الخمول** -- يحاول جامع القمامة ان يعمل في حالة ان وحدة المعالجة المركزية (CPU) في حالة خمول حتي لا يؤثر علي عملية التنفيذ.

هنالك العديد من التحسينات في خوارزميات جامع القمامة. و علي قدر ما اود ان اشرحها هنا,يجب ان نتوقف و ذلك لأن المحركات الختلفة تتبني طرق و حلول مختلفة و الأهم من ذلك ان الأشياء تتغير بتتطور المحركات, لذا ادرس أكثر "مقدما" فبدون الحاجة الحقيقية لمعرفتها فهي لا تستحق العناء الا ان كنت و بالطبع تمتلك الشغف للمعرفة فالروابط بالأسفل ستساعدك بالتأكيد.
=======
That's the concept of how garbage collection works. JavaScript engines apply many optimizations to make it run faster and not introduce any delays into the code execution.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

## الملخص

<<<<<<< HEAD
اهم النقاط لتعرفها:
=======
- **Generational collection** -- objects are split into two sets: "new ones" and "old ones". In typical code, many objects have a short life span: they appear, do their job and die fast, so it makes sense to track new objects and clear the memory from them if that's the case. Those that survive for long enough, become "old" and are examined less often.
- **Incremental collection** -- if there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine splits the whole set of existing objects into multiple parts. And then clear these parts one after another. There are many small garbage collections instead of a total one. That requires some extra bookkeeping between them to track changes, but we get many tiny delays instead of a big one.
- **Idle-time collection** -- the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

- جامع القمامة يعمل بشكل تلقائي, لا يمكن اجباره علي العمل او ايقافه
- الكائنات تظل في الذاكرة طالما كان بالمكان الوصول اليها
- كون الكائن له مرجع لا يعني بالضرورة ان يمكن الوصول اليه(من الجذر): قد تصبح مجموعة من الكائنات لا يمكن الوصول اليها 

المحركات الحديثة تطور خوارزميات حديثة لعملية جمع القمامة

كتاب `"The Garbage Collection Handbook: The Art of Automatic Memory Management"(R.Jones et al)` يجمع بعضها

<<<<<<< HEAD
اذا  كنت  علي علم بالمستويات العميقة من البرمجيات , فهنالك المزيد من المعلومات عن جـامع القمامة  `V8` في هذا المقال 
=======
- Garbage collection is performed automatically. We cannot force or prevent it.
- Objects are retained in memory while they are reachable.
- Being referenced is not the same as being reachable (from a root): a pack of interlinked objects can become unreachable as a whole, as we've seen in the example above.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0


 [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)

<<<<<<< HEAD
تنشر ايضا [V8 blog](https://v8.dev/)  مقالات حول تنظيم الذاكرة من آن الي أخر, بطبيعة الحال, لتعلم جامع القمامة يفضل ان تتهيأ عن طريق تعلم مكونات `V8` بشكل عام و قراءة مدونة
[Vyacheslav Egorov](http://mrale.ph) و الذي عمل كأحد مهندسي  `V8`. استطيع ان أقول `V8` تحديدا لأنه الأكثر تغطية عن طريق المقالات علي الانترنت.
و بالنسبة للمحركات الأخري, العديد من الطرق متشابهة, و لكن جامع القمامة يختلف في نقاط عديدة.

المعرفة المتعمقة للمحركات ضرورية في حين الحاجة الي تحسينات ذات مستوي متطور, فأن تخطط لمعرفتها بعد ان تصبح علي معرفة جيدة باللغة لهي بالتأكيد خطوة حكيمة.

=======
If you are familiar with low-level programming, more detailed information about V8's garbage collector is in the article [A tour of V8: Garbage Collection](https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

The [V8 blog](https://v8.dev/) also publishes articles about changes in memory management from time to time. Naturally, to learn more about garbage collection, you'd better prepare by learning about V8 internals in general and read the blog of [Vyacheslav Egorov](https://mrale.ph) who worked as one of the V8 engineers. I'm saying: "V8", because it is best covered by articles on the internet. For other engines, many approaches are similar, but garbage collection differs in many aspects.

In-depth knowledge of engines is good when you need low-level optimizations. It would be wise to plan that as the next step after you're familiar with the language.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0
