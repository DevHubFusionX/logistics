# WordPress Blog Integration Setup

This guide explains how to connect your WordPress site to display blog posts on the Dara Logistics landing page.

## Quick Setup

### 1. Update WordPress Configuration

Edit `/src/services/wordpressService.js` and replace the placeholder URL:

```javascript
export const WORDPRESS_CONFIG = {
  // Replace with your actual WordPress site URL
  siteUrl: 'https://blog.daraexpress.com',
  apiUrl: 'https://blog.daraexpress.com/wp-json/wp/v2',
  // ... rest of config
}
```

### 2. WordPress Requirements

Your WordPress site needs:
- **WordPress 4.7+** (REST API is built-in)
- **Public posts** (published and publicly accessible)
- **Featured images** enabled on posts (recommended)

### 3. Test the Connection

1. Create a few blog posts in your WordPress admin
2. Add featured images to the posts
3. Visit your Dara site - the blog section should show your posts
4. If it shows "Demo content", check the browser console for API errors

## WordPress Setup Options

### Option A: Subdomain (Recommended)
- Set up WordPress at `blog.daraexpress.com`
- Update the config URLs to match
- No CORS issues since it's the same domain

### Option B: Separate Domain
- Use a separate domain like `darablog.com`
- May need CORS headers configured on WordPress
- Add this to your WordPress `functions.php`:

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://daraexpress.com');
        header('Access-Control-Allow-Methods: GET');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});
```

### Option C: WordPress.com Hosted
- If using WordPress.com, the API URL format is:
- `https://public-api.wordpress.com/wp/v2/sites/YOUR_SITE_ID/posts`

## Customization

### Blog Categories
The component automatically displays the first category of each post. To customize:

1. Create categories in WordPress admin (e.g., "Cold Chain", "Technology", "Industry News")
2. Assign categories to your posts
3. The category will appear as a badge on each blog card

### Featured Images
- Upload featured images to your WordPress posts
- Recommended size: 800x600px or larger
- The component will fallback to a default image if none is set

### Content Length
- Post excerpts are automatically truncated to ~120 characters
- Reading time is calculated based on content length
- Full content is available when users click "Read more"

## Fallback Content

If WordPress is unavailable, the component shows demo posts with logistics-related content. This ensures the landing page always looks complete.

## Troubleshooting

### "Demo content shown" message
- Check if your WordPress site is accessible
- Verify the API URL in the config
- Check browser console for specific error messages

### CORS errors
- Add CORS headers to WordPress (see Option B above)
- Or use a subdomain setup (Option A)

### Images not loading
- Ensure featured images are set on WordPress posts
- Check image URLs are publicly accessible
- Verify image file permissions

## Advanced Features

### Caching
The service includes built-in caching (5 minutes by default). To adjust:

```javascript
cache: {
  duration: 10 * 60 * 1000, // 10 minutes
  enabled: true
}
```

### Custom Post Types
To fetch custom post types instead of regular posts:

```javascript
// In wordpressService.js
endpoints: {
  posts: '/your-custom-post-type', // e.g., '/case-studies'
  // ... other endpoints
}
```

### Authentication
For private posts, you'll need to add authentication headers. Contact the development team for implementation.