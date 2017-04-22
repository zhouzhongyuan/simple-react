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
            if (/^on.*/.test(propKey)) {
                // 添加事件
                continue;
            }
            // children
            if (propKey === 'children') {
                const children = props.children;
                children.forEach((child, index) => {
                    const childInst = instantiateReactComponent(child);
                    const rootID = `${this._rootNodeID}.${index}`;
                    const markup = childInst.mountComponent(rootID);
                    childrenMarkup += `${markup}`;
                });
                continue;
            }
            // 普通
            propsTag += `${propKey}="${props[propKey]}"`;
        }
    }
    return `<${tag} ${propsTag}>${childrenMarkup}</${tag}>`;
};
export default ReactDomComponent;
