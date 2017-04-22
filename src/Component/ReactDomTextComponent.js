function ReactDomTextComponent(element) {
    this._currrentElement = element;
    this._rootNodeID = null;
}
ReactDomTextComponent.prototype.mountComponent = function (rootID) {
    this._rootNodeID = rootID;
    return `<span data-reactid="${rootID}">${this._currrentElement}</span>`;
};
export default ReactDomTextComponent;
