import QuoteOfTheDay from '../components/QuoteOfTheDay';
import ChatInterface from '../components/ChatInterface';

export default function AskKrishnaPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <QuoteOfTheDay />
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <ChatInterface />
      </div>
    </div>
  );
}
