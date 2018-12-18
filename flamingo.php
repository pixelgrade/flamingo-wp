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

function flamingo_settings_page() {
	?>
	<div class="wrap">
        <div id="flamingo-system-picker"></div>
	</div>
<?php }

function flamingo_register_scripts() {
	wp_register_script('flamingo-sidebar', flamingo_url( 'dist/preview.js' ), array(), filemtime( flamingo_dir_path() . 'dist/preview.js' ), true );

	$script_params = array(
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'flamingo_token' => get_option( 'flamingo_token' ),
		'flamingo_system_id' => get_option( 'flamingo_system_id' ),
	);

	wp_enqueue_script( 'flamingo-sidebar' );
	wp_localize_script( 'flamingo-sidebar', 'scriptParams', $script_params );
}
add_action( 'admin_init', 'flamingo_register_scripts' );
add_action( 'wp_enqueue_scripts', 'flamingo_register_scripts' );

function flamingo_save_token_callback() {
	$token = $_POST['token'];
    update_option( 'flamingo_token', $token );
	die();
}
add_action('wp_ajax_flamingo_save_token', 'flamingo_save_token_callback');

function flamingo_save_system_callback() {
	$system_id = $_POST['id'];
	$css = $_POST['css'];
    update_option( 'flamingo_system_id', $system_id );
	die();
}
add_action('wp_ajax_flamingo_save_system', 'flamingo_save_system_callback');

function flamingo_css_output() {
	if ( !! $_GET['preview'] ) {
	    echo '<div id="flamingo-css-output" data-status="draft"></div>';
    } else {
		echo '<style>';
		echo get_flamingo_frontend_css();
		echo '</style>';
    }
}
add_action( 'wp_footer', 'flamingo_css_output' );

function get_flamingo_frontend_css() {

    // We will cache this config for a little while, just enough to avoid getting hammered by a broken theme mod entry
    $css = get_transient( 'flamingo_frontend_css' );
    $system_id = get_option( 'flamingo_system_id' );

    if ( false === $css ) {
        // Retrieve the config from the server
        $request_args = array(
            'method' => 'POST',
            'timeout'   => 4,
            'blocking'  => true,
            'body' => array(
                'token' => get_option( 'flamingo_token' ),
            ),
            'sslverify' => false,
        );
        $response = wp_remote_request( 'http://useflamingo.com/api/v1/systems/' . $system_id . '/css', $request_args  );
        if ( is_wp_error( $response ) ) {
            return false;
        }
        $response_data = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( null === $response_data || empty( $response_data['data']['css'] ) || 'success' !== $response_data['code'] ) {
            return false;
        }

        $css = $response_data['data']['css'];

        // Cache it
        set_transient( 'flamingo_frontend_css', $css, 6 * HOUR_IN_SECONDS );
    }
    return $css;
}

