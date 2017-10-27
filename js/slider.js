$(function(){
var view = document.querySelector('.view');
            var ul = document.querySelector('.view ul');
            var firstChild = document.querySelector('.view li:first-child');
            var lastChild = document.querySelector('.view li:last-child');
            var lis, size, width, timer, index = 0;
            var startX, endX;
            function init() {
                ul.insertBefore(lastChild.cloneNode(true), ul.firstChild);
                ul.appendChild(firstChild.cloneNode(true));
                lis = document.querySelectorAll('.view li');
                size = lis.length;
                setWidth();
                index--;
                ul.style.left = index * width + 'px';
                autoSlide();
            }
            function setWidth() {
                width = view.clientWidth;
                ul.style.width = width * size + 'px';
                for(var i=0; i<lis.length; i++) {
                    lis[i].style.width = width + 'px';
                }
            }
            window.onresize = function () {
                setWidth();
                ul.style.left = index * width + 'px';
            }
            ul.addEventListener('touchstart', function (ev) {
                clearInterval(timer);
                touch = ev.targetTouches[0];
                startX = touch.clientX;
            });
            ul.addEventListener('touchend', function (ev) {
                touch = ev.changedTouches[0];
                endX = touch.clientX;
                ul.style.transition = 'all 0.5s ease-in-out';
                if(endX > startX) {
                    index++;
                    ul.style.left = index * width + 'px';
                } else {
                    index--;
                    ul.style.left = index * width + 'px';
                }
                autoSlide();
            });
            ul.addEventListener('webkitTransitionEnd', function () {
                ul.style.transition = '';
                if(index == 0) {
                    index = 2 - size;
                }
                if(index == 1 - size) {
                    index = -1;
                }
                ul.style.left = index * width + 'px';
            });

            function autoSlide() {
                timer = setInterval(function () {
                    ul.style.transition = 'all 0.5s ease-in-out';
                    index--;
                    ul.style.left = index * width + 'px';
                }, 2500);
            }
            init();
})