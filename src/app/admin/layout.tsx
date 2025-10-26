import AdminShell from "./AdminShell";
import '@/app/globals.css';

// Note: previously we attempted a server-side redirect when the admin cookie was
// missing which caused a redirect loop for the `/login` page (the layout
// wraps the login route). To avoid ERR_TOO_MANY_REDIRECTS we don't redirect
// here server-side. Client pages perform a 401 check and redirect to login when
// necessary (this keeps the login page accessible).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html>
    <body>
      <AdminShell>{children}</AdminShell>
    </body>
  </html>;
}
