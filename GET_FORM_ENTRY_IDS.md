# How to Get Google Form Entry IDs

To make the custom form submit to your Google Form, we need the entry IDs from your form fields.

## Method 1: Inspect Your Google Form

1. **Open your Google Form**: https://docs.google.com/forms/d/e/1FAIpQLSdER-0c0J-8Z_s79AmHetHEgydb_gI56X-mBaAuRDi6leXeiw/edit

2. **Right-click on the first field** (Name) and select "Inspect Element"

3. **Look for the entry ID** in the HTML. It will look like:
   ```html
   <input type="text" name="entry.123456789" ...>
   ```

4. **Repeat for each field**:
   - Name field: entry.967507436
   - Email field: entry.1569958264
   - Phone field: entry.263506034 ✅
   - Rating field: entry.1897296947
   - Food item field: entry.633479757
   - Review field: entry.322311345

## Method 2: View Source

1. **Open your form** in a new tab with `?embedded=true`:
   https://docs.google.com/forms/d/e/1FAIpQLSdER-0c0J-8Z_s79AmHetHEgydb_gI56X-mBaAuRDi6leXeiw/viewform?embedded=true

2. **Right-click and "View Page Source"**

3. **Search for "entry."** to find all the entry IDs

## Method 3: Submit Test Entry

1. **Fill out your form** with test data
2. **Submit it**
3. **Check your Google Sheets** to see the order of responses
4. **Match the order** with the entry IDs

## Update the Code

Once you have the entry IDs, update this line in `CustomReviewForm.js`:

```javascript
// Your actual entry IDs from the form
formDataToSubmit.append('entry.967507436', formData.name); // Name field
formDataToSubmit.append('entry.1569958264', formData.email); // Email field
if (formData.phone) {
  formDataToSubmit.append('entry.263506034', formData.phone); // Phone field ✅
}
formDataToSubmit.append('entry.1897296947', formData.rating); // Rating field
formDataToSubmit.append('entry.633479757', formData.foodItem); // Food item field
formDataToSubmit.append('entry.322311345', formData.review); // Review field
```

## Alternative: Use Formspree

If getting entry IDs is too complicated, I can set up Formspree instead, which is much easier to configure.
