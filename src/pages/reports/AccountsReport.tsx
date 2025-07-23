import React, { useState } from 'react';
import { Input, Table, Button, DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

interface Account {
  key: string;
  accountNumber: string;
  accountName: string;
  balance: number;
  date: string; // صيغة YYYY-MM-DD
}

export const AccountsReport: React.FC = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const [data] = useState<Account[]>([
    { key: '1', accountNumber: '1001', accountName: 'الصندوق', balance: 15000, date: '2025-01-10' },
    { key: '2', accountNumber: '2001', accountName: 'البنك', balance: 25000, date: '2025-02-20' },
    { key: '3', accountNumber: '3001', accountName: 'الموردون', balance: 18000, date: '2025-03-15' },
    { key: '4', accountNumber: '4001', accountName: 'العملاء', balance: 12000, date: '2025-04-05' },
  ]);

  const filtered = data.filter(acc => {
    const matchesSearch = acc.accountNumber.includes(search) || acc.accountName.includes(search);
    const isAfterFrom = !fromDate || acc.date >= fromDate.format('YYYY-MM-DD');
    const isBeforeTo = !toDate || acc.date <= toDate.format('YYYY-MM-DD');
    return matchesSearch && isAfterFrom && isBeforeTo;
  });

  const columns = [
    { title: 'رقم الحساب', dataIndex: 'accountNumber', key: 'accountNumber' },
    { title: 'اسم الحساب', dataIndex: 'accountName', key: 'accountName' },
    { title: 'الرصيد', dataIndex: 'balance', key: 'balance', render: (v: number) => v.toLocaleString() },
    { title: 'التاريخ', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div style={{ padding: 20 }}>
   
      <Space style={{ marginBottom: 16 }}>
        <DatePicker placeholder="من تاريخ" onChange={date => setFromDate(date)} format="YYYY-MM-DD" allowClear />
        <DatePicker placeholder="إلى تاريخ" onChange={date => setToDate(date)} format="YYYY-MM-DD" allowClear />
        <Input.Search
          placeholder="بحث برقم أو اسم الحساب"
          onChange={e => setSearch(e.target.value)}
          allowClear
          style={{ maxWidth: 300 }}
        />
      </Space>
      <Table dataSource={filtered} columns={columns} rowKey="key" pagination={false} bordered />
      <Button onClick={() => window.print()} style={{ marginTop: 20 }}>طباعة</Button>
    </div>
  );
};

export default AccountsReport;
