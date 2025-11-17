<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content text-center">
                <h1 class="font-display mb-6" style="font-size: 3.5rem; line-height: 1.1;">
                    <?php echo get_theme_mod('hero_title', 'Discover Amazing Local Restaurant Deals'); ?>
                </h1>
                <p class="mb-8" style="font-size: 1.25rem; opacity: 0.9;">
                    <?php echo get_theme_mod('hero_subtitle', 'Get over $300 in savings at 30+ local restaurants for just $29.99. Limited monthly themes - books sell out fast!'); ?>
                </p>
                <div class="mb-12">
                    <a href="<?php echo home_url('/checkout'); ?>" class="btn btn-primary mr-4">Buy Your Coupon Book - $<?php echo get_theme_mod('book_price', '29.99'); ?></a>
                    <a href="#partner" class="btn btn-secondary">Partner With Us</a>
                </div>
                
                <!-- Events Carousel -->
                <div class="events-carousel">
                    <h3 class="font-display mb-8" style="font-size: 2rem;">Upcoming & Past Events</h3>
                    <div class="events-container" id="events-container">
                        <?php 
                        $promotions = get_monthly_promotions(8);
                        $current_month = date('n') - 1; // 0-indexed
                        
                        foreach($promotions as $index => $promotion):
                            $tagline = get_post_meta($promotion->ID, '_promotion_tagline', true);
                            $icon = get_post_meta($promotion->ID, '_promotion_icon', true);
                            $month = get_post_meta($promotion->ID, '_promotion_month', true);
                            $color = get_post_meta($promotion->ID, '_promotion_color', true);
                            
                            $month_names = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
                            $event_month_index = array_search($month, $month_names);
                            $is_sold_out = $event_month_index <= $current_month;
                        ?>
                        <div class="event-card <?php echo $is_sold_out ? '' : 'upcoming'; ?>">
                            <div class="status-badge <?php echo $is_sold_out ? 'sold-out' : 'upcoming'; ?>">
                                <?php echo $is_sold_out ? 'SOLD OUT' : 'UPCOMING'; ?>
                            </div>
                            <div style="font-size: 2.5rem; margin-bottom: 1rem;"><?php echo $icon; ?></div>
                            <div style="font-size: 1.125rem; font-weight: 700; color: black; margin-bottom: 0.5rem;">
                                <?php echo $month; ?>
                            </div>
                            <div style="font-size: 1.25rem; font-weight: 700; color: black; margin-bottom: 0.75rem;">
                                <?php echo $promotion->post_title; ?>
                            </div>
                            <div style="font-size: 0.875rem; color: black; opacity: 0.8; font-style: italic; margin-bottom: 0.75rem;">
                                "<?php echo $tagline; ?>"
                            </div>
                            <div style="font-size: 0.75rem; color: black; opacity: 0.7;">
                                <?php echo wp_trim_words($promotion->post_content, 15, '...'); ?>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    
                    <!-- Navigation -->
                    <button class="carousel-nav prev" onclick="moveCarousel(-1)">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <button class="carousel-nav next" onclick="moveCarousel(1)">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Monthly Promotions Section -->
    <section id="promotions" class="py-20 bg-gray-50">
        <div class="container">
            <div class="text-center mb-16">
                <h2 class="font-display mb-4" style="font-size: 2.5rem;">Monthly Promotions</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Each month features a different food theme with exclusive deals from local restaurants
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <?php 
                $all_promotions = get_monthly_promotions();
                foreach($all_promotions as $promotion):
                    $tagline = get_post_meta($promotion->ID, '_promotion_tagline', true);
                    $icon = get_post_meta($promotion->ID, '_promotion_icon', true);
                    $month = get_post_meta($promotion->ID, '_promotion_month', true);
                    $color = get_post_meta($promotion->ID, '_promotion_color', true);
                ?>
                <div class="card">
                    <div class="h-32 bg-gradient-to-r <?php echo $color; ?> flex items-center justify-center">
                        <span style="font-size: 3rem;"><?php echo $icon; ?></span>
                    </div>
                    <div class="p-6">
                        <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            <?php echo $month; ?>
                        </div>
                        <h3 class="text-xl font-display font-bold text-gray-900 mb-2">
                            <?php echo $promotion->post_title; ?>
                        </h3>
                        <p class="text-sm font-medium text-primary mb-2 italic">
                            "<?php echo $tagline; ?>"
                        </p>
                        <p class="text-gray-600 text-xs leading-relaxed">
                            <?php echo wp_trim_words($promotion->post_content, 20); ?>
                        </p>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
        <div class="container">
            <div class="text-center mb-16">
                <h2 class="font-display mb-4" style="font-size: 2.5rem;">Why Choose BiteBook?</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    We connect food lovers with amazing local restaurants while providing incredible value
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-display font-semibold text-gray-900 mb-3">30+ Local Restaurants</h3>
                    <p class="text-gray-600">Access deals from Boston's best local restaurants and hidden gems</p>
                </div>
                
                <div class="text-center">
                    <div class="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-display font-semibold text-gray-900 mb-3">Over $<?php echo get_theme_mod('book_value', '300'); ?> Value</h3>
                    <p class="text-gray-600">Get more than $<?php echo get_theme_mod('book_value', '300'); ?> in savings for just $<?php echo get_theme_mod('book_price', '29.99'); ?> - that's 90% off!</p>
                </div>
                
                <div class="text-center">
                    <div class="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-display font-semibold text-gray-900 mb-3">30-Day Validity</h3>
                    <p class="text-gray-600">All coupons are valid for 30 days from the month of purchase</p>
                </div>
                
                <div class="text-center">
                    <div class="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-display font-semibold text-gray-900 mb-3">Local Coverage</h3>
                    <p class="text-gray-600">Conveniently located restaurants throughout your area</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Partner Restaurants Section -->
    <section id="restaurants" class="py-20 bg-gray-50">
        <div class="container">
            <div class="text-center mb-16">
                <h2 class="font-display mb-4" style="font-size: 2.5rem;">Partner Restaurants</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Discover amazing local restaurants in our network
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php 
                $restaurants = get_partner_restaurants();
                foreach($restaurants as $restaurant):
                    $location = get_post_meta($restaurant->ID, '_restaurant_location', true);
                    $specialty = get_post_meta($restaurant->ID, '_restaurant_specialty', true);
                    $rating = get_post_meta($restaurant->ID, '_restaurant_rating', true);
                ?>
                <div class="card p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-display font-semibold text-gray-900">
                            <?php echo $restaurant->post_title; ?>
                        </h3>
                        <div class="flex items-center text-yellow-500">
                            <?php for($i = 0; $i < 5; $i++): ?>
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            <?php endfor; ?>
                        </div>
                    </div>
                    <div class="flex items-center text-gray-600 mb-2">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span class="text-sm"><?php echo $location; ?></span>
                    </div>
                    <div class="text-sm text-gray-500">
                        Specializes in: <?php echo $specialty; ?>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            
            <!-- Prominent Partner CTA Section -->
            <div class="mt-16 bg-primary text-white rounded-2xl p-12 text-center">
                <h3 class="text-3xl font-display font-bold mb-4">
                    Join Our Restaurant Network
                </h3>
                <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Partner with BiteBook and reach thousands of food lovers in your area. 
                    Increase your customer base and boost sales with our monthly coupon books.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="<?php echo home_url('/partner'); ?>" class="btn bg-white text-primary text-lg px-8 py-4 font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                        Become a Partner Restaurant
                    </a>
                    <div class="text-sm opacity-75">
                        ✓ No setup fees ✓ Flexible terms ✓ Proven results
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary text-white">
        <div class="container text-center">
            <h2 class="font-display mb-6" style="font-size: 2.5rem;">Ready to Start Saving?</h2>
            <p class="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers who have saved hundreds of dollars while discovering amazing local restaurants.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="<?php echo home_url('/checkout'); ?>" class="btn bg-white text-primary">Buy Now - $<?php echo get_theme_mod('book_price', '29.99'); ?></a>
                <div class="text-sm opacity-75">
                    ✓ Instant access ✓ 30-day validity ✓ Limited quantity
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
