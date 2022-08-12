export const BLIZZ_API_URL='https://eu.api.blizzard.com';
export const BLIZZ_NAMESPACE='namespace=profile-eu';
export const BLIZZ_LOCALE='locale=en_US';
export const BLIZZ_TOKEN=`access_token=${process.env.BLIZZ_TOKEN_TEMP}`;
export const BLIZZ_CONFIG=`${BLIZZ_NAMESPACE}&${BLIZZ_LOCALE}&access_token=${process.env.BLIZZ_TOKEN_TEMP}`;