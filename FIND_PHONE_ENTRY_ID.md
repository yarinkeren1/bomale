# How to Find the Phone Number Entry ID

You need to find the entry ID for the phone number field in your Google Form so that the website can submit to it correctly.

## Quick Steps (2 minutes)

### Method 1: Inspect Element

1. **Open your Google Form**: 
   https://docs.google.com/forms/d/e/1FAIpQLSdER-0c0J-8Z_s79AmHetHEgydb_gI56X-mBaAuRDi6leXeiw/viewform

2. **Right-click on the Phone Number field** and select "Inspect" or "Inspect Element"

3. **Look for a line that says**:
   ```html
   <input type="text" name="entry.XXXXXXXXX" ...>
   ```
   The `entry.XXXXXXXXX` is your phone entry ID!

4. **Copy the full entry ID** (e.g., `entry.1234567890`)

### Method 2: View Page Source

1. **Open your Google Form**:
   https://docs.google.com/forms/d/e/1FAIpQLSdER-0c0J-8Z_s79AmHetHEgydb_gI56X-mBaAuRDi6leXeiw/viewform

2. **Right-click anywhere** and select "View Page Source"

3. **Press Ctrl+F (or Cmd+F)** and search for: `Phone Number`

4. **Look nearby for**: `entry.` followed by numbers

5. **Copy the full entry ID**

## Update the Code

Once you have the phone entry ID:

1. **Open**: `src/components/CustomReviewForm.js`

2. **Find line 190** (around there):
   ```javascript
   formDataToSubmit.append('entry.PHONE_ENTRY_ID_HERE', formData.phone);
   ```

3. **Replace `PHONE_ENTRY_ID_HERE`** with your actual entry ID:
   ```javascript
   formDataToSubmit.append('entry.1234567890', formData.phone);
   ```

4. **Save the file** - the dev server will auto-reload

## Test It

1. Go to your website
2. Click "Leave a Review"
3. Fill out the form including phone number
4. Submit
5. Check your Google Sheets to see if the phone number appears

## Example

If your phone entry ID is `entry.555666777`, update the code to:
```javascript
if (formData.phone) {
  formDataToSubmit.append('entry.555666777', formData.phone); // Phone field
}
```

That's it! The phone numbers will now be collected in your Google Form responses.

