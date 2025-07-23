import { Modal, Table } from 'antd';
import type { FC } from 'react';

interface Account {
  number: string;
  name: string;
}

interface Props {
  open: boolean;
  onSelect: (account: Account) => void;
  onClose: () => void;
}

const dummyAccounts: Account[] = [
  { number: '1010', name: 'الصندوق' },
  { number: '1020', name: 'البنك الأهلي' },
  { number: '1030', name: 'العملاء' },
];

const CostCenterSearchModal: FC<Props> = ({ open, onSelect, onClose }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="بحث الحسابات"
    >
      <Table
        rowKey="number"
        dataSource={dummyAccounts}
        columns={[
          { title: 'رقم الحساب', dataIndex: 'number' },
          { title: 'اسم الحساب', dataIndex: 'name' },
          {
            title: 'اختيار',
            render: (_, record) => (
              <a onClick={() => onSelect(record)}>اختيار</a>
            ),
          },
        ]}
        pagination={false}
      />
    </Modal>
  );
};

export default CostCenterSearchModal;
