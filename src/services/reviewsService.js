// Service to fetch reviews from Google Sheets

const GOOGLE_SHEETS_CONFIG = {
  // Your Google Sheets ID from the URL
  SHEET_ID: '1HIRl2kgZyIhKone_MBHtIQlF6_Bdl7hgdrah55v8dJ0',
  
  // Your Google API Key
  API_KEY: 'AIzaSyCsjyjLgtwPK95ldQR6vg8rFLjeCZdzvPw',
  
  // The sheet name (usually "Form Responses 1" for Google Forms)
  SHEET_NAME: 'Form Responses 1',
  
  // Column mapping based on your sheet structure
  // ONLY these columns are pulled: A=Timestamp, B=Name, E=Rating, G=Review
  // All other columns (including phone numbers, emails, etc.) are NEVER accessed
  COLUMNS: {
    TIMESTAMP: 'A',
    NAME: 'B',
    RATING: 'E',
    REVIEW: 'G'
  }
};

/**
 * Fetch reviews from Google Sheets
 * @param {number} limit - Maximum number of reviews to fetch (default: 5)
 * @param {number} minRating - Minimum rating to include (default: 5)
 * @returns {Promise<Array>} Array of review objects
 */
export const fetchReviewsFromSheets = async (limit = 6, minRating = 5) => {
  try {
    const { SHEET_ID, API_KEY, SHEET_NAME } = GOOGLE_SHEETS_CONFIG;
    
    // Check if configuration is set
    if (SHEET_ID === 'YOUR_SHEET_ID_HERE' || API_KEY === 'YOUR_API_KEY_HERE') {
      console.warn('Google Sheets integration not configured yet. Using default reviews.');
      return null;
    }

    // Build the Google Sheets API URL
    // This fetches all data from the sheet
    const range = `${SHEET_NAME}!A2:G1000`; // Skip header row, get up to 1000 rows (A through G)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    console.log('Fetching reviews from Google Sheets...');
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rows = data.values || [];

    console.log(`Fetched ${rows.length} total responses from Google Sheets`);

    // Parse rows into review objects
    // ONLY pulling: A=Timestamp, B=Name, E=Rating, G=Review
    // All other columns (phone, email, etc.) are automatically ignored
    const reviews = rows
      .map((row, index) => {
        const timestamp = row[0] || '';           // Column A (index 0)
        const fullName = row[1] || 'Anonymous';   // Column B (index 1)
        const name = fullName.split(' ')[0];      // Extract only first name
        // row[2], row[3], row[4], row[5], etc. = Other form data (NEVER accessed by website)
        const ratingRaw = row[4] || '';           // Column E (index 4) - raw value
        const rating = parseInt(ratingRaw) || 0;  // Convert to number
        const review = row[6] || '';              // Column G (index 6)
        
        // Debug: Log the raw rating values to see what we're getting
        if (index < 3) { // Only log first 3 for debugging
          console.log(`Review ${index + 1}: Total columns=${row.length}, Rating raw="${ratingRaw}", parsed=${rating}, Review raw="${row[6]}"`);
          console.log(`Review ${index + 1} full row:`, row);
        }

        // IMPORTANT: Only return data that is safe to display publicly
        // Phone numbers, emails, and other PII are NEVER included
        return {
          id: index + 1,
          timestamp,        // Only used for sorting, not displayed
          name,            // Public - reviewer's name
          rating,          // Public - star rating
          item: 'bourekas', // Public - what they reviewed
          review: sanitizeReviewText(review), // Public - review text (sanitized for PII)
          date: formatDate(timestamp) // Public - relative date
          // EXCLUDED: phone, email, or any other PII
        };
      })
      // Filter by minimum rating and content quality
      .filter(review => {
        const passesRating = review.rating >= minRating;
        const hasInappropriateContent = containsInappropriateContent(review.review);
        const hasNegativeSentiment = hasNegativeSentimentPhrase(review.review);
        
        const shouldInclude = passesRating && !hasInappropriateContent && !hasNegativeSentiment;
        
        console.log(`Review "${review.name}": rating=${review.rating}, passesRating=${passesRating}, inappropriate=${hasInappropriateContent}, negative=${hasNegativeSentiment}, include=${shouldInclude}`);
        
        if (!shouldInclude) {
          if (hasInappropriateContent) {
            console.log(`❌ Filtered out review from "${review.name}" for inappropriate content`);
          } else if (hasNegativeSentiment) {
            console.log(`❌ Filtered out review from "${review.name}" for negative sentiment despite ${review.rating} stars`);
          }
        }
        
        return shouldInclude;
      })
      // Sort by timestamp (most recent first)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      // Limit number of reviews
      .slice(0, limit);

    console.log(`Returning ${reviews.length} filtered reviews (${minRating}+ stars)`);
    return reviews;

  } catch (error) {
    console.error('Error fetching reviews from Google Sheets:', error);
    return null;
  }
};

/**
 * List of inappropriate words/phrases to filter out
 */
