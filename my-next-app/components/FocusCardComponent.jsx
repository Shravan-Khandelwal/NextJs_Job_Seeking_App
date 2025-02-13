import { FocusCards } from "./ui/focus-cards";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "Developer Job's",
      src: "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sales Job's",
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Video Editing Job's",
      src: "https://images.unsplash.com/photo-1636971819476-aa41dc3db0d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlkZW8lMjBlZGl0aW5nfGVufDB8fDB8fHww",
    },
    {
      title: "Finance Job's",
      src: "https://images.unsplash.com/photo-1621280336935-ed7cae618aac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmluYW5jZSUyMGpvYnN8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Marketing Job's",
      src: "https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFya2V0aW5nJTIwam9ifGVufDB8fDB8fHww",
    },
    {
      title: "Ai Job's",
      src: "https://images.unsplash.com/photo-1717501218636-a390f9ac5957?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpfGVufDB8fDB8fHww",
    },
  ];

  return <FocusCards cards={cards} />;
}
