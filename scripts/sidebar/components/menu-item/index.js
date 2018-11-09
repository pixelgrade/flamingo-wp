import { PluginSidebarMoreMenuItem } from "@wordpress/editPost";
import { __ } from "@wordpress/i18n";

import Icon from "../icon";

const MenuItem = () => (
    <div>
      <PluginSidebarMoreMenuItem icon={<Icon borderless />} target="dropit-sidebar">
	      {__("Photos from Unsplash.com", "dropit")}
      </PluginSidebarMoreMenuItem>
      <PluginSidebarMoreMenuItem icon={<Icon borderless />} target="dropit-sidebar">
	      {__("Photos from Unsplash.com", "dropit")}
      </PluginSidebarMoreMenuItem>
      <PluginSidebarMoreMenuItem icon={<Icon borderless />} target="dropit-sidebar">
        {__("Photos from Unsplash.com", "dropit")}
      </PluginSidebarMoreMenuItem>
    </div>
);

export default MenuItem;
