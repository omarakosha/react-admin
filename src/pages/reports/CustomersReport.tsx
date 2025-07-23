import React, { useState } from 'react';
import { Input, Table, Button, DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

interface Customer {
  key: string;
  name: string;
  balance: number;
  date: string;
}

export const CustomersReport: React.FC = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const [data] = useState<Customer[]>([
    { key: '1', name: 'عميل ألف', balance: 4000, date: '2025-02-12' },
    { key: '2', name: 'عميل باء', balance: 6500, date: '2025-04-18' },
  ]);

  const filtered = data.filter(item => {
    const matchesSearch = item.name.includes(search);
    const isAfterFrom = !fromDate || item.date >= fromDate.format('YYYY-MM-DD');
    const isBeforeTo = !toDate || item.date <= toDate.format('YYYY-MM-DD');
    return matchesSearch && isAfterFrom && isBeforeTo;
  });

  const columns = [
    { title: 'اسم العميل', dataIndex: 'name', key: 'name' },
    { title: 'الرصيد', dataIndex: 'balance', key: 'balance', render: (v: number) => `${v.toLocaleString()} ريال` },
    { title: 'التاريخ', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div style={{ padding: 20 }}>
     
      <Space style={{ marginBottom: 16 }}>
        <DatePicker placeholder="من تاريخ" onChange={setFromDate} format="YYYY-MM-DD" allowClear />
        <DatePicker placeholder="إلى تاريخ" onChange={setToDate} format="YYYY-MM-DD" allowClear />
        <Input.Search
          placeholder="بحث باسم العميل"
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

export default CustomersReport;
