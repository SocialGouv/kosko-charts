#!/usr/bin/env bash

[ ! -z $OWNER ] || (echo "No OWNER"; exit 1)
[ ! -z $PGDATABASE ] || (echo "No PGDATABASE"; exit 1)
[ ! -z $PGHOST ] || (echo "No PGHOST"; exit 1)
[ ! -z $PGPASSWORD ] || (echo "No PGPASSWORD"; exit 1)
[ ! -z $PGUSER ] || (echo "No PGUSER"; exit 1)

echo "starting restore into $PGHOST/$PGDATABASE"

# get latest backup folder
LATEST=$(ls -1Fr /mnt/data | head -n 1);
DUMP="/mnt/data/${LATEST}${FILE}"
echo "Restore ${DUMP} into ${PGDATABASE}";

pg_isready;

pg_restore \
  --clean \
  --dbname "${PGDATABASE}" \
  --exclude-schema=audit \
  --if-exists \
  --no-acl \
  --no-owner \
  --role "${OWNER}" \
  --verbose \
  "${DUMP}";

psql
  --command="ALTER SCHEMA public owner to ${OWNER};"
  --set=ON_ERROR_STOP=1
  "${PGDATABASE}"

[ -f "/mnt/scripts/post-restore.sql" ] && \
  psql \
    --echo-all \
    --set=ON_ERROR_STOP=1 \
    < /mnt/scripts/post-restore.sql
