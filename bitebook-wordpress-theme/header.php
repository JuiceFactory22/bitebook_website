<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Discover amazing deals at local restaurants with BiteBook coupon books. $29.99 for over $300 in savings at 30+ Boston area restaurants. Limited monthly themes - Taco, Breakfast, Pizza & Burger months.">
    <meta name="keywords" content="restaurant coupons, Boston restaurants, local dining deals, food coupons, restaurant discounts, Boston metro area dining">
    <meta name="author" content="BiteBook">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">
    <meta property="og:url" content="<?php echo home_url(); ?>">
    <meta property="og:title" content="BiteBook - Local Restaurant Coupon Books">
    <meta property="og:description" content="Discover amazing deals at local restaurants with BiteBook coupon books. $29.99 for over $300 in savings at 30+ Boston area restaurants.">
    <meta property="og:site_name" content="BiteBook">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="BiteBook - Local Restaurant Coupon Books">
    <meta name="twitter:description" content="Discover amazing deals at local restaurants with BiteBook coupon books. $29.99 for over $300 in savings at 30+ Boston area restaurants.">
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BiteBook",
        "description": "Local restaurant coupon book service providing amazing deals at Boston area restaurants",
        "url": "<?php echo home_url(); ?>",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Boston",
            "addressRegion": "MA",
            "addressCountry": "US"
        },
        "offers": {
            "@type": "Offer",
            "price": "<?php echo get_theme_mod('book_price', '29.99'); ?>",
            "priceCurrency": "USD",
            "description": "Monthly restaurant coupon book with over $<?php echo get_theme_mod('book_value', '300'); ?> in savings"
        }
    }
    </script>
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header id="masthead" class="site-header">
        <!-- Navigation -->
        <nav class="navbar">
            <div class="container">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <a class="navbar-brand" href="<?php echo home_url(); ?>">
                            <span class="primary">Bite</span>Book
                        </a>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a href="#promotions" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Monthly Promotions
                            </a>
                            <a href="#restaurants" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Partner Restaurants
                            </a>
                            <a href="#how-it-works" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                How It Works
                            </a>
                            <a href="<?php echo home_url('/checkout'); ?>" class="btn btn-primary text-sm">
                                Buy Now - $<?php echo get_theme_mod('book_price', '29.99'); ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <div id="content" class="site-content">
