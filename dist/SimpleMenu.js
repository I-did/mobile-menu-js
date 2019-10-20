function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;
(function () {
  if (typeof window === 'undefined') {
      return;
  }

  try {
      let ce = new window.CustomEvent('test', {cancelable: true});
      ce.preventDefault();
      if (ce.defaultPrevented !== true) {
          throw new Error('Could not prevent default');
      }
  } catch(e) {
      let CustomEvent = function(event, params) {
          let evt, origPrevent;
          params = params || {
              bubbles: false,
              cancelable: false,
              detail: undefined
          };

          evt = document.createEvent("CustomEvent");
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          origPrevent = evt.preventDefault;
          evt.preventDefault = function () {
              origPrevent.call(this);
              try {
                  Object.defineProperty(this, 'defaultPrevented', {
                      get: function () {
                          return true;
                      }
                  });
              } catch(e) {
                  this.defaultPrevented = true;
              }
          };
          return evt;
      };

      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent; // expose definition to window
  }
})();

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    window.SimpleMenu = factory();
  }
})(function () {
  let _,
      __,
      opt,
      head = document.head,
      body = document.body;

  function overlayAnimE() {
    body.removeChild(_.overlay.tag);
    _.overlay.tag.removeEventListener('animationend', overlayAnimE);
  }

  function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      let context = this,
          args = arguments;

      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  let SimpleMenu =
  /*#__PURE__*/
  function () {
    function SimpleMenu(options) {
      _classCallCheck(this, SimpleMenu);

      _ = this;
      _.defaults = {
        menu: {
          selector: '',
          class: 'active',
          animationDuration: 0.5,
          animationTimigFunc: 'ease'
        },
        openBtn: {
          selector: '',
          class: '',
          toggleClass: '',
          addClass: 'animationstart',
          removeClass: 'animationstart'
        },
        closeBtn: {
          selector: '',
          class: '',
          toggleClass: '',
          addClass: 'animationstart',
          removeClass: 'animationstart'
        },
        overlay: {
          selector: '',
          class: 'active',
          bgc: 'rgba(0,0,0,.5)',
          zi: '10',
          css: '',
          animationDuration: 0.5,
          animationTimigFunc: 'ease'
        },
        desktop: false,
        mediaQuery: '',
        toTop: false,
        toBottom: false,
        toLeft: false,
        toRight: false,
        fade: false,
        swipe: true,
        swipeThreshold: 0.3,
        pageScrolling: false,
        scrollingPxs: 50,
        overlayClick: true,
        container: true,
        esc: true
      }; // create options from defaults

      opt = _.options = options || {};

      for (let name in _.defaults) {
        if (opt[name] !== undefined) {
          if (typeof opt[name] !== 'string' && opt[name] !== false) {
            for (let prop in _.defaults[name]) {
              if (opt[name][prop] === undefined) {
                opt[name][prop] = _.defaults[name][prop];
              }
            }
          } else if (typeof opt[name] === 'string' && typeof _.defaults[name] !== 'string') {
            _.defaults[name].selector = opt[name];
            opt[name] = _.defaults[name];
          }
        } else {
          opt[name] = _.defaults[name];
        }
      }

      if (opt.mediaQuery !== '') {
        opt.desktop = true;
      }

      if (opt.fade) {
        opt.swipe = false;
        opt.container = false;
      }

      delete _.defaults;

      _.checkMedia();

      window.addEventListener('resize', debounce(_.checkMedia, 100));
    }

    _createClass(SimpleMenu, [{
      key: "checkMedia",
      value: function checkMedia(event) {
        // if desktop true
        // if mediaQuery
        // if media matches
        // if resize
        // if menu
        // if menu actived -> return
        // else menu !actived -> add events
        // else !menu -> buld menu
        // else !resize -> build menu
        // else no media mathces
        // if resize
        // if menu
        // if menu actived -> remove events
        // else -> return
        // else !menu -> return
        // else !resize -> return
        if (opt.desktop) {
          if (opt.mediaQuery !== '') {
            if (window.matchMedia(opt.mediaQuery).matches) {
              if (event && event.type === 'resize') {
                if (__) {
                  if (!__.actived) {
                    _.restoreEvents();
                  }
                } else {
                  _.buildMenu();
                }
              } else {
                _.buildMenu();
              }
            } else {
              if (event && event.type === 'resize') {
                if (_.menu) {
                  if (__.actived) {
                    _.destroyEvents();
                  }
                }
              }
            }
          } else {
            // if desktop true (no media)
            // if !resize -> build menu
            if (!event) {
              _.buildMenu();
            }
          }
        } else {
          // else desktop false
          // if mobile device
          // if resize
          // if menu
          // if menu actived -> return
          // else menu !actived -> add events
          // else !menu -> buld menu
          // else !resize -> buld menu
          // else !mobile device
          // if resize
          // if menu
          // if menu actived -> remove events
          // else menu !actived -> return
          // else !menu -> return
          // else !resize -> return
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (event && event.type === 'resize') {
              if (__) {
                if (!__.actived) {
                  _.restoreEvents();
                }
              } else {
                _.buildMenu();
              }
            } else {
              _.buildMenu();
            }
          } else {
            if (event && event.type === 'resize') {
              if (_.menu) {
                if (__.actived) {
                  _.destroyEvents();
                }
              }
            }
          }
        }
      }
    }, {
      key: "buildMenu",
      value: function buildMenu() {
        _.init();

        _.initOverlay();

        _.initMenu();
      }
    }, {
      key: "initOverlay",
      value: function initOverlay() {
        _.overlay = function () {
          let ovl = opt.overlay,
              tag;

          if (ovl === false) {
            return false;
          } else {
            // if !selector -> build overlay -> open & close with css3 animation
            // else selector -> querySelector overlay -> open & close with toggle class
            if (ovl.selector === '') {
              ovl.isCreated = true;
              tag = document.createElement('div');
              tag.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:".concat(ovl.bgc, ";z-index:").concat(ovl.zi, ";").concat(ovl.css);

              _.buildAnimation(ovl, ['fi', 'fo'], ['opacity:0', 'opacity:1']);
            } else {
              ovl.isCreated = false;
              tag = document.querySelector(ovl.selector || ovl);
            }

            ovl.tag = tag;
            return tag ? ovl : console.warn('You\'r overlay is not found!');
          }
        }();
      }
    }, {
      key: "initMenu",
      value: function initMenu() {
        _.menu = function () {
          let menu = _.findElement(opt.menu, 'Menu');

          __ = menu;
          _.tag = __.tag;

          function buttonToggleClass(btn) {
            if (btn.class) {
              if (btn.toggleClass) {
                __.tag.addEventListener(btn.toggleClass, function () {
                  btn.tag.classList.toggle(btn.class);
                });
              } else {
                __.tag.addEventListener(btn.addClass === 'animationstart' ? 'beforeopen' : 'open', function () {
                  btn.tag.classList.add(btn.class);
                });

                __.tag.addEventListener(btn.removeClass === 'animationstart' ? 'beforeclose' : 'close', function () {
                  btn.tag.classList.remove(btn.class);
                });
              }
            }
          }

          buttonToggleClass(_.openBtn);

          if (_.closeBtn) {
            buttonToggleClass(_.closeBtn);
          }

          _.open = __.open = function () {
            let overlay = _.overlay,
                wrap = __.wrap;

            __.tag.classList.add(__.class);

            if (navigator.userAgent.search(/edge/i) === -1 && __.tag.scrollHeight > __.tag.offsetHeight && __.tag.scrollTop > 0) {
              __.tag.scrollTo(0, 0);
            }

            __.pageYscroll = pageYOffset;

            if (!__.width) {
              __.width = __.tag.offsetWidth;
            }

            if (!opt.fade) {
              if (!__.height) {
                __.height = __.tag.offsetHeight;
              }

              if (wrap.style.minWidth !== "".concat(__.width, "px")) {
                wrap.style.minWidth = "".concat(__.width, "px");
              }

              if (wrap.style.minHeight !== "".concat(__.height, "px")) {
                wrap.style.minHeight = "".concat(__.height, "px");
              }
            }

            if (opt.container) {
              __.tag.style.position = 'relative';
            }

            _.setAnimationFor(__, __.animationIn);

            if (overlay) {
              if (overlay.isCreated) {
                _.setAnimationFor(overlay, overlay.animationIn);

                body.appendChild(overlay.tag);
              } else {
                overlay.tag.classList.add(overlay.class);
              }
            }

            if (opt.container) {
              __.parent.appendChild(wrap);

              wrap.appendChild(__.tag);
              __.contained = true;
            }

            _.openBtn.tag.removeEventListener('click', __.open);

            if (_.closeBtn) {
              _.closeBtn.tag.addEventListener('click', __.close);
            }

            let e = new CustomEvent('beforeopen');
            __.tag.dispatchEvent(e);

            __.tag.addEventListener('animationend', menuAnimE);

            function menuAnimE() {
              let ev = new CustomEvent('open');
              __.tag.dispatchEvent(ev);

              __.opened = true;
              window.addEventListener('resize', __.close, {
                once: true
              });

              if (!opt.pageScrolling) {
                window.addEventListener('scroll', __.close);
              }

              if (opt.esc) {
                document.addEventListener('keyup', __.close);
              }

              if (_.closeBtn) {
                _.closeBtn.tag.addEventListener('click', __.close);
              }

              if (overlay && opt.overlayClick) {
                overlay.tag.addEventListener('click', __.close);
              }

              __.tag.removeEventListener('animationend', menuAnimE);
            }

            // __.tag.addEventListener('animationend', function () {
            //   let ev = new CustomEvent('open');
            //   __.tag.dispatchEvent(ev);

            //   __.opened = true;
            //   window.addEventListener('resize', __.close, {
            //     once: true
            //   });

            //   if (!opt.pageScrolling) {
            //     window.addEventListener('scroll', __.close);
            //   }

            //   if (opt.esc) {
            //     document.addEventListener('keyup', __.close);
            //   }

            //   if (_.closeBtn) {
            //     _.closeBtn.tag.addEventListener('click', __.close);
            //   }

            //   if (overlay && opt.overlayClick) {
            //     overlay.tag.addEventListener('click', __.close);
            //   }
            // }, {
            //   once: true
            // });
          };

          _.close = __.close = function () {
            let overlay = _.overlay;

            if (event && event.type === 'keyup' && event.keyCode !== 27) {
              return;
            }

            if (event && event.type === 'scroll') {
              if (Math.abs(__.pageYscroll - pageYOffset) < opt.scrollingPxs) {
                return;
              }
            }

            _.setAnimationFor(__, __.animationOut);

            if (overlay) {
              if (overlay.isCreated) {
                _.setAnimationFor(overlay, overlay.animationOut);

                overlay.tag.addEventListener('animationend', overlayAnimE);
              } else {
                overlay.tag.classList.remove(overlay.class);
              }
            } // removing events


            if (_.closeBtn) {
              _.closeBtn.tag.removeEventListener('click', __.close);
            }

            if (overlay && opt.overlayClick) {
              overlay.tag.removeEventListener('click', __.close);
            }

            if (opt.swipe) {
              __.tag.removeEventListener('touchmove', __.swipeMove);
            }

            if (!opt.pageScrolling) {
              window.removeEventListener('scroll', __.close);
            }

            if (opt.esc) {
              document.removeEventListener('keyup', __.close);
            }

            window.removeEventListener('resize', __.close);

            let ev = new CustomEvent('beforeclose');
            __.tag.dispatchEvent(ev); // animationend

            __.tag.addEventListener('animationend', menuAnimE);

            function menuAnimE() {
              let ev = new CustomEvent('close');
              __.tag.dispatchEvent(ev);

              _.openBtn.tag.addEventListener('click', __.open);

              __.opened = false;

              __.tag.classList.remove(__.class);

              __.tag.style.transform = '';
              __.tag.style.willChange = '';

              if (opt.container) {
                __.parent.appendChild(__.tag);

                __.parent.removeChild(__.wrap);

                __.contained = false;
              }

              __.tag.removeEventListener('animationend', menuAnimE);
            }

            // __.tag.addEventListener('animationend', function () {
            //   let ev = new CustomEvent('close');
            //   __.tag.dispatchEvent(ev);

            //   _.openBtn.tag.addEventListener('click', __.open);

            //   __.opened = false;

            //   __.tag.classList.remove(__.class);

            //   __.tag.style.transform = '';
            //   __.tag.style.willChange = '';

            //   if (opt.container) {
            //     __.parent.appendChild(__.tag);

            //     __.parent.removeChild(__.wrap);

            //     __.contained = false;
            //   }
            // }, {
            //   once: true
            // });
          };

          __.getTransform = function () {
            return +__.tag.style.transform.replace(/[^0-9-.]*/g, '');
          };

          if (!opt.fade) {
            let swipe, scroll, posX1, posX2, posY1, posY2, posInitX, posFinal, posInitY;

            __.swipeStart = function () {
              __.tag.style.willChange = 'transform';
              let evt = event.touches[0] || window.event.touches[0];
              posInitX = posX1 = +evt.clientX.toFixed();
              posInitY = posY1 = +evt.clientY.toFixed();

              __.tag.addEventListener('touchmove', __.swipeMove);

              __.tag.addEventListener('touchend', function () {
                return swipe = scroll = false;
              }, {
                once: true
              });
            };

            __.swipeMove = function () {
              let evt = event.touches[0] || window.event.touches[0];
              posY2 = posY1 - evt.clientY.toFixed();
              posY1 = evt.clientY.toFixed();
              posX2 = posX1 - evt.clientX.toFixed();
              posX1 = evt.clientX.toFixed();

              if (!swipe && !scroll) {
                if (Math.abs(posY2) > 9) {
                  scroll = true;
                } else if (Math.abs(posY2) < 5) {
                  swipe = true;
                }
              }

              if (swipe && opt.toLeft && posX1 > posInitX || opt.toRight && posX1 < posInitX) {
                __.tag.addEventListener('touchend', __.swipeEnd);

                __.tag.style.transform = "translateX(".concat(__.getTransform() - posX2, "px)");
              } else if (scroll && opt.toBottom && __.tag.offsetHeight + __.tag.scrollTop >= __.tag.scrollHeight && posY1 < posInitY || opt.toTop && __.tag.scrollTop === 0 && posY1 > posInitY) {
                event.preventDefault();

                __.tag.addEventListener('touchend', __.swipeEnd);

                __.tag.style.transform = "translateY(".concat(__.getTransform() - posY2, "px)");
              }
            };

            __.swipeEnd = function () {
              __.tag.removeEventListener('touchend', __.swipeEnd);

              posFinal = __.getTransform();
              let posThreshold = __.width * opt.swipeThreshold;

              if (Math.abs(posFinal) >= posThreshold) {
                __.close();
              } else {
                __.tag.style.transform = 'translate(0)';
                __.tag.style.transition = "transform ".concat(__.animationDuration, "s");

                __.tag.addEventListener('transitionend', function () {
                  return __.tag.style.transition = '';
                }, {
                  once: true
                });
              }
            };

            if (opt.swipe) {
              __.tag.addEventListener('touchstart', __.swipeStart);
            }
          }

          if (!opt.fade) {
            if (!opt.toTop && !opt.toBottom && !opt.toLeft && !opt.toRight) {
              let windowWidth = window.screen.width,
                  openBtnCoords = {
                left: +_.openBtn.tag.getBoundingClientRect().left.toFixed(),
                right: +(windowWidth - _.openBtn.tag.getBoundingClientRect().right).toFixed()
              };

              if (openBtnCoords.left > openBtnCoords.right) {
                opt.toLeft = true;
              } else {
                opt.toRight = true;
              }
            }

            let menuStyles = {};
            menuStyles.top = getComputedStyle(__.tag).top;
            menuStyles.bottom = getComputedStyle(__.tag).bottom;
            menuStyles.left = getComputedStyle(__.tag).left;
            menuStyles.right = getComputedStyle(__.tag).right;

            if (opt.toLeft) {
              _.buildAnimation(__, ['fr', 'tr'], ['translateX(100%)', 'translateX(0%)']);

              __.tag.style.right = 0;
              __.tag.style.left = 'auto';
            } else if (opt.toRight) {
              _.buildAnimation(__, ['fl', 'tl'], ['translateX(-100%)', 'translateX(0%)']);

              __.tag.style.left = 0;
              __.tag.style.right = 'auto';
            } else if (opt.toBottom) {
              __.tag.style.top = 0;
              __.tag.style.bottom = 'auto';

              _.buildAnimation(__, ['ft', 'tt'], ['translateY(-100%)', 'translateY(0%)']);
            } else if (opt.toTop) {
              _.buildAnimation(__, ['fb', 'tb'], ['translateY(100%)', 'translateY(0%)']);

              __.tag.style.bottom = 0;
              __.tag.style.top = 'auto';
            }

            let wrap = __.wrap = document.createElement('div');
            wrap.style.cssText = 'position:absolute;overflow:hidden;';
            wrap.style.top = menuStyles.top === 'auto' && opt.toBottom ? '0px' : menuStyles.top;
            wrap.style.bottom = menuStyles.bottom === 'auto' && opt.toTop ? '0px' : menuStyles.bottom;
            wrap.style.left = menuStyles.left === 'auto' && opt.toRight ? '0px' : menuStyles.left;
            wrap.style.right = menuStyles.right === 'auto' && opt.toLeft ? '0px' : menuStyles.right;
            wrap.style.zIndex = menuStyles.zIndex;
            __.contained = false;
            __.tag.style.top = 0;
            __.tag.style.bottom = 'auto';
            __.parent = __.tag.parentElement;
          } else {
            if (!opt.menu.animationIn && !opt.menu.animationOut) {
              _.buildAnimation(__, ['fi', 'fo'], ['opacity:0', 'opacity:1']);
            } else {
              if (!opt.menu.animationIn || !opt.menu.animationOut) {
                console.error('Add another animaion!');
                return;
              }
            }
          }

          _.restoreEvents();

          return menu;
        }();
      }
    }, {
      key: "destroyEvents",
      value: function destroyEvents() {
        _.openBtn.tag.removeEventListener('click', __.open);

        if (_.closeBtn) {
          _.closeBtn.tag.removeEventListener('click', __.close);
        }

        __.actived = false;
      }
    }, {
      key: "restoreEvents",
      value: function restoreEvents() {
        _.openBtn.tag.addEventListener('click', __.open);

        __.actived = true;
      }
    }, {
      key: "init",
      value: function init() {
        _.openBtn = function () {
          let btn = _.findElement(opt.openBtn, 'Open button');

          return btn;
        }();

        _.closeBtn = _.findElement(opt.closeBtn, 'Close button');
      }
    }, {
      key: "findElement",
      value: function findElement(elem, errorName) {
        let tag;

        if (elem.selector !== '') {
          tag = document.querySelector(elem.selector);
        } else console.warn("".concat(errorName, " selector is empty!"));

        elem.tag = tag;
        return tag ? elem : console.warn("".concat(errorName, " is not found!"));
      }
    }, {
      key: "buildAnimation",
      value: function buildAnimation(elem, names, keyframes) {
        let arr = ['animationIn', 'animationOut'];

        for (let i = 0; i < names.length; i++) {
          keyframes[i] = keyframes[i].replace(/(translate(.*))/, 'transform:$1');
          elem[arr[i]] = {
            name: names[i],
            key: "@keyframes ".concat(names[i], "{from{").concat(keyframes[i], "}to{").concat(keyframes[i === 1 ? 0 : 1], "}}")
          };
        }
      }
    }, {
      key: "setAnimationFor",
      value: function setAnimationFor(elem, anim) {
        let animTag;

        if (anim.key) {
          animTag = document.createElement('style');
          head.appendChild(animTag);
          animTag.textContent = anim === __.animationOut ? anim.key.replace(/\(.*?\)/, "(".concat(__.getTransform(), ")")) : anim.key;
        }

        elem.tag.style.animation = "".concat(anim.name, " ").concat(elem.animationDuration, "s ").concat(elem.animationTimigFunc);
        elem.tag.addEventListener('animationend', a);

        function a() {
          if (anim.key) {
            head.removeChild(animTag);
          }
          elem.tag.removeEventListener('animationend', a);
        }
      }
    }]);

    return SimpleMenu;
  }();
  return SimpleMenu;
});