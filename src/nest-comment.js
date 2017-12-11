/**
 * @author jelon <jilijelon@163.com>
 * version: 1.0.0
 * https://github.com/jilijelon/nest-comment
 */

(function ($) {
    'use strict';

    // TOOLS DEFINITION
    // ======================

    // it only does '%s', and return '' when arguments are undefined
    var sprintf = function (str) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace(/%s/g, function () {
            var arg = args[i++];

            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    };

    var calculateObjectValue = function (self, name, args, defaultValue) {
        var func = name;

        if (typeof name === 'string') {
            // support obj.func1.func2
            var names = name.split('.');

            if (names.length > 1) {
                func = window;
                $.each(names, function (i, f) {
                    func = func[f];
                });
            } else {
                func = window[name];
            }
        }
        if (typeof func === 'object') {
            return func;
        }
        if (typeof func === 'function') {
            return func.apply(self, args || []);
        }
        if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
            return sprintf.apply(this, [name].concat(args));
        }
        return defaultValue;
    };

    // NEST COMMENT CLASS DEFINITION
    // ======================
    var NestComment = function (el, options) {
        this.options = options;
        this.$el = $(el);
        this.$el_ = this.$el.clone();

        this.init();
    };

    NestComment.DEFAULTS = {
        classes: 'nest-comment',
        topicType:null,
        topicId:null,
        pagination: true,
        data: [],
        totalField: 'total',
        dataField: 'rows',
        sidePagination:'server',
        totalRows: 0, // server side need to set
        pageNumber: 1,
        pageSize: 10,
        onAll: function (name, args) {
            return false;
        },
        onLoadSuccess: function (data) {
            return false;
        },
        onLoadError: function (status) {
            return false;
        },
        onPageChange: function (number, size) {
            return false;
        },
    };

    NestComment.EVENTS = {
        'all.nest.comment': 'onAll',
        'load-success.nest.comment': 'onLoadSuccess',
        'load-error.nest.comment': 'onLoadError',
        'page-change.nest.comment': 'onPageChange'
    };

    NestComment.prototype.init = function () {
        this.initContainer();
        this.initData();
        this.initCommentBox();
        this.initRespondBox();
        this.initServer();
    }

    // PUBLIC FUNCTION DEFINITION
    // =======================
    NestComment.prototype.initContainer = function () {
        this.$container = this.$el;
        this.$container.addClass(this.options.classes);

        this.$container.append($([
            '<div class="comment-box">',
                '<h3 class="comment-title">',
                '全部评论： <span class="comment-count">0条</span>',
                '</h3>',
                '<div class="comment-loading">',
                '<span><i class="icon-spin6 animate-spin"></i> 加载中...</span>',
                '</div>',
                '<ol class="comment-list">',
                '</ol>',
                '<div class="comment-pagination">',
                '</div>',
            '</div>',
            '<div class="respond-box">'
                '<h3 class="comment-title">发表评论',
                '<span class="comment-reply-cancel"><a rel="nofollow" href="javascript:;">取消回复</a></span> ',
                '</h3>',
                '<form class="comment-form">',
                '<div class="clearfix author-info">',
                '<div class="info-item-3">',
                '<label for="author">昵称<span class="required">*</span></label>',
                '<input type="text" name="author" value="" size="22" tabindex="1" class="comment-md-9 author" />',
                '</div>',
                '<div class="info-item-3">',
                '<label for="email">邮箱<span class="required">*</span></label>',
                '<input type="text" name="email" value="" size="22" tabindex="2" class="comment-md-9 author" />',
                '</div>',
                '<div class="info-item-3">',
                '<label for="url">网址</label>',
                '<input type="text" name="url" value="" size="22" tabindex="3" class="comment-md-9 author" />',
                '</div>',
                '</div>',
                '<div class="comment-from-main clearfix">',
                '<div class="comment-form-textarea">',
                '<div class="comment-textarea-box">',
                '<textarea name="comment" placeholder="说点什么吧..." tabindex="4" class="comment-textarea"></textarea>',
                '</div>',
                '</div>',
                '<div class="form-submit">',
                '<input id="submit" name="submit" type="button" tabindex="5" title="发表评论" value="发表评论" class="btn-comment pull-right" />',
                '<div class="form-data hidden">',
                '</div>',
                '</form>'
            ,'</div>'
        ].join('')));

        this.$commentBoxContainer = this.$container.find('.comment-box');
        this.$respondBoxContainer = this.$container.find('.respond-box');
        this.$commentList = this.$container.find('.comment-list');

        this.$container.after('<div class="clearfix"></div>');
    };

    NestComment.prototype.initCommentBox = function () {
        var data = this.getData();

        for(var i=0;i<data.length;i++){

            this.$commentContainer = $([
                '<li class="depth-1">',
                '<div class="comment">',
                '<div class="comment-avatar">',
                '</div>',
                '<div class="comment-body">',
                '<div class="comment-author"></div>',
                '<div class="comment-reply"></div>',
                '<div class="comment-text"></div>',
                '</div>',
                '</div>',
                '</li>'
            ].join(''));
        }

    };

    NestComment.prototype.initRespondBox = function () {

    };

    /**
     * @param data
     * @param type: append / prepend
     */
    NestComment.prototype.initData = function (data, type) {
        if (type === 'append') {
            this.data = this.data.concat(data);
        } else if (type === 'prepend') {
            this.data = [].concat(data).concat(this.data);
        } else {
            this.data = data || this.options.data;
        }

        // Fix #839 Records deleted when adding new row on filtered table
        if (type === 'append') {
            this.options.data = this.options.data.concat(data);
        } else if (type === 'prepend') {
            this.options.data = [].concat(data).concat(this.options.data);
        } else {
            this.options.data = this.data;
        }

    };

    NestComment.prototype.initServer = function (silent, query, url) {
        var that = this,
            data = {},
            params = {
                //topicType: this.options.topicType,
                topicType:0,
                topicId: '24695531230177356545',
                type:'1',
                page:'1',
                rows:10,
                parentId:0
            },
            request;

        if (!(url || this.options.url) && !this.options.ajax) {
            return;
        }

        data = calculateObjectValue(this.options, this.options.queryParams, [params], data);

        $.extend(data, query || {});

        // false to stop request
        if (data === false) {
            return;
        }

        request = $.extend({}, calculateObjectValue(null, this.options.ajaxOptions), {
            type: this.options.method,
            url: url || this.options.url,
            data: this.options.contentType === 'application/json' && this.options.method === 'post' ?
                JSON.stringify(data) : data,
            cache: this.options.cache,
            contentType: this.options.contentType,
            dataType: this.options.dataType,
            success: function (res) {
                res = calculateObjectValue(that.options, that.options.responseHandler, [res], res);

                that.load(res);
                that.trigger('load-success', res);
                //if (!silent) that.$tableLoading.hide();
            },
            error: function (res) {
                var data = [];

                that.load(data);
                that.trigger('load-error', res.status, res);
                if (!silent) that.$tableLoading.hide();
            }
        });

        if (this.options.ajax) {
            calculateObjectValue(this, this.options.ajax, [request], null);
        } else {
            if (this._xhr && this._xhr.readyState !== 4) {
                this._xhr.abort();
            }
            this._xhr = $.ajax(request);
        }
    };

    NestComment.prototype.initBody = function () {
        var that = this,
            html = [],
            data = this.getData();

        this.trigger('pre-body', data);


        this.trigger('post-body', data);
    };

    NestComment.prototype.getData = function (useCurrentPage) {
        var data = this.options.data;

        return data;
    };

    NestComment.prototype.load = function (data) {

        if (this.options.pagination && this.options.sidePagination === 'server') {
            this.options.totalRows = data[this.options.totalField];
            data = data[this.options.dataField];
        } else if (!$.isArray(data)) {
            data = data.data;
        }

        this.initData(data);

        //this.initPagination();
        this.initBody(fixedScroll);
    };

    NestComment.prototype.trigger = function (name) {
        var args = Array.prototype.slice.call(arguments, 1);

        name += '.nest.comment';
        this.options[NestComment.EVENTS[name]].apply(this.options, args);
        this.$el.trigger($.Event(name), args);

        this.options.onAll(name, args);
        this.$el.trigger($.Event('all.nest.comment'), [name, args]);
    };

    NestComment.prototype.sayHello = function () {
        console.info('hello world');
    };


    // NEST COMMENT PLUGIN DEFINITION
    // =======================
    var allowedMethods = [
        'getOptions',
        'getSelections',
        'getData',
        'sayHello'
    ];

    $.fn.nestComment = function (option) {
        var value,
            args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
            var $this = $(this),
                data = $this.data('nest.comment'),
                options = $.extend({}, NestComment.DEFAULTS, $this.data(),
                    typeof option === 'object' && option);

            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw new Error("Unknown method: " + option);
                }

                if (!data) {
                    return;
                }

                value = data[option].apply(data, args);

                if (option === 'destroy') {
                    $this.removeData('nest.comment');
                }
            }

            if (!data) {
                $this.data('nest.comment', (data = new NestComment(this, options)));
            }
        });

        return typeof value === 'undefined' ? this : value;
    };

    $.fn.nestComment.Constructor = NestComment;
    $.fn.nestComment.defaults = NestComment.DEFAULTS;
    $.fn.nestComment.methods = allowedMethods;
    /*$.fn.nestComment.utils = {

    };*/



    // NEST COMMENT INIT
    // =======================

    $(function () {
        $('[data-toggle="comment"]').nestComment();
    });
})(jQuery);
