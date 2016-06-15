
/*
 * 过程阐述: 
 *
 * 注: 客户端可能在第一时间不会接到信号来进行页面跳转
 *     而是在数据加载后'end'动作执行后进行跳转
 *
 *
 * 问题阐述: 能否进行动态加载
 *           在一定时间加载失败后会不会后台程序会不会退出
 *           * 一次失败就会直接引起程序失败，程序不会刷新
 *           网络无连接时直接报错
 *           网络连接成功又挂掉后刷新会持续显示成功状态
 *
 */
var http = require('https');
var url = 'https://www.baidu.com';

var express = require('express');
var app = express();

var cheerio = require('cheerio');
var path = require('path');

function get_temp(html) {
    var $ = cheerio.load(html);
    var tm = $('#wob_tm').text();
}

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(express.static(path.join(__dirname, 'public')));

http.get(url, function(res){
    html = '';

    res.on('data', function(data) {
        html += data;
    });

    res.on('end', function() {
        //进行是否得到代码的逻辑判断
        if(html!=='') {
            app.get('/', function(req, res) {
                var date = new Date();
                var weekday = date.getDay();
                switch(weekday) {
                    case 1:
                        weekday = "Monday";
                        break;
                    case 2:
                        weekday = "Tuesday";
                        break;
                    case 3:
                        weekday = "Wednesday";
                        break;
                    case 4:
                        weekday = "Thursday";
                        break;
                    case 5: 
                        weekday = "Friday";
                        break;
                    case 6:
                        weekday = 'Saturday';
                        break;
                    case 7:
                        weekday = 'Sunday';
                        break;
                    default:
                        break;
                }

                var month = date.getMonth() + 1;
                switch(month) {
                    case 1:
                        month = 'January';
                        break;
                    case 2:
                        month = 'February';
                        break;
                    case 3:
                        month = 'March';
                        break;
                    case 4:
                        month = 'April';
                        break;
                    case 5:
                        month = 'May';
                        break;
                    case 6:
                        month = 'June';
                        break;
                    case 7:
                        month = 'July';
                        break;
                    case 8:
                        month = 'August';
                        break;
                    case 9:
                        month = 'September';
                        break;
                    case 10:
                        month = 'October';
                        break;
                    case 11:
                        month = 'November';
                        break;
                    case 12:
                        month = 'December';
                        break;
                    default:
                        break;
                }
                res.render('index', {
                    date: date,
                    year: date.getFullYear(),
                    month: month,
                    month_sta: date.getMonth() + 1,
                    day: date.getDate(),
                    inweek: weekday
                });
                console.log('测试成功');
            })
        }
        //由于异步的原因，html1要较于html后输出
    });
});




app.listen(1111);
