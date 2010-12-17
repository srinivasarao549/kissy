/**
 * @module loader
 * @author lifesinger@gmail.com, lijing00333@163.com, yiminghe@gmail.com, oldj.wu@gmail.com
 */
(function(S, undef) {

    var win = S.__HOST,
        doc = win['document'],
        head = doc.getElementsByTagName('head')[0] || doc.documentElement,

        EMPTY = '', CSSFULLPATH = 'cssfullpath',
        LOADING = 1, LOADED = 2, ERROR = 3, ATTACHED = 4,
        mix = S.mix,

        scriptOnload = doc.createElement('script').readyState ?
            function(node, callback) {
                var oldCallback = node.onreadystatechange;
                node.onreadystatechange = function() {
                    oldCallback && oldCallback();
                    var rs = node.readyState;
                    if (rs === 'loaded' || rs === 'complete') {
                        node.onreadystatechange = null;
                        callback.call(this);
                    }
                };
            } :
            function(node, callback) {
                node.addEventListener('load', callback, false);
            },

        RE_CSS = /\.css(?:\?|$)/i,
        loader;

    loader = {

        /**
         * Registers a module.
         * @param name {String} module name
         * @param fn {Function} entry point into the module that is used to bind module to KISSY
         * @param config {Object}
         * <code>
         * KISSY.add('module-name', function(S){ }, requires: ['mod1']);
         * </code>
         * <code>
         * KISSY.add({
         *     'mod-name': {
         *         fullpath: 'url',
         *         requires: ['mod1','mod2'],
         *         attach: false // 默认为 true
         *     }
         * });
         * </code>
         * @return {KISSY}
         */
        add: function(name, fn, config) {
            var self = this, mods = self.Env.mods, mod, o, oldr;

            // S.add(name, config) => S.add( { name: config } )
            if (S.isString(name) && !config && S.isPlainObject(fn)) {
                o = {};
                o[name] = fn;
                name = o;
            }

            // S.add({name: config, name2: config2, ...})
            if (S.isPlainObject(name)) {
                S.each(name, function(v, k) {
//                    S.log("add mod '" + k + "'");
                    v.name = k;
                    if (mods[k]) mix(v, mods[k], false); // 保留之前添加的配置，但同名的属性以新添加的为准
                });
                mix(mods, name);
            }
            // S.add(name[, fn[, config]])
            else {
                config = config || {};

                mod = mods[name] || {};
                name = config.host || mod.host || name;
                mod = mods[name] || {};

                // 注意：通过 S.add(name[, fn[, config]]) 注册的代码，无论是页面中的代码，还
                //      是 js 文件里的代码，add 执行时，都意味着该模块已经 LOADED
                mix(mod, { name: name, status: LOADED });

                if (!mod.fns) mod.fns = [];
                fn && mod.fns.push(fn);

                //!TODO 暂时不考虑 requires 在 add 中的修改
                // 和 order _requires 关联起来太复杂
                oldr = mod['requires'];
                mix((mods[name] = mod), config);
                mods[name]['requires'] = oldr; // 不覆盖

                // 对于 requires 都已 attached 的模块，比如 core 中的模块，直接 attach
                // 参数中的 attach 如未指定或为 true ，则表示直接 attache，如为 false 表示暂不 attach
                if ((mod['attach'] !== false) && self.__isAttached(mod.requires)) {
                    self.__attachMod(mod);
                }

                //!TODO add 中指定了依赖项，这里没有继续载依赖项
                //self.__isAttached(mod.requires) 返回 false
            }

            return self;
        },

        /**
         * Start load specific mods, and fire callback when these mods and requires are attached.
         * <code>
         * S.use('mod-name', callback, config);
         * S.use('mod1,mod2', callback, config);
         * </code>
         * config = {
         *   order: true, // 默认为 false. 是否严格按照 modNames 的排列顺序来回调入口函数
         *   global: KISSY // 默认为 KISSY. 当在 this.Env.mods 上找不到某个 mod 的属性时，会到 global.Env.mods 上去找
         * }
         */
        use: function(modNames, callback, config) {
            modNames = modNames.replace(/\s+/g, EMPTY).split(',');
            config = config || {};

            var self = this, mods = self.Env.mods,
                global = (config || 0).global,
                i, len = modNames.length, mod, name,
                fired; // fired 标识 callback 是否被执行过，确保 callback 只被执行一次

            // 将 global 上的 mods, 移动到 instance 上
            if (global) self.__mixMods(global);

            // mods 已经全部 attached, 直接执行回调即可
            if (self.__isAttached(modNames)) {
                callback && callback(self);
                return self;
            }

            // 有尚未 attached 的模块
            for (i = 0; i < len; i++) {
                mod = mods[modNames[i]];
                if (!mod || mod.status === ATTACHED) continue; // 如果 mod 未 add 或状态为已 attached ，跳过它

                // 通过添加依赖，来保证调用顺序
                // TODO 暂不考虑 执行顺序 和 依赖关系 冲突的情况
                if (config.order && i > 0) {
                    if (!mod.requires) mod.requires = [];
                    mod._requires = mod.requires.concat(); // 保留，以便还原
                    name = modNames[i - 1];

                    if (!S.inArray(name, mod.requires)
                        && !(S.inArray(mod.name, mods[name].requires || []))) { // 避免循环依赖
                        mod.requires.push(name);
                    }
                }

                self.__attach(mod, (function (mod) {
                    // 当 load 的是外部文件时，这个函数执行时，外面的 for 可能已经执行完了，
                    // 如果直接读 mod ，将读到最后一个 mod ，将不能正确恢复前几个 mod 的 require 信息
                    // 所以这儿将 mod 用闭包再保存一下。
                    return function() {
                        if (mod._requires) {
                            mod.requires = mod._requires; // restore requires
                            delete mod._requires;
                        }
                        if (!fired && self.__isAttached(modNames)) {
                            fired = true;
                            callback && callback(self);
                        }
                    }
                })(mod), global);
            }

            return self;
        },

        /**
         * Attach a module and all required modules.
         */
        __attach: function(mod, callback, global) {
            if (mod.status === ATTACHED) {
                callback();
                return;
            }

            var self = this, requires = mod['requires'] || [],
                i = 0, len = requires.length;

            // attach all required modules
            for (; i < len; i++) {
                self.__attach(self.Env.mods[requires[i]], fn, global);
            }

            // load and attach this module
            self.__buildPath(mod);
            self.__load(mod, fn, global);

            function fn() {
                // add 可能改了 config，这里重新取下
                var requires = mod['requires'] || [];

                if (self.__isAttached(requires)) {
                    if (mod.status === LOADED) {
                        self.__attachMod(mod);
                    }
                    if (mod.status === ATTACHED) {
                        callback();
                    }
                }
            }
        },

        __mixMods: function(global) {
            var mods = this.Env.mods, gMods = global.Env.mods, name;
            for (name in gMods) {
                this.__mixMod(mods, gMods, name, global);
            }
        },

        __mixMod: function(mods, gMods, name, global) {
            var mod = mods[name] || {}, status = mod.status;

            S.mix(mod, S.clone(gMods[name]));

            // status 属于实例，当有值时，不能被覆盖。只有没有初始值时，才从 global 上继承
            if (status) mod.status = status;

            // 来自 global 的 mod, path 应该基于 global
            if (global) this.__buildPath(mod, global.Config.base);

            mods[name] = mod;
        },

        __attachMod: function(mod) {
            var self = this;

            if (mod.fns) {
                S.each(mod.fns, function(fn) {
                    fn && fn(self);
                });
                mod.fns = undef; // 保证 attach 过的方法只执行一次
                S.log(mod.name + '.status = attached');
            }

            mod.status = ATTACHED;
        },

        /**
         * 判断是否所有指定 mod 都已 attached
         * 如果有未 add 的 mod ，跳过它
         * @param modNames {Array}
         */
        __isAttached: function(modNames) {
            var mods = this.Env.mods, mod,
                i = (modNames = S.makeArray(modNames)).length - 1;

            for (; i >= 0; i--) {
                mod = mods[modNames[i]];
                if (!mod) {
                    S.log("mod '" + modNames[i] + "' is not added!", "warn");
                    continue;
                }
                if (mod.status !== ATTACHED) return false;
            }

            return true;
        },

        /**
         * Load a single module.
         */
        __load: function(mod, callback, global) {
            var self = this, url = mod['fullpath'],
                loadQueque = S.Env._loadQueue, // 这个是全局的，防止多实例对同一模块的重复下载
                node = loadQueque[url], ret;

            mod.status = mod.status || 0;

            // 可能已经由其它模块触发加载
            if (mod.status < LOADING && node) {
                mod.status = node.nodeName ? LOADING : LOADED;
            }

            // 加载 css, 仅发出请求，不做任何其它处理
            if (S.isString(mod[CSSFULLPATH])) {
                self.getScript(mod[CSSFULLPATH]);
                mod[CSSFULLPATH] = LOADED;
            }

            if (mod.status < LOADING && url) {
                mod.status = LOADING;

                ret = self.getScript(url, {
                    success: function() {
                        KISSY.log(mod.name + ' is loaded.', 'info'); // 压缩时不过滤该句，以方便线上调试
                        _success();
                    },
                    error: function() {
                        S.log('mod \'' + mod.name + '\' load error!', 'warn')
                        mod.status = ERROR;
                        _final();
                    },
                    charset: mod.charset
                });

                // css 是同步的，在 success 回调里，已经将 loadQueque[url] 置成 LOADED
                // 不需要再置成节点，否则有问题
                if (!RE_CSS.test(url)) {
                    loadQueque[url] = ret;
                }
            }
            // 已经在加载中，需要添加回调到 script onload 中
            // 注意：没有考虑 error 情形
            else if (mod.status === LOADING) {
                scriptOnload(node, _success);
            }
            // 是内嵌代码，或者已经 loaded
            else {
                callback();
            }

            function _success() {
                _final();
                if (mod.status !== ERROR) {

                    // 对于动态下载下来的模块，loaded 后，global 上有可能更新 mods 信息，需要同步到 instance 上去
                    // 注意：要求 mod 对应的文件里，仅修改该 mod 信息
                    if (global) self.__mixMod(self.Env.mods, global.Env.mods, mod.name, global);

                    // 注意：当多个模块依赖同一个下载中的模块A下，模块A仅需 attach 一次
                    // 因此要加上下面的 !== 判断，否则会出现重复 attach, 比如编辑器里动态加载时，被依赖的模块会重复
                    if (mod.status !== ATTACHED) mod.status = LOADED;

                    callback();
                }
            }

            function _final() {
                loadQueque[url] = LOADED;
            }
        },

        __buildPath: function(mod, base) {
            var Config = this.Config;

            build('path', 'fullpath');
            if (mod[CSSFULLPATH] !== LOADED) build('csspath', CSSFULLPATH);

            function build(path, fullpath) {
                if (!mod[fullpath] && mod[path]) {
                    mod[fullpath] = (base || Config.base) + mod[path];
                }
                // debug 模式下，加载非 min 版
                if (mod[fullpath] && Config.debug) {
                    mod[fullpath] = mod[fullpath].replace(/-min/g, '');
                }
            }
        },

        /**
         * Load a JavaScript file from the server using a GET HTTP request, then execute it.
         * <code>
         *  getScript(url, success, charset);
         *  or
         *  getScript(url, {
         *      charset: string
         *      success: fn,
         *      error: fn,
         *      timeout: number
         *  });
         * </code>
         */
        getScript: function(url, success, charset) {
            var isCSS = RE_CSS.test(url),
                node = doc.createElement(isCSS ? 'link' : 'script'),
                config = success, error, timeout, timer;

            if (S.isPlainObject(config)) {
                success = config.success;
                error = config.error;
                timeout = config.timeout;
                charset = config.charset;
            }

            if (isCSS) {
                node.href = url;
                node.rel = 'stylesheet';
            } else {
                node.src = url;
                node.async = true;
            }
            if (charset) node.charset = charset;

            if (isCSS) {
                S.isFunction(success) && success.call(node);
            } else {
                scriptOnload(node, function() {
                    if (timer) {
                        timer.cancel();
                        timer = undef;
                    }

                    S.isFunction(success) && success.call(node);

                    // remove script
                    if (head && node.parentNode) {
                        head.removeChild(node);
                    }
                });
            }

            if (S.isFunction(error)) {
                timer = S.later(function() {
                    // 注意：发生超时后，node 实际上可能仍在下载，如果下载顺利完成仍然会执行
                    timer = undef;
                    error();
                }, (timeout || this.Config.timeout) * 1000);
            }

            head.insertBefore(node, head.firstChild);
            return node;
        }
    };

    mix(S, loader);

    /**
     * get base from src
     * @param src script source url
     * @return base for kissy
     * @example:
     *   http://a.tbcdn.cn/s/kissy/1.1.5/??kissy-min.js,suggest/suggest-pkg-min.js
     *   http://a.tbcdn.cn/??s/kissy/1.1.5/kissy-min.js,s/kissy/1.1.5/suggest/suggest-pkg-min.js
     *   http://a.tbcdn.cn/??s/kissy/1.1.5/suggest/suggest-pkg-min.js,s/kissy/1.1.5/kissy-min.js
     */
    // notice: timestamp
    var baseReg = /^(.*)(seed|kissy)(-min)?\.js/i,
        baseTestReg = /(seed|kissy)(-min)?\.js/;

    // TODO: configurable for ?? and ,
    function getBaseUrl(src) {
        var parts = src.split(/\s*,\s*/);
        var base,
            part0 = parts[0],
            index = part0.indexOf('??');
        // no combo
        if (index == -1) {
            base = src.replace(baseReg, '$1');
        } else {
            base = part0.substring(0, index);
            var part01 = part0.substring(index + 2, part0.length);
            // combo first
            // notice use match better than test
            if (part01.match(baseTestReg)) {
                base += part01.replace(baseReg, '$1');
            }
            // combo after first
            else {
                for (var i = 1; i < parts.length; i++) {
                    var part = parts[i];
                    if (part.match(baseTestReg)) {
                        base += part.replace(baseReg, '$1');
                        break;
                    }
                }
            }
        }
        return base;
    }

    /**
     * Initializes loader.
     */
    S.__initLoader = function() {
        // get base from current script file path
        var scripts = doc.getElementsByTagName('script'),
            currentScript = scripts[scripts.length - 1],
            base = getBaseUrl(currentScript.src);

        this.Env.mods = {}; // all added mods
        this.Env._loadQueue = {}; // information for loading and loaded mods

        this.Config.base = base;
        this.Config.timeout = 10;   // the default timeout for getScript
    };
    S.__initLoader();

    // for S.app working properly
    S.each(loader, function(v, k) {
        S.__APP_MEMBERS.push(k);
    });
    S.__APP_INIT_METHODS.push('__initLoader');

})(KISSY);
