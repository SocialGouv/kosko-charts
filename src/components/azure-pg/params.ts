// default dev values
export function getDevDatabaseParameters({ suffix }: { suffix: string }) {
  return {
    database: `autodevops_${suffix}`,
    password: `password_${suffix}`,
    user: `user_${suffix}`,
  };
}
export function getProdDatabaseParameters() {
  return {
    database: "production_db",
    password: "production_password",
    user: "production_user",
  };
}
