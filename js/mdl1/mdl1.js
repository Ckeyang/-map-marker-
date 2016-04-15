/**
 * Created by Ckey on 2016/3/31.
 * 用来创建点数据的mdl1
 */
$('#gogogo').bind('click', function () {
    var num, level, speed;
    num = $('#num').val() != '' ? $('#num').val() : 2;
    level = $('#level').val() != '' ? $('#level').val() : 3;
    if ($('#speed').val() < 1000000) {
        speed = 5000000;
    }
    speed = $('#speed').val() != '' ? $('#speed').val() : 5000000;
    var data = createData(num, level, speed);
    execFirst(data);
});
function createNode(i, end, startPoint, speed) {
    var node = '{"sequence":' + i + ',"subpoint":' + end + ',"start":' + startPoint + ',"speed":' + speed + '},';
    return node;
}
function createData(num, level, speed) {
    var startPoint = '"' + createPoint() + '"';
    var content = '{ "flag":"start",' +
        '"point":{' +
        '"start":' + startPoint + ',' +
        '"speed":"' + speed + '",' +
        '"list":[';
    var cont = "";

    // for(var j=0;j<=num;j++){
    var start = [];
    for (var i = 1; i <= level; i++) {
        // {"sequence":1,"subpoint" : "116.3,39.9","start":"111.65,40.82","speed":1000000},
        var end;

        var ss = [];
        if (i === 1) {
            var substart = [];
            for (var t = 0; t < num; t++) {

                end = '"' + createPoint() + '"';
                substart.push(end);
            }
            for (var j = 1; j <= num; j++) {
                cont += createNode(i, substart[j - 1], startPoint, speed);
                ss.push(substart[j - 1]);
            }
        } else {

            for (var j = 1; j <= start.length; j++) {
                var substart = [];
                for (var t = 0; t < num; t++) {
                    end = '"' + createPoint() + '"';
                    substart.push(end);
                }
                for (var s = 0; s < num; s++) {
                    cont += createNode(i, substart[s], start[j - 1], speed);
                    ss.push(substart[s]);
                }
            }
        }
        start = ss;
    }
    // }

    content = content + cont;
    if (content.substr(content.length - 1, content.length) === ',') {
        content = content.substr(0, content.length - 1);
    }
    content = content + ']}}';
    console.log(content);
    return $.parseJSON(content);
}
function createPoint() {
    var point;
    var flag = Math.round(Math.random() * 2) % 2;
    var x = flag === 1 ? Math.round(Math.random() * 180) : (-1) * Math.round(Math.random() * 180);
    flag = Math.round(Math.random() * 2) % 2;
    var y = flag === 1 ? Math.round(Math.random() * 90) : (-1) * Math.round(Math.random() * 90);
    point = x + "," + y;
    return point;
}