// Lắng nghe tin nhắn từ background script
chrome.runtime.onMessage.addListener((message) => {
  // Nếu đúng là yêu cầu phát âm thanh
  if (message.target === 'offscreen' && message.type === 'PLAY_AUDIO') {
    // Tạo và phát audio
    const audio = new Audio(message.data.source);
    audio.play();
  }
});