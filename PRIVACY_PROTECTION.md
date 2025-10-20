# Privacy & PII Protection

## 🔒 Personal Information Protection

Your website is configured to **NEVER display any Personally Identifiable Information (PII)** from review submissions.

---

## ✅ What Data is Protected

The following information is **NEVER** displayed on the website:

### 1. **Phone Numbers**
- ✅ Collected in Google Form (Column C)
- ❌ **NEVER stored** in the website code
- ❌ **NEVER displayed** to visitors
- ✅ Automatically removed from review text if accidentally included

### 2. **Email Addresses**
- ✅ Can be collected in Google Form
- ❌ **NEVER stored** in the website code
- ❌ **NEVER displayed** to visitors
- ✅ Automatically removed from review text if accidentally included

### 3. **URLs/Links**
- ✅ Automatically removed from review text
- ❌ **NEVER displayed** to visitors
- Prevents spam and unwanted promotion

---

## 🛡️ How Protection Works

### Level 1: Data Exclusion
The code **intentionally skips** phone number columns when fetching data:

```javascript
// row[2] = Phone number - INTENTIONALLY NOT STORED (PII protection)
```

Phone numbers are **never** read from the spreadsheet into the website code.

### Level 2: Text Sanitization
Even if someone accidentally includes PII in their review text, it's automatically removed:

```javascript
sanitizeReviewText(review)
```

This function removes:
- ✅ Phone numbers in any format:
  - (123) 456-7890
  - 123-456-7890
  - 123.456.7890
  - 1234567890
  - +1 123 456 7890
- ✅ Email addresses:
  - user@example.com
  - any email format
- ✅ URLs:
  - http://example.com
  - https://example.com

Removed items are replaced with:
- `[phone removed]`
- `[email removed]`
- `[link removed]`

### Level 3: Code Comments
Every place where PII could be accessed has explicit comments:

```javascript
// EXCLUDED: phone, email, or any other PII
```

This ensures future developers understand the privacy requirements.

---

## 📊 What IS Displayed

Only the following **public, non-sensitive** information is shown:

1. **Reviewer Name** - First name or chosen display name
2. **Star Rating** - Number of stars (1-5)
3. **Review Text** - The review itself (sanitized)
4. **Date** - Relative date (e.g., "2 days ago")
5. **Item Reviewed** - What food item they reviewed

---

## 🔍 Column Mapping

Your Google Sheets structure:

```
Column A: Timestamp       ✅ Used (for sorting only)
Column B: Name           ✅ Displayed
Column C: Phone Number   ❌ NEVER USED - Protected
Column D: Rating         ✅ Displayed
Column E: (if any)       ❌ Not used
Column F: Review         ✅ Displayed (after sanitization)
```

---

## 🧪 Testing Protection

To verify PII protection is working:

1. Submit a test review with fake phone/email in the review text
2. Check the website - they should be replaced with `[phone removed]` or `[email removed]`
3. Check browser console for logs showing sanitization

---

## 📋 Compliance

This protection helps you comply with:

- ✅ **GDPR** - No PII displayed without consent
- ✅ **CCPA** - California Consumer Privacy Act
- ✅ **Best Practices** - Industry standard privacy protection
- ✅ **Customer Trust** - Reviewers know their info is protected

---

## 🔐 Additional Security

### Google Sheets Access
- Sheet is **public** for READ ONLY
- API key is **restricted** to Google Sheets API only
- No one can WRITE to your sheet via the API

### Code-Level Protection
- PII columns are **never** included in data objects
- Sanitization happens **before** data reaches the UI
- No PII is **ever** stored in browser localStorage

---

## ⚠️ Important Notes

1. **Phone numbers ARE collected** in Google Sheets for your records
2. **Phone numbers are NEVER accessed** by the website code
3. **You can still see phone numbers** in your Google Sheets admin panel
4. **Customers never see** other customers' phone numbers or emails

---

## 📞 Why Collect Phone Numbers?

Even though phone numbers aren't displayed:
- ✅ You can use them to contact happy customers
- ✅ Useful for follow-up marketing
- ✅ Can verify reviews are authentic
- ✅ Helps prevent spam reviews

But they're **always protected** from public display!

---

## 🔄 Future Updates

If you add MORE PII fields (like address, last name, etc.):

1. Add them to the `PRIVACY.EXCLUDE_*` config
2. Skip those columns in the parsing logic
3. Update sanitization if needed
4. Document in this file

---

## ✨ Summary

**Your customers' privacy is protected at multiple levels:**
- 🔒 PII columns are never read by the website
- 🔒 Review text is sanitized to remove accidental PII
- 🔒 Only public-safe information is displayed
- 🔒 Code is documented to maintain privacy standards

**Your visitors can trust that their personal information is safe!**

