import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { RelationshipTypeLabel } from '../../types/relationship';

const groups: Record<string, { id: string; name: string }[]> = {
  spouse: [{ id: 'u1', name: 'Alice' }],
  friend: [
    { id: 'u2', name: 'Bob' },
    { id: 'u3', name: 'Carol' }
  ],
  colleague: [{ id: 'u4', name: 'Dave' }],
  classmate: [{ id: 'u5', name: 'Eve' }]
};

const RelationsPage: React.FC = () => {
  const jump = (id: string) => {
    Taro.navigateTo({ url: `/pages/user/public?id=${id}` });
  };

  return (
    <View className='relations'>
      {Object.keys(groups).map(key => (
        <View key={key} className='group'>
          <View className='group-title'>{RelationshipTypeLabel[key as keyof typeof RelationshipTypeLabel]}</View>
          {groups[key].map(person => (
            <View key={person.id} className='person' onClick={() => jump(person.id)}>
              {person.name}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default RelationsPage;
