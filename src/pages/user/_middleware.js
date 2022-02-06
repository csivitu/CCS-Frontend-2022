import { isEmpty } from 'lodash';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

export function middleware(req) {
    const { cookies = {} } = req;
    if (isEmpty(cookies)) {
        return NextResponse.redirect('/login');
    }
    return;
}
