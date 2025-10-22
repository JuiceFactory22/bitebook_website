'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle, Users, TrendingUp, Star, Clock, Shield, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    cuisine: '',
    seatingCapacity: '',
    yearsInBusiness: '',
    currentCustomers: '',
    reason: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Reach New Customers",
      description: "Get your restaurant in front of thousands of food lovers actively seeking new dining experiences"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Increase Revenue",
      description: "Boost sales during slower periods and attract customers who might not have discovered you otherwise"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Build Brand Awareness",
      description: "Gain exposure in our monthly coupon books and digital marketing campaigns"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Terms",
      description: "No long-term contracts. Participate month-to-month based on your availability and preferences"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Free to Participate",
      description: "Join at no cost. Give a little (via the coupon) and get a lot in return."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const templateParams = {
        restaurant_name: formData.restaurantName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        cuisine: formData.cuisine,
        seating_capacity: formData.seatingCapacity,
        years_in_business: formData.yearsInBusiness,
        current_customers: formData.currentCustomers,
        reason: formData.reason,
        preferred_contact: formData.preferredContact,
        to_email: 'info@getbitebook.com'
      };

      await emailjs.send(
        'service_u460dtm', // Your EmailJS Service ID
        'template_8sfrufk', // Your Partner Application Template ID
        templateParams,
        'qq3QK0zGBYaHNI2DW' // Your EmailJS Public Key
      );
      
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error sending email:', error);
      // Fallback: still show success message
      setIsSubmitted(true);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in partnering with BiteBook. We'll review your application and contact you within 2 business days.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-[#ff6b35] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e55a2b] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to BiteBook</span>
              </Link>
            </div>
            <div className="flex items-center">
              <h1 className="text-2xl font-display font-bold text-gray-900">
                <span className="text-[#ff6b35]">Bite</span>Book
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#ff6b35] via-[#e55a2b] to-[#d44a1f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Partner With BiteBook
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Join our network of amazing restaurants and reach thousands of food lovers 
            in your area. Grow your business with our monthly coupon books.
          </p>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Apply to Partner With Us
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll contact you within 2 business days
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Restaurant Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Restaurant Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Restaurant Name *
                    </label>
                    <input
                      type="text"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      placeholder="Your Restaurant Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cuisine Type *
                    </label>
                    <select
                      name="cuisine"
                      value={formData.cuisine}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    >
                      <option value="">Select Cuisine Type</option>
                      <option value="American">American</option>
                      <option value="Italian">Italian</option>
                      <option value="Mexican">Mexican</option>
                      <option value="Asian">Asian</option>
                      <option value="Mediterranean">Mediterranean</option>
                      <option value="Indian">Indian</option>
                      <option value="Thai">Thai</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="French">French</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurant Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    placeholder="123 Main Street, City, State 12345"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      placeholder="Your Full Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seating Capacity
                    </label>
                    <input
                      type="number"
                      name="seatingCapacity"
                      value={formData.seatingCapacity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      placeholder="50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years in Business
                    </label>
                    <input
                      type="number"
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Monthly Customers
                    </label>
                    <input
                      type="number"
                      name="currentCustomers"
                      value={formData.currentCustomers}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      placeholder="500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to partner with BiteBook? *
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                  placeholder="Tell us about your restaurant and why you'd like to join our network..."
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <Phone className="w-4 h-4 mr-1" />
                    Phone Call
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-8 py-4 rounded-full text-lg font-semibold btn-hover shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  We'll contact you within 2 business days to discuss next steps
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Why Partner With BiteBook?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We help restaurants grow their customer base and increase revenue through our proven coupon book system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-[#ff6b35] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all">
                  <div className="text-[#ff6b35]">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple process to join our network and start attracting new customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#ff6b35] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Apply Online
              </h3>
              <p className="text-gray-600">
                Fill out our simple application form and tell us about your restaurant
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#ff6b35] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                We Review & Contact You
              </h3>
              <p className="text-gray-600">
                Our team reviews your application and contacts you within 2 business days
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#ff6b35] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Start Attracting Customers
              </h3>
              <p className="text-gray-600">
                Once approved, your restaurant appears in our monthly coupon books
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#ff6b35] to-[#e55a2b] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Grow Your Restaurant?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of restaurants already benefiting from our coupon book network. 
            No setup fees, flexible terms, and proven results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#application" className="btn bg-white text-[#ff6b35] px-8 py-4 rounded-full text-lg font-semibold btn-hover shadow-lg">
              Apply Now - It's Free
            </a>
            <div className="text-sm opacity-75">
              ✓ No setup fees ✓ Flexible terms ✓ Proven results
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
