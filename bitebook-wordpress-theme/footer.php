    </div><!-- #content -->

    <footer id="colophon" class="site-footer bg-gray-900 text-white py-12">
        <div class="container">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-2xl font-display font-bold mb-4">
                        <span class="text-primary">Bite</span>Book
                    </h3>
                    <p class="text-gray-400 text-sm">
                        Connecting food lovers with amazing local restaurants through incredible coupon deals.
                    </p>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#promotions" class="hover:text-white transition-colors">Monthly Promotions</a></li>
                        <li><a href="#restaurants" class="hover:text-white transition-colors">Partner Restaurants</a></li>
                        <li><a href="#how-it-works" class="hover:text-white transition-colors">How It Works</a></li>
                        <li><a href="<?php echo home_url('/contact'); ?>" class="hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-4">For Restaurants</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="<?php echo home_url('/partner'); ?>" class="hover:text-white transition-colors">Partner With Us</a></li>
                        <li><a href="<?php echo home_url('/restaurant-benefits'); ?>" class="hover:text-white transition-colors">Restaurant Benefits</a></li>
                        <li><a href="<?php echo home_url('/application-process'); ?>" class="hover:text-white transition-colors">Application Process</a></li>
                        <li><a href="<?php echo home_url('/support'); ?>" class="hover:text-white transition-colors">Support</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <div class="text-sm text-gray-400 space-y-2">
                        <div>Boston Metro Area</div>
                        <div>hello@bitebook.com</div>
                        <div>(555) 123-4567</div>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; <?php echo date('Y'); ?> BiteBook. All rights reserved. | 
                <a href="<?php echo home_url('/terms'); ?>" class="hover:text-white">Terms of Service</a> | 
                <a href="<?php echo home_url('/privacy'); ?>" class="hover:text-white">Privacy Policy</a></p>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
