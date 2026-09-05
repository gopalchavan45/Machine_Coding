export const faqData = [
  {
    id: '1',
    title: 'What is the component lifecycle in React?',
    content: 'React components go through three main phases: Mounting (birth), Updating (growth), and Unmounting (death). In functional components, these phases are handled and synchronized using the useEffect hook.'
  },
  {
    id: '2',
    title: 'Why use CSS Grid for smooth height transitions?',
    content: 'Unlike max-height transitions which can stutter or require arbitrary pixel limits, animating from grid-rows-[0fr] to grid-rows-[1fr] natively calculates content height dynamically for buttery-smooth performance.'
  },
  {
    id: '3',
    title: 'Are these components accessible for screen readers?',
    content: 'Yes! This accordion implements proper WAI-ARIA standards including aria-expanded, aria-controls, role="region", and semantic heading tags.'
  }
];