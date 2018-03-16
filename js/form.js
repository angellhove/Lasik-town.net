$(function() {
    
    $('div.imgs tr td a.delete, .actions a.delete').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (confirm('このデータを削除してもいいですか?')) {
            var f = $('<form>').appendTo($(document.body)).hide().attr({method: 'POST',action: this.href}).get(0).submit();
        }
    });

    if ($('ul#gNavi').length) {
        $('ul#gNavi li').each(function() {
            if ($('body').hasClass($(this).attr('id'))) {
                $(this).addClass('current');
            }
        });
    }
    
    if ($('body#add label a').length) {
        var trg = $('body#add label a');
        trg.each(function(idx, elem) {
            $(this).click(function(event) {
                event.preventDefault();
                event.stopPropagation();
                var that = this;
                $.get($(this).attr('href'), function(data) {
                    $(that).parent().next().val(data);
                })
            });
        });
    }
    
    if ($('body#edit.articles').length) {
        if ($('#ArticleParentId').val()) {
            $('#ArticleOrderNum').attr({disabled: true}).css({color: '#ccc'});
        }
    }
/*
    if ($('body#add label a, div#contributes label a').length) {
        var trg = $('body#add label a, div#contributes label a');
        trg.each(function(idx, elem) {
            $(this).click(function(event) {
                event.preventDefault();
                event.stopPropagation();
                $(this).parent().next().val($(this).next('span').text());
            });
        });
    }
*/
});