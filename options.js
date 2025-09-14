// Lắng nghe sự kiện click vào nút Lưu
document.getElementById('save').addEventListener('click', () => {
  const apiKey = document.getElementById('apiKey').value;
  // Lưu API key vào chrome.storage.sync để đồng bộ trên các trình duyệt
  chrome.storage.sync.set({
    geminiApiKey: apiKey
  }, () => {
    // Hiển thị thông báo khi lưu thành công
    const status = document.getElementById('status');
    status.textContent = 'Đã lưu API Key!';
    setTimeout(() => {
      status.textContent = '';
    }, 2000); // Ẩn thông báo sau 2 giây
  });
});

// Khi trang cài đặt được mở, tải và hiển thị API key đã lưu (nếu có)
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('geminiApiKey', (data) => {
    if (data.geminiApiKey) {
      document.getElementById('apiKey').value = data.geminiApiKey;
    }
  });
});