<?php
/**
 * Template Name: Checkout Page
 */

get_header(); ?>

<main id="main" class="site-main">
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-gray-100">
            <div class="container">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <a href="<?php echo home_url(); ?>" class="flex items-center text-gray-600 hover:text-gray-900">
                            <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            <span class="text-gray-600 hover:text-gray-900">Back to BiteBook</span>
                        </a>
                    </div>
                    <div class="flex items-center">
                        <h1 class="text-2xl font-display font-bold text-gray-900">
                            <span class="text-primary">Bite</span>Book
                        </h1>
                    </div>
                </div>
            </div>
        </header>

        <div class="container py-12">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Order Summary -->
                <div class="order-2 lg:order-1">
                    <div class="card p-8">
                        <h2 class="text-2xl font-display font-bold text-gray-900 mb-6">
                            Your BiteBook Order
                        </h2>
                        
                        <!-- Product Details -->
                        <div class="border border-gray-200 rounded-lg p-6 mb-6">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">
                                        <?php echo date('F Y'); ?> - <?php echo get_theme_mod('current_theme', 'Nacho Month'); ?>
                                    </h3>
                                    <p class="text-gray-600 text-sm">
                                        "Stacked. Loaded. Melted." - Nacho deals from Boston's best casual dining spots
                                    </p>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-primary" id="price-display">
                                        $<?php echo get_theme_mod('book_price', '29.99'); ?>
                                    </div>
                                    <div class="text-sm text-gray-500 line-through">
                                        $<?php echo get_theme_mod('book_value', '300'); ?> value
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Subscription Toggle -->
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h4 class="font-semibold text-blue-900">Subscribe & Save 30%</h4>
                                        <p class="text-sm text-blue-700">Get your BiteBook delivered monthly</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" id="subscription-toggle" class="sr-only peer">
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <div id="subscription-info" class="mt-3 text-sm text-blue-800" style="display: none;">
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span>Cancel anytime • No commitment</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Value Breakdown -->
                            <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span>Original Value:</span>
                                    <span class="font-semibold">$<?php echo get_theme_mod('book_value', '300'); ?></span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span>Your Price:</span>
                                    <span class="font-semibold" id="price-display">$<?php echo get_theme_mod('book_price', '29.99'); ?></span>
                                </div>
                                <div id="discount-display" class="flex justify-between text-sm text-blue-600" style="display: none;">
                                    <span>Subscription Discount:</span>
                                    <span class="font-semibold">-$9.00</span>
                                </div>
                                <div class="border-t pt-2 flex justify-between text-sm font-bold text-green-600">
                                    <span>You Save:</span>
                                    <span id="savings-display">$270.01</span>
                                </div>
                            </div>
                        </div>

                        <!-- What's Included -->
                        <div class="mb-6">
                            <h4 class="font-semibold text-gray-900 mb-3">What's Included:</h4>
                            <div class="space-y-2">
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-sm text-gray-600">30+ restaurant coupons</span>
                                </div>
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-sm text-gray-600">30-day validity</span>
                                </div>
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-sm text-gray-600">Boston metro area coverage</span>
                                </div>
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-sm text-gray-600">Digital coupon access</span>
                                </div>
                            </div>
                        </div>

                        <!-- Trust Badges -->
                        <div class="flex items-center justify-center space-x-6 text-sm text-gray-500">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                <span>Secure Payment</span>
                            </div>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                                <span>Instant Access</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Checkout Form -->
                <div class="order-1 lg:order-2">
                    <div class="card p-8">
                        <h2 class="text-2xl font-display font-bold text-gray-900 mb-6">
                            Complete Your Purchase
                        </h2>

                        <form id="checkout-form" class="space-y-6">
                            <!-- Customer Information -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                                    Customer Information
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            First Name *
                                        </label>
                                        <input type="text" name="first_name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="John">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name *
                                        </label>
                                        <input type="text" name="last_name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Doe">
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="john@example.com">
                                </div>
                            </div>

                            <!-- Payment Information -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                                    Payment Information
                                </h3>
                                <div class="bg-gray-50 rounded-lg p-6 text-center">
                                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                    </svg>
                                    <p class="text-gray-600 mb-4">
                                        Payment processing will be integrated here
                                    </p>
                                    <div class="bg-primary text-white px-6 py-3 rounded-lg font-semibold" id="total-display">
                                        Total: $<?php echo get_theme_mod('book_price', '29.99'); ?>
                                    </div>
                                </div>
                            </div>

                            <!-- Terms -->
                            <div class="flex items-start">
                                <input type="checkbox" name="terms" id="terms" class="mt-1 mr-3" required>
                                <label for="terms" class="text-sm text-gray-600">
                                    I agree to the <a href="<?php echo home_url('/terms'); ?>" class="text-primary hover:underline">Terms of Service</a> and <a href="<?php echo home_url('/privacy'); ?>" class="text-primary hover:underline">Privacy Policy</a>
                                </label>
                            </div>

                            <!-- Place Order Button -->
                            <button type="submit" id="order-button" class="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-lg font-semibold text-lg btn-hover shadow-lg transition-all duration-300">
                                Place Order - $<?php echo get_theme_mod('book_price', '29.99'); ?>
                            </button>

                            <p id="delivery-message" class="text-xs text-gray-500 text-center">
                                Your coupon book will be delivered instantly via email
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
