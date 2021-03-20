
1. لنُضيف خاصيات `__proto__`:


    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

2. حين نتكلّم عن المحرّكات الحديثة، فليس هناك فرق (من ناحية الأداء) لو أخذنا الخاصية من الكائن أو من النموذج الأولي، فهي تتذكّر مكان الخاصية وتُعيد استعمالها عند طلبها ثانيةً.

فمثلًا ستتذكّر التعليمة `pockets.glasses` بأنّها وجدت `glasses` في كائن `head`، وفي المرة التالية ستبحث هناك مباشرة. كما أنّها ذكية لتُحدّث ذاكرتها الداخلية ما إن يتغيّر شيء ما لذا فإن الأداء الأمثل في أمان.

