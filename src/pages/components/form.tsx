import { FC, useState, useEffect, KeyboardEvent } from 'react';
import {
  Input,
  Table,
  Typography,
  message,
  Button,
  InputNumber,
  Form,
  Row,
  Col,
  Select,
  Modal,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Entry {
  key: string;
  accountNumber: string;
  accountName: string;
  currency: string;
  internalDescription: string;
  debit: number;
  credit: number;
  costCenter: string;
  supplierNumber: string;
}

const dummyAccounts = [
  { number: '1010', name: 'الصندوق' },
  { number: '1020', name: 'البنك الأهلي' },
  { number: '1030', name: 'العملاء' },
];

const dummyCostCenters = [
  { code: 'C001', name: 'الإدارة العامة' },
  { code: 'C002', name: 'المبيعات' },
  { code: 'C003', name: 'الإنتاج' },
];

const FormPage: FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [journalNumber, setJournalNumber] = useState('');
  const [form] = Form.useForm();
  const [meta, setMeta] = useState({ date: '', description: '' });
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showCostCenterModal, setShowCostCenterModal] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const currencies = ['ريال سعودي', 'دولار أمريكي', 'يورو', 'درهم إماراتي'];

  const generateJournalNumber = () => {
    const num = `J-${Date.now()}`;
    setJournalNumber(num);
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    generateJournalNumber();
    setMeta((prev) => ({ ...prev, date: getTodayDate() }));
    addRow();
  }, []);

  useEffect(() => {
    setTotalDebit(entries.reduce((sum, e) => sum + (e.debit || 0), 0));
    setTotalCredit(entries.reduce((sum, e) => sum + (e.credit || 0), 0));
  }, [entries]);

  const updateCell = (index: number, field: keyof Entry, value: string | number) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      [field]: typeof value === 'number' ? value : value.toString(),
    };
    setEntries(newEntries);
  };

  const updateAccount = (index: number, number: string, name: string) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      accountNumber: number,
      accountName: name,
    };
    setEntries(newEntries);
  };

  const addRow = () => {
    setEntries((prev) => [
      ...prev,
      {
        key: `${Date.now()}`,
        accountNumber: '',
        accountName: '',
        currency: currencies[0],
        internalDescription: '',
        debit: 0,
        credit: 0,
        costCenter: '',
        supplierNumber: '',
      },
    ]);
  };

  const deleteRow = (index: number) => {
    if (entries.length === 1) {
      message.warning('لا يمكن حذف السطر الوحيد.');
      return;
    }
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    action: 'account' | 'costCenter' | 'none',
    index: number
  ) => {
    if (e.key === 'F9') {
      e.preventDefault();
      if (action === 'account') {
        setSelectedRowIndex(index);
        setShowAccountModal(true);
      } else if (action === 'costCenter') {
        setSelectedRowIndex(index);
        setShowCostCenterModal(true);
      }
      // action === 'none' لا يفتح أي شيء عند F9
    } else if (e.key === 'Enter') {
      e.preventDefault();
      addRow();
    }
  };

  const handleSave = () => {
    if (!meta.date || !meta.description) {
      message.error('يرجى إدخال التاريخ والوصف قبل الحفظ.');
      return;
    }

    for (const entry of entries) {
      if (!entry.accountNumber || !entry.accountName || !entry.costCenter) {
        message.error('كل سطر يجب أن يحتوي على رقم الحساب، اسم الحساب، ومركز التكلفة.');
        return;
      }
      if ((entry.debit <= 0 && entry.credit <= 0) || (entry.debit > 0 && entry.credit > 0)) {
        message.error('كل سطر يجب أن يحتوي إما على مبلغ مدين أو دائن فقط.');
        return;
      }
    }

    if (totalDebit !== totalCredit) {
      message.error('القيد غير متوازن! تأكد من تساوي المدين مع الدائن.');
      return;
    }

    console.log('📦 تم حفظ القيد:', {
      journalNumber,
      meta,
      entries,
    });
    message.success('تم حفظ القيد بنجاح!');

    setMeta({ date: getTodayDate(), description: '' });
    setEntries([]);
    generateJournalNumber();
    setTimeout(() => {
      addRow();
    }, 0);
  };

  const columns: ColumnsType<Entry> = [
    {
      title: 'رقم الحساب',
      dataIndex: 'accountNumber',
      render: (_, __, index) => (
        <Input
          value={entries[index].accountNumber}
          onChange={(e) => updateCell(index, 'accountNumber', e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'account', index)}
          placeholder="رقم الحساب (F9 للبحث)"
        />
      ),
    },
    {
      title: 'اسم الحساب',
      dataIndex: 'accountName',
      render: (_, __, index) => (
        <Input
          value={entries[index].accountName}
          onChange={(e) => updateCell(index, 'accountName', e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'account', index)}
          placeholder="اسم الحساب (F9 للبحث)"
        />
      ),
    },
    {
      title: 'نوع العملة',
      dataIndex: 'currency',
      render: (_, __, index) => (
        <Select
          value={entries[index].currency}
          onChange={(value) => updateCell(index, 'currency', value)}
          style={{ width: '100%' }}
        >
          {currencies.map((c) => (
            <Select.Option key={c} value={c}>
              {c}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'بيان داخلي',
      dataIndex: 'internalDescription',
      render: (_, __, index) => (
        <Input
          value={entries[index].internalDescription}
          onChange={(e) => updateCell(index, 'internalDescription', e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'none', index)} // لا تفتح شيء عند F9
          placeholder="بيان القيد"
        />
      ),
    },
    {
      title: 'مدين',
      dataIndex: 'debit',
      render: (_, __, index) => (
        <InputNumber
          min={0}
          value={entries[index].debit}
          onChange={(value) => updateCell(index, 'debit', value || 0)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'دائن',
      dataIndex: 'credit',
      render: (_, __, index) => (
        <InputNumber
          min={0}
          value={entries[index].credit}
          onChange={(value) => updateCell(index, 'credit', value || 0)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'مركز التكلفة',
      dataIndex: 'costCenter',
      render: (_, __, index) => (
        <Input
          value={entries[index].costCenter}
          onChange={(e) => updateCell(index, 'costCenter', e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'costCenter', index)}
          placeholder="مركز التكلفة (F9 للبحث)"
        />
      ),
    },
    {
      title: 'رقم المورد',
      dataIndex: 'supplierNumber',
      render: (_, __, index) => (
        <Input
          value={entries[index].supplierNumber}
          onChange={(e) => updateCell(index, 'supplierNumber', e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'none', index)} // لا تفتح شيء عند F9
          placeholder="رقم المورد"
        />
      ),
    },
    {
      title: 'إجراء',
      dataIndex: 'action',
      render: (_, __, index) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button icon={<DeleteOutlined />} danger onClick={() => deleteRow(index)} size="small" />
          {index === entries.length - 1 && (
            <Button icon={<PlusOutlined />} onClick={addRow} size="small" />
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>إدخال قيد اليومية</h2>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="رقم القيد">
              <Input value={journalNumber} disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="تاريخ القيد" required>
              <Input
                type="date"
                value={meta.date}
                onChange={(e) => setMeta({ ...meta, date: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="وصف القيد" required>
              <Input
                value={meta.description}
                onChange={(e) => setMeta({ ...meta, description: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 32, fontWeight: 'bold' }}>
        <Text type={totalDebit !== totalCredit ? 'danger' : undefined}>
          مجموع المدين: {totalDebit.toFixed(2)}
        </Text>
        <Text type={totalDebit !== totalCredit ? 'danger' : undefined}>
          مجموع الدائن: {totalCredit.toFixed(2)}
        </Text>
      </div>

      <Table
        style={{ marginTop: 12 }}
        columns={columns}
        dataSource={entries}
        pagination={false}
        rowKey="key"
        scroll={{ y: 300 }}
      />

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Button type="primary" onClick={handleSave} disabled={entries.length === 0}>
          حفظ القيد
        </Button>
      </div>

      {/* مودال اختيار الحساب */}
      <Modal
        open={showAccountModal}
        onCancel={() => setShowAccountModal(false)}
        footer={null}
        title="اختيار حساب"
      >
        <Table
          dataSource={dummyAccounts}
          columns={[
            { title: 'رقم الحساب', dataIndex: 'number' },
            { title: 'اسم الحساب', dataIndex: 'name' },
            {
              title: 'اختيار',
              render: (_, record) => (
                <a
                  onClick={() => {
                    if (selectedRowIndex !== null) {
                      updateAccount(selectedRowIndex, record.number, record.name);
                      setShowAccountModal(false);
                    }
                  }}
                >
                  اختيار
                </a>
              ),
            },
          ]}
          rowKey="number"
          pagination={false}
        />
      </Modal>

      {/* مودال اختيار مركز التكلفة */}
      <Modal
        open={showCostCenterModal}
        onCancel={() => setShowCostCenterModal(false)}
        footer={null}
        title="اختيار مركز تكلفة"
      >
        <Table
          dataSource={dummyCostCenters}
          columns={[
            { title: 'الكود', dataIndex: 'code' },
            { title: 'الاسم', dataIndex: 'name' },
            {
              title: 'اختيار',
              render: (_, record) => (
                <a
                  onClick={() => {
                    if (selectedRowIndex !== null) {
                      updateCell(selectedRowIndex, 'costCenter', record.code);
                      setShowCostCenterModal(false);
                    }
                  }}
                >
                  اختيار
                </a>
              ),
            },
          ]}
          rowKey="code"
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default FormPage;
