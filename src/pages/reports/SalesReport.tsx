import React, { useState } from 'react';
import { Input, Table, Button, DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

interface Sale {
  key: string;
  invoice: string;
  customer: string;
  amount: number;
  date: string;
}

export const SalesReport: React.FC = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const [data] = useState<Sale[]>([
    { key: '1', invoice: 'SINV-1001', customer: 'شركة ألف', amount: 5000, date: '2025-01-10' },
    { key: '2', invoice: 'SINV-1002', customer: 'شركة باء', amount: 12000, date: '2025-02-25' },
  ]);

  const filtered = data.filter(item => {
    const matchesSearch = item.invoice.includes(search) || item.customer.includes(search);
    const isAfterFrom = !fromDate || item.date >= fromDate.format('YYYY-MM-DD');
    const isBeforeTo = !toDate || item.date <= toDate.format('YYYY-MM-DD');
    return matchesSearch && isAfterFrom && isBeforeTo;
  });

  const columns = [
    { title: 'رقم الفاتورة', dataIndex: 'invoice', key: 'invoice' },
    { title: 'العميل', dataIndex: 'customer', key: 'customer' },
    { title: 'القيمة', dataIndex: 'amount', key: 'amount', render: (v: number) => `${v.toLocaleString()} ريال` },
    { title: 'التاريخ', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div style={{ padding: 20 }}>
      
      <Space style={{ marginBottom: 16 }}>
        <DatePicker placeholder="من تاريخ" onChange={setFromDate} format="YYYY-MM-DD" allowClear />
        <DatePicker placeholder="إلى تاريخ" onChange={setToDate} format="YYYY-MM-DD" allowClear />
        <Input.Search
          placeholder="بحث برقم الفاتورة أو العميل"
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

export default SalesReport;
