import { isEmpty } from 'lodash';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

export function middleware(req) {
    const endDate = process.env.NEXT_PUBLIC_END_DATE;
    if (isEmpty(req.cookies)) {
        return NextResponse.redirect('/login');
    }
    if ((new Date()) > (new Date(endDate)))
        return NextResponse.redirect('/user/tasks')
    return;
}
