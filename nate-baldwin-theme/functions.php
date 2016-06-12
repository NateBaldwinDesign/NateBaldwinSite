<?php
	/**
	 * Starkers functions and definitions
	 *
	 * For more information on hooks, actions, and filters, see http://codex.wordpress.org/Plugin_API.
	 *
 	 * @package 	WordPress
 	 * @subpackage 	Starkers
 	 * @since 		Starkers 4.0
	 */

	/* ========================================================================================================================
	
	Required external files
	
	======================================================================================================================== */

	require_once( 'external/starkers-utilities.php' );
	
	
	
	// Define what post types to search
function searchAll( $query ) {
	if ( $query->is_search ) {
		$query->set( 'post_type', array( 'post', 'page', 'feed', 'case-study'));
	}
	return $query;
}

// The hook needed to search ALL content
add_filter( 'the_search_query', 'searchAll' );

	/* ========================================================================================================================
	
	Theme specific settings

	Uncomment register_nav_menus to enable a single menu with the title of "Primary Navigation" in your theme
	
	======================================================================================================================== */

	add_theme_support('post-thumbnails');
	
 register_nav_menus(array('MainMenu' => 'MainMenu'));

 register_sidebar( array(
    'name'         => __( 'Portfolio Menu' ),
    'id'           => 'portfoliomenu',
    'description'  => __( 'Widgets in this area will be shown on the right-hand side.' ),
    'before_title' => '<h1>',
    'after_title'  => '</h1>',
) );

 register_sidebar( array(
    'name'         => __( 'Blog Menu' ),
    'id'           => 'blog-menu',
    'description'  => __( 'Widgets in this area will be shown on the right-hand side.' ),
    'before_title' => '<hr/><h3 class="widgetTitle">',
    'after_title'  => '</h3>',
) );


	
	/* ========================================================================================================================
	
	Actions and Filters
	
	======================================================================================================================== */

	add_action( 'wp_enqueue_scripts', 'starkers_script_enqueuer' );

	add_filter( 'body_class', array( 'Starkers_Utilities', 'add_slug_to_body_class' ) );
	
	// add_action( 'wp_ajax_nopriv_my_action', 'my_action_callback' ); <-- beginning stages for plugin to include jquery filtering as a menu...?

	/* ========================================================================================================================
	
	Custom Post Types - include custom post types and taxonimies here e.g.

	e.g. require_once( 'custom-post-types/your-custom-post-type.php' );
	
	======================================================================================================================== */
/**
 * Load custom post type archive on home page
 *
 * Reference: http://www.wpaustralia.org/wordpress-forums/topic/pre_get_posts-and-is_front_page/
 * Reference: http://wordpress.stackexchange.com/questions/30851/how-to-use-a-custom-post-type-archive-as-front-page
 */
function prefix_work_front_page( $query ) {

    // Only filter the main query on the front-end
    if ( is_admin() || ! $query->is_main_query() ) {
    	return;
    }

    global $wp;
    $front = false;

	// If the latest posts are showing on the home page
    if ( ( is_home() && empty( $wp->query_string ) ) ) {
    	$front = true;
    }

	// If a static page is set as the home page
    if ( ( $query->get( 'page_id' ) == get_option( 'page_on_front' ) && get_option( 'page_on_front' ) ) || empty( $wp->query_string ) ) {
    	$front = true;
    }

    if ( $front ) :

        $query->set( 'post_type', 'work' );
        $query->set( 'page_id', '' );

        // Set properties to match an archive
        $query->is_page = 0;
        $query->is_singular = 0;
        $query->is_post_type_archive = 1;
        $query->is_archive = 1;

    endif;

}
add_action( 'pre_get_posts', 'prefix_work_front_page' );


	/* ========================================================================================================================
	
	Scripts
	
	======================================================================================================================== */

	/**
	 * Add scripts via wp_head()
	 *
	 * @return void
	 * @author Keir Whitaker
	 */
	 

	
	function starkers_script_enqueuer() {
		wp_register_script( 'site', get_template_directory_uri().'/js/site.js', array( 'jquery' ) );
		wp_enqueue_script( 'site' );

		wp_register_style( 'screen', get_stylesheet_directory_uri().'/style.css', '', '', 'screen' );
        wp_enqueue_style( 'screen' );
	}	

	/* ========================================================================================================================
	
	Comments
	
	======================================================================================================================== */

	/**
	 * Custom callback for outputting comments 
	 *
	 * @return void
	 * @author Keir Whitaker
	 */
	function starkers_comment( $comment, $args, $depth ) {
		$GLOBALS['comment'] = $comment; 
		?>
		<?php if ( $comment->comment_approved == '1' ): ?>	
		<li>
			<article id="comment-<?php comment_ID() ?>">
				<?php echo get_avatar( $comment ); ?>
				<h4><?php comment_author_link() ?></h4>
				<time><a href="#comment-<?php comment_ID() ?>" pubdate><?php comment_date() ?> at <?php comment_time() ?></a></time>
				<?php comment_text() ?>
			</article>
		<?php endif;
	}