$(function() {
    
    if (getQuerystring('display')) {
        $('.undisplayed').removeClass('undisplayed');
    }
    
    if ($('.rating').length) {
        $('.rating').raty({
            readOnly: true,
            score: function() {return $(this).attr('data-rating');}
        });        
    }
    
    if ($('div.paging').length) {
        if ($('div.paging a').length == 0) {
            $('div.paging').hide();
        }
    }
    
    if ($('#bigstar.rating').length) {
        $('#bigstar.rating').raty({
            readOnly: true,
            starHalf: 'star-half-big.png',
            starOff: 'star-off-big.png',
            starOn: 'star-on-big.png',
            half: true,
            size: 24,
            score: function() {return $(this).attr('data-rating');}
        });
    }

    
    if ($('div#sideRanking, div.hospitals').length) {
        $('div#sideRanking ul li:last-child, div.hospitals:last-child').addClass('last');
    }
    
    if ($('div#latestData').length) {
        $('div#latestData ul li:last-child').addClass('last');
    }
    
    $('div#toTop a').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $('html, body').animate({scrollTop: $('#wrapper').offset().top}, {duration: 800, easing: 'easeOutCirc'});
    });
    
    $('a.over').mouseover(function(event) {
        $(this).filter(':not(:animated)').css({opacity: 0}).animate({opacity: 1}, {duration: 800, easing: 'easeOutCirc'});
    });
    
    if ($('table.prefs').length) {
        $('div#main table.prefs tr td span:last-child,div#main table.prefs tr td a:last-child').addClass('last');
    }

    if ($('div.categorywrap').length) {
        $('div.categorywrap').each(function(idx, elem) {
            var height = $(elem).find('div.categories').height();
            $(elem).find('div.categories').each(function(idx, elem) {
                if (height < $(elem).height()) height = $(elem).height();
            }).css('height', height);
        })
    }
    
    if ($('a.contribute').length) {
        $('a.contribute').click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            window.open($(this).attr('href'), 'contributeWin', 'width=600,height=650');
        });
    }
    
    if ($('body#contribute select#ReviewPrefectures').length) {
        if ($('select#ReviewPrefectures option:selected').val()) {
            var kls = 'pref_' + $('select#ReviewPrefectures option:selected').val();
        }
        var options = $('select#ReviewHospitalId option[class]');
        $('select#ReviewHospitalId option[class][class!=' + kls + ']:not(:selected)').remove();
        $('body#contribute select#ReviewPrefectures').change(function(event) {
            event.preventDefault();
            event.stopPropagation();
            var val = $(this).val();
            $('select#ReviewHospitalId option[class]').remove();
            $('select#ReviewHospitalId').append(options.filter('option:[class=pref_' + val + ']'));
        });
    }
    
    if ($('#aList').length) {
        var a = $('#aList ul li a:last');
        a.addClass('last');
    }
    
    if ($('body#sitemap').length) {
        $('div.term dl').each(function(idx, elem) {
            if ($(elem).find('a').length == 0)  {
                $(elem).hide();
            }
        })
    }
    
/*
    if ($('body#index').length) {
        $('div.categories h3 span.class03,div.categories h3 span.class05').css({'line-height': 1.6});
    }
*/
    
    if ($('body#index').length) {
        $('div.categories h3 span').each(function() {
            if ($(this).find('br').length) {
                $(this).css({'line-height': 1.6});
            }
        })
    }
    
    $('table tr td').each(function(idx, elem) {
        if ($(elem).text() == '無効' || $(elem).text() == '未対応') {
            $(elem).css({color: '#F00'});
        }
    });
    
    if ($('div#sidebar div.ad').length) {
        $('div#sidebar div.ad').each(function(idx, elem) {
            if ($(elem).find('script').length) {
                $(elem).addClass('script');
            }
        })
    }
    
    if ($('span.reviewdisplay a').length) {
        $('span.reviewdisplay a').click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            var shadowLayer = $('<div>').attr('id', 'shadowLayer').css({height: $(document).height(), opacity: 0.3}).appendTo($(document.body));
            var div = $(this).parents('li').find('div.detail').clone().appendTo($(document.body));
            var objHeight = div.height();
            
            var f = function(event) {
                event.preventDefault();
                event.stopPropagation();
                div.fadeOut().remove();
                shadowLayer.fadeOut();
            };
            div.show().animate({top: $(window).scrollTop() + $(window).height() / 2 - objHeight / 2}, {complete: function() {
                div.find('p.close a').click(f);
                shadowLayer.click(f);
            }}).find('div.inner').css({left: '-50%'});
            
        });
    }

/*
    if ($('div#sidebar div.ad div').length) {
        $('div#sidebar div.ad div').each(function(idx, elem) {
            var cls = $(elem).attr('class');
            if (cls.indexOf('nm') != -1) {
                alert('test');
            }
        })
    }
*/
    
});

function getQuerystring(key, default_) {  
    if (default_ == null) default_="";
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if(qs == null) return default_;
    else return qs[1];
}