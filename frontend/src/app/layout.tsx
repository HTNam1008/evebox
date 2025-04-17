import ChatboxButton from "./(chatbox)/components/chatboxBtn";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <>
            <div className="tt-content relative">
              <div>
                {children}
              </div>
              <ChatboxButton />
            </div>
          </>
        </body>
      </html>
    );
  }
  