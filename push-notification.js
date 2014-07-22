/**
@fileOverview

@toc

*/

'use strict';

angular.module('kwyspa.angular-push-notification', [])
    .provider('pushNotification', [

        function() {
            var Notify = window.Notification;
            this.enabled = Notify.permission === 'granted' ? true : false;

            this.icons = {
                'default': 'default.ico'
            };
            this.timeout = 0;

            this.$get = function() {
                var self = this;
                return {

                    prompt: function() {
                        if (Notify.permission === 'granted') {
                            self.enabled = true;
                            return;
                        }
                        Notify.requestPermission(function(status) {
                            if (Notify.permission !== status) {
                                Notify.permission = status;
                            }
                        });
                        self.enabled = (Notify.permission === 'granted') ? true : false;
                    },
                    push: function(title, body, icon, tag) {
                        if (arguments.length === 0 || self.enabled === false) {
                            return;
                        }

                        var options = {};


                        if (tag) {
                            options.tag = tag;
                        }

                        if (icon && self.icons[icon]) {
                            options.icon = self.icons[icon];
                        }

                        if (body) {
                            options.body = body;
                        }

                        var notification = new Notify(title, options);

                        if (self.timeout > 0) {
                            notification.onshow = function() {
                                setTimeout(function() {
                                    notification.close();
                                }, self.timeout);
                            };
                        }
                    },
                    isEnabled: function() {
                        return self.enabled;
                    },
                    disable: function() {
                        self.enabled = false;
                    },
                    enable: function() {
                        if (Notify.permission === 'granted') {
                            self.enabled = true;
                        }
                    }
                };
            };

            this.setIcons = function(icons) {
                this.icons = icons;
            };

            this.setCloseTime = function(ms) {
                this.timeout = ms;
            };
        }
    ]);
