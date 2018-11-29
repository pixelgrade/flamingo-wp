import { PluginSidebar } from "@wordpress/editPost";

import Icon from "../icon";

const Sidebar = () => (
  <PluginSidebar
    icon={<Icon borderless />}
    name="dropit-sidebar"
    title="Drop it: Unsplash.com"
  >

  </PluginSidebar>
);

export default Sidebar;
