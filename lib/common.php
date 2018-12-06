<?php

function flamingo_dir_path() {
	return plugin_dir_path( dirname(__FILE__ ) );
}

function flamingo_url( $path ) {
	return plugins_url( $path, dirname( __FILE__ ) );
}
