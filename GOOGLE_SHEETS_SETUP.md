# Google Sheets Reviews Integration Setup

This guide will help you connect your website to automatically pull the latest 5-star reviews from your Google Sheets.

## 📋 What You'll Need

1. **Google Sheets ID** (from your form responses spreadsheet)
2. **Google API Key** (free to create)
3. **5 minutes** to set it up

---

## Step 1: Get Your Google Sheets ID

1. **Open your Google Sheets** where the form responses are stored
   - This is the spreadsheet that automatically collects responses from your Google Form
   
2. **Look at the URL** in your browser. It will look like this:
   ```
   https://docs.google.com/spreadsheets/d/1abc123def456ghi789jkl012mno345pqr/edit
   ```

3. **Copy the Sheet ID** - it's the long string between `/d/` and `/edit`:
   ```
   1abc123def456ghi789jkl012mno345pqr
   ```

4. **Save this ID** - you'll need it in Step 3

---

## Step 2: Get a Google API Key (FREE)

### A. Enable Google Sheets API

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Create a new project** (or select an existing one):
   - Click the project dropdown at the top
   - Click "New Project"
   - Name it "Bomale Website" or anything you like
   - Click "Create"

3. **Enable the Google Sheets API**:
   - Go to: https://console.cloud.google.com/apis/library
   - Search for "Google Sheets API"
   - Click on it
   - Click "Enable"

### B. Create an API Key

1. **Go to Credentials**:
   - Visit: https://console.cloud.google.com/apis/credentials
   - Click "Create Credentials"
   - Select "API Key"

2. **Copy your API Key** - it will look like:
   ```
   AIzaSyAbc123Def456Ghi789Jkl012Mno345Pqr678
   ```

3. **Restrict the API Key** (recommended for security):
   - Click on your new API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Check only "Google Sheets API"
   - Click "Save"

---

## Step 3: Make Your Google Sheets Public (Read-Only)

Your sheet needs to be accessible by the API (don't worry, only read access is needed):

1. **Open your Google Sheets**

2. **Click "Share" button** (top right)

3. **Click "Change to anyone with the link"**

4. **Make sure it says "Viewer"** (not Editor!)

5. **Click "Done"**

This allows the API to read your reviews but NO ONE can edit them.

---

## Step 4: Update the Configuration

1. **Open this file**: `src/services/reviewsService.js`

2. **Find these lines** (around line 5-10):
   ```javascript
   SHEET_ID: 'YOUR_SHEET_ID_HERE',
   API_KEY: 'YOUR_API_KEY_HERE',
   ```

3. **Replace with your actual values**:
   ```javascript
   SHEET_ID: '1abc123def456ghi789jkl012mno345pqr',  // Your Sheet ID from Step 1
   API_KEY: 'AIzaSyAbc123Def456Ghi789Jkl012Mno345Pqr678',  // Your API Key from Step 2
   ```

4. **Check the sheet name**:
   - The default is `'Form Responses 1'`
   - If your sheet tab has a different name, update the `SHEET_NAME` value

5. **Check column mapping**:
   - The default mapping assumes:
     - Column A = Timestamp
     - Column B = Name
     - Column C = Email
     - Column D = Rating
     - Column E = Food Item
     - Column F = Review
   - If your columns are different, update the `COLUMNS` object

---

## Step 5: Test It!

1. **Save all changes**

2. **Restart your development server**:
   ```bash
   npm start
   ```

3. **Open your browser console** (F12 or Right-click → Inspect → Console)

4. **Navigate to the Reviews page**

5. **Look for these messages**:
   ```
   Fetching reviews from Google Sheets...
   Fetched X total responses from Google Sheets
   Returning X filtered reviews (5+ stars)
   Loaded reviews from Google Sheets: [...]
   ```

6. **Check the reviews display** - you should see your latest 5-star reviews!

---

## 🎯 How It Works

### Automatic Updates
- **Every page load**: The website fetches the latest reviews from Google Sheets
- **Filters**: Only shows 5-star reviews
- **Sorts**: Shows most recent reviews first
- **Limits**: Displays the latest 5 reviews

### What Gets Displayed
Each review shows:
- ⭐ Star rating (only 5-star reviews)
- 👤 Reviewer name
- 🍽️ Food item they reviewed
- 💬 Their review text
- 📅 How long ago they reviewed

### Privacy & Security
- ✅ Sheet is read-only (no one can edit it via the API)
- ✅ API key is restricted to only Google Sheets API
- ✅ Email addresses are fetched but NOT displayed on the website
- ✅ No sensitive data is exposed

---

## 🔧 Customization Options

### Change Number of Reviews
In `src/components/Reviews.js`, find this line:
```javascript
const sheetsReviews = await fetchReviewsFromSheets(5, 5);
```
- First `5` = number of reviews to show
- Second `5` = minimum star rating

Want to show 10 reviews? Change to:
```javascript
const sheetsReviews = await fetchReviewsFromSheets(10, 5);
```

### Show 4-Star and 5-Star Reviews
```javascript
const sheetsReviews = await fetchReviewsFromSheets(5, 4);
```

### Refresh Reviews Periodically
To auto-refresh reviews every 5 minutes, add this to `Reviews.js`:
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    loadReviews();
  }, 5 * 60 * 1000); // 5 minutes

  return () => clearInterval(interval);
}, []);
```

---

## 🆘 Troubleshooting

### "No reviews found"
- Check that your Google Sheets has responses
- Make sure the sheet is public (View-only)
- Verify your Sheet ID is correct

### "API key invalid"
- Double-check your API key in the console
- Make sure Google Sheets API is enabled
- Try creating a new API key

### Reviews not updating
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors
- Make sure your sheet has 5-star reviews

### Wrong columns
- Check your sheet structure
- Update the `COLUMNS` mapping in `reviewsService.js`
- Column letters start from A (not 0)

---

## 📞 Need Help?

If you get stuck, check the browser console (F12) for error messages. The service logs detailed information about what's happening.

Common error messages and solutions:
- `"Failed to fetch reviews: 403"` → Sheet is not public or API key is invalid
- `"Failed to fetch reviews: 404"` → Sheet ID is incorrect
- `"No reviews found"` → No 5-star reviews in the sheet yet

---

## 🎉 All Done!

Once set up, your website will automatically:
- ✅ Pull the latest 5-star reviews from Google Sheets
- ✅ Update every time someone loads the page
- ✅ Show the most recent reviews first
- ✅ Fallback to default reviews if the API fails

No more manual updates needed! 🚀

