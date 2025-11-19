var menu = document.querySelector(".citations");

function change1() {
  console.log('it works!');
  menu.classList.toggle("active1")
}




document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("cursor");
  const speed = 33; // typing speed in ms
  let typingQueue = [];
  let currentIndex = 0;
  let isTyping = false;
  let skipRequested = false;

  // --- Core typing function ---
  function typeSection(templateId, textId, callback) {
    const textEl = document.getElementById(textId);
    const rawText = document.getElementById(templateId).innerHTML.trim();

    // Split strike/non-strike segments
    const segments = [];
    const strikeRegex = /<strike>(.*?)<\/strike>/g;
    let lastIndex = 0, match;

    while ((match = strikeRegex.exec(rawText)) !== null) {
      if (match.index > lastIndex)
        segments.push({ text: rawText.slice(lastIndex, match.index), strike: false });
      segments.push({ text: match[1], strike: true });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < rawText.length)
      segments.push({ text: rawText.slice(lastIndex), strike: false });

    let segIndex = 0;
    let charIndex = 0;
    let currentSpan = null;
    isTyping = true;

    // --- Instantly finish typing (used when skip arrow clicked) ---
    function finishInstantly() {
      let finalHTML = "";
      segments.forEach(seg => {
        if (seg.strike) {
          finalHTML += `<span class="strike struck">${seg.text}</span>`;
        } else {
          finalHTML += seg.text;
        }
      });
      textEl.innerHTML = finalHTML;
      textEl.insertAdjacentElement("afterend", cursor);
      isTyping = false;
      if (callback) callback();
    }

    // --- Typewriter animation ---
    function typeWriter() {
      if (skipRequested) {
        skipRequested = false;
        return finishInstantly();
      }

      if (segIndex < segments.length) {
        const segment = segments[segIndex];

        if (segment.strike && !currentSpan) {
          currentSpan = document.createElement("span");
          currentSpan.className = "strike";
          textEl.appendChild(currentSpan);
        }

        const char = segment.text[charIndex];
        if (char) {
          const node = document.createTextNode(char);
          if (segment.strike) {
            currentSpan.appendChild(node);
          } else {
            textEl.appendChild(node);
          }
        }

        textEl.insertAdjacentElement("afterend", cursor);

        charIndex++;

        if (charIndex >= segment.text.length) {
          if (segment.strike && currentSpan) {
            currentSpan.classList.add("struck");
            currentSpan = null;
          }
          segIndex++;
          charIndex = 0;
        }

        setTimeout(typeWriter, speed);
      } else {
        isTyping = false;
        if (callback) callback();
      }
    }

    typeWriter();
  }

  // --- Define the full animation sequence ---
  typingQueue = [
    ["text-template-title", "typewriter-text-title-1"],
    ["text-template-1", "typewriter-text-1"],
    ["text-template-2", "typewriter-text-2"],
    ["text-template-title-2", "typewriter-text-title-2"],
    ["text-template-3", "typewriter-text-3"],
    ["text-template-4", "typewriter-text-4"],
    ["text-template-5", "typewriter-text-5"],
    ["text-template-title-3", "typewriter-text-title-3"],
    ["text-template-6", "typewriter-text-6"],
    ["text-template-7", "typewriter-text-7"],
    ["text-template-8", "typewriter-text-8"],
    ["text-template-9", "typewriter-text-9"],
    ["text-template-title-4", "typewriter-text-title-4"],
    ["text-template-10", "typewriter-text-10"],
    ["text-template-11", "typewriter-text-11"],
    ["text-template-12", "typewriter-text-12"],
    ["text-template-13", "typewriter-text-13"],
    ["text-template-title-5", "typewriter-text-title-5"],
    ["text-template-14", "typewriter-text-14"],
    ["text-template-15", "typewriter-text-15"],
    ["text-template-16", "typewriter-text-16"],
    ["text-template-17", "typewriter-text-17"],
    ["text-template-18", "typewriter-text-18"],
    ["text-template-title-6", "typewriter-text-title-6"],
    ["text-template-19", "typewriter-text-19"],
    ["text-template-20", "typewriter-text-20"],
    ["text-template-21", "typewriter-text-21"],
    ["text-template-22", "typewriter-text-22"]
  ];

  // --- Run animation sequence ---
  function runNext() {
    if (currentIndex >= typingQueue.length) {
      cursor.style.animation = "blink 0.8s steps(1) infinite";
      return;
    }

    const [templateId, textId] = typingQueue[currentIndex];
    currentIndex++;

    typeSection(templateId, textId, () => {
      // After a title finishes typing, fade in its skip arrow
      if (textId.includes("title")) {
        const match = textId.match(/title-(\d+)/); // extract number at end
        if (match) {
          const num = match[1];
          const btn = document.querySelector(`.skip-btn[data-next="${num}"]`);
          if (btn) {
            btn.classList.add("visible");
            btn.style.transitionDelay = "0.3s"; // small delay for nicer fade-in
          }
        }
      }
      runNext();
    });
  }

  runNext();

  // --- Skip arrow button behavior ---
  document.querySelectorAll(".skip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (isTyping) {
        // if text is currently typing, instantly finish it
        skipRequested = true;
      } else {
        // jump to next section
        const nextNum = parseInt(btn.dataset.next, 10);
        const targetId = `typewriter-text-title-${nextNum}`;
        const nextIndex = typingQueue.findIndex(([t, id]) => id === targetId) + 1;
        if (nextIndex > 0 && nextIndex < typingQueue.length) {
          currentIndex = nextIndex;
          runNext();
        }
      }
    });
  });
});



function change() {
    const images = document.querySelectorAll("#img1 img, #img2 img, #img3 img");
    
    images.forEach(img => {
        img.classList.toggle("active2");
    });
}