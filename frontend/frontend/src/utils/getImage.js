const BACKEND_URL = "http://localhost:5000";

// Map of common farm product keywords to reliable Unsplash image URLs
const imageMap = {
  spinach: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80",
  potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
  onion: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&q=80",
  carrot: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80",
  cabbage: "https://images.unsplash.com/photo-1596265371388-43edbaadab94?w=400&q=80",
  apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?w=400&q=80",
  banana: "https://images.unsplash.com/photo-1571501478200-72060c510666?w=400&q=80",
  milk: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80",
  egg: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
  corn: "https://images.unsplash.com/photo-1550081628-1e0e84b8f041?w=400&q=80",
  mango: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&q=80",
  orange: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80",
  lemon: "https://images.unsplash.com/photo-1590502593747-42a996111139?w=400&q=80",
  garlic: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
  ginger: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&q=80",
  strawberry: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=400&q=80",
  grape: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80",
  chilli: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=80",
  cauliflower: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80",
  papaya: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&q=80",
  pomegranate: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80",
  paneer: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
  butter: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80",
  mustard: "https://images.unsplash.com/photo-1612871689353-ccd310479edb?w=400&q=80",
  cumin: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
  default: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80"
};

/**
 * Gets the best available image for a product.
 * Priority:
 *   1. Uploaded image from backend (img_link starts with "uploads/")
 *   2. Matched Unsplash image based on title keyword
 *   3. Fallback placeholder
 */
export const getProductImage = (title, imgLink) => {
  // 1. If product has an uploaded image, use it from the backend
  if (imgLink && imgLink.startsWith("uploads/")) {
    return `${BACKEND_URL}/${imgLink}`;
  }

  // 2. If product has a full external URL image, use it
  if (imgLink && (imgLink.startsWith("http://") || imgLink.startsWith("https://"))) {
    return imgLink;
  }

  // 3. Try to match title to a known product image
  if (title) {
    const lowerTitle = title.toLowerCase();
    for (const [key, value] of Object.entries(imageMap)) {
      if (key !== "default" && lowerTitle.includes(key)) {
        return value;
      }
    }
  }

  // 4. Fallback
  const keyword = title ? encodeURIComponent(title.trim()) : "product";
  return `https://ui-avatars.com/api/?name=${keyword}&background=random&size=200`;
};
