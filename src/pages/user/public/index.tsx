import { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';

interface PublicUser {
  isPublic: boolean;
  displayName: string;
  avatar: string;
}

const fetchPublicUser = (id: string): PublicUser => {
  if (id === 'u1') {
    return { isPublic: true, displayName: '张三', avatar: 'https://via.placeholder.com/100' };
  }
  return { isPublic: false, displayName: '', avatar: '' };
};

const PublicUserPage: React.FC = () => {
  const [user, setUser] = useState<PublicUser>({ isPublic: false, displayName: '', avatar: '' });
  const [id, setId] = useState('');

  useEffect(() => {
    const params = getCurrentInstance().router?.params || {};
    const uid = params.id || 'unknown';
    setId(uid);
    setUser(fetchPublicUser(uid));
  }, []);

  const gotoPath = () => {
    Taro.navigateTo({ url: `/pages/search/index?target=${id}` });
  };

  return (
    <View className='public-user'>
      {user.isPublic ? (
        <>
          <Image className='avatar' src={user.avatar} />
          <View>{user.displayName}</View>
        </>
      ) : (
        <>
          <Image className='avatar' src='https://via.placeholder.com/100?text=%3F' />
          <View>匿名用户</View>
        </>
      )}
      {/* @ts-ignore */}
      <t-button onClick={gotoPath}>查看我与 TA 的路径</t-button>
    </View>
  );
};

export default PublicUserPage;
