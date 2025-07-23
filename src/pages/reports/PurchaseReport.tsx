import React, { useState } from 'react';
import { Input, Table, Button, DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

interface Purchase {
  key: string;
  invoice: string;
  supplier: string;
  amount: number;
  date: string;
}

export const PurchaseReport: React.FC = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const [data] = useState<Purchase[]>([
    { key: '1', invoice: 'PINV-1001', supplier: 'مورد 1', amount: 7000, date: '2025-01-18' },
    { key: '2', invoice: 'PINV-1002', supplier: 'مورد 2', amount: 9500, date: '2025-02-22' },
  ]);

  const filtered = data.filter(item => {
    const matchesSearch = item.invoice.includes(search) || item.supplier.includes(search);
    const isAfterFrom = !fromDate || item.date >= fromDate.format('YYYY-MM-DD');
    const isBeforeTo = !toDate || item.date <= toDate.format('YYYY-MM-DD');
    return matchesSearch && isAfterFrom && isBeforeTo;
  });

  const columns = [
    { title: 'رقم الفاتورة', dataIndex: 'invoice', key: 'invoice' },
    { title: 'المورد', dataIndex: 'supplier', key: 'supplier' },
    { title: 'القيمة', dataIndex: 'amount', key: 'amount', render: (v: number) => `${v.toLocaleString()} ريال` },
    { title: 'التاريخ', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div style={{ padding: 20 }}>
      
      <Space style={{ marginBottom: 16 }}>
        <DatePicker placeholder="من تاريخ" onChange={setFromDate} format="YYYY-MM-DD" allowClear />
        <DatePicker placeholder="إلى تاريخ" onChange={setToDate} format="YYYY-MM-DD" allowClear />
        <Input.Search
          placeholder="بحث برقم الفاتورة أو المورد"
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

export default PurchaseReport;
