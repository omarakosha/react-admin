import type { FC } from 'react';
import { useState } from 'react';
import {
  Space,
  Tag,
  Modal,
  message,
  Input,
  Button,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import MyTable from '@/components/core/table';
import InvoiceModalpopup from './InvoiceModalpopup';

const { Column } = MyTable;

interface InvoiceItem {
  key: string;
  description: string;
  quantity: number;
  price: number;
  tax: number;
}

interface InvoiceType {
  key: string;
  invoiceNumber: string;
  customerName: string;
  items: InvoiceItem[];
  amount: number;
  status: string;
  tags: string[];
}

const initialData: InvoiceType[] = [];

const SalesInvoicesPage: FC = () => {
  const [data, setData] = useState<InvoiceType[]>(initialData);
  const [filteredData, setFilteredData] = useState<InvoiceType[]>(initialData);
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceType | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مدفوع': return 'green';
      case 'غير مدفوع': return 'volcano';
      case 'مسددة جزئياً': return 'orange';
      case 'معلقة': return 'gold';
      default: return 'blue';
    }
  };

  const handleDelete = (record: InvoiceType) => {
    Modal.confirm({
      title: 'هل أنت متأكد من الحذف؟',
      content: `سيتم حذف الفاتورة رقم ${record.invoiceNumber}`,
      okText: 'نعم',
      cancelText: 'إلغاء',
      onOk: () => {
        const newData = data.filter(item => item.key !== record.key);
        setData(newData);
        setFilteredData(newData);
        message.success('تم الحذف بنجاح');
      },
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    const lower = value.toLowerCase();
    const result = data.filter(item =>
      item.invoiceNumber.toLowerCase().includes(lower) ||
      item.customerName.toLowerCase().includes(lower) ||
      item.status.toLowerCase().includes(lower)
    );
    setFilteredData(result);
  };

  const handleSaveInvoice = (invoiceData: {
    invoiceNumber: string;
    customerName: string;
    items: InvoiceItem[];
    totalAmount: number;
    taxTotal: number;
  }) => {
    if (editingInvoice) {
      const updated = data.map(inv =>
        inv.key === editingInvoice.key
          ? { ...inv, ...invoiceData, amount: invoiceData.totalAmount }
          : inv
      );
      setData(updated);
      setFilteredData(updated);
      message.success('تم تعديل الفاتورة بنجاح');
    } else {
      const newRecord: InvoiceType = {
        key: Date.now().toString(),
        invoiceNumber: invoiceData.invoiceNumber,
        customerName: invoiceData.customerName,
        items: invoiceData.items,
        amount: invoiceData.totalAmount,
        status: 'مدفوع',
        tags: ['جديد'],
      };
      setData(prev => [...prev, newRecord]);
      setFilteredData(prev => [...prev, newRecord]);
      message.success('تمت إضافة فاتورة المبيعات بنجاح');
    }

    setModalOpen(false);
    setEditingInvoice(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-row items-center justify-between gap-4 mb-4">
          <Space style={{ marginBottom: 10 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingInvoice(null);
                setModalOpen(true);
              }}
              className="bg-blue-600"
            >
              إضافة فاتورة مبيعات
            </Button>
          </Space>

          <Input
            placeholder="🔍 ابحث برقم الفاتورة أو اسم العميل"
            prefix={<SearchOutlined />}
            size="middle"
            allowClear
            value={searchText}
            onChange={e => handleSearch(e.target.value)}
            className="max-w-sm w-full sm:w-auto"
          />
        </div>

        {/* تغليف الجدول ليصبح قابل للتمرير الأفقي */}
        <div className="overflow-x-auto">
          <MyTable<InvoiceType>
            dataSource={filteredData}
            rowKey={record => record.key}
            className="rounded-xl border border-gray-200 min-w-[900px]"
            pagination={{ pageSize: 10, showQuickJumper: true, position: ['bottomCenter'] }}
            scroll={{ x: 'max-content' }} // حذف scroll.y أو ضبطه حسب الحاجة
            rowClassName={() => 'hover:bg-blue-50 transition duration-200 text-center'}
          >
            <Column title="رقم الفاتورة" dataIndex="invoiceNumber" key="invoiceNumber" width={120} />
            <Column title="اسم العميل" dataIndex="customerName" key="customerName" width={180} />
            <Column title="المبلغ" dataIndex="amount" key="amount" width={100} />
            <Column
              title="الحالة"
              dataIndex="status"
              key="status"
              width={120}
              render={(status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>}
            />
            <Column
              title="التصنيفات"
              dataIndex="tags"
              key="tags"
              width={150}
              render={(tags: string[]) => (
                <>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>{tag}</Tag>
                  ))}
                </>
              )}
            />
            <Column
              title="الإجراءات"
              key="action"
              width={110}
              render={(_, record: InvoiceType) => (
                <Space size="middle">
                  <Tooltip title="تعديل">
                    <Button
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => {
                        setEditingInvoice(record);
                        setModalOpen(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="حذف">
                    <Button
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(record)}
                      style={{ backgroundColor: '#fff1f0', border: 'none', color: '#ff4d4f' }}
                    />
                  </Tooltip>
                </Space>
              )}
            />
          </MyTable>
        </div>

        <InvoiceModalpopup
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingInvoice(null);
          }}
          onSave={handleSaveInvoice}
          title={editingInvoice ? 'تعديل فاتورة مبيعات' : 'إضافة فاتورة مبيعات'}
          type="sales"
          invoiceToEdit={editingInvoice}
        />
      </div>
    </div>
  );
};

export default SalesInvoicesPage;
