window.Lightbox = require('lightbox2');

$(document).on("DOMContentLoaded.lightbox", function () {

    var original = {};
    
    function args(_arguments) { return Array.prototype.slice.apply(_arguments); }
    Lightbox.trigger = function() { $(original).trigger.apply($(Lightbox.lightbox), args(arguments)); };
    Lightbox.on = function() { $(original).on.apply($(Lightbox.lightbox), args(arguments)); };

    original['init'] = Lightbox.init;
    Lightbox.init = function() {

        var result = original['init'].apply(this, arguments);
        var _args = args(arguments);
            _args.unshift(result);
            _args.unshift(this);

        Lightbox.$container.trigger('onInit', _args);
    };
    
    original['start'] = Lightbox.start;
    Lightbox.start = function() {

        var result = original['start'].apply(this, arguments);
        var _args = args(arguments);
            _args.unshift(result);
            _args.unshift(this);

        Lightbox.$container.trigger('onStart', _args);
    };

    original['end'] = Lightbox.end;
    Lightbox.end = function() {

        var result = original['end'].apply(this, arguments);
        var _args = args(arguments);
            _args.unshift(result);
            _args.unshift(this);

        Lightbox.$container.trigger('onEnd', _args);
    };

    original['changeImage'] = Lightbox.changeImage;
    Lightbox.changeImage = function() {

        var _args = args(arguments);
            _args.unshift(this);

        this.trigger('onBeforeChangeImage', _args);
        var result = original['changeImage'].apply(this, arguments);

        _args.unshift(result);
        Lightbox.$container.trigger('onChangeImage', _args);
    };

    original['showImage'] = Lightbox.showImage;
    Lightbox.showImage = function() {

        var result = original['showImage'].apply(this, arguments);
        var _args = args(arguments);
            _args.unshift(result);
            _args.unshift(this);

        Lightbox.$container.trigger('onShowImage', _args);
    };

    original['sizeContainer'] = Lightbox.sizeContainer;
    Lightbox.sizeContainer = function() {

        var result = original['sizeContainer'].apply(this, arguments);
        var _args = args(arguments);
            _args.unshift(result);
            _args.unshift(this);

        Lightbox.$container.trigger('onSizeContainer', _args);
    };
});

$(window).on("load.ligthbox", function () {

    if (Lightbox.$container) {
        Lightbox.$container.on('onStart', (event, result, self) => $('html,body').css('overflow', 'hidden'));
        Lightbox.$container.on('onEnd'  , (event, result, self) => $('html,body').css('overflow', ''));
    }
});