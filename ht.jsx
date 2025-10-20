<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # ✅ Redirect only the root URL ("/") to "/login"
  RewriteCond %{THE_REQUEST} \s/(\s|\?)
  RewriteRule ^$ /login [L,R=302]

  # ✅ Allow direct access to static files (JS, CSS, images, etc.)
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]

  # ✅ Allow access to existing directories
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # ✅ All other requests go to React's index.html (for dynamic routes)
  RewriteRule . /index.html [L]
</IfModule>
