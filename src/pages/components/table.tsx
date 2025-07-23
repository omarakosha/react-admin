import type { FC } from 'react';
import { useState } from 'react';
import {
  Space,
  Tag,
  Modal,
  message,
  Form,
  Input,
  Tooltip,
  Button,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import MyTable from '@/components/core/table';

const { Column, ColumnGroup } = MyTable;

interface ColumnType {
  key: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const initialData: ColumnType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const TalbePage: FC = () => {
  const [data, setData] = useState<ColumnType[]>(initialData);
  const [filteredData, setFilteredData] = useState<ColumnType[]>(initialData);
  const [editRecord, setEditRecord] = useState<ColumnType | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const handleDelete = (record: ColumnType) => {
    Modal.confirm({
      title: 'هل أنت متأكد من الحذف؟',
      content: `سيتم حذف ${record.firstName} ${record.lastName}`,
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

  const handleEdit = (record: ColumnType) => {
    setEditRecord(record);
    form.setFieldsValue(record);
  };

  const handleAdd = () => {
    setEditRecord(null);
    form.resetFields();
    setEditRecord({ key: '', firstName: '', lastName: '', age: 0, address: '', tags: [] });
  };

  const handleSave = () => {
    form.validateFields().then((values: Omit<ColumnType, 'key' | 'tags'>) => {
      if (editRecord && editRecord.key) {
        const updated = data.map(item =>
          item.key === editRecord.key ? { ...editRecord, ...values } : item
        );
        setData(updated);
        setFilteredData(updated);
        message.success('تم التعديل بنجاح');
      } else {
        const newRecord: ColumnType = {
          key: Date.now().toString(),
          ...values,
          tags: ['new'],
        };
        const updated = [...data, newRecord];
        setData(updated);
        setFilteredData(updated);
        message.success('تمت الإضافة بنجاح');
      }
      setEditRecord(null);
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    const lower = value.toLowerCase();
    const result = data.filter(
      item =>
        item.firstName.toLowerCase().includes(lower) ||
        item.lastName.toLowerCase().includes(lower) ||
        item.address.toLowerCase().includes(lower)
    );
    setFilteredData(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-md">

        {/* رأس الصفحة */}
        <div className="flex flex-row items-center justify-between gap-4 mb-4">

          <Space style={{ marginBottom: 10 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="bg-blue-600"
          >
            إضافة عميل
          </Button>

          </Space>

         
          <Input
            placeholder="🔍 ابحث بالاسم أو العنوان"
            prefix={<SearchOutlined />}
            size="middle"
            allowClear
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm w-full sm:w-auto"
          />
        </div>

        {/* حاوية تمرير أفقي */}
        <div className="overflow-x-auto">
          <MyTable<ColumnType>
            dataSource={filteredData}
            rowKey={(record) => record.key}
            className="rounded-xl border border-gray-200"
            pagination={{
              pageSize: 10,
              showQuickJumper: true,
              position: ['bottomCenter'],
            }}
            scroll={{ y: 500, x: 'max-content' }}
            rowClassName={() =>
              'hover:bg-blue-50 transition duration-200 text-center'
            }
          >
            <ColumnGroup >
              <Column title="First Name" dataIndex="firstName" key="firstName" width={150} />
              <Column title="Last Name" dataIndex="lastName" key="lastName" width={150} />
            </ColumnGroup>
            <Column title="Age" dataIndex="age" key="age" width={80} responsive={['md']} />
            <Column title="Address" dataIndex="address" key="address" width={250} />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              width={180}
              render={(tags: string[]) => (
                <>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
              )}
            />
            <Column
              title="الإجراءات"
              key="action"
              width={120}
              fixed="right"
              render={(_, record: ColumnType) => (
                <Space size="middle">
                  <Tooltip title="تعديل">
                    <Button
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(record)}
                      style={{
                        backgroundColor: '#e6f7ff',
                        border: 'none',
                        color: '#1890ff',
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="حذف">
                    <Button
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(record)}
                      style={{
                        backgroundColor: '#fff1f0',
                        border: 'none',
                        color: '#ff4d4f',
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </Tooltip>
                </Space>
              )}
            />
          </MyTable>
        </div>

        {/* Modal الإضافة / التعديل */}
        <Modal
          open={editRecord !== null}
          title={editRecord?.key ? '✏️ تعديل المستخدم' : '➕ مستخدم جديد'}
          onCancel={() => setEditRecord(null)}
          onOk={handleSave}
          okText="💾 حفظ"
          cancelText="إلغاء"
          centered
        >
          <Form
            form={form}
            layout="vertical"
            style={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            <Form.Item
              name="firstName"
              label="الاسم الأول"
              rules={[{ required: true, message: 'الرجاء إدخال الاسم الأول' }]}
            >
              <Input placeholder="أدخل الاسم الأول" size="large" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="الاسم الأخير"
              rules={[{ required: true, message: 'الرجاء إدخال الاسم الأخير' }]}
            >
              <Input placeholder="أدخل الاسم الأخير" size="large" />
            </Form.Item>
            <Form.Item
              name="age"
              label="العمر"
              rules={[{ required: true, message: 'الرجاء إدخال العمر' }]}
            >
              <Input type="number" placeholder="أدخل العمر" size="large" />
            </Form.Item>
            <Form.Item
              name="address"
              label="العنوان"
              rules={[{ required: true, message: 'الرجاء إدخال العنوان' }]}
            >
              <Input placeholder="أدخل العنوان الكامل" size="large" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default TalbePage;

