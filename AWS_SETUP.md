# AWS lead storage setup

The landing-page lead capture endpoint (`api/lead.js`) can persist submissions to **Amazon DynamoDB**. When AWS credentials/table are not configured it falls back to `/tmp/fitcheck-leads/leads.json` so local development keeps working.

## 1. Create the DynamoDB table

```bash
aws dynamodb create-table \
  --table-name fitcheck-leads \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

The partition key must be named `id` (string).

## 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your AWS credentials:

```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
DYNAMODB_TABLE=fitcheck-leads
```

On Vercel, add these in **Project Settings → Environment Variables**.

## 3. IAM permissions

The AWS user/role needs only these DynamoDB actions on the table:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem"
      ],
      "Resource": "arn:aws:dynamodb:*:*:table/fitcheck-leads"
    }
  ]
}
```

## 4. Install dependencies

The AWS SDK packages are already listed in `package.json`:

```bash
npm install
```

## 5. Behavior

- If `DYNAMODB_TABLE` and `AWS_REGION` are set, leads are written to DynamoDB.
- Duplicate emails are prevented via a `GetItem` check and a `PutItem` condition.
- If DynamoDB is unreachable or unconfigured, the endpoint falls back to the filesystem and logs a warning.
