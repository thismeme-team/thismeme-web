export const IS_CSR = typeof window !== "undefined";

export const DOMAIN = IS_CSR ? window.location.origin : "";

export const twitterUrl = "https://twitter.com/thismeme_team";

export const instagramUrl = "https://www.instagram.com/thismeme.team";

export const channelUrl = "https://thismeme.channel.io/lounge";

export const Z_INDEX = {
  header_tw: "z-[10]",
  header: 10,
  drawer: 20,
};

export const APP_WIDTH = {
  mobile_tw: "max-w-[48rem]",
  mobile: 48,
};
