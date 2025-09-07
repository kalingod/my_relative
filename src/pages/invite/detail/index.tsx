import { View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { RelationshipTypeLabel } from '../../../types/relationship';

const fetchInvite = (id: string) => ({
  id,
  fromName: '张三',
  type: 'friend',
  note: '一起喝茶',
  time: '2024-01-01'
});

const InviteDetail: React.FC = () => {
  const params = getCurrentInstance().router?.params || {};
  const id = params.id || 'demo_inv';
  const invite = fetchInvite(id);

  const handle = (act: 'accept' | 'reject') => {
    Taro.showToast({ title: act === 'accept' ? '已同意' : '已拒绝', icon: 'none' });
  };

  return (
    <View className='invite-detail'>
      <View>发起人: {invite.fromName}</View>
      <View>类型: {RelationshipTypeLabel[invite.type as any]}</View>
      <View>备注: {invite.note}</View>
      <View>时间: {invite.time}</View>
      {/* @ts-ignore */}
      <t-button onClick={() => handle('accept')}>同意</t-button>
      {/* @ts-ignore */}
      <t-button variant='outline' onClick={() => handle('reject')}>拒绝</t-button>
    </View>
  );
};

export default InviteDetail;
