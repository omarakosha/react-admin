import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Tabs } from 'antd';

import SalesInvoicesPage from './SalesInvoicesPage';
import PurchaseInvoicesPage from './PurchaseInvoicesPage';

const { TabPane } = Tabs;

const TabsPage: FC = () => {
  const [activeKey, setActiveKey] = useState<string>('1');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const direction = document.documentElement.getAttribute('dir') as 'ltr' | 'rtl';
    setDir(direction || 'ltr');
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <Tabs
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          type="line"
          size="large"
          tabBarGutter={30}
          tabPosition="top"
          className={dir === 'rtl' ? 'text-right' : 'text-left'}
        >
          <TabPane tab="فواتير المبيعات" key="1">
            <SalesInvoicesPage />
          </TabPane>
          <TabPane tab="فواتير المشتريات" key="2">
            <PurchaseInvoicesPage />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsPage;
