import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Table,
  Popconfirm,
} from 'antd';

interface InvoiceItem {
  key: string;
  description: string;
  quantity: number;
  price: number;
  tax: number;
}

interface InvoiceModalpopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    invoiceNumber: string;
    customerName: string;
    items: InvoiceItem[];
    totalAmount: number;
    taxTotal: number;
  }) => void;
  title: string;
  type: 'sales' | 'purchase';
  initialInvoiceNumber?: string;
  invoiceToEdit?: {
    invoiceNumber: string;
    customerName: string;
    items: InvoiceItem[];
  } | null;
}

const InvoiceModalpopup: FC<InvoiceModalpopupProps> = ({
  open,
  onClose,
  onSave,
  title,
  type,
  initialInvoiceNumber,
  invoiceToEdit,
}) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [taxRate, setTaxRate] = useState<number>(15);

  useEffect(() => {
    if (open) {
      if (invoiceToEdit) {
        setInvoiceNumber(invoiceToEdit.invoiceNumber);
        setCustomerName(invoiceToEdit.customerName);
        setItems(invoiceToEdit.items);
      } else {
        setInvoiceNumber(type === 'sales' ? `SINV-${Date.now()}` : initialInvoiceNumber || '');
        setCustomerName('');
        setItems([
          {
            key: Date.now().toString(),
            description: '',
            quantity: 1,
            price: 0,
            tax: 0,
          },
        ]);
      }
      setTaxRate(15);
    }
  }, [open, type, initialInvoiceNumber, invoiceToEdit]);

  const handleItemChange = (key: string, field: keyof InvoiceItem, value: any) => {
    setItems(current =>
      current.map(item => {
        if (item.key === key) {
          const updated = { ...item, [field]: value };
          if (field === 'price' || field === 'quantity') {
            updated.tax = ((updated.price || 0) * (updated.quantity || 0) * taxRate) / 100;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const addItemRow = () => {
    setItems(current => [
      ...current,
      {
        key: Date.now().toString(),
        description: '',
        quantity: 1,
        price: 0,
        tax: 0,
      },
    ]);
  };

  const handleDeleteRow = (key: string) => {
    setItems(current => current.filter(item => item.key !== key));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, key: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (items[items.length - 1].key === key) {
        addItemRow();
      }
    }
  };

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity + item.tax, 0);
  const totalTax = items.reduce((acc, item) => acc + item.tax, 0);

  const handleSubmit = () => {
    if (!invoiceNumber) return;
    const validItems = items.filter(
      item => item.description.trim() !== '' && item.price > 0 && item.quantity > 0
    );
    onSave({
      invoiceNumber,
      customerName,
      items: validItems,
      totalAmount,
      taxTotal: totalTax,
    });
  };

  const columns = [
    {
      title: 'الوصف',
      dataIndex: 'description',
      render: (_: any, record: InvoiceItem) => (
        <Input
          value={record.description}
          onChange={e => handleItemChange(record.key, 'description', e.target.value)}
          onKeyDown={e => onKeyDown(e, record.key)}
          placeholder="الوصف"
        />
      ),
    },
    {
      title: 'الكمية',
      dataIndex: 'quantity',
      render: (_: any, record: InvoiceItem) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={value => handleItemChange(record.key, 'quantity', value || 1)}
          onKeyDown={e => onKeyDown(e as any, record.key)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'السعر',
      dataIndex: 'price',
      render: (_: any, record: InvoiceItem) => (
        <InputNumber
          min={0}
          value={record.price}
          onChange={value => handleItemChange(record.key, 'price', value || 0)}
          onKeyDown={e => onKeyDown(e as any, record.key)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'الضريبة',
      dataIndex: 'tax',
      render: (_: any, record: InvoiceItem) => (
        <InputNumber
          min={0}
          value={record.tax}
          style={{ width: '100%' }}
          disabled
        />
      ),
    },
    {
      title: 'إجراءات',
      key: 'action',
      render: (_: any, record: InvoiceItem) =>
        items.length > 1 ? (
          <Popconfirm
            title="هل أنت متأكد من الحذف؟"
            onConfirm={() => handleDeleteRow(record.key)}
            okText="نعم"
            cancelText="إلغاء"
          >
            <Button danger size="small">حذف</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="حفظ"
      cancelText="إلغاء"
      width={800}
      centered
      bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }}
    >
      <Form layout="vertical">
        <Form.Item label="رقم الفاتورة">
          {type === 'sales' ? (
            <Input value={invoiceNumber} disabled />
          ) : (
            <Input
              value={invoiceNumber}
              onChange={e => setInvoiceNumber(e.target.value)}
              placeholder="أدخل رقم الفاتورة"
            />
          )}
        </Form.Item>

        <Form.Item label="اسم العميل">
          <Input
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            placeholder="أدخل اسم العميل"
          />
        </Form.Item>

        <Form.Item label="نسبة الضريبة (%)">
          <InputNumber
            min={0}
            max={100}
            value={taxRate}
            onChange={(value) => {
              const rate = value || 0;
              setTaxRate(rate);
              setItems(current =>
                current.map(item => ({
                  ...item,
                  tax: ((item.price || 0) * (item.quantity || 0) * rate) / 100,
                }))
              );
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Table
          dataSource={items}
          columns={columns}
          rowKey="key"
          pagination={false}
          size="small"
          scroll={{ y: 240 }}
          footer={() => (
            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
              إجمالي: {totalAmount.toFixed(2)} | ضريبة: {totalTax.toFixed(2)}
            </div>
          )}
        />

        <Button
          type="dashed"
          onClick={addItemRow}
          style={{ width: '100%', marginTop: 12 }}
        >
          إضافة سطر جديد
        </Button>
      </Form>
    </Modal>
  );
};

export default InvoiceModalpopup;
