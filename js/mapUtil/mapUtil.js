/**
 * Created by Administrator on 2016/4/5.
 */
/**
 * 创建坐标点marker
 * @param point
 * @returns {BMap.Marker}
 */
function addMarker(point) {  // 创建图标对象
    function pointMarker(point){
        this._point=point;
    }
    pointMarker.prototype = new BMap.Overlay();
    var p = pointMarker.prototype;
    p.initialize = function (map) {
        this._map = map;
        var canvas = this._canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.height=30;
        canvas.width=30;
        $(canvas).css({
            'webkit-transform': 'translate3d(0, 0, 0)',
            '-moz-transform': 'translate3d(0, 0, 0)',
            '-ms-transform': 'translate3d(0, 0, 0)',
            '-o-transform': 'translate3d(0, 0, 0)',
            'transform': 'translate3d(0, 0, 0)'
        });
        canvas.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        var ctx = canvas.getContext('2d');
        var img=new Image();
        img.src="../image/point.png";
        img.onload=function(){
            ctx.drawImage(img,11,11);
            ctx.beginPath();
        };
        map.getPanes().labelPane.appendChild(canvas);
        return canvas;
    }
    p.draw = function () {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._canvas.style.left = pixel.x - 22 + "px";
        this._canvas.style.top = pixel.y - 20 + "px";
    };
    var pointMarker = new pointMarker(translatePoint(point));

    return pointMarker;
}

/**
 * 创建爆炸效果的Marker
 * @param point
 */
