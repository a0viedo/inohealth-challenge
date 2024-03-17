import { NextResponse, NextRequest } from 'next/server';
import { trpcClient } from '@/lib/trpc';
import { logger } from '@/lib/logger';

export async function GET(req: NextRequest) {
  try {
    const count = req.nextUrl.searchParams.get('count');
    logger.info(
      { renderUrl: process.env.RENDER_URL, count },
      'Received a request for retrieving data'
    );

    const data = await trpcClient.personMetadata.list.query({
      count: count ? parseInt(count, 10) : null,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    logger.error(
      {
        error: {
          code: error.data?.code,
          status: error.data?.httpStatus,
          path: error.data?.path,
          message: error.shape?.message,
        },
      },
      'Failed to fetch from tRPC server:'
    );

    return NextResponse.json(
      { error: 'Failed to fetch data' },
      {
        status: 500,
      }
    );
  }
}
