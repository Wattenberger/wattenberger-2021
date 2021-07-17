import wretch from "wretch";
import sum from "lodash/sum";
import flatten from "lodash/flatten";

export const getTimeline = async (
  paginationToken,
  pageNumber = 0,
): Promise<Tweet[]> => {
  const url = "https://api.twitter.com/2/users/1098849494/tweets";

  let query = {
    max_results: 100,
    expansions: "attachments.media_keys,author_id",
    "media.fields":
      "duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width",
    "tweet.fields": "attachments,public_metrics",
    "user.fields": "name,description,verified,username,profile_image_url",
  };
  if (paginationToken) {
    query["pagination_token"] = paginationToken;
  }

  const rawTweets = await wretch(url)
    .options({
      headers: {
        "User-Agent": "v2TweetLookupJS",
        Authorization: `Bearer ${import.meta.env.VITE_TWITTER_ACCESS_TOKEN}`,
      },
    })
    .query(query).get()
    .error("*", (e) => console.log(e))
    .json();

  const tweets = rawTweets.data.map((data, i) => {
    const { text, id, attachments = {}, public_metrics = {} } = data;
    const { media_keys = [] } = attachments;
    const {
      username,
      profile_image_url: userImageUrl,
      verified,
      description,
      name,
    } = rawTweets.includes.users[i] || {};
    const media = media_keys.map((key) =>
      rawTweets.includes.media.find((d) => d.media_key === key)
    );
    const height = getTweetHeight({ text, media });
    return {
      text,
      id,
      username,
      userImageUrl,
      verified,
      description,
      name,
      public_metrics,
      media,
      height,
    };
  });
  let popularTweets = tweets.filter((tweet) =>
    tweet.public_metrics.like_count > 80
  );
  if (rawTweets.meta.next_token && pageNumber < 50) {
    let nextTweets = await getTimeline(
      rawTweets.meta.next_token,
      pageNumber + 1,
    );
    popularTweets = [...popularTweets, ...nextTweets];
  }
  return popularTweets;
};

const getTweetHeight = ({ text, media }) => {
  const lines = text.split("\n");
  const lineLines = lines.map((line) => line.length / 36);
  const numberOfTotalLines = sum(flatten(lineLines));
  const textHeight = numberOfTotalLines * 25;
  const mediaHeight = media.length ? 180 : 0;
  return textHeight + mediaHeight;
};

type Tweet = {
  text: string;
  id: string;
  username: string;
  userImageUrl: string;
  verified: string;
  description: string;
  name: string;
  public_metrics: {
    "retweet_count": number;
    "reply_count": number;
    "like_count": number;
    "quote_count": number;
  };
  media?: {
    media_key: string;
    url?: string;
    preview_image_url?: string;
    type: "photo" | "video";
    height: number;
    width: number;
  };
};
