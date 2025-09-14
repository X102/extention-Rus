// Khi người dùng click vào biểu tượng extension, mở trang Cài đặt
chrome.action.onClicked.addListener((tab) => {
  chrome.runtime.openOptionsPage();
});

// Lắng nghe yêu cầu phát âm thanh từ content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PLAY_TTS') {
    playAudio(message.payload);
  }
});

// Hàm để quản lý tài liệu offscreen
async function playAudio(word) {
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(word)}&tl=ru`;

  // Kiểm tra xem đã có tài liệu offscreen nào chưa
  if (await chrome.offscreen.hasDocument()) {
    // Gửi yêu cầu phát audio đến tài liệu đang có
    chrome.runtime.sendMessage({
      target: 'offscreen',
      type: 'PLAY_AUDIO',
      data: {
        source: ttsUrl
      },
    });
  } else {
    // Nếu chưa có, tạo một tài liệu offscreen mới
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Cần thiết để phát âm thanh không bị chặn bởi CSP.',
    });
    // Sau khi tạo xong, gửi yêu cầu phát audio
    setTimeout(() => {
      chrome.runtime.sendMessage({
        target: 'offscreen',
        type: 'PLAY_AUDIO',
        data: {
          source: ttsUrl
        },
      });
    }, 100);
  }
}