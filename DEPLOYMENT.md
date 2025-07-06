# Production Deployment Guide for sa7vik.in

This guide will help you deploy your portfolio website to production on your domain `www.sa7vik.in`.

## 🏗️ Architecture Overview

- **Frontend**: React app served via Nginx (www.sa7vik.in)
- **Backend**: FastAPI with RAG system (api.sa7vik.in)
- **Database**: FAISS vector index for RAG
- **LLM**: Groq API for chat responses

## 📋 Prerequisites

1. **Domain**: `sa7vik.in` with DNS access
2. **Hosting Provider**: Vercel, Netlify, or similar for frontend
3. **Backend Server**: VPS (DigitalOcean, AWS, etc.) for API
4. **API Keys**: Groq API key for LLM
5. **SSL Certificates**: Let's Encrypt or similar

## 🚀 Deployment Steps

### 1. Frontend Deployment (Vercel/Netlify)

#### Option A: Vercel (Recommended)

1. **Connect Repository**:
   ```bash
   # Push your code to GitHub/GitLab
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Set build settings:
     - **Framework Preset**: Vite
     - **Build Command**: `cd portfolio-website && npm run build`
     - **Output Directory**: `portfolio-website/dist`
     - **Install Command**: `cd portfolio-website && npm ci`

3. **Environment Variables**:
   ```
   NODE_ENV=production
   ```

4. **Custom Domain**:
   - Add `sa7vik.in` and `www.sa7vik.in` in Vercel dashboard
   - Update DNS records as instructed by Vercel

#### Option B: Netlify

1. **Deploy to Netlify**:
   - Connect your repository
   - Set build settings:
     - **Build command**: `cd portfolio-website && npm run build`
     - **Publish directory**: `portfolio-website/dist`

2. **Custom Domain**:
   - Add custom domain in Netlify dashboard
   - Update DNS records

### 2. Backend Deployment (VPS)

#### Server Setup (Ubuntu 20.04+)

1. **Initial Server Setup**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Clone Repository**:
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

3. **Environment Setup**:
   ```bash
   # Copy environment file
   cp backend/env.production.example backend/.env
   
   # Edit environment variables
   nano backend/.env
   ```

4. **Set Environment Variables**:
   ```bash
   export GROQ_API_KEY="your_actual_groq_api_key"
   ```

5. **Deploy Backend**:
   ```bash
   # Build and run
   docker-compose up -d backend
   
   # Check logs
   docker-compose logs -f backend
   ```

#### Nginx Reverse Proxy

1. **Install Nginx**:
   ```bash
   sudo apt install nginx -y
   ```

2. **Create Nginx Config**:
   ```bash
   sudo nano /etc/nginx/sites-available/api.sa7vik.in
   ```

3. **Add Configuration**:
   ```nginx
   server {
       listen 80;
       server_name api.sa7vik.in;
       
       location / {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. **Enable Site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/api.sa7vik.in /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

#### SSL Certificate (Let's Encrypt)

1. **Install Certbot**:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Get SSL Certificate**:
   ```bash
   sudo certbot --nginx -d api.sa7vik.in
   ```

### 3. DNS Configuration

Update your domain's DNS records:

```
Type    Name    Value
A       @       <your-frontend-ip>
A       www     <your-frontend-ip>
A       api     <your-backend-ip>
CNAME   @       <your-frontend-domain>
```

### 4. Testing Deployment

1. **Test Frontend**:
   ```bash
   curl -I https://sa7vik.in
   curl -I https://www.sa7vik.in
   ```

2. **Test Backend**:
   ```bash
   curl https://api.sa7vik.in/health
   ```

3. **Test Chatbot**:
   - Visit your website
   - Navigate to the chatbot
   - Test with a question

## 🔧 Monitoring & Maintenance

### Health Checks

1. **Backend Health**:
   ```bash
   curl https://api.sa7vik.in/health
   ```

2. **Frontend Health**:
   ```bash
   curl https://sa7vik.in/health
   ```

### Logs

1. **Backend Logs**:
   ```bash
   docker-compose logs -f backend
   ```

2. **Nginx Logs**:
   ```bash
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

### Updates

1. **Update Backend**:
   ```bash
   git pull origin main
   docker-compose down
   docker-compose up -d --build backend
   ```

2. **Update Frontend**:
   - Push to repository
   - Vercel/Netlify will auto-deploy

## 🛡️ Security Considerations

1. **Environment Variables**: Never commit API keys
2. **Firewall**: Configure UFW on your server
3. **SSL**: Always use HTTPS in production
4. **CORS**: Properly configured for your domains
5. **Rate Limiting**: Consider adding rate limiting to API

## 📊 Performance Optimization

1. **CDN**: Use Cloudflare for better performance
2. **Caching**: Implement proper caching headers
3. **Compression**: Gzip enabled in Nginx
4. **Monitoring**: Set up uptime monitoring

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check CORS configuration in backend
   - Verify domain names match

2. **API Not Responding**:
   - Check Docker containers: `docker-compose ps`
   - Check logs: `docker-compose logs backend`
   - Verify environment variables

3. **SSL Issues**:
   - Renew certificates: `sudo certbot renew`
   - Check Nginx configuration

4. **Domain Not Loading**:
   - Check DNS propagation
   - Verify hosting provider settings

## 📞 Support

If you encounter issues:

1. Check the logs first
2. Verify all environment variables are set
3. Ensure DNS is properly configured
4. Test locally with `./deploy.sh`

---

**Happy Deploying! 🚀** 