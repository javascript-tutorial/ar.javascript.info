importance: 5

---

# Finally أم الكود فقط؟

قارن بين جزئي الكود.

1. The first one uses `finally` to execute the code after `try...catch`:

   ```js
   try {
     work work
   } catch (err) {
     handle errors
   } finally {
   *!*
     تنظيف مكان العمل
   */!*
   }
   ```

2. The second fragment puts the cleaning right after `try...catch`:

   ```js
   try {
     work work
   } catch (err) {
     handle errors
   }

   *!*
   تنظيف مكان العمل
   */!*
   ```

نحن بالتأكيد بحاجة إلى التنظيف بعد العمل ، لا يهم إذا كان هناك خطأ أم لا.

هل هناك ميزة في استخدام `finally` أم أن جزئي الكود متساويان؟ إذا كان هناك مثل هذه الميزة ، فقم بإعطاء مثال عندما يكزن مهم.
