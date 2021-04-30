import React from "react";
import ReactEcharts from 'echarts-for-react';
/*
*传进data作为绘图数据；
*data[{name:'',value:''},...]
*/

class BarChart extends React.Component {

  constructor(props) {
    super(props)
    this.setChart = this.setChart.bind(this)
  }

  setChart() {
    const color = [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc"
    ];
    const label = this.props.label;
    const {category,value} = this.props.data;
    const lenght = value.length;
    const dataValue = []
    value.forEach((item,index) => {
      dataValue.push({value:item,itemStyle:{color:color[index%lenght]}})
    })
    
    // data.forEach(dataItem => {
    //   dataValue.push(dataItem.value)
    //   category.push(dataItem.name)
    // })

    return {
      tooltip: {
        trigger: 'axis',
      },
      // grid: {
      //   left: '30%',
      //   right: '4%',
      //   bottom:'10%'
      // },
      xAxis: [
        {
          axisLabel:{
            interval:0,
            rotate:40,
          },
          
          position:'bottom',
          type: 'category',
          nameLocation:'center',
          //nameGap:'30',
          // nameTextStyle:{
          //   fontSize:'20',
          // },
          data:category,
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: label,
          nameLocation:'center',
          nameGap:'80',
          nameTextStyle:{
            fontSize:'16',
          },
          axisLabel: {
            formatter: '{value}'
          },
        }
      ],
      series: [
        {
          type: 'bar',
          name:label,
          //barWidth: '80%',
          label: {
            show: true,
            position: 'outside',
            color: '#ffffff',
            
          },
          //data:dataValue
          // markPoint: {
          //   data: [
          //       {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
          //       {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
          //   ]
          // },
          data:dataValue
        }
      ]
    }
  }

  render(){
    return (
      <ReactEcharts option={this.setChart()} />
    )
  }
}

BarChart.defaultProps={
  data:{
    title:'',
    data:{
      category:[],
      value:[],
    }
  }
}

export default BarChart;
