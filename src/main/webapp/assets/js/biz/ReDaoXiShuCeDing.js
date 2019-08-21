$(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 10
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
                expId: 10
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
    var blank = new Array();
    // var chart1 = new Array();


    for (var i = 1; i <= 11; i++) {
        choice[i - 1] = $("#choice_" + i + "").val();
    }

    for (var i = 1; i <= 57; i++) {
        blank[i - 1] = $("#input_" + i + "").val();
    }
    $.ajax({
        type: "POST",
        url: "/sub/Exp_10.do",
        data: {
            choice: choice,
            blank: blank
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
    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table[i - 1] = $("#input_" + (i+16) + "").val();
    }

    /**
     * 点数据
     */
    for (var i = 1; i <= 5; i++) {
        var data1 = new Array();
        data1[0] = parseFloat(table[i-1]);
        data1[1] = parseFloat(table[i-1+5]);
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


    var t = table[0] - table[4];
    var T = table[5] - table[9];
    var number = Math.abs(t) / Math.abs(T);

    $("#input_27").attr("value",  number.toFixed(2));
}


function productDataAndPicture2() {
    var table = new Array();
    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table[i - 1] = $("#input_" + (i+43) + "").val();
    }

    /**
     * 点数据
     */
    for (var i = 1; i <= 5; i++) {
        var data1 = new Array();
        data1[0] = parseFloat(table[i-1]);
        data1[1] = parseFloat(table[i-1+5]);
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

    var t = table[0] - table[4];
    var T = table[5] - table[9];
    var number = Math.abs(t) / Math.abs(T);

    $("#input_54").attr("value", number.toFixed(2));
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
            expId: 10,
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
