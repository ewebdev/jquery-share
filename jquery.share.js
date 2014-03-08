/**
 * forked from https://github.com/iatek/jquery-share
 */

(function ($, window, undefined) {
  "use strict";

  $.fn.share = function (method) {

    var helpers = {
      networks: {
        facebook: {url: 'http://www.facebook.com/share.php?u=|u|'},
        //http://twitter.com/home?status=jQuery%20Share%20Social%20Media%20Plugin%20-%20Share%20to%20multiple%20social%20networks%20from%20a%20single%20form%20http://plugins.in1.com/share/demo
        twitter: {url: 'https://twitter.com/share?url=|u|&text=|140|'},
        linkedin: {url: 'http://www.linkedin.com/shareArticle?mini=true&url=|u|&title=|t|&summary=|d|&source=in1.com'},
        in1: {url: 'http://www.in1.com/cast?u=|u|', w: '490', h: '529'},
        tumblr: {url: 'http://www.tumblr.com/share?v=3&u=|u|'},
        digg: {url: 'http://digg.com/submit?url=|u|&title=|t|'},
        googleplus: {url: 'https://plusone.google.com/_/+1/confirm?hl=en&url=|u|'},
        reddit: {url: 'http://reddit.com/submit?url=|u|'},
        pinterest: {url: 'http://pinterest.com/pin/create/button/?url=|u|&media=&description=|d|'},
        posterous: {url: 'http://posterous.com/share?linkto=|u|&title=|t|'},
        stumbleupon: {url: 'http://www.stumbleupon.com/submit?url=|u|&title=|t|'},
        email: {url: 'mailto:?subject=|t|&body=You have to check this out: |u|'}
      }
    };

    var methods = {

      init: function (options) {
        this.share.settings = $.extend({}, this.share.defaults, options);
        debugger;
        var settings = this.share.settings,
          pageTitle = settings.title || document.title,
          pageUrl = settings.pageUrl || window.location.href,
          pageDesc = settings.pageDesc || $('head > meta[name="description"]').attr("content"),
          u = encodeURIComponent(pageUrl),
          t = encodeURIComponent(pageTitle);

        // each instance of this plugin
        return this.each(function () {
          var $element = $(settings.containerTemplate(settings)).appendTo($(this)),
            id = $element.attr("id"),
            d = pageDesc.substring(0, 250),
            href;

          // append HTML for each network button
          for (var item in settings.networks) {
            item = settings.networks[item];
            href = helpers.networks[item].url;
            href = href.replace('|u|', u).replace('|t|', t).replace('|d|', d)
              .replace('|140|', t.substring(0, 130));
            $(settings.itemTemplate({provider: item, href: href, itemTriggerClass: settings.itemTriggerClass})).appendTo($element);
          }

          // bind click
          $element.on('click', '.' + settings.itemTriggerClass, function (e) {
            window.open($(this).attr('href'), 't', 'toolbar=0,resizable=1,status=0,width=640,height=528');
            e.preventDefault();
          });

        });// end plugin instance

      }
    };

    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method "' + method + '" does not exist in social plugin');
    }

  };

  $.fn.share.defaults = {
    networks: ['facebook', 'twitter', 'linkedin', 'googleplus', 'email'],
    itemTriggerClass: 'js-share',
    containerTemplate: function (props) {
      return '<ul class="sharing-providers"></ul>';
    },
    itemTemplate: function (props) {
      return '<li class="' + props.provider + '">' +
        '<a href="' + props.href + '" title="Share this page ' + (props.provider === 'email' ? 'via ' : 'on ') + props.provider + '" class=' + props.itemTriggerClass + ' ' + props.provider + '">' +
        '<i class="icon-' + props.provider + '">' +
        '</a>' +
        '</li>';
    },
    orientation: 'horizontal'
  };

  $.fn.share.settings = {};

})(jQuery, window);
