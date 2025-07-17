import type { Notice } from '@/interface/layout/notice.interface';

import { intercepter, mock } from '../config';

const mockNoticeList: Notice<'all'>[] = [
  {
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: 'لقد تلقيت 14 تقريرًا أسبوعيًا جديدًا',
    datetime: '2017-08-09',
    type: 'notification',
  },
  {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: 'لقد اجتازت Qu Nini التي أوصيت بها الجولة الثالثة من المقابلات',
    datetime: '2017-08-08',
    type: 'notification',
  },
  {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: 'يمكن لهذا القالب التمييز بين أنواع الإشعارات المتعددة',
    datetime: '2017-08-07',
    read: true,
    type: 'notification',
  },
  {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: 'يتم استخدام الأيقونات الموجودة على اليسار للتمييز بين الأنواع المختلفة',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: 'يجب ألا يتجاوز المحتوى سطرين، وسيتم اقتطاعه تلقائيًا إذا تجاوز سطرين.',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'علق عليك Qu Lili',
    description: 'معلومات الوصف معلومات الوصف معلومات الوصف',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'رد عليك عمر عكوشة',
    description: 'يتم استخدام هذا القالب لتذكيرك بمن تفاعل معك، من خلال صورة الرمز "من" على اليسار.',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'عنوان',
    description: 'يتم استخدام هذا القالب لتذكيرك بمن تفاعل معك، من خلال صورة الرمز "من" على اليسار.',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000009',
    title: 'اسم المهمة',
    description: 'يجب أن تبدأ المهمة قبل 2017-01-12 20:00',
    extra: 'لم يبدأ',
    status: 'todo',
    type: 'event',
  },
  {
    id: '000000010',
    title: 'تغييرات رمز الطوارئ الخاص بطرف ثالث',
    description: 'تم تقديم Guanlin في 2017-01-06، ويجب إكمال مهمة تغيير الكود قبل 2017-01-07',
    extra: 'تنتهي قريبا',
    status: 'urgent',
    type: 'event',
  },
  {
    id: '000000011',
    title: 'امتحان أمن المعلومات',
    description: 'تكليف Zhuer بإكمال التحديث ونشره قبل 2017-01-09',
    extra: 'لقد مرت 8 أيام',
    status: 'doing',
    type: 'event',
  },
  {
    id: '000000012',
    title: 'ABCD الافراج عن النسخة',
    description: 'تم تقديم Guanlin في 2017-01-06، ويجب إكمال مهمة تغيير الكود قبل 2017-01-07',
    extra: 'في تَقَدم',
    status: 'processing',
    type: 'event',
  },
];

mock.mock('/user/notice', 'get', intercepter(mockNoticeList));
