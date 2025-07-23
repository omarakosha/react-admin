import React, { useState } from 'react';
import { Input, Table, Button, DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

interface Supplier {
  key: string;
  name: string;
  balance: number;
  date: string; // صيغة YYYY-MM-DD
}

export const SuppliersReport: React.FC = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const [data] = useState<Supplier[]>([
    { key: '1', name: 'مورد A', balance: 5000, date: '2025-01-15' },
    { key: '2', name: 'مورد B', balance: 7500, date: '2025-03-22' },
  ]);

  const filtered = data.filter(item => {
    const matchesSearch = item.name.includes(search);
    const isAfterFrom = !fromDate || item.date >= fromDate.format('YYYY-MM-DD');
    const isBeforeTo = !toDate || item.date <= toDate.format('YYYY-MM-DD');
    return matchesSearch && isAfterFrom && isBeforeTo;
  });

  const columns = [
    { title: 'اسم المورد', dataIndex: 'name', key: 'name' },
    { title: 'الرصيد', dataIndex: 'balance', key: 'balance', render: (v: number) => `${v.toLocaleString()} ريال` },
    { title: 'التاريخ', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div style={{ padding: 20 }}>
     
      <Space style={{ marginBottom: 16 }}>
        <DatePicker placeholder="من تاريخ" onChange={setFromDate} format="YYYY-MM-DD" allowClear />
        <DatePicker placeholder="إلى تاريخ" onChange={setToDate} format="YYYY-MM-DD" allowClear />
        <Input.Search
          placeholder="بحث باسم المورد"
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

export default SuppliersReport;
