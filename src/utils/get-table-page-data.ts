import type { PageData } from '@/interface';

export const getTableData = <T extends any[]>(pageNum = 1, pageSize = 10, totalData: T) => {
  const total: number = totalData.length;
  const tableData: PageData<T[0]> = {
    data: [],
    pageNum,
    pageSize,
    total,
  };

  if (pageSize >= total) {
    //إذا كان حجم الصفحة أكبر من أو يساوي إجمالي طول البيانات، فهذا يعني أن هناك صفحة واحدة فقط من البيانات أو لا توجد بيانات
    tableData.data = totalData;
    tableData.pageNum = 1; //جلب الصفحة الأولى مباشرة
  } else {
    //حجم الصفحة أصغر من إجمالي طول البيانات، وتتجاوز البيانات صفحة واحدة
    const num = pageSize * (pageNum - 1); //حساب العدد الإجمالي لجميع البيانات قبل الصفحة الحالية (باستثناء)

    if (num < total) {
      //إذا كان العدد الإجمالي لجميع عناصر البيانات قبل الصفحة الحالية أقل من (لا يساوي) الطول الإجمالي لمجموعة البيانات، فهذا يعني أن رقم الصفحة الحالية لا يتجاوز الحد الأقصى لعدد الصفحات.
      const startIndex = num; //فهرس عنصر البيانات الأول في الصفحة الحالية في مجموعة البيانات الإجمالية
      const endIndex = num + pageSize - 1; //آخر فهرس بيانات للصفحة الحالية

      tableData.data = totalData.filter((_, index) => index >= startIndex && index <= endIndex); //عندما يكون عدد البيانات في الصفحة الحالية أقل من الحد الأقصى لعدد البيانات لكل صفحة، يتم أيضًا تصفية البيانات وفقًا لنطاق الحد الأقصى للعدد.
    } else {
      //إذا تجاوز رقم الصفحة الحالية الحد الأقصى لعدد الصفحات، فسيتم حساب الصفحة الأخيرة الفعلية ويتم إرجاع بيانات الصفحة الأخيرة تلقائيًا.
      const size = Math.ceil(total / pageSize); //احصل على عمل
      const rest = total % pageSize; //خذ الباقي

      if (rest > 0) {
        //إذا كان الباقي أكبر من 0، فهذا يعني أن الصفحة الأخيرة الفعلية من البيانات أقل من pageSize، ويجب استخدام size+1 كرقم الصفحة للإدخال الأخير.
        tableData.pageNum = size + 1; //تم إعادة تعيين رقم الصفحة الحالية إلى الحجم +1
        tableData.data = totalData.filter((_, index) => index >= pageSize * size && index <= total);
      } else if (rest === 0) {
        //الباقي هو 0 وعدد إدخالات البيانات في الصفحة الأخيرة هو pageSize بالضبط
        tableData.pageNum = size; //إعادة تعيين رقم الصفحة الحالية والحصول على الحجم
        tableData.data = totalData.filter((_, index) => index >= pageSize * (size - 1) && index <= total);
      } //ملحوظة: الباقي لا يمكن أن يكون أقل من 0
    }
  }

  return tableData;
};
