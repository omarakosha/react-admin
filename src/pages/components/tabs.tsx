import { FC, useState, useEffect, KeyboardEvent } from 'react';
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
    <div className="px-2 py-4 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-full sm:max-w-4xl md:max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <Tabs
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          type="line"
          size="large"
          tabBarGutter={dir === 'rtl' ? 16 : 30}
          tabPosition="top"
          className={dir === 'rtl' ? 'text-right' : 'text-left'}
        >
          <TabPane tab="فواتير المبيعات" key="1">
            <div className="overflow-x-auto w-full">
              <div className="min-w-[800px]">
                <SalesInvoicesPage />
              </div>
            </div>
          </TabPane>
          <TabPane tab="فواتير المشتريات" key="2">
            <div className="overflow-x-auto w-full">
              <div className="min-w-[800px]">
                <PurchaseInvoicesPage />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsPage;
