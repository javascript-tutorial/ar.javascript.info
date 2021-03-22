importance: 5

---

# Finally  أم الكود فقط؟

قارن بين جزئي الكود.

<<<<<<< HEAD
1. يستخدم الأول `finally` لتشغيل الكود بعد `try..catch`:

    ```js
    try {
      إعمل إعمل
    } catch (e) {
      معالجة الأخطاء
=======
1. The first one uses `finally` to execute the code after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
    } finally {
    *!*
      تنظيف مكان العمل
    */!*
    }
    ```
<<<<<<< HEAD
2. الجزء الثاني يضع التنظيف مباشرة بعد `try..catch`:

    ```js
    try {
      إعمل إعمل
    } catch (e) {
      معالجة الأخطاء
=======
2. The second fragment puts the cleaning right after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
    }

    *!*
    تنظيف مكان العمل
    */!*
    ```

نحن بالتأكيد بحاجة إلى التنظيف بعد العمل ، لا يهم إذا كان هناك خطأ أم لا.

هل هناك ميزة في استخدام `finally` أم أن جزئي الكود متساويان؟ إذا كان هناك مثل هذه الميزة ، فقم بإعطاء مثال عندما يكزن مهم.
