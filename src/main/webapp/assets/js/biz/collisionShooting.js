function theoreticalH() {
    var x = 20.4;
    var y = $("#table_1_2").val();
    var th = (x * x) / (4 * y);
    return th;
}

function addedH() {
    var x = 20.4;
    var y = $("#table_1_2").val();
    var avgX = $("#table_1_4").val();
    var ah = x * (x - avgX) / (2 * y);
    return ah;
}

function autoGenera1() {
    var th = theoreticalH();
    var ah = addedH();
    $("#table_1_3").val(th.toFixed(2));
    $("#table_1_5").val(ah.toFixed(2));
}

function autoGenera2() {
    var th = parseFloat($("#table_1_3").val());
    var rh = parseFloat($("#table_1_6").val());
    var m = parseFloat($("#table_1_1").val());
    var deltaE = m * 9.8 * (rh - th) * 1E-5;
    var deltaE2 = (rh - th) * 100 / th;
    // console.log(rh);
    // console.log(th);
    // console.log(rh - th);
    $("#blank_1").val(deltaE.toFixed(5));
    $("#blank_2").val(deltaE2.toFixed(2));
}


function submitAll() {
    if (confirm("为避免数据丢失，提交前请先将实验数据截图，确认提交吗？")) {
        uploadChart("chart", 1);
        submit();
    }
}

function submit() {
    var choice = new Array();
    var table1 = new Array();
    var table2 = new Array();
    var blank = new Array();


    for (var i = 1; i <= 10; i++) {
        choice[i - 1] = $("#choice_" + i + "").val();
    }

    for (var i = 1; i <= 6; i++) {
        table1[i - 1] = $("#table_1_" + i + "").val();
    }

    for (var i = 1; i <= 12; i++) {
        table2[i - 1] = $("#table_2_" + i + "").val();
    }

    for (var i = 1; i <= 2; i++) {
        blank[i - 1] = $("#blank_" + i + "").val();
    }

    $.ajax({
        type: "POST",
        url: "/sub/Exp_06.do",
        data: {
            choice: choice,
            blank: blank,
            table1: table1,
            table2: table2
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
            alert("向服务器请求数据失败" + result);
        }
    });
}


$(function () {
        $.ajax({
            type: "GET",
            url: "/exp/get_exp_status.do",
            data: {
                expId: 6
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
                expId: 6
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
            expId: 6,
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


/**
 * 生成数据和图像
 */
function productDataAndPicture() {
    var outdataUhs = new Array();
    var outdataUhs1 = new Array();

    var table = new Array();
    /**
     * 获取表单数据
     */
    for (var i = 1; i <= 12; i++) {
        table[i - 1] = parseFloat($("#table_2_" + (i) + "").val());
    }

    for (var i = 0; i < 12; i++) {
        if (i < 6) {
            table[i] = (table[i] - 20.4) * 10;
        } else {
            table[i] = table[i] * 10;
        }
    }


    /**
     * 点数据
     */
    for (var i = 1; i <= 6; i++) {
        if (i <= 3) {
            var data1 = new Array();
            data1[0] = table[i - 1];
            data1[1] = table[i - 1 + 6];
            outdataUhs[i - 1] = data1;
        } else {
            var data1 = new Array();
            data1[0] = table[i - 1];
            data1[1] = table[i - 1 + 6];
            outdataUhs1[i - 4] = data1;
        }
    }
    getChart(outdataUhs, outdataUhs1);
}
