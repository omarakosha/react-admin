interface MenuItem {
  /** menu item code */
  code: string;
  /** menu labels */
  label: {
    zh_CN: string;
    en_US: string;
  };
 /** اسم الأيقونة
*
* القوائم الفرعية لا تحتاج إلى أيقونات
*/
  icon?: string;
 /** مسار القائمة */
  path: string;
 /** القائمة الفرعية */
  children?: MenuItem[];
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];
