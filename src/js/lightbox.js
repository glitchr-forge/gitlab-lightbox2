import $ from 'jquery';
window.Lightbox = require('lightbox2');

$(document).on("DOMContentLoaded.lightbox", function () {

    const original = {};

    function args(_arguments) { return Array.prototype.slice.apply(_arguments); }
    Lightbox.trigger = function() { $(original).trigger.apply($(Lightbox.lightbox), args(arguments)); };
    Lightbox.on = function() { $(original).on.apply($(Lightbox.lightbox), args(arguments)); };

    original['init'] = Lightbox.init;
    Lightbox.init = function() {

        const result = original['init'].apply(this, arguments);
        const _args = args(arguments);
              _args.unshift(result);
              _args.unshift(this);

        Lightbox.$container.trigger('onInit', _args);
    };

    original['start'] = Lightbox.start;
    Lightbox.start = function() {

        const result = original['start'].apply(this, arguments);
        const _args = args(arguments);
              _args.unshift(result);
              _args.unshift(this);

        Lightbox.$container.trigger('onStart', _args);
    };

    original['end'] = Lightbox.end;
    Lightbox.end = function() {

        const result = original['end'].apply(this, arguments);
        const _args = args(arguments);
              _args.unshift(result);
              _args.unshift(this);

        Lightbox.$container.trigger('onEnd', _args);
    };

    original['changeImage'] = Lightbox.changeImage;
    Lightbox.changeImage = function() {

        const _args = args(arguments);
              _args.unshift(this);

        this.trigger('onBeforeChangeImage', _args);
        const result = original['changeImage'].apply(this, arguments);

        _args.unshift(result);
        Lightbox.$container.trigger('onChangeImage', _args);
    };

    original['showImage'] = Lightbox.showImage;
    Lightbox.showImage = function() {

        const result = original['showImage'].apply(this, arguments);
        const _args = args(arguments);
              _args.unshift(result);
              _args.unshift(this);

        Lightbox.$container.trigger('onShowImage', _args);
    };

    original['sizeContainer'] = Lightbox.sizeContainer;
    Lightbox.sizeContainer = function() {

        const result = original['sizeContainer'].apply(this, arguments);
        const _args = args(arguments);
              _args.unshift(result);
              _args.unshift(this);

        Lightbox.$container.trigger('onSizeContainer', _args);
    };
});

$(window).on("load.lightbox", function () {

    // Lighthouse - SEO requires "href" attribute (TBC)
    $(".lb-cancel").attr("href", "#cancel");
    $(".lb-close").attr("href", "#close");
    $(".lb-prev").attr("href", "#prev");
    $(".lb-next").attr("href", "#next");

    const lightgallery = $("[data-lightbox]");
    if (Lightbox.$container && lightgallery.length > 0) {
        Lightbox.$container.on('onStart', () => $('html,body').css('overflow', 'hidden'));
        Lightbox.$container.on('onEnd'  , () => $('html,body').css('overflow', ''));
    }
});
