import type { MyTabsOption } from '@/components/business/tabs';
import type { FC } from 'react';

import MyTabs from '@/components/business/tabs';

const options: MyTabsOption[] = [
  {
    label: 'Sales',
    value: 1,
  },
  {
    label: 'Purchases',
    value: 2,
  },
];

const TabsPage: FC = () => {
  return (
    <div>
      <MyTabs options={options} />
    </div>
  );
};

export default TabsPage;
