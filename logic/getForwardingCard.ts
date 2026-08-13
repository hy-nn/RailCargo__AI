import globisForwarding from '../data/globisForwarding.json';

export function getForwardingCard() {
  const cards: any[] = Array.isArray(globisForwarding)
    ? globisForwarding
    : (globisForwarding as any).cards || (globisForwarding as any).forwardingCards || [];

  const exportCard = cards.find((card: any) => card.direction === 'EXPORT');
  return exportCard || null;
}

export default getForwardingCard;
