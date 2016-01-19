var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var _ = require("lodash");
var Rcslider = require("rc-slider");
require("../styles/index.scss");
var core_1 = require("../../../../../core");
var RangeFilter = (function (_super) {
    __extends(RangeFilter, _super);
    function RangeFilter(props) {
        this.state = {
            min: 0,
            max: 100
        };
        _super.call(this, props);
    }
    RangeFilter.prototype.defineAccessor = function () {
        return new core_1.RangeAccessor(this.props.id, { id: this.props.id, title: this.props.title, min: this.props.min, max: this.props.max, field: this.props.field });
    };
    RangeFilter.prototype.defineBEMBlocks = function () {
        var block = this.props.mod || "range-filter";
        return {
            container: block,
            labels: block + "-value-labels"
        };
    };
    RangeFilter.prototype.sliderUpdate = function (newValues) {
        this.accessor.state = this.accessor.state.setValue({ min: newValues[0], max: newValues[1] });
        this.forceUpdate();
    };
    RangeFilter.prototype.sliderUpdateAndSearch = function (newValues) {
        this.sliderUpdate(newValues);
        this.searchkit.performSearch();
    };
    RangeFilter.prototype.getHistogram = function () {
        var values = this.accessor.getBuckets();
        var maxValue = _.max(_.pluck(this.accessor.getBuckets(), "doc_count"));
        return (React.createElement("div", {"className": "bar-chart"}, _.map(this.accessor.getBuckets(), function (value, i) {
            return React.createElement("div", {"className": "bar-chart__bar", "key": i, "style": {
                height: (value.doc_count / maxValue) * 100 + "%"
            }});
        })));
    };
    RangeFilter.prototype.render = function () {
        var block = this.bemBlocks.container;
        return (React.createElement("div", {"className": block()}, React.createElement("div", {"className": block("header")}, this.translate(this.props.title)), this.getHistogram(), React.createElement(Rcslider, {"min": this.props.min, "max": this.props.max, "range": true, "value": [
            _.get(this.accessor.state.getValue(), "min", this.props.min),
            _.get(this.accessor.state.getValue(), "max", this.props.max)
        ], "onChange": this.sliderUpdate.bind(this), "onAfterChange": this.sliderUpdateAndSearch.bind(this)}), React.createElement("div", {"className": block("x-label").mix(this.bemBlocks.labels())}, React.createElement("div", {"className": this.bemBlocks.labels("min")}, this.props.min), React.createElement("div", {"className": this.bemBlocks.labels("max")}, this.props.max))));
    };
    RangeFilter.propTypes = _.defaults({
        field: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired
    }, core_1.SearchkitComponent.propTypes);
    return RangeFilter;
})(core_1.SearchkitComponent);
exports.RangeFilter = RangeFilter;
//# sourceMappingURL=RangeFilter.js.map