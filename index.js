import $ from 'jquery';
import instantiateReactComponent from './src/util/instantiateReactComponent';
function ReactElement(type, key, props) {
    this.type = type;
    this.key = key;
    this.props = props;
}
function ReactClass() {}
ReactClass.prototype.render = function () {};
const React = {
    nextReactRootIndex: 0,
    createClass(spec) {
        const Constructor = function (props) {
            this.props = props;
            this.state = this.getInitialState ? this.getInitialState() : null;
        };
        Constructor.prototype = new ReactClass();
        Constructor.prototype.constructor = Constructor;
        $.extend(Constructor.prototype, spec);
        return Constructor;
    },
    createElement(type, config, children) {
        const props = {};
        let key;
        // 从props取得，剔除key
        for (const propKey in config) {
            if (config.hasOwnProperty(propKey)) {
                if (propKey === 'key') {
                    key = config[propKey];
                } else {
                    props[propKey] = config[propKey];
                }
            }
        }
        // 向props添加children
        props.children = [];
        const len = arguments.length;
        if (len === 3) {
            props.children.push(children);
        }
        if (len > 3) {
            for (let i = len - 3; i < len; i++) {
                props.children.push(arguments[i]);
            }
        }
        return new ReactElement(type, key, props);
    },
    render(element, container) {
        const inst = instantiateReactComponent(element);
        const markup = inst.mountComponent(React.nextReactRootIndex++);
        $(container).html(markup);
        $(document).trigger('mountReady');
    },
};
export default React;
