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


// create custom plugin settings menu
add_action('admin_menu', 'my_cool_plugin_create_menu');

function my_cool_plugin_create_menu() {

	//create new top-level menu
	add_menu_page('Style XY', 'Style XY', 'administrator', __FILE__, 'my_cool_plugin_settings_page' , plugins_url('/images/icon.png', __FILE__) );

	//call register settings function
	add_action( 'admin_init', 'register_my_cool_plugin_settings' );
}


function register_my_cool_plugin_settings() {
	//register our settings
	register_setting( 'my-cool-plugin-settings-group', 'new_option_name' );
	register_setting( 'my-cool-plugin-settings-group', 'some_other_option' );
	register_setting( 'my-cool-plugin-settings-group', 'option_etc' );
}

function my_cool_plugin_settings_page() {
	?>
	<div class="wrap">
		<h1>Choose Your Design System</h1>

        <div id="style-xy-container"></div>

		<form method="post" action="options.php">
			<?php settings_fields( 'my-cool-plugin-settings-group' ); ?>
			<?php do_settings_sections( 'my-cool-plugin-settings-group' ); ?>
			<table class="form-table">
				<tr valign="top">
					<th scope="row">New Option Name</th>
					<td><input type="text" name="new_option_name" value="<?php echo esc_attr( get_option('new_option_name') ); ?>" /></td>
				</tr>
				<tr valign="top">
					<th scope="row">Some Other Option</th>
					<td><input type="text" name="some_other_option" value="<?php echo esc_attr( get_option('some_other_option') ); ?>" /></td>
				</tr>
				<tr valign="top">
					<th scope="row">Options, Etc.</th>
					<td><input type="text" name="option_etc" value="<?php echo esc_attr( get_option('option_etc') ); ?>" /></td>
				</tr>
			</table>

			<?php submit_button(); ?>

		</form>
	</div>
<?php }

function dropit_sidebar_script_register() {

	wp_register_script(
		'dropit-sidebar',
		dropit_url( 'scripts/settings/build/index.js' ),
		array( 'wp-plugins', 'wp-element', 'wp-edit-post', 'wp-i18n', 'wp-api-request', 'wp-data', 'wp-components', 'wp-blocks', 'wp-editor', 'dropit-i18n' ),
		filemtime( dropit_dir_path() . 'scripts/settings/build/index.js' ),
		true
	);

	wp_register_style(
		'dropit-sidebar',
		dropit_url( 'scripts/sidebar/build/style.css' ),
		array(),
		filemtime( dropit_dir_path() . 'scripts/sidebar/build/style.css' )
	);

	$script_params = array(
		'system_id' => get_option( 'new_option_name' )
	);

	wp_enqueue_script( 'dropit-sidebar' );
	wp_enqueue_style( 'dropit-sidebar' );
	wp_localize_script( 'dropit-sidebar', 'scriptParams', $script_params );
}
add_action( 'admin_init', 'dropit_sidebar_script_register' );

