var React = require('react');

var modal = React.createClass({
    displayName: "navController",
    propTypes: [],
    mixins: [authStore.mixin],
    getInitialState: function(){
        return {this.props.messages}
    },
    storeDidChange: function(){
    },
    render: function(){

        return (
            <div id="openModal" class="modalDialog">
	        <div>
		    <a href="#close" title="Close" class="close">X</a>
		    <h2>Modal Box</h2>
		    <p>This is a sample modal box that can be created using the powers of CSS3.</p>
		    <p>You could do a lot of things here like have a pop-up ad that shows when your website loads, or create a login/register form for users.</p>
	        </div>
            </div>
        );
    }

});

module.exports = modal;
