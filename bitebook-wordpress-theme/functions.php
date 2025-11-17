<?php
/**
 * BiteBook Theme Functions
 */

// Enqueue styles and scripts
function bitebook_enqueue_scripts() {
    // Enqueue theme stylesheet
    wp_enqueue_style('bitebook-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Enqueue Google Fonts
    wp_enqueue_style('bitebook-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap', array(), null);
    
    // Enqueue JavaScript for carousel functionality
    wp_enqueue_script('bitebook-carousel', get_template_directory_uri() . '/js/carousel.js', array('jquery'), '1.0.0', true);
    
    // Enqueue checkout functionality
    wp_enqueue_script('bitebook-checkout', get_template_directory_uri() . '/js/checkout.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'bitebook_enqueue_scripts');

// Theme setup
function bitebook_setup() {
    // Add theme support for various features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'bitebook'),
        'footer' => __('Footer Menu', 'bitebook'),
    ));
}
add_action('after_setup_theme', 'bitebook_setup');

// Register widget areas
function bitebook_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'bitebook'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here.', 'bitebook'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'bitebook_widgets_init');

// Custom post type for monthly promotions
function bitebook_create_promotions_post_type() {
    register_post_type('monthly_promotions',
        array(
            'labels' => array(
                'name' => __('Monthly Promotions', 'bitebook'),
                'singular_name' => __('Monthly Promotion', 'bitebook'),
                'add_new' => __('Add New Promotion', 'bitebook'),
                'add_new_item' => __('Add New Monthly Promotion', 'bitebook'),
                'edit_item' => __('Edit Monthly Promotion', 'bitebook'),
                'new_item' => __('New Monthly Promotion', 'bitebook'),
                'view_item' => __('View Monthly Promotion', 'bitebook'),
                'search_items' => __('Search Monthly Promotions', 'bitebook'),
                'not_found' => __('No monthly promotions found', 'bitebook'),
                'not_found_in_trash' => __('No monthly promotions found in Trash', 'bitebook'),
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'menu_icon' => 'dashicons-calendar-alt',
        )
    );
}
add_action('init', 'bitebook_create_promotions_post_type');

// Custom post type for partner restaurants
function bitebook_create_restaurants_post_type() {
    register_post_type('partner_restaurants',
        array(
            'labels' => array(
                'name' => __('Partner Restaurants', 'bitebook'),
                'singular_name' => __('Partner Restaurant', 'bitebook'),
                'add_new' => __('Add New Restaurant', 'bitebook'),
                'add_new_item' => __('Add New Partner Restaurant', 'bitebook'),
                'edit_item' => __('Edit Partner Restaurant', 'bitebook'),
                'new_item' => __('New Partner Restaurant', 'bitebook'),
                'view_item' => __('View Partner Restaurant', 'bitebook'),
                'search_items' => __('Search Partner Restaurants', 'bitebook'),
                'not_found' => __('No partner restaurants found', 'bitebook'),
                'not_found_in_trash' => __('No partner restaurants found in Trash', 'bitebook'),
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'menu_icon' => 'dashicons-store',
        )
    );
}
add_action('init', 'bitebook_create_restaurants_post_type');

// Add custom fields for monthly promotions
function bitebook_add_promotion_meta_boxes() {
    add_meta_box(
        'promotion_details',
        __('Promotion Details', 'bitebook'),
        'bitebook_promotion_meta_box_callback',
        'monthly_promotions',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'bitebook_add_promotion_meta_boxes');

function bitebook_promotion_meta_box_callback($post) {
    wp_nonce_field('bitebook_promotion_meta_box', 'bitebook_promotion_meta_box_nonce');
    
    $tagline = get_post_meta($post->ID, '_promotion_tagline', true);
    $icon = get_post_meta($post->ID, '_promotion_icon', true);
    $month = get_post_meta($post->ID, '_promotion_month', true);
    $color = get_post_meta($post->ID, '_promotion_color', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="promotion_tagline">Tagline</label></th>';
    echo '<td><input type="text" id="promotion_tagline" name="promotion_tagline" value="' . esc_attr($tagline) . '" size="50" /></td></tr>';
    
    echo '<tr><th><label for="promotion_icon">Icon (Emoji)</label></th>';
    echo '<td><input type="text" id="promotion_icon" name="promotion_icon" value="' . esc_attr($icon) . '" size="10" /></td></tr>';
    
    echo '<tr><th><label for="promotion_month">Month</label></th>';
    echo '<td><select id="promotion_month" name="promotion_month">';
    $months = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    foreach($months as $month_option) {
        echo '<option value="' . $month_option . '"' . selected($month, $month_option, false) . '>' . $month_option . '</option>';
    }
    echo '</select></td></tr>';
    
    echo '<tr><th><label for="promotion_color">Color Class</label></th>';
    echo '<td><input type="text" id="promotion_color" name="promotion_color" value="' . esc_attr($color) . '" size="30" placeholder="from-orange-400 to-red-500" /></td></tr>';
    echo '</table>';
}

function bitebook_save_promotion_meta($post_id) {
    if (!isset($_POST['bitebook_promotion_meta_box_nonce'])) return;
    if (!wp_verify_nonce($_POST['bitebook_promotion_meta_box_nonce'], 'bitebook_promotion_meta_box')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    
    if (isset($_POST['promotion_tagline'])) {
        update_post_meta($post_id, '_promotion_tagline', sanitize_text_field($_POST['promotion_tagline']));
    }
    if (isset($_POST['promotion_icon'])) {
        update_post_meta($post_id, '_promotion_icon', sanitize_text_field($_POST['promotion_icon']));
    }
    if (isset($_POST['promotion_month'])) {
        update_post_meta($post_id, '_promotion_month', sanitize_text_field($_POST['promotion_month']));
    }
    if (isset($_POST['promotion_color'])) {
        update_post_meta($post_id, '_promotion_color', sanitize_text_field($_POST['promotion_color']));
    }
}
add_action('save_post', 'bitebook_save_promotion_meta');

// Add custom fields for partner restaurants
function bitebook_add_restaurant_meta_boxes() {
    add_meta_box(
        'restaurant_details',
        __('Restaurant Details', 'bitebook'),
        'bitebook_restaurant_meta_box_callback',
        'partner_restaurants',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'bitebook_add_restaurant_meta_boxes');

function bitebook_restaurant_meta_box_callback($post) {
    wp_nonce_field('bitebook_restaurant_meta_box', 'bitebook_restaurant_meta_box_nonce');
    
    $location = get_post_meta($post->ID, '_restaurant_location', true);
    $specialty = get_post_meta($post->ID, '_restaurant_specialty', true);
    $rating = get_post_meta($post->ID, '_restaurant_rating', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="restaurant_location">Location</label></th>';
    echo '<td><input type="text" id="restaurant_location" name="restaurant_location" value="' . esc_attr($location) . '" size="50" /></td></tr>';
    
    echo '<tr><th><label for="restaurant_specialty">Specialty</label></th>';
    echo '<td><input type="text" id="restaurant_specialty" name="restaurant_specialty" value="' . esc_attr($specialty) . '" size="50" /></td></tr>';
    
    echo '<tr><th><label for="restaurant_rating">Rating (1-5)</label></th>';
    echo '<td><input type="number" id="restaurant_rating" name="restaurant_rating" value="' . esc_attr($rating) . '" min="1" max="5" step="0.1" /></td></tr>';
    echo '</table>';
}

function bitebook_save_restaurant_meta($post_id) {
    if (!isset($_POST['bitebook_restaurant_meta_box_nonce'])) return;
    if (!wp_verify_nonce($_POST['bitebook_restaurant_meta_box_nonce'], 'bitebook_restaurant_meta_box')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    
    if (isset($_POST['restaurant_location'])) {
        update_post_meta($post_id, '_restaurant_location', sanitize_text_field($_POST['restaurant_location']));
    }
    if (isset($_POST['restaurant_specialty'])) {
        update_post_meta($post_id, '_restaurant_specialty', sanitize_text_field($_POST['restaurant_specialty']));
    }
    if (isset($_POST['restaurant_rating'])) {
        update_post_meta($post_id, '_restaurant_rating', sanitize_text_field($_POST['restaurant_rating']));
    }
}
add_action('save_post', 'bitebook_save_restaurant_meta');

// Customizer options
function bitebook_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('bitebook_hero', array(
        'title' => __('Hero Section', 'bitebook'),
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('hero_title', array(
        'default' => 'Discover Amazing Local Restaurant Deals',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('hero_title', array(
        'label' => __('Hero Title', 'bitebook'),
        'section' => 'bitebook_hero',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('hero_subtitle', array(
        'default' => 'Get over $300 in savings at 30+ Boston area restaurants for just $29.99. Limited monthly themes - books sell out fast!',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('hero_subtitle', array(
        'label' => __('Hero Subtitle', 'bitebook'),
        'section' => 'bitebook_hero',
        'type' => 'textarea',
    ));
    
    // Pricing
    $wp_customize->add_section('bitebook_pricing', array(
        'title' => __('Pricing', 'bitebook'),
        'priority' => 31,
    ));
    
    $wp_customize->add_setting('book_price', array(
        'default' => '29.99',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('book_price', array(
        'label' => __('Book Price', 'bitebook'),
        'section' => 'bitebook_pricing',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('book_value', array(
        'default' => '300',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('book_value', array(
        'label' => __('Book Value', 'bitebook'),
        'section' => 'bitebook_pricing',
        'type' => 'text',
    ));
}
add_action('customize_register', 'bitebook_customize_register');

// Helper function to get monthly promotions
function get_monthly_promotions($limit = -1) {
    $args = array(
        'post_type' => 'monthly_promotions',
        'posts_per_page' => $limit,
        'meta_key' => '_promotion_month',
        'orderby' => 'meta_value',
        'order' => 'ASC'
    );
    
    return get_posts($args);
}

// Helper function to get partner restaurants
function get_partner_restaurants($limit = -1) {
    $args = array(
        'post_type' => 'partner_restaurants',
        'posts_per_page' => $limit,
        'orderby' => 'title',
        'order' => 'ASC'
    );
    
    return get_posts($args);
}
?>
