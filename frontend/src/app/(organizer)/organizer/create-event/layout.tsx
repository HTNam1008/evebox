import SessionProviderWrapper from "./[id]/components/common/sessionProviderWrapper";

export const metadata = {
  title: 'Create Event',
};

export default function CreateEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
