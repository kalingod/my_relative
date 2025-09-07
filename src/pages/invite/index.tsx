import { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { RelationshipTypeLabel } from '../../types/relationship';

const relationOptions = Object.entries(RelationshipTypeLabel).map(([value, label]) => ({ label, value }));

interface InviteItem {
  id: string;
  fromName: string;
  type: string;
  time: string;
}

const fetchInbox = async (): Promise<InviteItem[]> => {
  return [
    { id: '1', fromName: '张三', type: '朋友', time: '2024-01-01' },
    { id: '2', fromName: '匿名', type: '同事', time: '2024-01-02' }
  ];
};

const createInvite = (payload) => {
  console.log('createInvite', payload);
  Taro.showToast({ title: '创建成功', icon: 'success' });
};

const respondInvite = (id: string, action: 'accept' | 'reject') => {
  console.log(id, action);
  Taro.showToast({ title: action === 'accept' ? '已接受' : '已拒绝', icon: 'none' });
};

const InvitePage: React.FC = () => {
  const [type, setType] = useState(relationOptions[0]);
  const [code, setCode] = useState('');
  const [note, setNote] = useState('');
  const [inbox, setInbox] = useState<InviteItem[]>([]);

  useEffect(() => {
    fetchInbox().then(setInbox);
  }, []);

  const submit = () => {
    createInvite({ type: type.value, code, note });
    setCode('');
    setNote('');
  };

  const handleRespond = (id: string, action: 'accept' | 'reject') => {
    respondInvite(id, action);
    setInbox(inbox.filter(i => i.id !== id));
  };

  return (
    <View className='invite-page'>
      <View className='create'>
        {/* @ts-ignore */}
        <t-picker value={type.value} columns={[relationOptions]} onChange={(e) => setType(e.detail.value[0])}>
          {/* @ts-ignore */}
          <t-button>{type.label}</t-button>
        </t-picker>
        {/* @ts-ignore */}
        <t-input value={code} placeholder='对方代码' onChange={e => setCode(e.detail.value)} />
        {/* @ts-ignore */}
        <t-input value={note} placeholder='备注' onChange={e => setNote(e.detail.value)} />
        {/* @ts-ignore */}
        <t-button block onClick={submit}>提交</t-button>
      </View>
      <View className='inbox'>
        {inbox.map(item => (
          <View key={item.id} className='invite-item'>
            <View className='info'>{item.fromName} - {item.type} - {item.time}</View>
            <View className='actions'>
              {/* @ts-ignore */}
              <t-button size='small' onClick={() => handleRespond(item.id, 'accept')}>接受</t-button>
              {/* @ts-ignore */}
              <t-button size='small' variant='outline' onClick={() => handleRespond(item.id, 'reject')}>拒绝</t-button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default InvitePage;
