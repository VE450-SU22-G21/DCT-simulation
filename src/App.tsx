import React from 'react';
import type { NodeStyle, GraphinData, LegendChildrenProps } from '@antv/graphin';
import Graphin, { Components } from '@antv/graphin';
import IconLoader from '@antv/graphin-icons';
import './App.css';

enum InfectStatus {
  Susceptible = 'Susceptible',
  Exposed = 'Exposed',
  Infectious = 'Infectious',
  Recovered = 'Recovered'
}

const Color = {
  [InfectStatus.Susceptible]: '#6E85B7',
  [InfectStatus.Exposed]: '#FBB454',
  [InfectStatus.Infectious]: '#F37878',
  [InfectStatus.Recovered]: '#53BF9D',
}

const icons = Graphin.registerFontFamily(IconLoader);
const { Legend } = Components;

const rawNodeData = [
  {
    id: '1',
    type: InfectStatus.Susceptible,
    x: 100,
    y: 100
  },
  {
    id: '2',
    type: InfectStatus.Exposed,
    x: 200,
    y: 200
  },
  {
    id: '3',
    type: InfectStatus.Infectious,
    x: 100,
    y: 300
  },
  {
    id: '4',
    type: InfectStatus.Recovered,
    x: 600,
    y: 300
  },
  {
    id: '5',
    type: InfectStatus.Susceptible,
    x: 100,
    y: 400
  },
]


const normalStyle: (id: string, status: InfectStatus) => Partial<NodeStyle> = (id, status) => ({
  keyshape: {
    size: 60,
    fillOpacity: 0.2,
    stroke: Color[status],
    fill: Color[status],
  },
  icon: {
    type: 'font',
    fontFamily: 'graphin',
    value: icons.user,
    size: 30,
    fill: Color[status]
  },
  label: {
    value: id
  }
});

const undirecEdgeStyle = {
  keyshape: {
    stroke: '#000',
    endArrow: {
      path: 'M 0,0 L 8,0 Z',
      fill: '#000',
      stroke: '#000'
    },
  },
};

const data: GraphinData = {
  nodes: rawNodeData.map(d => ({
    id: `node-${d.id}`,
    x: d.x,
    y: d.y,
    data: {
      type: d.type
    },
    style: normalStyle(`node-${d.id}`, d.type)
  })),
  edges: [
    {
      source: "node-1",
      target: "node-2",
      style: undirecEdgeStyle,
    }
  ]
};



console.log(data)

function App() {
  return (
    <div className="App">
      <header className="main">
        <Graphin data={data} layout={{ type: 'preset' }}>
          <Legend bindType="node" sortKey="data.type">
          {(renderProps: LegendChildrenProps) => {
            console.log('renderProps', renderProps);
            return <Legend.Node {...renderProps} />;
          }}
        </Legend>
        </Graphin>
      </header>
    </div>
  );
}

export default App;
