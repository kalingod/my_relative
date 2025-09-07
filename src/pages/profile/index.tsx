import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppStore } from '../../store/app';

const ProfilePage: React.FC = () => {
  const { isPublicIdentity, setPublicIdentity, displayName, setDisplayName } = useAppStore();

  const handleBlack = () => {
    Taro.showToast({ title: '拉黑占位', icon: 'none' });
  };

  const handleReport = () => {
    Taro.showToast({ title: '举报占位', icon: 'none' });
  };

  return (
    <View className='profile'>
      {/* @ts-ignore */}
      <t-cell-group>
        {/* @ts-ignore */}
        <t-cell title='公开我的身份'>
          {/* @ts-ignore */}
          <t-switch slot='right' checked={isPublicIdentity} onChange={e => setPublicIdentity(e.detail.value)} />
        </t-cell>
        {/* @ts-ignore */}
        <t-cell title='展示名'>
          {/* @ts-ignore */}
          <t-input slot='right' value={displayName} onChange={e => setDisplayName(e.detail.value)} />
        </t-cell>
        {/* @ts-ignore */}
        <t-cell title='拉黑' onClick={handleBlack} isLink />
        {/* @ts-ignore */}
        <t-cell title='举报' onClick={handleReport} isLink />
      </t-cell-group>
    </View>
  );
};

export default ProfilePage;
