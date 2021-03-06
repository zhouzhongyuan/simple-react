import $ from 'jquery';
import instantiateReactComponent from '../util/instantiateReactComponent';
function ReactDomComponent(element) {
    this._currrentElement = element;
    this._rootNodeID = null;
}
ReactDomComponent.prototype.mountComponent = function (rootID) {
    this._rootNodeID = rootID;
    const tag = this._currrentElement.type;
    const props = this._currrentElement.props;
    let propsTag = ` data-reactid="${rootID}"`;
    let childrenMarkup = '';
    if (this._currrentElement.key) {
        propsTag += ` key="${this._currrentElement.key}"`;
    }
    for (const propKey in props) {
        if (Object.prototype.hasOwnProperty.call(props, propKey)) {
            // 事件
            if (/^on[A-Za-z]/.test(propKey)) {
                // 添加事件
                const eventType = propKey.replace('on', '');
                $(document).delegate(`[data-reactid="${this._rootNodeID}"]`, `${eventType}.${this._rootNodeID}`, props[propKey]);
                continue;
            }
            // children
            if (propKey === 'children') {
                continue;
            }
            // 普通
            propsTag += `${propKey}="${props[propKey]}"`;
        }
    }
    const children = props.children;
    children.forEach((child, index) => {
        const childInst = instantiateReactComponent(child);
        const rootID = `${this._rootNodeID}.${index}`;
        const markup = childInst.mountComponent(rootID);
        childrenMarkup += `${markup}`;
    });
    return `<${tag} ${propsTag}>${childrenMarkup}</${tag}>`;
};
export default ReactDomComponent;
