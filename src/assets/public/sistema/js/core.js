var gec;
!function ($) { 'use strict';
    gec = {
        utils: {
            preventDefault: function (event) {
                if (event.preventDefault)
                    event.preventDefault();
                else
                    event.returnValue = false;
            }
        },
        fn: {
            popup: function (t, e) {
                gec.utils.preventDefault(e);
                var $t = $(t),
                        _href = "";
                if ($t.data("href"))
                    _href = $t.data("href");
                else
                    _href = $t.attr("href");
                window.open(_href, 'gec_popup', 'width=500,height=450,menubar=no,status=no,location=no,toolbar=no,scrollbars=yes,directories=no');
            },
            print: function (e) {
                gec.utils.preventDefault(e), window.print()
            }
        }
    };
}(window.jQuery);