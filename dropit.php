<?php
/**
 * Plugin Name: Style XY for Gutenberg
 * Plugin URI: https://github.com/razwan/dropit
 * Description: Easily integrate your Style XY design system with Gutenberg.
 * Version: 0.1.0
 * Text Domain: style-xy
 * Domain Path: /languages
 * Author: Pixelgrade
 *
 * @package dropit
 */

 // Some common utilities
require_once dirname( __FILE__ ) . '/lib/common.php';

// Registering Script Files
require_once dirname( __FILE__ ) . '/lib/i18n-script.php';
require_once dirname( __FILE__ ) . '/lib/sidebar-script.php';
