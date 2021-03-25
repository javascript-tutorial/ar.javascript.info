هنا يكون التفسير.

1. هذا هو استدعاء طريقة الكائن المعتاد.

2. نفس الشيء ، الأقواس لا تغير ترتيب العمليات هنا ، النقطة أولاً على أي حال.

3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:

   ```js no-beautify
   f = obj.go; // حساب المصطلح
   f(); // تنفيذ ما لدينا
   ```

   هنا `f()` يتم تنفيذها كـ تابع, بدون `this`.

4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.

لتفسير سلوك `(3)` و `(4)` نريد إعادة تنفيذ مدخلات الخاصية (نقطة او اقواس مربعة) تعيد قيمة النوع المرجعي.

اى عملية عليها عدا تنفيذ التابع (مثل `=` or `||`) يحولها إلى قيمة عادية ، لا تحمل المعلومات التي تسمح بتعيينها `this`.
