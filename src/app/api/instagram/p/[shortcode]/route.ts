import { NextRequest, NextResponse } from "next/server";
import { IG_GraphQLResponseDto } from "@/features/api/_dto/instagram";
import { getInstagramPostGraphQL } from "./utils";

// Rate limiting store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RouteContext {
  params: Promise<{
    shortcode: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  // Rate limiting setup - get client IP from headers
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 5; // 5 requests per minute per IP
  const currentTime = Date.now();
  
  // Initialize rate limit tracking
  const rateLimitInfo = {
    count: 0,
    resetTime: currentTime + RATE_LIMIT_WINDOW,
  };
  
  // Check existing rate limit
  if (rateLimitMap.has(ip)) {
    const existing = rateLimitMap.get(ip)!;
    if (currentTime > existing.resetTime) {
      // Reset expired counter
      rateLimitMap.set(ip, rateLimitInfo);
    } else {
      rateLimitInfo.count = existing.count;
      rateLimitInfo.resetTime = existing.resetTime;
    }
  } else {
    rateLimitMap.set(ip, rateLimitInfo);
  }
  
  // Check if rate limit exceeded
  if (rateLimitInfo.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((rateLimitInfo.resetTime - currentTime) / 1000);
    return NextResponse.json(
      { 
        error: "rateLimitExceeded", 
        message: `Too many requests. Please try again in ${retryAfter} seconds.` 
      },
      { 
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitInfo.resetTime.toString()
        }
      }
    );
  }
  
  // Increment request count
  rateLimitInfo.count++;
  rateLimitMap.set(ip, rateLimitInfo);
  
  const headers = {
    'X-RateLimit-Limit': MAX_REQUESTS.toString(),
    'X-RateLimit-Remaining': (MAX_REQUESTS - rateLimitInfo.count).toString(),
    'X-RateLimit-Reset': rateLimitInfo.resetTime.toString()
  };

  const { shortcode } = await context.params;

  if (!shortcode) {
    return NextResponse.json(
      { error: "noShortcode", message: "shortcode is required" },
      { status: 400 }
    );
  }

  try {
    const response = await getInstagramPostGraphQL({
      shortcode,
    });

    const status = response.status;

    if (status === 200) {
      const { data } = (await response.json()) as IG_GraphQLResponseDto;
      if (!data.xdt_shortcode_media) {
        return NextResponse.json(
          { error: "notFound", message: "post not found" },
          { status: 404 }
        );
      }

      if (!data.xdt_shortcode_media.is_video) {
        return NextResponse.json(
          { error: "notVideo", message: "post is not a video" },
          { status: 400 }
        );
      }

      return NextResponse.json({ data }, { status: 200, headers });
    }

    if (status === 404) {
      return NextResponse.json(
        { error: "notFound", message: "post not found" },
        { status: 404, headers }
      );
    }

    if (status === 429 || status === 401) {
      return NextResponse.json(
        {
          error: "instagramRateLimit",
          message: "Instagram is rate limiting our requests. Please try again later.",
        },
        { status: 429, headers }
      );
    }

    throw new Error("Failed to fetch post data");
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "serverError", message: error.message },
      { status: 500, headers }
    );
  }
}
