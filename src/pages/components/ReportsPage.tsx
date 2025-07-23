import React, { useState } from 'react';
import { Tabs, DatePicker, Space } from 'antd';
import type { TabsProps } from 'antd';
import type { Dayjs } from 'dayjs';
import {
  AccountsReport,
  CostCentersReport,
  SuppliersReport,
  CustomersReport,
  SalesReport,
  PurchaseReport,
  CashReport,
} from '../reports';

const ReportsPage: React.FC = () => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const dateFilterBar = (
    <div style={{ marginBottom: 16, textAlign: 'center' }}>
      <Space>
        <DatePicker
          placeholder="من تاريخ"
          onChange={date => setFromDate(date)}
          format="YYYY-MM-DD"
          allowClear
        />
        <DatePicker
          placeholder="إلى تاريخ"
          onChange={date => setToDate(date)}
          format="YYYY-MM-DD"
          allowClear
        />
      </Space>
    </div>
  );

  const items: TabsProps['items'] = [
    { key: '1', label: 'الحسابات', children: <AccountsReport /> },
    { key: '2', label: 'مراكز التكلفة', children: <CostCentersReport /> },
    { key: '3', label: 'الموردين', children: <SuppliersReport /> },
    { key: '4', label: 'العملاء', children: <CustomersReport  /> },
    { key: '5', label: 'المبيعات', children: <SalesReport  /> },
    { key: '6', label: 'المشتريات', children: <PurchaseReport /> },
    { key: '7', label: 'الخزينة', children: <CashReport /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-4 rounded-xl shadow">
       
        <Tabs defaultActiveKey="1" type="card" items={items} tabPosition="top" />
        
      </div>
    </div>
  );
};

export default ReportsPage;
