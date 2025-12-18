/**
 * BiteBook Restaurant Promotions Reader
 * Reads restaurant promotions from a Google Sheet and returns as JSON
 * Only includes restaurants that have promotions (filters out blank promotions)
 */
function doGet(e) {
  try {
    // Your Google Sheet ID
    const SHEET_ID = '16dOGu9OcCoeU8AxdRxSL2WJUIU3oQydadhstaTXAGu0';
    
    // Open the spreadsheet by ID
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Get all data (skip header row)
    const data = sheet.getDataRange().getValues();
    
    // Skip header row (row 1)
    const rows = data.slice(1);
    
    // Build promotions object
    const promotions = {};
    
    rows.forEach(function(row) {
      const restaurantName = row[0]; // Column A
      const promotion = row[1];      // Column B
      
      // Skip empty rows and restaurants with blank promotions
      // Only include restaurants that have both a name and a non-empty promotion
      if (restaurantName && promotion && String(promotion).trim().length > 0) {
        // Convert line breaks in cell to \n for JSON
        const promotionText = String(promotion).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        promotions[String(restaurantName).trim()] = promotionText.trim();
      }
    });
    
    // Return as JSON
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        promotions: promotions,
        count: Object.keys(promotions).length
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        promotions: {}
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

