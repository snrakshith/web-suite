# Deploy React app on AWS

# Flow for AWS

- Web => Github Action => S3 => Route53 => CloudFront

### Section 1

- create a public S3 bucket

- upload the dist folder in s3 bucket that you created

- go to properties =>> & enable static web hosting

  - select the index.html as your entry point
  - for error also use index.html

- go to permisions =>> & enable static web hosting
  - add the bucket policy

### Section 2

- Secure the website (SSL)

- we will use AWS cloudfront (CDN) network for making our react app available on its edge locations, as well we get SSL certificates

- go to properties =>> & enable static web hosting & copy your `S3 URL` no need of `http://`

### Section 3

- setup a custom domain name

### Section 4

```bash
npm run build
aws s3 sync --delete /build s3://<name_of_your_bucket>
aws cloudfront create-invalidation --distribution-id <distribution_id> --paths "/*"
```

```json
"scripts":{
  "build": "aws s3 sync --delete /build s3://<name_of_your_bucket> && aws cloudfront create-invalidation --distribution-id <distribution_id> --paths \"/*\""
}
```