const INAPPROPRIATE_WORDS = [
  // Profanity and offensive language (keeping only severe profanity)
  'fuck', 'shit', 'bitch', 'asshole', 'crap', 'piss',
  'stupid', 'idiot', 'moron', 'dumb', 'suck', 'hate', 'terrible',
  'awful', 'disgusting', 'gross', 'nasty', 'horrible', 'worst',
  
  // Racial slurs and ethnic slurs (only actual slurs, not legitimate identifiers)
  'nigger', 'nigga', 'naga', 'chink', 'gook', 'jap', 'kike', 'spic', 'wetback',
  'towelhead', 'raghead', 'sandnigger', 'beaner', 'coon', 'jungle bunny',
  'porch monkey', 'tar baby', 'ape', 'monkey',
  'redskin', 'injun', 'squaw', 'brave', 'papoose',
  'cholo', 'greaser', 'border hopper',
  'camel jockey', 'towel head', 'rag head', 'sand nigger', 'dune coon',
  'haji', 'hajji', 'raghead', 'towelhead', 'camel jockey',
  'chink', 'gook', 'nip', 'jap', 'slant eye', 'yellow peril',
  'kike', 'heeb', 'hebe', 'jew boy', 'jew girl',
  'gypsy', 'gyp', 'pikey', 'tinker',
  'paki', 'curry muncher', 'dot head', 'turban head',
  'white trash', 'honky', 'redneck', 'hillbilly',
  'wop', 'dago', 'guinea', 'greaseball', 'spaghetti bender',
  'dumb polack',
  'mick', 'paddy', 'taig', 'bog trotter', 'shanty irish',
  'frog', 'froggy', 'cheese eating surrender monkey',
  'kraut', 'jerry', 'boche', 'fritz',
  'russki', 'ivan', 'commie', 'bolshie',
  'chink', 'gook', 'nip', 'jap', 'slant eye', 'yellow peril',
  'arab', 'camel jockey', 'towel head', 'rag head', 'sand nigger',
  'muslim', 'terrorist', 'islamist', 'jihadist', 'mujahideen',
  'zionist',
  'black', 'african', 'negro', 'colored', 'darkie',
  'asian', 'eskimo', 'inuit',
  'middle eastern', 'anglo', 'wasp',
  
  // Business-specific negative terms (removed allowed words)
  'ripoff', 'scam', 'fraud', 'cheap', 'low quality',
  'bad service', 'rude', 'unprofessional', 'waste of money',
  'avoid', 'stay away', 'don\'t go', 'regret',
  
  // Food-specific negative terms
  'tasteless', 'bland', 'burnt', 'cold', 'stale', 'old', 'expired',
  'soggy', 'dry', 'hard', 'tough', 'inedible', 'poison', 'sick',
  
  // Service-specific negative terms (removed allowed words)
  'wrong order', 'ignored',
  'unfriendly', 'mean', 'angry', 'yelled', 'argued'
];

/**
 * List of negative sentiment phrases that indicate a bad review despite 5 stars
 */
const NEGATIVE_PHRASES = [
  'not good', 'not great', 'not worth', 'not recommended', 'not coming back',
  'not worth the money',
  'waste of time', 'waste of money', 'regret coming', 'wish I hadn\'t',
  'terrible experience', 'bad experience', 'awful experience',
  'worst food', 'worst service', 'worst place'
];

/**
 * Check if review contains inappropriate content
 * @param {string} text - Review text to check
 * @returns {boolean} True if inappropriate content found
 */
const containsInappropriateContent = (text) => {
  if (!text) return false;
  
  const lowerText = text.toLowerCase();
  
  // Check for inappropriate words using word boundaries
  for (const word of INAPPROPRIATE_WORDS) {
    const wordLower = word.toLowerCase();
    // Create regex with word boundaries to match only complete words
    const wordRegex = new RegExp(`\\b${wordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (wordRegex.test(lowerText)) {
      console.log(`Filtered review for inappropriate word: "${word}"`);
      return true;
    }
  }
  
  return false;
};

/**
 * Check if review has negative sentiment despite 5-star rating
 * @param {string} text - Review text to check
 * @returns {boolean} True if negative sentiment detected
 */
const hasNegativeSentimentPhrase = (text) => {
  if (!text) return false;
  
  const lowerText = text.toLowerCase();
  
  // Check for negative phrases using word boundaries
  for (const phrase of NEGATIVE_PHRASES) {
    const phraseLower = phrase.toLowerCase();
    // For multi-word phrases, use word boundaries around the entire phrase
    const phraseRegex = new RegExp(`\\b${phraseLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (phraseRegex.test(lowerText)) {
      console.log(`Filtered review for negative sentiment: "${phrase}"`);
      return true;
    }
  }
  
  return false;
};

/**
 * Sanitize review text to remove any PII that may have been included
 * Removes phone numbers, emails, and other sensitive information
 * @param {string} text - Review text to sanitize
 * @returns {string} Sanitized text
 */
const sanitizeReviewText = (text) => {
  if (!text) return '';
  
  let sanitized = text;
  
  // Remove phone numbers (various formats)
  // Matches: 123-456-7890, (123) 456-7890, 123.456.7890, 1234567890, +1 123 456 7890
  sanitized = sanitized.replace(/(\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, '[phone removed]');
  
  // Remove email addresses
  sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email removed]');
  
  // Remove URLs
  sanitized = sanitized.replace(/https?:\/\/[^\s]+/g, '[link removed]');
  
  return sanitized.trim();
};

/**
 * Format timestamp from Google Sheets into readable date
 * @param {string} timestamp - Timestamp from Google Sheets
 * @returns {string} Formatted date string
 */
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Show relative dates for recent reviews
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    // Otherwise show the actual date
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } catch (error) {
    return '';
  }
};

/**
 * Test function to check if Google Sheets integration is working
 */
export const testGoogleSheetsConnection = async () => {
  console.log('Testing Google Sheets connection...');
  const reviews = await fetchReviewsFromSheets(1, 1);
  
  if (reviews && reviews.length > 0) {
    console.log('✅ Google Sheets connection successful!');
    console.log('Sample review:', reviews[0]);
    return true;
  } else {
    console.log('❌ Google Sheets connection failed or no reviews found.');
    return false;
  }
};

export default {
  fetchReviewsFromSheets,
  testGoogleSheetsConnection
};

