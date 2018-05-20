//Rounded columns plugin
'use strict';
(function(factory) {
    if(typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function(Highcharts) {
    (function(H) {
        H.wrap(H.seriesTypes.column.prototype, 'translate', function(proceed) {
            const options = this.options;
            const topMargin = options.topMargin || 0;
            const bottomMargin = options.bottomMargin || 0;

            proceed.call(this);

            H.each(this.points, function(point) {
                if(options.borderRadiusTopLeft || options.borderRadiusTopRight || options.borderRadiusBottomRight || options.borderRadiusBottomLeft) {
                    const w = point.shapeArgs.width;
                    const h = point.shapeArgs.height;
                    const x = point.shapeArgs.x;
                    const y = point.shapeArgs.y;

                    var radiusTopLeft = H.relativeLength(options.borderRadiusTopLeft || 0, w);
                    var radiusTopRight = H.relativeLength(options.borderRadiusTopRight || 0, w);
                    var radiusBottomRight = H.relativeLength(options.borderRadiusBottomRight || 0, w);
                    var radiusBottomLeft = H.relativeLength(options.borderRadiusBottomLeft || 0, w);

                    const maxR = Math.min(w, h) / 2

                    radiusTopLeft = radiusTopLeft > maxR ? maxR : radiusTopLeft;
                    radiusTopRight = radiusTopRight > maxR ? maxR : radiusTopRight;
                    radiusBottomRight = radiusBottomRight > maxR ? maxR : radiusBottomRight;
                    radiusBottomLeft = radiusBottomLeft > maxR ? maxR : radiusBottomLeft;

                    point.dlBox = point.shapeArgs;

                    point.shapeType = 'path';
                    point.shapeArgs = {
                        d: [
                            'M', x + radiusTopLeft, y + topMargin,
                            'L', x + w - radiusTopRight, y + topMargin,
                            'C', x + w - radiusTopRight / 2, y, x + w, y + radiusTopRight / 2, x + w, y + radiusTopRight,
                            'L', x + w, y + h - radiusBottomRight,
                            'C', x + w, y + h - radiusBottomRight / 2, x + w - radiusBottomRight / 2, y + h, x + w - radiusBottomRight, y + h + bottomMargin,
                            'L', x + radiusBottomLeft, y + h + bottomMargin,
                            'C', x + radiusBottomLeft / 2, y + h, x, y + h - radiusBottomLeft / 2, x, y + h - radiusBottomLeft,
                            'L', x, y + radiusTopLeft,
                            'C', x, y + radiusTopLeft / 2, x + radiusTopLeft / 2, y, x + radiusTopLeft, y,
                            'Z'
                        ]
                    };
                }

            });
        });
    }(Highcharts));
}));





var data1 = [];
var data2 = [];
var data3 = [];

var i, tmp;

function makeData() {
    data1 = [];
    data2 = [];
    data3 = [];
    for (i = 0; i <= 28; i += 1) {
        tmp = Math.round(Math.random() * 100);

        if(tmp <= 25) {
            data1.push(tmp);
            data2.push(0);
            data3.push(0)
        } else if(tmp <= 50) {
            data1.push(0);
            data2.push(tmp);
            data3.push(0)
        } else {
            data1.push(0);
            data2.push(0);
            data3.push(tmp)
        }
    }
}

makeData();
var chart1 = Highcharts.chart('chart-1', {
    chart: {
        type: 'column',
        backgroundColor: 'transparent',
        spacingLeft: 50
    },
    title: {
        text: 'Pondělí',
        align: 'left',
        margin: 0
    },
    xAxis: {
        type: 'datetime',
        tickInterval: 3600 * 1000,
        labels: {
            rotation: 270
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            enabled: false
        },
        max: 100,
        gridLineWidth: 0,
        minorGridLineWidth: 0
    },
    tooltip: {
        formatter: function () {
            return 'Pravděpodobnost fronty pro čas <b>' + Highcharts.dateFormat('%H:%M',new Date(this.x)) +
                '</b> je <b>' + this.y + '%</b>';
        }
    },
    plotOptions: {
        column: {
            grouping: false,
            borderRadiusTopLeft: 10,
            borderRadiusTopRight: 10,
            pointStart: Date.UTC(2010, 0, 1, 8),
            pointInterval: 1800 * 1000,
            pointPadding: 0,
            groupPadding: 0,
            borderWidth: 0
        }
    },
    series:

        [{
            name: 'bez fronty',
            data: data1,
            color: '#ffc59b'

        },
            {
                name: 'možnost fronty',
                data: data2,
                color: '#f88c6c'
            },
            {
                name: 'pravděpodobné čekání ve frontě',
                data: data3,
                color: '#e64e21'
            }]
});

chart1.renderer.image('assets/img/chart-icon.png', 0, 105, 31, 50).add();
chart1.renderer.image('assets/img/clock.png', 5, 170, 19, 19).add();

makeData();
var chart2 = Highcharts.chart('chart-2', {
    chart: {
        type: 'column',
        backgroundColor: 'transparent',
        spacingLeft: 50
    },
    title: {
        text: 'Pondělí',
        align: 'left',
        margin: 0
    },
    xAxis: {
        type: 'datetime',
        tickInterval: 3600 * 1000,
        labels: {
            rotation: 270
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            enabled: false
        },
        max: 100,
        gridLineWidth: 0,
        minorGridLineWidth: 0
    },
    tooltip: {
        formatter: function () {
            return 'Pravděpodobnost fronty pro čas <b>' + Highcharts.dateFormat('%H:%M',new Date(this.x)) +
                '</b> je <b>' + this.y + '%</b>';
        }
    },
    plotOptions: {
        column: {
            grouping: false,
            pointStart: Date.UTC(2010, 0, 1, 8),
            pointInterval: 1800 * 1000,
            pointPadding: 0,
            groupPadding: 0,
            borderWidth: 0
        }
    },
    series:

        [{
            name: 'bez fronty',
            data: data1,
            color: '#ffc59b'

        },
            {
                name: 'možnost fronty',
                data: data2,
                color: '#f88c6c'
            },
            {
                name: 'pravděpodobné čekání ve frontě',
                data: data3,
                color: '#e64e21'
            }]
});

chart2.renderer.image('assets/img/chart-icon.png', 0, 105, 31, 50).add();
chart2.renderer.image('assets/img/clock.png', 5, 170, 19, 19).add();