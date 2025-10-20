# 🎉 Google Sheets Integration - Almost Done!

## ✅ What's Already Configured

I've set up your website to automatically pull the latest 5-star reviews from your Google Sheets:

- **Sheet ID**: `1HIRl2kgZyIhKone_MBHtIQlF6_Bdl7hgdrah55v8dJ0` ✅
- **API Key**: `AIzaSyCsjyjLgtwPK95ldQR6vg8rFLjeCZdzvPw` ✅
- **Column Mapping** (ONLY these are pulled): 
  - Column A = Timestamp ✅
  - Column B = Name ✅
  - Column E = Rating ✅
  - Column G = Review ✅
  - All other columns (phone, email, etc.) are automatically ignored 🔒

## 🔑 One More Step: Get Your API Key

You just need to create a FREE Google API key to complete the setup.

### Quick Steps (5 minutes):

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Create a project** (if you don't have one):
   - Click project dropdown at top
   - Click "New Project"
   - Name it "Bomale Website"
   - Click "Create"

3. **Enable Google Sheets API**:
   - Go to: https://console.cloud.google.com/apis/library/sheets.googleapis.com
   - Click "Enable"

4. **Create API Key**:
   - Go to: https://console.cloud.google.com/apis/credentials
   - Click "Create Credentials" → "API Key"
   - Copy your new API key

5. **Make your Google Sheet public** (read-only):
   - Open your sheet: https://docs.google.com/spreadsheets/d/1zAQr2eHyDTiCVce2M6XdE4I8wLxpDCxgxKaVqkZbDlo/edit
   - Click "Share" button
   - Click "Change to anyone with the link"
   - Make sure it says "Viewer"
   - Click "Done"

6. **Add your API key to the code**:
   - Open: `src/services/reviewsService.js`
   - Find line 10: `API_KEY: 'YOUR_API_KEY_HERE',`
   - Replace with your actual API key:
     ```javascript
     API_KEY: 'AIzaSyAbc123...',  // Your actual API key here
     ```

7. **Save and test**:
   - The dev server will auto-reload
   - Go to the Reviews page
   - Check browser console (F12) for success messages

## 📋 What It Does

Once configured, your website will:
- ✅ Automatically fetch the **latest 5 reviews** with **5-star ratings**
- ✅ Update every time someone loads the Reviews page
- ✅ Show most recent reviews first
- ✅ Display: Name, Rating, Review text, and Date
- ✅ Fallback to default reviews if API fails

## 🎯 Testing

After adding your API key, check the browser console. You should see:
```
Fetching reviews from Google Sheets...
Fetched X total responses from Google Sheets
Returning 5 filtered reviews (5+ stars)
Loaded reviews from Google Sheets: [...]
```

## 🔧 Customization

Want to change how many reviews show? In `src/components/Reviews.js`, find line 175:
```javascript
const sheetsReviews = await fetchReviewsFromSheets(5, 5);
```
- First number = how many reviews to show
- Second number = minimum star rating

## 📚 More Details

For detailed instructions and troubleshooting, see: `GOOGLE_SHEETS_SETUP.md`

---

**Need help?** Check the browser console for any error messages.

