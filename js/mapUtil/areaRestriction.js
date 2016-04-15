/**
 * Created by Administrator on 2016/4/7.
 */
/**
 * @fileoverview �ٶȵ�ͼ������������࣬���⿪�š�
 * �������������޶�����ĵ�ͼ�����Boundsֵ��
 * ���ͼ�����ֻ�����޶������������ͼ��
 * ����Baidu Map API 1.2��
 *
 * @author Baidu Map Api Group
 * @version 1.2
 */

/**
 * @namespace BMap������library�������BMapLib�����ռ���
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function() {

    /**
     * @exports AreaRestriction as BMapLib.AreaRestriction
     */
    var AreaRestriction =
    /**
     * AreaRestriction�࣬��̬�࣬����ʵ����
     * @class AreaRestriction���ṩ�Ķ��Ǿ�̬����������ʵ��������ʹ�á�
     */
        BMapLib.AreaRestriction = function(){
        }

    /**
     * �Ƿ��Ѿ���������й��޶��ı�ʶ
     * @private
     * @type {Boolean}
     */
    var _isRestricted = false;

    /**
     * map����
     * @private
     * @type {BMap}
     */
    var _map = null;

    /**
     * ��������Ҫ�޶�������
     * @private
     * @type {BMap.Bounds}
     */
    var _bounds = null;

    /**
     * �Կ������ͼ������޶�����
     * @param {BMap} map map����
     * @param {BMap.Bounds} bounds ��������Ҫ�޶�������
     *
     * @return {Boolean} ����˶���������Ƽ�����true������Ϊfalse
     */
    AreaRestriction.setBounds = function(map, bounds){
        // ��֤����ֵ�ĺϷ���
        if (!map ||
            !bounds ||
            !(bounds instanceof BMap.Bounds)) {
            throw "���鴫�����ֵ�ĺϷ���";
            return false;
        }

        if (_isRestricted) {
            this.clearBounds();
        }
        _map = map;
        _bounds = bounds;

        // ��ӵ�ͼ��moving�¼������Զ�������������
        _map.addEventListener("moveend", this._mapMoveendEvent);
        _isRestricted = true;
        return true;
    };

    /**
     * ��Ҫ���ڵ�ͼ�ƶ��¼��еĲ�������Ҫ���Ƴ���ʱ�ĵ�ͼ���¶�λ
     * @param {Event} e e����
     *
     * @return �޷���ֵ
     */
    var center;
    AreaRestriction._mapMoveendEvent = function(e) {
        // �����ǰ��ȫû�г��磬���޲���
        if (_bounds.containsBounds(_map.getBounds())) {
             center=_map.getCenter();
            return;
        }else{
            if(typeof center!='undefined'){
             _map.panTo(center);
            }else{
                _map.panTo(translatePoint(startPoint));
            }
       /* // ������Ҫ�Աȵ�bound����ı߽�ֵ
        var curBounds = _map.getBounds(),
            curBoundsSW = curBounds.getSouthWest(),
            curBoundsNE = curBounds.getNorthEast(),
            _boundsSW = _bounds.getSouthWest(),
            _boundsNE = _bounds.getNorthEast();
            console.log(curBoundsSW,curBoundsNE,_boundsSW,_boundsNE);
        // ��Ҫ���㶨λ���ĵ���ĸ��߽�
        var boundary = {n : 0, e : 0, s : 0, w : 0};

         // ������Ҫ��λ�����ĵ���Ϸ��߽�
        boundary.n = (curBoundsNE.lat < _boundsNE.lat) ? curBoundsNE.lat : _boundsNE.lat;

        // ������Ҫ��λ�����ĵ���ұ߽߱�
        boundary.e = (curBoundsNE.lng < _boundsNE.lng) ? curBoundsNE.lng : _boundsNE.lng;

        // ������Ҫ��λ�����ĵ���·��߽�
        boundary.s = (curBoundsSW.lat < _boundsSW.lat) ? _boundsSW.lat : curBoundsSW.lat;

        // ������Ҫ��λ�����ĵ����߽߱�
        boundary.w = (curBoundsSW.lng < _boundsSW.lng) ? _boundsSW.lng : curBoundsSW.lng;*/

        }
        /*  // �����µ����ĵ�
        var center = new BMap.Point(boundary.w + (boundary.e - boundary.w) / 2,
            boundary.s + (boundary.n - boundary.s) / 2);
        setTimeout(function() {
            _map.panTo(center, {noAnimation : "no"});
        }, 1);*/
    };

    /**
     * ����Ե�ͼ��������޶���״̬
     * @return �޷���ֵ
     */
    AreaRestriction.clearBounds = function(){
        if (!_isRestricted) {
            return;
        }
        _map.removeEventListener("moveend", this._mapMoveendEvent);
        _isRestricted = false;
    };

})();