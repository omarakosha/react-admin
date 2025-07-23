import React, { useState } from 'react';
import { Input, Table, Button, DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

interface CashEntry {
  key: string;
  type: string;
  amount: number;
  date: string;
}

export const CashReport: React.FC = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const [data] = useState<CashEntry[]>([
    { key: '1', type: 'إيداع', amount: 10000, date: '2025-01-05' },
    { key: '2', type: 'سحب', amount: -3000, date: '2025-02-15' },
  ]);

  const filtered = data.filter(item => {
    const matchesSearch = item.type.includes(search);
    const isAfterFrom = !fromDate || item.date >= fromDate.format('YYYY-MM-DD');
    const isBeforeTo = !toDate || item.date <= toDate.format('YYYY-MM-DD');
    return matchesSearch && isAfterFrom && isBeforeTo;
  });

  const columns = [
    { title: 'النوع', dataIndex: 'type', key: 'type' },
    { title: 'القيمة', dataIndex: 'amount', key: 'amount', render: (v: number) => `${v.toLocaleString()} ريال` },
    { title: 'التاريخ', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div style={{ padding: 20 }}>
    
      <Space style={{ marginBottom: 16 }}>
        <DatePicker placeholder="من تاريخ" onChange={setFromDate} format="YYYY-MM-DD" allowClear />
        <DatePicker placeholder="إلى تاريخ" onChange={setToDate} format="YYYY-MM-DD" allowClear />
        <Input.Search
          placeholder="بحث بالنوع"
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

export default CashReport;
