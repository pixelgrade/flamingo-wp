<?php
/**
 * Plugin Name: Flamingo for Wordpress
 * Plugin URI: https://github.com/pixelgrade/flamingo-wp
 * Description: Easily integrate your Flamingo design system with WordPress.
 * Version: 0.1.0
 * Text Domain: flamingo
 * Domain Path: /languages
 * Author: Pixelgrade
 *
 * @package flamingo
 */

require_once dirname( __FILE__ ) . '/lib/common.php';

function flamingo_create_menu() {
	// create new top-level menu
	add_menu_page('Flamingo', 'Flamingo', 'administrator', __FILE__, 'flamingo_settings_page', 'dashicons-admin-customizer' );
}
add_action('admin_menu', 'flamingo_create_menu');

// register our settings
function flamingo_register_settings() {
	register_setting( 'flamingo-settings-group', 'new_option_name' );
	register_setting( 'flamingo-settings-group', 'some_other_option' );
	register_setting( 'flamingo-settings-group', 'option_etc' );
}
add_action( 'admin_init', 'flamingo_register_settings' );

function flamingo_settings_page() {
	?>
	<div class="wrap">
		<h1>Choose Your Design System</h1>

        <div id="flamingo-system-picker"></div>

		<form method="post" action="options.php">
			<?php settings_fields( 'my-cool-plugin-settings-group' ); ?>
			<?php do_settings_sections( 'my-cool-plugin-settings-group' ); ?>
			<table class="form-table">
				<tr valign="top">
					<th scope="row">Design System ID</th>
					<td><input type="text" name="new_option_name" value="<?php echo esc_attr( get_option('new_option_name') ); ?>" /></td>
				</tr>
				<tr valign="top">
					<th scope="row">Frontend CSS</th>
					<td><textarea name="some_other_option"><?php echo esc_attr( get_option('some_other_option') ); ?></textarea></td>
				</tr>
				<tr valign="top">
					<th scope="row">Gutenberg CSS</th>
					<td><textarea name="option_etc"><?php echo esc_attr( get_option('option_etc') ); ?></textarea></td>
				</tr>
			</table>

			<?php submit_button(); ?>

		</form>
	</div>
<?php }

function flamingo_register_scripts() {
	wp_register_script('flamingo-sidebar', flamingo_url( 'dist/preview.js' ), array(), filemtime( flamingo_dir_path() . 'dist/preview.js' ), true );

	$script_params = array( 'system_id' => get_option( 'new_option_name' ) );

	wp_enqueue_script( 'flamingo-sidebar' );
	wp_localize_script( 'flamingo-sidebar', 'scriptParams', $script_params );
}
add_action( 'admin_init', 'flamingo_register_scripts' );
add_action( 'wp_enqueue_scripts', 'flamingo_register_scripts' );

function flamingo_css_output() {
	if ( !! $_GET['flamingo_preview'] ) {
	    echo '<div id="flamingo-css-output" data-status="draft"></div>';
    } else {
		echo '<div id="flamingo-css-output" data-status="published"></div>';
    }
}
add_action( 'wp_footer', 'flamingo_css_output' );

