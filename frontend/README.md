This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Real-Time Communication

This project uses WebSockets for real-time communication with the backend server. Here's how it's set up:

### Configuration

Copy the `.env.example` file to `.env.local` and update the WebSocket URL if needed:

```bash
cp .env.example .env.local
```

The default configuration uses:
- `ws://localhost:8000/ws` for WebSocket communication

### WebSocket Usage

The application uses a custom WebSocket service located in `src/lib/websocket.ts` that provides:

- Automatic reconnection handling
- Type-safe event handling
- Singleton service pattern for app-wide WebSocket access

To use WebSockets in components, import the `useWebSocket` hook:

```tsx
import useWebSocket from "@/lib/hooks/useWebSocket";

function MyComponent() {
  const { isConnected, lastMessage, send, error } = useWebSocket({
    onMessage: (data) => console.log('Received:', data),
    onConnect: () => console.log('Connected'),
  });

  return (
    <button 
      onClick={() => send({ type: 'hello', message: 'Hello Server!' })}
      disabled={!isConnected}
    >
      Send Message
    </button>
  );
}
```

### Message Protocol

Messages are sent in JSON format with this structure:

```json
{
  "type": "message_type",
  "data": { ... },
  "timestamp": 1678912345
}
```

Available message types are defined in `src/lib/config.ts`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
