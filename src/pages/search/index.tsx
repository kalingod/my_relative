import { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';

const fetchShortestPath = async (target: string, maxDepth = 4): Promise<string[]> => {
  if (target === 'demo') {
    return ['我', '好友', '同事', 'demo'];
  }
  return [];
};

const SearchPage: React.FC = () => {
  const [target, setTarget] = useState('');
  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    const params = getCurrentInstance().router?.params;
    if (params?.target) setTarget(params.target);
  }, []);

  const query = async () => {
    const res = await fetchShortestPath(target);
    if (res.length) {
      setPath(res);
    } else {
      setPath([]);
      Taro.showToast({ title: '未找到', icon: 'none' });
    }
  };

  const handleScan = () => {
    Taro.showToast({ title: '扫码占位', icon: 'none' });
  };

  return (
    <View className='search'>
      {/* @ts-ignore */}
      <t-input value={target} placeholder='目标用户代码' onChange={(e) => setTarget(e.detail.value)} />
      {/* @ts-ignore */}
      <t-button onClick={query} block>查询路径</t-button>
      {/* @ts-ignore */}
      <t-button onClick={handleScan} block variant='outline'>扫码</t-button>
      <View className='result'>
        {path.map((p, i) => (
          <View key={i}>
            {p}{i < path.length - 1 ? ' → ' : ''}
          </View>
        ))}
      </View>
    </View>
  );
};

export default SearchPage;
