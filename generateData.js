"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// تابع برای تولید داده‌های جعلی
function generateData(totalItems) {
    var rootNode = {
        parentId: null,
        code: '00001',
        displayName: 'Root',
        memberCount: 0,
        children: [],
        id: 1,
    };
    // استفاده از یک صف برای پیگیری گره‌های در حال پردازش
    var queue = [rootNode];
    var idCounter = 2; // شروع از 2 چون ریشه دارای id 1 است
    while (idCounter <= totalItems) {
        // گره را از صف بیرون بیاورید
        var currentNode = queue.shift();
        if (!currentNode)
            break; // اگر هیچ گره‌ای برای پردازش وجود نداشته باشد، خارج شوید
        // تولید یک عدد تصادفی از تعداد فرزندان (1 تا 3)
        var numberOfChildren = Math.floor(Math.random() * 3) + 1;
        for (var i = 0; i < numberOfChildren && idCounter <= totalItems; i++) {
            // ایجاد یک گره فرزند جدید
            var childNode = {
                parentId: currentNode.id,
                code: "00001.".concat(String(idCounter).padStart(5, '0')),
                displayName: "Item ".concat(idCounter),
                memberCount: Math.floor(Math.random() * 10),
                children: [],
                id: idCounter++,
            };
            // افزودن گره فرزند به فرزندان گره فعلی
            currentNode.children.push(childNode);
            // افزودن گره فرزند به صف برای پردازش‌های بعدی
            queue.push(childNode);
        }
    }
    return rootNode;
}
// تابع اصلی برای اجرای تولید داده‌ها
function main() {
    var totalItems = 50000; // تعداد کل موارد برای تولید
    var fakeData = generateData(totalItems); // تولید داده‌ها
    // نوشتن داده‌های تولید شده به یک فایل JSON
    var filePath = 'fakeData.json'; // نام فایل خروجی
    fs.writeFileSync(filePath, JSON.stringify(fakeData, null, 2)); // نوشتن داده‌های تولید شده به یک فایل
    console.log("\u0641\u0627\u06CC\u0644 ".concat(filePath, " \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u0627\u06CC\u062C\u0627\u062F \u0634\u062F \u0648 \u0634\u0627\u0645\u0644 ").concat(totalItems, " \u0645\u0648\u0631\u062F \u0627\u0633\u062A."));
}
// اجرای تابع اصلی
main();
