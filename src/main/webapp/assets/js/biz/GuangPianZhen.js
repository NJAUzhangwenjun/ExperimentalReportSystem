$(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 8
            },
            dataType: "json",
            success: function (result) {
                if (result.status === 10) {
                    alert("实验已关闭，请联系实验老师");
                    location.href = "../index.html";
                }
            },
            error: function (result) {
                alert("向服务器请求数据失败" + result);
            }
        });

        $.ajax({
            type: "GET",
            url: "/score/is_stu_have_score.do",
            data: {
                expId: 8
            },
            dataType: "json",
            success: function (res) {
                if (res.status === 0) {
                    //用户未提交过此实验
                } else if (res.status === 2) {
                    location.href = "../login.html";
                } else if (res.status === 15) {
                    alert("您已提交过此实验，如有疑问请联系实验老师");
                    location.href = "../index.html";
                } else {
                    alert("服务器发生错误");
                }
            },
            error: function (res) {
                alert("向服务器请求数据失败" + res);
            }
        });
    }
);


function submitAll() {

    if (confirm("为避免数据丢失，提交前请先将实验数据截图，确认提交吗？")) {
        uploadChart("chart1", 1);
        uploadChart("chart2", 2);
        submit();
    }
}


function submit() {
    var choice = new Array();
    var table1 = new Array();
    var table2 = new Array();
    var table3 = new Array();
    var blank = new Array();
    // var chart1 = new Array();


    for (var i = 1; i <= 16; i++) {
        choice[i - 1] = $("#choice_" + i + "").val();
    }

    for (var i = 1; i <= 10; i++) {
        table1[i - 1] = $("#table1_" + i + "").val();
    }
    for (var i = 1; i <= 10; i++) {
        table2[i - 1] = $("#table2_" + i + "").val();
    }

    for (var i = 1; i <= 13; i++) {
        table3[i - 1] = $("#table3_" + i + "").val();
    }

    /**
     * 测试blank
     * */
    // alert("blank=============");//---------------------------------------------------
    for (var i = 1; i <= 4; i++) {
        blank[i - 1] = $("#blank_" + i + "").val();
    }


    // for (var i = 0; i < blank.length; i++) {
    //     alert("blank_______==="+blank[i]);
    // }

    $.ajax({
        type: "POST",
        url: "/sub/Exp_8.do",
        data: {
            choice: choice,
            blank: blank,
            table1: table1,
            table2: table2,
            table3: table3,
            // chart1: chart1,
        },
        async: false,
        dataType: "json",
        success: function (result) {
            if (result.status === 15)
                alert("请勿多次提交试验");
            else if (result.status === 10)
                alert("实验已关闭,如有疑问请联系实验老师");
            else {
                alert("提交成功");
                location.href = "../index.html"
            }
        },
        error: function (result) {
            alert("服务器请求失败，请确认数据填写正确且完整后重试" + result);
        }
    });
}

/**
 * 生成数据和图像
 */

var outdataUhs = new Array();
var myRegression;

function productDataAndPicture1() {

    var table = new Array();
    var table_out = new Array();

    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table[i - 1] = $("#table1_" + i + "").val();
    }

    /**
     * 点数据
     */
    var angle = 90;
    for (var i = 1; i <= table.length; i++) {

        /*计算弧度作为x轴*/
        angle = 90 - (i - 1) * 10;
        //假设角度为60度
        var radian = angle * Math.PI / 180;    //计算出弧度
        var cos2 = Math.cos(radian) * Math.cos(radian);
        var data1 = new Array();
        data1[0] = cos2;
        data1[1] = parseFloat(table[i]);
        outdataUhs[i - 1] = data1;
    }


    /**
     * 调用函数生成回归曲线
     */
    myRegression = ecStat.regression('linear', outdataUhs);

    /**
     * 图像自动生成
     */
    getChart(1, outdataUhs, myRegression);

    /**
     * 赋值表达式和参数
     */
    $("#blank_2").attr("value", myRegression.parameter.gradient.toFixed(2));
}


function productDataAndPicture2() {

    var table = new Array();
    var table_out = new Array();

    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table[i - 1] = $("#table2_" + i + "").val();
    }

    /**
     * 点数据
     */
    var angle = 90;
    for (var i = 1; i <= table.length; i++) {

        /*计算弧度作为x轴*/
        angle = 90 - (i - 1) * 10;
        //假设角度为60度
        var radian = angle * Math.PI / 180;    //计算出弧度
        var cos2 = Math.cos(radian) * Math.cos(radian);
        var data1 = new Array();
        data1[0] = cos2;
        data1[1] = parseFloat(table[i]);
        outdataUhs[i - 1] = data1;
    }


    /**
     * 调用函数生成回归曲线
     */
    myRegression = ecStat.regression('linear', outdataUhs);

    /**
     * 图像自动生成
     */
    getChart(2, outdataUhs, myRegression);

    /**
     * 赋值表达式和参数
     */
    $("#blank_4").attr("value", myRegression.parameter.gradient.toFixed(2));
}

