import { getTimeline } from "../../api.ts";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  const tweets = await getTimeline();

  if (tweets) {
    return {
      body: {
        tweets,
      },
    };
  }
}
