export function formatSearch(se: string) {
  se = decodeURIComponent(se);
  se = se.substr(1); //استخراج عدد محدد من الأحرف من السلسلة من رقم الفهرس الأولي
  const arr = se.split('&');//تقسيم السلسلة إلى مجموعة من السلاسل
  const obj: Record<string, string> = {};
  let newarr = [];

  arr.forEach((v, i) => {
    //اجتياز المصفوفة
    console.log(v);
    console.log(i);
    newarr = v.split('=');

    if (typeof obj[newarr[0]] === 'undefined') {
      obj[newarr[0]] = newarr[1];
    }
  });

  return obj;
}
