import $ from 'jquery';
import instantiateReactComponent from '../util/instantiateReactComponent';
function ReactCompositeComponent(element) {
    this._currentElement = element;
    this._rootNodeId = null;
    this._instance = null;
}
ReactCompositeComponent.prototype.mountComponent = function (rootID) {
    this._rootNodeId = rootID;
    const props = this._currentElement.props;
    const inst = new this._currentElement.type(props);
    this._instance = inst;
    inst._reactInternalInstance = this;
    if (inst.componentWillMount) {
        inst.componentWillMount();
    }
    const renderedElement = inst.render();
    const renderedComponent = instantiateReactComponent(renderedElement);
    this._renderedComponent = renderedComponent;
    const renderedMarkup = renderedComponent.mountComponent(this._rootNodeId);
    $(document).on('mountReady', () => {
        inst.componentDidMount && inst.componentDidMount();
    });
    return renderedMarkup;
};
export default ReactCompositeComponent;
