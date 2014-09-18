function initRadar(){
    var radar = Snap("#radar");
    var radarMask = Snap("#mask");
    var radarMask2 = Snap("#mask2");
    var radarLines = Snap("#lines");
    var radarDots = Snap("#dots");

    var p = radar.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
        fill: "none",
        stroke: "#FFC575",
        strokeWidth: 5
    });

    p = p.pattern(0, 0, 10, 10);

    radarMask2.attr({
        fill: p
    });

    radarMask.attr({
        mask: radarMask2
    });

    radarMask.attr({fill: "r(0.5, 0.65, 0.6)#FFC575-#fff"});

    var radarGroup = radar.group(radarMask, radarLines, radarDots);

    var scale = 0;

    var box = radar.getBBox();
    var c = {x: box.cx, y: box.cy};

    function animate() {
        radarGroup.transform('s0,' + c.x + ',' + c.y)
        radarGroup.animate({ transform: 's1,' + c.x + ',' + c.y }, 1500, mina.elastic);
    }

    function clickAnimate() {
        radarGroup.animate({ transform: 's0.7,' + c.x + ',' + c.y }, 400, mina.bounce, function () {
            radarGroup.animate({ transform: 's1,' + c.x + ',' + c.y }, 300, mina.bounce);
        });
    }

    var animated = false;

    radar.click(clickAnimate);

    $(window).scroll(function () {
        if (!animated) {
            if ($('section#skills #radar-anchor-display').visible()) {
                $('section#skills').removeClass('loading');
                animate();
                animated = true;
            }
        }
    });
}