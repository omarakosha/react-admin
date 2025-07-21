import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'dashboard',
    label: {
      zh_CN: 'لوحة التحكم',
      en_US: 'Dashboard',
    },
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    code: 'documentation',
    label: {
      zh_CN: 'وثيقة',
      en_US: 'Documentation',
    },
    icon: 'documentation',
    path: '/documentation',
  },
  {
    code: 'guide',
    label: {
      zh_CN: 'مرشد',
      en_US: 'Guide',
    },
    icon: 'guide',
    path: '/guide',
  },
  {
    code: 'permission',
    label: {
      zh_CN: 'الصلاحيات',
      en_US: 'Permission',
    },
    icon: 'permission',
    path: '/permission',
    children: [
      {
        code: 'routePermission',
        label: {
          zh_CN: 'صلاحيات الوصول',
          en_US: 'Route Permission',
        },
        path: '/permission/route',
      },
      {
        code: 'notFound',
        label: {
          zh_CN: '404',
          en_US: '404',
        },
        path: '/permission/404',
      },
    ],
  },
  {
    code: 'component',
    label: {
      zh_CN: 'ادارة العملاء',
      en_US: 'CRM',
    },
    icon: 'permission',
    path: '/component',
    children: [
      {
        code: 'componentForm',
        label: {
          zh_CN: 'اضافة عميل ',
          en_US: 'Add Custmer',
        },
        path: '/component/form',
      },
      {
        code: 'componentTable',
        label: {
          zh_CN: 'العملاء',
          en_US: 'Custmers',
        },
        path: '/component/table',
      },
      {
        code: 'componentSearch',
        label: {
          zh_CN: 'البحث',
          en_US: 'Search',
        },
        path: '/component/search',
      },
      {
        code: 'componentAside',
        label: {
          zh_CN: 'الشريط الجانبي',
          en_US: 'Aside',
        },
        path: '/component/aside',
      },
      {
        code: 'componentTabs',
        label: {
          zh_CN: 'ادارة فاتورة',
          en_US: 'invoice Managment',
        },
        path: '/component/tabs',
      },
      {
        code: 'componentRadioCards',
        label: {
          zh_CN: 'بطاقة الراديو',
          en_US: 'Radio Cards',
        },
        path: '/component/radio-cards',
      },
    ],
  },

  {
    code: 'business',
    label: {
      zh_CN: 'الاعمال',
      en_US: 'Business',
    },
    icon: 'permission',
    path: '/business',
    children: [
      {
        code: 'basic',
        label: {
          zh_CN: 'الاساسي',
          en_US: 'Basic',
        },
        path: '/business/basic',
      },
      {
        code: 'withSearch',
        label: {
          zh_CN: 'مع البحث',
          en_US: 'WithSearch',
        },
        path: '/business/with-search',
      },
      {
        code: 'withAside',
        label: {
          zh_CN: 'مع الشريط الجانبي',
          en_US: 'WithAside',
        },
        path: '/business/with-aside',
      },
      {
        code: 'withRadioCard',
        label: {
          zh_CN: 'مع الكارد ',
          en_US: 'With Nav Tabs',
        },
        path: '/business/with-radio-cards',
      },
      {
        code: 'withTabs',
        label: {
          zh_CN: 'مع التاب',
          en_US: 'With Tabs',
        },
        path: '/business/with-tabs',
      },
    ],
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