function addFireMarker(point) {
    function fireMarker(point) {
        this._point = point;
    }

    fireMarker.prototype = new BMap.Overlay();
    var p = fireMarker.prototype;
    p.initialize = function (map) {
        this._map = map;
        var canvas = this._canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        $(canvas).css({
            'webkit-transform': 'translate3d(0, 0, 0)',
            '-moz-transform': 'translate3d(0, 0, 0)',
            '-ms-transform': 'translate3d(0, 0, 0)',
            '-o-transform': 'translate3d(0, 0, 0)',
            'transform': 'translate3d(0, 0, 0)'
        });
        canvas.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        var ctx = canvas.getContext('2d');
        /*爆炸效果*/
        var color = ["rgba(243,231,115,1)", "rgba(218,139,248,0.7)", "rgba(248,37,53,0.5)", "rgba(148,248,245,0.35)", "rgba(248,56,64,0.2)"];
        var i = 0;

        playIn();
        function playIn() {
            if (i < 10) {
                i++;

                    ctx.clearRect(0, 0, 40, 40);
                    var g1 = ctx.createRadialGradient(20, 20, 0, 20, 20, 20);
                    g1.addColorStop(1, color[(i + 4) % 5]);
                    g1.addColorStop(0.75, color[(i + 3) % 5]);
                    g1.addColorStop(0.5, color[(i + 2) % 5]);
                    g1.addColorStop(0.25, color[(i + 1) % 5]);
                    g1.addColorStop(0, color[i % 5]);
                    ctx.fillStyle = g1;
                    ctx.beginPath();
                    ctx.arc(20, 20, 20, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                    requestAnimationFrame(playIn);
            }
        }

        map.getPanes().labelPane.appendChild(canvas);
        return canvas;
    };
    p.draw = function () {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._canvas.style.left = pixel.x - 22 + "px";
        this._canvas.style.top = pixel.y - 20 + "px";
    };
    var firemarker = new fireMarker(translatePoint(point));

    setTimeout(stop, 600);
    function stop() {
        map.removeOverlay(firemarker);
    }

    map.addOverlay(firemarker);
}
/**
 * 创建有尾巴的marker
 * @param point
 * @returns {BMap.Marker}
 */
function addFlyMarker(point) {
    var myIcon = new BMap.Icon("../image/yes2.png", new BMap.Size(80, 15), {
        offset: new BMap.Size(10, 25)
    });
    var marker = new BMap.Marker(typeof (point) != 'string' ? point : translatePoint(point), {icon: myIcon});
    return marker;
}
/**
 * 翻译坐标点
 * @param point
 * @returns {BMap.Point}
 */
function translatePoint(point) {
    return new BMap.Point(point.split(',')[0], point.split(',')[1]);
}

/**
 * 计算角度
 * @param endPoint
 * @param startPoint
 * @returns {number}
 */
function calculationRotation(endPoint, startPoint) {
    var ep = map.pointToOverlayPixel(endPoint);
    var sp = map.pointToOverlayPixel(startPoint);
    if (typeof (ep) != 'undefined' && typeof (sp) != 'undefined') {
        var xb = ep.x - sp.x;
        var yb = ep.y - sp.y;
    } else {
        //  alert(ep,sp);
    }
    var result;
    if (xb > 0 && yb > 0) {
        xb = Math.abs(xb);
        yb = Math.abs(yb);
        var z = Math.sqrt(xb * xb + yb * yb);
        result = (90 - (Math.asin(xb / z) / Math.PI * 180));
    } else if (xb < 0 && yb > 0) {
        xb = Math.abs(xb);
        yb = Math.abs(yb);
        var z = Math.sqrt(xb * xb + yb * yb);
        result = Math.asin(xb / z) / Math.PI * 180 + 90;
    } else if (xb < 0 && yb < 0) {
        xb = Math.abs(xb);
        yb = Math.abs(yb);
        var z = Math.sqrt(xb * xb + yb * yb);
        result = (90 - (Math.asin(xb / z) / Math.PI * 180)) + 180;
    } else if (xb === 0 && yb != 0) {
        result = yb > 0 ? 90 : 270;
    } else if (yb === 0 && xb != 0) {
        result = xb > 0 ? 0 : 180;
    } else {
        xb = Math.abs(xb);
        yb = Math.abs(yb);
        var z = Math.sqrt(xb * xb + yb * yb);
        result = Math.asin(xb / z) / Math.PI * 180 + 270;
    }
    return Math.round(result);
}

/**
 * 计算经过的点
 * @param endPoint
 * @param startPoint
 * @param speed
 */
function calculationPath(endPoint, startPoint, speed) {
    var _x = endPoint.split(',')[0];
    var _y = endPoint.split(',')[1];
    var x = startPoint.split(',')[0];
    var y = startPoint.split(',')[1];
    var distense = calculationDistense(endPoint, startPoint);
    if (distense > minDistense) {
        var length;
        if (distense > 100) {
            length = Math.round(distense / speed * 20);
        }
        var path = [];
        var i = 1 / length;
        while (i < 1) {
            var xb, xy;
            xb = (i * _x) + ((1 - i) * x);
            xy = (i * _y) + ((1 - i) * y);
            path.push(xb + "," + xy);
            i = i + 1 / length;
        }
        var ps = [];
        path.forEach(function (item) {
            ps.push(translatePoint(item));
        });

        return ps;
    } else {
        return ps;
    }
}

/*获取显示范围*/
function get_bound(map) {
    var map = map;
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var obj = new Object();
    obj.top = ne.lat;
    obj.right = ne.lng;
    obj.left = sw.lng;
    obj.bottom = sw.lat;
    return obj;
}

/**
 * 计算两点的距离
 * @param endPoint
 * @param startPoint
 * @returns {*}
 */
function calculationDistense(endPoint, startPoint) {
    return map.getDistance(translatePoint(endPoint), translatePoint(startPoint));
}
/**
 * 画折线
 * @param startPoint
 * @param endPoint
 */
function drawLine(startPoint, endPoint) {
    var polyline = new BMap.Polyline();
    var arr = [];
    arr.push(translatePoint(startPoint));
    arr.push(translatePoint(endPoint));
    polyline.setPath(arr);
    polyline.setStrokeColor('red');
    polyline.setStrokeOpacity(1);
    polyline.setStrokeWeight(1);

    map.addOverlay(polyline);

}
/*eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('9 1d(a){6 b=m n.S("../T/1e.U",m n.E(23,20),{V:m n.E(10,25)});6 c=m n.W(F(a)!=\'X\'?a:o(a),{Y:b});r c}9 1f(f){9 G(a){s.N=a}G.Z=m n.11();6 p=G.Z;p.1g=9(b){s.12=b;6 c=s.O=1h.1i(\'1j\');c.H.1k=\'1l\';c.H.1m=n.11.1n(s.N.1o);6 d=c.1p(\'2d\');6 e=["B(1q,1r,1s,1)","B(1t,1u,I,0.7)","B(I,1v,1w,0.5)","B(1x,I,1y,0.1z)","B(I,1A,1B,0.2)"];6 i=0;P();9 P(){q(i!=10){i++;13(9(){d.1C(0,0,1D,1E);6 a=d.1F(20,20,0,20,20,20);a.C(1,e[(i+4)%5]);a.C(0.1G,e[(i+3)%5]);a.C(0.5,e[(i+2)%5]);a.C(0.25,e[(i+1)%5]);a.C(0,e[i%5]);d.1H=a;d.1I();d.1J(20,20,20,0,8.D*2,1K);d.1L();d.1M();P()},14)}}b.1N().1O.1P(c);r c};p.1Q=9(){6 a=s.12;6 b=a.Q(s.N);s.O.H.1R=b.x-22+"16";s.O.H.1S=b.y-20+"16"};6 g=m G(o(f));13(17,1T);9 17(){v.1U(g)}v.18(g)}9 1V(a){6 b=m n.S("../T/1W.U",m n.E(1X,15),{V:m n.E(10,25)});6 c=m n.W(F(a)!=\'X\'?a:o(a),{Y:b});r c}9 o(a){r m n.1Y(a.w(\',\')[0],a.w(\',\')[1])}9 1Z(a,b){6 c=v.Q(a);6 d=v.Q(b);q(F(c)!=\'19\'&&F(d)!=\'19\'){6 e=c.x-d.x;6 f=c.y-d.y}u{}6 g;q(e>0&&f>0){e=8.t(e);f=8.t(f);6 z=8.J(e*e+f*f);g=(K-(8.L(e/z)/8.D*A))}u q(e<0&&f>0){e=8.t(e);f=8.t(f);6 z=8.J(e*e+f*f);g=8.L(e/z)/8.D*A+K}u q(e<0&&f<0){e=8.t(e);f=8.t(f);6 z=8.J(e*e+f*f);g=(K-(8.L(e/z)/8.D*A))+A}u q(e===0&&f!=0){g=f>0?K:1a}u q(f===0&&e!=0){g=e>0?0:A}u{e=8.t(e);f=8.t(f);6 z=8.J(e*e+f*f);g=8.L(e/z)/8.D*A+1a}r 8.1b(g)}9 21(b,c,d){6 e=b.w(\',\')[0];6 f=b.w(\',\')[1];6 x=c.w(\',\')[0];6 y=c.w(\',\')[1];6 g=1c(b,c);q(g>24){6 h;q(g>14){h=8.1b(g/d*20)}6 j=[];6 i=1/h;26(i<1){6 k,R;k=(i*e)+((1-i)*x);R=(i*f)+((1-i)*y);j.M(k+","+R);i=i+1/h}6 l=[];j.27(9(a){l.M(o(a))});r l}u{r l}}9 1c(a,b){r v.28(o(a),o(b))}9 29(a,b){6 c=m n.2a();6 d=[];d.M(o(a));d.M(o(b));c.2b(d);c.2c(\'2e\');c.2f(1);c.2g(1);v.18(c)}',62,141,'||||||var||Math|function|||||||||||||new|BMap|translatePoint||if|return|this|abs|else|map|split||||180|rgba|addColorStop|PI|Size|typeof|fireMarker|style|248|sqrt|90|asin|push|_point|_canvas|playIn|pointToOverlayPixel|xy|Icon|image|png|offset|Marker|string|icon|prototype||Overlay|_map|setTimeout|100||px|stop|addOverlay|undefined|270|round|calculationDistense|addMarker|point|addFireMarker|initialize|document|createElement|canvas|position|absolute|zIndex|getZIndex|lat|getContext|243|231|115|218|139|37|53|148|245|35|56|64|clearRect|300|150|createRadialGradient|75|fillStyle|beginPath|arc|true|closePath|fill|getPanes|labelPane|appendChild|draw|left|top|600|removeOverlay|addFlyMarker|yes2|80|Point|calculationRotation||calculationPath|||minDistense||while|forEach|getDistance|drawLine|Polyline|setPath|setStrokeColor||red|setStrokeOpacity|setStrokeWeight'.split('|'),0,{}))*/