/*function getData() {
    var table = new Array();
    var table_out = new Array();
    var table_outB = new Array();

    /!**
     * 获取表单数据
     *!/
    for (var i = 1, j = 0; i <= 6; i++) {
        table[j++] = $("#table3_" + i + "").val();
    }

    /!**
     * 将表单数据放入输出变量中
     *!/



    {
        var i = 1;
        $("#table3_" + 7 + "").attr("value", Math.abs(table[1] - table[0]));
        $("#table3_" + 8 + "").attr("value", Math.tan(Math.abs(table[1] - table[0]) * Math.PI / 180));
    }
    {
        var i = 3;
        $
        ("#table3_" + 9 + "").attr("value", Math.abs(table[2] - table[3]));
        $("#table3_" + 10 + "").attr("value", Math.tan(Math.abs(table[2] - table[3]) * Math.PI / 180));
    }
    {
        var i = 5;
        $("#table3_" + 11 + "").attr("value", Math.abs(table[4] - table[5]));
        $("#table3_" + 12 + "").attr("value", Math.tan(Math.abs(table[4] - table[5]) * Math.PI / 180));

    }
    $("#table3_" + 13 + "").attr("value", (((Math.tan(Math.abs(table[1] - table[0]) * Math.PI / 180)) + Math.tan(Math.abs(table[2] - table[3]) * Math.PI / 180) + Math.tan(Math.abs(table[4] - table[5]) * Math.PI / 180)) / 3).toFixed(2));
}*/

function getData() {
    // var table = new Array();
    // var table_out = new Array();
    // var table_outB = new Array();

    /**
     * 获取表单数据
     */


    /**
     * 将表单数据放入输出变量中
     */

        // for (var i = 1, j = 0; i < 6  ; i+=2) {
        //     $("#table3_" + (i + 6)+"").attr("value", Math.abs(table[i+1] - table[i]));
        //     $("#table3_" + (i + 7)+"").attr("value", Math.tan(Math.abs(table[i+1] - table[i]) * Math.PI / 180));
        //
        // }

    var x1 = parseFloat($("#table3_1").val());
    var x2 = parseFloat($("#table3_2").val());
    var x3 = parseFloat($("#table3_3").val());
    var x4 = parseFloat($("#table3_4").val());
    var x5 = parseFloat($("#table3_5").val());
    var x6 = parseFloat($("#table3_6").val());
    var y1 = Math.abs(x1 - x2) > 250 ? 360 - Math.abs(x1 - x2) : Math.abs(x1 - x2);
    var y2 = Math.abs(x3 - x4) > 250 ? 360 - Math.abs(x3 - x4) : Math.abs(x3 - x4);
    var y3 = Math.abs(x5 - x6) > 250 ? 360 - Math.abs(x5 - x6) : Math.abs(x5 - x6);
    $("#table3_7").val(y1);
    $("#table3_9").val(y2);
    $("#table3_11").val(y3);
    var z1 = parseFloat($("#table3_7").val());
    var z2 = parseFloat($("#table3_9").val());
    var z3 = parseFloat($("#table3_11").val());
    var t1 = Math.tan(Math.abs(z1) * Math.PI / 180).toFixed(3);
    var t2 = Math.tan(Math.abs(z2) * Math.PI / 180).toFixed(3);
    var t3 = Math.tan(Math.abs(z3) * Math.PI / 180).toFixed(3);
    $("#table3_8").val(t1);
    $("#table3_10").val(t2);
    $("#table3_12").val(t3);
    var m1 = parseFloat($("#table3_8").val());
    var m2 = parseFloat($("#table3_10").val());
    var m3 = parseFloat($("#table3_12").val());
    var n = Math.abs((m1 + m2 + m3) / 3).toFixed(3);
    $("#table3_13").val(n);

    // var y1 = Math.abs(table[0] - table[1])>300 ? 360-Math.abs(table[0] - table[1]):Math.abs(table[0] - table[1])
    // $("#table3_11").attr("value", Math.abs(y1));
    // $("#table3_12").attr("value", Math.tan(Math.abs(y1) * Math.PI / 180));
    //
    // var y2 = Math.abs(table[2] - table[3])>300 ? 360-Math.abs(table[2] - table[3]):Math.abs(table[2] - table[3])
    // $("#table3_11").attr("value", Math.abs(y2));
    // $("#table3_12").attr("value", Math.tan(Math.abs(y2) * Math.PI / 180));
    //
    // var y3 = Math.abs(table[4] - table[5])>300 ? 360-Math.abs(table[4] - table[5]):Math.abs(table[4] - table[5])
    // $("#table3_11").attr("value", Math.abs(y3));
    // $("#table3_12").attr("value", Math.tan(Math.abs(y3) * Math.PI / 180));
    //
    // $("#table3_13").attr("value", ( Math.tan(Math.abs(y1) * Math.PI / 180) +Math.tan(Math.abs(y2) * Math.PI / 180) +Math.tan(Math.abs(y3) * Math.PI / 180)) / 3 .toFixed(3));
}


/**
 * 提交图片
 * @param chart
 * @param index
 */
function uploadChart(chart, index) {
    // 获取Canvas的编码。
    var imgData = document.getElementById(chart).toDataURL("image/png");
    /** 这里-报错×******/

    // 上传到后台。
    $.ajax({
        type: "post",
        url: "/exp/upload_chart.do",
        data: {
            image: imgData.substring(22),
            expId: 8,
            index: index
        },
        async: false,
        success: function (res) {
        },
        error: function (res) {
            alert("向服务器请求数据失败" + res.msg)
        }

    })
}
