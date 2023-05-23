دعنا نفحص ما يحدث بالضبط داخل `makeArmy`، وسيصبح الحل واضحًا.

1. تُنشئ مصفوفة `‎shooters‎` فارغة:

   ````js
   let shooters = [];
   ```

2. يتم ملؤها بالدوال باستخدام `shooters.push(function)` في الحلقة.

   ```js no-beautify
   shooters = [
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
     function () {
       alert(i);
     },
   ];
   ```

3. يتم إرجاع المصفوفة من الدالة.

   ثم في وقت لاحق، سيتم استدعاء أي عضو، على سبيل المثال `army[5]()`، وسيتم الحصول على العنصر `army[5]` من المصفوفة (وهو دالة) ويتم استدعاؤها.

   السؤال هو لماذا تظهر لجميع الدوال نفس القيمة، وهي الرقم `10`؟

   يحدث ذلك لأنه لا يوجد متغير محلي بإسم `i` داخل دوال `shooter`. عند استدعاء مثل هذه الدالة، فإنه يتم أخذ `i` من البيئة اللغوية الخارجية.

   إذاً، ماهي قيمة `i`؟

   إذا نظرنا إلى الشفرة المصدرية:

   ```js
   function makeArmy() {
     ...
     let i = 0;
     while (i < 10) {
       let shooter = function() { // shooter function
         alert( i ); // should show its number
       };
       shooters.push(shooter); // add function to the array
       i++;
     }
     ...
   }
   ```

   يمكننا ملاحظة أن جميع دوال `shooter` يتم إنشاؤها في البيئة اللغوية الخارجية لدالة `makeArmy()`، لكن عندما يتم استدعاء `army[5]()`، فقدانتهت دالة `makeArmy` من عملها وأصبحت قيمة `i` هي الأخيرة وهي `10` (حيث يتوقف الحلقة عند `i=10`)، 
   
   وبالتالي، جميع دوال `shooter` ستحصل على نفس القيمة من البيئة اللغوية الخارجية وهي القيمة الأخيرة `i=10`.

   ![](lexenv-makearmy-empty.svg)

   كما ترون في الصورة أعلاه، في كل تكرار لكتلة `while {...}` يتم إنشاء بيئة لغوية جديدة. لحل هذه المشكلة، يمكننا نسخ قيمة `i` في متغير داخل كتلة `while {...}`، مثل هذا:

   ```js run
   function makeArmy() {
     let shooters = [];

     let i = 0;
     while (i < 10) {
       *!*
         let j = i;
       */!*
         let shooter = function() { // shooter function
           alert( *!*j*/!* ); // should show its number
         };
       shooters.push(shooter);
       i++;
     }

     return shooters;
   }

   let army = makeArmy();

   // الآن يعمل الكود بشكل صحيح
   army[0](); // 0
   army[5](); // 5
   ```

   هنا `let j = i` يعلن عن متغير "محلي للتكرار" `j` ويقوم بنسخ `i` فيه. القيم الأساسية تنسخ "بالقيمة"، لذلك نحصل فعليًا على نسخة مستقلة من `i` تنتمي إلى تكرار الحلقة الحالي.

   يعمل الدوال `shooter` بشكل صحيح، لأن قيمة `i` تعيش الآن قليلاً أقرب. ليس في بيئة اللغة الخارجية لـ `makeArmy()`، ولكنفي البيئة اللغوية الخارجية التي تتوافق مع التكرار الحالي:

   ![](lexenv-makearmy-while-fixed.svg)

   كما يمكن تجنب مشكلة من هذا النوع إذا استخدمنا `for` في البداية، مثل هذا:

   ```js run demo
   function makeArmy() {

     let shooters = [];

   *!*
     for(let i = 0; i < 10; i++) {
   */!*
       let shooter = function() { // shooter function
         alert( i ); // should show its number
       };
       shooters.push(shooter);
     }

     return shooters;
   }

   let army = makeArmy();

   army[0](); // 0
   army[5](); // 5
   ```

   هذا بشكل أساسي نفس الأمر، لأن `for` في كل تكرار ينشئ بيئة لغوية جديدة، مع متغير `i` الخاص به. لذلك تشير الدالة التي تم إنشاؤها في كل تكرار إلى `i` الخاص بها، من تلك التكرار.

   ![](lexenv-makearmy-for-fixed.svg)

الآن، بعد أن قدمنا جهدًا كبيرًا في قراءة هذا الحل، وأن الوصفة النهائية هي بسيطة - استخدم `for` - قد تتساءل: هل كان ذلك يستحق كل هذا العناء؟

حسنًا، إذا كان بإمكانك الإجابة على السؤال بسهولة، فلن تقرأ الحل. لذلك، نأمل أن يكون قد ساعدك هذا السؤال على فهم الأمور بشكل أفضل.

بالإضافة إلى ذلك، ه
