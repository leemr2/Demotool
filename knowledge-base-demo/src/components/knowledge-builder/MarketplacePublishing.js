import React, { useState, useEffect } from 'react';
import { useDemoContext } from '../../context/DemoContext';

const MarketplacePublishing = () => {
  const { state, dispatch, ACTION_TYPES } = useDemoContext();
  
  // State for form values
  const [pricingModel, setPricingModel] = useState({
    monthly: 199,
    annual: 1990,
    oneTime: 4990,
    customPricing: false
  });
  
  const [licenseOptions, setLicenseOptions] = useState({
    singleUser: true,
    team: true,
    enterprise: false,
    enterpriseCustom: '',
    reselling: false,
    resellingFee: 20
  });
  
  const [marketingInfo, setMarketingInfo] = useState({
    title: state.knowledgeBaseName || 'My Knowledge Base',
    shortDescription: '',
    fullDescription: '',
    category: 'Business',
    tags: [],
    featured: false,
    featuredCost: 499,
    logoUrl: ''
  });
  
  const [projections, setProjections] = useState({
    estimatedUsers: 100,
    conversionRate: 5,
    marketingBudget: 1000,
    timeframe: 12 // months
  });
  
  // Simulate analytics data
  const [analytics, setAnalytics] = useState({
    views: 0,
    clickThrough: 0,
    sales: 0,
    revenue: 0,
    customerRating: 0
  });
  
  // Calculate projections based on inputs
  useEffect(() => {
    // Simple projection model
    const monthlyCustomers = Math.round((projections.estimatedUsers * (projections.conversionRate / 100)));
    const monthlyRevenue = monthlyCustomers * pricingModel.monthly;
    const projectedRevenue = monthlyRevenue * projections.timeframe;
    const marketingROI = projections.marketingBudget > 0 ? 
      ((projectedRevenue - projections.marketingBudget) / projections.marketingBudget) * 100 : 0;
    
    // Update analytics with projected data
    setAnalytics({
      views: projections.estimatedUsers * projections.timeframe,
      clickThrough: Math.round(projections.estimatedUsers * 0.4 * projections.timeframe),
      sales: monthlyCustomers * projections.timeframe,
      revenue: projectedRevenue,
      customerRating: 4.7
    });
  }, [projections, pricingModel]);

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      if (!marketingInfo.tags.includes(e.target.value.trim())) {
        setMarketingInfo({
          ...marketingInfo,
          tags: [...marketingInfo.tags, e.target.value.trim()]
        });
      }
      e.target.value = '';
    }
  };

  // Remove a tag
  const removeTag = (tag) => {
    setMarketingInfo({
      ...marketingInfo,
      tags: marketingInfo.tags.filter(t => t !== tag)
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine all data for submission
    const publishingData = {
      pricing: pricingModel,
      licensing: licenseOptions,
      marketing: marketingInfo,
      projectedAnalytics: analytics
    };
    
    // Dispatch data to context
    dispatch({
      type: ACTION_TYPES.SET_PUBLISHING_DATA,
      payload: publishingData
    });
    
    // Navigate to next step or completion
    dispatch({ type: ACTION_TYPES.NEXT_STEP });
  };

  // Handle going back
  const handleBack = () => {
    dispatch({ type: ACTION_TYPES.PREVIOUS_STEP });
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Marketplace Publishing</h2>
      <p className="text-gray-600 mb-8">
        Configure how your knowledge base will appear in the marketplace and set your pricing model.
      </p>
      
      <form onSubmit={handleSubmit}>
        {/* Pricing Model Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing Model</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="monthlyPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Price ($)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="monthlyPrice"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={pricingModel.monthly}
                  onChange={(e) => setPricingModel({...pricingModel, monthly: parseFloat(e.target.value)})}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">/month</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="annualPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Annual Price ($)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="annualPrice"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={pricingModel.annual}
                  onChange={(e) => setPricingModel({...pricingModel, annual: parseFloat(e.target.value)})}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">/year</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Recommended: Set this to 10x your monthly price to encourage annual commitment.
              </p>
            </div>
            
            <div>
              <label htmlFor="oneTimePrice" className="block text-sm font-medium text-gray-700 mb-1">
                One-Time Purchase Price ($)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="oneTimePrice"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={pricingModel.oneTime}
                  onChange={(e) => setPricingModel({...pricingModel, oneTime: parseFloat(e.target.value)})}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                One-time purchases include lifetime access to the current version.
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center">
              <input
                id="customPricing"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={pricingModel.customPricing}
                onChange={(e) => setPricingModel({...pricingModel, customPricing: e.target.checked})}
              />
              <label htmlFor="customPricing" className="ml-2 block text-sm text-gray-700">
                Enable "Contact for Custom Pricing" option for enterprise customers
              </label>
            </div>
          </div>
        </div>
        
        {/* Licensing Options Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Licensing Options</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="singleUser"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={licenseOptions.singleUser}
                onChange={(e) => setLicenseOptions({...licenseOptions, singleUser: e.target.checked})}
              />
              <label htmlFor="singleUser" className="ml-2 block text-sm text-gray-700">
                Single User License
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="team"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={licenseOptions.team}
                onChange={(e) => setLicenseOptions({...licenseOptions, team: e.target.checked})}
              />
              <label htmlFor="team" className="ml-2 block text-sm text-gray-700">
                Team License (up to 10 users)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="enterprise"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={licenseOptions.enterprise}
                onChange={(e) => setLicenseOptions({...licenseOptions, enterprise: e.target.checked})}
              />
              <label htmlFor="enterprise" className="ml-2 block text-sm text-gray-700">
                Enterprise License
              </label>
            </div>
            
            {licenseOptions.enterprise && (
              <div className="ml-6">
                <label htmlFor="enterpriseCustom" className="block text-sm font-medium text-gray-700 mb-1">
                  Enterprise License Terms
                </label>
                <textarea
                  id="enterpriseCustom"
                  rows="2"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe your enterprise licensing terms and conditions"
                  value={licenseOptions.enterpriseCustom}
                  onChange={(e) => setLicenseOptions({...licenseOptions, enterpriseCustom: e.target.value})}
                ></textarea>
              </div>
            )}
            
            <div className="flex items-center">
              <input
                id="reselling"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={licenseOptions.reselling}
                onChange={(e) => setLicenseOptions({...licenseOptions, reselling: e.target.checked})}
              />
              <label htmlFor="reselling" className="ml-2 block text-sm text-gray-700">
                Allow Reselling Rights
              </label>
            </div>
            
            {licenseOptions.reselling && (
              <div className="ml-6">
                <label htmlFor="resellingFee" className="block text-sm font-medium text-gray-700 mb-1">
                  Reseller Commission (%)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="resellingFee"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="20"
                    min="0"
                    max="100"
                    value={licenseOptions.resellingFee}
                    onChange={(e) => setLicenseOptions({...licenseOptions, resellingFee: parseInt(e.target.value, 10)})}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Marketing Tools Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Marketing Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Knowledge Base Title
              </label>
              <input
                type="text"
                id="title"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Give your knowledge base a catchy title"
                value={marketingInfo.title}
                onChange={(e) => setMarketingInfo({...marketingInfo, title: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={marketingInfo.category}
                onChange={(e) => setMarketingInfo({...marketingInfo, category: e.target.value})}
              >
                <option value="Business">Business</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Legal">Legal</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Technology">Technology</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Short Description (max 150 characters)
              </label>
              <input
                type="text"
                id="shortDescription"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="A brief, compelling description of your knowledge base"
                maxLength="150"
                value={marketingInfo.shortDescription}
                onChange={(e) => setMarketingInfo({...marketingInfo, shortDescription: e.target.value})}
              />
              <p className="mt-1 text-xs text-gray-500">
                {marketingInfo.shortDescription.length}/150 characters
              </p>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Full Description
              </label>
              <textarea
                id="fullDescription"
                rows="4"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Detailed description of your knowledge base, its benefits, and unique selling points"
                value={marketingInfo.fullDescription}
                onChange={(e) => setMarketingInfo({...marketingInfo, fullDescription: e.target.value})}
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags (press Enter to add)
              </label>
              <input
                type="text"
                id="tags"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Add keywords to help users find your knowledge base"
                onKeyDown={handleTagInput}
              />
              
              <div className="mt-2 flex flex-wrap gap-2">
                {marketingInfo.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {tag}
                    <button
                      type="button"
                      className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                      onClick={() => removeTag(tag)}
                    >
                      <span className="sr-only">Remove tag</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="text"
                id="logoUrl"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter the URL for your logo image"
                value={marketingInfo.logoUrl}
                onChange={(e) => setMarketingInfo({...marketingInfo, logoUrl: e.target.value})}
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  id="featured"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={marketingInfo.featured}
                  onChange={(e) => setMarketingInfo({...marketingInfo, featured: e.target.checked})}
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Apply for Featured Status (+${marketingInfo.featuredCost}/month)
                </label>
              </div>
              <p className="mt-1 ml-6 text-xs text-gray-500">
                Featured knowledge bases appear at the top of search results and category listings.
              </p>
            </div>
          </div>
        </div>
        
        {/* Analytics & Projections Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Analytics Dashboard & Projections</h3>
            
            <div>
              <label htmlFor="timeframe" className="sr-only">Projection Timeframe</label>
              <select
                id="timeframe"
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={projections.timeframe}
                onChange={(e) => setProjections({...projections, timeframe: parseInt(e.target.value, 10)})}
              >
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="estimatedUsers" className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Monthly Visitors
              </label>
              <input
                type="number"
                id="estimatedUsers"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="100"
                min="0"
                value={projections.estimatedUsers}
                onChange={(e) => setProjections({...projections, estimatedUsers: parseInt(e.target.value, 10) || 0})}
              />
            </div>
            
            <div>
              <label htmlFor="conversionRate" className="block text-sm font-medium text-gray-700 mb-1">
                Expected Conversion Rate (%)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="conversionRate"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="5"
                  min="0"
                  max="100"
                  step="0.1"
                  value={projections.conversionRate}
                  onChange={(e) => setProjections({...projections, conversionRate: parseFloat(e.target.value) || 0})}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="marketingBudget" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Marketing Budget ($)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="marketingBudget"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                  placeholder="1000"
                  min="0"
                  value={projections.marketingBudget}
                  onChange={(e) => setProjections({...projections, marketingBudget: parseInt(e.target.value, 10) || 0})}
                />
              </div>
            </div>
          </div>
          
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Projected Views</h4>
              <p className="text-2xl font-bold text-gray-900">{analytics.views.toLocaleString()}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Click-Through</h4>
              <p className="text-2xl font-bold text-gray-900">{analytics.clickThrough.toLocaleString()}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Projected Sales</h4>
              <p className="text-2xl font-bold text-gray-900">{analytics.sales.toLocaleString()}</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-500 mb-1">Projected Revenue</h4>
              <p className="text-2xl font-bold text-blue-700">${analytics.revenue.toLocaleString()}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Avg. Customer Rating</h4>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900 mr-2">{analytics.customerRating.toFixed(1)}</span>
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="h-5 w-5" 
                      fill={i < Math.floor(analytics.customerRating) ? "currentColor" : "none"}
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      ></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Revenue Chart (for demo purposes, static) */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Revenue Projection</h4>
            <div className="h-48 flex items-end space-x-2">
              {[...Array(12)].map((_, i) => {
                const height = 20 + (i * 5) + (Math.random() * 10);
                const percentage = height > 100 ? 100 : height;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${percentage}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">M{i+1}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Marketing ROI */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-600 mb-2">Marketing ROI</h4>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-green-700">
                ${(analytics.revenue - (projections.marketingBudget * projections.timeframe)).toLocaleString()} profit
              </p>
              <p className="text-lg font-semibold text-green-700">
                {projections.marketingBudget > 0 ? 
                  `${(((analytics.revenue - (projections.marketingBudget * projections.timeframe)) / (projections.marketingBudget * projections.timeframe)) * 100).toFixed(1)}%` : 
                  'N/A'
                } return
              </p>
            </div>
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Marketplace Preview</h3>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-4">
            <div className="relative">
              {marketingInfo.featured && (
                <div className="bg-yellow-400 text-yellow-800 text-xs font-medium px-2.5 py-0.5 absolute right-0 top-0 rounded">
                  Featured
                </div>
              )}
              
              <h3 className="text-lg font-medium text-gray-900 mb-1">{marketingInfo.title}</h3>
              <p className="text-sm text-gray-500 mb-4">by Your Company Name</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className="h-5 w-5" 
                        fill={i < Math.floor(analytics.customerRating) ? "currentColor" : "none"}
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>
                    ))}
                  </span>
                  <span className="ml-2 text-sm text-gray-700">{analytics.customerRating} (0 reviews)</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {marketingInfo.shortDescription || "A brief description of your knowledge base will appear here."}
                </p>
              </div>
              
              <div className="mb-4">
                <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  {marketingInfo.category}
                </span>
                <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-green-100 text-green-800">
                  95% Coverage
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-purple-100 text-purple-800">
                  Updated Recently
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm font-medium text-gray-900">
                  <span>${pricingModel.monthly}/month</span>
                  <span>${pricingModel.annual}/year</span>
                  <span>${pricingModel.oneTime} one-time</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            This is how your knowledge base will appear in the marketplace. The preview updates as you change your settings.
          </p>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleBack}
          >
            Back
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Publish to Marketplace
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarketplacePublishing; 