import { useState, useEffect, useRef, useCallback } from 'react';
import { View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';

let echarts: any;
try {
  echarts = require('../../components/ec-canvas/echarts');
} catch (e) {
  // ignore
}

const graph1 = {
  nodes: [
    { id: 'me', name: '我' },
    { id: 'a', name: 'Alice' },
    { id: 'b', name: 'Bob' }
  ],
  links: [
    { source: 'me', target: 'a' },
    { source: 'me', target: 'b' }
  ]
};

const graph2 = {
  nodes: [
    { id: 'me', name: '我' },
    { id: 'a', name: 'Alice' },
    { id: 'b', name: 'Bob' },
    { id: 'c', name: 'Carol' },
    { id: 'd', name: 'Dave' }
  ],
  links: [
    { source: 'me', target: 'a' },
    { source: 'me', target: 'b' },
    { source: 'a', target: 'c' },
    { source: 'b', target: 'd' }
  ]
};

const Home: React.FC = () => {
  const [hop, setHop] = useState<1 | 2>(1);
  const [hasEc, setHasEc] = useState(true);
  const chartRef = useRef<any>(null);

  const data = hop === 1 ? graph1 : graph2;

  const getOption = useCallback((g) => ({
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        data: g.nodes,
        edges: g.links,
        force: { repulsion: 100 }
      }
    ]
  }), []);

  const initChart = useCallback((canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });
    canvas.setChart(chart);
    chartRef.current = chart;
    chart.setOption(getOption(data));
    return chart;
  }, [data, getOption]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.setOption(getOption(data));
    }
  }, [data, getOption]);

  useEffect(() => {
    const inst = getCurrentInstance();
    const comp = inst.page?.selectComponent?.('#graph');
    if (!comp) setHasEc(false);
  }, []);

  return (
    <View className='home'>
      {!hasEc && <View className='tip'>未检测到 ec-canvas，已使用简版展示</View>}
      <View className='header'>
        <View className='title'>我的图谱</View>
        <View className='desc'>你与世界的连接</View>
      </View>
      <View className='switch'>
        {/* @ts-ignore */}
        <t-button size='small' variant={hop === 1 ? 'base' : 'outline'} onClick={() => setHop(1)}>1跳</t-button>
        {/* @ts-ignore */}
        <t-button size='small' variant={hop === 2 ? 'base' : 'outline'} onClick={() => setHop(2)}>2跳</t-button>
      </View>
      {hasEc && echarts ? (
        // @ts-ignore
        <ec-canvas id='graph' canvas-id='graph' ec={{ onInit: initChart }} />
      ) : (
        <View className='fallback'>
          {data.nodes.map(n => <View key={n.id}>{n.name}</View>)}
        </View>
      )}
      {/* @ts-ignore */}
      <t-button className='relations-btn' block onClick={() => Taro.navigateTo({ url: '/pages/relations/index' })}>
        查看我的关系列表
      </t-button>
    </View>
  );
};

export default Home;
