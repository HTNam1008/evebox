import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createApiClient from '@/services/apiClient';

// Define the route permission mapping
const routePermissions: Record<string, keyof RolePermissions> = {
  'summary-revenue': 'isSummarized',
  'vouchers/voucher-list': 'viewVoucher',
  'orders': 'viewOrder',
  'seatmap': 'viewSeatmap',
  'check-in': 'checkin',
  'member': 'viewMember',
  'edit': 'isEdited',
};

// Interface for role permissions
interface RolePermissions {
  role: number;
  isEdited: boolean;
  isSummarized: boolean;
  viewVoucher: boolean;
  marketing: boolean;
  viewOrder: boolean;
  viewSeatmap: boolean;
  viewMember: boolean;
  checkin: boolean;
  checkout: boolean;
  redeem: boolean;
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  const match = pathname.match(/\/organizer\/events\/(\d+)\/([^\/]+)/);

  if (!match) return NextResponse.next();

  const [, eventId, routeKey] = match;
  const requiredPermission = routePermissions[routeKey];

  if (!token || !token.email) {
    return NextResponse.redirect(new URL(`/organizer/events/${eventId}/unauthorized`, req.url));
  }

  if (!requiredPermission) return NextResponse.next();

  try {
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || '');

    // Step 1: get member role
    const memberRes = await apiClient.get(`/org/member/${eventId}`, {
      params: { email: token.email },
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    console.log("Member role-------",memberRes );

    const member = memberRes.data?.data?.[0];
    if (!member) {
      return NextResponse.redirect(new URL(`/organizer/events/${eventId}/unauthorized`, req.url));
    }

    // Step 2: get permissions
    const roleId = member.role;
    const roleRes = await apiClient.get(`/api/event/role/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    const permissions: RolePermissions = roleRes.data;

    if (!permissions[requiredPermission]) {
      return NextResponse.redirect(new URL(`/organizer/events/${eventId}/unauthorized`, req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('Permission check failed:', err);
    return NextResponse.redirect(new URL(`/organizer/events/${eventId}/unauthorized`, req.url));
  }
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    '/organizer/events/:eventId/summary-revenue',
    '/organizer/events/:eventId/vouchers/voucher-list',
    '/organizer/events/:eventId/orders',
    '/organizer/events/:eventId/seatmap',
    '/organizer/events/:eventId/check-in',
    '/organizer/events/:eventId/member',
    '/organizer/events/:eventId/edit',
  ]
};
