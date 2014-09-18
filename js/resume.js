var charts = {
    bpi : [
        {
            value: 30,
            label: 'Front',
            color: '#7F623A'
        },
        {
            value: 20,
            label: 'Back',
            color: '#7F7361'
        },
        {
            value: 20,
            label: 'Architecture',
            color: '#CC9E5E'
        },
        {
            value: 20,
            label: 'Management',
            color: '#FFC575'
        },
        {
            value: 10,
            label: 'UX / Design',
            color: '#FFE5C1'
        }
    ],

    dailymotion : [
        {
            value: 50,
            label: 'Front',
            color: '#7F623A'
        },
        {
            value: 30,
            label: 'Management',
            color: '#FFC575'
        },
        {
            value: 20,
            label: 'UX / Design',
            color: '#FFE5C1'
        }
    ],

    hoppertiz : [
        {
            value: 40,
            label: 'Front',
            color: '#7F623A'
        },
        {
            value: 20,
            label: 'UX / Design',
            color: '#FFE5C1'
        },
        {
            value: 20,
            label: 'Back',
            color: '#7F7361'
        },
        {
            value: 10,
            label: 'Architecture',
            color: '#CC9E5E'
        },
        {
            value: 10,
            label: 'Management',
            color: '#FFC575'
        }
    ],

    hquest : [
        {
            value: 40,
            label: 'Front',
            color: '#7F623A'
        },
        {
            value: 20,
            label: 'Management',
            color: '#FFC575'
        },
        {
            value: 20,
            label: 'Back',
            color: '#7F7361'
        },
        {
            value: 10,
            label: 'UX / Design',
            color: '#FFE5C1'
        },
        {
            value: 10,
            label: 'Architecture',
            color: '#CC9E5E'
        }
    ],

    lvmh : [
        {
            value: 30,
            label: 'Front',
            color: '#7F623A'
        },
        {
            value: 30,
            label: 'Management',
            color: '#FFC575'
        },
        {
            value: 30,
            label: 'Architecture',
            color: '#CC9E5E'
        },
        {
            value: 10,
            label: 'Back',
            color: '#7F7361'
        }
    ],

    twincorp : [
        {
            value: 40,
            label: 'Front',
            color: '#7F623A'
        },
        {
            value: 30,
            label: 'Management',
            color: '#FFC575'
        },
        {
            value: 10,
            label: 'UX / Design',
            color: '#FFE5C1'
        },
        {
            value: 10,
            label: 'Architecture',
            color: '#CC9E5E'
        },
        {
            value: 10,
            label: 'Back',
            color: '#7F7361'
        }
    ]
}

$(function () {
    initRadar();

    function initImage($image){
        $image.mouseover(function(){
            var $this = $(this);
            $this.attr('src', 'img/video-button-hover.png');
        });

        $image.mouseout(function(){
            var $this = $(this);
            $this.attr('src', 'img/video-button.png');
        });

        $image.click(function(){
            var $image = $(this);
            var $wrapper = $image.parent();

            $image.remove();

            $wrapper.append('<iframe ' +
                'src="https://www.youtube.com/embed/'+ $wrapper.attr('data-video')+'?color=white&theme=light&showinfo=0&rel=0&modestbranding=1&autoplay=1" ' +
                'frameborder="0" ' +
                'allowfullscreen="true">' +
                '</iframe>');

            $wrapper.fitVids();
        });
    }

    $('.portfolio-modal .youtube-video img').each(function(){
        initImage($(this));
    });

    $('.portfolio-modal').on('hide.bs.modal', function (e) {
        var $wrapper = $(this).find('.youtube-video');
        if($wrapper.length != 0){
            $wrapper.html('<img src="img/video-button.png"/>');
            var $image = $wrapper.children('img');
            initImage($image);
        }

        $wrapper.parents('.portfolio-modal').off('scroll', '**');
    });

    $('.portfolio-modal').on('show.bs.modal', function (e) {
        var $svg = $(this).find('svg');
        var $parent = $svg.parent();

        $svg.remove();
        $parent.html('<svg version="1.0" xmlns="http://www.w3.org/2000/svg"'+
        'x="0px" y="0px" width="350px" height="200px" viewBox="0 0 350 200"'+
        'enable-background="new 0 0 350 200" xml:space="preserve"></svg>');

        $svg = $parent.children('svg');

        var donutSize = 200;
        var donut = $svg.donut({
            donutSize: donutSize,
            center: {
                x: donutSize / 2,
                y: donutSize / 2
            },
            radius: donutSize * 0.8 / 2,
            data: charts[$parent.parents('.portfolio-modal').attr('id')]
        });

        var animated = false;

        setTimeout(function(){
            if($svg.visible()){
                donut.startShowAnimation();
            }else{
                $parent.parents('.portfolio-modal').on('scroll', function () {
                    if (!animated) {
                        if ($svg.visible()) {
                            donut.startShowAnimation();
                            animated = true;
                        }
                    }
                });
            }
        },200);
    });

    $('#loading').remove();
    $('body').removeClass('loading');
});