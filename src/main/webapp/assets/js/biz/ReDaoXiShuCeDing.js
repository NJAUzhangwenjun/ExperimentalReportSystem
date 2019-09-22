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


    /**
     * 计算页面均值
     */
    add("#input_7", 1, 6, 6000);
    add("#input_14", 8, 6, 12000);


    var table = new Array();
    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table[i - 1] = $("#input_" + (i + 16) + "").val();
    }

    /**
     * 点数据
     */
    for (var i = 1; i <= 5; i++) {
        var data1 = new Array();
        data1[0] = parseFloat(table[i - 1]);
        data1[1] = parseFloat(table[i - 1 + 5]);
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

    var number = Math.abs(T) / Math.abs(t);

    $("#input_27").attr("value", number.toFixed(4));


    //function addParameter(getElementId,toDataId,hh1Id,rr1Id,t1Id,t2Id)

    addParameter("#input_27", "#input_56", "#input_7", "#input_14", "#input_15", "#input_16");
}


function productDataAndPicture2() {

    /**
     * 计算页面均值
     */
    add("#input_34", 28, 6, 6000);
    add("#input_41", 35, 6, 12000);

    var table = new Array();
    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 10; i++) {
        table[i - 1] = $("#input_" + (i + 43) + "").val();
    }

    /**
     * 点数据
     */
    for (var i = 1; i <= 5; i++) {
        var data1 = new Array();
        data1[0] = parseFloat(table[i - 1]);
        data1[1] = parseFloat(table[i - 1 + 5]);
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
    var number = Math.abs(T) / Math.abs(t);

    $("#input_54").attr("value", number.toFixed(4));
}

/**
 *  计算页面均值
 * @param id 要返回的数值的id（页面）
 * @param off 起始位置
 * @param len 长度
 * @param el 被除数
 */

/**
 * @param id
 * @param off
 * @param len
 * @param el
 */

function add(id, off, len, el) {
//add("#input_7", 1, 6, 6000);
    var ret = 0;
    for (var i = off; i < off + len; i++) {
        var val = parseFloat($("#input_" + i + "").val());
        ret += val;
    }
    $(id).attr("value", (ret / el).toFixed(4));

    addParameter("#input_54", "#input_57", "#input_34", "#input_41", "#input_42", "#input_43");

}

/**
 *
 * @param getElementId 页面获取的 dev T 的id
 * @param toDataId  赋值
 * @param hh1Id
 * @param rr1Id
 * @param t1Id
 * @param t2Id
 */
function addParameter(getElementId, toDataId, hh1Id, rr1Id, t1Id, t2Id) {
    var lambda1 = -(0.823 * 385 * parseFloat($(hh1Id).val())) / (3.14 * parseFloat($(rr1Id).val()) * parseFloat($(rr1Id).val())) / (parseFloat($(t2Id).val()) - parseFloat($(t1Id).val())) * (2 * 0.00801 + 0.065) / (2 * 0.00801 + 2 * 0.065) * parseFloat($(getElementId).val());
    $(toDataId).attr("value", (lambda1).toFixed(3));


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
