# AWS lead storage (deprecated)

The landing page no longer captures leads through `api/lead.js` or stores them in DynamoDB. All booking/demo requests are now handled through Cal.com:

**https://cal.com/thoughtseedlabs/30min**

The AWS SDK dependencies, the `api/lead.js` endpoint, and the client-side lead-capture form have been removed from this repository.

## Delete the old DynamoDB table

If you previously created a `fitcheck-leads` DynamoDB table, delete it to avoid ongoing AWS charges:

```bash
aws dynamodb delete-table \
  --table-name fitcheck-leads \
  --region us-east-1
```

You can also delete it from the AWS Console under **DynamoDB → Tables → fitcheck-leads → Delete**.

## Removed environment variables

The following variables are no longer used and can be removed from `.env` and Vercel project settings:

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `DYNAMODB_TABLE`
