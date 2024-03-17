import { NextResponse, NextRequest } from 'next/server';
import { trpcClient } from '@/lib/trpc';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    logger.info('Received a request for resetting the data');

    await trpcClient.personMetadata.reset.query();
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    logger.error(
      {
        error: {
          code: error.data.code,
          status: error.data.httpStatus,
          path: error.data.path,
          message: error.shape.message,
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
