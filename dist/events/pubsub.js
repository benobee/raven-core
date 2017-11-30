"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * @description pub sub design pattern
 *
 */

var pubSub = {
    topics: {},
    on: function on(topic, listener) {
        // create the topic if not yet created
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        // add the listener
        this.topics[topic].push(listener);
    },
    emit: function emit(topic, data) {
        // return if the topic doesn't exist, or there are no listeners
        if (!this.topics[topic] || this.topics[topic].length < 1) {
            return;
        }

        // send the event to all listeners
        this.topics[topic].forEach(function (listener) {
            return listener(data || {});
        });
    }
};

exports.default = pubSub;