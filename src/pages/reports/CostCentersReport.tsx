import React, { useState } from 'react';
import { Input, Table, Button, DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

interface CostCenter {
  key: string;
  code: string;
  name: string;
  expenses: number;
  date: string;
}

export const CostCentersReport: React.FC = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const [data] = useState<CostCenter[]>([
    { key: '1', code: 'CC-001', name: 'الإدارة', expenses: 12000, date: '2025-01-25' },
    { key: '2', code: 'CC-002', name: 'التسويق', expenses: 8500, date: '2025-03-10' },
  ]);

  const filtered = data.filter(item => {
    const matchesSearch = item.code.includes(search) || item.name.includes(search);
    const isAfterFrom = !fromDate || item.date >= fromDate.format('YYYY-MM-DD');
    const isBeforeTo = !toDate || item.date <= toDate.format('YYYY-MM-DD');
    return matchesSearch && isAfterFrom && isBeforeTo;
  });

  const columns = [
    { title: 'كود المركز', dataIndex: 'code', key: 'code' },
    { title: 'اسم المركز', dataIndex: 'name', key: 'name' },
    { title: 'إجمالي المصروفات', dataIndex: 'expenses', key: 'expenses', render: (v: number) => `${v.toLocaleString()} ريال` },
    { title: 'التاريخ', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div style={{ padding: 20 }}>
    
      <Space style={{ marginBottom: 16 }}>
        <DatePicker placeholder="من تاريخ" onChange={setFromDate} format="YYYY-MM-DD" allowClear />
        <DatePicker placeholder="إلى تاريخ" onChange={setToDate} format="YYYY-MM-DD" allowClear />
        <Input.Search
          placeholder="بحث باسم أو كود المركز"
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

export default CostCentersReport;
