/**
 * 图形生成
 */

function getChart(outdataUhs, outdataUhs1) {
    var myChart = echarts.init(document.getElementById("main"));
    window.onresize = myChart.resize;
    option = {
        xAxis: {
            min: -60
        },
        yAxis: {
            min: -60
        },
        series: [
            {
                symbolSize: 1,
                data: [
                    [60, 60]
                ],
                type: 'scatter'
            },
            {
                symbolSize: 800,
                data: [
                    [0, 0]
                ],
                type: 'scatter'
            },
            {
                symbolSize: 700,
                data: [
                    [0, 0]
                ],
                type: 'scatter'
            },
            {
                symbolSize: 600,
                data: [
                    [0, 0]
                ],
                type: 'scatter'
            },
            {
                symbolSize: 500,
                data: [
                    [0, 0]
                ],
                type: 'scatter'
            },
            {
                symbolSize: 400,
                data: [
                    [0, 0]
                ],
                type: 'scatter'
            }, {
                symbolSize: 300,
                data: [
                    [0, 0]
                ],
                type: 'scatter'
            }, {
                symbolSize: 200,
                data: [
                    [0, 0]
                ],
                type: 'scatter'
            }, {
                symbolSize: 100,
                data: [
                    [0, 0]
                ],
                type: 'scatter'
            },
            /**数据---------------------输入---------------------*/
            {
                symbolSize: 10,
                data: outdataUhs,
                itemStyle: {
                    normal: {
                        color: "#ff0c1e",
                        lineStyle: {
                            color: "#a1534c"
                        }
                    }
                },
                type: 'scatter'
            },
            {
                symbolSize: 10,
                data: outdataUhs1,
                itemStyle: {
                    normal: {
                        color: "#000000",
                        lineStyle: {
                            color: "#a1534c"
                        }
                    }
                },
                type: 'scatter'
            }

        ]
    };

    myChart.setOption(option, true);
    //给canvas添加id
    $("canvas").attr('id', "chart");

}
