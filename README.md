# 🪔 Shubh Deepawali Interactive Website 2026 ✨

A Diwali surprise web experience with an authentic family meta card that leaves visitors stunned when they open it.

---

## 🌟 The Experience Concept

1. **The Deceptive Meta Hook**:
   - When shared on **WhatsApp**, **iMessage**, **Twitter/X**, **Facebook**, or **Telegram**, the link unfurls with a warm, photorealistic Indian family Diwali portrait (`og-image.png`).
   - The preview card says:
     > *"The Sharma Family Diwali Celebration 2026 ✨ | A warm Diwali surprise from our home to yours! Tap to light the golden Diya..."*
   - It looks like an innocent, traditional family greeting card, enticing everyone to click.

2. **The Stunning Surprise Reveal**:
   - When opened, visitors see the dimly-lit house with a solitary sacred Diya waiting to be lit.
   - **Touching or clicking the Diya ignites the magic:**
     - The darkness explodes into fireworks with procedural sound effects (temple bells, whistling rockets, crackling bursts).
     - Marigold and rose petals drift down across the screen.
     - The Royal Celebration Hub unveils:
       - **"How We Celebrated Our Diwali" Story Timeline**: 5-day journey from Dhanteras deep-cleaning chaos to midnight terrace fireworks and sweet exchanges.
       - **Interactive Virtual Mithai (Sweets) Platter**: Pick Kaju Katli, Motichoor Ladoo, Gulab Jamun, and Jalebi onto a brass thali, and send it to friends over WhatsApp!
       - **Interactive Rangoli Studio**: Draw 8-fold and 12-fold symmetric glowing sand mandalas with touch or mouse.
       - **Phuljhadi (Sparkler) Wand**: Turn your cursor or finger into a burning sparkler with smoke and sound!
       - **Custom Surprise Generator**: Customize the family name, recipient, and personal blessing to create your own live shareable link with WhatsApp 1-tap share.
       - **Live Social Media Meta Image Exporter**: Render and download high-res (1200x630) Open Graph images directly from the browser!

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser (Chrome, Edge, Safari, Firefox), or serve it with Python/Node:

```bash
# Using Python
python -m http.server 8080

# Or using Node.js npx
npx serve .
```

Open `http://localhost:8080` in your browser.

---

## 🌐 Deploying to WhatsApp / Web

To make the WhatsApp and Twitter meta image unfurl for real:
1. Push this folder to a GitHub repository.
2. Connect it to **GitHub Pages**, **Vercel** (`vercel deploy`), or **Netlify**.
3. Replace `https://diwali-surprise.vercel.app/` in `<meta property="og:url">` and `og:image` with your deployed URL.
4. Paste the link into WhatsApp to see the family photo card appear!
