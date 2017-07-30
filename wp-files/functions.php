<?php
/**
 * Requires WordPress 4.7 or later since REST V2 API started from 4.7.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.7-alpha', '<' ) ) {
	require get_template_directory() . 'back-compat.php';
	return;
}

/**
 * Enqueue scripts and styles.
 */
function scripts_setup() {
	$template = get_template_directory_uri();
	wp_enqueue_style('app', $template.'/app.bundle.css', false, null);
	wp_enqueue_script('app', $template.'/app.bundle.js', false, null);
}
add_action('wp_enqueue_scripts', 'scripts_setup');

add_action('pre_get_posts', function($query) {
  global $wp;
  if (!is_admin() && $query->is_main_query()) {
    $template = get_template_directory_uri();
    if ($wp->request == 'service-worker-js') {
      //header('Service-Worker-Allowed: "/wp-content/themes/pwawptheme/"');
      header('Content-Type: application/javascript');
      readfile($template.'/service-worker.js');
      exit;
    }
  }
});