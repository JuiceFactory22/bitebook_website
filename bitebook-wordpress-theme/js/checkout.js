/**
 * BiteBook Checkout JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    const subscriptionToggle = document.getElementById('subscription-toggle');
    const priceDisplay = document.getElementById('price-display');
    const totalDisplay = document.getElementById('total-display');
    const orderButton = document.getElementById('order-button');
    const deliveryMessage = document.getElementById('delivery-message');
    
    if (!subscriptionToggle) return;
    
    const regularPrice = 29.99;
    const subscriptionPrice = 20.99;
    const originalValue = 300;
    
    function updatePricing() {
        const isSubscription = subscriptionToggle.checked;
        const currentPrice = isSubscription ? subscriptionPrice : regularPrice;
        const savings = isSubscription ? (originalValue - subscriptionPrice) : (originalValue - regularPrice);
        const discount = isSubscription ? (regularPrice - subscriptionPrice) : 0;
        
        // Update price display
        if (priceDisplay) {
            priceDisplay.textContent = `$${currentPrice.toFixed(2)}`;
        }
        
        // Update total display
        if (totalDisplay) {
            totalDisplay.textContent = `$${currentPrice.toFixed(2)}`;
        }
        
        // Update order button
        if (orderButton) {
            orderButton.textContent = `${isSubscription ? 'Start Subscription' : 'Place Order'} - $${currentPrice.toFixed(2)}`;
        }
        
        // Update delivery message
        if (deliveryMessage) {
            deliveryMessage.textContent = isSubscription 
                ? 'Your first coupon book will be delivered instantly via email. Future books will be delivered monthly.'
                : 'Your coupon book will be delivered instantly via email';
        }
        
        // Update savings display
        const savingsElement = document.getElementById('savings-display');
        if (savingsElement) {
            savingsElement.textContent = `$${savings.toFixed(2)}`;
        }
        
        // Update discount display
        const discountElement = document.getElementById('discount-display');
        if (discountElement) {
            if (isSubscription && discount > 0) {
                discountElement.style.display = 'block';
                discountElement.textContent = `-$${discount.toFixed(2)}`;
            } else {
                discountElement.style.display = 'none';
            }
        }
        
        // Update subscription info
        const subscriptionInfo = document.getElementById('subscription-info');
        if (subscriptionInfo) {
            subscriptionInfo.style.display = isSubscription ? 'block' : 'none';
        }
    }
    
    // Event listener for subscription toggle
    subscriptionToggle.addEventListener('change', updatePricing);
    
    // Form validation
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(checkoutForm);
            const isSubscription = subscriptionToggle.checked;
            
            // Basic validation
            const firstName = formData.get('first_name');
            const lastName = formData.get('last_name');
            const email = formData.get('email');
            const terms = formData.get('terms');
            
            if (!firstName || !lastName || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!terms) {
                alert('Please agree to the Terms of Service and Privacy Policy.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitButton = checkoutForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;
            
            // Simulate payment processing
            setTimeout(function() {
                alert(`Thank you for your ${isSubscription ? 'subscription' : 'order'}! You will receive a confirmation email shortly.`);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Initialize pricing
    updatePricing();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') return; // Skip form submit buttons
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
});
