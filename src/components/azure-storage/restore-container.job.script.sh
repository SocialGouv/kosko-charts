
[ ! -z $SOURCE_CONTAINER ] || (echo "No SOURCE_CONTAINER"; exit 1)
[ ! -z $SOURCE_ACCOUNT_NAME ] || (echo "No SOURCE_ACCOUNT_NAME"; exit 1)
[ ! -z $SOURCE_ACCOUNT_KEY ] || (echo "No SOURCE_ACCOUNT_KEY"; exit 1)
[ ! -z $DESTINATION_CONTAINER ] || (echo "No DESTINATION_CONTAINER"; exit 1)
[ ! -z $DESTINATION_ACCOUNT_NAME ] || (echo "No DESTINATION_ACCOUNT_NAME"; exit 1)
[ ! -z $DESTINATION_ACCOUNT_KEY ] || (echo "No DESTINATION_ACCOUNT_KEY"; exit 1)


echo "starting restore container $SOURCE_CONTAINER into $DESTINATION_CONTAINER"

# copy container
az storage copy -r \
  --source-account-name "$SOURCE_ACCOUNT_NAME" \
  --source-account-key "$SOURCE_ACCOUNT_KEY" \
  --source-container "$SOURCE_CONTAINER" \
  --account-name "$DESTINATION_ACCOUNT_NAME" \
  --account-key "$DESTINATION_ACCOUNT_KEY" \
  --destination-container "$DESTINATION_CONTAINER"

# get original permission
PUBLIC_ACCESS=\`az storage container show-permission \
  --account-name "$SOURCE_ACCOUNT_NAME" \
  --account-key "$SOURCE_ACCOUNT_KEY" \
  --name $SOURCE_CONTAINER | jq -r ".publicAccess"\`

# set original permission
az storage container set-permission \
  --name $DESTINATION_CONTAINER \
  --account-name "$DESTINATION_ACCOUNT_NAME" \
  --account-key "$DESTINATION_ACCOUNT_KEY" \
  --public-access $PUBLIC_ACCESS
