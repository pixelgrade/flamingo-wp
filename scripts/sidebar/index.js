import "./style.scss";

import Sidebar from "./components/sidebar";
import MenuItem from "./components/menu-item";
import SystemList from "./components/system-list";

const { Fragment } = wp.element;
const { registerPlugin } = wp.plugins;
const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.editor;

const handleUpdate = () => {
    console.log('aisha');
}

const withInspectorControls =  createHigherOrderComponent( ( BlockEdit ) => {

    return ( props ) => {
        return (
            <Fragment>
                <BlockEdit { ...props } />
                <InspectorControls>
                    <SystemList onUpdate={handleUpdate}/>
                </InspectorControls>
            </Fragment>
        );
    };
}, "withInspectorControl" );

wp.hooks.addFilter( 'editor.BlockEdit', 'my-plugin/with-inspector-controls', withInspectorControls );

const DropitPlugin = () => (
  <Fragment>
    <Sidebar />
    <MenuItem />
  </Fragment>
);

registerPlugin("dropit", {
  render: DropitPlugin
});
